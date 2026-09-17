import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FAVORITE_GLOW_EVENT } from "@/lib/constants";

const Card = ({
  property,
  isFavorite,
  onFavoriteToggle,
  showFavoriteButton = true,
  propertyLink,
}: CardProps) => {
  const [imgSrc, setImgSrc] = useState(
    property.photoUrls?.[0] || "/placeholder.jpg"
  );
  const toggleFavorite = () => {
    window.dispatchEvent(new Event(FAVORITE_GLOW_EVENT));
    onFavoriteToggle?.();
  };

  return (
    <div className="mb-5 w-full overflow-hidden rounded-xl bg-white shadow-lg transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(124,58,237,0.16)]">
      <div className="relative">
        <div className="w-full h-48 relative">
          <Image
            src={imgSrc}
            alt={property.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setImgSrc("/placeholder.jpg")}
          />
        </div>
        {/* Property preference badges are intentionally hidden on listing images.
        <div className="absolute bottom-4 left-4 flex gap-2">
          {property.isPetsAllowed && (
            <span className="bg-white/80 text-black text-xs font-semibold px-2 py-1 rounded-full">
              Pets Allowed
            </span>
          )}
          {property.isParkingIncluded && (
            <span className="bg-white/80 text-black text-xs font-semibold px-2 py-1 rounded-full">
              Parking Included
            </span>
          )}
        </div>
        */}
        {showFavoriteButton && (
          <button
            className="absolute bottom-4 right-4 cursor-pointer rounded-full bg-white p-2 hover:bg-white/90"
            onClick={toggleFavorite}
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite ? "text-red-500 fill-red-500" : "text-gray-600"
              }`}
            />
          </button>
        )}
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-1">
          {propertyLink ? (
            <Link
              href={propertyLink}
              className="hover:underline hover:text-blue-600"
              scroll={false}
            >
              {property.name}
            </Link>
          ) : (
            property.name
          )}
        </h2>
        <p className="text-gray-600 mb-2">
          {property?.location?.address}, {property?.location?.city}
        </p>
        <div className="flex justify-between items-center">
          {/* Reviews and ratings are hidden until that feature is reintroduced.
          <div className="flex items-center mb-2">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            <span className="font-semibold">
              {property.averageRating.toFixed(1)}
            </span>
            <span className="text-gray-600 ml-1">
              ({property.numberOfReviews} Reviews)
            </span>
          </div>
          */}
          <p className="text-lg font-bold mb-3">
            ${property.pricePerMonth.toFixed(0)}{" "}
            <span className="text-gray-600 text-base font-normal"> /month</span>
          </p>
        </div>
        <hr />
        <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-gray-600 sm:text-base">
          <span>{property.beds} Bed</span>
          <span className="h-1 w-1 rounded-full bg-gray-400" aria-hidden="true" />
          <span>{property.baths} Bath</span>
          <span className="h-1 w-1 rounded-full bg-gray-400" aria-hidden="true" />
          <span>{property.squareFeet} Sqft</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
