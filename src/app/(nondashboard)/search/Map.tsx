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
  const filters = useAppSelector((state) => state.global.filters);
  const {
    data: result,
    isLoading,
    isError,
  } = useSearchPropertiesQuery(filters);

  useEffect(() => {
    if (isLoading || isError || !result) return;

    const container = mapContainerRef.current;
    if (!container) return;

    const map = new mapboxgl.Map({
      container,
      style: "mapbox://styles/shagrihaadmin/cmt4yvuv300et01s4a9sy8rad",
      center: filters.coordinates.some((coordinate) => coordinate !== 0)
        ? filters.coordinates
        : [-98.5795, 39.8283],
      zoom: 9,
    });

    result.properties.forEach((property) => {
      const marker = createPropertyMarker(property, map);
      const markerElement = marker.getElement();
      const path = markerElement.querySelector("path[fill='#3FB1CE']");
      if (path) path.setAttribute("fill", "#000000");
    });

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
      map.remove();
    };
  }, [isLoading, isError, result, filters.coordinates]);

  if (isLoading) return <>Loading...</>;
  if (isError || !result) return <div>Failed to fetch properties</div>;

  return (
    <div className="basis-5/12 grow relative rounded-xl">
      <div
        className="map-container rounded-xl"
        ref={mapContainerRef}
        style={{
          height: "100%",
          width: "100%",
        }}
      />
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
