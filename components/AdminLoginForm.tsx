"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import { createClient } from "@/lib/supabase/client";
import { Loader2 } from "lucide-react";

export default function AdminLoginForm() {
  const t = useTranslations("Admin.login");
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    if (!authLoading && user) {
      router.replace("/admin/dashboard");
    }
  }, [user, authLoading, router]);

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-900" />
      </div>
    );
  }

  if (user) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    router.replace("/admin/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tighter italic font-serif"
          >
            MODERN<span className="text-zinc-300">.</span>
          </Link>
          <p className="mt-2 text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
            {t("heading")}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-sm bg-white p-8 shadow-sm border border-zinc-100"
        >
          <div className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-[11px] font-semibold uppercase tracking-widest text-zinc-500 mb-2"
              >
                {t("email")}
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-colors focus:border-zinc-900 focus:ring-0"
                placeholder={t("emailPlaceholder")}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-[11px] font-semibold uppercase tracking-widest text-zinc-500 mb-2"
              >
                {t("password")}
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-colors focus:border-zinc-900 focus:ring-0"
                placeholder={t("passwordPlaceholder")}
              />
            </div>
          </div>

          {error && (
            <p className="mt-4 text-[11px] font-semibold text-red-500 uppercase tracking-widest">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full bg-zinc-900 px-4 py-3 text-[11px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            {loading ? t("signingIn") : t("signIn")}
          </button>
        </form>
      </div>
    </div>
  );
}
