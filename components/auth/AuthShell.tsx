"use client";

import Link from "next/link";
import Checkbox from "@mui/material/Checkbox";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import BrandLogo from "@/components/shared/BrandLogo";
import PrimaryButton from "@/components/shared/PrimaryButton";
import TextInput from "@/components/shared/TextInput";
import LottiePlayer from "@/components/shared/LottiePlayer";
import authHeroAnimation from "@/public/images/auth/auth_hero.json";

type AuthShellProps = {
  mode: "login" | "register" | "forgot-password" | "account-type";
};

export default function AuthShell({ mode }: AuthShellProps) {
  const isLogin = mode === "login";
  const isRegister = mode === "register";
  const isForgotPassword = mode === "forgot-password";
  const isAccountType = mode === "account-type";

  return (
    <div className="min-h-dvh bg-[var(--bg)] text-[var(--fg)]">
      <div className="grid min-h-dvh grid-cols-1 lg:grid-cols-[420px_minmax(0,1fr)]">
        <aside className="hidden bg-white/30 lg:flex lg:flex-col lg:justify-between lg:border-r lg:border-[var(--border)] lg:px-10 xl:px-16 lg:py-8 xl:py-10">
          <BrandLogo variant="full" priority />

          <div className="flex flex-col items-center text-center">
            <p className="max-w-[300px] text-[20px] leading-8 text-[var(--muted)]">
              We are an experience maker, we help you to have a better experience
              in visual communication
            </p>

            <div className="mt-10 flex justify-center">
              <LottiePlayer
                animationData={authHeroAnimation}
                className="w-full max-w-[220px] xl:max-w-[260px]"
              />
            </div>
          </div>

          <p className="text-sm text-[var(--muted)]">@Leaseease2026</p>
        </aside>

        <main className="relative flex items-center justify-center px-6 py-10 sm:px-8 lg:px-16">
          <div className="w-full max-w-[560px]">
            {isRegister && (
              <div className="mb-10 text-center">
                <p className="text-[24px] font-medium text-[var(--muted)]">
                  Welcome to
                </p>

                <h1 className="mt-2 text-[34px] font-semibold tracking-[-0.03em] text-[var(--fg)]">
                  Register your account with{" "}
                  <span className="text-[var(--brand)]">Shagrih</span>
                </h1>

                <p className="mt-2 text-[var(--muted)]">
                  Enter your information below to continue
                </p>
              </div>
            )}

            {isLogin && (
              <div className="mb-10 text-center">
                <p className="text-[24px] font-medium text-[var(--muted)]">
                  Welcome back
                </p>

                <h1 className="mt-2 text-[34px] font-semibold tracking-[-0.03em] text-[var(--fg)]">
                  Sign in to <span className="text-[var(--brand)]">Shagrih</span>
                </h1>

                <p className="mt-2 text-[var(--muted)]">
                  Login by your secure account
                </p>
              </div>
            )}

            {isForgotPassword && (
              <div className="mb-10 text-center">
                <p className="text-[24px] font-medium text-[var(--muted)]">
                  Forgot Password?
                </p>

                <h1 className="mt-2 text-[34px] font-semibold tracking-[-0.03em] text-[var(--fg)]">
                  No worries, Set your new Password
                </h1>

                <p className="mt-2 text-[var(--muted)]">
                  we&apos;ll send you reset instructions.
                </p>
              </div>
            )}

            {isAccountType && (
              <div className="mx-auto max-w-[480px]">
                <div className="mb-10 text-center">
                  <p className="text-[24px] font-medium text-[var(--muted)]">
                    Choose Account Type
                  </p>

                  <h1 className="mt-2 text-[32px] font-semibold tracking-[-0.03em] text-[var(--fg)]">
                    We curate your account preferences
                  </h1>

                  <p className="mt-2 text-[var(--muted)]">
                    making sure it apts your liking
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <button
                      type="button"
                      className="rounded-2xl border border-[var(--brand)] bg-white p-5 text-left transition-all hover:shadow-sm"
                    >
                      <div className="flex items-start gap-3">
                        <span className="mt-1 text-[var(--brand)]">
                          <PersonRoundedIcon fontSize="small" />
                        </span>

                        <div>
                          <h3 className="text-xl font-semibold text-[var(--fg)]">
                            Tenant
                          </h3>
                          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                            Find a place, Lease a place, Messaging Home owner
                          </p>
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      className="rounded-2xl border border-[var(--border)] bg-white p-5 text-left transition-all hover:border-[var(--brand)] hover:shadow-sm"
                    >
                      <div className="flex items-start gap-3">
                        <span className="mt-1 text-[var(--muted)]">
                          <ApartmentRoundedIcon fontSize="small" />
                        </span>

                        <div>
                          <h3 className="text-xl font-semibold text-[var(--fg)]">
                            Landlord
                          </h3>
                          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                            Monitor Your Listings, Manage Rents, Rent a place
                          </p>
                        </div>
                      </div>
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <Link
                      href="/register"
                      className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--border)] bg-white text-[var(--fg)] transition-colors hover:bg-gray-50"
                    >
                      <CloseRoundedIcon fontSize="small" />
                    </Link>

                    <PrimaryButton className="h-12 flex-1 text-base">
                      Save &amp; See Listings
                    </PrimaryButton>
                  </div>
                </div>
              </div>
            )}

            {(isRegister || isLogin || isForgotPassword) && (
              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium">Email</label>
                  <TextInput placeholder="johndoe@gmail.com" />
                </div>

                {isRegister && (
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        First name
                      </label>
                      <TextInput placeholder="John" />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Last name
                      </label>
                      <TextInput placeholder="Doe" />
                    </div>
                  </div>
                )}

                {isLogin && (
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Password
                    </label>

                    <div className="relative">
                      <TextInput
                        placeholder="********"
                        type="password"
                        className="pr-12"
                      />
                      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted)]">
                        <VisibilityOffOutlinedIcon fontSize="small" />
                      </span>
                    </div>
                  </div>
                )}

                {isRegister && (
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Create Password
                      </label>

                      <div className="relative">
                        <TextInput
                          placeholder="********"
                          type="password"
                          className="pr-12"
                        />
                        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted)]">
                          <VisibilityOffOutlinedIcon fontSize="small" />
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Confirm Password
                      </label>

                      <div className="relative">
                        <TextInput
                          placeholder="********"
                          type="password"
                          className="pr-12"
                        />
                        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted)]">
                          <VisibilityOffOutlinedIcon fontSize="small" />
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {isForgotPassword && (
                  <>
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        New Password
                      </label>

                      <div className="relative">
                        <TextInput
                          placeholder="********"
                          type="password"
                          className="pr-12"
                        />
                        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted)]">
                          <VisibilityOffOutlinedIcon fontSize="small" />
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Reenter new Password
                      </label>

                      <div className="relative">
                        <TextInput
                          placeholder="********"
                          type="password"
                          className="pr-12"
                        />
                        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted)]">
                          <VisibilityOffOutlinedIcon fontSize="small" />
                        </span>
                      </div>
                    </div>
                  </>
                )}

                {isLogin && (
                  <div className="flex items-center justify-between gap-4">
                    <label className="flex items-center gap-2 text-[var(--muted)]">
                      <Checkbox size="small" />
                      <span>Remember me</span>
                    </label>

                    <Link
                      href="/forgot-password"
                      className="font-medium text-[var(--brand)] transition-colors hover:text-[var(--brand-strong)]"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                )}

                {isRegister && (
                  <PrimaryButton className="h-14 w-full text-lg">
                    Create Account
                  </PrimaryButton>
                )}

                {isLogin && (
                  <>
                    <PrimaryButton className="h-14 w-full text-lg">
                      Log In
                    </PrimaryButton>

                    <div className="pt-2 text-center text-[var(--muted)]">
                      Or Continue With
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <button
                        type="button"
                        className="flex h-14 items-center justify-center gap-3 rounded-2xl border border-[var(--border)] bg-white text-lg font-medium"
                      >
                        <GoogleIcon />
                        <span>Google</span>
                      </button>

                      <button
                        type="button"
                        className="flex h-14 items-center justify-center gap-3 rounded-2xl border border-[var(--border)] bg-white text-lg font-medium"
                      >
                        <FacebookRoundedIcon />
                        <span>Facebook</span>
                      </button>
                    </div>

                    <p className="text-center text-[var(--muted)]">
                      New member here?{" "}
                      <Link
                        href="/register"
                        className="font-semibold text-[var(--brand)] transition-colors hover:text-[var(--brand-strong)]"
                      >
                        Register Now
                      </Link>
                    </p>
                  </>
                )}

                {isForgotPassword && (
                  <>
                    <PrimaryButton className="h-14 w-full text-lg">
                      Update &amp; Continue To Main
                    </PrimaryButton>

                    <p className="pt-6 text-center text-[var(--muted)]">
                      Want to go back?{" "}
                      <Link
                        href="/login"
                        className="font-semibold text-[var(--brand)] transition-colors hover:text-[var(--brand-strong)]"
                      >
                        Login
                      </Link>
                    </p>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="absolute bottom-6 right-6 hidden items-center gap-4 text-[var(--muted)] lg:flex">
            <span className="text-sm">f</span>
            <span className="text-sm">◎</span>
            <span className="text-sm">▶</span>
          </div>
        </main>
      </div>
    </div>
  );
}