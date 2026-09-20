import { Heart, MapPin } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FAVORITE_GLOW_EVENT } from "@/lib/constants";
import { getPropertyImage } from "@/lib/utils";

const CardCompact = ({
  property,
  isFavorite,
  onFavoriteToggle,
  showFavoriteButton = true,
  propertyLink,
}: CardCompactProps) => {
  const [imgSrc, setImgSrc] = useState(
    property.photoUrls?.[0] ? getPropertyImage(property.photoUrls[0]) : "/placeholder.jpg"
  );
  const router = useRouter();

  const openProperty = () => {
    if (propertyLink) router.push(propertyLink, { scroll: false });
  };
  const toggleFavorite = () => {
    window.dispatchEvent(new Event(FAVORITE_GLOW_EVENT));
    onFavoriteToggle?.();
  };
  const address = [
    property.location?.address,
    property.location?.city,
    property.location?.stateCode || property.location?.state,
  ].filter(Boolean).join(", ");

  return (
    <article
      className={`group mb-4 flex min-h-40 w-full overflow-hidden rounded-xl border border-gray-200 bg-white p-3 text-left shadow-sm transition-[transform,box-shadow,border-color] duration-200 sm:mb-5 ${propertyLink ? "cursor-pointer hover:-translate-y-0.5 hover:border-secondary-200 hover:shadow-[0_14px_35px_rgba(124,58,237,0.13)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-400 focus-visible:ring-offset-2" : ""}`}
      onClick={openProperty}
      onKeyDown={(event) => {
        if (propertyLink && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          openProperty();
        }
      }}
      role={propertyLink ? "link" : undefined}
      tabIndex={propertyLink ? 0 : undefined}
    >
      <div className="relative w-2/5 min-w-32 overflow-hidden rounded-lg bg-gray-100 sm:w-52">
        <Image
          src={imgSrc}
          alt={property.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 40vw, 208px"
          onError={() => setImgSrc("/placeholder.jpg")}
        />
        {property.photoUrls.length > 1 && (
          <span className="absolute bottom-2 right-2 rounded-full bg-white/90 px-2 py-1 text-xs text-gray-700">
            +{property.photoUrls.length - 1}
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1 px-4 py-1">
        <div className="flex items-start justify-between gap-3">
          <h2 className="truncate text-xl font-semibold text-gray-950">{property.name}</h2>
          {showFavoriteButton && (
            <button
              type="button"
              className="relative shrink-0 rounded-full bg-white p-1.5 transition-colors hover:bg-secondary-50"
              onClick={(event) => {
                event.stopPropagation();
                toggleFavorite();
              }}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
            </button>
          )}
        </div>
        <p className="mt-2 flex items-center gap-1.5 truncate text-sm text-gray-500">
          <MapPin className="h-4 w-4 shrink-0" />
          {address || "Property address unavailable"}
        </p>
        <p className="mt-7 flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <span>${Number(property.pricePerMonth).toFixed(0)}/Month</span><span>•</span>
          <span>{property.baths} Bath</span><span>•</span><span>{property.beds} Bed</span><span>•</span>
          <span>{property.squareFeet} sq.ft.</span>
        </p>
      </div>
    </article>
  );
};

export default CardCompact;
