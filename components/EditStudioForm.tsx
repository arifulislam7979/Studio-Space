"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Istudio } from "@/app/types/types";
import { getTokenFromClient } from "@/lib/getTokenClient";

interface EditStudioFormProps {
  studio: Istudio;
}

const availableAmenities = [
  { label: "High-speed Wi-Fi", value: "wifi" },
  { label: "Soundproof Studio", value: "soundproof" },
  { label: "Professional Lighting", value: "lighting" },
  { label: "24/7 Security & Lockers", value: "security" },
  { label: "Air Conditioning", value: "air-conditioning" },
  { label: "Parking Available", value: "parking" },
  { label: "Green Room / Lounge", value: "lounge" },
];

export default function EditStudioForm({ studio }: EditStudioFormProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    ...studio,
    amenities: studio.amenities || [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAmenityToggle = (value: string) => {
    const currentAmenities = formData.amenities || [];
    if (currentAmenities.includes(value)) {
      setFormData({
        ...formData,
        amenities: currentAmenities.filter((item: string) => item !== value),
      });
    } else {
      setFormData({
        ...formData,
        amenities: [...currentAmenities, value],
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { _id, ...UpdatedData } = formData;
    void _id;
    setSubmitting(true);

    const token = await getTokenFromClient();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/add-studio/${studio._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(UpdatedData),
      },
    );
    const result = await res.json();

    if (result.modifiedCount > 0 || res.ok) {
      toast.success("Studio updated successfully!");
      setSubmitting(false);
      router.push("/my-listings");
      router.refresh();
    } else {
      toast.error("Failed to update studio.");
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-10 px-4 sm:px-6 lg:px-8 text-zinc-900 dark:text-zinc-100 transition-colors">
      <div className="max-w-2xl mx-auto space-y-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 rounded-3xl shadow-xl">
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <Link
            href="/my-listings"
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-500 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to My Listings
          </Link>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full">
            Edit Mode
          </span>
        </div>

        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">
            Update Studio Workspace
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Modify your listing details below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {/* Read-Only Host Info */}
          <div className="p-4 rounded-2xl bg-zinc-100/70 dark:bg-zinc-950/70 border border-zinc-200 dark:border-zinc-800 space-y-1 text-xs">
            <span className="text-zinc-400 uppercase tracking-wider block font-bold">
              Host Information (Read-Only)
            </span>
            <p className="font-semibold text-zinc-700 dark:text-zinc-300">
              Name: {formData.userName || "N/A"}
            </p>
            <p className="text-zinc-500">
              Email: {formData.userEmail || "N/A"}
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Studio Title
            </label>
            <input
              type="text"
              name="title"
              required
              value={formData.title || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                Category
              </label>
              <input
                type="text"
                name="category"
                required
                value={formData.category || ""}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                Location
              </label>
              <input
                type="text"
                name="location"
                required
                value={formData.location || ""}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                Price ($/hr)
              </label>
              <input
                type="number"
                name="price"
                required
                value={formData.price || ""}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                Max Capacity
              </label>
              <input
                type="number"
                name="maxCapacity"
                required
                value={formData.maxCapacity || ""}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                Security Deposit
              </label>
              <input
                type="number"
                name="securityDeposit"
                required
                value={formData.securityDeposit || ""}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          {/* Included Amenities Selection Section */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 block">
              Included Amenities
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {availableAmenities.map((item) => {
                const isSelected = (formData.amenities || []).some(
                  (val: string) =>
                    val.trim().toLowerCase() ===
                    item.value.trim().toLowerCase(),
                );

                return (
                  <button
                    type="button"
                    key={item.value}
                    onClick={() => handleAmenityToggle(item.value)}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-xl border text-xs font-medium transition-all text-left cursor-pointer ${
                      isSelected
                        ? "bg-indigo-50 dark:bg-indigo-950/50 border-indigo-600 text-indigo-600 dark:text-indigo-400 shadow-sm"
                        : "bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] border ${
                        isSelected
                          ? "bg-indigo-600 border-indigo-600 text-white"
                          : "border-zinc-300 dark:border-zinc-700"
                      }`}
                    >
                      {isSelected && "✓"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Image URL
            </label>
            <input
              type="url"
              name="imageUrl"
              required
              value={formData.imageUrl || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Description
            </label>
            <textarea
              name="description"
              rows={4}
              required
              value={formData.description || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              disabled={submitting}
              className="w-full py-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Updating Studio...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
