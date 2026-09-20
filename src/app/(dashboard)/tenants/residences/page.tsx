"use client";

import ResidenceListingCard from "@/components/ResidenceListingCard";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import {
  useGetAuthUserQuery,
  useGetCurrentResidencesQuery,
} from "@/state/api";
import React from "react";
import Link from "next/link";
import EmptyState from "@/components/EmptyState";
import { Button } from "@/components/ui/button";

const Residences = () => {
  const { data: authUser } = useGetAuthUserQuery();
  const {
    data: currentResidences,
    isLoading,
    error,
  } = useGetCurrentResidencesQuery(authUser?.authInfo?.userId || "", {
    skip: !authUser?.authInfo?.userId,
  });

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading current residences</div>;

  return (
    <div className="dashboard-container min-h-full bg-white">
      <Header
        title="Residencies"
        subtitle="View and manage your current living spaces"
      />
      <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
        {currentResidences?.map((property) => (
          <ResidenceListingCard key={property.id} property={property} />
        ))}
      </div>
      {(!currentResidences || currentResidences.length === 0) && (
        <EmptyState
          message="You didn’t have any residences to Join or Enroll"
          action={
            <Button
              asChild
              className="mt-4 bg-secondary-500 text-white hover:bg-secondary-600"
            >
              <Link href="/search">Browse Listings</Link>
            </Button>
          }
        />
      )}
    </div>
  );
};

export default Residences;
