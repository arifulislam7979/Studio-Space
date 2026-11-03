import Link from "next/link";
import { Camera, Film, Mic2, Music, Palette } from "lucide-react";

const categories = [
  { name: "Photo Studios", slug: "Photo Studio", icon: Camera, desc: "Cyc walls, lighting grids & natural light" },
  { name: "Sound Stages", slug: "Film Stage", icon: Film, desc: "Large format video & film production" },
  { name: "Podcast Lounge", slug: "Podcast Lounge", icon: Mic2, desc: "Acoustic treated recording booths" },
  { name: "Music Suites", slug: "Music Suite", icon: Music, desc: "Mixing, mastering & tracking spaces" },
  { name: "Art Workshops", slug: "Workshop", icon: Palette, desc: "Open space for creative crafts & arts" },
];

export default function StudioCategories() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center space-y-3 mb-12">
        <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-200/50 dark:border-indigo-800/50">
          Discover Categories
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
          Browse by Studio Categories
        </h2>
        <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto">
          Find the space tailored specifically to your creative workflow.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.slug}
              href={`/studios?category=${encodeURIComponent(cat.slug)}`}
              className="group relative bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 p-6 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 hover:border-indigo-500/40 dark:hover:border-indigo-500/40 transition-all duration-300 flex flex-col items-center text-center space-y-4 cursor-pointer overflow-hidden"
            >
              {/* Subtle background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              <div className="relative p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-inner">
                <Icon className="w-6 h-6" />
              </div>

              <div className="space-y-1 z-10">
                <h3 className="font-bold text-sm sm:text-base text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {cat.desc}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}