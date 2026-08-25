import { AmenityIcons, HighlightIcons } from "@/lib/constants";
import { formatEnumString } from "@/lib/utils";
import { useGetPropertyQuery } from "@/state/api";
import { HelpCircle } from "lucide-react";
import React from "react";

const FeeRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex items-start justify-between gap-4 border-t border-primary-100 py-3 text-sm first:border-t-0">
    <span className="text-primary-700">{label}</span>
    <span className="text-right font-medium text-primary-900">{value}</span>
  </div>
);

const PropertyDetails = ({ propertyId }: PropertyDetailsProps) => {
  const {
    data: property,
    isError,
    isLoading,
  } = useGetPropertyQuery(propertyId);

  if (isLoading) return <>Loading...</>;
  if (isError || !property) {
    return <>Property not Found</>;
  }

  return (
    <div className="mb-6">
      {/* Amenities */}
      <div>
        <h2 className="text-xl font-semibold my-3">Property Amenities</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {property.amenities.length ? property.amenities.map((amenity: AmenityEnum) => {
            const Icon = AmenityIcons[amenity as AmenityEnum] || HelpCircle;
            return (
              <div
                key={amenity}
                className="flex flex-col items-center border rounded-xl py-8 px-4"
              >
                <Icon className="w-8 h-8 mb-2 text-gray-700" />
                <span className="text-sm text-center text-gray-700">
                  {formatEnumString(amenity)}
                </span>
              </div>
            );
          }) : (
            <p className="text-sm text-gray-500 sm:col-span-2 md:col-span-3 lg:col-span-4">
              No property amenities have been listed.
            </p>
          )}
        </div>
      </div>

      {/* Highlights */}
      <div className="mt-12 mb-16">
        <h3 className="text-xl font-semibold text-primary-800 dark:text-primary-100">
          Highlights
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-4 w-full">
          {property.highlights.length ? property.highlights.map((highlight: HighlightEnum) => {
            const Icon =
              HighlightIcons[highlight as HighlightEnum] || HelpCircle;
            return (
              <div
                key={highlight}
                className="flex flex-col items-center border rounded-xl py-8 px-4"
              >
                <Icon className="w-8 h-8 mb-2 text-primary-600 dark:text-primary-300" />
                <span className="text-sm text-center text-primary-600 dark:text-primary-300">
                  {formatEnumString(highlight)}
                </span>
              </div>
            );
          }) : (
            <p className="text-sm text-gray-500 sm:col-span-2 md:col-span-3 lg:col-span-4">
              No property highlights have been listed.
            </p>
          )}
        </div>
      </div>

      {/* Fees */}
      <div className="mb-8">
        <h3 className="mb-3 text-xl font-semibold text-primary-800 dark:text-primary-100">
          Fees
        </h3>
        <p className="text-sm text-primary-600 dark:text-primary-300 mt-2">
          The fees below are based on community-supplied data and may exclude
          additional fees and utilities.
        </p>
        <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
          <section className="rounded-xl border border-primary-200 bg-white p-5 shadow-sm dark:bg-primary-900">
            <h4 className="mb-3 font-semibold text-primary-900 dark:text-primary-50">Required Fees</h4>
            <FeeRow label="Application fee" value={`$${property.applicationFee.toLocaleString()}`} />
            <FeeRow label="Security deposit" value={`$${property.securityDeposit.toLocaleString()}`} />
          </section>
          <section className="rounded-xl border border-primary-200 bg-white p-5 shadow-sm dark:bg-primary-900">
            <h4 className="mb-3 font-semibold text-primary-900 dark:text-primary-50">Pet Fees</h4>
            <FeeRow label="Pets allowed" value={property.isPetsAllowed ? "Yes" : "No"} />
            <FeeRow label="Number allowed" value="NA" />
            <FeeRow label="Monthly pet rent" value="NA" />
          </section>
          <section className="rounded-xl border border-primary-200 bg-white p-5 shadow-sm dark:bg-primary-900">
            <h4 className="mb-3 font-semibold text-primary-900 dark:text-primary-50">Parking Fees</h4>
            <FeeRow label="Parking included" value={property.isParkingIncluded ? "Yes" : "No"} />
            <FeeRow label="Monthly parking fee" value="NA" />
          </section>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
