import { Heart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FAVORITE_GLOW_EVENT } from "@/lib/constants";

const CardCompact = ({
  property,
  isFavorite,
  onFavoriteToggle,
  showFavoriteButton = true,
  propertyLink,
}: CardCompactProps) => {
  const [imgSrc, setImgSrc] = useState(
    property.photoUrls?.[0] || "/placeholder.jpg"
  );
  const router = useRouter();

  const openProperty = () => {
    if (propertyLink) router.push(propertyLink, { scroll: false });
  };

  const toggleFavorite = () => {
    window.dispatchEvent(new Event(FAVORITE_GLOW_EVENT));
    onFavoriteToggle?.();
  };

  return (
    <article
      className={`mb-4 flex h-36 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-[transform,box-shadow] duration-300 sm:mb-5 sm:h-40 ${propertyLink ? "cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(124,58,237,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500" : ""}`}
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
      <div className="relative w-1/3">
        <Image
          src={imgSrc}
          alt={property.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={() => setImgSrc("/placeholder.jpg")}
        />
        {/* Property preference badges are intentionally hidden on listing images.
        <div className="absolute bottom-2 left-2 flex gap-1 flex-col">
          {property.isPetsAllowed && (
            <span className="bg-white/80 text-black text-xs font-semibold px-2 py-1 rounded-full w-fit">
              Pets
            </span>
          )}
          {property.isParkingIncluded && (
            <span className="bg-white/80 text-black text-xs font-semibold px-2 py-1 rounded-full">
              Parking
            </span>
          )}
        </div>
        */}
      </div>
      <div className="flex min-w-0 w-2/3 flex-col justify-between p-3 sm:p-4">
        <div>
          <div className="flex justify-between items-start">
            <h2 className="mb-1 truncate text-base font-bold sm:text-xl">
              {property.name}
            </h2>
            {showFavoriteButton && (
              <button
                className="relative rounded-full bg-white p-1"
                onClick={(event) => {
                  event.stopPropagation();
                  toggleFavorite();
                }}
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart
                  className={`w-4 h-4 ${
                    isFavorite ? "text-red-500 fill-red-500" : "text-gray-600"
                  }`}
                />
              </button>
            )}
          </div>
          <p className="mb-1 truncate text-sm text-gray-500">
            {property?.location?.address}, {property?.location?.city}
          </p>
          {/* Reviews and ratings are hidden until that feature is reintroduced.
          <div className="flex text-sm items-center">
            <Star className="w-3 h-3 text-yellow-400 mr-1" />
            <span className="font-semibold">
              {property.averageRating.toFixed(1)}
            </span>
            <span className="text-gray-600 ml-1">
              ({property.numberOfReviews})
            </span>
          </div>
          */}
        </div>
        <div className="text-sm">
          <div className="flex min-w-0 items-center gap-1.5 whitespace-nowrap text-gray-500 sm:gap-2">
            <span>{property.beds} Bed</span>
            <span className="h-1 w-1 shrink-0 rounded-full bg-gray-400" aria-hidden="true" />
            <span>{property.baths} Bath</span>
            <span className="h-1 w-1 shrink-0 rounded-full bg-gray-400" aria-hidden="true" />
            <span>{property.squareFeet} Sqft</span>
          </div>
          <p className="mt-1 text-base font-medium text-secondary-500">
            ${property.pricePerMonth.toFixed(0)}
            <span className="text-sm font-normal">/monthly</span>
          </p>
        </div>
      </div>
    </article>
  );
};

export default CardCompact;
