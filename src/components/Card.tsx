import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPropertyImage } from "@/lib/utils";

export default function Card({
  property,
  isFavorite,
  onFavoriteToggle,
  showFavoriteButton = true,
  propertyLink = `/search/${property.id}`,
}: CardProps) {
  const image = getPropertyImage(property.photoUrls?.[0]);

  return (
    <div className="mb-5 overflow-hidden rounded-lg border border-primary-200 bg-white">
      <Link href={propertyLink} className="relative block aspect-video">
        <Image src={image} alt={property.name} fill className="object-cover" />
      </Link>
      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <Link href={propertyLink} className="min-w-0">
            <h3 className="truncate font-semibold text-primary-900">
              {property.name}
            </h3>
            <p className="mt-1 flex items-center gap-1 text-sm text-primary-500">
              <MapPin className="h-4 w-4" />
              {property.location?.city}, {property.location?.state}
            </p>
          </Link>
          {showFavoriteButton && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onFavoriteToggle}
              aria-label={isFavorite ? "Remove favorite" : "Add favorite"}
            >
              <Heart
                className={isFavorite ? "h-5 w-5 fill-red-500 text-red-500" : "h-5 w-5"}
              />
            </Button>
          )}
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold">
            ${property.pricePerMonth.toLocaleString()} / month
          </span>
          <span className="flex items-center gap-1 text-yellow-600">
            <Star className="h-4 w-4 fill-current" />
            {property.averageRating?.toFixed?.(1) ?? "0.0"}
          </span>
        </div>
        <p className="text-sm text-primary-500">
          {property.beds} bd | {property.baths} ba |{" "}
          {property.squareFeet?.toLocaleString()} sq ft
        </p>
      </div>
    </div>
  );
}
