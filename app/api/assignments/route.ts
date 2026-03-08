import { NextRequest, NextResponse } from "next/server";
import Assignment from "@/app/models/Assignment";
import { connectDB } from "@/app/lib/mongodb";

export async function GET(req: NextRequest) {
  await connectDB();

  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "5");
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "all";

  const skip = (page - 1) * limit;

  // Build query
  const query: any = {};

  // Search filter
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  // Status filter
  if (status !== "all") {
    query.status = status;
  }

  const assignments = await Assignment.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await Assignment.countDocuments(query);

  return NextResponse.json({
    assignments,
    page,
    total,
    totalPages: Math.ceil(total / limit),
  });
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const created = await Assignment.create(body);
  return NextResponse.json(created, { status: 201 });
}
