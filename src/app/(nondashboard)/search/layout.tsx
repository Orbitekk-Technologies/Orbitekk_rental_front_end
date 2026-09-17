import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Rental Homes & Apartments",
  description: "Browse rental homes, apartments, houses, and private rooms. Filter listings by location, price, property type, amenities, and who listed the property.",
  alternates: { canonical: "/search" },
  openGraph: {
    title: "Search Rental Homes & Apartments | Shagriha",
    description: "Browse available rental properties and connect directly with owners and authorized property managers.",
    url: "/search",
  },
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return children;
}
