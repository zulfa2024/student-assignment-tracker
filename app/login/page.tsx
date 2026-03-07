"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session) {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-semibold mb-6">Sign in to your account</h1>

        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Continue with Google
        </button>

        <p className="text-gray-500 text-sm mt-6">
          You will be redirected back after signing in.
        </p>
      </div>
    </div>
  );
}
