import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import OrderActions from "@/components/OrderActions";

const STATUSES = ["all", "pending", "processing", "shipped", "delivered", "cancelled"] as const;

const PAGE_SIZE = 10;

export default async function AdminOrders({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; status?: string }>;
}) {
  const t = await getTranslations("Admin.orders");
  const params = await searchParams;
  const currentPage = Math.max(1, Number(params.page) || 1);
  const currentStatus = params.status && STATUSES.includes(params.status as any) ? params.status : "all";

  const where = currentStatus !== "all" ? { status: currentStatus } : {};

  const [orders, totalCount] = await Promise.all([
    prisma.order.findMany({
      where,
      include: { items: true },
      orderBy: { createdAt: "desc" },
      skip: (currentPage - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.order.count({ where }),
  ]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold tracking-tight text-zinc-900">
          {t("title")}
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          {t("count", { count: totalCount })}
        </p>
      </div>

      {/* Filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        {STATUSES.map((status) => {
          const href = status === "all" ? "/admin/orders" : `/admin/orders?status=${status}`;
          const isActive =
            status === "all" ? currentStatus === "all" : currentStatus === status;
          return (
            <Link
              key={status}
              href={href}
              className={`rounded-sm px-4 py-2 text-[11px] font-semibold uppercase tracking-widest transition-colors ${
                isActive
                  ? "bg-zinc-900 text-white"
                  : "border border-zinc-200 text-zinc-500 hover:border-zinc-300 hover:text-zinc-700"
              }`}
            >
              {t(status)}
            </Link>
          );
        })}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-sm border border-zinc-100 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-100">
              <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                {t("customer")}
              </th>
              <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                {t("phone")}
              </th>
              <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                {t("location")}
              </th>
              <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                {t("items")}
              </th>
              <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                {t("total")}
              </th>
              <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                {t("status")}
              </th>
              <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                {t("date")}
              </th>
              <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                {t("actions")}
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              return (
                <tr
                  key={order.id}
                  className="border-b border-zinc-50 last:border-0 hover:bg-zinc-50 transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-zinc-900">
                    {order.name}
                  </td>
                  <td className="px-4 py-3 text-zinc-500">{order.phone}</td>
                  <td className="px-4 py-3 text-zinc-500">{order.location}</td>
                  <td className="px-4 py-3 text-zinc-500">
                    {t("itemsCount", { count: order.items.length })}
                  </td>
                  <td className="px-4 py-3 font-mono text-zinc-900">
                    ${Number(order.total).toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-4 py-3 text-zinc-400">
                    {order.createdAt.toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <OrderActions
                      orderId={order.id}
                      currentStatus={order.status}
                    />
                  </td>
                </tr>
              );
            })}
            {orders.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-12 text-center text-sm text-zinc-400"
                >
                  {t("noOrders")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between text-sm">
          <p className="text-zinc-500">
            {t("pageOf", { current: currentPage, total: totalPages })}
          </p>
          <div className="flex gap-2">
            {currentPage > 1 && (
              <Link
                href={buildPageUrl(currentPage - 1, currentStatus)}
                className="rounded-sm border border-zinc-200 px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-zinc-500 transition-colors hover:border-zinc-300 hover:text-zinc-700"
              >
                {t("previous")}
              </Link>
            )}
            {currentPage < totalPages && (
              <Link
                href={buildPageUrl(currentPage + 1, currentStatus)}
                className="rounded-sm border border-zinc-200 px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-zinc-500 transition-colors hover:border-zinc-300 hover:text-zinc-700"
              >
                {t("next")}
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    processing: "bg-blue-50 text-blue-700 border-blue-200",
    shipped: "bg-violet-50 text-violet-700 border-violet-200",
    delivered: "bg-green-50 text-green-700 border-green-200",
    cancelled: "bg-red-50 text-red-700 border-red-200",
  };
  const cls = colors[status] ?? "bg-zinc-50 text-zinc-600 border-zinc-200";

  return (
    <span
      className={`inline-block rounded-sm border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${cls}`}
    >
      {status}
    </span>
  );
}

function buildPageUrl(page: number, status: string): string {
  const params = new URLSearchParams();
  params.set("page", String(page));
  if (status !== "all") params.set("status", status);
  return `/admin/orders?${params.toString()}`;
}
