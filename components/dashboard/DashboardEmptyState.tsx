import LottiePlayer from "@/components/shared/LottiePlayer";
import authHeroAnimation from "@/public/images/auth/auth_hero.json";

type Props = {
  text: string;
};

export default function DashboardEmptyState({ text }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-[180px]">
        <LottiePlayer animationData={authHeroAnimation} />
      </div>

      <p className="mt-4 text-[16px] text-[var(--muted)]">{text}</p>
    </div>
  );
}