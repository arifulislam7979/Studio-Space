"use client";

import Link from "next/link";
import {
  Camera,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Globe,
  Share2,
  MessageSquare,
  AtSign,
} from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-800/80 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-zinc-800/60">
          {/* 1. Brand Column */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/20 group-hover:scale-105 transition-transform shrink-0 overflow-hidden">
                <Image
                  src="/images/camera.png"
                  alt="StudioSpace Logo"
                  width={28}
                  height={28}
                  className="object-contain brightness-0 invert"
                />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Studio<span className="text-indigo-400">Space</span>
              </span>
            </Link>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
              The leading peer-to-peer marketplace connecting filmmakers,
              photographers, audio engineers, and podcasters with high-end
              production spaces.
            </p>

            {/* Newsletter Input */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Subscribe for space updates
              </span>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex items-center gap-2 max-w-sm"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold transition-all shrink-0 flex items-center justify-center"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          {/* 2. Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-indigo-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/studios"
                  className="hover:text-indigo-400 transition-colors"
                >
                  All Studios
                </Link>
              </li>
              <li>
                <Link
                  href="/#how-it-works"
                  className="hover:text-indigo-400 transition-colors"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/#about-us"
                  className="hover:text-indigo-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Studio Categories */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Categories
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/studios?category=recording"
                  className="hover:text-indigo-400 transition-colors"
                >
                  Recording Studios
                </Link>
              </li>
              <li>
                <Link
                  href="/studios?category=podcast"
                  className="hover:text-indigo-400 transition-colors"
                >
                  Podcast Lounges
                </Link>
              </li>
              <li>
                <Link
                  href="/studios?category=photo"
                  className="hover:text-indigo-400 transition-colors"
                >
                  Photo Cyc Walls
                </Link>
              </li>
              <li>
                <Link
                  href="/studios?category=film"
                  className="hover:text-indigo-400 transition-colors"
                >
                  Film Sound Stages
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. Contact & Support */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>support@studiospace.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>+1 (800) 555-0199</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>79 Production Ave, Suite 400, Creative City</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Social Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© 2026 StudioSpace Platform Inc. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              aria-label="Website"
            >
              <Globe className="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              aria-label="Social"
            >
              <Share2 className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              aria-label="Community"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              aria-label="Contact"
            >
              <AtSign className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
