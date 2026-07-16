import 'server-only';

import { randomUUID } from 'node:crypto';

import type { CareersMode } from '@/data/careersDepartments';

/**
 * Server-side writer for the DNMS (HRMS) careers applications API.
 *
 * SECURITY: this endpoint sends no CORS headers at all - a browser call fails by
 * design - and the key it takes can write applicant PII. It is a *different* key
 * from the read key (the read key returns 401 here), so it can be rotated on its
 * own. `server-only` makes a client import fail the build rather than leak it.
 */

const APPLICATIONS_ENDPOINT = 'https://dnms.digitallynext.com/api/public/careers/applications';

/** DNMS is a single upstream hop; 10s is generous and still well under the
 *  route's 30s maxDuration, leaving room for the email fallback afterwards. */
const REQUEST_TIMEOUT_MS = 10_000;

/** Total attempts, not extra retries. Every attempt reuses the same
 *  idempotencyKey, so a retry can only ever return the original record. */
const MAX_ATTEMPTS = 3;

export interface CareersApplicationApplicant {
  fullName: string;
  email: string;
  phone: string;
  linkedIn: string;
  portfolio: string;
  resumeUrl: string;
  message: string | null;
}

export interface CareersApplicationPayload {
  idempotencyKey: string;
  mode: CareersMode;
  groupId: string;
  departmentId: string;
  roleId: string;
  groupCode: string;
  departmentTitle: string;
  roleTitle: string;
  opening: string | null;
  applicant: CareersApplicationApplicant;
  meta: {
    submittedAt: string;
    sourceUrl: string;
  };
}

/** DNMS never rejects an applicant: a closed role or a repeat submission still
 *  stores, and just flags a warning for HR. */
export type CareersApplicationWarning = 'ROLE_CLOSED' | 'REPEAT_APPLICATION';

export interface CareersApplicationSuccess {
  stored: true;
  id: string;
  /** True when DNMS replayed an already-stored idempotencyKey. */
  duplicate: boolean;
  warning?: CareersApplicationWarning;
}

export interface CareersApplicationFailure {
  stored: false;
  /** DNMS error code, or a local reason when we never got a usable response. */
  code: string;
  message: string;
  status?: number;
  /** Field-level errors from a 422. Log these; never show them to the user raw. */
  details?: unknown;
}

export type CareersApplicationResult = CareersApplicationSuccess | CareersApplicationFailure;

/** Built once per submission ATTEMPT (not per retry) on the server, so the key
 *  is stable across retries and the timestamp can't be spoofed by the client. */
export function newApplicationEnvelope(): { idempotencyKey: string; submittedAt: string } {
  return { idempotencyKey: randomUUID(), submittedAt: new Date().toISOString() };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function asWarning(value: unknown): CareersApplicationWarning | undefined {
  return value === 'ROLE_CLOSED' || value === 'REPEAT_APPLICATION' ? value : undefined;
}

/** Only transient failures are worth another attempt. A 4xx is a verdict - the
 *  same payload will fail the same way, so retrying just delays the email
 *  fallback. 429 is excluded deliberately: retrying a rate limit compounds it. */
function isRetryable(status: number): boolean {
  return status >= 500;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * POSTs one application to DNMS.
 *
 * Treats any 2xx as stored: 201 is a fresh record, 200 is an idempotent replay,
 * and a `warning` on 201 (ROLE_CLOSED / REPEAT_APPLICATION) is informational -
 * DNMS still has the applicant and HR will triage. Callers must NOT surface a
 * warning to the candidate as a failure.
 *
 * Never throws. Anything that isn't a confirmed 2xx resolves to
 * `{ stored: false }` so the caller can fall back to email rather than lose the
 * application.
 */
export async function submitApplication(payload: CareersApplicationPayload): Promise<CareersApplicationResult> {
  const apiKey = process.env.DNMS_CAREERS_WRITE_API_KEY;
  if (!apiKey) {
    return {
      stored: false,
      code: 'MISSING_WRITE_KEY',
      message: 'DNMS_CAREERS_WRITE_API_KEY is not set (server-only - never NEXT_PUBLIC_*).',
    };
  }

  let lastFailure: CareersApplicationFailure = {
    stored: false,
    code: 'NO_ATTEMPT',
    message: 'The request was never attempted.',
  };

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const response = await fetch(APPLICATIONS_ENDPOINT, {
        method: 'POST',
        headers: { 'X-API-Key': apiKey, 'Content-Type': 'application/json' },
        // Reusing payload.idempotencyKey across attempts is what makes this
        // retry safe: DNMS replays the original record instead of double-storing.
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
        cache: 'no-store',
      });

      const body: unknown = await response.json().catch(() => null);

      if (response.ok) {
        const id = isRecord(body) && typeof body.id === 'string' ? body.id : null;
        if (!id) {
          // A 2xx without an id means we can't trace this application later.
          // Treat it as stored anyway - DNMS said 2xx, and emailing as well
          // risks a duplicate; losing traceability beats losing the applicant.
          return { stored: true, id: '(no id returned)', duplicate: response.status === 200 };
        }
        return {
          stored: true,
          id,
          duplicate: isRecord(body) && body.duplicate === true,
          warning: isRecord(body) ? asWarning(body.warning) : undefined,
        };
      }

      const error = isRecord(body) && isRecord(body.error) ? body.error : null;
      lastFailure = {
        stored: false,
        code: typeof error?.code === 'string' ? error.code : `HTTP_${response.status}`,
        message: typeof error?.message === 'string' ? error.message : `DNMS returned ${response.status}.`,
        status: response.status,
        details: error?.details,
      };

      if (!isRetryable(response.status)) return lastFailure;
    } catch (cause) {
      // Network error or timeout - no verdict from DNMS, so a retry is safe.
      lastFailure = {
        stored: false,
        code: 'NETWORK_ERROR',
        message: `Could not reach the DNMS applications API: ${String(cause)}`,
      };
    }

    if (attempt < MAX_ATTEMPTS) await sleep(attempt * 500);
  }

  return lastFailure;
}
