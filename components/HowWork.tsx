
"use client";

import { Search, CalendarClock, CreditCard, Clapperboard } from "lucide-react";

export default function HowWork() {
  const steps = [
    {
      id: 1,
      title: "1. Discover Spaces",
      description:
        "Explore top-rated film stages, podcast lounges, photo studios, and music recording suites near you.",
      icon: Search,
    },
    {
      id: 2,
      title: "2. Select Shoot Hours",
      description:
        "Choose your preferred production date and dynamic hourly slot based on real-time host availability.",
      icon: CalendarClock,
    },
    {
      id: 3,
      title: "3. Book Instantly",
      description:
        "Reserve your workspace seamlessly with transparent pricing, instant updates, and zero hidden fees.",
      icon: CreditCard,
    },
    {
      id: 4,
      title: "4. Create & Produce",
      description:
        "Step inside your fully equipped studio space and bring your creative production vision to life.",
      icon: Clapperboard,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">
            Simple 4-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            How Booking Works on <span className="text-indigo-600 dark:text-indigo-400">StudioSpace</span>
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400">
            From discovering high-end gear setups to stepping inside your reserved stage — renting creative space has never been easier.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                className="relative flex flex-col items-center text-center p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-xs hover:shadow-md transition-all duration-300 group"
              >
                {/* Step Icon Badge */}
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm">
                  <Icon className="w-8 h-8" />
                </div>

                {/* Step Title */}
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {step.description}
                </p>

                {/* Step Count Badge */}
                <span className="absolute top-4 right-4 text-xs font-bold text-zinc-400 dark:text-zinc-600">
                  0{index + 1}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}