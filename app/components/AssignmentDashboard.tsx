"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DeleteButton from "@/app/components/DeleteButton";

type Assignment = {
  _id: string;
  title: string;
  description?: string;
  dueDate: string;
  status: string;
};

export default function AssignmentDashboard() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<
    "all" | "pending" | "in-progress" | "completed"
  >("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const limit = 5;

  async function fetchAssignments() {
    try {
      setLoading(true);
      setError(null);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        search,
        status,
      });

      const res = await fetch(`/api/assignments?${params.toString()}`);
      if (!res.ok) {
        throw new Error("Failed to load assignments");
      }

      const data = await res.json();
      setAssignments(data.assignments || []);
      setTotalPages(data.totalPages || 1);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAssignments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, status]);

  function handleApplyFilters(e: React.FormEvent) {
    e.preventDefault();
    setPage(1);
    fetchAssignments();
  }

  return (
    <div>
      {/* Add New Assignment */}
      <Link
        href="/assignments/new"
        className="inline-block mb-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        + Add New Assignment
      </Link>

      {/* Search + Filter */}
      <form onSubmit={handleApplyFilters} className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search assignments..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[200px] border px-3 py-2 rounded"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as any)}
          className="border px-3 py-2 rounded"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In‑Progress</option>
          <option value="completed">Completed</option>
        </select>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Apply
        </button>
      </form>

      {/* Loading state */}
      {loading && (
        <div className="space-y-3 mb-6">
          <div className="h-16 bg-gray-200 animate-pulse rounded" />
          <div className="h-16 bg-gray-200 animate-pulse rounded" />
        </div>
      )}

      {/* Error state */}
      {error && <p className="mb-4 text-red-600">{error}</p>}

      {/* Empty state */}
      {!loading && !error && assignments.length === 0 && (
        <p className="text-gray-600 mb-4">No assignments found.</p>
      )}

      {/* Assignment List */}
      <div className="space-y-4">
        {assignments.map((assignment) => (
          <div
            key={assignment._id}
            className="border p-4 rounded shadow-sm flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-semibold">{assignment.title}</h2>
              <p className="text-gray-600 text-sm">
                Due: {new Date(assignment.dueDate).toLocaleDateString()}
              </p>
              <p className="text-xs mt-1 text-gray-500">
                Status: {assignment.status}
              </p>
            </div>

            <div className="flex gap-2">
              <Link
                href={`/assignments/${assignment._id}`}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                View
              </Link>

              {/* ⭐ DELETE BUTTON ADDED HERE */}
              <DeleteButton
                id={assignment._id}
                onDelete={() => {
                  setAssignments((prev) =>
                    prev.filter((item) => item._id !== assignment._id),
                  );
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-8">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className={`px-4 py-2 rounded ${
              page <= 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-600 text-white hover:bg-gray-700"
            }`}
          >
            Previous
          </button>

          <p className="text-gray-700">
            Page {page} of {totalPages}
          </p>

          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className={`px-4 py-2 rounded ${
              page >= totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-600 text-white hover:bg-gray-700"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
