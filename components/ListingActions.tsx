"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getTokenFromClient } from "@/lib/getTokenClient";

interface ListingActionsProps {
  id: string;
}

export default function ListingActions({ id }: ListingActionsProps) {
  const router = useRouter();

  const handleDelete = async () => {
    const token = await getTokenFromClient()
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/add-studio/${id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );
    const result = await res.json();

    if (result.deletedCount > 0) {
      toast.success("Studio deleted successfully!");
      router.refresh();
    } else {
      toast.error("Failed to delete studio.");
    }
  };

  return (
    <div className="flex items-center gap-3">
      <Link href={`/studios/edit/${id}`} className="flex-1">
        <Button
          variant="outline"
          className="w-full rounded-xl gap-1.5 text-xs cursor-pointer border-zinc-300 dark:border-zinc-700"
        >
          <Edit className="w-3.5 h-3.5" /> Edit
        </Button>
      </Link>

      <AlertDialog>
        <AlertDialogTrigger
          nativeButton={false}
          render={
            <span className="flex-1 h-10 rounded-xl gap-1.5 text-xs bg-red-600 hover:bg-red-700 text-white cursor-pointer flex items-center justify-center">
              <Trash2 className="w-3.5 h-3.5 shrink-0" />
              <span>Delete</span>
            </span>
          }
        />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="text-white cursor-pointer bg-red-500"
              onClick={handleDelete}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
