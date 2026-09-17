"use client";

import Link from "next/link";
import { GoogleAnalytics } from "@next/third-parties/google";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const CONSENT_KEY = "shagriha-analytics-consent";
type Consent = "granted" | "denied" | null;

export default function AnalyticsConsent() {
  const [consent, setConsent] = useState<Consent>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(CONSENT_KEY);
    setConsent(stored === "granted" || stored === "denied" ? stored : null);
    setIsReady(true);
  }, []);

  const saveConsent = (choice: Exclude<Consent, null>) => {
    window.localStorage.setItem(CONSENT_KEY, choice);
    setConsent(choice);
  };

  return (
    <>
      {consent === "granted" && <GoogleAnalytics gaId="G-B7CVN2NC1K" />}
      {isReady && consent === null && (
        <section
          className="fixed inset-x-4 bottom-4 z-[110] mx-auto max-w-2xl rounded-xl border border-gray-200 bg-white p-4 shadow-2xl sm:p-5"
          aria-label="Analytics preferences"
        >
          <p className="font-semibold text-gray-950">Help us improve Shagriha</p>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            We use Google Analytics to understand visits, engagement, navigation, and bounce patterns so we can improve the product. We do not use it for targeted advertising. Read our{" "}
            <Link href="/privacy" className="font-medium text-secondary-600 underline underline-offset-2">
              Privacy Policy
            </Link>.
          </p>
          <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button type="button" variant="outline" onClick={() => saveConsent("denied")}>
              Necessary only
            </Button>
            <Button type="button" onClick={() => saveConsent("granted")}>
              Allow analytics cookies
            </Button>
          </div>
        </section>
      )}
    </>
  );
}
