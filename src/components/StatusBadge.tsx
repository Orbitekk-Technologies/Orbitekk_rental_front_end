import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type StatusTone = "active" | "pending" | "approved" | "denied" | "archive";

const toneClasses: Record<StatusTone, { badge: string; dot: string }> = {
  active: { badge: "border-green-200 bg-green-50 text-green-700", dot: "bg-green-500" },
  approved: { badge: "border-green-200 bg-green-50 text-green-700", dot: "bg-green-500" },
  pending: { badge: "border-amber-200 bg-amber-50 text-amber-700", dot: "bg-amber-500" },
  denied: { badge: "border-red-200 bg-red-50 text-red-700", dot: "bg-red-500" },
  archive: { badge: "border-red-200 bg-red-50 text-red-700", dot: "bg-red-500" },
};

const StatusBadge = ({ children, tone }: { children: ReactNode; tone: StatusTone }) => (
  <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium", toneClasses[tone].badge)}>
    <span className={cn("h-2 w-2 rounded-full", toneClasses[tone].dot)} />
    {children}
  </span>
);

export default StatusBadge;
export type { StatusTone };
