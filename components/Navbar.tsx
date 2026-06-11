"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingBag, Menu, X, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Collections", href: "/" },
  { label: "Decor", href: "/" },
  { label: "Seating", href: "/" },
  { label: "Journal", href: "/" },
];

export default function Navbar() {
  const { cartCount, setIsCartOpen } = useCart();
  const { user, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 h-20 backdrop-blur-md bg-white/80 border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <button
          className="lg:hidden p-2 -ml-2 rounded-sm hover:bg-zinc-50 transition-colors"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5 text-zinc-900" />
        </button>

        <Link
          href="/"
          className="text-2xl font-bold tracking-tighter italic font-serif"
        >
          MODERN<span className="text-zinc-300">.</span>
        </Link>

        
        <div className="flex items-center gap-4">
          {user ? (
            <div className="relative hidden sm:block">
              <button
                onClick={() => setAccountOpen(!accountOpen)}
                className="p-2 rounded-sm hover:bg-zinc-50 transition-colors cursor-pointer"
                aria-label="Account menu"
              >
                <User className="h-5 w-5 text-zinc-900" />
              </button>
              {accountOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setAccountOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-zinc-100 shadow-lg rounded-sm z-50">
                    <div className="p-4 border-b border-zinc-100">
                      <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-bold">
                        Signed in as
                      </p>
                      <p className="text-sm text-zinc-900 mt-0.5 truncate">
                        {user.email}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        signOut();
                        setAccountOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 transition-colors cursor-pointer"
                    >
                      Sign out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden sm:inline-flex text-[11px] font-bold uppercase tracking-wider text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              Sign in
            </Link>
          )}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 -mr-2 rounded-sm hover:bg-zinc-50 transition-colors flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-zinc-900"
            aria-label={`Cart with ${cartCount} items`}
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
              className="fixed top-0 left-0 bottom-0 w-72 bg-white shadow-xl z-50 lg:hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-zinc-100">
                <span className="text-lg font-bold tracking-tighter italic font-serif">
                  MODERN<span className="text-zinc-300">.</span>
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 -mr-2 rounded-sm hover:bg-zinc-50 transition-colors"
                  aria-label="Close menu"
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
                {user ? (
                  <>
                    <span className="text-[11px] text-zinc-400">
                      {user.email}
                    </span>
                    <button
                      onClick={() => {
                        signOut();
                        setMobileOpen(false);
                      }}
                      className="text-left text-[11px] font-semibold uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer"
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setMobileOpen(false)}
                      className="text-[11px] font-semibold uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors"
                    >
                      Sign in
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setMobileOpen(false)}
                      className="text-[11px] font-semibold uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors"
                    >
                      Create account
                    </Link>
                  </>
                )}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
