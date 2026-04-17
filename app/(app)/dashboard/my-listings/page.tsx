import HomeownerDashboardShell from "@/components/dashboard/HomeownerDashboardShell";
import DashboardEmptyState from "@/components/dashboard/DashboardEmptyState";
import Link from "next/link";

export default function MyListingsPage() {
  return (
    <HomeownerDashboardShell active="listings">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-[18px] font-semibold tracking-wide">
            LISTINGS
          </h1>

          <Link
            href="/dashboard/my-listings/add"
            className="rounded-[10px] bg-[var(--brand)] px-5 py-2 text-[14px] font-medium text-white"
          >
            Add Properties
          </Link>
        </div>

        {/* Empty */}
        <DashboardEmptyState text="Need to add listings" />
      </div>
    </HomeownerDashboardShell>
  );
}