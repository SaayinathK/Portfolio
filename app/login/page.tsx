"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Lock } from "lucide-react";

// Make this page dynamic (disable static prerendering)
export const dynamic = "force-dynamic";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD; // moved here
    if (password === ADMIN_PASSWORD) {
      document.cookie = "auth=true; path=/";
      router.replace((searchParams?.get("redirect")) || "/admin");
    } else {
      setError("Invalid password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-blue-400">
      <form
        onSubmit={handleLogin}
        className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-80 flex flex-col items-center"
      >
        <div className="flex flex-col items-center mb-6">
          <span className="bg-blue-600 p-3 rounded-full mb-2 shadow-lg">
            <Lock className="h-7 w-7 text-white" />
          </span>
          <h2 className="text-2xl font-extrabold text-blue-900 mb-1">
            Admin Login
          </h2>
          <p className="text-sm text-blue-700">Enter your admin password</p>
        </div>
        <input
          type="password"
          placeholder="Password"
          className="w-full border text-black border-blue-200 px-4 py-2 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <div className="text-red-500 mb-2 text-sm w-full text-center animate-shake">
            {error}
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2 rounded-lg font-semibold shadow hover:from-blue-700 hover:to-blue-600 transition"
        >
          Login
        </button>
      </form>
      <style jsx global>{`
        @keyframes shake {
          10%,
          90% {
            transform: translateX(-2px);
          }
          20%,
          80% {
            transform: translateX(4px);
          }
          30%,
          50%,
          70% {
            transform: translateX(-8px);
          }
          40%,
          60% {
            transform: translateX(8px);
          }
        }
        .animate-shake {
          animation: shake 0.4s;
        }
      `}</style>
    </div>
  );
}
