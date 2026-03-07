"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AssignmentList() {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetch("/api/assignments")
      .then((res) => res.json())
      .then((data) => setAssignments(data));
  }, []);

  return (
    <div className="space-y-4">
      {assignments.length === 0 && (
        <p className="text-gray-500">No assignments yet.</p>
      )}

      {assignments.map((a) => (
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
