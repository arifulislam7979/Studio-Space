"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Camera,
  MapPin,
  DollarSign,
  Users,
  ShieldAlert,
  Image as ImageIcon,
  CheckCircle2,
  Loader2,
  ArrowLeft,
  Sparkles,
  Wifi,
  Volume2,
  Sun,
  ShieldCheck,
  User,
  Mail,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

const AMENITIES_OPTIONS = [
  { id: "wifi", label: "High-speed Wi-Fi", icon: Wifi },
  { id: "soundproof", label: "Soundproof Studio", icon: Volume2 },
  { id: "lighting", label: "Professional Lighting", icon: Sun },
  { id: "security", label: "24/7 Security & Lockers", icon: ShieldCheck },
];

const CATEGORIES = [
  "Photo Studio",
  "Film Stage",
  "Podcast Lounge",
  "Music Suite",
  "Workshop",
  "Creative Coworking",
];

export default function AddStudiosPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    securityDeposit: "",
    maxCapacity: "",
    location: "",
    description: "",
    imageUrl: "",
    amenities: [] as string[],
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAmenityToggle = (amenityId: string) => {
    setFormData((prev) => {
      const exists = prev.amenities.includes(amenityId);
      return {
        ...prev,
        amenities: exists
          ? prev.amenities.filter((item) => item !== amenityId)
          : [...prev.amenities, amenityId],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const studioUser = {
      ...formData,
      userName: user?.name,
      userEmail: user?.email,
      userImage: user?.image
    };

    const res = await fetch("http://localhost:5000/add-studio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studioUser),
    });
    const result = await res.json();

    if (result.insertedId) {
      toast.success("Studio space listed successfully!");
      router.push("/my-listings");
    } else {
      toast.error("Failed to add studio. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 py-10 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Back Link */}
        <Link
          href="/my-listings"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to My Listings</span>
        </Link>

        {/* Form Container Card */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8">
          {/* Header */}
          <div className="space-y-2 text-center sm:text-left border-b border-zinc-100 dark:border-zinc-800/80 pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Host Your Creative Space</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Add New Studio
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Fill in the details below to list your studio space on StudioSpace
              for creators to book.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Read-Only User Information Section */}
            <div className="p-4 rounded-2xl bg-zinc-100/70 dark:bg-zinc-950/70 border border-zinc-200 dark:border-zinc-800 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Host Account Details (Read-Only)
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-2.5 text-xs font-medium text-zinc-700 dark:text-zinc-300">
                  <User className="w-4 h-4 text-indigo-500" />
                  <span>Name: {user?.name || "Loading..."}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 truncate">
                  <Mail className="w-4 h-4 text-indigo-500" />
                  <span className="truncate">
                    Email: {user?.email || "Loading..."}
                  </span>
                </div>
              </div>
            </div>

            {/* Title Field */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                Studio Title <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400 dark:text-zinc-500">
                  <Camera className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Downtown Daylight Photo Studio"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-sm placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
              >
                <option value="" disabled>
                  Select category
                </option>
                {CATEGORIES.map((cat) => (
                  <option
                    key={cat}
                    value={cat}
                    className="bg-white dark:bg-zinc-900"
                  >
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Grid for Price, Security Deposit & Max Capacity */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Hourly Price */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Price/Hour ($) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400 dark:text-zinc-500">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <input
                    type="number"
                    name="price"
                    required
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="e.g., 45"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-sm placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

              {/* Security Deposit */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Security Deposit ($) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400 dark:text-zinc-500">
                    <ShieldAlert className="w-4 h-4" />
                  </div>
                  <input
                    type="number"
                    name="securityDeposit"
                    min="0"
                    required
                    value={formData.securityDeposit}
                    onChange={handleChange}
                    placeholder="e.g., 100"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-sm placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

              {/* Max Capacity */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Max Capacity <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400 dark:text-zinc-500">
                    <Users className="w-4 h-4" />
                  </div>
                  <input
                    type="number"
                    name="maxCapacity"
                    min="1"
                    required
                    value={formData.maxCapacity}
                    onChange={handleChange}
                    placeholder="e.g., 10"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-sm placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Location Address */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                Location Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400 dark:text-zinc-500">
                  <MapPin className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g., 123 Creative St, Kurigram, Bangladesh"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-sm placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            {/* Cover Image URL */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                Image URL (Cover Photo)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400 dark:text-zinc-500">
                  <ImageIcon className="w-4 h-4" />
                </div>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-sm placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            {/* Description / Overview */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                Detailed Overview / Description{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <textarea
                  name="description"
                  rows={4}
                  required
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your studio space, equipment included, lighting setup, dimensions..."
                  className="w-full p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-sm placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
              <p className="text-xs text-zinc-400">Min. 20 characters</p>
            </div>

            {/* Amenities Checklist */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                Included Amenities
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {AMENITIES_OPTIONS.map((item) => {
                  const Icon = item.icon;
                  const isChecked = formData.amenities.includes(item.id);
                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => handleAmenityToggle(item.id)}
                      className={`flex items-center gap-3 p-3 rounded-xl border text-xs font-medium transition-all text-left cursor-pointer ${
                        isChecked
                          ? "bg-indigo-50 dark:bg-indigo-950/50 border-indigo-500 text-indigo-600 dark:text-indigo-400"
                          : "bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400"
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="flex-1">{item.label}</span>
                      {isChecked && (
                        <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <Button
                type="submit"
                disabled={loading}
                className="w-full py-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Publishing Studio Listing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Publish Studio</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
