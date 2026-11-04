"use client";

import { Search, CalendarClock, CreditCard, Clapperboard } from "lucide-react";

export default function HowWork() {
  const steps = [
    {
      id: 1,
      title: "Discover Spaces",
      description:
        "Explore top-rated film stages, podcast lounges, photo studios, and music recording suites near you.",
      icon: Search,
    },
    {
      id: 2,
      title: "Select Shoot Hours",
      description:
        "Choose your preferred production date and dynamic hourly slot based on real-time host availability.",
      icon: CalendarClock,
    },
    {
      id: 3,
      title: "Book Instantly",
      description:
        "Reserve your workspace seamlessly with transparent pricing, instant updates, and zero hidden fees.",
      icon: CreditCard,
    },
    {
      id: 4,
      title: "Create & Produce",
      description:
        "Step inside your fully equipped studio space and bring your creative production vision to life.",
      icon: Clapperboard,
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-zinc-50/50 dark:bg-zinc-900/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase bg-indigo-50 dark:bg-indigo-950/60 px-3.5 py-1.5 rounded-full border border-indigo-200/50 dark:border-indigo-800/50">
            Simple 4-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            How Booking Works on{" "}
            <span className="text-indigo-600 dark:text-indigo-400">
              StudioSpace
            </span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            From discovering high-end gear setups to stepping inside your
            reserved stage — renting creative space has never been easier.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                className="relative flex flex-col items-start text-left p-8 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-3xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 hover:border-indigo-500/40 dark:hover:border-indigo-500/40 transition-all duration-300 group"
              >
                {/* Top Row: Icon & Step Number */}
                <div className="w-full flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-inner">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-black text-zinc-200 dark:text-zinc-800 group-hover:text-indigo-500/30 transition-colors">
                    0{index + 1}
                  </span>
                </div>

                {/* Step Title */}
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {step.description}
                </p>

                {/* Bottom glowing accent on hover */}
                <div className="absolute bottom-0 left-8 right-8 h-[2px] bg-linear-to-r from-transparent via-indigo-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}