// apps/web/app/(marketing)/page.tsx
import Navbar from "@/components/marketing/navigation/Navbar";
import Hero from "@/components/marketing/sections/Hero";
import Services from "@/components/marketing/sections/Services";
import LatestProperties from "@/components/marketing/sections/LatestProperties";
import LocationProgress from "@/components/marketing/sections/LocationProgress";
import About from "@/components/marketing/sections/About";
import FAQ from "@/components/marketing/sections/FAQ";
import Footer from "@/components/marketing/sections/Footer";

export default function MarketingHomePage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <Navbar />
      <Hero />
      <Services />
      <LatestProperties />
      <About />
      <LocationProgress />
      <FAQ />
      <Footer />
    </main>
  );
}