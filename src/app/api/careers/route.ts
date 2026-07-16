import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getCorsHeaders, sanitizeText } from '@/lib/apiSecurity';
import { parseCareerModeSlug } from '@/data/careersDepartments';
import {
  newApplicationEnvelope,
  submitApplication,
  type CareersApplicationPayload,
  type CareersApplicationResult,
} from '@/data/careersApplications.server';

export const maxDuration = 30;
export const dynamic = 'force-dynamic';

// ── Simple in-memory rate limiter (10 req / 60s per IP) ──────────────────────
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10;
const WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Applicant data exactly as the candidate typed it.
 *
 * Deliberately NOT run through `validateField`: that HTML-encodes, which turns
 * "https://x.com/y" into "https:&#x2F;&#x2F;x.com&#x2F;y" (DNMS rejects it as a
 * non-http(s) URL, 422) and stores "O'Brien" as "O&#x27;Brien" in the HRMS.
 * Escaping belongs at the point of rendering, so the email builder below escapes
 * on its way into HTML and DNMS receives the real values.
 */
type CareersPayload = {
  fullName: string;
  email: string;
  phone: string;
  linkedIn: string;
  portfolio: string;
  resumeUrl: string;
  message: string;
  // Role identity, sent by the role page so DNMS can link to the real record.
  mode: string;
  groupId: string;
  departmentId: string;
  roleId: string;
  groupCode: string;
  department: string;
  role: string;
  opening: string;
  sourceUrl: string;
};

/**
 * Trim + cap only - no HTML encoding.
 *
 * Control characters are dropped because they corrupt email headers and JSON
 * logs. Only `message` keeps tab/newline, and only because it is genuinely
 * multi-line: a CR/LF surviving in a single-line field like fullName would be
 * header injection, since fullName goes into the notification email subject.
 *
 * Everything else is preserved verbatim so DNMS stores exactly what the
 * candidate typed.
 */
const TAB = 9;
const LINE_FEED = 10;
const CARRIAGE_RETURN = 13;

function stripControlChars(value: string, multiline: boolean): string {
  const kept = multiline ? [TAB, LINE_FEED, CARRIAGE_RETURN] : [];
  let out = '';
  for (const ch of value) {
    const code = ch.charCodeAt(0);
    const isControl = code < 32 || code === 127;
    if (!isControl || kept.includes(code)) out += ch;
  }
  return out;
}

