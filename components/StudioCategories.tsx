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
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center space-y-3 mb-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Browse by Studio Categories
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
          Find the space tailored specifically to your creative workflow.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.slug}
              href={`/studios?category=${encodeURIComponent(cat.slug)}`}
              className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-3xl shadow-sm hover:shadow-md hover:border-indigo-600/50 transition-all flex flex-col items-center text-center space-y-3 cursor-pointer"
            >
              <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                {cat.name}
              </h3>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {cat.desc}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}