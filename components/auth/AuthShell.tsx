"use client";

import Link from "next/link";
import Checkbox from "@mui/material/Checkbox";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import BrandLogo from "@/components/shared/BrandLogo";
import PrimaryButton from "@/components/shared/PrimaryButton";
import TextInput from "@/components/shared/TextInput";
import LottiePlayer from "@/components/shared/LottiePlayer";
import authHeroAnimation from "@/public/images/auth/auth_hero.json";

type AuthShellProps = {
  mode: "login" | "register";
};

export default function AuthShell({ mode }: AuthShellProps) {
  const isLogin = mode === "login";

  return (
    <div className="min-h-dvh bg-[var(--bg)] text-[var(--fg)]">
      <div className="grid min-h-dvh grid-cols-1 lg:grid-cols-[420px_minmax(0,1fr)]">
        <aside className="hidden bg-white/30 lg:flex lg:flex-col lg:justify-between lg:border-r lg:border-[var(--border)] lg:px-16 lg:py-10">
          <BrandLogo variant="full" priority />

          <div className="flex flex-col items-center text-center">
            <p className="max-w-[300px] text-[20px] font-semibold leading-8 text-[var(--muted)]">
              We are an experience maker, we help you to have a better experience
              in visual communication
            </p>

            <div className="mt-10 flex justify-center">
              <LottiePlayer
                animationData={authHeroAnimation}
                className="w-full max-w-[260px] xl:max-w-[300px]"
              />
            </div>
          </div>

          <p className="text-sm text-[var(--muted)]">@Pronest2026</p>
        </aside>

        <main className="flex items-center justify-center px-6 py-10 sm:px-8 lg:px-16">
          <div className="w-full max-w-[560px]">
            <div className="mb-10 text-center">
              <p className="text-[24px] font-medium text-[var(--muted)]">
                Welcome to
              </p>

              <h1 className="mt-3 text-[34px] font-semibold tracking-[-0.03em] text-[var(--fg)]">
                {isLogin ? (
                  <>
                    Sign in to <span className="text-[var(--brand)]">ProNest</span>
                  </>
                ) : (
                  <>
                    Register your account in{" "}
                    <span className="text-[var(--brand)]">ProNest</span>
                  </>
                )}
              </h1>

              <p className="mt-2 text-[var(--muted)]">
                {isLogin
                  ? "Login by your secure account"
                  : "Enter your information below to continue"}
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium">Email</label>
                <TextInput placeholder="kamrul@gmail.com" />
              </div>

              {!isLogin && (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      First name
                    </label>
                    <TextInput placeholder="Kamrul" />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Last name
                    </label>
                    <TextInput placeholder="Hasan" />
                  </div>
                </div>
              )}

              <div
                className={
                  isLogin
                    ? "space-y-5"
                    : "grid grid-cols-1 gap-5 sm:grid-cols-2"
                }
              >
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    {isLogin ? "Password" : "Create Password"}
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

                {!isLogin && (
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
                )}
              </div>

              {isLogin ? (
                <div className="flex items-center justify-between gap-4">
                  <label className="flex items-center gap-2 text-[var(--muted)]">
                    <Checkbox size="small" />
                    <span>Remember me</span>
                  </label>

                  <Link
                    href="#"
                    className="font-medium text-[var(--brand)] transition-colors hover:text-[var(--brand-strong)]"
                  >
                    Forgot Password?
                  </Link>
                </div>
              ) : null}

              <PrimaryButton className="h-14 w-full text-lg">
                {isLogin ? "Log In" : "Create Account"}
              </PrimaryButton>

              {isLogin && (
                <>
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
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}