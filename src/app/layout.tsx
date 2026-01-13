import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { auth } from "@/lib/auth";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LandSeller - Premium Land Marketplace",
  description:
    "Discover and sell premium land properties. Your trusted marketplace for residential, commercial, agricultural, and industrial land.",
  keywords: [
    "land for sale",
    "buy land",
    "sell land",
    "real estate",
    "property",
    "land marketplace",
  ],
  openGraph: {
    title: "LandSeller - Premium Land Marketplace",
    description:
      "Discover and sell premium land properties. Your trusted marketplace for all types of land.",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body className="font-sans antialiased text-slate-900 bg-white">
        <Navbar user={session?.user} />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
