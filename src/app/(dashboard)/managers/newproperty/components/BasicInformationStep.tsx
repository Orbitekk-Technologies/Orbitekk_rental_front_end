"use client";

import { CustomFormField } from "@/components/FormField";
import PropertyAddressFields from "./PropertyAddressFields";

const BasicInformationStep = () => {
  return (
    <div className="space-y-7">
      <section className="space-y-5">
        <CustomFormField
          name="name"
          label="Property Name"
          placeholder="Enter the property name"
        />
        <CustomFormField
          name="description"
          label="Description"
          type="textarea"
          placeholder="Describe the property, neighborhood, and key features"
          inputClassName="min-h-40"
          maxLength={500}
        />
      </section>

      <div className="border-t border-gray-200" />

      <section className="space-y-5">
        <h3 className="text-base font-semibold text-gray-950">
          Property Information
        </h3>
        <CustomFormField
          name="stayType"
          label="Stay Type"
          type="select"
          placeholder="Select a stay type"
          options={[
            { value: "PayingGuest", label: "Paying Guest/Private Room" },
            { value: "WholeUnit", label: "Whole Unit" },
          ]}
        />
        <PropertyAddressFields />
      </section>
    </div>
  );
};

export default BasicInformationStep;
