"use client";

import { useLocale } from "next-intl";
import { Globe } from "lucide-react";

const LABELS: Record<string, string> = {
  en: "EN",
  ar: "AR",
  fr: "FR",
};

export default function LanguageSwitcher() {
  const locale = useLocale();

  function switchLanguage(lang: string) {
    document.cookie = `NEXT_LOCALE=${lang};path=/;max-age=31536000`;
    window.location.reload();
  }

  return (
    <div className="relative group">
      <button
        className="flex items-center gap-1.5 p-2 rounded-sm hover:bg-zinc-50 transition-colors text-[11px] font-bold uppercase tracking-wider text-zinc-500 hover:text-zinc-900"
        aria-label="Switch language"
      >
        <Globe className="h-3.5 w-3.5" />
        <span>{LABELS[locale] ?? locale}</span>
      </button>
      <div className="absolute right-0 top-full mt-1 w-20 rounded-sm border border-zinc-100 bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
        {Object.entries(LABELS).map(([code, label]) => (
          <button
            key={code}
            onClick={() => switchLanguage(code)}
            className={`block w-full px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wider transition-colors hover:bg-zinc-50 ${
              code === locale
                ? "text-zinc-900 bg-zinc-50"
                : "text-zinc-500"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
