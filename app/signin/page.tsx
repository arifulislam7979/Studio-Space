
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Camera,
  Mail,
  Lock,
  ArrowRight,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";
import { toast } from "sonner";
import { signIn } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import GoogleIcon from "@/components/GoogleIcon";

export default function SignInPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await signIn.email({
      email: formData.email,
      password: formData.password,
    });

    setLoading(false);

    if (data) {
      toast.success("Sign In Successfully");
      router.push(callbackUrl);
      router.refresh();
    }
    if (error) {
      toast.error(
        error.message || "Sign In Failed. Please check your credentials.",
      );
    }
  };

  // Google Social Sign-In Handler with callbackUrl support
  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      await signIn.social({
        provider: "google",
        callbackURL: callbackUrl, // গুগল লগইনের পরেও যেন নির্দিষ্ট callbackUrl-এ ফিরে যায়
      });
    } catch (e) {
      toast.error("Google Sign-In Failed. Try again.");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 transition-colors">
      <div className="max-w-md w-full space-y-6 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-3xl shadow-2xl">
        {/* Header / Brand Logo */}
        <div className="text-center space-y-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
          >
            <Camera className="w-6 h-6" />
          </Link>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Welcome Back
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Sign in to your StudioSpace account to continue
          </p>
        </div>

        {/* Google Sign In Button */}
        <Button
          type="button"
          variant="outline"
          disabled={googleLoading || loading}
          onClick={handleGoogleSignIn}
          className="w-full py-6 rounded-xl border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-medium text-sm flex items-center justify-center gap-3 transition-all cursor-pointer"
        >
          {googleLoading ? (
            <Loader2 className="w-4 h-4 animate-spin text-zinc-500" />
          ) : (
            <GoogleIcon></GoogleIcon>
          )}
          <span>Continue with Google</span>
        </Button>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-2">
          <div className="border-t border-zinc-200 dark:border-zinc-800 w-full" />
          <span className="bg-zinc-50 dark:bg-zinc-900 px-3 text-xs text-zinc-400 uppercase tracking-wider absolute">
            Or continue with email
          </span>
        </div>

        {/* Sign In Form */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {/* Email Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400 dark:text-zinc-500">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                name="email"
                required
                autoComplete="off"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your Email"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400 dark:text-zinc-500">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                autoComplete="new-password"
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-12 py-3 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-400 hover:text-zinc-700 dark:hover:text-white transition-colors"
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading || googleLoading}
            className="w-full mt-3 py-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </form>

        {/* Footer / Sign Up Link */}
        <div className="text-center text-sm text-zinc-500 dark:text-zinc-400 pt-2">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}