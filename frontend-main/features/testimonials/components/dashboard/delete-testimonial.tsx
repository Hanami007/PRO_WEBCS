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
import { useDeleteTestimonial } from "@/features/testimonials/api/delete-testimonial";
import { useRouter } from "next/navigation";
import { paths } from "@/config/paths";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";

type DeleteTestimonialProps = {
  id: string;
};

export const DeleteTestimonial = ({ id }: DeleteTestimonialProps) => {
  const router = useRouter();
  const deleteTestimonialMutation = useDeleteTestimonial({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Testimonial deleted.");
        router.push(paths.dashboard.testimonials.getHref());
      },
      onError: () => {
        toast.error("Failed to delete testimonial.");
      },
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <Trash2Icon />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            course and remove your course data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={() =>
              deleteTestimonialMutation.mutate({ testimonialId: id })
            }
          >
            Delete
          </AlertDialogAction>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
