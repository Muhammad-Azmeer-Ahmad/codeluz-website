import { Resend } from "resend";
import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(200).optional().or(z.literal("")),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  details: z.string().trim().min(1).max(5000),
  projectType: z.string().trim().max(100).optional().or(z.literal("")),
  serviceType: z.string().trim().max(100).optional().or(z.literal("")),
});

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = contactSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json({ success: false, error: "Invalid input" }, { status: 400 });
    }

    const { name, email, phone, details, projectType, serviceType } = parsed.data;

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Codeluz Website <contact@codeluz.com>",
      to: ["azmeerbaloch29@gmail.com", "fareedshah682@gmail.com", "contact@codeluz.com"],
      subject: `New Inquiry from ${escapeHtml(name || "Website Visitor")}`,
      html: `
        <h2>New Project Inquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(name || "-")}</p>
        ${email ? `<p><strong>Email:</strong> ${escapeHtml(email)}</p>` : ""}
        ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
        ${projectType ? `<p><strong>Project Type:</strong> ${escapeHtml(projectType)}</p>` : ""}
        ${serviceType ? `<p><strong>Service Needed:</strong> ${escapeHtml(serviceType)}</p>` : ""}
        <p><strong>Details:</strong></p>
        <p>${escapeHtml(details || "-")}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}