"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl mb-4">Sign in with Discord</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => signIn("discord")}
      >
        Sign In
      </button>
    </div>
  );
}
