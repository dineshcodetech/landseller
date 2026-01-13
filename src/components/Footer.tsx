import Link from "next/link";
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">LandSeller</span>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-400">
              Your trusted marketplace for buying and selling land properties. 
              We connect landowners with potential buyers, making property 
              transactions simple, transparent, and secure.
            </p>
            <div className="mt-6 flex gap-4">
              <a href="#" className="rounded-lg bg-slate-800 p-2 transition-colors hover:bg-emerald-600">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="rounded-lg bg-slate-800 p-2 transition-colors hover:bg-emerald-600">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="rounded-lg bg-slate-800 p-2 transition-colors hover:bg-emerald-600">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="rounded-lg bg-slate-800 p-2 transition-colors hover:bg-emerald-600">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/" className="text-sm hover:text-emerald-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/explore" className="text-sm hover:text-emerald-400 transition-colors">
                  Explore Lands
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-sm hover:text-emerald-400 transition-colors">
                  Sell Your Land
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-sm hover:text-emerald-400 transition-colors">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-emerald-400" />
                support@landseller.com
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-emerald-400" />
                +91 98765 43210
              </li>
              <li className="flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 text-emerald-400 mt-1" />
                123 Land Avenue, Real Estate Hub,<br />
                Mumbai, Maharashtra 400001
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-8">
          <p className="text-center text-sm text-slate-500">
            © {new Date().getFullYear()} LandSeller. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
