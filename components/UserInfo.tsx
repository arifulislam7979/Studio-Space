"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, Loader2, User as UserIcon } from "lucide-react";
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

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed out successfully");
            router.push("/signin");
          },
          onError: (ctx) => {
            toast.error(ctx.error.message || "Failed to sign out");
            setLoading(false);
          },
        },
      });
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      {/* User Avatar Popover */}
      <Popover>
        <PopoverTrigger>
          <button className="rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition">
            <Avatar className="cursor-pointer border-2 border-indigo-500/30 hover:border-indigo-600 dark:hover:border-indigo-400 transition-all w-10 h-10">
              <AvatarImage
                referrerPolicy="no-referrer"
                src={user?.image || ""}
                alt={user?.name || "User Avatar"}
              />
              <AvatarFallback className="bg-indigo-600 text-white font-semibold text-sm">
                {user?.name ? user.name.charAt(0).toUpperCase() : <UserIcon className="w-4 h-4" />}
              </AvatarFallback>
            </Avatar>
          </button>
        </PopoverTrigger>

        <PopoverContent 
          align="end" 
          className="w-64 p-4 shadow-2xl rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100"
        >
          {/* Header Info */}
          <PopoverHeader className="text-left space-y-1 pb-3 border-b border-zinc-100 dark:border-zinc-800">
            <PopoverTitle className="text-sm font-bold tracking-tight truncate">
              {user?.name || "Studio User"}
            </PopoverTitle>
            <PopoverDescription className="text-xs text-zinc-500 dark:text-zinc-400 truncate break-all">
              {user?.email || "No email provided"}
            </PopoverDescription>
          </PopoverHeader>

          {/* Action Button */}
          <div className="mt-3 pt-1">
            <Button
              onClick={handleSignOut}
              disabled={loading}
              variant="destructive"
              className="w-full flex items-center justify-center gap-2 text-xs font-medium cursor-pointer rounded-xl h-10 bg-red-600 hover:bg-red-700 text-white transition-all shadow-md shadow-red-600/20"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing out...</span>
                </>
              ) : (
                <>
                  <LogOut className="w-4 h-4" />
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