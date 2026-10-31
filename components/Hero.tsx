"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Building2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@base-ui/react";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Professional Recording & Production Studio Spaces",
      subtitle:
        "Fully equipped professional recording studios with advanced mixing consoles and high-end acoustic treatment.",
      badge: "Acoustic Recording Suite",
      bgImage:
        "https://static.vecteezy.com/system/resources/thumbnails/036/483/161/small/ai-generated-interior-of-a-recording-studio-with-lots-of-equipment-ai-generative-photo.jpg",
    },
    {
      id: 2,
      title: "High-End Podcast & Broadcast Lounges",
      subtitle:
        "Modern broadcast setups and podcast recording booths designed for crystal-clear audio production.",
      badge: "Podcast & Broadcast Lounge",
      bgImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf_8_qfkjUTT2BWGotx07BWz0PrA8kLXXQAzfiHMwMfg&s=10",
    },
    {
      id: 3,
      title: "Cinematic Sound Stages & Creator Hubs",
      subtitle:
        "Spacious production studios and creative workspace setups tailored for filmmakers, musicians, and creators.",
      badge: "Creative Production Hub",
      bgImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSryEKuOqheIubQL1j_rRA2gYaTtgTNPQSWPF7ZzZoJ9A&s=10",
    },
  ];

  // Auto-slide effect (every 5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    const next = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
    setCurrentSlide(next);
  };

  const prevSlide = () => {
    const prevent = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
    setCurrentSlide(prevent);
  };

  return (
    <section className="relative w-full h-155 sm:h-170 lg:h-187.5 bg-zinc-950 overflow-hidden">
      {/* Background Slides */}
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Background Image with Dark Gradient Overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 transition-transform duration-700"
              style={{ backgroundImage: `url(${slide.bgImage})` }}
            >
              <div className="absolute inset-0 bg-linear-to-r from-zinc-950/95 via-zinc-950/70 to-transparent" />
              <div className="absolute inset-0 bg-zinc-950/30" />
            </div>

            {/* Slide Content */}
            <div className="relative max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center">
              <div className="max-w-2xl space-y-6">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 backdrop-blur-md">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs font-semibold tracking-wide text-indigo-300 uppercase">
                    {slide.badge}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.15] tracking-tight">
                  {slide.title}
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal max-w-xl">
                  {slide.subtitle}
                </p>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link
                    href="/studios"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    <span>Explore Studios</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/studios"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-zinc-200 bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all"
                  >
                    <Building2 className="w-4 h-4 text-zinc-300" />
                    <span>Host Your Space</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Manual Controls (Prev & Next Arrows) */}
      <div className="absolute z-20 bottom-8 right-8 flex items-center gap-3">
        <button
          onClick={prevSlide}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 transition-all hover:scale-105 active:scale-95"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 transition-all hover:scale-105 active:scale-95"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Slide Navigation Dots */}
      <div className="absolute z-20 bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {slides.map((_, index) => (
          <Button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "w-8 bg-indigo-500"
                : "w-2.5 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
