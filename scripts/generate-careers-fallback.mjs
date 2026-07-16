/**
 * Regenerates src/data/careersFallback.ts from the live DNMS careers API.
 *
 * The fallback is a SNAPSHOT, not a source of truth. It only ever renders when
 * the HRMS is unreachable, so it is worth refreshing whenever the published
 * careers tree changes meaningfully:
 *
 *   node scripts/generate-careers-fallback.mjs
 *
 * Reads DNMS_CAREERS_API_KEY from the environment (or .env).
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ENDPOINT = 'https://dnms.digitallynext.com/api/public/careers';
const OUT = resolve('src/data/careersFallback.ts');
const MODES = ['full-time', 'internship'];

function readKey() {
  if (process.env.DNMS_CAREERS_API_KEY) return process.env.DNMS_CAREERS_API_KEY;
  try {
    const env = readFileSync(resolve('.env'), 'utf8');
    const match = env.match(/^DNMS_CAREERS_API_KEY\s*=\s*"?([^"\r\n]+)"?/m);
    if (match) return match[1];
  } catch {
    /* .env is optional - fall through to the error below */
  }
  throw new Error('DNMS_CAREERS_API_KEY not found in the environment or .env');
}

async function fetchMode(mode, apiKey) {
  const res = await fetch(`${ENDPOINT}?mode=${encodeURIComponent(mode)}`, {
    headers: { 'X-API-Key': apiKey },
  });
  if (!res.ok) throw new Error(`API returned ${res.status} for mode=${mode}`);
  const json = await res.json();
  if (!Array.isArray(json)) throw new Error(`Expected a bare array for mode=${mode}`);
  if (json.length === 0) throw new Error(`Refusing to snapshot an empty tree for mode=${mode}`);
  return json;
}

const apiKey = readKey();
const [fullTime, internship] = await Promise.all(MODES.map((m) => fetchMode(m, apiKey)));

const countRoles = (groups) => groups.flatMap((g) => g.subDepartments.flatMap((d) => d.roles)).length;
const stamp = new Date().toISOString().slice(0, 10);

const file = `// AUTO-GENERATED - do not edit by hand.
// Regenerate with: node scripts/generate-careers-fallback.mjs
//
// Snapshot of the published DNMS careers tree, taken ${stamp}.
// Full-time: ${fullTime.length} groups / ${countRoles(fullTime)} roles.
// Internship: ${internship.length} groups / ${countRoles(internship)} roles.
//
// This is NOT a source of truth. It renders only when the HRMS is unreachable,
// so the careers page degrades to slightly-stale roles instead of an error page.
// \`satisfies\` makes the compiler prove the snapshot still matches the API
// contract, so a contract change breaks the build here rather than in prod.

import type { CareersDepartmentGroup, CareersMode } from '@/data/careersDepartments';

/** The date this snapshot was taken, surfaced in logs when it is served. */
export const CAREERS_FALLBACK_CAPTURED_AT = '${stamp}';

const FULL_TIME = ${JSON.stringify(fullTime, null, 2)} satisfies CareersDepartmentGroup[];

const INTERNSHIP = ${JSON.stringify(internship, null, 2)} satisfies CareersDepartmentGroup[];

export const CAREERS_FALLBACK: Record<CareersMode, CareersDepartmentGroup[]> = {
  'full-time': FULL_TIME,
  internship: INTERNSHIP,
};
`;

writeFileSync(OUT, file, 'utf8');
console.log(
  `Wrote ${OUT}\n  full-time:  ${fullTime.length} groups / ${countRoles(fullTime)} roles\n  internship: ${internship.length} groups / ${countRoles(internship)} roles`
);
