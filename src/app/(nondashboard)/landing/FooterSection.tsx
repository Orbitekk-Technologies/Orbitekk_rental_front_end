import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

const FooterSection = () => (
  <footer className="mx-auto flex w-full max-w-[1536px] flex-col items-center gap-4 px-6 pb-5 pt-3 text-sm text-gray-500 sm:px-10 md:flex-row md:justify-between lg:px-16 xl:px-20">
    <div className="flex flex-wrap items-center justify-center gap-x-9 gap-y-3">
      <span>© ShaGriha 2026</span>
      <Link href="/faq" className="transition-colors hover:text-secondary-500">FAQ&apos;s</Link>
      <Link href="/terms" className="transition-colors hover:text-secondary-500">T&amp;C</Link>
      <Link href="/privacy" className="transition-colors hover:text-secondary-500">Privacy</Link>
    </div>
    <div className="flex items-center gap-6 text-gray-600">
      {/* Facebook URL will be added in a later phase. */}
      <span aria-label="Facebook link coming soon" title="Facebook link coming soon">
        <FontAwesomeIcon icon={faFacebook} className="h-5 w-5" />
      </span>
      <a
        href="https://www.instagram.com/shagriha/"
        target="_blank"
        rel="noreferrer"
        aria-label="Shagriha on Instagram"
        className="transition-colors hover:text-secondary-500"
      >
        <FontAwesomeIcon icon={faInstagram} className="h-5 w-5" />
      </a>
    </div>
  </footer>
);

export default FooterSection;
