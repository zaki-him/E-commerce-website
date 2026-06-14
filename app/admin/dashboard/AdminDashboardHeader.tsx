"use client";

import { useAuth } from "@/context/AuthContext";
import { LogOut } from "lucide-react";

export default function AdminDashboardHeader() {
  const { user, signOut } = useAuth();

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="font-serif text-3xl font-bold tracking-tight text-zinc-900">
          Dashboard
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          Welcome, {user?.email ?? "admin"}.
        </p>
      </div>
      <button
        onClick={signOut}
        className="flex items-center gap-2 rounded-sm border border-zinc-200 px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-zinc-500 transition-colors hover:border-zinc-900 hover:text-zinc-900"
      >
        <LogOut className="h-3.5 w-3.5" />
        Sign Out
      </button>
    </div>
  );
}
