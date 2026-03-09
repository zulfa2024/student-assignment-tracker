import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/app/lib/mongodb";
import Assignment from "@/app/models/Assignment";
import Link from "next/link";
import { redirect } from "next/navigation";
import mongoose from "mongoose";

export default async function AssignmentDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login-required");
  }

  await connectDB();

  // ✅ Prevent MongoDB CastError
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Invalid Assignment ID</h2>
        <p>ID: {id}</p>
        <Link href="/assignments/list">Go back</Link>
      </div>
    );
  }

  const assignment = await Assignment.findById(id);

  if (!assignment) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Assignment not found</h2>
        <Link href="/assignments/list">Go back</Link>
      </div>
    );
  }

  const data = assignment.toObject();

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <h1>{data.title}</h1>

      <p>
        <strong>Description:</strong> {data.description}
      </p>

      <p>
        <strong>Status:</strong> {data.status}
      </p>

      <p>
        <strong>Due Date:</strong> {new Date(data.dueDate).toLocaleDateString()}
      </p>

      <div style={{ marginTop: "1rem" }}>
        <Link
          href={`/assignments/${data._id}/edit`}
          style={{
            padding: "8px 14px",
            background: "#2563eb",
            color: "white",
            borderRadius: "6px",
            textDecoration: "none",
            marginRight: "10px",
          }}
        >
          Edit Assignment
        </Link>

        <Link
          href="/assignments/list"
          style={{
            padding: "8px 14px",
            background: "#6b7280",
            color: "white",
            borderRadius: "6px",
            textDecoration: "none",
            marginLeft: "10px",
          }}
        >
          Go Back
        </Link>
      </div>
    </div>
  );
}
