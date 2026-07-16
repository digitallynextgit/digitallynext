/**
 * Careers domain types + pure helpers.
 *
 * This module is CLIENT-SAFE: it holds no job data and performs no fetching, so
 * client components can import types, slug helpers, and URL builders from here
 * without dragging the DNMS API key into the browser bundle.
 *
 * The job data itself lives in the DNMS HRMS and is fetched server-side by
 * `@/data/careers.server`. Never import that module from a client component.
 */

// ─── API contract (mirrors GET /api/public/careers) ─────────────────────────

export type CareersTone = 'red' | 'teal';
export type CareersMode = 'full-time' | 'internship';

export type CareersRoleDescription = {
  intro: string;
  /** Optional - omit the section entirely when absent. */
  jobEssence?: string;
  keyRequirements: string[];
  currentOpenings: string[];
};

export type CareersRole = {
  /** Role slug. Stable - used as the React key and the URL segment. */
  id: string;
  title: string;
  meta: string | null;
  summary: string | null;
  /** null => the role has no detail panel. */
  description: CareersRoleDescription | null;
};

export type CareersDepartment = {
  /** Sub-department slug. */
  id: string;
  title: string;
  /** CTA text, rendered verbatim. */
  jobsLabel: string;
  tone: CareersTone;
  roles: CareersRole[];
};

export type CareersDepartmentGroup = {
  /** Group slug. */
  id: string;
  /** e.g. "SMG", "ADAC", "AMG", "MAP", "HR". */
  code: string;
  title: string;
  /** CTA text, rendered verbatim. */
  jobsLabel: string;
  tone: CareersTone;
  subDepartments: CareersDepartment[];
};

export type CareerRoleEntry = {
  group: CareersDepartmentGroup;
  department: CareersDepartment;
  role: CareersRole;
  mode: CareersMode;
  groupSlug: string;
  departmentSlug: string;
  roleSlug: string;
};

export const CAREERS_MODES: CareersMode[] = ['full-time', 'internship'];

// ─── Slug helpers ───────────────────────────────────────────────────────────
//
// The API's `id` fields are already stable slugs, so they ARE the URL segments.
// They match the title-slugification this site used before it moved onto the
// HRMS API, so every pre-existing careers URL still resolves.

export function getCareerRoleSlug(role: CareersRole): string {
  return role.id;
}

export function getCareerDepartmentSlug(department: CareersDepartment): string {
  return department.id;
}

export function getCareerGroupSlug(group: CareersDepartmentGroup): string {
  return group.id;
}

/** URL slug for a mode - used as the first segment after /careers. */
export function getCareerModeSlug(mode: CareersMode): string {
  return mode; // already in slug form: 'full-time' | 'internship'
}

/** Parse a URL mode segment back into a CareersMode, or null if invalid. */
export function parseCareerModeSlug(slug: string): CareersMode | null {
  if (slug === 'full-time' || slug === 'internship') return slug;
  return null;
}

// ─── Collapsed groups ───────────────────────────────────────────────────────

/**
 * "Collapsed" groups have only one sub-department, so the sub-department layer
 * adds no navigation value (it would just be one card pointing to itself).
 * For these the URL skips the redundant department segment entirely:
 *
 *   non-collapsed:  /careers/full-time/smg/msg-marketing-services-group/<role>
 *   collapsed:      /careers/full-time/hr/<role>
 *
 * The group page renders the role list directly when the group is collapsed,
 * instead of showing a single sub-department card.
 *
 * This is derived from the data rather than configured, so if HR publishes a
 * second sub-department the group stops being collapsed on its own.
 */
export function isCollapsedGroup(group: CareersDepartmentGroup): boolean {
  return group.subDepartments.length === 1;
}

/**
 * The single sub-department of a collapsed group, or null. Returns null rather
 * than throwing so a group with zero published sub-departments renders an empty
 * state instead of crashing the route.
 */
export function getCollapsedSubDepartment(group: CareersDepartmentGroup): CareersDepartment | null {
  return group.subDepartments.length === 1 ? group.subDepartments[0] : null;
}

// ─── URL builders ───────────────────────────────────────────────────────────
//
// URL hierarchy:
//   /careers                                     - main careers landing
//   /careers/<mode>                              - list of groups for that mode
//   /careers/<mode>/<group>                      - list of sub-departments
//   /careers/<mode>/<group>/<department>         - list of roles
//   /careers/<mode>/<group>/<department>/<role>  - role detail

export function getCareerModeHref(mode: CareersMode): string {
  return `/careers/${getCareerModeSlug(mode)}`;
}

