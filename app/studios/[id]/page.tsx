import Link from "next/link";
import {
  Camera,
  MapPin,
  DollarSign,
  Users,
  ShieldAlert,
  ArrowLeft,
  CheckCircle2,
  User,
  Calendar,
  Loader2,
} from "lucide-react";
import { Istudio } from "@/app/types/types";
import Image from "next/image";
import { Suspense } from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}

const StudioContent = async ({ params }: PageProps) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:5000/add-studio/${id}`, {
    cache: "no-store",
  });

  const studio: Istudio = await res.json();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 py-10 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Back Link */}
        <Link
          href="/studios"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Explore Studios</span>
        </Link>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left & Center: Details (2 Columns on Large Screen) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Preview */}
            <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden bg-zinc-200 dark:bg-zinc-800 shadow-xl border border-zinc-200 dark:border-zinc-800">
              {studio?.imageUrl ? (
                <Image
                  src={studio?.imageUrl}
                  alt={studio?.title}
                  fill
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-400">
                  <Camera className="w-12 h-12" />
                </div>
              )}
              <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold">
                {studio?.category}
              </span>
            </div>

            {/* Title & Location Card */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-lg space-y-4">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {studio?.title}
              </h1>

              <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                <MapPin className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>{studio?.location}</span>
              </div>

              {/* Specifications Badges Grid */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-center">
                  <Users className="w-4 h-4 text-indigo-500 mx-auto mb-1" />
                  <span className="text-xs text-zinc-400 block">
                    Max Capacity
                  </span>
                  <span className="text-sm font-bold">
                    {studio?.maxCapacity} Persons
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-center">
                  <ShieldAlert className="w-4 h-4 text-indigo-500 mx-auto mb-1" />
                  <span className="text-xs text-zinc-400 block">
                    Security Deposit
                  </span>
                  <span className="text-sm font-bold">
                    ${studio?.securityDeposit}
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-center">
                  <DollarSign className="w-4 h-4 text-indigo-500 mx-auto mb-1" />
                  <span className="text-xs text-zinc-400 block">
                    Hourly Rate
                  </span>
                  <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                    ${studio?.price}/hr
                  </span>
                </div>
              </div>
            </div>

            {/* Description / Overview */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-lg space-y-4">
              <h3 className="text-lg font-bold">Studio Overview</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed whitespace-pre-line">
                {studio?.description}
              </p>
            </div>

            {/* Amenities Section */}
            {studio?.amenities && studio?.amenities.length > 0 && (
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-lg space-y-4">
                <h3 className="text-lg font-bold">Included Amenities</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {studio?.amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs font-medium"
                    >
                      <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                      <span className="capitalize">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Booking Card & Host Details */}
          <div className="space-y-6">
            {/* Booking Card */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-xl space-y-6 sticky top-24">
              <div>
                <span className="text-xs text-zinc-400 uppercase tracking-wider block">
                  Starting Price
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
                    ${studio?.price}
                  </span>
                  <span className="text-xs text-zinc-500">/ hour</span>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-800 text-xs text-zinc-500">
                <div className="flex justify-between">
                  <span>Security Deposit:</span>
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                    ${studio?.securityDeposit}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Max Capacity:</span>
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                    {studio?.maxCapacity} Guests
                  </span>
                </div>
              </div>

              {/* Book Workspace Button */}
              <button className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer">
                <Calendar className="w-4 h-4" />
                <span>Book Workspace Now</span>
              </button>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-lg space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400">
                Hosted By
              </h3>

              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 flex items-center justify-center font-bold text-sm">
                  {studio?.userName ? (
                    studio?.userName.charAt(0).toUpperCase()
                  ) : (
                    <User className="w-5 h-5" />
                  )}
                </div>
                <div className="space-y-0.5 overflow-hidden">
                  <p className="text-sm font-bold truncate">
                    {studio?.userName || "Studio Host"}
                  </p>
                  <p className="text-xs text-zinc-500 truncate">
                    {studio?.userEmail || "No email provided"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function StudioDetailPage({ params }: PageProps) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 py-10 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-5xl mx-auto">
        <Suspense
          fallback={
            <div className="flex flex-col items-center justify-center py-28 space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-sm">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-600 dark:text-indigo-400" />
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 animate-pulse">
                Loading studio details...
              </p>
            </div>
          }
        >
          <StudioContent params={params} />
        </Suspense>
      </div>
    </div>
  );
}
