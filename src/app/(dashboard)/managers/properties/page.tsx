"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import ManagerListingCard, { type ManagerListing } from "@/components/ManagerListingCard";
import {
  deletePropertyDraft,
  getPropertyDrafts,
  PROPERTY_STORAGE_UPDATED_EVENT,
  setPropertyDraftArchived,
  type PropertyDraft,
} from "@/lib/propertyDraftStorage";
import {
  useArchivePropertyMutation,
  useDeletePropertyMutation,
  useGetAuthUserQuery,
  useGetManagerPropertiesQuery,
  useUnarchivePropertyMutation,
} from "@/state/api";
import EmptyState from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Archive, RotateCcw, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Action = { kind: "archive" | "unarchive" | "delete" | "archived-open"; listing: ManagerListing } | null;

const Properties = () => {
  const { data: authUser } = useGetAuthUserQuery();
  const userId = authUser?.authInfo?.userId || "";
  const [drafts, setDrafts] = useState<PropertyDraft[]>([]);
  const [tab, setTab] = useState<"active" | "archive">("active");
  const [action, setAction] = useState<Action>(null);
  const [archivedOverrides, setArchivedOverrides] = useState<Record<number, boolean>>({});
  const [deletedPropertyIds, setDeletedPropertyIds] = useState<Set<number>>(() => new Set());
  const { data: managerProperties, isLoading, error } = useGetManagerPropertiesQuery(userId, { skip: !userId });
  const [archiveProperty, archiveState] = useArchivePropertyMutation();
  const [unarchiveProperty, unarchiveState] = useUnarchivePropertyMutation();
  const [deleteProperty, deleteState] = useDeletePropertyMutation();

  const refreshDrafts = useCallback(() => {
    if (userId) setDrafts(getPropertyDrafts(userId));
  }, [userId]);

  useEffect(() => {
    refreshDrafts();
    window.addEventListener(PROPERTY_STORAGE_UPDATED_EVENT, refreshDrafts);
    window.addEventListener("storage", refreshDrafts);
    return () => {
      window.removeEventListener(PROPERTY_STORAGE_UPDATED_EVENT, refreshDrafts);
      window.removeEventListener("storage", refreshDrafts);
    };
  }, [refreshDrafts]);

  const listings = useMemo<ManagerListing[]>(() => [
    ...(managerProperties ?? []).filter((property) => !deletedPropertyIds.has(property.id)).map((property) => ({
      kind: "property" as const,
      property,
      archived: archivedOverrides[property.id] ?? property.status === "ARCHIVED",
    })),
    ...drafts.map((draft) => ({ kind: "draft" as const, draft, archived: Boolean(draft.isArchived) })),
  ], [archivedOverrides, deletedPropertyIds, drafts, managerProperties]);
  const visibleListings = listings.filter((listing) => listing.archived === (tab === "archive"));
  const isMutating = archiveState.isLoading || unarchiveState.isLoading || deleteState.isLoading;

  const archive = async (listing: ManagerListing) => {
    try {
      if (listing.kind === "property") {
        await archiveProperty(listing.property.id).unwrap();
        setArchivedOverrides((current) => ({ ...current, [listing.property.id]: true }));
      } else setPropertyDraftArchived(userId, listing.draft.id, true);
      setAction(null);
      toast.success("Listing archived.");
    } catch {
      toast.error("Unable to archive this listing.");
    }
  };

  const unarchive = async (listing: ManagerListing) => {
    try {
      if (listing.kind === "property") {
        await unarchiveProperty(listing.property.id).unwrap();
        setArchivedOverrides((current) => ({ ...current, [listing.property.id]: false }));
      } else setPropertyDraftArchived(userId, listing.draft.id, false);
      setAction(null);
      toast.success("Listing moved back to Active.");
    } catch {
      toast.error("Unable to unarchive this listing.");
    }
  };

  const remove = async (listing: ManagerListing) => {
    try {
      if (listing.kind === "property") {
        await deleteProperty(listing.property.id).unwrap();
        setDeletedPropertyIds((current) => new Set(current).add(listing.property.id));
      } else deletePropertyDraft(userId, listing.draft.id);
      setAction(null);
      toast.success("Listing deleted.");
    } catch {
      toast.error("Unable to delete this listing.");
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <div className="dashboard-container">Error loading manager properties</div>;

  return (
    <div className="dashboard-container min-h-full bg-white">
      <Header title="Listings" subtitle="View and manage your property listings" />

      <div className="mt-8 grid grid-cols-2 border-b border-gray-300" role="tablist" aria-label="Listing status">
        {(["active", "archive"] as const).map((value) => (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={tab === value}
            onClick={() => setTab(value)}
            className={cn(
              "relative pb-3 text-base font-medium capitalize text-gray-700 transition-colors hover:text-secondary-600",
              tab === value && "text-gray-950 after:absolute after:inset-x-0 after:-bottom-px after:h-1 after:bg-secondary-500"
            )}
          >
            {value}
          </button>
        ))}
      </div>

      {visibleListings.length ? (
        <div className="mt-7 grid grid-cols-1 gap-6 xl:grid-cols-2">
          {visibleListings.map((listing) => {
            const key = listing.kind === "property" ? `property-${listing.property.id}` : `draft-${listing.draft.id}`;
            return (
              <ManagerListingCard
                key={key}
                listing={listing}
                onArchive={() => setAction({ kind: "archive", listing })}
                onUnarchive={() => setAction({ kind: "unarchive", listing })}
                onDelete={() => setAction({ kind: "delete", listing })}
                onArchivedOpen={() => setAction({ kind: "archived-open", listing })}
              />
            );
          })}
        </div>
      ) : (
        <EmptyState message={tab === "active" ? "No active or pending listings" : "No archived listings"} />
      )}

      <Dialog open={Boolean(action)} onOpenChange={(open) => { if (!open && !isMutating) setAction(null); }}>
        <DialogContent className="bg-white sm:max-w-md">
          {action && (
            <>
              <DialogHeader className="items-center text-center sm:text-center">
                <span className={cn(
                  "mb-2 flex h-12 w-12 items-center justify-center rounded-full",
                  action.kind === "delete" ? "bg-red-50 text-red-600" : "bg-secondary-50 text-secondary-600"
                )}>
                  {action.kind === "delete" ? <Trash2 className="h-5 w-5" /> : action.kind === "archive" ? <Archive className="h-5 w-5" /> : <RotateCcw className="h-5 w-5" />}
                </span>
                <DialogTitle>
                  {action.kind === "delete" ? "Delete Listing" : action.kind === "archive" ? "Archive Listing" : "Unarchive Listing"}
                </DialogTitle>
                <DialogDescription className="text-center">
                  {action.kind === "delete" && "Are you sure you want to delete this listing? This removes it from your listings."}
                  {action.kind === "archive" && "Archive this listing? It will stop appearing publicly until you unarchive it."}
                  {action.kind === "unarchive" && "This listing will return to Active with its previous Active or Pending state."}
                  {action.kind === "archived-open" && "Archived listings cannot be viewed. Unarchive this listing to open it again."}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="mt-3 gap-2 sm:justify-center sm:space-x-0">
                {action.kind === "delete" ? (
                  <>
                    <Button variant="outline" disabled={isMutating} onClick={() => void remove(action.listing)}>Delete</Button>
                    {!action.listing.archived && <Button className="bg-secondary-500 text-white hover:bg-secondary-600" disabled={isMutating} onClick={() => void archive(action.listing)}>Archive instead</Button>}
                  </>
                ) : action.kind === "archive" ? (
                  <Button className="bg-secondary-500 text-white hover:bg-secondary-600" disabled={isMutating} onClick={() => void archive(action.listing)}>Archive</Button>
                ) : (
                  <Button className="bg-secondary-500 text-white hover:bg-secondary-600" disabled={isMutating} onClick={() => void unarchive(action.listing)}>Unarchive</Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Properties;
