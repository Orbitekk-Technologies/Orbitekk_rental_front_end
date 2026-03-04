import "./globals.css";

export const metadata = {
  title: "ProNest",
  description: "Property rentals and leasing platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}