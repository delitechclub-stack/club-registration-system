// @ts-nocheck
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    // 1. VALIDATION: Ensure a proper email format is provided
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    // 2. DATABASE INSERT
    const { data, error } = await supabase
      .from("students")
      .insert([body])
      .select();

    // 3. ERROR HANDLING - Check for specific Supabase errors
    if (error) {
      let errorMessage =
        "Registration failed. Please check your details and try again.";

      // Check for duplicate key violation (Unique email constraint)
      if (error.code === "23505") {
        errorMessage = "You are already part of DELITECH IT CLUB.";
      }

      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("Server Error:", error);
    // Do NOT expose internal server errors to the student
    return NextResponse.json(
      {
        error:
          "Registration failed because of a server/database error. Please try again.",
      },
      { status: 500 },
    );
  }
}
