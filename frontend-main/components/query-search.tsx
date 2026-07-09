"use client";

import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQueryState, parseAsString, parseAsInteger } from "nuqs";

interface QuerySearchProps {
  placeholder?: string;
  className?: string;
}

export const QuerySearch = ({
  placeholder = "Type to search...",
  className,
}: QuerySearchProps) => {
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault("").withOptions({
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

  const [internalValue, setInternalValue] = useState(search);

  // Sync internal state when URL changes (e.g. browser navigation)
  useEffect(() => {
    setInternalValue(search);
  }, [search]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    void setSearch(internalValue || null);
    void setPage(1); // Reset to first page on search
  };

  return (
    <div className={cn("relative w-full", className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
      <form onSubmit={handleSearch}>
        <Input
          placeholder={placeholder}
          value={internalValue}
          onChange={(e) => setInternalValue(e.target.value)}
          className="pl-10 h-11 bg-card/50 rounded-xl"
        />
      </form>
    </div>
  );
};
