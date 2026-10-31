"use client";

import Link from "next/link";
import { 
  ShieldCheck, 
  UserCheck, 
  Camera, 
  Headphones, 
  Sparkles, 
  Award, 
  Users, 
  Building 
} from "lucide-react";

export default function AboutPage() {
  const guarantees = [
    {
      id: 1,
      title: "Liability Protection",
      description:
        "Comprehensive coverage for both studio owners and renters to ensure complete peace of mind during every creative session.",
      icon: ShieldCheck,
    },
    {
      id: 2,
      title: "Verified Profiles",
      description:
        "Strict identity and studio verification processes to maintain a safe, reliable, and authentic marketplace for all creators.",
      icon: UserCheck,
    },
    {
      id: 3,
      title: "Equipment & Space Safety",
      description:
        "Guaranteed equipment safety protocols and protected spaces designed for high-value cinema and studio production gear.",
      icon: Camera,
    },
    {
      id: 4,
      title: "24/7 Host & Creator Support",
      description:
        "Our dedicated support team is available around the clock to assist with booking inquiries, technical setup, or emergency assistance.",
      icon: Headphones,
    },
  ];

  const stats = [
    { label: "Creative Studios", value: "1,200+", icon: Building },
    { label: "Active Creators", value: "25,000+", icon: Users },
    { label: "Successful Shoots", value: "50,000+", icon: Sparkles },
    { label: "Satisfaction Rate", value: "99.4%", icon: Award },
  ];

  return (
    <div id="about-us" className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      
      {/* 1. Hero / Header Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-xs font-semibold tracking-wide uppercase">
          <Sparkles className="w-4 h-4" />
          <span>Empowering Global Creators</span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight">
          Redefining How Creators Discover & Share <span className="text-indigo-600 dark:text-indigo-400">Production Spaces</span>
        </h1>
        
        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          StudioSpace is the premier peer-to-peer marketplace connecting filmmakers, photographers, podcasters, and musicians with high-performance creative environments worldwide.
        </p>
      </section>

      {/* 2. Stats Counter Section */}
      <section className="border-y border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="flex flex-col items-center text-center space-y-2">
                  <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 mb-1">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                    {stat.value}
                  </span>
                  <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Section 2: Host Guarantee & Creator Support */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">
            Trust & Security First
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Host Guarantee & Creator Support
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400">
            We back every production slot with world-class safety assurances, verified users, and complete operational transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {guarantees.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="flex gap-5 p-6 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs hover:border-indigo-500/50 hover:shadow-md transition-all duration-300"
              >
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/20">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Call-to-Action (CTA) Banner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl bg-indigo-600 dark:bg-indigo-950 border border-indigo-500/30 p-8 sm:p-12 overflow-hidden text-center text-white shadow-xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Book or Host Your Space?
            </h2>
            <p className="text-indigo-100 text-base sm:text-lg leading-relaxed">
              Join thousands of filmmakers, photographers, and audio engineers who trust StudioSpace for their production needs.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <Link
                href="/studios"
                className="px-6 py-3.5 rounded-xl font-semibold bg-white text-indigo-600 hover:bg-indigo-50 transition-colors shadow-md"
              >
                Explore Studios
              </Link>
              <Link
                href="/add-studio"
                className="px-6 py-3.5 rounded-xl font-semibold bg-indigo-700/80 hover:bg-indigo-700 border border-indigo-400/30 text-white transition-colors"
              >
                List Your Studio
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}