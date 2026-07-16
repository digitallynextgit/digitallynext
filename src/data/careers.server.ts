import 'server-only';

import { cache } from 'react';

import {
  buildCareerRoleEntries,
  findCareerDepartmentBySlug,
  findCareerGroupBySlug,
  findCareerRoleBySlug,
  parseCareerModeSlug,
  type CareerRoleEntry,
  type CareersDepartment,
  type CareersDepartmentGroup,
  type CareersMode,
  type CareersRole,
  type CareersRoleDescription,
  type CareersTone,
} from '@/data/careersDepartments';
import { CAREERS_FALLBACK, CAREERS_FALLBACK_CAPTURED_AT } from '@/data/careersFallback';

/**
 * Server-side reader for the DNMS (HRMS) public careers API.
 *
 * SECURITY: the endpoint sends `Access-Control-Allow-Origin: *`, so a
 * browser-side fetch would publish DNMS_CAREERS_API_KEY to anyone who opens
 * devtools. The key is therefore server-only and this module is marked
 * `server-only` - importing it from a client component fails the build rather
 * than leaking the key.
 *
 * The HRMS is the source of truth: nothing here is hardcoded or committed.
 */

const CAREERS_ENDPOINT = 'https://dnms.digitallynext.com/api/public/careers';

/**
 * Matches the API's own `s-maxage=300`. Without this every request would hit
 * the HRMS; with it, Next serves from its data cache and revalidates in the
 * background.
 */
const REVALIDATE_SECONDS = 300;

export class CareersApiError extends Error {
  constructor(
    message: string,
    readonly status?: number
  ) {
    super(message);
    this.name = 'CareersApiError';
  }
}

// ─── Runtime normalisation ──────────────────────────────────────────────────
//
// The payload crosses a network boundary from a separate system, so it is
// validated rather than trusted. Anything malformed is dropped instead of
// being rendered as `undefined` - a job board that silently omits one bad role
// is better than one that 500s.

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function asNonEmptyString(value: unknown): string | null {
  return typeof value === 'string' && value.trim().length > 0 ? value : null;
}

function asNullableString(value: unknown): string | null {
  return asNonEmptyString(value);
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((v): v is string => typeof v === 'string' && v.trim().length > 0);
}

function asTone(value: unknown): CareersTone {
  // 'red' and 'teal' are the only valid tones; anything else falls back to the
  // site's primary accent rather than rendering an undefined class.
  return value === 'red' || value === 'teal' ? value : 'red';
}

function normaliseDescription(value: unknown): CareersRoleDescription | null {
  if (!isRecord(value)) return null;
  const intro = asNonEmptyString(value.intro);
  if (!intro) return null; // intro is the one required field of a detail panel

  const jobEssence = asNonEmptyString(value.jobEssence);
  return {
    intro,
    // Omit the key entirely when absent so `'jobEssence' in description` and
    // optional-chaining both behave.
    ...(jobEssence ? { jobEssence } : {}),
    keyRequirements: asStringArray(value.keyRequirements),
    currentOpenings: asStringArray(value.currentOpenings),
  };
}

function normaliseRole(value: unknown): CareersRole | null {
  if (!isRecord(value)) return null;
  const id = asNonEmptyString(value.id);
  const title = asNonEmptyString(value.title);
  if (!id || !title) return null; // no id => no stable key or URL segment

  return {
    id,
    title,
    meta: asNullableString(value.meta),
    summary: asNullableString(value.summary),
    description: normaliseDescription(value.description),
  };
}

function normaliseDepartment(value: unknown): CareersDepartment | null {
  if (!isRecord(value)) return null;
  const id = asNonEmptyString(value.id);
  const title = asNonEmptyString(value.title);
  if (!id || !title) return null;

  return {
    id,
    title,
    jobsLabel: asNonEmptyString(value.jobsLabel) ?? 'Explore Open Roles',
    tone: asTone(value.tone),
    roles: Array.isArray(value.roles) ? value.roles.map(normaliseRole).filter((r): r is CareersRole => r !== null) : [],
  };
}

function normaliseGroup(value: unknown): CareersDepartmentGroup | null {
  if (!isRecord(value)) return null;
  const id = asNonEmptyString(value.id);
  const title = asNonEmptyString(value.title);
  if (!id || !title) return null;

  return {
    id,
    code: asNonEmptyString(value.code) ?? title,
    title,
    jobsLabel: asNonEmptyString(value.jobsLabel) ?? 'Explore Sub-Departments',
    tone: asTone(value.tone),
    subDepartments: Array.isArray(value.subDepartments)
      ? value.subDepartments.map(normaliseDepartment).filter((d): d is CareersDepartment => d !== null)
      : [],
  };
}

// ─── Fetch ──────────────────────────────────────────────────────────────────

/**
 * Fetches the published careers tree for one mode.
 *
 * `mode` is required by the API and never defaults - omitting it returns 400.
 *
 * Wrapped in React `cache()` so the several pages that need the tree during a
 * single render share one call, on top of Next's cross-request data cache.
 *
 * @throws {CareersApiError} on a missing key, a non-200 response, or a payload
 * that isn't the documented bare array. Callers render a fallback; the route
 * error boundary catches anything unhandled so one failing section can't blank
 * the site.
 */
