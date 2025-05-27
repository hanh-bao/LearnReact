"use client";

import { useState } from "react";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ICategoryFilterProps } from "@/types/props";

export function CategoryFilter({
  categories,
  selectedCategories,
  handleCategoryChange,
}: ICategoryFilterProps) {
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  const selectedCategoryArray = selectedCategories
    ? selectedCategories.split(",").filter(Boolean)
    : [];

  // Get display text for category filter button
  const getCategoryFilterText = () => {
    if (selectedCategoryArray.length === 0) return "Category";
    if (selectedCategoryArray.length === 1) return selectedCategoryArray[0];
    return `${selectedCategoryArray.length} Categories`;
  };

  // Toggle category selection
  const toggleCategory = (category: string) => {
    const updated = selectedCategoryArray.includes(category)
      ? selectedCategoryArray.filter((c) => c !== category)
      : [...selectedCategoryArray, category];
    handleCategoryChange?.(updated.join(","));
  };

  // Clear all selected categories
  const clearCategories = () => {
    handleCategoryChange?.("");
  };

  return (
    <DropdownMenu
      open={categoryDropdownOpen}
      onOpenChange={setCategoryDropdownOpen}
    >
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 relative">
          <SlidersHorizontal className="h-4 w-4" />
          {getCategoryFilterText()}
          {selectedCategories.length > 0 ? (
            <span
              className="absolute right-2 flex items-center"
              onMouseDown={(e) => e.preventDefault()}
              onClick={(e) => {
                e.stopPropagation();
                clearCategories();
              }}
            >
              <X className="h-3.5 w-3.5 hover:text-red-500 cursor-pointer" />
            </span>
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[240px] grid gap-1">
        {categories.length === 0 ? (
          <div className="py-2 text-center text-sm text-gray-500">
            Category is empty
          </div>
        ) : (
          <>
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Filter by Category</span>
              {selectedCategories.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs"
                  onClick={() => clearCategories()}
                >
                  Clear
                </Button>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {categories.map((category) => (
              <DropdownMenuCheckboxItem
                key={category}
                checked={selectedCategoryArray.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              >
                {category}
              </DropdownMenuCheckboxItem>
            ))}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
