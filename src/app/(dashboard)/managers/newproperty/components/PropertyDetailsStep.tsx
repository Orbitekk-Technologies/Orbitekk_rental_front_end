"use client";

import { CustomFormField } from "@/components/FormField";
import { PropertyTypeEnum } from "@/lib/constants";
import type { PropertyFormData } from "@/lib/schemas";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

const PropertyDetailsStep = () => {
  const form = useFormContext<PropertyFormData>();
  const { setValue } = form;
  const stayType = form.watch("stayType");
  const isPrivateRoom = stayType === "PayingGuest";

  useEffect(() => {
    if (!isPrivateRoom) return;

    // Frontend-only release rule. Previously these fields remained editable
    // for every stay type; remove this effect and the disabled props below to
    // restore that behavior. Backend validation intentionally remains unchanged.
    setValue("beds", 1, { shouldDirty: true, shouldValidate: true });
    setValue("baths", 1, { shouldDirty: true, shouldValidate: true });
  }, [isPrivateRoom, setValue]);

  return (
    <div className="space-y-7">
      <section className="space-y-5">
        <h3 className="text-sm font-semibold text-gray-900">Fees</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <CustomFormField
            name="pricePerMonth"
            label="Price per Month"
            type="number"
          />
          <CustomFormField
            name="securityDeposit"
            label="Security Deposit"
            type="number"
          />
        </div>
      </section>

      <div className="border-t border-gray-200" />

      <section className="space-y-5">
        <h3 className="text-sm font-semibold text-gray-900">
          Property Details
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <CustomFormField
            name="beds"
            label="Number of Beds"
            type="number"
            disabled={isPrivateRoom}
          />
          <CustomFormField
            name="squareFeet"
            label="Square Feet"
            type="number"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <CustomFormField
            name="baths"
            label="Number of Baths"
            type="number"
            disabled={isPrivateRoom}
          />
        </div>
        {isPrivateRoom && (
          <p className="text-sm text-amber-700">
            Private Room listings are fixed at 1 bed and 1 bath. To add more
            beds or baths, select Whole Unit as the stay type.
          </p>
        )}
        {stayType === "PayingGuest" && (
          <CustomFormField
            name="bathType"
            label="Bath Type"
            type="radio"
            options={[
              { value: "Private", label: "Private" },
              { value: "SharedBath", label: "Shared" },
            ]}
          />
        )}

        <div className="space-y-4">
          <section className="space-y-4">
            <CustomFormField
              name="isPetsAllowed"
              label="Pets"
              type="radio"
              options={[
                { value: "true", label: "Allowed" },
                { value: "false", label: "Not Allowed" },
              ]}
            />
            {form.watch("isPetsAllowed") && (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <CustomFormField name="petCount" label="Number of Pets (Optional)" type="number" />
                <CustomFormField name="petFee" label="Pet Price (Optional)" type="number" />
              </div>
            )}
          </section>

          <div className="border-t border-gray-200" />

          <section className="space-y-4">
            <CustomFormField
              name="isParkingIncluded"
              label="Parking"
              type="radio"
              options={[
                { value: "true", label: "Included" },
                { value: "false", label: "Not included" },
              ]}
            />
            {form.watch("isParkingIncluded") && (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <CustomFormField name="parkingFee" label="Parking Price (Optional)" type="number" />
              </div>
            )}
          </section>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <CustomFormField
            name="propertyType"
            label="Property Type"
            type="select"
            options={[
              { value: PropertyTypeEnum.Apartment, label: "Apartment" },
              { value: PropertyTypeEnum.Townhouse, label: "Town House" },
              {
                value: PropertyTypeEnum.SingleFamilyHome,
                label: "Single Family Home",
              },
            ]}
          />
        </div>
      </section>
    </div>
  );
};

export default PropertyDetailsStep;
