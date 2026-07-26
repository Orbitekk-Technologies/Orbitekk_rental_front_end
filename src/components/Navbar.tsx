"use client";

import { NAVBAR_HEIGHT } from '@/lib/constants';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useRouter } from 'next/navigation';
import { signOut } from 'aws-amplify/auth';
import { useAppDispatch } from '@/state/redux';
import { api } from '@/state/api';

const Navbar = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSignOut = async () => {
    await signOut({ global: true });
    dispatch(api.util.resetApiState());
    router.replace('/signin');
    router.refresh();
  };

  return (
    <div
      className="fixed left-0 top-0 z-50 w-full shadow-xl"
      style={{ height: `${NAVBAR_HEIGHT}px` }}
    >
      <div className="flex w-full items-center justify-between bg-primary-700 px-3 py-3 text-white">
        <div className="flex items-center gap-4 md:gap-6">
          <Link href="/" className="cursor-pointer hover:text-gray-300" scroll={false}>
            <div className="flex items-center gap-3">
              <Image
                src="/logo.svg"
                alt="Shagriha Logo"
                width={24}
                height={24}
                className="h-6 w-6"
              />
              <div className="text-xl font-bold">
                SHA
                <span className="ml-1 font-bold text-secondary-500 hover:text-primary-300">GRIHA
                </span>
              </div>
            </div>
          </Link>
        </div>
        <p className="hidden text-primary-200 md:block">
          Discover the best real estate properties in your area with our easy-to-use platform.
        </p>
        <div className="flex items-center gap-5">
          {user ? (
            <Button
              variant="outline"
              className="rounded-lg border-white bg-transparent text-white hover:bg-white hover:text-primary-700"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          ) : (
            <>
              <Link href="/signin">
                <Button
                  variant="outline"
                  className="rounded-lg border-white bg-transparent text-white hover:bg-white hover:text-primary-700"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  variant="secondary"
                  className="rounded-lg bg-secondary-600 text-white hover:bg-secondary-700"
                >
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
