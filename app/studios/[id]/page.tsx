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
  Star,
  Loader2,
} from "lucide-react";
import { Istudio } from "@/app/types/types";
import { Suspense } from "react";
import BookingBox from "@/components/BookingBox";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTokenFromServer } from "@/lib/getTokenServer";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function StudioDetailContent({ params }: PageProps) {
  const token = await getTokenFromServer()
  const { id } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-studio/${id}`, {
    cache: "no-store",
    headers: {
      authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) {
    notFound();
  }

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
          {/* Left & Center: Details */}
          <div className="lg:col-span-2 space-y-6">
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

            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-lg space-y-4">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {studio?.title}
              </h1>

              <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                <MapPin className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>{studio?.location}</span>
              </div>

              {/* 4 Cards Grid including Rating */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                {/* Max Capacity */}
                <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-center">
                  <Users className="w-4 h-4 text-indigo-500 mx-auto mb-1" />
                  <span className="text-xs text-zinc-400 block">
                    Max Capacity
                  </span>
                  <span className="text-sm font-bold">
                    {studio?.maxCapacity} Persons
                  </span>
                </div>

                {/* Rating Box */}
                <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-center">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500 mx-auto mb-1" />
                  <span className="text-xs text-zinc-400 block">Rating</span>
                  <span className="text-sm font-bold text-amber-600 dark:text-amber-400">
                    {studio?.rating ? studio.rating.toFixed(1) : "4.9"} / 5.0
                  </span>
                </div>

                {/* Security Deposit */}
                <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-center">
                  <ShieldAlert className="w-4 h-4 text-indigo-500 mx-auto mb-1" />
                  <span className="text-xs text-zinc-400 block">
                    Security Deposit
                  </span>
                  <span className="text-sm font-bold">
                    ${studio?.securityDeposit}
                  </span>
                </div>

                {/* Hourly Rate */}
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

            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-lg space-y-4">
              <h3 className="text-lg font-bold">Studio Overview</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed whitespace-pre-line">
                {studio?.description}
              </p>
            </div>

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

          {/* Right Column: Booking Box & Host Details */}
          <div className="space-y-6">
            <BookingBox studio={studio} />

            {/* Hosted By Section */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-lg space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400">
                Hosted By
              </h3>

              <div className="flex items-center gap-3 pt-2">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-indigo-100 dark:bg-indigo-950 border border-indigo-500/30 flex items-center justify-center font-bold text-sm text-indigo-600 dark:text-indigo-300 relative">
                  {studio?.userImage ? (
                    <Image
                      src={studio?.userImage}
                      alt={studio?.userName || "Studio Host"}
                      fill
                      className="w-full h-full object-cover"
                    />
                  ) : studio?.userName ? (
                    studio.userName.charAt(0).toUpperCase()
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
}

export default function StudioDetailPage({ params }: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
          <div className="flex flex-col items-center justify-center py-28 space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-12 shadow-sm">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600 dark:text-indigo-400" />
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 animate-pulse">
              Loading studio details...
            </p>
          </div>
        </div>
      }
    >
      <StudioDetailContent params={params} />
    </Suspense>
  );
}
