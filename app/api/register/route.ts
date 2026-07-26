// @ts-nocheck
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Create Gmail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(request) {
  try {
    const body = await request.json();

    // Save to database
    const { data, error } = await supabase
      .from("students")
      .insert([body])
      .select();

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 },
      );
    }

    const student = data[0];

    // Send email via Gmail
    if (student.email && process.env.GMAIL_USER) {
      try {
        await transporter.sendMail({
          from: process.env.GMAIL_USER,
          to: student.email,
          subject: "🎉 Welcome to DELITECH IT Club!",
          html: `
            <h1>Welcome to DELITECH IT Club!</h1>
            <p>Thank you for registering, ${student.name}.</p>
            <p>You are now part of our community.</p>
            <p>Stay connected with us:</p>
            <p>📱 WhatsApp: ${process.env.NEXT_PUBLIC_WHATSAPP_GROUP_LINK || "Coming soon"}</p>
          `,
        });

        console.log(`✅ Welcome email sent to ${student.email}`);
      } catch (emailError) {
        console.error("❌ Email error:", emailError);
      }
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Registration failed" },
      { status: 500 },
    );
  }
}
