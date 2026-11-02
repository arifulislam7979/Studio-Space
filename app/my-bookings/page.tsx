import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import Image from "next/image";
import { IBooking } from "../types/types";
import CancelBooking from "@/components/CancelBooking";

const MyBookingsContent = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  if (!user?.email) {
    redirect("/login");
  }

  let bookings: IBooking[] = [];
  try {
    const res = await fetch(`http://localhost:5000/my-bookings/${user.email}`, {
      cache: "no-store",
    });
    if (res.ok) {
      bookings = await res.json();
    }
  } catch (err) {
    console.error("Failed to fetch bookings:", err);
  }

  const getStatusBadge = (status: string) => {
    const formattedStatus = status.toLowerCase();
    switch (formattedStatus) {
      case "pending":
        return "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border-amber-200 dark:border-amber-900";
      case "confirmed":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900";
      case "completed":
        return "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400 border-indigo-200 dark:border-indigo-900";
      case "cancelled":
        return "bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400 border-red-200 dark:border-red-900";
      default:
        return "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700";
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 py-10 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-5">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            My Studio Bookings
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Track, review, or cancel your upcoming creative space reservations.
          </p>
        </div>

        {!bookings || bookings.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 space-y-3 shadow-sm">
            <AlertCircle className="w-10 h-10 text-zinc-400 mx-auto" />
            <h3 className="text-base font-bold text-zinc-700 dark:text-zinc-300">
              No Bookings Found
            </h3>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
              You haven&apos;t reserved any studio spaces yet. Explore available
              studios to make your first booking!
            </p>
          </div>
        ) : (
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 text-xs font-bold text-zinc-500 uppercase tracking-wider">
                    <th className="py-4 px-6">Studio</th>
                    <th className="py-4 px-6">Date & Hours</th>
                    <th className="py-4 px-6">Price</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-sm">
                  {bookings.map((booking) => (
                    <tr
                      key={booking._id}
                      className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="relative h-12 w-16 rounded-xl overflow-hidden bg-zinc-200 dark:bg-zinc-800 shrink-0">
                            {booking.imageUrl ? (
                              <Image
                                src={booking.imageUrl}
                                alt={booking.studioTitle}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[10px] text-zinc-400">
                                No Img
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-zinc-900 dark:text-zinc-100 truncate max-w-xs">
                              {booking.studioTitle}
                            </p>
                            <span className="text-xs text-zinc-500">
                              Deposit: ${booking.securityDeposit || 0}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-xs text-zinc-500 dark:text-zinc-400">
                        <p className="font-semibold text-zinc-700 dark:text-zinc-300">
                          {booking.date}
                        </p>
                        <p>
                          {booking.hours} Hours (${booking.hourlyRate}/hr)
                        </p>
                      </td>
                      <td className="py-4 px-6 font-extrabold text-indigo-600 dark:text-indigo-400 text-xs">
                        ${booking.totalPrice}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider border ${getStatusBadge(
                            booking.status,
                          )}`}
                        >
                          {booking.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="max-w-45 mx-auto">
                          {booking.status.toLowerCase() === "pending" ? (
                            <CancelBooking bookingId={booking._id} />
                          ) : (
                            <div className="text-center py-2 text-xs font-semibold text-zinc-400 dark:text-zinc-600 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                              {booking.status}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function MyBookingsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600 dark:text-indigo-400" />
          <p className="text-sm font-medium text-zinc-500 animate-pulse">
            Loading your bookings...
          </p>
        </div>
      }
    >
      <MyBookingsContent />
    </Suspense>
  );
}
