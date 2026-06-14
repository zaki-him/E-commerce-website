import AdminGuard from "@/components/AdminGuard";
import AdminDashboardHeader from "./AdminDashboardHeader";

export default function AdminDashboard() {
  return (
    <AdminGuard>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <AdminDashboardHeader />

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard label="Total Orders" value="0" />
          <StatCard label="Products" value="8" />
          <StatCard label="Customers" value="0" />
        </div>
      </div>
    </AdminGuard>
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
