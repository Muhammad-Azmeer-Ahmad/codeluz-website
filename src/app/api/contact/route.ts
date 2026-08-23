import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, phone, details, projectType, serviceType } = data;

    await resend.emails.send({
      from: "Codeluz Website <onboarding@resend.dev>",
      to: ["azmeerbaloch29@gmail.com", "fareedshah682@gmail.com", "contact@codeluz.com"],
      subject: `New Inquiry from ${name || "Website Visitor"}`,
      html: `
        <h2>New Project Inquiry</h2>
        <p><strong>Name:</strong> ${name || "-"}</p>
        ${email ? `<p><strong>Email:</strong> ${email}</p>` : ""}
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
        ${projectType ? `<p><strong>Project Type:</strong> ${projectType}</p>` : ""}
        ${serviceType ? `<p><strong>Service Needed:</strong> ${serviceType}</p>` : ""}
        <p><strong>Details:</strong></p>
        <p>${details || "-"}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}