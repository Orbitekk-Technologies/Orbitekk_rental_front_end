import { Property } from "@/data/properties";
import ListingsEmptyState from "@/components/listings/ListingsEmptyState";
import PropertyListCard from "@/components/listings/PropertyListCard";

type ListingsResultsProps = {
  properties: Property[];
};

export default function ListingsResults({
  properties,
}: ListingsResultsProps) {
  if (!properties.length) {
    return (
      <div className="h-full">
        <ListingsEmptyState />
      </div>
    );
  }

  return (
    <div className="h-full lg:overflow-y-auto lg:pr-2">
      <div className="space-y-4 pb-2">
        {properties.map((property) => (
          <PropertyListCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}