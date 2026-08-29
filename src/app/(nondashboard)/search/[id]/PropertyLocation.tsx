import { useGetPropertyQuery } from "@/state/api";
import { Compass, MapPin } from "lucide-react";
import React from "react";

const PropertyLocation = ({ propertyId }: PropertyDetailsProps) => {
  const {
    data: property,
    isError,
    isLoading,
  } = useGetPropertyQuery(propertyId);
  if (isLoading) return <>Loading...</>;
  if (isError || !property) {
    return <>Property not Found</>;
  }

  const longitude = Number(property.location?.coordinates?.longitude);
  const latitude = Number(property.location?.coordinates?.latitude);
  const hasCoordinates = Number.isFinite(longitude) && Number.isFinite(latitude);
  const mapQuery = hasCoordinates
    ? `${latitude},${longitude}`
    : property.location?.formattedAddress || property.location?.address || "";

  return (
    <div className="py-16">
      <h3 className="text-xl font-semibold text-primary-800 dark:text-primary-100">
        Map and Location
      </h3>
      <div className="flex justify-between items-center text-sm text-primary-500 mt-2">
        <div className="flex items-center text-gray-500">
          <MapPin className="w-4 h-4 mr-1 text-gray-700" />
          Property Address:
          <span className="ml-2 font-semibold text-gray-700">
            {property.location?.address || "Address not available"}
          </span>
        </div>
        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(
            property.location?.address || ""
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-between items-center hover:underline gap-2 text-primary-600"
        >
          <Compass className="w-5 h-5" />
          Get Directions
        </a>
      </div>
      <div className="relative mt-4 h-[300px] overflow-hidden rounded-lg bg-gray-100">
        <iframe
          title={`Map showing ${property.location?.address || property.name}`}
          src={`https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=14&output=embed`}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default PropertyLocation;
