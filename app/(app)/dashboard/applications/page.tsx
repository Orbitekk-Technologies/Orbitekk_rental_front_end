import HomeownerDashboardShell from "@/components/dashboard/HomeownerDashboardShell";
import DashboardEmptyState from "@/components/dashboard/DashboardEmptyState";

export default function ApplicationsPage() {
  return (
    <HomeownerDashboardShell active="applications">
      <div className="space-y-6">
        {/* Header */}
        <h1 className="text-[18px] font-semibold tracking-wide">
          APPLICATIONS
        </h1>

        {/* Tabs */}
        <div className="flex items-center gap-10 border-b border-[var(--border)] pb-3 text-[14px]">
          <button className="text-[var(--brand)] border-b-2 border-[var(--brand)] pb-2">
            All
          </button>
          <button className="text-[var(--muted)]">Pending</button>
          <button className="text-[var(--muted)]">Approved</button>
          <button className="text-[var(--muted)]">Denied</button>
        </div>

        {/* Empty */}
        <DashboardEmptyState text="Need to add listings" />
      </div>
    </HomeownerDashboardShell>
  );
}