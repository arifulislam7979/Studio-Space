import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";
import Footer from "@/components/Footer";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StudioSpace | Peer-to-Peer Studio Rental Marketplace",
  description: "Discover and book top-rated production studios, photo spaces, podcast lounges, and sound stages for your creative workflow.",
  icons: {
    icon: '/images/camera.png'
  }
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Suspense fallback={null}>
          <Navbar></Navbar>
        </Suspense>
        {children}
        <Footer></Footer>
        <Toaster position="top-center" richColors duration={1000} />
      </body>
    </html>
  );
}
