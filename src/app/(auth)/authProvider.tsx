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

    try {
      const response = isReset
        ? await resetPassword({
            email: String(form.get("email")),
            password: String(form.get("password")),
            confirmPassword: String(form.get("confirmPassword")),
          }).unwrap()
        : isSignUp
        ? await signup({
            email: String(form.get("email")),
            password: String(form.get("password")),
            confirmPassword: String(form.get("confirmPassword")),
          }).unwrap()
        : await login({
            login: String(form.get("email")),
            password: String(form.get("password")),
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
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <section className="w-full max-w-md rounded-lg border border-border bg-background p-8">
        <header className="mb-7">
          <Link
            href="/"
            aria-label="SHAGRIHA home"
            className="inline-block rounded-sm text-2xl font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2"
          >
            SHA<span className="font-light text-secondary-500">GRIHA</span>
          </Link>
          <p className="mt-2 text-muted-foreground">
            <span className="font-bold">Welcome!</span>{" "}
            {isReset
              ? "Update your password to continue"
              : isSignUp
                ? "Create an account to continue"
                : "Please sign in to continue"}
          </p>
        </header>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              autoComplete="email"
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              required
            />
            {isSignUp && focusedField === "email" && (
              <p className="text-xs text-muted-foreground">
                Your email will also be used as your account username.
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <PasswordInput
              id="password"
              name="password"
              placeholder={isSignUp || isReset ? "Create a password" : "Enter your password"}
              autoComplete={isSignUp || isReset ? "new-password" : "current-password"}
              minLength={isSignUp || isReset ? 10 : undefined}
              maxLength={100}
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField(null)}
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
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <PasswordInput
                  id="confirm-password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  minLength={10}
                  maxLength={100}
                  onFocus={() => setFocusedField("confirmPassword")}
                  onBlur={() => setFocusedField(null)}
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
            <div className="text-right">
              <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
          )}

          <Button type="submit" className="mt-2 w-full" disabled={isLoginLoading || isSignupLoading || isResetLoading}>
            {isLoginLoading || isSignupLoading || isResetLoading
              ? "Please wait..."
              : isReset ? "Update password" : isSignUp ? "Create account" : "Sign in"}
          </Button>
        </form>

        <div className="mt-5 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          {isReset ? (
            <Link href="/signin" className="text-primary hover:underline">
              Back to sign in
            </Link>
          ) : (
            <>
          <span>
            {isSignUp ? "Already have an account?" : "Don’t have an account?"}
          </span>
          <a href={isSignUp ? "/signin" : "/signup"} className="text-primary hover:underline">
            {isSignUp ? "Sign in" : "Sign up here"}
          </a>
          <span>or</span>
          <button
            type="button"
            onClick={handleGoogle}
            className="border-0 bg-transparent p-0 text-primary hover:underline"
          >
            Google
          </button>
            </>
          )}
        </div>
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
