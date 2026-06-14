"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const t = useTranslations("Navbar");
  const { cartCount, setIsCartOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const NAV_LINKS = [
    { label: t("home"), href: "/" },
    { label: t("collections"), href: "/" },
    { label: t("decor"), href: "/" },
    { label: t("seating"), href: "/" },
    { label: t("journal"), href: "/" },
  ];

  return (
    <header className="sticky top-0 z-40 h-20 backdrop-blur-md bg-white/80 border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <button
          className="lg:hidden p-2 -ml-2 rtl:-mr-2 rounded-sm hover:bg-zinc-50 transition-colors"
          onClick={() => setMobileOpen(true)}
          aria-label={t("openMenu")}
        >
          <Menu className="h-5 w-5 text-zinc-900" />
        </button>

        <Link
          href="/"
          className="text-2xl font-bold tracking-tighter italic font-serif"
        >
          MODERN<span className="text-zinc-300">.</span>
        </Link>

        <div className="flex items-center gap-1">
          <LanguageSwitcher />
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 -mr-2 rtl:-ml-2 rounded-sm hover:bg-zinc-50 transition-colors flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-zinc-900"
            aria-label={t("cartLabel", { count: cartCount })}
          >
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="text-[11px] font-bold">{cartCount}</span>
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-zinc-900/40 backdrop-blur-md z-50 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 rtl:left-auto rtl:right-0 bottom-0 w-72 bg-white shadow-xl z-50 lg:hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-zinc-100">
                <span className="text-lg font-bold tracking-tighter italic font-serif">
                  MODERN<span className="text-zinc-300">.</span>
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 -mr-2 rounded-sm hover:bg-zinc-50 transition-colors"
                  aria-label={t("closeMenu")}
                >
                  <X className="h-5 w-5 text-zinc-900" />
                </button>
              </div>
              <nav className="p-6 flex flex-col gap-6">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-[11px] font-semibold uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <hr className="border-zinc-100" />
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
