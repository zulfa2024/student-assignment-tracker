"use client";

export default function AssignmentDetailsError({ error, reset }: any) {
  return (
    <div className="p-6 max-w-3xl mx-auto text-center">
      <h1 className="text-2xl font-bold text-red-600 mb-4">
        Something went wrong loading this assignment
      </h1>

      <p className="text-gray-700 mb-6">{error?.message}</p>

      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Try Again
      </button>
    </div>
  );
}
