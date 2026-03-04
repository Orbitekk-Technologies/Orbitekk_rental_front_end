// apps/web/app/(marketing)/page.tsx
import Hero from "@/components/marketing/Hero";
import Services from "@/components/marketing/Services";
import LatestProperties from "@/components/marketing/LatestProperties";
import About from "@/components/marketing/About";
import LocationProgress from "@/components/marketing/LocationProgress"
import FAQ from "@/components/marketing/FAQ"
import Footer from "@/components/marketing/Footer";
import BackToTop from "@/components/marketing/BackToTop";

export default function MarketingHomePage() {
  return (
    <main>
      <Hero />
      <Services />
      <LatestProperties />
          <About />
          <LocationProgress />
          <FAQ />
          <Footer />
          <BackToTop />
    </main>
  );
}