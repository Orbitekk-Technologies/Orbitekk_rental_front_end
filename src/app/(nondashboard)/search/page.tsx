"use client";

import { NAVBAR_HEIGHT } from "@/lib/constants";
import { useAppDispatch, useAppSelector } from "@/state/redux";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect } from "react";
import FiltersBar from "./FiltersBar";
import FiltersFull from "./FiltersFull";
import { cleanParams } from "@/lib/utils";
import { setFilters } from "@/state";
import Map from "./Map";
import Listings from "./Listings";
import { Button } from "@/components/ui/button";
import { List, MapIcon } from "lucide-react";
import { setViewMode } from "@/state";

const SearchContent = () => {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const isFiltersFullOpen = useAppSelector(
    (state) => state.global.isFiltersFullOpen
  );
  const viewMode = useAppSelector((state) => state.global.viewMode);

  useEffect(() => {
    const initialFilters = Array.from(searchParams.entries()).reduce(
      (acc: any, [key, value]) => {
        if (key === "priceRange" || key === "squareFeet") {
          acc[key] = value.split(",").map((v) => (v === "" ? null : Number(v)));
        } else if (key === "coordinates") {
          acc[key] = value.split(",").map(Number);
        } else {
          acc[key] = value === "any" ? null : value;
        }

        return acc;
      },
      {}
    );

    const cleanedFilters = cleanParams(initialFilters);
    dispatch(setFilters(cleanedFilters));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className="relative mx-auto flex w-full flex-col px-0 md:px-5"
      style={{
        height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
      }}
    >
      <FiltersBar />
      <div className="flex min-h-0 flex-1 justify-between gap-3 overflow-hidden md:mb-5">
        <div
          className={`absolute inset-x-0 bottom-0 top-0 z-30 h-full overflow-auto transition-all duration-300 ease-in-out md:static md:z-auto ${
            isFiltersFullOpen
              ? "w-full opacity-100 visible md:w-3/12"
              : "w-0 opacity-0 invisible"
          }`}
        >
          <FiltersFull />
        </div>
        <div className={`${viewMode === "grid" ? "block" : "hidden"} h-full w-full md:block md:basis-5/12 md:grow`}>
          <Map />
        </div>
        <div className={`${viewMode === "list" ? "block" : "hidden"} h-full w-full overflow-y-auto pb-24 md:block md:basis-4/12 md:pb-0`}>
          <Listings />
        </div>
      </div>
      {!isFiltersFullOpen && (
        <Button
          type="button"
          onClick={() => dispatch(setViewMode(viewMode === "list" ? "grid" : "list"))}
          className="fixed bottom-20 left-1/2 z-40 h-12 -translate-x-1/2 gap-2 rounded-lg bg-gray-950 px-4 text-white shadow-xl hover:bg-gray-800 md:hidden"
          aria-label={`Show ${viewMode === "list" ? "map" : "list"} view`}
        >
          {viewMode === "list" ? <MapIcon className="h-4 w-4" /> : <List className="h-4 w-4" />}
          {viewMode === "list" ? "Map" : "List"}
        </Button>
      )}
    </div>
  );
};

const SearchPage = () => (
  <Suspense fallback={<div className="p-5">Loading search...</div>}>
    <SearchContent />
  </Suspense>
);

export default SearchPage;
