"use client";

import { useState } from "react";
import { Check, ChevronDown, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ITypeFilterProps } from "@/types/props";
import { formatLabel } from "@/helpers/format/label-format";

export function TypeFilter({
  typies,
  selectedType,
  handleTypeChange,
}: ITypeFilterProps) {
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);

  // Get display text for type filter button
  const getTypeFilterText = () => {
    if (!selectedType) return "All Types";
    return formatLabel(selectedType);
  };

  return (
    <DropdownMenu open={typeDropdownOpen} onOpenChange={setTypeDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 relative">
          <Filter className="h-4 w-4" />
          {getTypeFilterText()}
          {selectedType && selectedType !== "All Types" ? (
            <span
              className="absolute right-2 flex items-center"
              onMouseDown={(e) => e.preventDefault()} // Ngăn blur
              onClick={(e) => {
                e.stopPropagation(); // Ngăn click lan lên button
                handleTypeChange?.("All Types"); // Gọi xử lý
              }}
            >
              <X className="h-3.5 w-3.5 hover:text-red-500 cursor-pointer" />
            </span>
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[200px] grid gap-1">
        {typies.length === 0 ? (
          <div className="text-center text-sm py-2">Type is empty</div>
        ) : (
          <>
            <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {typies.map((type) => (
              <DropdownMenuItem
                key={type}
                onClick={() => {
                  handleTypeChange?.(type.toUpperCase());
                  setTypeDropdownOpen(false);
                }}
                className={cn(
                  selectedType === type.toUpperCase() && "bg-emerald-500"
                )}
              >
                <div className="flex justify-between items-center w-full">
                  {formatLabel(type)}
                  <span className="mr-2 h-4 w-4">
                    {selectedType === type.toUpperCase() && (
                      <Check className="h-4 w-4" />
                    )}
                  </span>
                </div>
              </DropdownMenuItem>
            ))}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
