"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

export default function Hero() {
  return (
    <section className="relative flex flex-col lg:flex-row min-h-[60vh]">
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-0 max-w-2xl lg:ml-[max(2rem,calc((100vw-80rem)/2))]">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl sm:text-6xl md:text-7xl font-serif italic leading-none tracking-tighter text-zinc-900"
        >
          Objects
          <br />
          designed to
          <br />
          endure.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 sm:mt-8 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-zinc-500 max-w-md"
        >
          Curated furniture and objects for the modern home. Each piece chosen
          for its integrity of form and quality of craft.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 sm:mt-10"
        >
          <Link
            href="/"
            className="inline-block bg-zinc-900 px-8 py-4 text-[10px] font-bold text-white uppercase tracking-[0.2em] hover:bg-black transition-colors rounded-sm"
          >
            Shop Collection
          </Link>
        </motion.div>
      </div>

      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 border-t lg:border-t-0 lg:border-l border-zinc-100">
        <div className="relative w-full h-[40vh] sm:h-[50vh] lg:h-full min-h-[300px]">
          <Image
            src="https://images.unsplash.com/photo-1618220179428-22790b461013?w=1200&h=1500&fit=crop"
            alt="Modern interior with curated furniture"
            fill
            className="object-cover object-center"
            referrerPolicy="no-referrer"
            priority
          />
        </div>
      </div>
    </section>
  );
}
