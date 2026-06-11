"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { products, categories, priceRanges, type Category } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import { useIsMobile } from "@/hooks/use-mobile";

interface Filters {
  categories: Category[];
  priceRange: [number, number];
}

export default function ProductGrid() {
  const isMobile = useIsMobile();
  const { addToCart } = useCart();
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    categories: [],
    priceRange: [0, Infinity],
  });

  const filtered = products.filter((p) => {
    if (filters.categories.length && !filters.categories.includes(p.category))
      return false;
    if (p.price < filters.priceRange[0] || p.price > filters.priceRange[1])
      return false;
    return true;
  });

  const toggleCategory = (cat: Category) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter((c) => c !== cat)
        : [...prev.categories, cat],
    }));
  };

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < Infinity;

  const clearFilters = () => {
    setFilters({
      categories: [],
      priceRange: [0, Infinity],
    });
  };

  const FilterContent = () => (
    <div className="space-y-8">

      <div>
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-3">
          Category
        </h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={filters.categories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                className="h-4 w-4 rounded-sm border-zinc-300 text-zinc-900 focus:ring-zinc-900 accent-zinc-900"
              />
              <span className="text-xs text-zinc-500 group-hover:text-zinc-900 transition-colors">
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-3">
          Price Range
        </h3>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <label
              key={range.label}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="radio"
                name="price"
                checked={
                  filters.priceRange[0] === range.min &&
                  filters.priceRange[1] === range.max
                }
                onChange={() =>
                  setFilters((prev) => ({
                    ...prev,
                    priceRange: [range.min, range.max],
                  }))
                }
                className="h-4 w-4 border-zinc-300 text-zinc-900 focus:ring-zinc-900 accent-zinc-900"
              />
              <span className="text-xs text-zinc-500 group-hover:text-zinc-900 transition-colors">
                {range.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-serif italic text-zinc-900">
            All Products
          </h2>
          <button
            onClick={() => setFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer"
            aria-label="Open filters"
          >
            <Filter className="h-4 w-4" />
            Filters
            {hasActiveFilters && (
              <span className="h-2 w-2 rounded-full bg-zinc-900" />
            )}
          </button>
        </div>

        <div className="flex gap-12">
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-900">
                Filters
              </h2>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-zinc-900 transition-colors cursor-pointer"
                >
                  Clear all
                </button>
              )}
            </div>
            <FilterContent />
          </aside>

          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-sm text-zinc-400 mb-4">
                  No products match your filters.
                </p>
                <button
                  onClick={clearFilters}
                  className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-900 hover:text-zinc-500 transition-colors cursor-pointer"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                {filtered.map((product, idx) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.4 }}
                    className="group relative flex flex-col"
                  >
                    <Link
                      href={`/product/${product.id}`}
                      className="relative aspect-[4/5] bg-zinc-50 border border-zinc-100 rounded-sm overflow-hidden"
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-end p-4">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            addToCart(product);
                          }}
                          className="w-full bg-white/80 backdrop-blur-md px-4 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-900 shadow-xl border border-white/50 hover:bg-white/90 transition-colors rounded-sm cursor-pointer"
                        >
                          Quick Add
                        </button>
                      </div>
                    </Link>

                    <div className="mt-4 flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[12px] font-bold uppercase tracking-wider text-zinc-900">
                          {product.name}
                        </p>
                        <p className="text-xs text-zinc-400 mt-0.5">
                          {product.category}
                        </p>
                      </div>
                      <span className="text-xs font-mono text-zinc-500 shrink-0">
                        ${product.price}
                      </span>
                    </div>

                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {filterOpen && isMobile && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-zinc-900/40 backdrop-blur-md z-50"
              onClick={() => setFilterOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-white shadow-xl z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-900">
                      Filters
                    </h2>
                    {hasActiveFilters && (
                      <button
                        onClick={clearFilters}
                        className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-zinc-900 transition-colors cursor-pointer"
                      >
                        Clear all
                      </button>
                    )}
                  </div>
                  <button
                    onClick={() => setFilterOpen(false)}
                    className="p-2 -mr-2 rounded-sm hover:bg-zinc-50 transition-colors cursor-pointer"
                    aria-label="Close filters"
                  >
                    <X className="h-4 w-4 text-zinc-900" />
                  </button>
                </div>
                <FilterContent />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
