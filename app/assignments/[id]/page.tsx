import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/app/lib/mongodb";
import Assignment from "@/app/models/Assignment";
import Link from "next/link";
import DeleteButton from "@/app/components/DeleteButton";
import { redirect } from "next/navigation";
import mongoose from "mongoose";

type Props = {
  params: {
    id: string;
  };
};

export default async function AssignmentDetailPage({ params }: Props) {
  const session = await getServerSession(authOptions);

  // Protect page
  if (!session) {
    redirect("/login-required");
  }

  const { id } = params;

  console.log("Assignment page requested ID:", id);

  // Validate Mongo ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Invalid assignment ID</h2>
        <Link href="/assignments/list">Go back</Link>
      </div>
    );
  }

  await connectDB();

  const assignment = await Assignment.findById(id).lean();

  if (!assignment) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Assignment not found</h2>
        <Link href="/assignments/list">Go back</Link>
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

      <div style={{ marginTop: "20px" }}>
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

        <DeleteButton id={data._id} />

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
