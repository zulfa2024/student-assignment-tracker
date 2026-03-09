import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Assignment from "@/app/models/Assignment";
import { connectDB } from "@/app/lib/mongodb";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "5");
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "all";

  const skip = (page - 1) * limit;

  const query: any = {};

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  if (status !== "all") {
    query.status = status;
  }

  let assignments = await Assignment.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  assignments = assignments.map((a) => ({
    ...a,
    _id: a._id.toString(),
  }));

  const total = await Assignment.countDocuments(query);

  return NextResponse.json({
    assignments,
    page,
    total,
    totalPages: Math.ceil(total / limit),
  });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const body = await req.json();
  const created = await Assignment.create(body);
  return NextResponse.json(created, { status: 201 });
}
