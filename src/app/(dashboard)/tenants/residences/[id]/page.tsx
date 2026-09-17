"use client";

import Loading from "@/components/Loading";
// Temporarily hidden while the payment-method and billing layouts are reworked.
// import PaymentMethodSection from "./PaymentMethodSection";
/* import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; */
import {
  useGetAuthUserQuery,
  useGetLeasesQuery,
  useGetPropertyQuery,
} from "@/state/api";
import { Lease, Property } from "@/types/prismaTypes";
import { Download, MapPin, User } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { getAccessToken } from "@/lib/authToken";
import Image from "next/image";

const ResidenceCard = ({
  property,
  currentLease,
}: {
  property: Property;
  currentLease: Lease;
}) => {
  const downloadLease = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080/api/v1/"}leases/${currentLease.id}/document`, {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    });
    if (!response.ok) return toast.error("No lease document is available.");
    const disposition = response.headers.get("content-disposition") || "";
    const fileName = disposition.match(/filename\*?=(?:UTF-8'')?\"?([^\";]+)/i)?.[1] || "lease.pdf";
    const url = URL.createObjectURL(await response.blob());
    const anchor = document.createElement("a");
    anchor.href = url; anchor.download = decodeURIComponent(fileName); anchor.click();
    URL.revokeObjectURL(url);
  };
  return (
    <section className="min-h-[410px] flex-1 overflow-hidden rounded-2xl bg-white p-5 shadow-md sm:p-7">
      {/* Header */}
      <div className="flex flex-col gap-5 sm:flex-row">
        {property.photoUrls?.[0] ? (
          <div className="relative h-32 w-full overflow-hidden rounded-xl sm:w-60">
            <Image
              src={property.photoUrls[0]}
              alt={property.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 240px"
            />
          </div>
        ) : (
          <div className="h-32 w-full rounded-xl bg-slate-500 sm:w-60" />
        )}

        <div className="flex flex-col justify-between">
          <div>
            <div className="w-fit rounded-full bg-green-500 px-4 py-1 text-sm font-semibold text-white">
              {currentLease.status || "Active"} Lease
            </div>

            <h2 className="text-2xl font-bold my-2">{property.name}</h2>
            <div className="flex items-center mb-2">
              <MapPin className="w-5 h-5 mr-1" />
              <span>
                {property.location.city}, {property.location.country}
              </span>
            </div>
          </div>
          <div className="text-xl font-bold">
            ${currentLease.rent}{" "}
            <span className="text-sm font-normal text-gray-500">/ month</span>
          </div>
        </div>
      </div>
      {/* Dates */}
      <div>
        <hr className="my-4" />
        <div className="grid gap-4 sm:grid-cols-3 sm:divide-x sm:divide-gray-200">
          <div className="xl:flex">
            <div className="text-gray-500 mr-2">Start Date: </div>
            <div className="font-semibold">
              {new Date(currentLease.startDate).toLocaleDateString()}
            </div>
          </div>
          <div className="xl:flex sm:justify-center">
            <div className="text-gray-500 mr-2">End Date: </div>
            <div className="font-semibold">
              {new Date(currentLease.endDate).toLocaleDateString()}
            </div>
          </div>
          <div className="xl:flex sm:justify-end">
            <div className="text-gray-500 mr-2">Next Payment: </div>
            <div className="font-semibold">
              {new Date(currentLease.endDate).toLocaleDateString()}
            </div>
          </div>
        </div>
        <hr className="my-4" />
      </div>
      {/* Buttons */}
      <div className="flex w-full flex-col justify-end gap-2 sm:flex-row">
        <button
          onClick={() => toast.info("No document available.")}
          className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md flex items-center justify-center hover:bg-primary-700 hover:text-primary-50"
        >
          <User className="w-5 h-5 mr-2" />
          Manager
        </button>
        <button onClick={downloadLease} className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md flex items-center justify-center hover:bg-primary-700 hover:text-primary-50">
          <Download className="w-5 h-5 mr-2" />
          Download Agreement
        </button>
      </div>
    </section>
  );
};

// BillingHistory is temporarily removed from rendering while its layout is reworked.

const Residence = () => {
  const { id } = useParams();
  const { data: authUser } = useGetAuthUserQuery();
  const {
    data: property,
    isLoading: propertyLoading,
    error: propertyError,
  } = useGetPropertyQuery(Number(id));

  const { data: leases, isLoading: leasesLoading } = useGetLeasesQuery(
    "tenant",
    { skip: !authUser?.authInfo?.userId }
  );
  if (propertyLoading || leasesLoading) return <Loading />;
  if (!property || propertyError) return <div>Error loading property</div>;

  const currentLease = leases?.find(
    (lease) => lease.propertyId === property.id
  );

  return (
    <div className="dashboard-container pt-7">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex gap-10">
          {currentLease && (
            <ResidenceCard property={property} currentLease={currentLease} />
          )}
          {/* Temporarily hidden while this section is redesigned.
          {authUser?.authInfo.userId && (
            <PaymentMethodSection userId={authUser.authInfo.userId} />
          )} */}
        </div>
        {/* Temporarily hidden while this section is redesigned.
        <BillingHistory payments={payments || []} /> */}
      </div>
    </div>
  );
};

export default Residence;
