"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Camera, Sun, Moon, Menu, X } from "lucide-react";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";
import UserInfo from "./UserInfo";


export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { data: session, isPending } = useSession();

  const user = session?.user;

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    if (newTheme) {
      document.documentElement.classList.add("dark");
      toast.success("Dark mode enabled");
    } else {
      document.documentElement.classList.remove("dark");
      toast.success("Light mode enabled");
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Explore Studios", href: "/studios" },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "About Us", href: "/#about-us" },
  ];
 

  return (
    <header className="sticky top-0 z-50 transition-all bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800/80 duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* 1. Left Side: Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Camera className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Studio
              <span className="text-indigo-600 dark:text-indigo-400">
                Space
              </span>
            </span>
          </Link>

          {/* 2. Middle: Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium px-3 py-1.5 rounded-lg transition-colors hover:text-indigo-600 dark:hover:text-indigo-400 ${
                    isActive
                      ? "text-indigo-600 dark:text-indigo-300 font-semibold bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/50 dark:border-indigo-800/50"
                      : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* 3. Right Side: Theme Toggle & Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {isPending ? (
              <div className="flex items-center gap-2.5 p-1.5 animate-pulse">
                <div className="w-9 h-9 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                <div className="w-24 h-4 rounded-md bg-zinc-200 dark:bg-zinc-800" />
              </div>
            ) : user ? (
              /* Authenticated User Avatar Display */
              <div>
                <UserInfo user={user}></UserInfo>
              </div>
            ) : (
              /* Unauthenticated State: Login & Register Buttons */
              <div className="flex items-center gap-2">
                <Link
                  href="/signin"
                  className="px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-500/20 transition-all hover:scale-[1.02]"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* 4. Mobile Controls (Theme + Hamburger) */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-zinc-600 dark:text-zinc-300"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-zinc-700 dark:text-zinc-200 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 5. Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 pt-2 pb-6 space-y-3 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-zinc-700 dark:text-zinc-200 hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              {link.name}
            </Link>
          ))}

          {!user && (
            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex flex-col gap-2">
              <Link
                href="/signin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-200 text-sm font-medium hover:bg-zinc-900"
              >
                Login
              </Link>
              <Link
                href="/signup"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-medium"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
