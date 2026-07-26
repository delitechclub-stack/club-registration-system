import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    whatsapp_link: process.env.NEXT_PUBLIC_WHATSAPP_GROUP_LINK || "❌ NOT SET",
    instagram_link: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "❌ NOT SET",
    hardcoded_test: "If you see this, the code updated!",
  });
}
