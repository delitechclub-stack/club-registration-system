// @ts-nocheck
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { renderToStream } from "@react-pdf/renderer";
import CertificatePDF from "@/components/CertificatePDF";
import nodemailer from "nodemailer";

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
        { status: 400 }
      );
    }

    const student = data[0];

    // Generate PDF certificate
    if (student.email) {
      try {
        const pdfStream = await renderToStream(
          <CertificatePDF student={student} />
        );
        const chunks = [];
        for await (const chunk of pdfStream) chunks.push(chunk);
        const pdfBuffer = Buffer.concat(chunks);

        // Set up Gmail transporter
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
          },
        });

        // Send email
        await transporter.sendMail({
          from: process.env.GMAIL_USER,
          to: student.email,
          subject: "🎉 Welcome to DELITECH IT Club!",
          html: `
            <h1>Welcome, ${student.name}!</h1>
            <p>Thank you for registering for DELITECH IT Club.</p>
            <p>Your digital certificate is attached to this email.</p>
            <p>Stay connected with us!</p>
            <p>📱 WhatsApp: ${process.env.NEXT_PUBLIC_WHATSAPP_GROUP_LINK || "Coming soon"}</p>
          `,
          attachments: [
            {
              filename: `Certificate_${student.name.replace(/\s/g, "_")}.pdf`,
              content: pdfBuffer,
            },
          ],
        });

        console.log(`✅ Email sent to ${student.email}`);
      } catch (emailError) {
        console.error("❌ Email error:", emailError);
      }
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Registration failed" },
      { status: 500 }
    );
  }
}