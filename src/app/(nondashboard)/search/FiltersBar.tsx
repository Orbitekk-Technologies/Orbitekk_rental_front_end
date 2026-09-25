import {
  FiltersState,
  setFilters,
  toggleFiltersFullOpen,
} from "@/state";
import { useAppSelector } from "@/state/redux";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { cleanParams, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronDown, Filter, Search } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import LocationAutocomplete, { type SelectedLocation } from "@/components/LocationAutocomplete";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PropertyTypeIcons } from "@/lib/constants";

const FiltersBar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const filters = useAppSelector((state) => state.global.filters);
  const isFiltersFullOpen = useAppSelector(
    (state) => state.global.isFiltersFullOpen
  );
  const [searchInput, setSearchInput] = useState(filters.location);
  const [selectedLocation, setSelectedLocation] = useState<SelectedLocation | null>(null);
  const [dismissSuggestions, setDismissSuggestions] = useState(0);
  const [priceDraft, setPriceDraft] = useState<[number, number]>([
    filters.priceRange[0] ?? 0,
    filters.priceRange[1] ?? 10000,
  ]);
  const priceDetailsRef = useRef<HTMLDetailsElement>(null);
  const hasLocation = Boolean(filters.location);
  const hasPriceRange = filters.priceRange[0] != null || filters.priceRange[1] != null;
  const hasStayType = Boolean(filters.stayType && filters.stayType !== "any");
  const hasPropertyType = Boolean(filters.propertyType && filters.propertyType !== "any");

  useEffect(() => {
    setPriceDraft([filters.priceRange[0] ?? 0, filters.priceRange[1] ?? 10000]);
  }, [filters.priceRange]);

  useEffect(() => {
    setSearchInput(filters.location);
  }, [filters.location]);

  useEffect(() => {
    const closePriceMenu = (event: PointerEvent) => {
      const menu = priceDetailsRef.current;
      if (menu?.open && !menu.contains(event.target as Node)) menu.open = false;
    };
    const closePriceMenuWithEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && priceDetailsRef.current?.open) {
        priceDetailsRef.current.open = false;
        priceDetailsRef.current.querySelector("summary")?.focus();
      }
    };
    document.addEventListener("pointerdown", closePriceMenu);
    document.addEventListener("keydown", closePriceMenuWithEscape);
    return () => {
      document.removeEventListener("pointerdown", closePriceMenu);
      document.removeEventListener("keydown", closePriceMenuWithEscape);
    };
  }, []);

  const updateURL = (newFilters: FiltersState) => {
    const cleanFilters = cleanParams(newFilters);
    const updatedSearchParams = new URLSearchParams();

    Object.entries(cleanFilters).forEach(([key, value]) => {
      updatedSearchParams.set(
        key,
        Array.isArray(value) ? value.join(",") : value.toString()
      );
    });

    router.replace(`${pathname}?${updatedSearchParams.toString()}`, { scroll: false });
  };

  const handleFilterChange = (
    key: string,
    value: any,
    isMin: boolean | null
  ) => {
    let newValue = value;

    if (key === "priceRange" || key === "squareFeet") {
      const currentArrayRange = [...filters[key]];
      if (isMin === null && Array.isArray(value)) {
        newValue = value;
      } else if (isMin !== null) {
        const index = isMin ? 0 : 1;
        currentArrayRange[index] = value === "any" ? null : Number(value);
        newValue = currentArrayRange;
      }
    } else if (key === "coordinates") {
      newValue = value === "any" ? [0, 0] : value.map(Number);
    } else {
      newValue = value === "any" ? "any" : value;
    }

    const unitRules = key === "stayType"
      ? newValue === "PayingGuest"
        ? { beds: "1", baths: "1" }
        : { bathType: "any" }
      : {};
    const newFilters = { ...filters, [key]: newValue, ...unitRules, page: 0 };
    dispatch(setFilters(newFilters));
    updateURL(newFilters);
  };

  const handleLocationSearch = async () => {
    setDismissSuggestions((signal) => signal + 1);
    try {
      if (selectedLocation?.label === searchInput.trim()) {
        const newFilters = {
          ...filters,
          location: selectedLocation.label,
          coordinates: selectedLocation.coordinates,
          city: selectedLocation.city,
          state: selectedLocation.state,
          postalCode: selectedLocation.postalCode,
          page: 0,
        };
        dispatch(setFilters(newFilters));
        updateURL(newFilters);
        return;
      }

      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          searchInput
        )}.json?access_token=${
          process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
        }&fuzzyMatch=true`
      );
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        const contexts = [data.features[0], ...(data.features[0].context ?? [])];
        const cityFeature = contexts.find((item: { id?: string }) => item.id?.startsWith("place."));
        const stateFeature = contexts.find((item: { id?: string }) => item.id?.startsWith("region."));
        const postalCodeFeature = contexts.find((item: { id?: string }) => item.id?.startsWith("postcode."));
        const newFilters = {
          ...filters,
          location: searchInput.trim(),
          coordinates: [lng, lat] as [number, number],
          city: cityFeature?.text,
          state: stateFeature?.short_code?.replace(/^US-/i, "") ?? stateFeature?.text,
          postalCode: postalCodeFeature?.text,
          page: 0,
        };
        dispatch(setFilters(newFilters));
        updateURL(newFilters);
      }
    } catch (err) {
      console.error("Error search location:", err);
    }
  };

  return (
    <div className="z-20 w-full shrink-0 border-b border-gray-200 bg-white px-4 py-3 shadow-sm md:border-0 md:px-0 md:py-3 md:shadow-none">
      {/* Filters */}
      <div className="flex min-w-0 flex-col gap-3 md:flex-row md:items-center md:gap-4 md:px-2">
        {/* Search Location stays constrained to the mobile viewport. */}
        <form
          className="order-1 flex w-full min-w-0 items-center md:order-2 md:w-auto md:shrink-0"
          onSubmit={(event) => {
            event.preventDefault();
            void handleLocationSearch();
          }}
        >
          <LocationAutocomplete
            placeholder="Search location"
            value={searchInput}
            onChange={(value) => {
              setSearchInput(value);
              if (value !== selectedLocation?.label) setSelectedLocation(null);
            }}
            onSelect={setSelectedLocation}
            dismissSignal={dismissSuggestions}
            className={cn("h-12 w-full min-w-0 rounded-l-md border border-r-0 px-5 md:w-72", hasLocation ? "border-secondary-600" : "border-input")}
          />
          <Button
            type="submit"
            className={cn("h-12 shrink-0 rounded-l-none rounded-r-md border border-l-0 bg-secondary-500 px-5 text-white shadow-none hover:bg-secondary-600", hasLocation ? "border-secondary-600" : "border-secondary-500")}
          >
            <Search className="h-4 w-4" />
          </Button>
        </form>

        {/* Only the filter controls scroll horizontally on mobile. */}
        <div className="order-2 flex w-full min-w-0 gap-3 overflow-x-auto pb-1 md:contents">
        {/* All Filters */}
        <Button
          variant="outline"
          className={cn(
            "h-12 shrink-0 gap-2 rounded-md px-5 hover:bg-secondary-50 md:order-1",
            isFiltersFullOpen ? "border-secondary-600 text-secondary-700" : "border-input"
          )}
          onClick={() => dispatch(toggleFiltersFullOpen())}
        >
          <Filter className="w-4 h-4" />
          <span>All Filters</span>
        </Button>

        {/* Price Range */}
        <details ref={priceDetailsRef} className="group relative shrink-0 md:order-3">
          <summary className={cn("flex h-12 min-w-40 cursor-pointer list-none items-center justify-between gap-2 rounded-md border bg-white px-5 text-sm [&::-webkit-details-marker]:hidden", hasPriceRange ? "border-secondary-600" : "border-input")}>
            <span>
              {`$${(filters.priceRange[0] ?? 0).toLocaleString()} to $${filters.priceRange[1] == null ? "10k" : filters.priceRange[1].toLocaleString()}`}
            </span>
            <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
          </summary>
          <div className="absolute left-0 top-14 z-50 w-72 rounded-xl border border-gray-200 bg-white p-5 shadow-xl">
            <p className="mb-5 text-sm font-semibold">Monthly Price Range</p>
            <Slider
              min={0}
              max={10000}
              step={100}
              value={priceDraft}
              onValueChange={(value) => setPriceDraft(value as [number, number])}
              onValueCommit={(value) => handleFilterChange("priceRange", value, null)}
            />
            <div className="mt-3 flex justify-between text-sm text-gray-700">
              <span>${priceDraft[0].toLocaleString()}</span>
              <span>${priceDraft[1].toLocaleString()}</span>
            </div>
            <Button variant="ghost" className="mt-3 h-8 w-full" onClick={() => { setPriceDraft([0, 10000]); handleFilterChange("priceRange", [null, null], null); }}>
              Clear price range
            </Button>
          </div>
        </details>

        {/* Stay Type */}
        <Select value={filters.stayType} onValueChange={(value) => handleFilterChange("stayType", value, null)}>
          <SelectTrigger className={cn("h-12 w-40 shrink-0 rounded-md px-5 md:order-4", hasStayType ? "border-secondary-600" : "border-input")}>
            <SelectValue placeholder="Stay Type" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="any">Any</SelectItem>
            <SelectItem value="WholeUnit">Whole Unit</SelectItem>
            <SelectItem value="PayingGuest">Private Room</SelectItem>
          </SelectContent>
        </Select>

        {/* Unit Type */}
        <Select
          value={filters.propertyType || "any"}
          onValueChange={(value) =>
            handleFilterChange("propertyType", value, null)
          }
        >
          <SelectTrigger className={cn("h-12 w-40 shrink-0 rounded-md px-5 md:order-5", hasPropertyType ? "border-secondary-600" : "border-input")}>
            <SelectValue placeholder="Unit Type" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="any">Any</SelectItem>
            {Object.entries(PropertyTypeIcons).map(([type, Icon]) => (
              <SelectItem key={type} value={type}>
                <div className="flex items-center">
                  <Icon className="w-4 h-4 mr-2" />
                  <span>{type}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        </div>
      </div>

    </div>
  );
};

export default FiltersBar;
