"use client";

import React, { useState } from "react";
import { Complain } from "../../types/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash2, Eye } from "lucide-react";
import { DeleteComplain } from "./delete-complain";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Image from "next/image";

type ComplainActionsProps = {
  complain: Complain;
};

export const ComplainActions = ({ complain }: ComplainActionsProps) => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);

  return (
    <>
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
            onClick={() => setViewOpen(true)}
            className="flex justify-between cursor-pointer"
          >
            <span>View Details</span>
            <Eye className="h-4 w-4" />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(complain.id)}
          >
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => setDeleteOpen(true)}
            className="flex justify-between cursor-pointer text-destructive focus:text-destructive"
          >
            <span>Delete</span>
            <Trash2 size={16} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteComplain
        id={complain.id}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />

      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{complain.title}</DialogTitle>
            <DialogDescription>
              Submitted on {new Date(complain.createdAt).toLocaleString("th-TH")}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <h4 className="font-bold text-sm uppercase text-muted-foreground tracking-wider">Detail</h4>
              <p className="whitespace-pre-wrap leading-relaxed border rounded-lg p-4 bg-muted/30">
                {complain.detail}
              </p>
            </div>

            {complain.image?.url && (
              <div className="space-y-2">
                <h4 className="font-bold text-sm uppercase text-muted-foreground tracking-wider">Attached Image</h4>
                <div className="relative aspect-video w-full overflow-hidden rounded-lg border shadow-sm">
                  <Image
                    src={complain.image.url}
                    alt={complain.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
