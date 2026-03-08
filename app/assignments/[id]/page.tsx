import { connectDB } from "@/app/lib/mongodb";
import Assignment from "@/app/models/Assignment";
import Link from "next/link";

export default async function AssignmentDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  await connectDB();

  const assignment = JSON.parse(
    JSON.stringify(await Assignment.findById(id).lean()),
  );

  if (!assignment) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Assignment not found</h2>
        <Link href="/assignments">Go back</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <h1>{assignment.title}</h1>
      <p>
        <strong>Description:</strong> {assignment.description}
      </p>
      <p>
        <strong>Status:</strong> {assignment.status}
      </p>
      <p>
        <strong>Due Date:</strong>{" "}
        {new Date(assignment.dueDate).toLocaleDateString()}
      </p>

      <Link
        href={`/assignments/${assignment._id}/edit`}
        style={{
          display: "inline-block",
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          background: "#2563eb",
          color: "white",
          borderRadius: "6px",
          textDecoration: "none",
        }}
      >
        Edit Assignment
      </Link>
    </div>
  );
}