export function getCareerGroupHref(group: CareersDepartmentGroup, mode: CareersMode): string {
  return `/careers/${getCareerModeSlug(mode)}/${getCareerGroupSlug(group)}`;
}

export function getCareerDepartmentHref(
  department: CareersDepartment,
  group: CareersDepartmentGroup,
  mode: CareersMode
): string {
  // For collapsed groups the dept page IS the group page - there's no separate
  // department URL, so return the group URL itself. This keeps callers (e.g.
  // the role-page back link) pointing at a real URL.
  if (isCollapsedGroup(group)) {
    return getCareerGroupHref(group, mode);
  }
  return `/careers/${getCareerModeSlug(mode)}/${getCareerGroupSlug(group)}/${getCareerDepartmentSlug(department)}`;
}

export function getCareerRoleHref(entry: CareerRoleEntry): string {
  const modeSlug = getCareerModeSlug(entry.mode);
  // Collapsed groups skip the department segment entirely.
  if (isCollapsedGroup(entry.group)) {
    return `/careers/${modeSlug}/${entry.groupSlug}/${entry.roleSlug}`;
  }
  return `/careers/${modeSlug}/${entry.groupSlug}/${entry.departmentSlug}/${entry.roleSlug}`;
}

// ─── Pure derivations over a fetched tree ───────────────────────────────────
//
// These take `groups` as an argument so they stay pure and client-safe; the
// server module supplies the data.

/** Flattens a fetched tree into one entry per role. */
export function buildCareerRoleEntries(groups: CareersDepartmentGroup[], mode: CareersMode): CareerRoleEntry[] {
  const entries: CareerRoleEntry[] = [];
  for (const group of groups) {
    for (const department of group.subDepartments) {
      for (const role of department.roles) {
        entries.push({
          group,
          department,
          role,
          mode,
          groupSlug: getCareerGroupSlug(group),
          departmentSlug: getCareerDepartmentSlug(department),
          roleSlug: getCareerRoleSlug(role),
        });
      }
    }
  }
  return entries;
}

export function findCareerGroupBySlug(
  groups: CareersDepartmentGroup[],
  groupSlug: string
): CareersDepartmentGroup | null {
  return groups.find((g) => getCareerGroupSlug(g) === groupSlug) ?? null;
}

export function findCareerDepartmentBySlug(
  group: CareersDepartmentGroup,
  departmentSlug: string
): CareersDepartment | null {
  return group.subDepartments.find((d) => getCareerDepartmentSlug(d) === departmentSlug) ?? null;
}

export function findCareerRoleBySlug(department: CareersDepartment, roleSlug: string): CareersRole | null {
  return department.roles.find((r) => getCareerRoleSlug(r) === roleSlug) ?? null;
}

// ─── Searchable positions (for the search bar) ──────────────────────────────

export type SearchablePosition = {
  /** Stable unique id (used as a React key and as aria-activedescendant). */
  id: string;
  /** Text shown in the dropdown - either an individual opening or the role title. */
  title: string;
  /** Parent role title (used as a secondary label when title === an opening). */
  roleTitle: string;
  /** Group code (e.g. SMG, ADAC). */
  groupCode: string;
  /** Parent department title (used as the dropdown section header). */
  departmentTitle: string;
  departmentSlug: string;
  roleSlug: string;
  /** Pre-built href to the role detail page where the position is listed. */
  href: string;
};

/**
 * Flattens groups → departments → roles → currentOpenings into a single list of
 * searchable positions. Roles without currentOpenings contribute a single entry
 * (the role title itself). All entries link to the parent role detail page.
 */
export function getSearchablePositions(groups: CareersDepartmentGroup[], mode: CareersMode): SearchablePosition[] {
  const items: SearchablePosition[] = [];
  for (const entry of buildCareerRoleEntries(groups, mode)) {
    const { group, department, role, roleSlug, departmentSlug } = entry;
    const href = getCareerRoleHref(entry);
    const openings = role.description?.currentOpenings ?? [];

    if (openings.length === 0) {
      items.push({
        id: `${group.id}__${department.id}__${role.id}`,
        title: role.title,
        roleTitle: role.title,
        groupCode: group.code,
        departmentTitle: department.title,
        departmentSlug,
        roleSlug,
        href,
      });
      continue;
    }

    openings.forEach((opening, idx) => {
      items.push({
        id: `${group.id}__${department.id}__${role.id}__${idx}`,
        title: opening,
        roleTitle: role.title,
        groupCode: group.code,
        departmentTitle: department.title,
        departmentSlug,
        roleSlug,
        href,
      });
    });
  }
  return items;
}
