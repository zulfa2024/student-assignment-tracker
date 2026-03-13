"use client";

import { useRouter } from "next/navigation";

export default function DeleteButton({
  id,
  onDelete,
}: {
  id: string;
  onDelete: () => void;
}) {
  const router = useRouter();

  async function handleDelete() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this assignment?",
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/assignments/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        alert("Failed to delete assignment.");
        return;
      }

      // ⭐ Instantly update UI
      onDelete();

      // ⭐ Refresh server data in background
      router.refresh();
    } catch (error) {
      alert("Something went wrong.");
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      style={{
        padding: "0.5rem 1rem",
        background: "#dc2626",
        color: "white",
        borderRadius: "6px",
        border: "none",
        cursor: "pointer",
        marginRight: "10px",
      }}
    >
      Delete
    </button>
  );
}
