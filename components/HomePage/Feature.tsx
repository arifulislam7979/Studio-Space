import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Istudio } from "@/app/types/types";
import { Suspense } from "react";


async function FeatureContent() {
 
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/featured-studios`,{
    cache: 'no-store'
  })
  const featuredData:Istudio[] = await res.json()
  

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-5">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Featured Creative Studios
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Explore our top-rated and newest production spaces ready for your
              next project.
            </p>
          </div>
          <Link href="/studios">
            <Button
              variant="outline"
              className="rounded-xl gap-2 text-xs font-semibold cursor-pointer"
            >
              View All Studios <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        {/* Studios Grid */}
        {!featuredData || featuredData.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              No featured studios available right now.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredData.map((studio) => (
              <div
                key={studio._id}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-lg flex flex-col justify-between hover:shadow-xl transition-all group"
              >
                <div>
                  {/* Studio Image & Category Badge */}
                  <div className="relative h-48 w-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                    {studio.imageUrl ? (
                      <Image
                        src={studio.imageUrl}
                        alt={studio.title}
                        fill
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-zinc-400">
                        No Image Available
                      </div>
                    )}

                    {/* Category Badge */}
                    {studio.category && (
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold uppercase tracking-wider">
                        {studio.category}
                      </span>
                    )}

                    {/* Rating Badge */}
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-zinc-800 dark:text-zinc-200 shadow-sm">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>
                        {studio.rating ? studio.rating.toFixed(1) : "4.9"}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 space-y-3">
                    <h3 className="font-bold text-lg truncate text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {studio.title}
                    </h3>

                    <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                      <span className="truncate">{studio.location}</span>
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800/60">
                      <span className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400">
                        ${studio.price}
                        <span className="text-xs font-normal text-zinc-400">
                          {" "}
                          / hr
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* View Details Action Button */}
                <div className="p-5 pt-0">
                  <Link
                    href={`/studios/${studio._id}`}
                    className="block w-full"
                  >
                    <Button className="w-full bg-zinc-900 hover:bg-indigo-600 dark:bg-zinc-800 dark:hover:bg-indigo-600 text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors shadow-sm">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default function Feature() {
  return (
    <div>
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[40vh] text-sm text-zinc-500 animate-pulse">
          loading......
        </div>
      }>
        <FeatureContent />
      </Suspense>
    </div>
  );
}