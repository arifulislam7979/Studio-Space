
import Link from 'next/link';
import { Home, VideoOff, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFoundPage = () => {
  return (
    <div className="min-h-[80vh] w-full flex flex-col items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Creative Studio Illustration Container */}
        <div className="relative mx-auto w-32 h-32 flex items-center justify-center">
          {/* Glowing Background Effect */}
          <div className="absolute inset-0 rounded-full bg-indigo-500/20 dark:bg-indigo-500/10 blur-xl animate-pulse" />
          
          {/* Main Icon Box */}
          <div className="relative p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl flex items-center justify-center">
            <VideoOff className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
            <Sparkles className="w-5 h-5 text-amber-500 absolute top-3 right-3 animate-bounce" />
          </div>
        </div>

        {/* Text Details */}
        <div className="space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            404 Error
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Studio Space Not Found
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto leading-relaxed">
            Oops! The creative room or page you are looking for doesn&apos;t exist or has been moved to another location.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Link href="/">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-6 py-5 text-xs font-bold gap-2 cursor-pointer transition-colors shadow-md">
              <Home className="w-4 h-4" />
              <span>Return to Home</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;