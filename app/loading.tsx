
import { Loader2, Sparkles } from "lucide-react";

const LoadingPage = () => {
  return (
    <div className="min-h-[70vh] w-full flex flex-col items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors">
      <div className="flex flex-col items-center space-y-4 text-center">
        {/* Animated Brand Icon/Spinner Container */}
        <div className="relative flex items-center justify-center">
          {/* Outer Glowing Ring */}
          <div className="absolute w-16 h-16 rounded-full bg-indigo-500/20 dark:bg-indigo-500/10 animate-ping" />
          
          {/* Main Spinner */}
          <div className="relative p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-indigo-600 dark:text-indigo-400 animate-spin" />
            <Sparkles className="w-4 h-4 text-indigo-500 absolute top-2 right-2 animate-bounce" />
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-1">
          <h3 className="text-base font-bold text-zinc-800 dark:text-zinc-200 tracking-tight">
            StudioSpace
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium animate-pulse">
            Fetching creative spaces...
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;