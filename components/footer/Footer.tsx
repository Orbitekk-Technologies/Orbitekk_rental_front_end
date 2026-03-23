import Link from "next/link";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import YouTubeIcon from "@mui/icons-material/YouTube";
import AppContainer from "@/components/shared/AppContainer";
import { siteConfig } from "@/lib/constants/site";

type FooterProps = {
  className?: string;
  compact?: boolean;
};

export default function Footer({ className = "", compact = false }: FooterProps) {
  return (
    <footer className={`bg-[var(--bg)] ${className}`}>
      <AppContainer>
        <div className={`border-t border-[var(--border)] ${compact ? "py-3 md:py-4" : "py-4 md:py-5"}`}>
          <div className="flex flex-col gap-4 text-sm text-[var(--muted)] md:flex-row md:items-center md:justify-between">
            <div className="order-2 flex items-center gap-4 md:order-1">
              <span>© 2026 {siteConfig.name}</span>

              <div className="hidden items-center gap-4 md:flex">
                {siteConfig.footerLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="transition-colors hover:text-[var(--brand)]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="order-3 flex items-center gap-3 md:order-2">
              <a
                href="#"
                aria-label="Facebook"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[var(--muted)] transition-colors hover:text-[var(--brand)]"
              >
                <FacebookRoundedIcon fontSize="small" />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[var(--muted)] transition-colors hover:text-[var(--brand)]"
              >
                <InstagramIcon fontSize="small" />
              </a>

              <a
                href="#"
                aria-label="YouTube"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[var(--muted)] transition-colors hover:text-[var(--brand)]"
              >
                <YouTubeIcon fontSize="small" />
              </a>
            </div>

            <div className="order-1 flex items-center gap-4 md:hidden">
              {siteConfig.footerLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="transition-colors hover:text-[var(--brand)]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </AppContainer>
    </footer>
  );
}
