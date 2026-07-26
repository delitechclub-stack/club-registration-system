// @ts-nocheck
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function GET() {
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailPass) {
    return NextResponse.json(
      { success: false, error: "Missing GMAIL_USER or GMAIL_APP_PASSWORD" },
      { status: 500 },
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: gmailUser, pass: gmailPass },
    });

    const info = await transporter.sendMail({
      from: gmailUser,
      to: gmailUser,
      subject: "✅ Test Email from DELITECH",
      html: "<p>Test email from DELITECH IT Club!</p>",
    });

    return NextResponse.json({ success: true, info });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
