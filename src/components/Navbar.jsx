"use client";

import { useState, useEffect } from "react";
import { Menu, X, User, LogOut, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import NavLink from "./NavLink";
import { signOut, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import ThemeSwitch from "./ThemeSwitch";

export default function MainNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [mobileUserMenu, setMobileUserMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogOut = async () => {
    await signOut();
    router.push("/");
  };

  const handleMobileNav = () => {
    setIsMenuOpen(false);
  };

  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setMobileUserMenu(false);
  };

  return (
    <nav
      className={`sticky top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/70 dark:bg-slate-900/70 backdrop-blur-md shadow-sm py-2"
          : "bg-slate-50 dark:bg-slate-950 py-4"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              referrerPolicy="no-referrer"
              src="/assets/logo1.png"
              alt="logo"
              width={300}
              height={300}
              className="transition-transform duration-300 group-hover:scale-110"
            />
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex gap-8 items-center">
            {[
              ["/", "Home"],
              ["/tutors", "Tutors"],
              ["/add-tutor", "Add Tutor"],
              ["/my-tutors", "My Tutors"],
              ["/my-booked", "My Booked"],
            ].map(([href, label]) => (
              <NavLink
                key={href}
                href={href}
                className="font-medium text-[#0c2461] dark:text-white hover:text-[#D4A017] transition-colors"
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="hidden md:flex items-center gap-4">
            {/* AUTH */}
            {!isPending && !session ? (
              <>
                <Link
                  href="/login"
                  className="font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors"
                >
                  Login
                </Link>

                <Link href="/signup">
                  <Button className="font-bold rounded-full px-8 bg-[#0c2461] text-white">
                    Sign Up Free
                  </Button>
                </Link>
              </>
            ) : (
              <div className="relative group">
                <button className="flex items-center gap-3 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <Image
                    width={40}
                    height={40}
                    src={
                      session?.user?.image ||
                      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=400"
                    }
                    alt="user"
                    className="w-10 h-10 rounded-full object-cover"
                  />

                  <p className="text-sm font-bold hidden lg:block dark:text-white">
                    {session?.user?.name}
                  </p>
                </button>

                {/* DROPDOWN */}
                <div className="absolute right-0 top-12 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl hidden group-hover:flex flex-col py-2 z-50">
                  <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700">
                    <p className="font-bold text-sm dark:text-white">
                      Welcome back!
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-300">
                      {session?.user?.email}
                    </p>
                  </div>

                  <Link
                    href="/dashboard"
                    className="px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>

                  <Link
                    href="/settings"
                    className="px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    Settings
                  </Link>

                  <button
                    onClick={handleLogOut}
                    className="px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900 flex items-center gap-2 text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
            )}

            <ThemeSwitch />
          </div>

          {/* MOBILE BUTTON */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 dark:text-white" />
              ) : (
                <Menu className="w-6 h-6 dark:text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 flex justify-center z-50">
          <div className="w-[320px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl">
            {/* LINKS */}
            <div className="p-2 space-y-1">
              {[
                ["/", "Home"],
                ["/tutors", "Tutors"],
                ["/add-tutor", "Add Tutor"],
                ["/my-tutors", "My Tutors"],
                ["/my-booked", "My Booked"],
              ].map(([href, label]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={handleMobileNav}
                  className="block px-3 py-2 text-sm font-medium text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* AUTH */}
            <div className="border-t border-slate-200 dark:border-slate-700 p-2">
              {!session ? (
                <div className="grid grid-cols-2 gap-2">
                  <Link href="/login" onClick={handleMobileNav}>
                    <Button className="w-full text-sm">Login</Button>
                  </Link>

                  <Link href="/signup" onClick={handleMobileNav}>
                    <Button className="w-full text-sm bg-[#0c2461] text-white">
                      Join
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={() => setMobileUserMenu(!mobileUserMenu)}
                    className="flex items-center gap-2 w-full px-2 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <Image
                      width={32}
                      height={32}
                      src={session?.user?.image}
                      className="w-8 h-8 rounded-full"
                      alt="user"
                    />

                    <div className="text-left">
                      <p className="text-xs font-bold dark:text-white">
                        {session?.user?.name}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {session?.user?.email}
                      </p>
                    </div>
                  </button>

                  {mobileUserMenu && (
                    <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-1 space-y-1">
                      <Link
                        href="/dashboard"
                        onClick={closeAllMenus}
                        className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-white dark:hover:bg-slate-700 rounded-lg"
                      >
                        Dashboard
                      </Link>

                      <Link
                        href="/settings"
                        onClick={closeAllMenus}
                        className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-white dark:hover:bg-slate-700 rounded-lg"
                      >
                        Settings
                      </Link>

                      <button
                        onClick={() => {
                          handleLogOut();
                          closeAllMenus();
                        }}
                        className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
