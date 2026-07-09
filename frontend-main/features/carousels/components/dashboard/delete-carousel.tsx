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
import { toast } from "sonner";
import { useDeleteCarousel } from "@/features/carousels/api/delete-carousel";
import { useRouter } from "next/navigation";
import { paths } from "@/config/paths";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";

type DeleteCarouselProps = {
  id: string;
};

export const DeleteCarousel = ({ id }: DeleteCarouselProps) => {
  const router = useRouter();
  const deleteCarouselMutation = useDeleteCarousel({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Carousel deleted successfully.");
        router.push(paths.dashboard.carousels.getHref());
      },
      onError: () => {
        toast.error("Failed to delete carousel.");
      },
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <Trash2Icon className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteCarouselMutation.isPending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => deleteCarouselMutation.mutate({ carouselId: id })}
          >
            {deleteCarouselMutation.isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

