"use client";

import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import type { PropertyFormStep } from "@/lib/propertyDraftStorage";

const STEPS: Array<{ value: PropertyFormStep; label: string }> = [
  { value: "basic", label: "Basic Information" },
  { value: "details", label: "Property Details" },
  { value: "amenities", label: "Amenities & Preference" },
];

interface NewPropertyTabsProps {
  value: PropertyFormStep;
  highestAccessibleStep: number;
  onValueChange: (step: PropertyFormStep) => void;
}

const NewPropertyTabs = ({
  value,
  highestAccessibleStep,
  onValueChange,
}: NewPropertyTabsProps) => {
  return (
    <Tabs
      value={value}
      onValueChange={(nextValue) =>
        onValueChange(nextValue as PropertyFormStep)
      }
      className="w-full"
    >
      <TabsList className="grid h-auto w-full grid-cols-1 gap-1 rounded-lg bg-white p-1 sm:grid-cols-3">
        {STEPS.map((step, index) => (
          <TabsTrigger
            key={step.value}
            value={step.value}
            disabled={index > highestAccessibleStep}
            className="min-h-10 justify-start px-4 text-left text-sm font-medium text-gray-700 data-[state=active]:bg-white data-[state=active]:text-gray-950 data-[state=active]:shadow-md sm:justify-center"
          >
            {step.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default NewPropertyTabs;
