import { notFound } from "next/navigation";
import { connectDB } from "@/app/lib/mongodb";
import Assignment from "@/app/models/Assignment";
import EditForm from "./EditForm";

export default async function EditAssignmentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  await connectDB();

  const assignment = await Assignment.findById(id).lean();

  if (!assignment) return notFound();

  const data = JSON.parse(JSON.stringify(assignment));

  return <EditForm assignment={data} />;
}
