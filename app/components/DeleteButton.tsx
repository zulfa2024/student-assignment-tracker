"use client";

import { useRouter } from "next/navigation";

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this assignment?",
    );
    if (!confirmed) return;

    const res = await fetch(`/api/assignments/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.replace("/assignments/list/"); // ✅ FIXED
      router.refresh();
    } else {
      alert("Failed to delete assignment.");
    }
  }

  return (
    <button
      onClick={handleDelete}
      style={{
        padding: "0.5rem 1rem",
        background: "#dc2626",
        color: "white",
        borderRadius: "6px",
        border: "none",
        cursor: "pointer",
      }}
    >
      Delete
    </button>
  );
}
