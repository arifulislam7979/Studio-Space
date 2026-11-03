import { Istudio } from "@/app/types/types";
import EditStudioForm from "@/components/EditStudioForm";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function EditStudioContent({ params }: PageProps) {
  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-studio/${id}`, {
    cache: "no-store",
  });
  const studio: Istudio = await res.json();

  return <EditStudioForm studio={studio}/>;
}

export default function EditStudioPage({ params }: PageProps) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-10 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-2xl mx-auto">
        <Suspense
          fallback={
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-600 dark:text-indigo-400" />
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 animate-pulse">
                Loading studio details...
              </p>
            </div>
          }
        >
          <EditStudioContent params={params} />
        </Suspense>
      </div>
    </div>
  );
}
