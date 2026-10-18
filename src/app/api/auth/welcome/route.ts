import { NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend with your API key (get one free at resend.com)
const resend = new Resend(process.env.RESEND_API_KEY || "re_123456789");

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Send real email via Resend
    const data = await resend.emails.send({
      from: "WebMCP Console <onboarding@resend.dev>",
      to: [email],
      subject: "Welcome to WebMCP Console — Your API Keys are Ready",
      html: `
        <div style="font-family: sans-serif; background-color: #030014; color: #ffffff; padding: 32px; border-radius: 12px;">
          <h2 style="color: #818cf8; margin-bottom: 16px;">Welcome to WebMCP Console!</h2>
          <p style="color: #cbd5e1; font-size: 14px; line-height: 1.6;">
            We are thrilled to have you on board. Your account has been successfully created for <strong>${email}</strong>.
          </p>
          <p style="color: #cbd5e1; font-size: 14px; line-height: 1.6;">
            You can now log in to your dashboard to generate your production WebMCP API keys, configure your Cloudflare Worker proxies, and transform your stores for AI agents.
          </p>
          <div style="margin-top: 24px;">
            <a href="http://localhost:3000/login" style="background-color: #4f46e5; color: #ffffff; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: bold;">
              Access Your Dashboard →
            </a>
          </div>
          <p style="color: #64748b; font-size: 12px; margin-top: 32px;">
            If you did not request this account, please ignore this email.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Email dispatch error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
