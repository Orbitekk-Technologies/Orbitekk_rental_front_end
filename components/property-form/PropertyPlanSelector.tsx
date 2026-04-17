"use client";

import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import { cn } from "@/lib/utils/cn";

type Plan = "basic" | "premium" | "elite";

type PropertyPlanSelectorProps = {
  selectedPlan: Plan;
  onSelect: (plan: Plan) => void;
};

const plans = [
  {
    key: "basic" as const,
    title: "Basic",
    price: "$10/Monthly",
    description: "Find a place & pay rent online.",
  },
  {
    key: "premium" as const,
    title: "Premium",
    price: "$40/Monthly",
    description: "Find a place & pay rent online.",
  },
  {
    key: "elite" as const,
    title: "Elite",
    price: "$60/Monthly",
    description: "Find a place & pay rent online.",
  },
];

export default function PropertyPlanSelector({
  selectedPlan,
  onSelect,
}: PropertyPlanSelectorProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {plans.map((plan) => {
        const active = selectedPlan === plan.key;

        return (
          <button
            key={plan.key}
            type="button"
            onClick={() => onSelect(plan.key)}
            className={cn(
              "rounded-[14px] border bg-white p-4 text-left transition-all",
              active
                ? "border-[var(--brand)] shadow-sm"
                : "border-[var(--border)] hover:border-[var(--brand)]"
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-2">
                <ApartmentRoundedIcon
                  sx={{
                    fontSize: 18,
                    color: active ? "var(--brand)" : "var(--muted)",
                  }}
                />
                <span className="text-[18px] font-semibold">{plan.title}</span>
              </div>
              <span className="text-[18px] font-semibold">{plan.price}</span>
            </div>

            <p className="mt-2 text-[14px] text-[var(--muted)]">
              {plan.description}
            </p>
          </button>
        );
      })}
    </div>
  );
}