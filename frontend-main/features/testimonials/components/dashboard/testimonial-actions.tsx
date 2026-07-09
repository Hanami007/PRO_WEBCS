"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Testimonial } from "../../types/api";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { useDeleteTestimonial } from "../../api/delete-testimonial";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import UpdateTestimonialDialog from "./update-testimonial-dialog";

type TestimonialActionsProps = {
  testimonial: Testimonial;
};

export const TestimonialActions = ({
  testimonial,
}: TestimonialActionsProps) => {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const deleteTestimonialMutation = useDeleteTestimonial({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Testimonial deleted.");
        setOpen(false);
      },
    },
  });

  return (
    <>
      <UpdateTestimonialDialog
        testimonial={testimonial}
        open={editOpen}
        onOpenChange={setEditOpen}
      />
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete this Testimonial : {testimonial.authorName}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              course and remove its data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                deleteTestimonialMutation.mutate({
                  testimonialId: testimonial.id,
                });
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => setEditOpen(true)}
            className="flex justify-between cursor-pointer"
          >
            <span>Edit</span>
            <Edit size={18} />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => setOpen(true)}
            className="flex justify-between text-destructive focus:text-destructive"
          >
            <span>Delete</span>
            <Trash2 size={18} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
