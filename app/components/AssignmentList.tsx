"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// ✅ Define the Assignment type
type AssignmentType = {
  _id: string;
  title: string;
  description: string;
  status: string;
  dueDate: string;
  createdAt: string;
};

export default function AssignmentList() {
  // ✅ Tell React what type the array contains
  const [assignments, setAssignments] = useState<AssignmentType[]>([]);

  useEffect(() => {
    fetch("/api/assignments")
      .then((res) => res.json())
      .then((data) => {
        // Your API returns { assignments: [...] }
        setAssignments(data.assignments || []);
      });
  }, []);

  return (
    <div className="space-y-4">
      {assignments.length === 0 && (
        <p className="text-gray-500">No assignments yet.</p>
      )}

      {assignments.map((a: AssignmentType) => (
        <Link
          key={a._id}
          href={`/assignments/${a._id}`}
          className="block p-4 bg-white shadow rounded border border-gray-200 hover:bg-gray-50 transition"
        >
          <h2 className="font-bold text-lg">{a.title}</h2>
          <p className="text-gray-700">{a.description}</p>
          <p className="text-sm text-gray-500">
            Due: {new Date(a.dueDate).toLocaleDateString()}
          </p>
        </Link>
      ))}
    </div>
  );
}
