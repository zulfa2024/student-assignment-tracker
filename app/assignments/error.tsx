"use client";

interface AssignmentErrorProps {
  error: Error;
  reset: () => void;
}

export default function AssignmentError({
  error,
  reset,
}: AssignmentErrorProps) {
  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold mb-4">Assignment Error</h1>

      <p className="text-gray-600 mb-6">
        {error?.message || "Unable to load this assignment."}
      </p>

      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Try Again
      </button>
    </div>
  );
}
