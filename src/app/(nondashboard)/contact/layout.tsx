import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Shagriha",
  description: "Contact Shagriha for help with rental listings, property applications, accounts, or platform support.",
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
