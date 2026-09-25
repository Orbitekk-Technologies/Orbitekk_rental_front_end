"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useAppDispatch, useAppSelector } from "@/state/redux";
import { useSearchPropertiesQuery } from "@/state/api";
import { Property } from "@/types/prismaTypes";
import { setFilters } from "@/state";
import { Eraser, Pencil, X } from "lucide-react";
import { Button } from "@/components/ui/button";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

const Map = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const drawingRef = useRef(false);
  const tracingRef = useRef(false);
  const draftBoundaryRef = useRef<[number, number][]>([]);
  const selectedBoundaryRef = useRef<[number, number][]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDraftBoundary, setHasDraftBoundary] = useState(false);
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.global.filters);
  selectedBoundaryRef.current = filters.boundary ?? [];
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
    map.on("load", () => {
      map.addSource("search-boundary", {
        type: "geojson",
        data: boundaryGeoJson(selectedBoundaryRef.current),
      });
      map.addLayer({
        id: "search-boundary-fill",
        type: "fill",
        source: "search-boundary",
        filter: ["==", ["geometry-type"], "Polygon"],
        paint: { "fill-color": "#9747FF", "fill-opacity": 0.18 },
      });
      map.addLayer({
        id: "search-boundary-line",
        type: "line",
        source: "search-boundary",
        filter: ["in", ["geometry-type"], ["literal", ["Polygon", "LineString"]]],
        layout: { "line-cap": "round", "line-join": "round" },
        paint: {
          "line-color": "#9747FF",
          "line-width": 3,
          "line-dasharray": [1, 2],
        },
      });
    });

    const canvas = map.getCanvas();
    const pointFromPointer = (event: PointerEvent): [number, number] => {
      const bounds = canvas.getBoundingClientRect();
      const point = map.unproject([event.clientX - bounds.left, event.clientY - bounds.top]);
      return [point.lng, point.lat];
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!drawingRef.current || event.button > 0) return;
      event.preventDefault();
      tracingRef.current = true;
      draftBoundaryRef.current = [pointFromPointer(event)];
      canvas.setPointerCapture(event.pointerId);
      updateBoundarySource(map, draftBoundaryRef.current);
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!drawingRef.current || !tracingRef.current) return;
      event.preventDefault();
      const lastPoint = draftBoundaryRef.current.at(-1);
      const nextPoint = pointFromPointer(event);
      if (lastPoint && map.project(lastPoint).dist(map.project(nextPoint)) < 5) return;
      draftBoundaryRef.current.push(nextPoint);
      updateBoundarySource(map, draftBoundaryRef.current);
    };
    const onPointerUp = (event: PointerEvent) => {
      if (!drawingRef.current || !tracingRef.current) return;
      event.preventDefault();
      tracingRef.current = false;
      if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
      if (draftBoundaryRef.current.length < 3) {
        draftBoundaryRef.current = [];
        updateBoundarySource(map, []);
        return;
      }
      const boundary = sampleBoundary(draftBoundaryRef.current, 100);
      draftBoundaryRef.current = boundary;
      drawingRef.current = false;
      setHasDraftBoundary(true);
      updateBoundarySource(map, boundary);
      endDrawSession(map);
    };
    const onPointerCancel = () => {
      tracingRef.current = false;
      draftBoundaryRef.current = [];
      updateBoundarySource(map, selectedBoundaryRef.current);
    };
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerCancel);

    return () => {
      active = false;
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerCancel);
      resizeObserver.disconnect();
      markersRef.current = [];
      mapRef.current = null;
      map.remove();
    };
  }, [dispatch]); // The map canvas is persistent; results update markers below.

  useEffect(() => {
    if (isDrawing) return;
    const map = mapRef.current;
    if (!map?.isStyleLoaded()) return;
    updateBoundarySource(map, filters.boundary ?? []);
  }, [filters.boundary, isDrawing]);

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

  const startDrawing = useCallback(() => {
    const map = mapRef.current;
    if (!map) return;
    drawingRef.current = true;
    tracingRef.current = false;
    draftBoundaryRef.current = [];
    setIsDrawing(true);
    setHasDraftBoundary(false);
    map.getCanvas().style.cursor = "crosshair";
    map.getCanvas().style.touchAction = "none";
    map.dragPan.disable();
    map.touchZoomRotate.disable();
    updateBoundarySource(map, []);
  }, []);

  const cancelDrawing = useCallback(() => {
    const map = mapRef.current;
    drawingRef.current = false;
    tracingRef.current = false;
    draftBoundaryRef.current = [];
    setIsDrawing(false);
    setHasDraftBoundary(false);
    if (map) {
      endDrawSession(map);
      updateBoundarySource(map, filters.boundary ?? []);
    }
  }, [filters.boundary]);

  const applyBoundary = useCallback(() => {
    if (draftBoundaryRef.current.length < 3) return;
    setIsDrawing(false);
    setHasDraftBoundary(false);
    dispatch(setFilters({ boundary: [...draftBoundaryRef.current], page: 0 }));
  }, [dispatch]);

  const clearBoundary = useCallback(() => {
    const map = mapRef.current;
    drawingRef.current = false;
    tracingRef.current = false;
    draftBoundaryRef.current = [];
    setIsDrawing(false);
    setHasDraftBoundary(false);
    if (map) {
      endDrawSession(map);
      updateBoundarySource(map, []);
    }
    dispatch(setFilters({ boundary: undefined, page: 0 }));
  }, [dispatch]);

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
      <div className="absolute right-3 top-3 z-10 flex max-w-[calc(100%-1.5rem)] flex-col items-end gap-2">
        {!isDrawing && !filters.boundary ? (
          <Button
            type="button"
            variant="secondary"
            onClick={startDrawing}
            className="gap-2 bg-white shadow-md hover:bg-gray-50"
          >
            <Pencil className="h-4 w-4" />
            Draw area
          </Button>
        ) : isDrawing ? (
          <div className="flex max-w-64 flex-wrap items-center gap-2 rounded-lg bg-white p-2 shadow-md">
            <span className="px-1 text-sm text-gray-700">
              {hasDraftBoundary ? "Your area is ready" : "Press and drag to draw your area"}
            </span>
            {hasDraftBoundary && (
              <Button
                type="button"
                size="sm"
                onClick={applyBoundary}
                className="bg-secondary-500 text-white hover:bg-secondary-600"
              >
                Apply
              </Button>
            )}
            <Button type="button" size="sm" variant="ghost" onClick={cancelDrawing} aria-label="Cancel drawing">
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : null}
        {filters.boundary && !isDrawing && (
          <Button
            type="button"
            variant="secondary"
            onClick={clearBoundary}
            className="gap-2 bg-white shadow-md hover:bg-gray-50"
            aria-label="Clear drawn area"
            title="Clear drawn area"
          >
            <Eraser className="h-4 w-4" />
            Clear area
          </Button>
        )}
      </div>
      {filters.boundary && !isDrawing && (
        <div
          className="pointer-events-none absolute left-3 top-3 z-10 rounded-md bg-gray-800/70 px-3 py-2 text-sm font-medium text-white shadow-sm backdrop-blur-sm md:hidden"
          role="status"
          aria-live="polite"
        >
          {isLoading || !result
            ? "Finding properties…"
            : `${result.totalResults} ${result.totalResults === 1 ? "result" : "results"} found`}
        </div>
      )}
      {isLoading && (
        <div className="pointer-events-none absolute inset-x-3 bottom-3 rounded-lg bg-white/90 px-3 py-2 text-sm shadow">
          Updating properties...
        </div>
      )}
      {isError && (
        <div className="absolute inset-x-3 bottom-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 shadow">
          Failed to fetch properties.
        </div>
      )}
    </div>
  );
};

