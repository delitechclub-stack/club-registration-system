// @ts-nocheck
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  try {
    const { data, error } = await resend.emails.send({
      from: "DELITECH IT Club <onboarding@resend.dev>",
      to: ["your-email@gmail.com"], // Replace with your actual email
      subject: "Test Email from DELITECH",
      html: "<p>This is a test email to confirm Resend is working!</p>",
    });

    if (error) {
      return NextResponse.json({ success: false, error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
