"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartSidebar() {
  const t = useTranslations("CartSidebar");
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartTotal,
    cartCount,
  } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-zinc-900/40 backdrop-blur-md z-50"
            onClick={() => setIsCartOpen(false)}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 rtl:right-auto rtl:left-0 bottom-0 w-screen max-w-md bg-white shadow-xl z-50 flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-100">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-900">
                {t("title", { count: cartCount })}
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 -mr-2 rounded-sm hover:bg-zinc-50 transition-colors cursor-pointer"
                aria-label={t("close")}
              >
                <X className="h-5 w-5 text-zinc-900" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6">
                <ShoppingBag className="h-10 w-10 text-zinc-300" />
                <p className="text-sm text-zinc-400">{t("empty")}</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-900 hover:text-zinc-500 transition-colors cursor-pointer"
                >
                  {t("continueShopping")}
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-4">
                      <div className="h-24 w-24 shrink-0 bg-zinc-50 border border-zinc-100 rounded-sm overflow-hidden relative">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover object-center"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            href={`/product/${item.product.id}`}
                            onClick={() => setIsCartOpen(false)}
                            className="text-[12px] font-bold uppercase tracking-wider text-zinc-900 hover:text-zinc-500 transition-colors truncate"
                          >
                            {item.product.name}
                          </Link>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="p-1 -mr-1 shrink-0 rounded-sm hover:bg-zinc-50 transition-colors cursor-pointer"
                            aria-label={t("removeItem", {
                              name: item.product.name,
                            })}
                          >
                            <X className="h-3 w-3 text-zinc-400 hover:text-zinc-900 transition-colors" />
                          </button>
                        </div>
                        <p className="text-[10px] text-zinc-400 mt-0.5">
                          {item.product.category}
                        </p>
                        <p className="text-[10px] font-mono text-zinc-500 mt-1">
                          ${item.product.price}
                        </p>
                        <div className="flex items-center gap-2 mt-2 border border-zinc-200 w-fit rounded-sm">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity - 1,
                              )
                            }
                            className="p-1 px-2 text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer"
                            aria-label={t("decreaseQty")}
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-[10px] font-mono text-zinc-900 w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity + 1,
                              )
                            }
                            className="p-1 px-2 text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer"
                            aria-label={t("increaseQty")}
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-zinc-100 bg-zinc-50/50 px-6 py-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                      {t("subtotal")}
                    </span>
                    <span className="text-xs font-mono text-zinc-900">
                      ${cartTotal.toLocaleString()}
                    </span>
                  </div>
                  <Link
                    href="/order"
                    onClick={() => setIsCartOpen(false)}
                    className="block w-full bg-zinc-900 px-8 py-4 text-[10px] font-bold text-white uppercase tracking-[0.2em] hover:bg-black transition-colors rounded-sm text-center"
                  >
                    {t("order")}
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
