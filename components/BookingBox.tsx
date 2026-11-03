"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Clock, Loader2, CheckCircle2, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";
import { Istudio } from "@/app/types/types";

interface BookingBoxProps {
  studio: Istudio;
}

export default function BookingBox({ studio }: BookingBoxProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [bookingData, setBookingData] = useState({
    date: new Date().toISOString().split("T")[0],
    startTime: "10:00",
    endTime: "12:00",
  });

  const studioId = studio?._id;
  const studioTitle = studio?.title;
  const hourlyRate = Number(studio?.price) || 0;
  const securityDeposit = Number(studio?.securityDeposit) || 0;

  const handleBookClick = () => {
    if (!session?.user) {
      toast.error("Please sign in to book a workspace.");
      
      const currentPath = window.location.pathname;
      router.push(`/signin?callbackUrl=${encodeURIComponent(currentPath)}`);
      return;
    }
    setIsModalOpen(true);
  };

  const startDateTime = new Date(
    `${bookingData.date}T${bookingData.startTime}`,
  );
  const endDateTime = new Date(`${bookingData.date}T${bookingData.endTime}`);

  const diffMs = endDateTime.getTime() - startDateTime.getTime();
  const calculatedHours = diffMs > 0 ? Math.ceil(diffMs / (1000 * 60 * 60)) : 0;

  const rentalTotal = calculatedHours * hourlyRate;
  const grandTotal = rentalTotal + securityDeposit;

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (calculatedHours <= 0) {
      toast.error("End time must be after the start time.");
      return;
    }

    setLoading(true);

    const bookingsData = {
      studioId,
      studioTitle,
      imageUrl: studio?.imageUrl,
      date: bookingData.date,
      startTime: startDateTime.toISOString(),
      endTime: endDateTime.toISOString(),
      hours: calculatedHours,
      hourlyRate,
      securityDeposit,
      totalPrice: grandTotal,
      userName: session?.user?.name,
      userEmail: session?.user?.email,
      status: "Pending", 
    };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingsData),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(
          result.message || "Conflict! Selected time is already booked.",
        );
        setLoading(false);
        return;
      }

      if (result.insertedId) {
        toast.success("Booking confirmed!");
        setIsModalOpen(false);
        router.push("/my-bookings");
      } else {
        toast.error("Failed to book workspace. Please try again.");
      }
    
  };
  return (
    <>
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-xl space-y-6 sticky top-24">
        <div>
          <span className="text-xs text-zinc-400 uppercase tracking-wider block">
            Starting Price
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
              ${hourlyRate}
            </span>
            <span className="text-xs text-zinc-500">/ hour</span>
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-800 text-xs text-zinc-500">
          <div className="flex justify-between">
            <span>Security Deposit:</span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">
              ${securityDeposit}
            </span>
          </div>
        </div>

        <button
          onClick={handleBookClick}
          className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <Calendar className="w-4 h-4" />
          <span>Book Workspace Now</span>
        </button>
      </div>

      {/* Modal Popup with Input Fields */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative space-y-6">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                STUDIO RESERVATION
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight truncate">
                {studioTitle}
              </h2>
              <p className="text-xs text-zinc-500">
                Select your preferred date and duration to book this space.
              </p>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              {/* Date Input Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  BOOKING DATE <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <input
                    type="date"
                    required
                    value={bookingData.date}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, date: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

              {/* Start Time & End Time Input Fields */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                    START TIME <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                      <Clock className="w-4 h-4" />
                    </div>
                    <input
                      type="time"
                      required
                      value={bookingData.startTime}
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          startTime: e.target.value,
                        })
                      }
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                    END TIME <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                      <Clock className="w-4 h-4" />
                    </div>
                    <input
                      type="time"
                      required
                      value={bookingData.endTime}
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          endTime: e.target.value,
                        })
                      }
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Price Calculation Box */}
              <div className="p-4 rounded-2xl bg-zinc-100/70 dark:bg-zinc-950/70 border border-zinc-200 dark:border-zinc-800 space-y-2 text-xs">
                <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                  <span>
                    Rate ({calculatedHours > 0 ? calculatedHours : 0} hrs × $
                    {hourlyRate}):
                  </span>
                  <span className="font-semibold">${rentalTotal}</span>
                </div>
                <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                  <span>Security Deposit (Refundable):</span>
                  <span className="font-semibold">${securityDeposit}</span>
                </div>
                <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 flex justify-between text-sm font-extrabold text-zinc-900 dark:text-zinc-100">
                  <span>Total Payable:</span>
                  <span className="text-indigo-600 dark:text-indigo-400">
                    ${grandTotal}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={loading || calculatedHours <= 0}
                  className="w-full py-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Checking Availability...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirm & Pay Securely</span>
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
