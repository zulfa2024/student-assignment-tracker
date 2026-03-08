import { useRouter } from "next/navigation";

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    const res = await fetch(`/api/assignments/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.push("/assignments/list/"); // redirect after delete
    } else {
      alert("Failed to delete");
    }
  };

  return (
    <button
      onClick={handleDelete}
      style={{
        display: "inline-block",
        marginTop: "1rem",
        padding: "0.5rem 1rem",
        background: "#dc2626",
        color: "white",
        borderRadius: "6px",
        border: "none",
      }}
    >
      Delete Assignment
    </button>
  );
}
