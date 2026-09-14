import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Landing from "./(nondashboard)/landing/page";
import { NAVBAR_HEIGHT } from "@/lib/constants";

export const metadata: Metadata = {
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
