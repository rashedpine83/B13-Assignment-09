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

  // const { data: session } = authClient.useSession();
  // const user = session?.user;
  // console.log(user);

  return (
    <nav
      className={`sticky top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/70 backdrop-blur-md shadow-sm py-2"
          : "bg-slate-50 py-4"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
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
          </div>

          <div className="hidden md:flex gap-8 items-center">
            <NavLink
              href="/"
              className=" font-medium text-[#0c2461] hover:text-[#D4A017] transition-colors"
            >
              Home
            </NavLink>
            <NavLink
              href="/tutors"
              className=" font-medium text-[#0c2461] hover:text-[#D4A017] transition-colors"
            >
              Tutors
            </NavLink>
            <NavLink
              href="/add-tutor"
              className=" font-medium text-[#0c2461] hover:text-[#D4A017] transition-colors"
            >
              Add Tutor
            </NavLink>
            <NavLink
              href="/my-tutors"
              className=" font-medium text-[#0c2461] hover:text-[#D4A017] transition-colors"
            >
              My Tutors
            </NavLink>
            <NavLink
              href="/my-booked"
              className=" font-medium text-[#0c2461] hover:text-[#D4A017] transition-colors"
            >
              My Booked Sessions
            </NavLink>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {!isPending && !session ? (
              <>
                <Link
                  href="/login"
                  className="font-medium text-slate-700 hover:text-blue-600 transition-colors"
                >
                  Login
                </Link>
                <Link href="/signup">
                  <Button
                    color="primary"
                    className="font-bold rounded-full px-8 shadow-lg shadow-blue-600/20 bg-[#0c2461]"
                  >
                    Sign Up Free
                  </Button>
                </Link>
              </>
            ) : (
              <div className="relative group">
                <button className="flex items-center gap-3 p-1 rounded-full hover:bg-muted transition-colors border border-transparent hover:border-border">
                  <Image
                    width={40}
                    height={40}
                    src={
                      session?.user?.image ||
                      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=400"
                    }
                    alt={session?.user?.name || "User"}
                    className="w-10 h-10 rounded-full object-cover"
                  />

                  <div className="text-left hidden lg:block">
                    <p className="text-sm font-bold truncate max-w-25">
                      {session?.user?.name}
                    </p>
                  </div>
                </button>
                <div className="absolute right-0 top-12 w-56 bg-white border border-slate-200 rounded-2xl shadow-2xl hidden group-hover:flex flex-col py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-3 border-b border-slate-100">
                    <p className="font-bold text-sm">Welcome back!</p>
                    <p className="text-xs truncate text-slate-500">
                      {session?.user?.email}
                    </p>
                  </div>
                  <Link
                    href="/dashboard"
                    className="px-4 py-2 text-sm hover:bg-muted flex items-center gap-3 transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                  </Link>
                  <Link
                    href="/settings"
                    className="px-4 py-2 text-sm hover:bg-muted flex items-center gap-3 transition-colors"
                  >
                    <User className="w-4 h-4" /> Settings
                  </Link>
                  <button
                    onClick={handleLogOut}
                    className="px-4 py-2 text-sm text-red-500 hover:bg-red-50 flex items-center gap-3 transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4" /> Log Out
                  </button>
                </div>
              </div>
            )}
            <ThemeSwitch />
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 left-30 flex justify-center z-50">
          <div className="w-[320px] bg-white border border-slate-200 shadow-2xl rounded-2xl overflow-hidden animate-in slide-in-from-top duration-300">
            {/* NAV LINKS */}
            <div className="p-2 space-y-1">
              <Link
                href="/"
                onClick={handleMobileNav}
                className="block px-3 py-2 text-sm font-medium hover:bg-slate-100 rounded-lg"
              >
                Home
              </Link>

              <Link
                href="/tutors"
                onClick={handleMobileNav}
                className="block px-3 py-2 text-sm font-medium hover:bg-slate-100 rounded-lg"
              >
                Tutors
              </Link>

              <Link
                href="/add-tutor"
                onClick={handleMobileNav}
                className="block px-3 py-2 text-sm font-medium hover:bg-slate-100 rounded-lg"
              >
                Add Tutor
              </Link>

              <Link
                href="/my-tutors"
                onClick={handleMobileNav}
                className="block px-3 py-2 text-sm font-medium hover:bg-slate-100 rounded-lg"
              >
                My Tutors
              </Link>

              <Link
                href="/my-booked"
                onClick={handleMobileNav}
                className="block px-3 py-2 text-sm font-medium hover:bg-slate-100 rounded-lg"
              >
                My Booked Sessions
              </Link>
            </div>

            {/* AUTH SECTION */}
            <div className="border-t border-slate-200 p-2">
              {!session?.user ? (
                <div className="grid grid-cols-2 gap-2">
                  <Link href="/login" onClick={handleMobileNav}>
                    <Button
                      variant="bordered"
                      className="rounded-lg w-full text-sm py-2"
                    >
                      Login
                    </Button>
                  </Link>

                  <Link href="/register" onClick={handleMobileNav}>
                    <Button className="rounded-lg w-full text-sm py-2 bg-linear-to-r from-[#0c2461] to-[#4a69bd] text-white">
                      Join
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  {/* USER */}
                  <button
                    onClick={() => setMobileUserMenu(!mobileUserMenu)}
                    className="flex items-center gap-2 w-full px-2 py-2 rounded-lg hover:bg-slate-100"
                  >
                    <Image
                      width={32}
                      height={32}
                      src={
                        session?.user?.image ||
                        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=400"
                      }
                      alt="avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />

                    <div className="text-left">
                      <p className="text-xs font-bold truncate">
                        {session?.user?.name}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">
                        {session?.user?.email}
                      </p>
                    </div>
                  </button>

                  {/* DROPDOWN */}
                  {mobileUserMenu && (
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-1 space-y-1">
                      <Link
                        href="/dashboard"
                        onClick={closeAllMenus}
                        className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-white rounded-lg"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                      </Link>

                      <Link
                        href="/settings"
                        onClick={closeAllMenus}
                        className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-white rounded-lg"
                      >
                        <User className="w-4 h-4" />
                        Settings
                      </Link>

                      <button
                        onClick={() => {
                          handleLogOut();
                          closeAllMenus();
                        }}
                        className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <LogOut className="w-4 h-4" />
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
