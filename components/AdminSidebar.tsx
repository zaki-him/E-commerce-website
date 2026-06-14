"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  LogOut,
  Menu,
  ShoppingBag,
  X,
  ChevronRight,
} from "lucide-react";

export default function AdminSidebar() {
  const t = useTranslations("Admin.sidebar");
  const { signOut } = useAuth();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const NAV_ITEMS = [
    { label: t("dashboard"), href: "/admin/dashboard", icon: LayoutDashboard },
    { label: t("orders"), href: "/admin/orders", icon: ShoppingBag },
  ];

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-50 rounded-sm border border-zinc-200 bg-white p-2.5 shadow-sm lg:hidden"
        aria-label={t("openMenu")}
      >
        <Menu className="h-5 w-5 text-zinc-900" />
      </button>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-zinc-900/40 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-zinc-100 bg-white transition-transform duration-300 lg:static lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-5">
          <Link
            href="/admin/dashboard"
            className="text-xl font-bold tracking-tighter italic font-serif"
            onClick={() => setMobileOpen(false)}
          >
            MODERN<span className="text-zinc-300">.</span>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="rounded-sm p-1 hover:bg-zinc-50 transition-colors lg:hidden"
            aria-label={t("closeMenu")}
          >
            <X className="h-5 w-5 text-zinc-500" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-6">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm transition-colors ${
                  isActive
                    ? "bg-zinc-100 text-zinc-900 font-semibold"
                    : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span className="text-[11px] font-semibold uppercase tracking-widest">
                  {item.label}
                </span>
                {isActive && (
                  <ChevronRight className="ml-auto h-3.5 w-3.5 text-zinc-400" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-zinc-100 px-3 py-4">
          <button
            onClick={signOut}
            className="flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-sm text-zinc-500 transition-colors hover:bg-zinc-50 hover:text-zinc-900"
          >
            <LogOut className="h-4 w-4" />
            <span className="text-[11px] font-semibold uppercase tracking-widest">
              {t("signOut")}
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}
