import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Assignment from "@/app/models/Assignment";
import { connectDB } from "@/app/lib/mongodb";

// GET one assignment
export async function GET(req, context) {
  const params = await context.params; // ⭐ FIX
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const assignment = await Assignment.findById(params.id);
  if (!assignment) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(assignment);
}

// UPDATE assignment
export async function PUT(req, context) {
  const params = await context.params; // ⭐ FIX
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const body = await req.json();

  const updated = await Assignment.findByIdAndUpdate(params.id, body, {
    returnDocument: "after",
  });

  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}

// DELETE assignment
export async function DELETE(req, context) {
  const params = await context.params; // ⭐ FIX
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const deleted = await Assignment.findByIdAndDelete(params.id);

  if (!deleted) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Deleted successfully" });
}
