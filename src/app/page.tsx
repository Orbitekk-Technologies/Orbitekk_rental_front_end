import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Landing from "./(nondashboard)/landing/page";
import { NAVBAR_HEIGHT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Rental Homes, Apartments & Private Rooms",
  description: "Search rental homes, apartments, houses, and private rooms on Shagriha and connect with property owners and authorized property managers.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <div className="h-full w-full">
      <Navbar />
      <main
        className="flex min-h-full w-full flex-col"
        style={{ paddingTop: `${NAVBAR_HEIGHT}px` }}
      >
        <Landing />
      </main>
    </div>
  );
}
