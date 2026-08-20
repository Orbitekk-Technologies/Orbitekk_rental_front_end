"use client";

import { setFilters } from "@/state";
import { useAppDispatch } from "@/state/redux";
import { useEffect } from "react";

const LOCATION_PROMPTED_KEY = "shagriha-location-prompted";
const DALLAS_LOCATION = {
  coordinates: [-96.797, 32.7767] as [number, number],
  location: "Dallas, Texas",
  city: "Dallas",
  state: "TX",
};

export default function LocationInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (sessionStorage.getItem(LOCATION_PROMPTED_KEY)) return;
    sessionStorage.setItem(LOCATION_PROMPTED_KEY, "true");

    if (!navigator.geolocation) {
      dispatch(setFilters(DALLAS_LOCATION));
      return;
    }

    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      const coordinates: [number, number] = [coords.longitude, coords.latitude];
      let location = "Current location";
      const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

      if (token) {
        try {
          const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${coords.longitude},${coords.latitude}.json?types=region&access_token=${token}`
          );
          const data = await response.json();
          location = data.features?.[0]?.text || location;
        } catch {
          // Coordinates still provide proximity filtering if reverse geocoding fails.
        }
      }

      dispatch(setFilters({ coordinates, location }));
    }, () => dispatch(setFilters(DALLAS_LOCATION)));
  }, [dispatch]);

  return null;
}
