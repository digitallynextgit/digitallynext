import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";
import { put } from "@vercel/blob";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const DB_ID = process.env.NOTION_DATABASE_ID!;

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();

    const fullName  = (data.get("fullName")   as string) ?? "";
    const email     = (data.get("email")      as string) ?? "";
    const phone     = (data.get("phone")      as string) ?? "";
    const linkedIn  = (data.get("linkedIn")   as string) ?? "";
    const portfolio = (data.get("portfolio")  as string) ?? "";
    const message   = (data.get("message")    as string) ?? "";
    const track     = (data.get("track")      as string) ?? "";
    const department= (data.get("department") as string) ?? "";
    const role      = (data.get("role")       as string) ?? "";
    const resumeFile= data.get("resume") as File | null;

    // Validate required fields server-side
    if (!fullName || !email || !phone || !linkedIn || !portfolio || !resumeFile) {
      return NextResponse.json({ error: "All required fields must be filled." }, { status: 400 });
    }

    // ── Upload resume to Vercel Blob ─────────────────────────────────────────
    const resumeBuffer = Buffer.from(await resumeFile.arrayBuffer());
    const safeFileName = `careers/${Date.now()}-${resumeFile.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;

    const blob = await put(safeFileName, resumeBuffer, {
      access: "public",
      contentType: resumeFile.type,
    });

    // ── Save to Notion ────────────────────────────────────────────────────────
    await notion.pages.create({
      parent: { database_id: DB_ID },
      properties: {
        // Title property
        Name: {
          title: [{ text: { content: fullName } }],
        },
        Email: {
          email: email,
        },
        Phone: {
          phone_number: phone,
        },
        LinkedIn: {
          url: linkedIn.startsWith("http") ? linkedIn : `https://${linkedIn}`,
        },
        Portfolio: {
          url: portfolio.startsWith("http") ? portfolio : `https://${portfolio}`,
        },
        Resume: {
          files: [
            {
              name: resumeFile.name,
              type: "external",
              external: { url: blob.url },
            },
          ],
        },
        Department: {
          select: { name: department || "Unknown" },
        },
        Role: {
          rich_text: [{ text: { content: role } }],
        },
        Track: {
          select: { name: track || "Unknown" },
        },
        Message: {
          rich_text: [{ text: { content: message } }],
        },
        "Applied At": {
          date: { start: new Date().toISOString() },
        },
        Status: {
          select: { name: "New" },
        },
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[careers/route] error:", err);
    const message = err instanceof Error ? err.message : "Internal server error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
