import AppContainer from "@/components/shared/AppContainer";
import { Property } from "@/data/properties";
import ListingsHeader from "@/components/listings/ListingsHeader";
import ListingsFilters from "@/components/listings/ListingsFilters";
import ListingsResults from "@/components/listings/ListingsResults";
import ListingsMapPanel from "@/components/listings/ListingsMapPanel";
import PropertyPageTopNav from "@/components/listings/PropertyPageTopNav";

type ListingsPageShellProps = {
  properties: Property[];
  isAuthenticated?: boolean;
  locationTitle?: string;
  locationInput?: string;
};

export default function ListingsPageShell({
  properties,
  isAuthenticated = false,
  locationTitle = "Your Location",
  locationInput = "",
}: ListingsPageShellProps) {
  const hasListings = properties.length > 0;

  return (
    <div className="min-h-dvh bg-[var(--bg)] text-[var(--fg)] lg:h-dvh lg:overflow-hidden">
      <PropertyPageTopNav isAuthenticated={isAuthenticated} />

      <main className="py-6 lg:h-[calc(100dvh-82px)] lg:overflow-hidden lg:py-6">
        <AppContainer className="h-full">
          <div className="grid h-full gap-8 lg:grid-cols-[1.02fr_1.08fr] lg:gap-10">
            <section className="flex min-h-0 flex-col">
              <div className="shrink-0 space-y-6 pb-5">
                <ListingsHeader locationTitle={locationTitle} />
                <ListingsFilters location={locationInput} />
              </div>

              <div className="min-h-0 flex-1 lg:overflow-hidden">
                <ListingsResults properties={properties} />
              </div>
            </section>

            <aside className="hidden lg:block lg:min-h-0">
              <div className="sticky top-0 h-full">
                <ListingsMapPanel withMarkers={hasListings} />
              </div>
            </aside>
          </div>
        </AppContainer>
      </main>
    </div>
  );
}