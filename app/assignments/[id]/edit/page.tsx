import { notFound } from "next/navigation";
import { connectDB } from "@/app/lib/mongodb";
import Assignment from "@/app/models/Assignment";
import EditForm from "./EditForm";

export default async function EditAssignmentPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  await connectDB();

  const assignment = JSON.parse(
    JSON.stringify(await Assignment.findById(id).lean()),
  );

  if (!assignment) return notFound();

  return <EditForm assignment={assignment} />;
}
