import { FiltersState, initialState, setFilters } from "@/state";
import { useAppSelector } from "@/state/redux";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { cleanParams, cn } from "@/lib/utils";
import LocationAutocomplete, { type SelectedLocation } from "@/components/LocationAutocomplete";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { AmenityEnum, AmenityIcons, PropertyTypeIcons } from "@/lib/constants";
import { PROPERTY_AMENITY_OPTIONS } from "@/lib/propertyForm";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const FiltersFull = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const filters = useAppSelector((state) => state.global.filters);
  const [localFilters, setLocalFilters] = useState(initialState.filters);
  const [selectedLocation, setSelectedLocation] = useState<SelectedLocation | null>(null);
  const [dismissSuggestions, setDismissSuggestions] = useState(0);
  const isFiltersFullOpen = useAppSelector(
    (state) => state.global.isFiltersFullOpen
  );
  const isPrivateRoom = localFilters.stayType === "PayingGuest";

  useEffect(() => {
    if (isFiltersFullOpen) setLocalFilters(filters);
  }, [filters, isFiltersFullOpen]);

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

  const handleSubmit = () => {
    const nextFilters = { ...localFilters, page: 0 };
    dispatch(setFilters(nextFilters));
    updateURL(nextFilters);
  };

  const handleReset = () => {
    setLocalFilters(initialState.filters);
    dispatch(setFilters(initialState.filters));
    updateURL(initialState.filters);
  };

  const handleAmenityChange = (amenity: AmenityEnum) => {
    setLocalFilters((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleLocationSearch = async () => {
    setDismissSuggestions((signal) => signal + 1);
    try {
      if (selectedLocation?.label === localFilters.location.trim()) {
        setLocalFilters((prev) => ({
          ...prev,
          location: selectedLocation.label,
          coordinates: selectedLocation.coordinates,
        }));
        return;
      }

      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          localFilters.location
        )}.json?access_token=${
          process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
        }&fuzzyMatch=true`
      );
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        setLocalFilters((prev) => ({
          ...prev,
          coordinates: [lng, lat],
        }));
      }
    } catch (err) {
      console.error("Error search location:", err);
    }
  };

  if (!isFiltersFullOpen) return null;

  return (
    <div className="bg-white rounded-lg px-4 h-full overflow-auto pb-10">
      <div className="flex flex-col gap-6">
        {/* Location */}
        <div className="order-1">
          <h4 className="font-bold mb-2">Location</h4>
          <div className="flex items-center">
            <LocationAutocomplete
              placeholder="Enter location"
              value={localFilters.location}
              onChange={(value) => {
                setLocalFilters((prev) => ({
                  ...prev,
                  location: value,
                }));
                if (value !== selectedLocation?.label) setSelectedLocation(null);
              }}
              onSelect={(location) => {
                setSelectedLocation(location);
                setLocalFilters((prev) => ({
                  ...prev,
                  location: location.label,
                  coordinates: location.coordinates,
                  city: location.city,
                  state: location.state,
                }));
              }}
              dismissSignal={dismissSuggestions}
              className="rounded-l-xl border border-r-0 border-black"
            />
            <Button
              onClick={handleLocationSearch}
              className="rounded-r-xl rounded-l-none border-l-none border-black shadow-none border hover:bg-primary-700 hover:text-primary-50"
            >
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Property Type */}
        <div className="order-3">
          <h4 className="font-bold mb-2">Property Type</h4>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(PropertyTypeIcons).map(([type, Icon]) => (
              <div
                key={type}
                className={cn(
                  "flex flex-col items-center justify-center p-4 border rounded-xl cursor-pointer",
                  localFilters.propertyType === type
                    ? "border-secondary-500 bg-secondary-500 text-white shadow-sm"
                    : "border-gray-200"
                )}
                onClick={() =>
                  setLocalFilters((prev) => ({
                    ...prev,
                    propertyType: type as PropertyTypeEnum,
                  }))
                }
              >
                <Icon className="w-6 h-6 mb-2" />
                <span>{type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Listing preferences captured when a property is created */}
        <div className="contents">
          <PreferenceOptions
            className="order-4"
            label="Stay Type"
            value={localFilters.stayType}
            options={[["any", "Any"], ["WholeUnit", "Whole Unit"], ["PayingGuest", "Private Room"]]}
            onChange={(stayType) => setLocalFilters((prev) => ({
              ...prev,
              stayType,
              ...(stayType === "PayingGuest"
                ? { beds: "1", baths: "1" }
                : { bathType: "any" }),
            }))}
          />
          <PreferenceOptions
            className="order-6"
            label="Bath Type"
            value={localFilters.bathType}
            options={[["any", "Any"], ["Private", "Private"], ["SharedBath", "Shared"]]}
            onChange={(bathType) => setLocalFilters((prev) => ({ ...prev, bathType }))}
            disabled={!isPrivateRoom}
          />
          {/* Gender preference filtering is hidden for now.
          <PreferenceOptions
            className="order-8"
            label="Gender Preference"
            value={localFilters.genderPreference}
            options={[["any", "Any"], ["NoPreference", "No preference"], ["Male", "Male"], ["Female", "Female"]]}
            onChange={(genderPreference) => setLocalFilters((prev) => ({ ...prev, genderPreference }))}
          />
          */}
          <div className="order-8 space-y-3">
            <PreferenceOptions
              label="Pets"
              value={localFilters.petsAllowed}
              options={[["any", "Any"], ["true", "Allowed"], ["false", "Not allowed"]]}
              onChange={(petsAllowed) => setLocalFilters((prev) => ({
                ...prev,
                petsAllowed,
                ...(petsAllowed !== "true" ? { petCount: "any", petFeeMax: "any" } : {}),
              }))}
            />
            {localFilters.petsAllowed === "true" && (
              <div className="ml-3 grid grid-cols-2 gap-3 border-l-2 border-secondary-200 pl-4">
                <div>
                  <Label htmlFor="pet-count" className="mb-2 block text-xs text-gray-600">Minimum pets allowed</Label>
                  <Input id="pet-count" type="number" min={0} placeholder="Any" value={localFilters.petCount === "any" ? "" : localFilters.petCount} onChange={(event) => setLocalFilters((prev) => ({ ...prev, petCount: event.target.value || "any" }))} />
                </div>
                <div>
                  <Label htmlFor="pet-fee" className="mb-2 block text-xs text-gray-600">Maximum pet fee</Label>
                  <Input id="pet-fee" type="number" min={0} placeholder="Any" value={localFilters.petFeeMax === "any" ? "" : localFilters.petFeeMax} onChange={(event) => setLocalFilters((prev) => ({ ...prev, petFeeMax: event.target.value || "any" }))} />
                </div>
              </div>
            )}
          </div>
          <div className="order-9 space-y-3">
            <PreferenceOptions
              label="Parking"
              value={localFilters.parkingIncluded}
              options={[["any", "Any"], ["true", "Included"], ["false", "Not included"]]}
              onChange={(parkingIncluded) => setLocalFilters((prev) => ({
                ...prev,
                parkingIncluded,
                ...(parkingIncluded !== "true" ? { parkingFeeMax: "any" } : {}),
              }))}
            />
            {localFilters.parkingIncluded === "true" && (
              <div className="ml-3 border-l-2 border-secondary-200 pl-4">
                <Label htmlFor="parking-fee" className="mb-2 block text-xs text-gray-600">Maximum parking fee</Label>
                <Input id="parking-fee" type="number" min={0} placeholder="Any" value={localFilters.parkingFeeMax === "any" ? "" : localFilters.parkingFeeMax} onChange={(event) => setLocalFilters((prev) => ({ ...prev, parkingFeeMax: event.target.value || "any" }))} />
              </div>
            )}
          </div>
          <PreferenceOptions
            className="order-10"
            label="Smoking"
            value={localFilters.smokingIncluded}
            options={[["any", "Any"], ["true", "Allowed"], ["false", "Not allowed"]]}
            onChange={(smokingIncluded) => setLocalFilters((prev) => ({ ...prev, smokingIncluded }))}
          />
        </div>

        {/* Price Range */}
        <div className="order-2">
          <h4 className="font-bold mb-2">Price Range (Monthly)</h4>
          <Slider
            min={0}
            max={10000}
            step={100}
            value={[
              localFilters.priceRange[0] ?? 0,
              localFilters.priceRange[1] ?? 10000,
            ]}
            onValueChange={(value: any) =>
              setLocalFilters((prev) => ({
                ...prev,
                priceRange: value as [number, number],
              }))
            }
          />
          <div className="flex justify-between mt-2">
            <span>${localFilters.priceRange[0] ?? 0}</span>
            <span>${localFilters.priceRange[1] ?? 10000}</span>
          </div>
        </div>

        {/* Beds and Baths */}
        <div className="order-5 flex gap-4">
          <div className="flex-1">
            <h4 className="font-bold mb-2">Beds</h4>
            <Select
              value={localFilters.beds || "any"}
              disabled={isPrivateRoom}
              onValueChange={(value) =>
                setLocalFilters((prev) => ({ ...prev, beds: value }))
              }
            >
              <SelectTrigger className="w-full rounded-xl">
                <SelectValue placeholder="Beds" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any beds</SelectItem>
                <SelectItem value="1">1+ bed</SelectItem>
                <SelectItem value="2">2+ beds</SelectItem>
                <SelectItem value="3">3+ beds</SelectItem>
                <SelectItem value="4">4+ beds</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <h4 className="font-bold mb-2">Baths</h4>
            <Select
              value={localFilters.baths || "any"}
              disabled={isPrivateRoom}
              onValueChange={(value) =>
                setLocalFilters((prev) => ({ ...prev, baths: value }))
              }
            >
              <SelectTrigger className="w-full rounded-xl">
                <SelectValue placeholder="Baths" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any baths</SelectItem>
                <SelectItem value="1">1+ bath</SelectItem>
                <SelectItem value="2">2+ baths</SelectItem>
                <SelectItem value="3">3+ baths</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Square Feet */}
        <div className="order-7">
          <h4 className="font-bold mb-2">Square Feet</h4>
          <Slider
            min={0}
            max={5000}
            step={100}
            value={[
              localFilters.squareFeet[0] ?? 0,
              localFilters.squareFeet[1] ?? 5000,
            ]}
            onValueChange={(value) =>
              setLocalFilters((prev) => ({
                ...prev,
                squareFeet: value as [number, number],
              }))
            }
          />
          <div className="flex justify-between mt-2">
            <span>{localFilters.squareFeet[0] ?? 0} sq ft</span>
            <span>{localFilters.squareFeet[1] ?? 5000} sq ft</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="order-11">
          <h4 className="font-bold mb-2">Amenities</h4>
          <div className="flex flex-wrap gap-2">
            {PROPERTY_AMENITY_OPTIONS
              .filter(({ value }) => value !== AmenityEnum.Parking && value !== AmenityEnum.PetsAllowed)
              .map(({ value: amenity, label }) => {
                const Icon = AmenityIcons[amenity];
                return (
              <div
                key={amenity}
                className={cn(
                  "flex items-center space-x-2 p-2 border rounded-lg hover:cursor-pointer",
                  localFilters.amenities.includes(amenity as AmenityEnum)
                    ? "border-secondary-500 bg-secondary-500 text-white shadow-sm"
                    : "border-gray-200"
                )}
                onClick={() => handleAmenityChange(amenity as AmenityEnum)}
              >
                <Icon className="w-5 h-5 hover:cursor-pointer" />
                <Label className="hover:cursor-pointer">
                  {label}
                </Label>
              </div>
              )})}
          </div>
        </div>

        {/* Available-date filtering is intentionally hidden. Filter state and
            API/backend support remain in place for easy re-enablement.
        <div>
          <h4 className="font-bold mb-2">Available From</h4>
          <Input
            type="date"
            value={
              localFilters.availableFrom !== "any"
                ? localFilters.availableFrom
                : ""
            }
            onChange={(e) =>
              setLocalFilters((prev) => ({
                ...prev,
                availableFrom: e.target.value ? e.target.value : "any",
              }))
            }
            className="rounded-xl"
          />
        </div>
        */}

        {/* Apply and Reset buttons */}
        <div className="order-12 flex gap-4 mt-6">
          <Button
            onClick={handleSubmit}
            className="flex-1 bg-primary-700 text-white rounded-xl"
          >
            APPLY
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="flex-1 rounded-xl"
          >
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FiltersFull;

const PreferenceOptions = ({
  label,
  value,
  options,
  onChange,
  disabled = false,
  className,
}: {
  label: string;
  value: string;
  options: [string, string][];
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}) => (
  <fieldset className={className}>
    <legend className="mb-2 text-sm font-semibold text-gray-800">{label}</legend>
    <div className="flex flex-wrap gap-2">
      {options.map(([optionValue, optionLabel]) => (
        <button
          key={optionValue}
          type="button"
          disabled={disabled}
          aria-pressed={value === optionValue}
          onClick={() => onChange(optionValue)}
          className={cn(
            "rounded-xl border px-3 py-2 text-sm transition-colors disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400",
            value === optionValue
              ? "border-secondary-500 bg-secondary-500 text-white shadow-sm"
              : "border-gray-200 bg-white text-gray-700 hover:border-secondary-300"
          )}
        >
          {optionLabel}
        </button>
      ))}
    </div>
  </fieldset>
);
