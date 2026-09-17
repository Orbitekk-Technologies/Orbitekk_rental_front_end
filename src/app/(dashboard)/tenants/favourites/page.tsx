"use client";

import Card from "@/components/Card";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import {
  useGetAuthUserQuery,
  useGetFavoritePropertiesQuery,
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

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading favourites</div>;

  return (
    <div className="dashboard-container">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <Header
          title="Favourites"
          subtitle="Browse and manage your saved property listings"
        />
        <Button asChild className="shrink-0 bg-primary-700 text-white hover:bg-primary-600">
          <Link href="/search">Search properties</Link>
        </Button>
      </div>
      {favoriteProperties && favoriteProperties.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {favoriteProperties.map((property) => (
            <Card
              key={property.id}
              property={property}
              isFavorite={true}
              onFavoriteToggle={() => {}}
              showFavoriteButton={false}
              propertyLink={`/search/${property.id}`}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          message="No listings have been added to favourites"
          action={
          <Button asChild className="mt-4 bg-primary-700 text-white hover:bg-primary-600">
            <Link href="/search">Search properties</Link>
          </Button>
          }
        />
      )}
    </div>
  );
};

export default Favorites;
