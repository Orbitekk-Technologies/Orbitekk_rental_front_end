"use client";

type ListingsMapPanelProps = {
  withMarkers?: boolean;
};

const markerBadges = [
  { label: "98K", top: "22%", left: "56%" },
  { label: "328K", top: "29%", left: "67%" },
  { label: "407K", top: "43%", left: "28%" },
  { label: "100K", top: "45%", left: "58%" },
  { label: "128K", top: "48%", left: "66%" },
  { label: "121K", top: "60%", left: "47%" },
  { label: "357K", top: "64%", left: "61%" },
  { label: "999K", top: "70%", left: "50%" },
  { label: "333K", top: "73%", left: "74%" },
  { label: "38K", top: "80%", left: "30%" },
];

export default function ListingsMapPanel({
  withMarkers = false,
}: ListingsMapPanelProps) {
  return (
    <div className="relative h-full min-h-[540px] overflow-hidden rounded-[24px] border border-[var(--border)] bg-[#ececec]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.45), rgba(255,255,255,0.45)), url('https://tile.openstreetmap.org/10/175/408.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="absolute inset-0">
        <div className="absolute left-[17%] top-[24%] h-[52%] w-[54%] rounded-[45%_55%_50%_50%/55%_45%_55%_45%] border-[3px] border-[#8b4cf6] border-dashed bg-[rgba(139,76,246,0.10)]" />
      </div>

      {withMarkers &&
        markerBadges.map((badge) => (
          <div
            key={`${badge.label}-${badge.top}-${badge.left}`}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-[10px] bg-white px-2.5 py-1.5 text-[11px] font-semibold text-[var(--muted)] shadow-sm"
            style={{ top: badge.top, left: badge.left }}
          >
            {badge.label}
          </div>
        ))}

      <div className="absolute bottom-4 right-4 flex flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-white shadow-sm">
        <button className="h-10 w-10 text-lg text-[var(--muted)]">+</button>
        <div className="h-px bg-[var(--border)]" />
        <button className="h-10 w-10 text-lg text-[var(--muted)]">−</button>
      </div>
    </div>
  );
}