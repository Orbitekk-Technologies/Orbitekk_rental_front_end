"use client";

import { getPropertyImage } from "@/lib/utils";
import type { Property } from "@/types/prismaTypes";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, type KeyboardEvent } from "react";
import StatusBadge from "@/components/StatusBadge";

const ResidenceListingCard = ({ property }: { property: Property }) => {
  const router = useRouter();
  const href = `/tenants/residences/${property.id}`;
  const [imageSrc, setImageSrc] = useState(
    property.photoUrls?.[0] ? getPropertyImage(property.photoUrls[0]) : "/placeholder.jpg"
  );
  const address = [
    property.location.address,
    property.location.city,
    property.location.stateCode || property.location.state,
  ].filter(Boolean).join(", ");

  const openResidence = () => router.push(href);
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openResidence();
    }
  };

  return (
    <article
      role="link"
      tabIndex={0}
      onClick={openResidence}
      onKeyDown={handleKeyDown}
      className="group flex min-h-40 w-full cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-white p-3 text-left transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-secondary-200 hover:shadow-[0_14px_35px_rgba(124,58,237,0.13)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-400 focus-visible:ring-offset-2"
      aria-label={`Open ${property.name} residence`}
    >
      <div className="relative w-2/5 min-w-32 overflow-hidden rounded-lg bg-gray-100 sm:w-52">
        <Image
          src={imageSrc}
          alt=""
          fill
          sizes="208px"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          onError={() => setImageSrc("/placeholder.jpg")}
        />
        {property.photoUrls.length > 1 && (
          <span className="absolute bottom-2 right-2 rounded-full bg-white/90 px-2 py-1 text-xs text-gray-700">
            +{property.photoUrls.length - 1}
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1 px-4 py-1">
        <StatusBadge tone="active">Active Residence</StatusBadge>
        <h2 className="mt-2 truncate text-xl font-semibold text-gray-950">{property.name}</h2>
        <p className="mt-1 flex items-center gap-1.5 truncate text-sm text-gray-500">
          <MapPin className="h-4 w-4 shrink-0" />
          {address || "Property address unavailable"}
        </p>
        <p className="mt-5 flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <span>${Number(property.pricePerMonth).toFixed(0)}/Month</span><span>•</span>
          <span>{property.baths} Bath</span><span>•</span><span>{property.beds} Bed</span><span>•</span>
          <span>{property.squareFeet} sq.ft.</span>
        </p>
      </div>
    </article>
  );
};

export default ResidenceListingCard;
