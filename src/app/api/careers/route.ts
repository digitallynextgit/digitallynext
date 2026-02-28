import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type CareersPayload = {
  track: "full-time" | "internship";
  department: string | null;
  role: string;
  fullName: string;
  email: string;
  phone: string;
  linkedIn: string;
  portfolio: string;
  message: string;
};

function fromJson(raw: Record<string, unknown>): CareersPayload {
  const trackRaw = String(raw.track ?? "").trim();
  const track: CareersPayload["track"] = trackRaw === "internship" ? "internship" : "full-time";
  const department = raw.department == null ? null : String(raw.department).trim();

  return {
    track,
    department: department ? department : null,
    role: String(raw.role ?? "").trim(),
    fullName: String(raw.fullName ?? "").trim(),
    email: String(raw.email ?? "").trim(),
    phone: String(raw.phone ?? "").trim(),
    linkedIn: String(raw.linkedIn ?? "").trim(),
    portfolio: String(raw.portfolio ?? "").trim(),
    message: String(raw.message ?? "").trim(),
  };
}

function safeText(s: string): string {
  return s.replace(/</g, "&lt;");
}

function buildHtml(p: CareersPayload): string {
  const rows: [string, string][] = [
    ["Track", p.track === "internship" ? "Internship" : "Full-time"],
    ["Department", p.department || "—"],
    ["Role", p.role || "—"],
    ["Name", p.fullName || "—"],
    [
      "Email",
      p.email ? `<a href="mailto:${p.email}" style="color:#E21F26;">${p.email}</a>` : "—",
    ],
    ["Phone", p.phone || "—"],
    [
      "LinkedIn",
      p.linkedIn
        ? `<a href="${p.linkedIn}" style="color:#E21F26;">${p.linkedIn}</a>`
        : "—",
    ],
    [
      "Portfolio",
      p.portfolio
        ? `<a href="${p.portfolio}" style="color:#E21F26;">${p.portfolio}</a>`
        : "—",
    ],
  ];

  const tableRows = rows
    .map(
      ([label, value], i) => `
      <tr style="background:${i % 2 === 0 ? "#f9f9f9" : "#ffffff"};">
        <td style="padding:8px 12px; width:160px; font-weight:600;">${label}</td>
        <td style="padding:8px 12px;">${value}</td>
      </tr>`
    )
    .join("");

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111111; max-width: 640px;">
      <h2 style="color:#E21F26; margin-bottom:20px;">New Careers Application</h2>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse; width:100%; border:1px solid #E6E6E6; border-radius:6px; overflow:hidden;">
        ${tableRows}
      </table>
      ${
        p.message
          ? `<div style="margin-top:20px; padding:16px; background:#f9f9f9; border-left:3px solid #E21F26; border-radius:4px;">
              <p style="margin:0 0 8px; font-weight:600;">Message</p>
              <p style="margin:0; white-space:pre-wrap;">${safeText(p.message)}</p>
             </div>`
          : ""
      }
    </div>
  `;
}

function buildText(p: CareersPayload): string {
  return [
    `Track: ${p.track}`,
    `Department: ${p.department || "—"}`,
    `Role: ${p.role || "—"}`,
    `Name: ${p.fullName || "—"}`,
    `Email: ${p.email || "—"}`,
    `Phone: ${p.phone || "—"}`,
    `LinkedIn: ${p.linkedIn || "—"}`,
    `Portfolio: ${p.portfolio || "—"}`,
    "",
    "Message:",
    p.message || "—",
  ].join("\n");
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        { ok: false, error: "Invalid content type." },
        { status: 415 }
      );
    }

    const payload = fromJson((await request.json()) as Record<string, unknown>);

    if (!payload.fullName || !payload.email || !payload.role) {
      return NextResponse.json(
        { ok: false, error: "Name, Email, and Role are required." },
        { status: 400 }
      );
    }

    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;

    if (!user || !pass) {
      return NextResponse.json(
        { ok: false, error: "Server configuration error." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });

    const subjectParts = [
      "Career Application",
      payload.role,
      payload.track === "internship" ? "Internship" : "Full-time",
      payload.fullName,
    ].filter(Boolean);

    await transporter.sendMail({
      from: `Digitally Next Careers <${user}>`,
      to: "careers@digitallynext.com",
      replyTo: payload.email,
      subject: subjectParts.join(" — "),
      text: buildText(payload),
      html: buildHtml(payload),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to submit application." },
      { status: 500 }
    );
  }
}

