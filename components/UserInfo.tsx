"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  LogOut,
  Loader2,
  User as UserIcon,
  ChevronDown,
  PlusCircle,
  Layers,
  CalendarCheck,
} from "lucide-react";
import { signOut } from "@/lib/auth-client";
import { toast } from "sonner";

interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface UserInfoProps {
  user?: User | null;
}

const UserInfo = ({ user }: UserInfoProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut();
      toast.success("Signed out successfully");
      router.push("/signin");
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        {/* Avatar + Name Trigger Button */}
        <PopoverTrigger >
          <span className="flex items-center gap-2 p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-all focus:outline-none group cursor-pointer">
            <Avatar className="w-9 h-9 border-2 border-indigo-500/30 group-hover:border-indigo-600 dark:group-hover:border-indigo-400 transition-all shrink-0">
              <AvatarImage
                referrerPolicy="no-referrer"
                src={user?.image || ""}
                alt={user?.name || "User Avatar"}
              />
              <AvatarFallback className="bg-indigo-600 text-white font-semibold text-xs">
                {user?.name ? (
                  user.name.charAt(0).toUpperCase()
                ) : (
                  <UserIcon className="w-4 h-4" />
                )}
              </AvatarFallback>
            </Avatar>

            {/* User Name and Dropdown Icon */}
            <div className="hidden sm:flex items-center gap-1.5 pr-1">
              <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors max-w-25 truncate">
                {user?.name || "User"}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-zinc-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-450 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
              />
            </div>
          </span>
        </PopoverTrigger>

        {/* Dropdown Content */}
        <PopoverContent
          align="end"
          className="w-64 p-3 shadow-2xl rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 z-50"
        >
          {/* Header Info */}
          <div className="space-y-1 px-2 pb-3 border-b border-zinc-100 dark:border-zinc-800">
            <p className="text-sm font-bold tracking-tight text-zinc-900 dark:text-white truncate">
              {user?.name || "Studio User"}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate break-all">
              {user?.email || "No email provided"}
            </p>
          </div>

          <div className="py-2 space-y-1">
            <Link
              href="/add-studio"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors"
            >
              <PlusCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <span>Add New Studios</span>
            </Link>

            <Link
              href="/my-listings"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors"
            >
              <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <span>My Studio Listings</span>
            </Link>

            <Link
              href="/my-bookings"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors"
            >
              <CalendarCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <span>My Bookings</span>
            </Link>
          </div>

          {/* Action Button (Sign Out) */}
          <div className="mt-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <Button
              onClick={handleSignOut}
              disabled={loading}
              variant="destructive"
              className="w-full flex items-center justify-center gap-2 text-xs font-medium cursor-pointer rounded-xl h-9 bg-red-600 hover:bg-red-700 text-white transition-all shadow-md shadow-red-600/20"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                  <span>Signing out...</span>
                </>
              ) : (
                <>
                  <LogOut className="w-4 h-4 shrink-0" />
                  <span>Sign Out</span>
                </>
              )}
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default UserInfo;
