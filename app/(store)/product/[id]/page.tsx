import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { products } from "@/lib/data";
import { Shield, Truck, RefreshCw } from "lucide-react";
import AddToCartButton from "./AddToCartButton";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) return {};
  return {
    title: `${product.name} — MODERN.`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) notFound();

  const t = await getTranslations("Product");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-zinc-900 transition-colors mb-8"
      >
        {t("backToCollection")}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        <div className="relative aspect-[4/5] bg-zinc-50 border border-zinc-100 rounded-sm overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover object-center"
            referrerPolicy="no-referrer"
            priority
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2">
            {product.category}
          </p>

          <h1 className="text-4xl sm:text-5xl font-serif italic tracking-tighter text-zinc-900">
            {product.name}
          </h1>

          <p className="text-sm text-zinc-500 mt-6 leading-relaxed">
            {product.description}
          </p>

          <ul className="mt-6 space-y-2">
            {product.features.map((f, i) => (
              <li
                key={i}
                className="text-xs text-zinc-500 flex items-start gap-2"
              >
                <span className="mt-1 h-1 w-1 rounded-full bg-zinc-300 shrink-0" />
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-8 pt-8 border-t border-zinc-100">
            <span className="text-2xl font-mono text-zinc-900">
              ${product.price}
            </span>
          </div>

          <AddToCartButton product={product} />

          <div className="mt-8 grid grid-cols-3 gap-4 pt-8 border-t border-zinc-100">
            <div className="text-center">
              <Truck className="h-5 w-5 text-zinc-400 mx-auto" />
              <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mt-2">
                {t("freeShipping")}
              </p>
              <p className="text-[10px] text-zinc-400 mt-0.5">
                {t("freeShippingDesc")}
              </p>
            </div>
            <div className="text-center">
              <Shield className="h-5 w-5 text-zinc-400 mx-auto" />
              <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mt-2">
                {t("secureCheckout")}
              </p>
              <p className="text-[10px] text-zinc-400 mt-0.5">
                {t("secureCheckoutDesc")}
              </p>
            </div>
            <div className="text-center">
              <RefreshCw className="h-5 w-5 text-zinc-400 mx-auto" />
              <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mt-2">
                {t("returns")}
              </p>
              <p className="text-[10px] text-zinc-400 mt-0.5">
                {t("returnsDesc")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
