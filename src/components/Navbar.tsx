"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, MapPin, User, LogOut, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavbarProps {
  user?: {
    name: string;
    email: string;
  } | null;
}

export function Navbar({ user }: NavbarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/explore", label: "Explore Lands" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500",
        scrolled
          ? "h-16 bg-white/80 backdrop-blur-xl shadow-premium border-b border-slate-200/50"
          : "h-20 bg-transparent border-b border-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 h-full flex items-center justify-between sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/25 transition-transform group-hover:scale-110">
            <MapPin className="h-6 w-6 text-white" />
            <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="text-2xl font-bold font-heading tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent group-hover:from-emerald-600 group-hover:to-teal-600 transition-all">
            Swadharma Properties
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-8">
          <div className="flex items-center gap-8 mr-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative py-1 text-sm font-medium transition-all hover:text-emerald-600",
                  pathname === link.href ? "text-emerald-600" : "text-slate-600"
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full bg-emerald-500 rounded-full" />
                )}
              </Link>
            ))}
          </div>

          <div className="h-6 w-px bg-slate-200 mx-2" />

          {user ? (
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="outline" size="sm" className="rounded-xl border-slate-200 hover:border-emerald-200 hover:bg-emerald-50 text-slate-700 font-semibold gap-2">
                  <User className="h-4 w-4 text-emerald-600" />
                  Dashboard
                </Button>
              </Link>
              <form action="/api/auth/signout" method="POST">
                <Button variant="ghost" size="icon" type="submit" className="rounded-xl hover:bg-red-50 hover:text-red-600">
                  <LogOut className="h-4 w-4" />
                </Button>
              </form>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost" size="sm" className="font-semibold text-slate-600 hover:text-emerald-600">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="rounded-xl px-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:shadow-xl hover:shadow-emerald-500/25 transition-all font-semibold">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden rounded-xl p-2.5 text-slate-600 hover:bg-slate-100 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "fixed inset-x-0 top-[64px] z-50 overflow-hidden bg-white/95 backdrop-blur-xl transition-all duration-500 md:hidden",
          isOpen ? "max-h-screen border-b border-slate-200 py-6" : "max-h-0"
        )}
      >
        <div className="flex flex-col gap-5 px-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center justify-between text-base font-semibold",
                pathname === link.href ? "text-emerald-600" : "text-slate-700"
              )}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
              <ChevronRight className="h-4 w-4 opacity-50" />
            </Link>
          ))}

          <div className="h-px w-full bg-slate-100 my-2" />

          {user ? (
            <div className="flex flex-col gap-3">
              <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full rounded-xl justify-start gap-3 border-slate-200">
                  <User className="h-5 w-5 text-emerald-600" />
                  Dashboard
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Link href="/login" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full rounded-xl border-slate-200">
                  Login
                </Button>
              </Link>
              <Link href="/register" onClick={() => setIsOpen(false)}>
                <Button className="w-full rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
