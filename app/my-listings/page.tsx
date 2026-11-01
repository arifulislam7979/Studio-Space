import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Istudio } from "../types/types";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Plus, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ListingActions from "@/components/ListingActions";
import { Suspense } from "react";


const MyListingsContent = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  if (!user?.email) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-zinc-900 dark:text-zinc-100">
        <h1 className="text-xl font-medium">Please login to view your listings.</h1>
      </div>
    );
  }

  const res = await fetch(`http://localhost:5000/my-listings/${user?.email}`, {
    cache: "no-store",
  });
  const listings: Istudio[] = await res.json();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 py-10 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-800 pb-5 flex-wrap gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              My Studio Listings
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Manage, update, or remove your published creative spaces.
            </p>
          </div>
          <Link href="/add-studio">
            <Button className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl gap-2 cursor-pointer shadow-lg shadow-indigo-600/20">
              <Plus className="w-4 h-4" /> Add New Studio
            </Button>
          </Link>
        </div>

        {/* Empty State or Grid */}
        {!listings || listings.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 space-y-3 shadow-sm">
            <AlertCircle className="w-10 h-10 text-zinc-400 mx-auto" />
            <h3 className="text-base font-bold text-zinc-700 dark:text-zinc-300">
              No Listings Found
            </h3>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
              You haven&apos;t listed any studio spaces yet. Create your first listing to start hosting.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((studio) => (
              <div
                key={studio._id}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 w-full bg-zinc-200 dark:bg-zinc-800">
                    {studio.imageUrl ? (
                      <Image
                        src={studio.imageUrl}
                        alt={studio.title}
                        fill
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-zinc-400">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="p-5 space-y-2">
                    <h3 className="font-bold text-lg truncate text-zinc-900 dark:text-zinc-100">
                      {studio.title}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-indigo-500 shrink-0" />{" "}
                      <span className="truncate">{studio.location}</span>
                    </p>
                    <p className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400">
                      ${studio.price}/hr
                    </p>
                  </div>
                </div>

                {/* Edit and Delete Buttons Component */}
                <div className="p-5 pt-0">
                  <ListingActions id={studio._id} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};



export default function MyListingsPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-10 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-6xl mx-auto">
        <Suspense
          fallback={
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-600 dark:text-indigo-400" />
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 animate-pulse">
                Loading your listings...
              </p>
            </div>
          }
        >
          <MyListingsContent />
        </Suspense>
      </div>
    </div>
  );
}

