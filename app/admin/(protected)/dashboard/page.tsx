import { createClient } from "@/lib/supabase/server";
import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { products } from "@/lib/data";

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const t = await getTranslations("Admin.dashboard");
  const [orderCount, productCount] = await Promise.all([
    prisma.order.count(),
    Promise.resolve(products.length),
  ]);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold tracking-tight text-zinc-900">
          {t("title")}
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          {t("welcome", { email: user?.email ?? "admin" })}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <StatCard label={t("totalOrders")} value={String(orderCount)} />
        <StatCard label={t("products")} value={String(productCount)} />
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-sm border border-zinc-100 bg-white p-6 shadow-sm">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
        {label}
      </p>
      <p className="mt-2 font-serif text-3xl font-bold tracking-tight text-zinc-900">
        {value}
      </p>
    </div>
  );
}