function raw(formData: FormData, key: string, maxLength: number, multiline = false): string {
  return stripControlChars(String(formData.get(key) ?? ''), multiline)
    .trim()
    .slice(0, maxLength);
}
function fromFormData(formData: FormData): CareersPayload {
  return {
    fullName: raw(formData, 'fullName', 200),
    email: raw(formData, 'email', 320),
    phone: raw(formData, 'phone', 30),
    linkedIn: raw(formData, 'linkedIn', 500),
    portfolio: raw(formData, 'portfolio', 500),
    resumeUrl: raw(formData, 'resumeUrl', 1000),
    message: raw(formData, 'message', 2000, true),
    mode: raw(formData, 'mode', 20),
    groupId: raw(formData, 'groupId', 100),
    departmentId: raw(formData, 'departmentId', 100),
    roleId: raw(formData, 'roleId', 100),
    groupCode: raw(formData, 'groupCode', 50),
    department: raw(formData, 'department', 200),
    role: raw(formData, 'role', 200),
    opening: raw(formData, 'opening', 300),
    sourceUrl: raw(formData, 'sourceUrl', 1000),
  };
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** DNMS rejects anything that isn't http(s) with a 422, and `javascript:` /
 *  `data:` URLs would be live links in the notification email. */
function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function validate(p: CareersPayload): string | null {
  if (!p.fullName || !p.email || !p.phone || !p.linkedIn || !p.portfolio || !p.resumeUrl) {
    return 'All required fields must be filled.';
  }
  if (!EMAIL_PATTERN.test(p.email)) return 'Enter a valid email address.';
  for (const [label, value] of [
    ['LinkedIn', p.linkedIn],
    ['Portfolio', p.portfolio],
    ['Resume', p.resumeUrl],
  ] as const) {
    if (!isHttpUrl(value)) return `${label} must be a valid http(s) URL.`;
  }
  return null;
}

function buildDnmsPayload(p: CareersPayload, envelope: { idempotencyKey: string; submittedAt: string }) {
  const mode = parseCareerModeSlug(p.mode) ?? 'full-time';
  const payload: CareersApplicationPayload = {
    idempotencyKey: envelope.idempotencyKey,
    mode,
    groupId: p.groupId,
    departmentId: p.departmentId,
    roleId: p.roleId,
    groupCode: p.groupCode,
    departmentTitle: p.department,
    roleTitle: p.role,
    opening: p.opening || null,
    applicant: {
      fullName: p.fullName,
      email: p.email,
      phone: p.phone,
      linkedIn: p.linkedIn,
      portfolio: p.portfolio,
      resumeUrl: p.resumeUrl,
      message: p.message || null,
    },
    meta: {
      // ISO 8601 with a Z offset - DNMS rejects a bare local datetime.
      submittedAt: envelope.submittedAt,
      sourceUrl: isHttpUrl(p.sourceUrl) ? p.sourceUrl : 'https://www.digitallynext.com/careers',
    },
  };
  return payload;
}

// ── Email (safety net) ───────────────────────────────────────────────────────
// Values are escaped HERE, on their way into HTML - not at ingest.

function buildHtml(p: CareersPayload, dnms: CareersApplicationResult): string {
  const esc = sanitizeText;
  const link = (url: string) => (url ? `<a href="${esc(url)}" style="color:#E21F26;">${esc(url)}</a>` : '-');

  const rows: [string, string][] = [
    ['Full Name', esc(p.fullName) || '-'],
    ['Email', esc(p.email) || '-'],
    ['Phone', esc(p.phone) || '-'],
    ['LinkedIn', link(p.linkedIn)],
    ['Portfolio', link(p.portfolio)],
    ['Resume URL', link(p.resumeUrl)],
    ['Track', esc(p.mode === 'internship' ? 'Internship' : 'Full-time')],
    ['Department', esc(p.department) || '-'],
    ['Role', esc(p.role) || '-'],
    ['Opening', esc(p.opening) || '-'],
    [
      'DNMS record',
      dnms.stored
        ? `${esc(dnms.id)}${dnms.warning ? ` (flagged: ${esc(dnms.warning)})` : ''}`
        : `NOT SAVED - ${esc(dnms.code)}. This email is the only copy.`,
    ],
  ];

  const tableRows = rows
    .map(
      ([label, value], i) => `
      <tr style="background:${i % 2 === 0 ? '#f9f9f9' : '#ffffff'};">
        <td style="padding:8px 12px; width:160px; font-weight:600;">${label}</td>
        <td style="padding:8px 12px;">${value}</td>
      </tr>`
    )
    .join('');

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111111; max-width: 620px;">
      <h2 style="color:#E21F26; margin-bottom:20px;">New Careers Application</h2>
      ${
        dnms.stored
          ? ''
          : `<p style="margin:0 0 16px; padding:12px; background:#FDF2F2; border-left:3px solid #E21F26; border-radius:4px;">
               <strong>This application was NOT saved to DNMS.</strong> Please add it manually - this email is the only record.
             </p>`
      }
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse; width:100%; border:1px solid #E6E6E6; border-radius:6px; overflow:hidden;">
        ${tableRows}
      </table>
      ${
        p.message
          ? `<div style="margin-top:24px; padding:16px; background:#f9f9f9; border-left:3px solid #E21F26; border-radius:4px;">
              <p style="margin:0 0 8px; font-weight:600;">Message</p>
              <p style="margin:0; white-space:pre-wrap;">${esc(p.message)}</p>
             </div>`
          : ''
      }
    </div>
  `;
}

function buildText(p: CareersPayload, dnms: CareersApplicationResult): string {
  return [
    dnms.stored
      ? `DNMS record: ${dnms.id}${dnms.warning ? ` (flagged: ${dnms.warning})` : ''}`
      : `DNMS: NOT SAVED (${dnms.code}) - this email is the only copy.`,
    '',
    `Full Name: ${p.fullName || '-'}`,
    `Email: ${p.email || '-'}`,
    `Phone: ${p.phone || '-'}`,
    `LinkedIn: ${p.linkedIn || '-'}`,
    `Portfolio: ${p.portfolio || '-'}`,
    `Resume URL: ${p.resumeUrl || '-'}`,
    `Track: ${p.mode === 'internship' ? 'Internship' : 'Full-time'}`,
    `Department: ${p.department || '-'}`,
    `Role: ${p.role || '-'}`,
    `Opening: ${p.opening || '-'}`,
    '',
    `Message:`,
    p.message || '-',
  ].join('\n');
}

async function sendEmail(p: CareersPayload, dnms: CareersApplicationResult): Promise<void> {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) throw new Error('Missing GMAIL_USER or GMAIL_APP_PASSWORD.');

  const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user, pass } });
  await transporter.sendMail({
    from: `Digitally Next Careers <${user}>`,
    to: 'careers@digitallynext.com',
    subject: `${dnms.stored ? 'New Application' : '[NOT IN DNMS] New Application'} - ${p.fullName}${p.role ? ` (${p.role})` : ''}`,
    text: buildText(p, dnms),
    html: buildHtml(p, dnms),
  });
}

// Handle CORS preflight
export async function OPTIONS(req: NextRequest) {
  const corsHeaders = getCorsHeaders(req.headers.get('origin'));
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function POST(req: NextRequest) {
  const corsHeaders = getCorsHeaders(req.headers.get('origin'));
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait and try again.' },
      { status: 429, headers: corsHeaders }
    );
  }

  try {
    const payload = fromFormData(await req.formData());

    const invalid = validate(payload);
    if (invalid) {
      return NextResponse.json({ error: invalid }, { status: 400, headers: corsHeaders });
    }

    // Generated once per submission attempt, server-side. Retries inside
    // submitApplication reuse this key, so they can never double-store.
    const envelope = newApplicationEnvelope();
    const dnms = await submitApplication(buildDnmsPayload(payload, envelope));

    // Log the trace, never the applicant's PII.
    if (dnms.stored) {
      console.info(
        `[careers/apply] stored id=${dnms.id} key=${envelope.idempotencyKey} duplicate=${dnms.duplicate}` +
          (dnms.warning ? ` warning=${dnms.warning}` : '')
      );
    } else {
      console.error(
        `[careers/apply] NOT stored key=${envelope.idempotencyKey} code=${dnms.code} status=${dnms.status ?? '-'} - falling back to email.`,
        dnms.details ? `details=${JSON.stringify(dnms.details)}` : ''
      );
    }

    // Safety net: email on EVERY submission until DNMS-side HR notification is
    // confirmed firing in production. Until then, a stored-but-unwatched
    // application is as good as lost.
    try {
      await sendEmail(payload, dnms);
    } catch (emailError) {
      console.error('[careers/apply] email failed:', emailError);
      // Only a hard failure if DNMS didn't store it either - then nothing has
      // the application and the candidate must be told to try again.
      if (!dnms.stored) {
        return NextResponse.json(
          { error: 'We could not submit your application. Please try again or email careers@digitallynext.com.' },
          { status: 502, headers: corsHeaders }
        );
      }
    }

    // 2xx from DNMS = stored. A `warning` (ROLE_CLOSED / REPEAT_APPLICATION) is
    // for HR, not the candidate - they still get a normal success.
    return NextResponse.json({ success: true }, { status: 200, headers: corsHeaders });
  } catch (err) {
    console.error('[careers/apply] error:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500, headers: corsHeaders });
  }
}
