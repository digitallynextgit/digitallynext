# Prompt for the DNMS Claude — Careers Applications write API

> Paste everything below this line into Claude Code in the **DNMS repo**.
> It is written from the consuming side: the marketing site already renders the
> careers tree from your read API and now needs to post applications back.

---

## Task: build a write API that stores careers applications

DNMS already exposes a read-only public careers API:

```
GET https://dnms.digitallynext.com/api/public/careers?mode=full-time|internship
Header: X-API-Key: <read key>
Returns: a bare JSON array of CareersDepartmentGroup[]
```

The Digitally Next marketing site (separate Next.js repo) consumes it and renders
`/careers`. Right now, when a candidate applies, the application is **emailed to
careers@digitallynext.com and stored nowhere**. There is no record, no pipeline,
no status. If the email send fails the application is silently lost.

Build the endpoint that fixes this: applications must land in DNMS as records.

## What to build

```
POST https://dnms.digitallynext.com/api/public/careers/applications
Header: X-API-Key: <WRITE key — see security>
Content-Type: application/json
```

The marketing site calls this **server-to-server** from its own route handler.
No browser ever calls it directly.

## SECURITY — non-negotiable

1. **Use a separate write key.** Do NOT accept the existing read key. The read key
   is distributed for a public, cacheable, read-only resource; a key that can
   write applicant PII must be independently rotatable and revocable. Suggested
   env name on your side: `CAREERS_WRITE_API_KEY`.
2. **Do NOT set `Access-Control-Allow-Origin: *` on this route.** The read API is
   deliberately `*` because it serves public job ads. This route accepts PII —
   a wildcard plus a key that a browser could see would let anyone write to your
   applicant table. There is no browser use case: reject/ignore CORS entirely, or
   allow no origins.
3. **Compare the key in constant time** and return 401 without hinting whether the
   key was missing vs wrong.
