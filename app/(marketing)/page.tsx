// app/(marketing)/page.tsx
import MarketingShell from "@/components/layout/MarketingShell";
import HeroSection from "@/components/home/HeroSection";

export default function HomePage() {
  return (
    <MarketingShell>
      <HeroSection />
    </MarketingShell>
  );
}