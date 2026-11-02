"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

interface CancelBookingProps {
  bookingId: string;
}

export default function CancelBooking({ bookingId }: CancelBookingProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5000/cancel-booking/${bookingId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "Cancelled" }),
        },
      );
      const result = await res.json();
      if (result.modifiedCount > 0) {
        toast.success("Booking cancelled successfully!");
        router.refresh();
      } else {
        toast.error("Failed to cancel booking.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        nativeButton={false}
        render={
          <span className="w-full h-10 rounded-xl gap-1.5 text-xs font-semibold bg-red-600 hover:bg-red-700 text-white cursor-pointer flex items-center justify-center transition-colors shadow-sm">
            <Trash2 className="w-3.5 h-3.5 shrink-0" />
            <span>Cancel Booking</span>
          </span>
        }
      />
      <AlertDialogContent className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Cancel this booking?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to cancel this reservation? This status will
            be updated to Cancelled.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-xl cursor-pointer">
            Keep Booking
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleCancel}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 text-white rounded-xl cursor-pointer"
          >
            {loading ? "Cancelling..." : "Yes, Cancel"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
