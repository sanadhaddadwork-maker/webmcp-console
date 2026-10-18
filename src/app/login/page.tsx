"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabaseBrowser";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const supabase = createClient();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMsg("Non-existing account.");
        setLoading(false);
        return;
      }

      window.location.href = "/";
    } catch (err) {
      // Catches network/fetch errors if Supabase is unconfigured or offline
      setErrorMsg("Non-existing account.");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh] w-full">
      <div className="bg-[#090520] border border-indigo-900/60 rounded-2xl p-8 w-full max-w-md space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-white tracking-tight">Welcome Back</h1>
          <p className="text-xs text-indigo-200/70">
            Sign in to access your WebMCP developer console
          </p>
        </div>

        {errorMsg && (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs space-y-2 text-center">
            <p className="font-medium">{errorMsg}</p>
            <div className="pt-1">
              Don't have an account?{" "}
              <Link href="/signup" className="text-indigo-400 hover:text-white font-semibold underline underline-offset-2">
                Sign up
              </Link>
            </div>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-indigo-200 mb-1.5 uppercase tracking-wider">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="developer@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#030014] border border-indigo-900/60 rounded-xl px-4 py-2.5 text-xs text-white placeholder-indigo-300/30 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-indigo-200 mb-1.5 uppercase tracking-wider">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#030014] border border-indigo-900/60 rounded-xl px-4 py-2.5 text-xs text-white placeholder-indigo-300/30 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs transition-all shadow-lg shadow-indigo-600/30 active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? "Verifying Credentials..." : "Sign In →"}
          </button>
        </form>

        <div className="text-center text-xs text-indigo-200/60 pt-2 border-t border-indigo-950">
          Don't have an account?{" "}
          <Link href="/signup" className="text-indigo-400 hover:text-white font-medium">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
