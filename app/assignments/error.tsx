"use client";

interface GlobalErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: GlobalErrorProps) {
  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold mb-4">Something Went Wrong</h1>
      <p className="text-gray-600 mb-6">{error?.message}</p>

      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Try Again
      </button>
    </div>
  );
}
