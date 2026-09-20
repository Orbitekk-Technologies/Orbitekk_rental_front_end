"use client";

import type { PropertyDraft } from "@/lib/propertyDraftStorage";
import type { Property } from "@/types/prismaTypes";
import { Archive, EllipsisVertical, MapPin, Pencil, RotateCcw, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, type KeyboardEvent, type MouseEvent } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getPropertyImage } from "@/lib/utils";
import StatusBadge from "@/components/StatusBadge";

type Listing =
  | { kind: "property"; property: Property; archived: boolean }
  | { kind: "draft"; draft: PropertyDraft; archived: boolean };

interface ManagerListingCardProps {
  listing: Listing;
  onArchive: () => void;
  onUnarchive: () => void;
  onDelete: () => void;
  onArchivedOpen: () => void;
}

const ManagerListingCard = ({ listing, onArchive, onUnarchive, onDelete, onArchivedOpen }: ManagerListingCardProps) => {
  const router = useRouter();
  const isProperty = listing.kind === "property";
  const property = isProperty ? listing.property : null;
  const draft = !isProperty ? listing.draft : null;
  const [imageSrc, setImageSrc] = useState(
    property?.photoUrls?.[0] ? getPropertyImage(property.photoUrls[0]) : "/placeholder.jpg"
  );
  const name = property?.name || draft?.values.name?.trim() || "Untitled Property";
  const address = property
    ? [property.location.address, property.location.city, property.location.stateCode || property.location.state].filter(Boolean).join(", ")
    : [draft?.values.addressLine1, draft?.values.city, draft?.values.stateName].filter(Boolean).join(", ");
  const href = property
    ? `/managers/properties/${property.id}`
    : `/managers/newproperty?draftId=${draft?.id}`;

  const openListing = () => {
    if (listing.archived) onArchivedOpen();
    else router.push(href);
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openListing();
    }
  };
  const stop = (event: MouseEvent) => event.stopPropagation();
  const afterMenuCloses = (action: () => void) => {
    window.setTimeout(action, 0);
  };

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={openListing}
      onKeyDown={handleKeyDown}
      className="group relative flex min-h-40 w-full cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-white p-3 text-left transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-secondary-200 hover:shadow-[0_14px_35px_rgba(124,58,237,0.13)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-400 focus-visible:ring-offset-2"
      aria-label={`${listing.archived ? "Archived " : ""}${name} listing`}
    >
      <div className="relative w-2/5 min-w-32 overflow-hidden rounded-lg bg-gray-100 sm:w-52">
        {property?.photoUrls?.length ? (
          <Image src={imageSrc} alt="" fill sizes="208px" className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" onError={() => setImageSrc("/placeholder.jpg")} />
        ) : (
          <div className="flex h-full min-h-32 items-center justify-center px-3 text-center text-xs text-gray-500">Images to be added</div>
        )}
        {property && property.photoUrls.length > 1 && (
          <span className="absolute bottom-2 right-2 rounded-full bg-white/90 px-2 py-1 text-xs text-gray-700">+{property.photoUrls.length - 1}</span>
        )}
      </div>

      <div className="min-w-0 flex-1 px-4 py-1 pr-10">
        <div className="mb-2 flex flex-wrap gap-2">
          <StatusBadge tone={isProperty ? "active" : "pending"}>{isProperty ? "Active" : "Pending"}</StatusBadge>
          {listing.archived && <StatusBadge tone="archive">Archive</StatusBadge>}
        </div>
        <h2 className="truncate text-xl font-semibold text-gray-950">{name}</h2>
        <p className="mt-1 flex items-center gap-1.5 truncate text-sm text-gray-500">
          <MapPin className="h-4 w-4 shrink-0" />
          {address || "Address details are not complete"}
        </p>
        {property ? (
          <p className="mt-5 flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <span>${Number(property.pricePerMonth).toFixed(0)}/Month</span><span>•</span>
            <span>{property.baths} Bath</span><span>•</span><span>{property.beds} Bed</span><span>•</span>
            <span>{property.squareFeet} sq.ft.</span>
          </p>
        ) : (
          <p className="mt-5 text-sm text-gray-500">Saved {new Date(draft!.updatedAt).toLocaleDateString()}</p>
        )}
      </div>

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild onClick={stop}>
          <button type="button" className="absolute right-3 top-3 rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-secondary-600" aria-label={`Actions for ${name}`}>
            <EllipsisVertical className="h-5 w-5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white" onClick={stop}>
          <DropdownMenuItem onSelect={() => router.push(isProperty ? `/managers/properties/${property!.id}/edit` : href)} className="gap-2">
            <Pencil className="h-4 w-4" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => afterMenuCloses(listing.archived ? onUnarchive : onArchive)} className="gap-2">
            {listing.archived ? <RotateCcw className="h-4 w-4" /> : <Archive className="h-4 w-4" />}
            {listing.archived ? "Unarchive" : "Archive"}
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => afterMenuCloses(onDelete)} className="gap-2 text-red-600 focus:text-red-700">
            <Trash2 className="h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </article>
  );
};

export default ManagerListingCard;
export type { Listing as ManagerListing };
