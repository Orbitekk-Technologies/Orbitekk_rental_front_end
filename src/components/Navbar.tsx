"use client";

import { FAVORITE_GLOW_EVENT, NAVBAR_HEIGHT } from "@/lib/constants";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  useGetAuthUserQuery,
  useGetConversationsQuery,
  useGetUnreadConversationCountQuery,
} from "@/state/api";
import { useAuth } from "@/app/(auth)/authProvider";
import { usePathname, useRouter } from "next/navigation";
import { Bell, Menu, MessageCircle } from "lucide-react";
import { LockKeyhole, LockKeyholeOpen, X } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { SidebarTrigger } from "./ui/sidebar";
import { useMessageEvents } from "@/hooks/use-message-events";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const marketingLinks = [
  { label: "Home", href: "/" },
  { label: "Contact Us", href: "/contact" },
  { label: "Listings", href: "/search" },
  { label: "Favourites", href: "/tenants/favourites" },
];

const Navbar = () => {
  const { data: authUser } = useGetAuthUserQuery();
  const router = useRouter();
  const pathname = usePathname();
  const { signOut } = useAuth();
  const [showFavoriteGlow, setShowFavoriteGlow] = useState(false);
  const { data: unreadData } = useGetUnreadConversationCountQuery(undefined, {
    skip: !authUser,
    pollingInterval: 5000,
    refetchOnFocus: true,
  });
  const { data: conversations = [] } = useGetConversationsQuery(undefined, {
    skip: !authUser,
    pollingInterval: 5000,
    refetchOnFocus: true,
  });
  const unreadCount = unreadData?.count ?? 0;
  const unreadConversations = conversations.filter((conversation) => conversation.unread);
  useMessageEvents(Boolean(authUser));

  useEffect(() => {
    let timeout: number | undefined;
    const showGlow = () => {
      window.clearTimeout(timeout);
      setShowFavoriteGlow(true);
      timeout = window.setTimeout(() => setShowFavoriteGlow(false), 1600);
    };
    window.addEventListener(FAVORITE_GLOW_EVENT, showGlow);
    return () => {
      window.removeEventListener(FAVORITE_GLOW_EVENT, showGlow);
      window.clearTimeout(timeout);
    };
  }, []);

  const isDashboardPage =
    pathname.includes("/managers") || pathname.includes("/tenants") || pathname.startsWith("/messages");
  const isLandingPage = pathname === "/" || pathname === "/landing";

  const handleSignOut = () => {
    signOut();
    router.replace("/");
  };

  const addPropertyHref = authUser
    ? "/managers/newproperty"
    : "/signin?returnTo=%2Fmanagers%2Fnewproperty";

  const isActiveLink = (href: string) =>
    href === "/" ? pathname === href : pathname.startsWith(href);

  const navLabel = (label: string) => (
    <span className="relative inline-flex items-center">
      {label}
      {label === "Favourites" && showFavoriteGlow && (
        <span className="absolute -right-3 -top-1 flex h-2.5 w-2.5" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary-500 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-secondary-600 shadow-[0_0_10px_rgba(147,51,234,0.9)]" />
        </span>
      )}
    </span>
  );

  if (isLandingPage) {
    return (
      <header
        className="fixed inset-x-0 top-0 z-50 bg-white"
        style={{ height: `${NAVBAR_HEIGHT}px` }}
      >
        <div className="mx-auto flex h-full w-full max-w-[1536px] items-center justify-between px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button type="button" variant="ghost" size="icon" aria-label="Open navigation menu" className="hover:bg-gray-100">
                  <Menu className="h-6 w-6 text-gray-950" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex w-[75vw] max-w-sm flex-col bg-white p-7 text-gray-950 [&>button]:hidden">
                <SheetHeader className="text-left">
                  <div className="flex items-center justify-between">
                    <BrandLogo />
                    <SheetClose asChild>
                      <Button type="button" variant="ghost" size="icon" aria-label="Close navigation menu">
                        <X className="h-6 w-6" />
                      </Button>
                    </SheetClose>
                  </div>
                  <SheetTitle className="pt-8 text-left text-lg">Menu</SheetTitle>
                  <SheetDescription className="sr-only">Primary navigation</SheetDescription>
                </SheetHeader>
                <nav className="mt-4 flex flex-col gap-1">
                  {[
                    { label: "Home", href: "/" },
                    { label: "Contact Us", href: "/contact" },
                    { label: "Listings", href: "/search" },
                    { label: "Favourites", href: "/tenants/favourites" },
                  ].map((item) => (
                    <SheetClose key={item.href} asChild>
                      <Link href={item.href} className="rounded-md py-3 text-base hover:text-secondary-500">
                        {navLabel(item.label)}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
                <SheetClose asChild>
                  <Button asChild className="mt-auto h-12 w-fit bg-secondary-500 px-5 text-white hover:bg-secondary-600">
                    <Link href={addPropertyHref}>Add Listings</Link>
                  </Button>
                </SheetClose>
              </SheetContent>
            </Sheet>
          </div>

          <BrandLogo className="hidden lg:inline-flex" />
          <BrandLogo compact className="absolute left-1/2 -translate-x-1/2 lg:hidden" />

          <nav aria-label="Primary navigation" className="hidden items-center gap-12 lg:flex">
            {[
              { label: "Home", href: "/" },
              { label: "Contact", href: "/contact" },
              { label: "Listings", href: "/search" },
              { label: "Favourites", href: "/tenants/favourites" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-base transition-colors hover:text-secondary-500 ${isActiveLink(item.href) ? "text-secondary-500" : "text-gray-950"}`}
              >
                {navLabel(item.label)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-7">
            <Button asChild className="hidden h-12 bg-secondary-500 px-5 text-base text-white hover:bg-secondary-600 lg:inline-flex">
              <Link href={addPropertyHref}>Add Listings</Link>
            </Button>
            <Link href={authUser ? "/managers/properties" : "/signin"} className="group flex items-center gap-3 text-sm text-gray-950 transition-colors hover:text-secondary-500 sm:text-base">
              <span className="relative hidden h-5 w-5 sm:block" aria-hidden="true">
                <LockKeyhole className="absolute inset-0 h-5 w-5 transition-opacity duration-200 group-hover:opacity-0" />
                <LockKeyholeOpen className="absolute inset-0 h-5 w-5 text-secondary-500 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              </span>
              {authUser ? "Dashboard" : "Login/Sign Up"}
            </Link>
          </div>
        </div>
      </header>
    );
  }

  return (
    <div
      className="fixed left-0 top-0 z-50 w-full border-b border-gray-100 bg-white"
      style={{ height: `${NAVBAR_HEIGHT}px` }}
    >
      <div className="mx-auto flex h-full w-full max-w-[1536px] items-center justify-between bg-white px-6 text-gray-950 sm:px-10 lg:px-16 xl:px-20">
        <div className="flex items-center gap-4 md:gap-6">
          {isDashboardPage && (
            <div className="md:hidden">
              <SidebarTrigger />
            </div>
          )}
          <BrandLogo />
        </div>
        {!isDashboardPage && (
          <nav aria-label="Primary navigation" className="hidden items-center gap-10 lg:flex">
            {marketingLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActiveLink(item.href) ? "page" : undefined}
                className={`font-medium transition-colors hover:text-secondary-500 ${
                  isActiveLink(item.href) ? "text-secondary-500" : "text-gray-950"
                }`}
              >
                {navLabel(item.label)}
              </Link>
            ))}
          </nav>
        )}
        <div className="flex items-center gap-5">
          {isDashboardPage && (
            <Button asChild className="hidden h-12 bg-secondary-500 px-6 text-white hover:bg-secondary-600 sm:inline-flex">
              <Link href="/managers/newproperty">Add Listings</Link>
            </Button>
          )}
          {!isDashboardPage && (
            <Button
              className="hidden h-12 bg-secondary-500 px-5 text-white hover:bg-secondary-600 lg:inline-flex"
              onClick={() => router.push(addPropertyHref)}
            >
              Add Listings
            </Button>
          )}
          {authUser ? (
            <>
              <Link
                href="/messages"
                className="relative rounded-full p-2 text-gray-700 transition-colors hover:bg-secondary-100 hover:text-secondary-500"
                aria-label={unreadCount ? `Messages, ${unreadCount} unread` : "Messages"}
              >
                <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
                {unreadCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex min-h-4 min-w-4 items-center justify-center rounded-full bg-secondary-500 px-1 text-[10px] font-bold text-white">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger
                  className="relative rounded-full p-2 text-gray-700 transition-colors hover:bg-secondary-100 hover:text-secondary-500 focus:outline-none"
                  aria-label={unreadCount ? `Notifications, ${unreadCount} unread` : "Notifications"}
                >
                  <Bell className="h-5 w-5 sm:h-6 sm:w-6" />
                  {unreadCount > 0 && <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-secondary-500" />}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80 bg-white p-2 text-gray-950">
                  <div className="px-2 py-2">
                    <p className="font-semibold">Notifications</p>
                    <p className="text-xs text-gray-500">{unreadCount ? `${unreadCount} unread conversation${unreadCount === 1 ? "" : "s"}` : "You’re all caught up"}</p>
                  </div>
                  <DropdownMenuSeparator />
                  {unreadConversations.length === 0 ? (
                    <p className="px-2 py-5 text-center text-sm text-gray-500">No new notifications</p>
                  ) : (
                    unreadConversations.slice(0, 5).map((conversation) => (
                      <DropdownMenuItem key={conversation.id} asChild className="cursor-pointer p-0 focus:bg-secondary-100">
                        <Link href="/messages" className="block w-full px-3 py-2.5">
                          <span className="block truncate text-sm font-semibold">New message from {conversation.otherUserName}</span>
                          <span className="block truncate text-xs text-gray-500">{conversation.lastMessage || conversation.propertyName}</span>
                        </Link>
                      </DropdownMenuItem>
                    ))
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="cursor-pointer justify-center font-medium text-secondary-500 focus:bg-secondary-100 focus:text-secondary-500">
                    <Link href="/messages">View all messages</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 focus:outline-none">
                  <Avatar>
                    <AvatarImage src={authUser.userInfo?.image} />
                    <AvatarFallback className="bg-secondary-100 text-secondary-700">
                      {authUser.userRole?.[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <p className="hidden text-gray-700 md:block">
                    {authUser.userInfo?.name}
                  </p>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white text-primary-700">
                  <DropdownMenuItem
                    className="cursor-pointer font-bold hover:!bg-secondary-100 hover:!text-secondary-700"
                    onClick={() =>
                      router.push(
                        "/managers/properties",
                        { scroll: false }
                      )
                    }
                  >
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-primary-200" />
                  <DropdownMenuItem
                    className="cursor-pointer hover:!bg-secondary-100 hover:!text-secondary-700"
                    onClick={() =>
                      router.push(
                        "/managers/settings",
                        { scroll: false }
                      )
                    }
                  >
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer hover:!bg-secondary-100 hover:!text-secondary-700"
                    onClick={handleSignOut}
                  >
                    Signout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="order-1 hidden items-center gap-3 sm:flex">
              <Link href="/signin" className="group flex h-12 items-center gap-3 px-1 text-base text-gray-950 transition-colors hover:text-secondary-500">
                <span className="relative h-5 w-5" aria-hidden="true">
                  <LockKeyhole className="absolute inset-0 h-5 w-5 transition-opacity duration-200 group-hover:opacity-0" />
                  <LockKeyholeOpen className="absolute inset-0 h-5 w-5 text-secondary-500 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                </span>
                Login/Sign Up
              </Link>
            </div>
          )}
          {!isDashboardPage && (
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-gray-950 hover:bg-gray-100 hover:text-gray-950 lg:hidden"
                  aria-label="Open navigation menu"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="flex flex-col bg-white text-gray-950">
                <SheetHeader className="text-left">
                  <SheetTitle className="text-gray-950">
                    SHA<span className="font-light text-secondary-500">GRIHA</span>
                  </SheetTitle>
                  <SheetDescription className="text-gray-500">
                    Find and manage your next rental home.
                  </SheetDescription>
                </SheetHeader>
                <nav aria-label="Mobile navigation" className="mt-8 flex flex-col gap-2">
                  {marketingLinks.map((item) => (
                    <SheetClose key={item.href} asChild>
                      <Link
                        href={item.href}
                        aria-current={isActiveLink(item.href) ? "page" : undefined}
                        className={`px-3 py-3 text-base font-medium transition-colors hover:text-secondary-500 ${
                          isActiveLink(item.href) ? "text-secondary-500" : "text-gray-950"
                        }`}
                      >
                        {navLabel(item.label)}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
                <div className="mt-auto space-y-3">
                  <SheetClose asChild>
                    <Button
                      className="h-12 w-full bg-secondary-500 px-5 text-white hover:bg-secondary-600"
                      onClick={() => router.push(addPropertyHref)}
                    >
                      Add Listings
                    </Button>
                  </SheetClose>
                  {!authUser && (
                    <div className="sm:hidden">
                      <SheetClose asChild>
                        <Link href="/signin">
                          <Button variant="outline" className="h-12 w-full border-gray-300 bg-white px-5 text-gray-950 hover:bg-gray-100">
                            Sign In
                          </Button>
                        </Link>
                      </SheetClose>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
