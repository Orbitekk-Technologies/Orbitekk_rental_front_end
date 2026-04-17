import LottiePlayer from "@/components/shared/LottiePlayer";
import authHeroAnimation from "@/public/images/auth/auth_hero.json";

export default function ListingsEmptyState() {
  return (
    <div className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-[26px] border border-dashed border-[var(--border)] bg-transparent px-6 text-center">
      <div className="w-full max-w-[220px]">
        <LottiePlayer animationData={authHeroAnimation} className="w-full" />
      </div>

      <p className="mt-2 text-[28px] leading-none text-[var(--brand)]">_</p>

      <p className="mt-3 text-[18px] font-medium text-[var(--muted)]">
        Listings will be Updated soon
      </p>
    </div>
  );
}