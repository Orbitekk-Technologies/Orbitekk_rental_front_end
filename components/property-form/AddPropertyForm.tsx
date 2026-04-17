"use client";

import { useMemo, useState } from "react";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import PropertySection from "@/components/property-form/PropertySection";
import PropertyImageUploader from "@/components/property-form/PropertyImageUploader";
import PropertyPlanSelector from "@/components/property-form/PropertyPlanSelector";

type Amenity =
  | "ac"
  | "refrigerator"
  | "dishwasher"
  | "parking"
  | "balcony"
  | "laundry";

type FoodType = "veg" | "non-veg" | "no-preference";
type Plan = "basic" | "premium" | "elite";
type PaymentType = "credit-card" | "banking" | "wallet";

type UploadFile = {
  id: number;
  name: string;
  preview: string;
  progress: number;
};

const dayOptions = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-2 block text-[13px] font-medium text-[var(--muted)]">
      {children}
    </label>
  );
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`h-12 w-full rounded-[10px] border border-[var(--border)] bg-white px-4 text-[14px] outline-none placeholder:text-[var(--muted-2)] ${props.className ?? ""}`}
    />
  );
}

function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`min-h-[110px] w-full rounded-[10px] border border-[var(--border)] bg-white px-4 py-3 text-[14px] outline-none placeholder:text-[var(--muted-2)] ${props.className ?? ""}`}
    />
  );
}

function SelectInput({
  value,
  className,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className={`relative ${className ?? ""}`}>
      <select
        {...props}
        value={value}
        className="h-12 w-full appearance-none rounded-[10px] border border-[var(--border)] bg-white px-4 pr-10 text-[14px] outline-none"
      />
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)]">
        <KeyboardArrowDownRoundedIcon fontSize="small" />
      </span>
    </div>
  );
}

