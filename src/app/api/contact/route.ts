import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type ContactPayload = {
  fullName?: string;
  email?: string;
  company?: string;
  region?: string;
  service?: string;
  budget?: string;
  message?: string;
};

function getPayload(formData: FormData): ContactPayload {
  return {
    fullName: String(formData.get("fullName") ?? ""),
    email: String(formData.get("email") ?? ""),
    company: String(formData.get("company") ?? ""),
    region: String(formData.get("region") ?? ""),
    service: String(formData.get("service") ?? ""),
    budget: String(formData.get("budget") ?? ""),
    message: String(formData.get("message") ?? ""),
  };
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") ?? "";
    let payload: ContactPayload;

    if (contentType.includes("application/json")) {
      const json = (await request.json()) as ContactPayload;
      payload = {
        fullName: json.fullName ?? "",
        email: json.email ?? "",
        company: json.company ?? "",
        region: json.region ?? "",
        service: json.service ?? "",
        budget: json.budget ?? "",
        message: json.message ?? "",
      };
    } else {
      const formData = await request.formData();
      payload = getPayload(formData);
    }

    const fullName = payload.fullName?.trim() ?? "";
    const email = payload.email?.trim() ?? "";

    if (!fullName || !email) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }

    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;

    if (!user || !pass) {
      return NextResponse.json({ ok: false, error: "Email credentials missing" }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });

    const textLines = [
      `Full Name: ${payload.fullName ?? ""}`,
      `Email: ${payload.email ?? ""}`,
      `Company: ${payload.company ?? ""}`,
      `Region: ${payload.region ?? ""}`,
      `Service: ${payload.service ?? ""}`,
      `Budget: ${payload.budget ?? ""}`,
      "",
      payload.message ?? "",
    ];

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <h2>New Contact Inquiry</h2>
        <table cellpadding="6" cellspacing="0" style="border-collapse: collapse;">
          <tr><td><strong>Full Name</strong></td><td>${payload.fullName ?? ""}</td></tr>
          <tr><td><strong>Email</strong></td><td>${payload.email ?? ""}</td></tr>
          <tr><td><strong>Company</strong></td><td>${payload.company ?? ""}</td></tr>
          <tr><td><strong>Region</strong></td><td>${payload.region ?? ""}</td></tr>
          <tr><td><strong>Service</strong></td><td>${payload.service ?? ""}</td></tr>
          <tr><td><strong>Budget</strong></td><td>${payload.budget ?? ""}</td></tr>
        </table>
        <p><strong>Message</strong></p>
        <p>${(payload.message ?? "").replace(/\n/g, "<br />")}</p>
      </div>
    `;

    await transporter.sendMail({
      from: `Digitally Next Contact <${user}>`,
      to: "contact@digitallynext.com",
      replyTo: email,
      subject: `Contact form: ${fullName}`,
      text: textLines.join("\n"),
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false, error: "Failed to send message" }, { status: 500 });
  }
}
