import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type ContactPayload = {
  name: string;
  phone: string;
  country: string;
  city: string;
  linkedIn: string;
  entityType: string;
  services: string[];
  customServiceNote: string;
  message: string;
};

function fromFormData(formData: FormData): ContactPayload {
  return {
    name: String(formData.get("name") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    country: String(formData.get("country") ?? "").trim(),
    city: String(formData.get("city") ?? "").trim(),
    linkedIn: String(formData.get("linkedIn") ?? "").trim(),
    entityType: String(formData.get("entityType") ?? "").trim(),
    services: formData.getAll("services").map(String),
    customServiceNote: String(formData.get("customServiceNote") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };
}

function fromJson(raw: Record<string, unknown>): ContactPayload {
  const rawServices = raw.services;
  return {
    name: String(raw.name ?? "").trim(),
    phone: String(raw.phone ?? "").trim(),
    country: String(raw.country ?? "").trim(),
    city: String(raw.city ?? "").trim(),
    linkedIn: String(raw.linkedIn ?? "").trim(),
    entityType: String(raw.entityType ?? "").trim(),
    services: Array.isArray(rawServices)
      ? rawServices.map(String)
      : rawServices
      ? [String(rawServices)]
      : [],
    customServiceNote: String(raw.customServiceNote ?? "").trim(),
    message: String(raw.message ?? "").trim(),
  };
}

function buildHtml(p: ContactPayload): string {
  const servicesHtml =
    p.services.length > 0
      ? p.services.map((s) => `<li style="margin-bottom:4px;">${s}</li>`).join("")
      : "<li>—</li>";

  const rows: [string, string][] = [
    ["Name", p.name || "—"],
    ["Phone", p.phone || "—"],
    ["Country", p.country || "—"],
    ["City", p.city || "—"],
    [
      "LinkedIn",
      p.linkedIn
        ? `<a href="${p.linkedIn}" style="color:#E21F26;">${p.linkedIn}</a>`
        : "—",
    ],
    ["Entity Type", p.entityType || "—"],
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
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111111; max-width: 620px;">
      <h2 style="color:#E21F26; margin-bottom:20px;">New Contact Inquiry</h2>

      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse; width:100%; border:1px solid #E6E6E6; border-radius:6px; overflow:hidden;">
        ${tableRows}
        <tr style="background:#f9f9f9;">
          <td style="padding:8px 12px; font-weight:600; vertical-align:top;">Services</td>
          <td style="padding:8px 12px;">
            <ul style="margin:0; padding-left:16px;">${servicesHtml}</ul>
          </td>
        </tr>
        ${
          p.customServiceNote
            ? `<tr style="background:#ffffff;">
                <td style="padding:8px 12px; font-weight:600; vertical-align:top;">Custom Note</td>
                <td style="padding:8px 12px; white-space:pre-wrap;">${p.customServiceNote.replace(/</g, "&lt;")}</td>
               </tr>`
            : ""
        }
      </table>

      ${
        p.message
          ? `<div style="margin-top:24px; padding:16px; background:#f9f9f9; border-left:3px solid #E21F26; border-radius:4px;">
              <p style="margin:0 0 8px; font-weight:600;">Message</p>
              <p style="margin:0; white-space:pre-wrap;">${p.message.replace(/</g, "&lt;")}</p>
             </div>`
          : ""
      }
    </div>
  `;
}

function buildText(p: ContactPayload): string {
  return [
    `Name: ${p.name || "—"}`,
    `Phone: ${p.phone || "—"}`,
    `Country: ${p.country || "—"}`,
    `City: ${p.city || "—"}`,
    `LinkedIn: ${p.linkedIn || "—"}`,
    `Entity Type: ${p.entityType || "—"}`,
    `Services: ${p.services.join(", ") || "—"}`,
    `Custom Note: ${p.customServiceNote || "—"}`,
    "",
    `Message:`,
    p.message || "—",
  ].join("\n");
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") ?? "";

    const payload: ContactPayload = contentType.includes("application/json")
      ? fromJson((await request.json()) as Record<string, unknown>)
      : fromFormData(await request.formData());

    if (!payload.name || !payload.phone) {
      return NextResponse.json(
        { ok: false, error: "Name and Phone are required." },
        { status: 400 }
      );
    }

    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;

    if (!user || !pass) {
      console.error("Missing GMAIL_USER or GMAIL_APP_PASSWORD env variables.");
      return NextResponse.json(
        { ok: false, error: "Server configuration error." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `Digitally Next Contact <${user}>`,
      to: "diwakarjha554@gmail.com",
      subject: `New Inquiry — ${payload.name}${payload.entityType ? ` (${payload.entityType})` : ""}`,
      text: buildText(payload),
      html: buildHtml(payload),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact/route] Error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to send message." },
      { status: 500 }
    );
  }
}
