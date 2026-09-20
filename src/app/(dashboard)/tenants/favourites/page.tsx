"use client";

import CardCompact from "@/components/CardCompact";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import {
  useGetAuthUserQuery,
  useGetFavoritePropertiesQuery,
  useRemoveFavoritePropertyMutation,
} from "@/state/api";
import React from "react";
import Link from "next/link";
import EmptyState from "@/components/EmptyState";

const Favorites = () => {
  const { data: authUser } = useGetAuthUserQuery();
  const {
    data: favoriteProperties,
    isLoading,
    error,
  } = useGetFavoritePropertiesQuery(undefined, { skip: !authUser });
  const [removeFavorite] = useRemoveFavoritePropertyMutation();

  const handleRemoveFavorite = async (propertyId: number) => {
    if (!authUser?.authInfo?.userId) return;
    await removeFavorite({ userId: authUser.authInfo.userId, propertyId });
  };

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading favourites</div>;

  return (
    <div className="dashboard-container min-h-full bg-white">
      <div>
        <Header
          title="Favourites"
          subtitle="Browse and manage your saved property listings"
        />
      </div>
      {favoriteProperties && favoriteProperties.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-x-6 xl:grid-cols-2">
          {favoriteProperties.map((property) => (
            <CardCompact
              key={property.id}
              property={property}
              isFavorite={true}
              onFavoriteToggle={() => void handleRemoveFavorite(property.id)}
              showFavoriteButton
              propertyLink={`/search/${property.id}`}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          message="No listings have been added to favourites"
          action={
          <Button asChild className="mt-4 bg-secondary-500 text-white hover:bg-secondary-600">
            <Link href="/search">Browse Listings</Link>
          </Button>
          }
        />
      )}
    </div>
  );
};

export default Favorites;
