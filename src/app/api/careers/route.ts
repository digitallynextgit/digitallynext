import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
// import { Client } from "@notionhq/client";
// const notion = new Client({ auth: process.env.NOTION_API_KEY });
// const DB_ID = process.env.NOTION_DATABASE_ID!;

export const maxDuration = 30;
export const dynamic = 'force-dynamic';

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
    fullName: String(formData.get('fullName') ?? '').trim(),
    email: String(formData.get('email') ?? '').trim(),
    phone: String(formData.get('phone') ?? '').trim(),
    linkedIn: String(formData.get('linkedIn') ?? '').trim(),
    portfolio: String(formData.get('portfolio') ?? '').trim(),
    resumeUrl: String(formData.get('resumeUrl') ?? '').trim(),
    message: String(formData.get('message') ?? '').trim(),
    track: String(formData.get('track') ?? '').trim(),
    department: String(formData.get('department') ?? '').trim(),
    role: String(formData.get('role') ?? '').trim(),
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

export async function POST(req: NextRequest) {
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

    // const data = await req.formData();
    // const fullName   = (data.get("fullName")   as string) ?? "";
    // const email      = (data.get("email")      as string) ?? "";
    // const phone      = (data.get("phone")      as string) ?? "";
    // const linkedIn   = (data.get("linkedIn")   as string) ?? "";
    // const portfolio  = (data.get("portfolio")  as string) ?? "";
    // const message    = (data.get("message")    as string) ?? "";
    // const track      = (data.get("track")      as string) ?? "";
    // const department = (data.get("department") as string) ?? "";
    // const role       = (data.get("role")       as string) ?? "";
    // const resumeFile = data.get("resume") as File | null;
    // if (!fullName || !email || !phone || !linkedIn || !portfolio || !resumeFile) {
    //   return NextResponse.json({ error: "All required fields must be filled." }, { status: 400 });
    // }
    // const fileUpload = await notion.fileUploads.create({
    //   mode: "single_part",
    //   filename: resumeFile.name,
    //   content_type: resumeFile.type || "application/pdf",
    // });
    // const resumeBuffer = await resumeFile.arrayBuffer();
    // await notion.fileUploads.send({
    //   file_upload_id: fileUpload.id,
    //   file: {
    //     filename: resumeFile.name,
    //     data: new Blob([resumeBuffer], { type: resumeFile.type }),
    //   },
    // });
    // await notion.pages.create({
    //   parent: { database_id: DB_ID },
    //   properties: {
    //     Name: {
    //       title: [{ text: { content: fullName } }],
    //     },
    //     Email: {
    //       email: email,
    //     },
    //     Phone: {
    //       phone_number: phone,
    //     },
    //     LinkedIn: {
    //       url: linkedIn.startsWith("http") ? linkedIn : `https://${linkedIn}`,
    //     },
    //     Portfolio: {
    //       url: portfolio.startsWith("http") ? portfolio : `https://${portfolio}`,
    //     },
    //     Resume: {
    //       files: [
    //         {
    //           name: resumeFile.name,
    //           type: "file_upload",
    //           file_upload: { id: fileUpload.id },
    //         },
    //       ],
    //     },
    //     Department: {
    //       select: { name: department || "Unknown" },
    //     },
    //     Role: {
    //       rich_text: [{ text: { content: role } }],
    //     },
    //     Track: {
    //       select: { name: track || "Unknown" },
    //     },
    //     Message: {
    //       rich_text: [{ text: { content: message } }],
    //     },
    //     "Applied At": {
    //       date: { start: new Date().toISOString() },
    //     },
    //     Status: {
    //       select: { name: "New" },
    //     },
    //   },
    // });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('[careers/route] error:', err);
    const message = err instanceof Error ? err.message : 'Internal server error.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
