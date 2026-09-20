import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const BackLink = ({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) => (
  <Link
    href={href}
    className={`group inline-flex items-center gap-2 text-sm font-medium text-gray-800 transition-colors hover:text-secondary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-400 focus-visible:ring-offset-2 ${className}`}
  >
    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-800 transition-colors group-hover:border-secondary-600">
      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
    </span>
    {children}
  </Link>
);

export default BackLink;
