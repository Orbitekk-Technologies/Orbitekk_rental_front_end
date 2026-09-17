import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  return {
    title: "Rental Property Listing",
    description: "View rental property details, photos, amenities, location information, and application options on Shagriha.",
    alternates: { canonical: `/search/${id}` },
  };
}

export default function PropertyListingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
