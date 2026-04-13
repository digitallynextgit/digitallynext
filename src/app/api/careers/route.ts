import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getCorsHeaders, validateField } from '@/lib/apiSecurity';

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

type CareersPayload = {
  fullName: string;
  email: string;
  phone: string;
  linkedIn: string;
  portfolio: string;
  resumeUrl: string;
  message: string;
  track: string;
  department: string;
  role: string;
};

function fromFormData(formData: FormData): CareersPayload {
  return {
    fullName: validateField(String(formData.get('fullName') ?? ''), 200),
    email: validateField(String(formData.get('email') ?? ''), 200),
    phone: validateField(String(formData.get('phone') ?? ''), 30),
    linkedIn: validateField(String(formData.get('linkedIn') ?? ''), 300),
    portfolio: validateField(String(formData.get('portfolio') ?? ''), 300),
    resumeUrl: validateField(String(formData.get('resumeUrl') ?? ''), 500),
    message: validateField(String(formData.get('message') ?? ''), 2000),
    track: validateField(String(formData.get('track') ?? ''), 100),
    department: validateField(String(formData.get('department') ?? ''), 100),
    role: validateField(String(formData.get('role') ?? ''), 200),
  };
}

function buildHtml(p: CareersPayload): string {
  const rows: [string, string][] = [
    ['Full Name', p.fullName || '—'],
    ['Email', p.email || '—'],
    ['Phone', p.phone || '—'],
    ['LinkedIn', p.linkedIn ? `<a href="${p.linkedIn}" style="color:#E21F26;">${p.linkedIn}</a>` : '—'],
    ['Portfolio', p.portfolio ? `<a href="${p.portfolio}" style="color:#E21F26;">${p.portfolio}</a>` : '—'],
    ['Resume URL', p.resumeUrl ? `<a href="${p.resumeUrl}" style="color:#E21F26;">${p.resumeUrl}</a>` : '—'],
    ['Track', p.track || '—'],
    ['Department', p.department || '—'],
    ['Role', p.role || '—'],
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

      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse; width:100%; border:1px solid #E6E6E6; border-radius:6px; overflow:hidden;">
        ${tableRows}
      </table>

      ${
        p.message
          ? `<div style="margin-top:24px; padding:16px; background:#f9f9f9; border-left:3px solid #E21F26; border-radius:4px;">
              <p style="margin:0 0 8px; font-weight:600;">Message</p>
              <p style="margin:0; white-space:pre-wrap;">${p.message.replace(/</g, '&lt;')}</p>
             </div>`
          : ''
      }
    </div>
  `;
}

function buildText(p: CareersPayload): string {
  return [
    `Full Name: ${p.fullName || '—'}`,
    `Email: ${p.email || '—'}`,
    `Phone: ${p.phone || '—'}`,
    `LinkedIn: ${p.linkedIn || '—'}`,
    `Portfolio: ${p.portfolio || '—'}`,
    `Resume URL: ${p.resumeUrl || '—'}`,
    `Track: ${p.track || '—'}`,
    `Department: ${p.department || '—'}`,
    `Role: ${p.role || '—'}`,
    '',
    `Message:`,
    p.message || '—',
  ].join('\n');
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

    if (
      !payload.fullName ||
      !payload.email ||
      !payload.phone ||
      !payload.linkedIn ||
      !payload.portfolio ||
      !payload.resumeUrl
    ) {
      return NextResponse.json({ error: 'All required fields must be filled.' }, { status: 400 });
    }

    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;

    if (!user || !pass) {
      console.error('Missing GMAIL_USER or GMAIL_APP_PASSWORD env variables.');
      return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `Digitally Next Careers <${user}>`,
      to: 'careers@digitallynext.com',
      subject: `New Application — ${payload.fullName}${payload.role ? ` (${payload.role})` : ''}`,
      text: buildText(payload),
      html: buildHtml(payload),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('[careers/route] error:', err);
    const message = err instanceof Error ? err.message : 'Internal server error.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
