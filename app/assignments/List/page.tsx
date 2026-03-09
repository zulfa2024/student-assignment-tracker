"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

type AssignmentType = {
  _id: string;
  title: string;
  description: string;
  status: string;
  dueDate: string;
  createdAt: string;
};

export default function AssignmentsPage() {
  const { data: session, status } = useSession();

  const [assignments, setAssignments] = useState<AssignmentType[]>([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Load assignments ONLY after session is ready
  useEffect(() => {
    if (status !== "authenticated") return;

    async function loadAssignments() {
      try {
        setError("");
        setLoading(true);

        const res = await fetch("/api/assignments", { cache: "no-store" });

        if (!res.ok) throw new Error("Failed to load assignments");

        const data = await res.json();
        setAssignments(data.assignments || []);
      } catch (err) {
        setError("Unable to load assignments.");
      } finally {
        setLoading(false);
      }
    }

    loadAssignments();
  }, [status]);

  // Session gate
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    redirect("/login-required");
  }

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }

  if (error) {
    return (
      <div
        style={{
          maxWidth: "700px",
          margin: "3rem auto",
          padding: "2rem",
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          fontFamily: "Inter, sans-serif",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "red", marginBottom: "1rem" }}>{error}</h2>

        <button
          onClick={() => window.location.reload()}
          style={{
            padding: "0.75rem 1.25rem",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  const filteredAssignments = assignments
    .filter((a) => {
      if (filter === "pending") return a.status === "pending";
      if (filter === "completed") return a.status === "completed";
      return true;
    })
    .filter((a) => a.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "3rem auto",
        padding: "2rem",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <h1 style={{ marginBottom: "1.5rem", textAlign: "center" }}>
        Assignments
      </h1>

      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <Link href="/assignments/new">
          <button
            style={{
              padding: "0.75rem 1.25rem",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            Create Assignment
          </button>
        </Link>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1.5rem",
        }}
      >
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "0.5rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            width: "60%",
          }}
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            padding: "0.5rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            width: "35%",
          }}
        >
          <option value="all">All Assignments</option>
          <option value="pending">Pending Only</option>
          <option value="completed">Completed Only</option>
        </select>
      </div>

      {filteredAssignments.length === 0 && (
        <p
          style={{
            textAlign: "center",
            color: "red",
            fontWeight: "500",
            marginTop: "1rem",
          }}
        >
          No assignments found.
        </p>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {filteredAssignments.map((a) => (
          <div
            key={a._id}
            style={{
              padding: "1rem",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              background: "#f9fafb",
            }}
          >
            <h3 style={{ margin: "0 0 0.5rem 0" }}>{a.title}</h3>

            <p style={{ margin: "0.25rem 0", color: "#555" }}>
              <strong>Due Date:</strong>{" "}
              {new Date(a.dueDate).toLocaleDateString()}
            </p>

            <p
              style={{
                margin: "0.25rem 0 1rem 0",
                color: a.status === "completed" ? "#16a34a" : "#d97706",
                fontWeight: 600,
              }}
            >
              Status: {a.status}
            </p>

            <Link
              href={`/assignments/${a._id}`}
              style={{
                padding: "0.5rem 1rem",
                background: "#2563eb",
                color: "white",
                borderRadius: "6px",
                textDecoration: "none",
                fontSize: "0.9rem",
              }}
            >
              View / Edit
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
