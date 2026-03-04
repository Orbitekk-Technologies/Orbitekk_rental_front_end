// apps/web/app/(marketing)/layout.tsx
import LenisProvider from "@/providers/lenis-provider";
import Navbar from "@/components/marketing/Navbar";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <LenisProvider>
      <Navbar />
      {children}
    </LenisProvider>
  );
}