import { connectDB } from "@/app/lib/mongodb";
import Assignment from "@/app/models/Assignment";
import EditForm from "./EditForm";

export default async function EditAssignmentPage(props: {
  params: Promise<{ id: string }>;
}) {
  // ⭐ Unwrap the async params (Next.js 15+ behavior)
  const { id } = await props.params;

  await connectDB();

  const assignment = await Assignment.findById(id).lean();

  if (!assignment) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Assignment not found</h2>
        <p>ID: {id}</p>
      </div>
    );
  }

  const data = JSON.parse(JSON.stringify(assignment));

  return <EditForm assignment={data} />;
}
