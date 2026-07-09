"use client";

import React from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useQueryState, parseAsInteger } from "nuqs";

interface QueryLimitProps {
  options?: number[];
  defaultLimit?: number;
}

export const QueryLimit = ({
  options = [12, 24, 48, 96],
  defaultLimit = 12,
}: QueryLimitProps) => {
  const [limit, setLimit] = useQueryState(
    "limit",
    parseAsInteger.withDefault(defaultLimit).withOptions({
      shallow: false,
      scroll: false,
    }),
  );

  const [, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1).withOptions({
      shallow: false,
      scroll: false,
    }),
  );

  const handleLimitChange = (newLimit: number) => {
    void setLimit(newLimit);
    void setPage(1); // Reset to first page when limit changes
  };

  return (
    <div className="flex items-center gap-4 text-sm">
      <span className="text-muted-foreground font-medium whitespace-nowrap">
        Results per page
      </span>
      <div className="flex items-center gap-1">
        {options.map((option) => (
          <Button
            key={option}
            variant="ghost"
            size="sm"
            onClick={() => handleLimitChange(option)}
            className={cn(
              "h-8 w-10 p-0 font-medium transition-all",
              limit === option
                ? "border border-border bg-muted/50 text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
};
