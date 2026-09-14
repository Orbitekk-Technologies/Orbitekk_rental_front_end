"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PasswordInput from "@/components/PasswordInput";
import { Label } from "@/components/ui/label";
import { api } from "@/state/api";
import {
  useLoginMutation,
  useResetPasswordMutation,
  useSignupMutation,
} from "@/state/api";
import { useAppDispatch } from "@/state/redux";
import {
  getStoredAuthIdentity,
  setAccessToken,
  setStoredAuthIdentity,
} from "@/lib/authToken";
import { getApiErrorMessage } from "@/lib/apiError";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  createContext,
  type FormEvent,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import { toast } from "sonner";
import { CircleAlert } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import AuthVisualCarousel from "@/components/AuthVisualCarousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

export type AuthIdentity = {
  userId: string;
  username?: string;
};

type AuthContextValue = {
  user: AuthIdentity | null;
  isAuthReady: boolean;
  setUser: (user: AuthIdentity | null) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}

function AuthForm({ mode }: { mode: "signin" | "signup" | "forgot-password" }) {
  const isSignUp = mode === "signup";
  const isReset = mode === "forgot-password";
  const { setUser } = useAuth();
  const router = useRouter();
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [signup, { isLoading: isSignupLoading }] = useSignupMutation();
  const [resetPassword, { isLoading: isResetLoading }] = useResetPasswordMutation();
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("oauthError") === "true") {
      if (window.opener && !window.opener.closed) {
        window.opener.postMessage(
          { type: "shagriha:oauth-error" },
          window.location.origin
        );
        window.close();
        return;
      }
      toast.error("Google sign-in could not be completed.");
      router.replace("/signin");
    }

    const completeGoogleSignIn = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (event.data?.type === "shagriha:oauth-error") {
        toast.error("Google sign-in could not be completed.");
        return;
      }
      if (event.data?.type !== "shagriha:oauth-success") return;

      const { accessToken, userId, username } = event.data;
      if (typeof accessToken !== "string" || typeof userId !== "string") return;
      setAccessToken(accessToken);
      setUser({ userId, username: typeof username === "string" ? username : undefined });
      toast.success("Signed in with Google.");
      router.replace("/search");
    };

    window.addEventListener("message", completeGoogleSignIn);
    return () => window.removeEventListener("message", completeGoogleSignIn);
  }, [router, setUser]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    const confirmPassword = String(form.get("confirmPassword") ?? "");
    setFormError(null);

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError("Enter a valid email address.");
      return;
    }
    setEmailError(null);
    if ((isSignUp || isReset) && (password.length < 10 || password.length > 100)) {
      setFormError("Password must contain between 10 and 100 characters.");
      return;
    }
    if ((isSignUp || isReset) && password !== confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }

    try {
      const response = isReset
        ? await resetPassword({
            email,
            password,
            confirmPassword,
          }).unwrap()
        : isSignUp
        ? await signup({
            email,
            password,
            confirmPassword,
          }).unwrap()
        : await login({
            login: email,
            password,
          }).unwrap();

      setAccessToken(response.token.accessToken);
      setUser({ userId: response.userId, username: response.username });
      toast.success(
        isReset ? "Password updated." : isSignUp ? "Account created." : "Signed in."
      );
      const returnTo = new URLSearchParams(window.location.search).get("returnTo");
      const safeReturnTo = returnTo?.startsWith("/") && !returnTo.startsWith("//")
        ? returnTo
        : null;
      router.replace(
        safeReturnTo ?? "/search"
      );
    } catch (error) {
      toast.error(
        getApiErrorMessage(
          error,
          isReset
            ? "Could not update your password."
            : isSignUp
              ? "Could not create account."
              : "Invalid email or password."
        )
      );
    }
  };

  const handleGoogle = () => {
    const apiBase =
      process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080/api/v1/";
    const width = 520;
    const height = 700;
    const left = window.screenX + Math.max(0, (window.outerWidth - width) / 2);
    const top = window.screenY + Math.max(0, (window.outerHeight - height) / 2);
    const popup = window.open(
      `${apiBase.replace(/\/$/, "")}/oauth2/authorization/google`,
      "shagriha-google-oauth",
      `popup=yes,width=${width},height=${height},left=${left},top=${top}`
    );
    if (!popup) {
      toast.error("Allow popups for this site to continue with Google.");
      return;
    }
    popup.focus();
  };

  return (
    <main className="grid min-h-screen bg-[#f8f9fb] lg:grid-cols-[35%_65%]">
      <aside className="relative hidden flex-col bg-[#f6efff] px-12 py-10 lg:flex xl:px-16">
        <BrandLogo />
        <div className="flex flex-1 items-center justify-center pb-16">
          <AuthVisualCarousel />
        </div>
      </aside>

      <section className="flex min-h-screen flex-col px-6 py-8 sm:px-10 lg:px-16 xl:px-24">
        <BrandLogo className="lg:hidden" />
        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-xl">
            <header className="mb-10">
              <h1 className="text-xl font-bold tracking-tight">
                <span className="text-secondary-500">SHA</span>GRIHA
              </h1>
              <p className="mt-1 text-base text-gray-500">
                {isReset
                  ? "Reset your password to continue"
                  : isSignUp
                    ? "Welcome! Create your account to continue"
                    : "Welcome! Please sign in to continue"}
              </p>
            </header>

            <form className="space-y-5" onSubmit={handleSubmit}>
          {formError && (
            <div role="alert" className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">
              <CircleAlert aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{formError}</span>
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-base font-normal text-gray-600">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              autoComplete="email"
              aria-invalid={Boolean(emailError)}
              aria-describedby={emailError ? "email-error" : undefined}
              onChange={(event) => {
                const value = event.target.value.trim();
                setEmailError(
                  value.length > 0 && !/^\S+@\S+\.\S+$/.test(value)
                    ? "Enter a valid email address."
                    : null
                );
              }}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              className="h-14 border-0 bg-gray-100 px-4 text-base shadow-none focus-visible:ring-secondary-500"
              required
            />
            {emailError && (
              <p id="email-error" role="alert" className="text-sm font-medium text-red-500">
                {emailError}
              </p>
            )}
            {isSignUp && focusedField === "email" && (
              <p className="text-xs text-muted-foreground">
                Your email will also be used as your account username.
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-base font-normal text-gray-600">Password</Label>
            <PasswordInput
              id="password"
              name="password"
              placeholder={isSignUp || isReset ? "Create a password" : "Enter your password"}
              autoComplete={isSignUp || isReset ? "new-password" : "current-password"}
              minLength={isSignUp || isReset ? 10 : undefined}
              maxLength={100}
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField(null)}
              className="h-14 border-0 bg-gray-100 px-4 text-base shadow-none focus-visible:ring-secondary-500"
              required
            />
            {(isSignUp || isReset) && focusedField === "password" && (
              <p className="text-xs text-muted-foreground">
                Password must contain between 10 and 100 characters.
              </p>
            )}
          </div>

          {(isSignUp || isReset) && (
            <>
              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-base font-normal text-gray-600">Confirm Password</Label>
                <PasswordInput
                  id="confirm-password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  minLength={10}
                  maxLength={100}
                  onFocus={() => setFocusedField("confirmPassword")}
                  onBlur={() => setFocusedField(null)}
                  className="h-14 border-0 bg-gray-100 px-4 text-base shadow-none focus-visible:ring-secondary-500"
                  required
                />
                {focusedField === "confirmPassword" && (
                  <p className="text-xs text-muted-foreground">
                    Enter the same password again.
                  </p>
                )}
              </div>

            </>
          )}

          {!isSignUp && !isReset && (
            <div className="flex items-center justify-between gap-4">
              <label className="flex items-center gap-3 text-sm text-gray-600">
                <input type="checkbox" name="rememberMe" className="h-5 w-5 rounded border-gray-400 accent-[#9747ff]" />
                Remember me
              </label>
              <Link href="/forgot-password" className="text-sm font-semibold text-secondary-500 hover:underline">
                Forgot Password?
              </Link>
            </div>
          )}

          <Button type="submit" className="mt-2 h-14 w-full rounded-md bg-secondary-500 text-lg text-white hover:bg-secondary-600" disabled={isLoginLoading || isSignupLoading || isResetLoading}>
            {isLoginLoading || isSignupLoading || isResetLoading
              ? "Please wait..."
              : isReset ? "Update Password" : isSignUp ? "Register" : "Log In"}
          </Button>
            </form>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm text-gray-500 sm:text-base">
          {isReset ? (
            <Link href="/signin" className="font-semibold text-secondary-500 hover:underline">
              Back to Log In
            </Link>
          ) : (
            <>
          <span>
            {isSignUp ? "Already a member?" : "New member here?"}
          </span>
          <Link href={isSignUp ? "/signin" : "/signup"} className="font-semibold text-secondary-500 hover:underline">
            {isSignUp ? "Log In" : "Register Now"}
          </Link>
          <span>or Use</span>
          <button
            type="button"
            onClick={handleGoogle}
            className="border-0 bg-transparent p-0 font-semibold text-secondary-500 hover:underline"
          >
            Google
          </button>
            </>
          )}
            </div>
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

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const [user, setUserState] = useState<AuthIdentity | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    setUserState(getStoredAuthIdentity());
    setIsAuthReady(true);
  }, []);

  const setUser = useCallback(
    (nextUser: AuthIdentity | null) => {
      setUserState(nextUser);
      setStoredAuthIdentity(nextUser);
      if (!nextUser) setAccessToken(null);
      dispatch(api.util.resetApiState());
    },
    [dispatch]
  );

  const signOut = useCallback(() => setUser(null), [setUser]);
  const value = useMemo(
    () => ({ user, isAuthReady, setUser, signOut }),
    [user, isAuthReady, setUser, signOut]
  );

  return (
    <AuthContext.Provider value={value}>
      {pathname === "/signin" || pathname === "/signup" || pathname === "/forgot-password" ? (
        <AuthForm
          mode={
            pathname === "/signup"
              ? "signup"
              : pathname === "/forgot-password"
                ? "forgot-password"
                : "signin"
          }
        />
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
