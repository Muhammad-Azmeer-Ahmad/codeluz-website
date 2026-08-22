import { NextResponse } from "next/server";
import { Resend } from "resend";

// Fallback logic if the user hasn't provided an API key yet
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!resend) {
      // Simulate successful submission for development
      console.log("Mock submission received:", data);
      return NextResponse.json({ success: true, mock: true });
    }

    const { name, email, projectType, details } = data;

    const { data: responseData, error } = await resend.emails.send({
      from: "Agency Estimator <onboarding@resend.dev>",
      to: ["delivered@resend.dev"], // The user will replace this with their own email
      subject: `New Project Estimate from ${name}`,
      html: `
        <h2>New Project Estimate Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Project Type:</strong> ${projectType}</p>
        <p><strong>Details:</strong> ${details}</p>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: responseData });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
