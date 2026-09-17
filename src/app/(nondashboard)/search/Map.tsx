"use client";
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useAppSelector } from "@/state/redux";
import { useSearchPropertiesQuery } from "@/state/api";
import { Property } from "@/types/prismaTypes";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

const Map = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const filters = useAppSelector((state) => state.global.filters);
  const {
    data: result,
    isLoading,
    isError,
  } = useSearchPropertiesQuery(filters);

  useEffect(() => {
    const container = mapContainerRef.current;
    if (!container) return;

    const map = new mapboxgl.Map({
      container,
      style: "mapbox://styles/shagrihaadmin/cmt4yvuv300et01s4a9sy8rad",
      center: [-98.5795, 39.8283],
      zoom: 9,
    });
    mapRef.current = map;
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
        showUserHeading: true,
        showAccuracyCircle: true,
      }),
      "bottom-right"
    );

    let active = true;
    const resizeMap = () => {
      if (active && container.isConnected) map.resize();
    };
    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(resizeMap);
    });
    resizeObserver.observe(container);
    map.once("load", resizeMap);

    return () => {
      active = false;
      resizeObserver.disconnect();
      markersRef.current = [];
      mapRef.current = null;
      map.remove();
    };
  }, []); // The map canvas is persistent; results update markers below.

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (filters.coordinates.some((coordinate) => coordinate !== 0)) {
      map.easeTo({ center: filters.coordinates });
    }
  }, [filters.coordinates]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !result) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = result.properties.map((property) => {
      const marker = createPropertyMarker(property, map);
      const path = marker.getElement().querySelector("path[fill='#3FB1CE']");
      if (path) path.setAttribute("fill", "#000000");
      return marker;
    });
  }, [result]);

  return (
    <div className="relative h-full w-full md:rounded-xl">
      <div
        className="map-container rounded-xl"
        ref={mapContainerRef}
        style={{
          height: "100%",
          width: "100%",
        }}
      />
      {isLoading && (
        <div className="pointer-events-none absolute inset-x-3 top-3 rounded-lg bg-white/90 px-3 py-2 text-sm shadow">
          Updating properties...
        </div>
      )}
      {isError && (
        <div className="absolute inset-x-3 top-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 shadow">
          Failed to fetch properties.
        </div>
      )}
    </div>
  );
};

const createPropertyMarker = (property: Property, map: mapboxgl.Map) => {
  const marker = new mapboxgl.Marker()
    .setLngLat([
      property.location.coordinates.longitude,
      property.location.coordinates.latitude,
    ])
    .setPopup(
      new mapboxgl.Popup().setHTML(
        `
        <div class="marker-popup">
          <div class="marker-popup-image"></div>
          <div>
            <a href="/search/${property.id}" target="_blank" class="marker-popup-title">${property.name}</a>
            <p class="marker-popup-price">
              $${property.pricePerMonth}
              <span class="marker-popup-price-unit"> / month</span>
            </p>
          </div>
        </div>
        `
      )
    )
    .addTo(map);
  return marker;
};

export default Map;
