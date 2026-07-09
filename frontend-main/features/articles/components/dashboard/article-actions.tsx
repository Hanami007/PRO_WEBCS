"use client";

import { useState } from "react";
import { MoreHorizontal, Trash2, Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Article } from "../../types/api";
import { paths } from "@/config/paths";
import DeleteArticle from "./delete-article";

export const ArticleActions = ({ article }: { article: Article }) => {
  const router = useRouter();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      <DeleteArticle
        id={article.id}
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
      />
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
            onClick={() =>
              router.push(paths.dashboard.article.getHref(article.id))
            }
            className="flex justify-between cursor-pointer"
          >
            <span>Edit</span>
            <Edit size={18} />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(article.id)}
          >
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => setIsDeleteOpen(true)}
            className="flex justify-between text-destructive focus:text-destructive cursor-pointer"
          >
            <span>Delete</span>
            <Trash2 size={18} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
