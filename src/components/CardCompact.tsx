import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPropertyImage } from "@/lib/utils";

export default function CardCompact({
  property,
  isFavorite,
  onFavoriteToggle,
  showFavoriteButton = true,
  propertyLink = `/search/${property.id}`,
}: CardCompactProps) {
  const image = getPropertyImage(property.photoUrls?.[0]);

  return (
    <div className="mb-4 flex overflow-hidden rounded-lg border border-primary-200 bg-white">
      <Link href={propertyLink} className="relative block h-32 w-36 shrink-0">
        <Image src={image} alt={property.name} fill className="object-cover" />
      </Link>
      <div className="min-w-0 flex-1 p-4">
        <div className="flex items-start justify-between gap-2">
          <Link href={propertyLink} className="min-w-0">
            <h3 className="truncate font-semibold">{property.name}</h3>
            <p className="text-sm text-primary-500">
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
        <p className="mt-3 text-sm font-semibold">
          ${property.pricePerMonth.toLocaleString()} / month
        </p>
        <p className="mt-1 text-sm text-primary-500">
          {property.beds} bd | {property.baths} ba
        </p>
      </div>
    </div>
  );
}