export default function AddPropertyForm() {
  const [selectedAmenities, setSelectedAmenities] = useState<Amenity[]>(["ac"]);
  const [foodType, setFoodType] = useState<FoodType>("veg");
  const [smokingAllowed, setSmokingAllowed] = useState(true);
  const [petsAllowed, setPetsAllowed] = useState(true);
  const [selectedDays, setSelectedDays] = useState<string[]>(["Sun", "Fri"]);
  const [selectedPlan, setSelectedPlan] = useState<Plan>("basic");
  const [paymentType, setPaymentType] = useState<PaymentType>("credit-card");
  const [sameAsListingAddress, setSameAsListingAddress] = useState(true);

  const [files, setFiles] = useState<UploadFile[]>([
    {
      id: 1,
      name: "Image 03.png",
      preview: "/images/properties/p1.png",
      progress: 100,
    },
    {
      id: 2,
      name: "Image 03.png",
      preview: "/images/properties/p2.png",
      progress: 50,
    },
    {
      id: 3,
      name: "Image 03.png",
      preview: "/images/properties/p3.png",
      progress: 50,
    },
  ]);

  const toggleAmenity = (value: Amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((item) => item !== day) : [...prev, day]
    );
  };

  const nextId = useMemo(
    () => (files.length ? Math.max(...files.map((file) => file.id)) + 1 : 1),
    [files]
  );

  const handleAddFiles = (incoming: FileList | null) => {
    if (!incoming) return;

    const remainingSlots = Math.max(0, 10 - files.length);
    const picked = Array.from(incoming).slice(0, remainingSlots);

    const mapped = picked.map((file, index) => ({
      id: nextId + index,
      name: file.name,
      preview: URL.createObjectURL(file),
      progress: 100,
    }));

    setFiles((prev) => [...prev, ...mapped]);
  };

  const handleRemoveFile = (id: number) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="text-[14px] uppercase tracking-[0.08em] text-[var(--muted)]">
          Listings &gt; Properties
        </p>
        <h1 className="mt-2 text-[30px] font-semibold tracking-[-0.02em]">
          Add Property Information
        </h1>
        <p className="mt-1 text-[14px] text-[var(--muted)]">
          Creating a new property listing with detailed information
        </p>
      </div>

      <PropertySection title="Basic Information">
        <div className="space-y-5">
          <div>
            <Label>Property Title</Label>
            <TextInput placeholder="Enter Property Name To Be Displayed" />
          </div>

          <div className="max-w-[420px]">
            <Label>Type</Label>
            <SelectInput defaultValue="full-house">
              <option value="full-house">Full-House</option>
              <option value="apartment">Apartment</option>
              <option value="studio">Studio</option>
              <option value="townhouse">Townhouse</option>
            </SelectInput>
          </div>

          <div>
            <Label>Description</Label>
            <TextArea placeholder="Write About 250 Words For Better Visibility To Tenents" />
          </div>
        </div>
      </PropertySection>

      <PropertySection title="Fees">
        <div className="grid gap-5 md:grid-cols-3">
          <div>
            <Label>Price Per Month</Label>
            <TextInput placeholder="Enter Amount" />
          </div>

          <div>
            <Label>Security Deposit</Label>
            <TextInput placeholder="Enter Amount" />
          </div>

          <div>
            <Label>Security Deposit</Label>
            <TextInput placeholder="Enter Amount" />
          </div>
        </div>
      </PropertySection>

      <PropertySection title="Property Details">
        <div className="space-y-5">
          <div className="grid gap-5 md:grid-cols-3">
            <div>
              <Label>Number of Beds</Label>
              <TextInput placeholder="Enter Number" />
            </div>

            <div>
              <Label>Number of Baths</Label>
              <TextInput placeholder="Enter Number" />
            </div>

            <div>
              <Label>Square Feet</Label>
              <TextInput placeholder="Enter Number" />
            </div>
          </div>

          <div className="max-w-[640px]">
            <Label>Property Type</Label>
            <SelectInput defaultValue="">
              <option value="" disabled>
                Select Type
              </option>
              <option value="entire-home">Entire home</option>
              <option value="private-room">Private room</option>
              <option value="shared-room">Shared room</option>
            </SelectInput>
          </div>
        </div>
      </PropertySection>

      <PropertySection title="Amenities and Highlights">
        <div className="space-y-6">
          <div>
            <Label>Aminities</Label>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
              {[
                ["ac", "Ac & Heating"],
                ["refrigerator", "Refrigerator"],
                ["dishwasher", "Dishwasher"],
                ["parking", "Parking"],
                ["balcony", "Balcony"],
                ["laundry", "Laundry"],
              ].map(([value, label]) => (
                <label key={value} className="flex items-center gap-2 text-[14px]">
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes(value as Amenity)}
                    onChange={() => toggleAmenity(value as Amenity)}
                    className="h-4 w-4 accent-[var(--brand)]"
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <Label>Food Type</Label>
              <div className="flex flex-wrap gap-5">
                {[
                  ["veg", "Veg"],
                  ["non-veg", "Non-Veg"],
                  ["no-preference", "No Preference"],
                ].map(([value, label]) => (
                  <label key={value} className="flex items-center gap-2 text-[14px]">
                    <input
                      type="radio"
                      name="foodType"
                      checked={foodType === value}
                      onChange={() => setFoodType(value as FoodType)}
                      className="h-4 w-4 accent-[var(--brand)]"
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <Label>Smoking</Label>
              <label className="flex items-center gap-3 text-[14px]">
                <input
                  type="checkbox"
                  checked={smokingAllowed}
                  onChange={() => setSmokingAllowed((prev) => !prev)}
                  className="h-4 w-4 accent-[var(--brand)]"
                />
                <span>{smokingAllowed ? "Allowed" : "Not Allowed"}</span>
              </label>
            </div>
          </div>

          <div className="border-t border-[var(--border)] pt-5">
            <div className="grid gap-5 md:grid-cols-[160px_1fr]">
              <div>
                <Label>Pets</Label>
                <label className="flex items-center gap-3 text-[14px]">
                  <input
                    type="checkbox"
                    checked={petsAllowed}
                    onChange={() => setPetsAllowed((prev) => !prev)}
                    className="h-4 w-4 accent-[var(--brand)]"
                  />
                  <span>{petsAllowed ? "Allowed" : "Not Allowed"}</span>
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-[180px_1fr]">
                <div>
                  <Label>Fees (Optional)</Label>
                  <TextInput placeholder="Enter Pet Fees" />
                </div>
                <div>
                  <Label>Instructions (Optional)</Label>
                  <TextInput placeholder="Description to add if any" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </PropertySection>

      <PropertySection title="Property Images">
        <PropertyImageUploader
          files={files}
          onAddFiles={handleAddFiles}
          onRemoveFile={handleRemoveFile}
        />
      </PropertySection>

      <PropertySection title="Appointment Preferences">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_220px_220px]">
          <div>
            <Label>Select One or More Days</Label>
            <div className="flex flex-wrap gap-3">
              {dayOptions.map((day) => {
                const active = selectedDays.includes(day);

                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleDay(day)}
                    className={`h-11 rounded-full px-4 text-[14px] font-medium transition-colors ${
                      active
                        ? "bg-[var(--brand)] text-white"
                        : "border border-[var(--border)] bg-white text-[var(--fg)]"
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <Label>Start Time</Label>
            <SelectInput defaultValue="11:00-am">
              <option value="11:00-am">11:00 AM</option>
              <option value="12:00-pm">12:00 PM</option>
              <option value="01:00-pm">01:00 PM</option>
            </SelectInput>
          </div>

          <div>
            <Label>End Time</Label>
            <SelectInput defaultValue="12:00-pm">
              <option value="12:00-pm">12:00 PM</option>
              <option value="01:00-pm">01:00 PM</option>
              <option value="02:00-pm">02:00 PM</option>
            </SelectInput>
          </div>
        </div>
      </PropertySection>

      <PropertySection title="Property Address">
        <div className="space-y-5">
          <div className="grid gap-5 lg:grid-cols-[1fr_280px]">
            <div>
              <Label>Street Address*</Label>
              <TextInput placeholder="Enter Full Address, Street" />
            </div>

            <div>
              <Label>Unit (Optional)</Label>
              <TextInput placeholder="Apt/Unit" />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <div>
              <Label>City*</Label>
              <SelectInput defaultValue="">
                <option value="" disabled>
                  Enter Property City
                </option>
                <option value="los-angeles">Los Angeles</option>
                <option value="denton">Denton</option>
                <option value="dallas">Dallas</option>
              </SelectInput>
            </div>

            <div>
              <Label>State</Label>
              <SelectInput defaultValue="">
                <option value="" disabled>
                  Enter Property State
                </option>
                <option value="california">California</option>
                <option value="texas">Texas</option>
              </SelectInput>
            </div>

            <div>
              <Label>Country</Label>
              <SelectInput defaultValue="">
                <option value="" disabled>
                  Enter Property Country
                </option>
                <option value="usa">United States</option>
                <option value="india">India</option>
              </SelectInput>
            </div>
          </div>

          <div className="max-w-[280px]">
            <Label>Zip Code</Label>
            <TextInput placeholder="Enter Property Zip Code" />
          </div>
        </div>
      </PropertySection>

      <PropertySection title="Plan Type">
        <PropertyPlanSelector
          selectedPlan={selectedPlan}
          onSelect={setSelectedPlan}
        />
      </PropertySection>

      <PropertySection title="Billing Details">
        <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
          <div>
            <Label>Payment Type</Label>
            <div className="space-y-4">
              {[
                ["credit-card", "Credit Card"],
                ["banking", "Banking"],
                ["wallet", "Wallet Type"],
              ].map(([value, label]) => (
                <label key={value} className="flex items-center gap-2 text-[14px]">
                  <input
                    type="radio"
                    name="paymentType"
                    checked={paymentType === value}
                    onChange={() => setPaymentType(value as PaymentType)}
                    className="h-4 w-4 accent-[var(--brand)]"
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-6 border-l border-[var(--border)] pl-8">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-[18px] font-semibold">Card Info</h3>
              <button
                type="button"
                className="text-[18px] font-medium text-[var(--brand)]"
              >
                + Add More
              </button>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <Label>Card Name</Label>
                <TextInput placeholder="Name on Card" />
              </div>

              <div>
                <Label>Card Number</Label>
                <TextInput placeholder="Card Number" />
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-[200px_160px]">
              <div>
                <Label>Expiry Date</Label>
                <TextInput placeholder="MM/YYYY" />
              </div>

              <div>
                <Label>Code</Label>
                <TextInput placeholder="CVV" />
              </div>
            </div>

            <div className="border-t border-[var(--border)] pt-6">
              <h3 className="text-[18px] font-semibold">Billing Address</h3>

              <label className="mt-3 flex items-center gap-2 text-[14px] text-[var(--brand)]">
                <input
                  type="checkbox"
                  checked={sameAsListingAddress}
                  onChange={() => setSameAsListingAddress((prev) => !prev)}
                  className="h-4 w-4 accent-[var(--brand)]"
                />
                <span>Same as Listing Address</span>
              </label>

              <div className="mt-5 space-y-5">
                <div>
                  <Label>Street Address</Label>
                  <TextInput placeholder="Enter Full Address, Street, Apt/Unit" />
                </div>

                <div className="grid gap-5 md:grid-cols-4">
                  <div>
                    <Label>City</Label>
                    <SelectInput defaultValue="">
                      <option value="" disabled>
                        City Name
                      </option>
                      <option value="los-angeles">Los Angeles</option>
                      <option value="denton">Denton</option>
                    </SelectInput>
                  </div>

                  <div>
                    <Label>State</Label>
                    <SelectInput defaultValue="">
                      <option value="" disabled>
                        Sate
                      </option>
                      <option value="california">California</option>
                      <option value="texas">Texas</option>
                    </SelectInput>
                  </div>

                  <div>
                    <Label>Country</Label>
                    <SelectInput defaultValue="">
                      <option value="" disabled>
                        Country
                      </option>
                      <option value="usa">United States</option>
                      <option value="india">India</option>
                    </SelectInput>
                  </div>

                  <div>
                    <Label>Zip Code</Label>
                    <TextInput placeholder="Enter Zip Code" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PropertySection>

      <div className="flex flex-wrap items-center justify-end gap-4 pt-2">
        <button
          type="button"
          className="rounded-[10px] border border-[var(--brand)] px-6 py-3 text-[16px] font-medium text-[var(--brand)] transition-colors hover:bg-[var(--brand-soft)]"
        >
          Save As Draft
        </button>

        <button
          type="button"
          className="rounded-[10px] bg-[var(--brand)] px-6 py-3 text-[16px] font-medium text-white transition-colors hover:bg-[var(--brand-strong)]"
        >
          <span className="inline-flex items-center gap-2">
            <HomeWorkOutlinedIcon fontSize="small" />
            Create Property
          </span>
        </button>
      </div>
    </div>
  );
}