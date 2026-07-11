// lib/constants/navigation.ts
export type NavItem = {
  label: string;
  href: string;
  disabled?: boolean;
};

export const marketingNavItems: NavItem[] = [
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Listings", href: "/listings", disabled: true },
];

export const authNavItems: NavItem[] = [
  { label: "Login", href: "/login" },
  { label: "Signup", href: "/register" },
];

export const isAuthEnabled = false;