export const fetchCareers = cache(async (mode: CareersMode): Promise<CareersDepartmentGroup[]> => {
  const apiKey = process.env.DNMS_CAREERS_API_KEY;
  if (!apiKey) {
    throw new CareersApiError('DNMS_CAREERS_API_KEY is not set. Add it to .env (server-only - never NEXT_PUBLIC_*).');
  }

  const url = `${CAREERS_ENDPOINT}?mode=${encodeURIComponent(mode)}`;

  let response: Response;
  try {
    response = await fetch(url, {
      headers: { 'X-API-Key': apiKey },
      next: { revalidate: REVALIDATE_SECONDS, tags: ['careers', `careers:${mode}`] },
    });
  } catch (cause) {
    throw new CareersApiError(`Could not reach the careers API (mode=${mode}): ${String(cause)}`);
  }

  if (!response.ok) {
    // Map the documented status codes to messages that say what to actually fix.
    const reason =
      {
        400: 'invalid or missing `mode` (must be exactly "full-time" or "internship")',
        401: 'bad or missing X-API-Key - check DNMS_CAREERS_API_KEY',
        500: 'the careers API is misconfigured on the DNMS side',
      }[response.status] ?? 'unexpected response';
    throw new CareersApiError(`Careers API returned ${response.status} for mode=${mode}: ${reason}`, response.status);
  }

  const payload: unknown = await response.json();

  // The endpoint returns a bare array, NOT { data: [...] }.
  if (!Array.isArray(payload)) {
    throw new CareersApiError(`Careers API returned ${typeof payload} for mode=${mode}; expected a bare JSON array.`);
  }

  return payload.map(normaliseGroup).filter((g): g is CareersDepartmentGroup => g !== null);
});

/**
 * Like `fetchCareers`, but falls back to the snapshot instead of throwing.
 *
 * Used where an outage must not fail the build: `generateStaticParams` and the
 * sitemap. Falling back (rather than returning `[]`) keeps the careers URLs
 * pre-rendered and listed in the sitemap through an outage, so a deploy during
 * one doesn't quietly drop the whole careers branch out of the sitemap.
 */
export async function fetchCareersOrFallback(mode: CareersMode): Promise<CareersDepartmentGroup[]> {
  return (await loadCareers(mode)).groups;
}

export type CareersLoadResult = {
  groups: CareersDepartmentGroup[];
  /** True when `groups` came from the committed snapshot, not the live HRMS. */
  stale: boolean;
};

/**
 * Page-facing loader: never throws, and never leaves the careers page empty
 * because of an outage.
 *
 * On a live 200 it returns the HRMS tree. On any failure it falls back to the
 * committed snapshot (`careersFallback.ts`) so candidates still see roles and
 * can still apply - the apply form posts to our own /api/careers, which does
 * not depend on the HRMS being up, so an application submitted against fallback
 * data still reaches us.
 *
 * The tradeoff is deliberate: the snapshot can be out of date, so a role that
 * was closed in the HRMS may briefly still show. That is judged better than
 * showing nothing, but it is why the snapshot is regenerable (see
 * scripts/generate-careers-fallback.mjs) and why `stale` is surfaced rather
 * than swallowed.
 *
 * An empty array from a healthy API is NOT a failure - it means nothing is
 * published, and callers render the empty state.
 */
export async function loadCareers(mode: CareersMode): Promise<CareersLoadResult> {
  try {
    return { groups: await fetchCareers(mode), stale: false };
  } catch (error) {
    const fallback = CAREERS_FALLBACK[mode] ?? [];
    console.error(
      `[careers] HRMS unreachable for mode=${mode}; serving the ${CAREERS_FALLBACK_CAPTURED_AT} snapshot ` +
        `(${fallback.length} groups). Cause:`,
      error
    );
    return { groups: fallback, stale: true };
  }
}

// ─── Mode-aware accessors ───────────────────────────────────────────────────

/** Role entries across both modes. Used by the sitemap. */
export async function getAllCareerRoleEntries(): Promise<CareerRoleEntry[]> {
  const [fullTime, internship] = await Promise.all([
    fetchCareersOrFallback('full-time'),
    fetchCareersOrFallback('internship'),
  ]);
  return [...buildCareerRoleEntries(fullTime, 'full-time'), ...buildCareerRoleEntries(internship, 'internship')];
}

// ─── Slug-based lookups ─────────────────────────────────────────────────────
//
// These resolve to null on an outage as well as on a genuinely unknown slug.
// That conflation is fine for their only caller - `generateMetadata`, where the
// cost is a fallback <title> - and it keeps a careers outage from failing the
// build. Page bodies use `loadCareers` instead, which keeps the two apart.

export async function getCareerGroupBySlugs(modeSlug: string, groupSlug: string) {
  const mode = parseCareerModeSlug(modeSlug);
  if (!mode) return null;
  const group = findCareerGroupBySlug(await fetchCareersOrFallback(mode), groupSlug);
  if (!group) return null;
  return { group, mode, modeSlug, groupSlug };
}

export async function getCareerDepartmentBySlugs(modeSlug: string, groupSlug: string, departmentSlug: string) {
  const groupHit = await getCareerGroupBySlugs(modeSlug, groupSlug);
  if (!groupHit) return null;
  const department = findCareerDepartmentBySlug(groupHit.group, departmentSlug);
  if (!department) return null;
  return { ...groupHit, department, departmentSlug };
}

export async function getCareerRoleBySlugsFull(
  modeSlug: string,
  groupSlug: string,
  departmentSlug: string,
  roleSlug: string
) {
  const deptHit = await getCareerDepartmentBySlugs(modeSlug, groupSlug, departmentSlug);
  if (!deptHit) return null;
  const role = findCareerRoleBySlug(deptHit.department, roleSlug);
  if (!role) return null;
  return { ...deptHit, role, roleSlug };
}
