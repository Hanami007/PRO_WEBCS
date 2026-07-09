import { type Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableVisibility } from "./data-table-visibility";
import { Search, X } from "lucide-react";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import * as React from "react";

type DataTableToolbarProps<TData> = {
  table: Table<TData>;
  searchPlaceholder?: string;
  searchKey?: string;
  onSearch?: (value: string) => void;
  filters?: {
    columnId: string;
    title: string;
    options: {
      label: string;
      value: string;
      icon?: React.ComponentType<{ className?: string }>;
    }[];
  }[];
};

export function DataTableToolbar<TData>({
  table,
  searchPlaceholder = "Filter...",
  searchKey,
  onSearch,
  filters = [],
}: DataTableToolbarProps<TData>) {
  const isFiltered =
    table.getState().columnFilters.length > 0 || table.getState().globalFilter;

  const currentFilterValue = searchKey
    ? (table.getColumn(searchKey)?.getFilterValue() as string) ?? ""
    : (table.getState().globalFilter as string) ?? "";

  const [searchValue, setSearchValue] = React.useState(currentFilterValue);
  const [prevFilterValue, setPrevFilterValue] = React.useState(currentFilterValue);

  if (currentFilterValue !== prevFilterValue) {
    setPrevFilterValue(currentFilterValue);
    setSearchValue(currentFilterValue);
  }

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchValue);
    } else if (searchKey) {
      table.getColumn(searchKey)?.setFilterValue(searchValue);
    } else {
      table.setGlobalFilter(searchValue);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex flex-1 items-center space-x-2">
        <div className="flex items-center space-x-2">
          <Input
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            onKeyDown={handleKeyDown}
            className="h-8 w-[150px] lg:w-[250px]"
          />
          <Button
            type="button"
            size="sm"
            className="h-8 px-2 lg:px-3"
            onClick={handleSearch}
          >
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>
        <div className="flex gap-x-2">
          {filters.map((filter) => {
            const column = table.getColumn(filter.columnId);
            if (!column) return null;
            return (
              <DataTableFacetedFilter
                key={filter.columnId}
                column={column}
                title={filter.title}
                options={filter.options}
              />
            );
          })}
        </div>
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              table.resetColumnFilters();
              table.setGlobalFilter("");
              setSearchValue("");
              if (onSearch) onSearch("");
            }}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ms-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableVisibility table={table} />
    </div>
  );
}
