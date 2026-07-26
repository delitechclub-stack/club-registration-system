// @ts-nocheck
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();

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

    // Send simple welcome email (NO CERTIFICATE)
    if (student.email && process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: "DELITECH IT Club <onboarding@resend.dev>",
          to: [student.email],
          subject: "🎉 Welcome to DELITECH IT Club!",
          html: `
            <h1>Welcome to DELITECH IT Club!</h1>
            <p>Thank you for registering, ${student.name}.</p>
            <p>You are now part of our community.</p>
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
