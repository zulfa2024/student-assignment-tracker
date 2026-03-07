"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditForm({ assignment }: { assignment: any }) {
  const router = useRouter();

  const [title, setTitle] = useState(assignment.title);
  const [description, setDescription] = useState(assignment.description);
  const [dueDate, setDueDate] = useState(
    assignment.dueDate?.slice(0, 10) || "",
  );
  const [status, setStatus] = useState(assignment.status);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const id = assignment._id.toString(); // ensure string

    const res = await fetch(`/api/assignments/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        dueDate,
        status,
      }),
    });

    // Only redirect if update succeeded
    if (res.ok) {
      router.replace(`/assignments/${id}`);
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Assignment</h1>

      <div>
        <label className="block font-medium mb-1">Title</label>
        <input
          className="w-full border px-3 py-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Description</label>
        <textarea
          className="w-full border px-3 py-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Due Date</label>
        <input
          type="date"
          className="w-full border px-3 py-2 rounded"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Status</label>
        <select
          className="w-full border px-3 py-2 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        Update Assignment
      </button>
    </form>
  );
}
