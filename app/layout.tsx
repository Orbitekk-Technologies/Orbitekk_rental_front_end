// app/layout.tsx

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import "@/styles/tokens.css";
import { LenisProvider } from "@/providers/LenisProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "ShaGriha",
  description: "Crafting New Housing Vision",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable} data-scroll-behavior="smooth">
      <body>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}