const boundaryGeoJson = (points: [number, number][]) => {
  const features: GeoJSON.Feature[] = [];

  if (points.length >= 3) {
    features.unshift({
      type: "Feature",
      properties: {},
      geometry: { type: "Polygon", coordinates: [[...points, points[0]]] },
    });
  } else if (points.length === 2) {
    features.unshift({
      type: "Feature",
      properties: {},
      geometry: { type: "LineString", coordinates: points },
    });
  }

  return { type: "FeatureCollection" as const, features };
};

const updateBoundarySource = (map: mapboxgl.Map, points: [number, number][]) => {
  const source = map.getSource("search-boundary") as mapboxgl.GeoJSONSource | undefined;
  source?.setData(boundaryGeoJson(points));
};

const endDrawSession = (map: mapboxgl.Map) => {
  map.getCanvas().style.removeProperty("cursor");
  map.getCanvas().style.removeProperty("touch-action");
  map.dragPan.enable();
  map.touchZoomRotate.enable();
};

const sampleBoundary = (points: [number, number][], maximumPoints: number) => {
  if (points.length <= maximumPoints) return [...points];
  const sampled: [number, number][] = [];
  for (let index = 0; index < maximumPoints; index += 1) {
    sampled.push(points[Math.round((index * (points.length - 1)) / (maximumPoints - 1))]);
  }
  return sampled;
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
