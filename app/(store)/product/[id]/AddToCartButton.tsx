"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/data";

export default function AddToCartButton({ product }: { product: Product }) {
  const t = useTranslations("Product");
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button
      onClick={handleClick}
      className="mt-6 w-full bg-zinc-900 px-8 py-4 text-[10px] font-bold text-white uppercase tracking-[0.2em] hover:bg-black transition-colors rounded-sm flex items-center justify-center gap-2 cursor-pointer"
    >
      {added ? (
        <>
          <Check className="h-4 w-4" />
          {t("addedToCart")}
        </>
      ) : (
        t("addToBag")
      )}
    </button>
  );
}
