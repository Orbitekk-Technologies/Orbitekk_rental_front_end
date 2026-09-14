"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Sparkles } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import LocationAutocomplete, { type SelectedLocation } from "@/components/LocationAutocomplete";
import { setFilters } from "@/state";

const HeroSection = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<SelectedLocation | null>(null);
  const [dismissSuggestions, setDismissSuggestions] = useState(0);

  const openSearch = (location: string, coordinates?: [number, number]) => {
    dispatch(setFilters({ location, ...(coordinates ? { coordinates } : {}) }));
    const params = new URLSearchParams({ location });
    if (coordinates) params.set("coordinates", coordinates.join(","));
    router.push(`/search?${params.toString()}`);
  };

  const handleLocationSearch = async () => {
    setDismissSuggestions((signal) => signal + 1);
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) return;

    if (selectedLocation?.label === trimmedQuery) {
      openSearch(selectedLocation.label, selectedLocation.coordinates);
      return;
    }

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(trimmedQuery)}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}&fuzzyMatch=true`
      );
      const data = await response.json();
      if (data.features?.length > 0) openSearch(trimmedQuery, data.features[0].center);
    } catch (error) {
      console.error("Error searching location:", error);
    }
  };

  return (
    <section className="mx-auto flex min-h-0 w-full max-w-[1536px] flex-1 items-center px-6 py-6 sm:px-10 lg:px-16 lg:py-3 xl:px-20">
      <div className="grid w-full items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] xl:gap-20">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="mx-auto w-full max-w-2xl text-center lg:mx-0 lg:text-left"
        >
          <div className="flex items-center justify-center gap-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500 lg:justify-start sm:text-xs">
            <span>Rent</span><span aria-hidden="true">•</span>
            <span>Live</span><span aria-hidden="true">•</span>
            <span>Belong</span>
          </div>

          <h1 className="mt-8 space-y-1 text-[2.25rem] font-bold leading-[1.14] tracking-[-0.04em] sm:text-5xl xl:text-[4.15rem]">
            <span className="group relative block w-fit transition-transform duration-300 hover:translate-x-[3px] mx-auto lg:mx-0">
              <span className="text-secondary-500">Private Rooms.</span>
              <span className="absolute inset-x-0 -bottom-1 h-1 origin-left scale-x-0 rounded-full bg-secondary-500 transition-transform duration-300 ease-out group-hover:scale-x-100" aria-hidden="true" />
            </span>
            <span className="group relative block w-fit transition-all duration-300 hover:translate-x-[3px] hover:text-[#55208f] mx-auto text-[#071520] lg:mx-0">
              Whole Units.
              <span className="absolute inset-x-0 -bottom-1 h-1 origin-left scale-x-0 rounded-full bg-secondary-500 transition-transform duration-300 ease-out group-hover:scale-x-100" aria-hidden="true" />
            </span>
          </h1>

          <form
            className="mx-auto mt-10 flex w-full max-w-xl rounded-lg border border-transparent bg-white p-2 shadow-[0_16px_45px_rgba(15,23,42,0.11)] transition-[transform,box-shadow,border-color] duration-300 lg:mx-0 lg:hover:-translate-y-0.5 lg:hover:border-secondary-200 lg:hover:shadow-[0_20px_50px_rgba(124,58,237,0.16)]"
            onSubmit={(event) => {
              event.preventDefault();
              void handleLocationSearch();
            }}
          >
            <div className="relative flex min-w-0 flex-1 items-center">
              <MapPin className="pointer-events-none absolute left-3 z-10 h-5 w-5 text-gray-900" />
              <LocationAutocomplete
                value={searchQuery}
                onChange={(value) => {
                  setSearchQuery(value);
                  if (value !== selectedLocation?.label) setSelectedLocation(null);
                }}
                onSelect={setSelectedLocation}
                dismissSignal={dismissSuggestions}
                placeholder="City, neighborhood, or address"
                className="h-12 border-0 bg-transparent pl-11 pr-3 text-base shadow-none focus-visible:ring-0"
              />
            </div>
            <Button type="submit" className="h-12 shrink-0 rounded-lg bg-secondary-500 px-5 text-base text-white hover:bg-secondary-600">
              Search
            </Button>
          </form>

          <div className="mt-10 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-wide text-gray-950 sm:text-xs">
            <span className="inline-flex lg:hidden">
              <Sparkles className="h-6 w-6 fill-secondary-500 text-secondary-500" aria-hidden="true" />
            </span>
            <motion.span
              className="hidden origin-center lg:inline-flex"
              animate={reduceMotion ? undefined : { rotate: [0, 8, -5, 0], scale: [1, 1.12, 1, 1] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="h-6 w-6 fill-secondary-500 text-secondary-500" aria-hidden="true" />
            </motion.span>
            New rentals are added regularly
          </div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative hidden h-[min(66vh,640px)] w-full overflow-hidden rounded-2xl lg:block"
        >
          <Image
            src="/Landing-splash.webp"
            alt="A family enjoying their rental home"
            fill
            priority
            sizes="(max-width: 1200px) 42vw, 650px"
            className="object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
