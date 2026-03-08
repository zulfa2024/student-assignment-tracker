import { connectDB } from "@/app/lib/mongodb";
import Assignment from "@/app/models/Assignment";
import Link from "next/link";
import DeleteButton from "@/app/components/DeleteButton";

export default async function AssignmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  await connectDB();

  const assignment = await Assignment.findById(id).lean();

  if (!assignment) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Assignment not found</h2>
        <Link href="/assignments/">Go back</Link>
      </div>
    );
  }

  const data = JSON.parse(JSON.stringify(assignment));

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

      {/* Edit Button */}
      <Link
        href={`/assignments/${data._id}/edit`}
        style={{
          display: "inline-block",
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          background: "#2563eb",
          color: "white",
          borderRadius: "6px",
          textDecoration: "none",
          marginRight: "10px",
        }}
      >
        Edit Assignment
      </Link>

      {/* Delete Button (client-side, no blank page) */}
      <DeleteButton id={data._id} />

      {/* Go Back Button (fixed) */}
      <Link
        href="/assignments/"
        style={{
          display: "inline-block",
          padding: "0.5rem 1rem",
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
  );
}
