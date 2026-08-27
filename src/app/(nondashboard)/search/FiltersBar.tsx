import {
  FiltersState,
  setFilters,
  toggleFiltersFullOpen,
} from "@/state";
import { useAppSelector } from "@/state/redux";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    setPriceDraft([filters.priceRange[0] ?? 0, filters.priceRange[1] ?? 10000]);
  }, [filters.priceRange]);

  useEffect(() => {
    setSearchInput(filters.location);
  }, [filters.location]);

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
        const newFilters = {
          ...filters,
          location: searchInput.trim(),
          coordinates: [lng, lat] as [number, number],
          city: cityFeature?.text,
          state: stateFeature?.short_code?.replace(/^US-/i, "") ?? stateFeature?.text,
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
    <div className="flex justify-between items-center w-full py-5">
      {/* Filters */}
      <div className="flex justify-between items-center gap-4 p-2">
        {/* All Filters */}
        <Button
          variant="outline"
          className={cn(
            "gap-2 rounded-xl border-primary-400 hover:bg-primary-500 hover:text-primary-100",
            isFiltersFullOpen && "bg-primary-700 text-primary-100"
          )}
          onClick={() => dispatch(toggleFiltersFullOpen())}
        >
          <Filter className="w-4 h-4" />
          <span>All Filters</span>
        </Button>

        {/* Search Location */}
        <form
          className="flex items-center"
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
            className="w-56 rounded-l-xl border border-r-0 border-primary-400"
          />
          <Button
            type="submit"
            className={`rounded-r-xl rounded-l-none border-l-none border-primary-400 shadow-none 
              border hover:bg-primary-700 hover:text-primary-50`}
          >
            <Search className="w-4 h-4" />
          </Button>
        </form>

        {/* Price Range */}
        <details className="group relative">
          <summary className="flex h-10 min-w-36 cursor-pointer list-none items-center justify-between gap-2 rounded-xl border border-primary-400 bg-white px-3 text-sm [&::-webkit-details-marker]:hidden">
            <span>
              {`$${(filters.priceRange[0] ?? 0).toLocaleString()} to $${filters.priceRange[1] == null ? "10k" : filters.priceRange[1].toLocaleString()}`}
            </span>
            <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
          </summary>
          <div className="absolute left-0 top-12 z-50 w-72 rounded-xl border border-gray-200 bg-white p-5 shadow-xl">
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

        {/* Unit Type */}
        <Select value={filters.stayType} onValueChange={(value) => handleFilterChange("stayType", value, null)}>
          <SelectTrigger className="w-36 rounded-xl border-primary-400">
            <SelectValue placeholder="Unit Type" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="any">Any Unit Type</SelectItem>
            <SelectItem value="WholeUnit">Whole Unit</SelectItem>
            <SelectItem value="PayingGuest">Private Room</SelectItem>
          </SelectContent>
        </Select>

        {/* Property Type */}
        <Select
          value={filters.propertyType || "any"}
          onValueChange={(value) =>
            handleFilterChange("propertyType", value, null)
          }
        >
          <SelectTrigger className="w-32 rounded-xl border-primary-400">
            <SelectValue placeholder="Home Type" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="any">Any Property Type</SelectItem>
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
  );
};

export default FiltersBar;
