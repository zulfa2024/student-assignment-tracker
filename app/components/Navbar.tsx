"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="p-4 flex justify-between bg-gray-200">
      <Link href="/" className="font-bold">
        Student Assignment Tracker
      </Link>

      {!session ? (
        <Link
          href="/login"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Login
        </Link>
      ) : (
        <div className="flex items-center gap-4">
          <span>{session.user?.email}</span>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
