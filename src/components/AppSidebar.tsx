import Link from "next/link";
import {
  Building2,
  ClipboardList,
  Heart,
  Home,
  Plus,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const managerLinks = [
  { href: "/managers/properties", icon: Building2, label: "Properties" },
  { href: "/managers/applications", icon: ClipboardList, label: "Applications" },
  { href: "/managers/newproperty", icon: Plus, label: "New Property" },
  { href: "/managers/settings", icon: Settings, label: "Settings" },
];

const tenantLinks = [
  { href: "/tenants/residences", icon: Home, label: "Residences" },
  { href: "/tenants/favourites", icon: Heart, label: "Favorites" },
  { href: "/tenants/applications", icon: ClipboardList, label: "Applications" },
  { href: "/tenants/settings", icon: Settings, label: "Settings" },
];

export default function AppSidebar({ userType }: AppSidebarProps) {
  const links = userType === "manager" ? managerLinks : tenantLinks;

  return (
    <aside className="min-h-[calc(100vh-50px)] w-64 border-r border-primary-200 bg-white p-4">
      <nav className="space-y-1">
        {links.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm text-primary-600 hover:bg-primary-100 hover:text-primary-900"
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
