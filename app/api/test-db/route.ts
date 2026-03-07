import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ status: "connected" });
  } catch (error: any) {
    console.error("DB ERROR:", error);
    return NextResponse.json(
      { error: error.message, details: error },
      { status: 500 },
    );
  }
}
