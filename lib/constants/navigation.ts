// lib/constants/navigation.ts
export type NavItem = {
  label: string;
  href: string;
};

export const marketingNavItems: NavItem[] = [
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Favourites", href: "/favourites" },
  { label: "Listings", href: "/listings" },
];

export const authNavItems: NavItem[] = [
  { label: "Login", href: "/login" },
  { label: "Signup", href: "/register" },
];