import Link from "next/link";
import {
  Camera,
  MapPin,
  Users,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  Layers,
  Loader2,
} from "lucide-react";
import { Istudio } from "../types/types"; 
import { Suspense } from "react";

const DataChild = async () => {
  let studios: Istudio[] = [];

  try {
    const res = await fetch("http://localhost:5000/add-studio", {
      cache: "no-store",
    });
    studios = await res.json();
  } catch (error) {
    console.error("Failed to fetch studios:", error);
  }

  // Condition: If no studios found
  if (studios.length === 0) {
    return (
      <div className="text-center py-20 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl space-y-4">
        <Layers className="w-12 h-12 text-zinc-400 mx-auto" />
        <h3 className="text-lg font-bold">No Studios Available Yet</h3>
        <p className="text-sm text-zinc-500">
          Check back later or list your own studio space.
        </p>
        <Link
          href="/add-studio"
          className="inline-block px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold shadow-md hover:bg-indigo-500 transition"
        >
          Add New Studio
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Total Count Badge */}
      <div className="flex justify-end">
        <div className="text-xs font-semibold px-4 py-2 rounded-xl bg-zinc-200/60 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
          Total Studios: {studios.length}
        </div>
      </div>

      {/* Studios Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {studios.map((studio) => (
          <div
            key={studio._id}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Studio Image Container */}
              <div className="relative h-48 w-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                {studio.imageUrl ? (
                  <img
                    src={studio.imageUrl}
                    alt={studio.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-400">
                    <Camera className="w-8 h-8" />
                  </div>
                )}
                {/* Category Badge */}
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold">
                  {studio.category}
                </span>
              </div>

              {/* Content Info */}
              <div className="p-5 space-y-3">
                <h3 className="text-lg font-bold truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {studio.title}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                  <MapPin className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span className="truncate">{studio.location}</span>
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-300 line-clamp-2">
                  {studio.description}
                </p>

                {/* Meta Info (Capacity & Deposit) */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800 text-xs text-zinc-500">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Capacity: {studio.maxCapacity}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Deposit: ${studio.securityDeposit}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Footer: Price & View Details Button */}
            <div className="p-5 pt-0 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 mt-4">
              <div>
                <span className="text-xs text-zinc-400 uppercase tracking-wider block">
                  Hourly Rate
                </span>
                <span className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400">
                  ${studio.price}
                  <span className="text-xs font-normal text-zinc-500">
                    /hr
                  </span>
                </span>
              </div>

              <Link
                href={`/studios/${studio._id}`}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all group-hover:translate-x-1"
              >
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


const StudiosPage = () => {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 py-10 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Header (Single Instance) */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explore Creative Spaces</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Available Studios
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Browse through professional production studios, photo spaces, and
              creative venues.
            </p>
          </div>
        </div>

        {/* Suspense Loading Fallback */}
        <Suspense
          fallback={
            <div className="flex flex-col items-center justify-center py-24 space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-sm">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-600 dark:text-indigo-400" />
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 animate-pulse">
                Loading studios, please wait...
              </p>
            </div>
          }
        >
          <DataChild />
        </Suspense>
      </div>
    </div>
  );
};

export default StudiosPage;