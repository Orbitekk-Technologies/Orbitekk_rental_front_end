import MarketingShell from "@/components/layout/MarketingShell";
import AppContainer from "@/components/shared/AppContainer";
import ContactFormCard from "@/components/contact/ContactFormCard";
import MapCard from "@/components/contact/MapCard";

export default function ContactPage() {
  return (
    <MarketingShell>
      <AppContainer className="pb-10 pt-6 sm:pb-12 lg:pb-10">
        {/* Layout */}
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
          <ContactFormCard />
          <MapCard />
        </div>
      </AppContainer>
    </MarketingShell>
  );
}