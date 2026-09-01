"use client";

import { setFilters } from "@/state";
import { useAppDispatch } from "@/state/redux";
import { Button } from "@/components/ui/button";
import { LocateFixed, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

type LocationState = "idle" | "requesting" | "denied" | "unavailable" | "resolved";

export default function LocationInitializer() {
  const dispatch = useAppDispatch();
  const requested = useRef(false);
  const [status, setStatus] = useState<LocationState>("idle");
  const [dismissed, setDismissed] = useState(false);

  const resolveLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setStatus("unavailable");
      return;
    }

    setStatus("requesting");
    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      const coordinates: [number, number] = [coords.longitude, coords.latitude];
      let location = "Current location";
      let city: string | undefined;
      let state: string | undefined;
      const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

      if (token) {
        try {
          const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${coords.longitude},${coords.latitude}.json?types=place,region&access_token=${token}`
          );
          const data = await response.json();
          const features = data.features ?? [];
          const place = features.find((feature: { place_type?: string[] }) => feature.place_type?.includes("place"));
          const region = features.find((feature: { place_type?: string[] }) => feature.place_type?.includes("region"));
          city = place?.text;
          state = region?.properties?.short_code?.replace(/^US-/i, "") ?? region?.short_code?.replace(/^US-/i, "") ?? region?.text;
          location = [city, region?.text].filter(Boolean).join(", ") || location;
        } catch {
          // Coordinates still provide proximity filtering if reverse geocoding fails.
        }
      }

      dispatch(setFilters({ coordinates, location, city, state, page: 0 }));
      setStatus("resolved");
      setDismissed(false);
    }, (error) => {
      setStatus(error.code === error.PERMISSION_DENIED ? "denied" : "unavailable");
    }, {
      enableHighAccuracy: false,
      timeout: 10_000,
      maximumAge: 5 * 60_000,
    });
  }, [dispatch]);

  useEffect(() => {
    if (!requested.current) {
      requested.current = true;
      resolveLocation();
    }

    if (!navigator.permissions) return;
    let permission: PermissionStatus | undefined;
    const handlePermissionChange = () => {
      if (permission?.state === "granted") resolveLocation();
      else if (permission?.state === "denied") setStatus("denied");
    };
    void navigator.permissions.query({ name: "geolocation" }).then((result) => {
      permission = result;
      permission.addEventListener("change", handlePermissionChange);
    }).catch(() => undefined);
    return () => permission?.removeEventListener("change", handlePermissionChange);
  }, [resolveLocation]);

  if (status === "resolved" || dismissed) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-[100] flex w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-xl" role="status">
      <LocateFixed className="mt-0.5 h-5 w-5 shrink-0 text-secondary-600" aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-gray-950">
          {status === "requesting" ? "Finding properties near you…" : "See properties near your location"}
        </p>
        {status !== "requesting" && (
          <p className="mt-1 text-sm text-gray-600">
            {status === "denied"
              ? "Location is blocked. Allow it from your browser’s site controls, then try again—or search for a city manually."
              : "Enable location to automatically show nearby properties, or search for a city manually."}
          </p>
        )}
        {status !== "requesting" && (
          <Button type="button" size="sm" className="mt-3" onClick={resolveLocation}>
            Use my location
          </Button>
        )}
      </div>
      {status !== "requesting" && (
        <button type="button" onClick={() => setDismissed(true)} aria-label="Dismiss location notice" className="rounded p-1 text-gray-500 hover:bg-gray-100">
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
