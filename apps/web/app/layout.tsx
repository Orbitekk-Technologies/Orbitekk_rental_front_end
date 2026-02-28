export const metadata = {
  title: "ProNest",
  description: "Property rentals and leasing platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