4. **Rate limit per IP and per email** (the site already limits 10/min/IP, but do
   not trust an upstream you don't control).
5. **Sanitize every string before storing or rendering it** anywhere in the DNMS
   admin UI. `message` is free text typed by the public and will eventually be
   rendered in your dashboard — treat it as hostile (stored XSS).
6. **Treat this data as PII.** Name, email, phone, LinkedIn, CV link. Decide a
   retention window and log access. Don't log full payloads in plaintext.

## Request payload (exact contract the site will send)

```ts
interface CareersApplicationPayload {
  /** Stable dedupe key generated per submission attempt (UUID v4).
   *  The site retries on network failure — see Idempotency. */
  idempotencyKey: string;

  /** Which tree the role came from. Same values as the read API's ?mode=. */
  mode: "full-time" | "internship";

  /** Slugs from YOUR read API — these are the ids you already publish.
   *  Use them to link the application to the real role record. */
  groupId: string;        // e.g. "smg"
  departmentId: string;   // e.g. "bsg-business-support-group"
  roleId: string;         // e.g. "business-relations-lead"

  /** Human-readable titles as they were displayed to the candidate.
   *  Store these verbatim — see "Stale roles". Do not match on them. */
  groupCode: string;      // e.g. "SMG"
  departmentTitle: string;
  roleTitle: string;

  /** The specific opening the candidate picked from `currentOpenings`,
   *  if they came in via one. null when they applied to the role generally. */
  opening: string | null;

  applicant: {
    fullName: string;
    email: string;
    phone: string;
    linkedIn: string;    // URL, required by the form
    portfolio: string;   // URL, required by the form
    resumeUrl: string;   // URL (Google Drive etc). NOT a file upload — see below.
    message: string | null;  // optional free text
  };

  meta: {
    submittedAt: string;  // ISO 8601, set by the site's server
    sourceUrl: string;    // the exact page applied from
  };
}
```

## Response contract

Success — **201 Created** on a new application:

```json
{ "id": "app_7f3c...", "status": "received", "duplicate": false }
```

**200 OK** when replaying a known `idempotencyKey` (return the original record):

```json
{ "id": "app_7f3c...", "status": "received", "duplicate": true }
```

Return an `id` in both cases. The site will log it so a candidate's application
can be traced end to end.

## Status codes

| Code | Meaning |
|------|---------|
| 201  | stored |
| 200  | idempotent replay of an already-stored application |
| 400  | malformed JSON / missing required field |
| 401  | bad or missing write key |
| 409  | same email already applied to this `roleId` recently (see Duplicates) |
| 410  | `roleId` is real but no longer accepting applications (see Stale roles) |
| 422  | validation failed (bad email, non-URL resumeUrl, etc.) — include details |
| 429  | rate limited |
| 500  | server error |

For 4xx, return a machine-readable code the site can branch on, not just prose:

```json
{ "error": { "code": "ROLE_CLOSED", "message": "This role is no longer accepting applications." } }
```

## Edge cases you MUST handle

### Stale roles — the important one

The marketing site keeps a **committed snapshot** of the careers tree and serves
it whenever your API is unreachable, so candidates can still browse and apply
during a DNMS outage. It also caches your responses for 5 minutes.

**Consequence: you will receive applications for roles that were just closed or
deleted in DNMS.** The candidate saw a role that was live minutes ago, or live as
of the last snapshot.

Do NOT silently 500 or drop these. Decide explicitly and tell us which you chose:

- **Preferred:** accept the application, store it, and flag it
  (`roleId` unresolved / role closed) so HR can still see a real human applied
  and triage them. Return 201 with a warning field.
- **Acceptable:** reject with **410** and code `ROLE_CLOSED` so the site can tell
  the candidate honestly ("this role just closed") instead of a generic error.

The one thing that must not happen is losing the applicant.

This is also why the payload carries both ids *and* the titles as displayed: if
`roleId` no longer resolves, `roleTitle` still tells HR what the person thought
they were applying to.

### Duplicates

Same person, same role, twice. Distinguish from an idempotent retry:

- Same `idempotencyKey` → **200**, it's a retry, return the original.
- Different key, same email + `roleId` within (say) 24h → your call: **409** with
  code `DUPLICATE_APPLICATION`, or accept and mark as a repeat. Tell us which.

### Resume handling

`resumeUrl` is a **link, not an upload** — usually Google Drive. Two problems:

1. The link may be permission-locked, so HR opens it and gets "request access".
2. The link can be revoked or the file changed *after* submission.

Consider fetching and archiving a copy server-side at submit time. If you do,
never follow the URL blindly — it is attacker-controlled input (SSRF). Block
internal/private address ranges, require http(s), cap size, and set a timeout.

### Other

- Any field can arrive as an empty string — validate, don't assume.
- `message` can be long; cap it (the site caps at 2000 chars) and store the rest
  truncated rather than erroring.
- `opening` is `null` for most roles — 3 of the current 17 full-time roles have no
  `currentOpenings` at all.

## Do not

- Do not accept the read key for writes.
- Do not set `Access-Control-Allow-Origin: *` on this route.
- Do not trust `roleId` to exist — see Stale roles.
- Do not require a file upload; the site sends a URL.
- Do not return 200 for a failed write. The site treats non-2xx as "not stored"
  and falls back to email; a lying 200 loses the application.
- Do not echo the applicant's PII back in error messages or logs.

## Please confirm back

So the site side can be wired up correctly:

1. Final URL and the exact env var name for the write key (and send us the key
   through a secure channel, not chat).
2. Your choice on **stale roles**: accept-and-flag (201) or reject (410)?
3. Your choice on **duplicates**: 409 or accept-and-mark?
4. Does DNMS notify HR itself once an application is stored (email/Slack/in-app)?
   The site currently emails careers@digitallynext.com and will **keep doing so as
   a safety net** until DNMS-side notification is confirmed working — otherwise
   we'd have a window where applications are stored but nobody is watching.
5. Is there a `GET .../applications/:id` or an admin view HR will use?
6. Retention policy for applicant PII.
