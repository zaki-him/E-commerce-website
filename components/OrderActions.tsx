"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Trash2 } from "lucide-react";
import { updateOrderStatus, deleteOrder } from "@/lib/actions/order";

const STATUSES = ["pending", "processing", "shipped", "delivered", "cancelled"];

export default function OrderActions({
  orderId,
  currentStatus,
}: {
  orderId: string;
  currentStatus: string;
}) {
  const t = useTranslations("Admin.orders");
  const actionsT = useTranslations("Admin.actions");
  const router = useRouter();

  async function handleStatusChange(formData: FormData) {
    await updateOrderStatus(
      formData.get("orderId") as string,
      formData.get("status") as string,
    );
    router.refresh();
  }

  async function handleDelete() {
    if (!confirm(actionsT("deleteConfirm"))) return;
    await deleteOrder(orderId);
    router.refresh();
  }

  return (
    <div className="flex items-center gap-2">
      <form action={handleStatusChange}>
        <input type="hidden" name="orderId" value={orderId} />
        <select
          name="status"
          defaultValue={currentStatus}
          onChange={(e) => e.target.form?.requestSubmit()}
          className="rounded-sm border border-zinc-200 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-600 focus:outline-none focus:border-zinc-400"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {t(s)}
            </option>
          ))}
        </select>
      </form>
      <button
        onClick={handleDelete}
        className="rounded-sm p-1.5 text-zinc-400 hover:bg-red-50 hover:text-red-600 transition-colors"
        aria-label={actionsT("deleteLabel")}
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
