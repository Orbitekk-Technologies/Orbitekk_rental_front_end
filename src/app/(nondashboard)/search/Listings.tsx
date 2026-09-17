import {
  useAddFavoritePropertyMutation,
  useGetAuthUserQuery,
  useSearchPropertiesQuery,
  useGetTenantQuery,
  useRemoveFavoritePropertyMutation,
} from "@/state/api";
import { useAppSelector } from "@/state/redux";
import { Property } from "@/types/prismaTypes";
import React from "react";
import CardCompact from "@/components/CardCompact";
import { useAuth } from "@/app/(auth)/authProvider";
import EmptyState from "@/components/EmptyState";
import { useRouter } from "next/navigation";

const Listings = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { data: authUser } = useGetAuthUserQuery(undefined, { skip: !user });
  const { data: tenant } = useGetTenantQuery(
    authUser?.authInfo?.userId || "",
    {
      skip: !authUser?.authInfo?.userId,
    }
  );
  const [addFavorite] = useAddFavoritePropertyMutation();
  const [removeFavorite] = useRemoveFavoritePropertyMutation();
  const filters = useAppSelector((state) => state.global.filters);

  const {
    data: result,
    isLoading,
    isError,
  } = useSearchPropertiesQuery(filters);

  const handleFavoriteToggle = async (propertyId: number) => {
    if (!authUser) {
      router.push("/signin?returnTo=%2Fsearch");
      return;
    }

    const isFavorite = tenant?.favorites?.some(
      (fav: Property) => fav.id === propertyId
    );

    if (isFavorite) {
      await removeFavorite({
        userId: authUser.authInfo.userId,
        propertyId,
      });
    } else {
      await addFavorite({
        userId: authUser.authInfo.userId,
        propertyId,
      });
    }
  };

  if (isLoading) return <>Loading...</>;

  if (isError || !result || result.properties.length === 0) {
    return (
      <EmptyState
        message={filters.location
          ? `No published properties are currently available near ${filters.location}. Try another location or check back soon.`
          : "No published properties are currently available. Check back soon."}
        className="min-h-full"
      />
    );
  }

  return (
    <div className="w-full">
      <header className="px-4 pt-4 md:pt-0">
        <p className="text-base font-medium text-secondary-500">{result.totalResults} +</p>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-950">
          {filters.location ? `Results in ${filters.city || filters.location}` : "Rental Results"}
        </h2>
        {result.matchType !== "ALL" && result.matchType !== "NEARBY" && (
          <p className="mt-1 text-sm text-gray-500">
            {matchDescription(result.matchType, filters.location, filters.city, filters.state)}
          </p>
        )}
      </header>
      <div className="flex">
        <div className="w-full p-4">
          {result.properties.map((property) => (
            <CardCompact
                key={property.id}
                property={property}
                isFavorite={
                  tenant?.favorites?.some(
                    (fav: Property) => fav.id === property.id
                  ) || false
                }
                onFavoriteToggle={() => handleFavoriteToggle(property.id)}
                showFavoriteButton
                propertyLink={`/search/${property.id}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const matchDescription = (matchType: string, location: string, city?: string, state?: string) => {
  if (matchType === "CITY") return `Places in ${city || location}`;
  if (matchType === "STATE") return `No nearby matches — showing places in ${state || location}`;
  if (matchType === "RADIUS_EXPANDED") return `Places in the wider ${location} area`;
  return `Places near ${location}`;
};

export default Listings;
