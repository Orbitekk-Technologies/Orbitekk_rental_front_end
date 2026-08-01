"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { api } from "@/state/api";
import { useAppDispatch } from "@/state/redux";
import { usePathname } from "next/navigation";
import {
  createContext,
  type FormEvent,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";

export type AuthIdentity = {
  userId: string;
  username?: string;
};

type AuthContextValue = {
  user: AuthIdentity | null;
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

function AuthForm({ mode }: { mode: "signin" | "signup" }) {
  const isSignUp = mode === "signup";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.info("Spring Boot authentication will be connected in a later phase.");
  };

  const handleGoogle = () => {
    toast.info("Google sign-in will be connected in a later phase.");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <section className="w-full max-w-md rounded-lg border border-border bg-background p-8">
        <header className="mb-7">
          <h1 className="text-2xl font-bold">
            SHA
            <span className="font-light text-secondary-500">GRIHA</span>
          </h1>
          <p className="mt-2 text-muted-foreground">
            <span className="font-bold">Welcome!</span>{" "}
            {isSignUp ? "Create an account to continue" : "Please sign in to continue"}
          </p>
        </header>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              placeholder={isSignUp ? "Choose a username" : "Enter your username"}
              autoComplete="username"
              required
            />
          </div>

          {isSignUp && (
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email address"
                autoComplete="email"
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder={isSignUp ? "Create a password" : "Enter your password"}
              autoComplete={isSignUp ? "new-password" : "current-password"}
              required
            />
          </div>

          {isSignUp && (
            <>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  required
                />
              </div>

              <fieldset className="space-y-2">
                <legend className="text-sm font-medium">Role</legend>
                <RadioGroup name="role" defaultValue="tenant" className="flex gap-6">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="tenant" id="tenant" />
                    <Label htmlFor="tenant">Tenant</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="manager" id="manager" />
                    <Label htmlFor="manager">Manager</Label>
                  </div>
                </RadioGroup>
              </fieldset>
            </>
          )}

          <Button type="submit" className="mt-2 w-full">
            {isSignUp ? "Create account" : "Sign in"}
          </Button>
        </form>

        <div className="mt-5 flex items-center justify-center gap-2 text-sm text-muted-foreground">
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
        </div>
      </section>
    </main>
  );
}

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const [user, setUserState] = useState<AuthIdentity | null>(null);

  const setUser = useCallback(
    (nextUser: AuthIdentity | null) => {
      setUserState(nextUser);
      dispatch(api.util.resetApiState());
    },
    [dispatch]
  );

  const signOut = useCallback(() => setUser(null), [setUser]);
  const value = useMemo(() => ({ user, setUser, signOut }), [user, setUser, signOut]);

  return (
    <AuthContext.Provider value={value}>
      {pathname === "/signin" || pathname === "/signup" ? (
        <AuthForm mode={pathname === "/signup" ? "signup" : "signin"} />
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
