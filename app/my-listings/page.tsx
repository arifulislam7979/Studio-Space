"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Edit, Trash2, Plus, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Istudio } from "@/app/types/types";
import { toast } from "sonner";

export default function MyListingPage() {
  const { data: session } = useSession();
  const user = session?.user;

  const [listings, setListings] = useState<Istudio[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

    useEffect(() => {
      if (!user?.email) {
        return;
      }

      fetch(`http://localhost:5000/my-listings/${user?.email}`)
        .then((res) => res.json())
        .then((data) => setListings(data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }, [user?.email]);

  // Delete Handler
  const handleDelete = async (id: string) => {
    const res = await fetch(`http://localhost:5000/add-studio/${id}`, {
      method: "DELETE",
    });
    const result = await res.json()
    console.log(result)

    // if (res.ok) {
    //   toast.success("Studio deleted successfully!");
    //   setListings(listings.filter((item) => item._id !== id));
    //   setDeleteId(null);
    // } else {
    //   toast.error("Failed to delete studio.");
    // }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600 dark:text-indigo-400" />
        <p className="text-sm font-medium text-zinc-500">
          Loading your listings...
        </p>
      </div>
    );
  }

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

        {/* Empty State */}
        {listings.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 space-y-3 shadow-sm">
            <AlertCircle className="w-10 h-10 text-zinc-400 mx-auto" />
            <h3 className="text-base font-bold text-zinc-700 dark:text-zinc-300">
              No Listings Found
            </h3>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
              You haven&apos;t listed any studio spaces yet. Create your first
              listing to start hosting.
            </p>
          </div>
        ) : (
          /* Listings Grid */
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

                <div className="p-5 pt-0 flex items-center gap-3">
                  <Link href={`/studios/edit/${studio._id}`} className="flex-1">
                    <Button
                      variant="outline"
                      className="w-full rounded-xl gap-1.5 text-xs cursor-pointer border-zinc-300 dark:border-zinc-700"
                    >
                      <Edit className="w-3.5 h-3.5" /> Edit
                    </Button>
                  </Link>

                  <Button
                    variant="destructive"
                    onClick={() => setDeleteId(studio._id)}
                    className="flex-1 rounded-xl gap-1.5 text-xs bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl text-center">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Are you sure?
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                This action cannot be undone. This will permanently delete your
                studio listing from the database.
              </p>
              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setDeleteId(null)}
                  className="flex-1 rounded-xl cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => handleDelete(deleteId)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-xl cursor-pointer"
                >
                  Yes, Delete
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
