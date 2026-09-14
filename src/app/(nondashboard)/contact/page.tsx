"use client";

import { type FormEvent } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import AuthVisualCarousel from "@/components/AuthVisualCarousel";
import BrandLogo from "@/components/BrandLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const fieldClassName =
  "h-14 border-0 bg-gray-100 px-4 text-base shadow-none focus-visible:ring-secondary-500";

export default function ContactPage() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const fullName = String(form.get("fullName") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const description = String(form.get("description") ?? "").trim();
    const subject = encodeURIComponent(`ShaGriha contact request from ${fullName}`);
    const body = encodeURIComponent(
      [`Full name: ${fullName}`, `Phone: ${phone}`, `Email: ${email}`, "", "Message:", description || "No description provided."].join("\n")
    );

    window.location.href = `mailto:support@shagriha.com?subject=${subject}&body=${body}`;
  };

  return (
    <main className="grid min-h-screen bg-white lg:grid-cols-[35%_65%]">
      <aside className="hidden flex-col bg-[#f6efff] px-12 py-10 lg:flex xl:px-16">
        <BrandLogo />
        <div className="flex flex-1 items-center justify-center pb-16">
          <AuthVisualCarousel />
        </div>
      </aside>

      <section className="flex min-h-screen flex-col px-6 py-8 sm:px-10 lg:px-16 xl:px-24">
        <BrandLogo className="lg:hidden" />
        <div className="flex flex-1 items-center justify-center py-8">
          <div className="w-full max-w-xl">
            <header className="mb-8">
              <h1 className="text-xl font-bold tracking-tight">
                <span className="text-secondary-500">SHA</span>GRIHA
              </h1>
              <p className="mt-1 text-base text-gray-500">
                Contact us and tell us how we can help.
              </p>
            </header>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="full-name" className="text-base font-normal text-gray-600">Full Name</Label>
                <Input id="full-name" name="fullName" autoComplete="name" placeholder="Enter your full name" className={fieldClassName} required />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-base font-normal text-gray-600">Phone</Label>
                  <Input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="Phone number" className={fieldClassName} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base font-normal text-gray-600">Email</Label>
                  <Input id="email" name="email" type="email" autoComplete="email" placeholder="Email address" className={fieldClassName} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-base font-normal text-gray-600">Description</Label>
                <Textarea id="description" name="description" rows={4} placeholder="How can we help?" className="resize-none border-0 bg-gray-100 px-4 py-3 text-base shadow-none focus-visible:ring-secondary-500" />
              </div>
              <Button type="submit" className="h-14 w-full rounded-md bg-secondary-500 px-5 text-lg text-white hover:bg-secondary-600">
                Continue to Email
              </Button>
            </form>
          </div>
        </div>

        <footer className="flex flex-col items-center justify-between gap-5 text-sm text-gray-500 sm:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            <span>© ShaGriha 2026</span>
            <Link href="/faq" className="hover:text-secondary-500">FAQ&apos;s</Link>
            <Link href="/terms" className="hover:text-secondary-500">T&amp;C</Link>
            <Link href="/privacy" className="hover:text-secondary-500">Privacy</Link>
          </div>
          <div className="flex items-center gap-6 text-gray-600">
            <span aria-label="Facebook link coming soon" title="Facebook link coming soon">
              <FontAwesomeIcon icon={faFacebook} className="h-5 w-5" />
            </span>
            <a href="https://www.instagram.com/shagriha/" target="_blank" rel="noreferrer" aria-label="Shagriha on Instagram" className="hover:text-secondary-500">
              <FontAwesomeIcon icon={faInstagram} className="h-5 w-5" />
            </a>
          </div>
        </footer>
      </section>
    </main>
  );
}
