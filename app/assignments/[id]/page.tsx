import { notFound, redirect } from "next/navigation";
import Assignment from "@/app/models/Assignment";
import { connectDB } from "@/app/lib/mongodb";
import Link from "next/link";

export default async function AssignmentDetailPage({ params }) {
  const { id } = await params;

  await connectDB();

  const assignment = JSON.parse(
    JSON.stringify(await Assignment.findById(id).lean()),
  );

  if (!assignment) return notFound();

  async function deleteAssignment() {
    "use server";
    await connectDB();
    await Assignment.findByIdAndDelete(assignment._id);
    redirect("/");
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{assignment.title}</h1>

      {/* ⭐ Go Back + Edit + Delete */}
      <div className="flex gap-4 mb-6">
        <Link
          href="/"
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Go Back
        </Link>

        <a
          href={`/assignments/${assignment._id}/edit`}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Edit
        </a>

        <form action={deleteAssignment}>
          <button
            type="submit"
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </form>
      </div>

      <p className="text-gray-700 mb-4">{assignment.description}</p>

      <p className="text-sm text-gray-500 mb-6">
        Due: {new Date(assignment.dueDate).toLocaleDateString()}
      </p>

      <p className="text-sm font-medium">
        Status:{" "}
        <span className="px-2 py-1 rounded bg-gray-200">
          {assignment.status}
        </span>
      </p>
    </div>
  );
}
