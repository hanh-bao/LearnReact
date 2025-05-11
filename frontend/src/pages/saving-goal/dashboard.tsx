"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "@tanstack/react-router";

// Define types for our data
type SavingGoal = {
  id: number;
  name: string;
  status: "In Progress" | "Completed";
  progress: number;
  targetAmount: number;
  currentAmount: number;
  createdAt: string;
};

// Mock data for saving goals
const mockSavingGoals: SavingGoal[] = [
  {
    id: 1,
    name: "Vacation Fund",
    status: "In Progress",
    progress: 38,
    targetAmount: 10000000,
    currentAmount: 3800000,
    createdAt: "2025-01-01",
  },
  {
    id: 2,
    name: "New Laptop",
    status: "In Progress",
    progress: 65,
    targetAmount: 25000000,
    currentAmount: 16250000,
    createdAt: "2025-01-15",
  },
  {
    id: 3,
    name: "Emergency Fund",
    status: "Completed",
    progress: 100,
    targetAmount: 50000000,
    currentAmount: 50000000,
    createdAt: "2024-10-05",
  },
  {
    id: 4,
    name: "Home Down Payment",
    status: "In Progress",
    progress: 25,
    targetAmount: 200000000,
    currentAmount: 50000000,
    createdAt: "2024-11-20",
  },
  {
    id: 5,
    name: "Wedding",
    status: "In Progress",
    progress: 45,
    targetAmount: 100000000,
    currentAmount: 45000000,
    createdAt: "2024-12-01",
  },
  {
    id: 6,
    name: "Car Repair",
    status: "Completed",
    progress: 100,
    targetAmount: 15000000,
    currentAmount: 15000000,
    createdAt: "2024-09-15",
  },
  {
    id: 7,
    name: "Holiday Gifts",
    status: "In Progress",
    progress: 70,
    targetAmount: 5000000,
    currentAmount: 3500000,
    createdAt: "2024-11-01",
  },
  {
    id: 8,
    name: "Education",
    status: "In Progress",
    progress: 50,
    targetAmount: 30000000,
    currentAmount: 15000000,
    createdAt: "2024-10-10",
  },
  {
    id: 9,
    name: "New Phone",
    status: "Completed",
    progress: 100,
    targetAmount: 20000000,
    currentAmount: 20000000,
    createdAt: "2024-08-20",
  },
  {
    id: 10,
    name: "Fitness Equipment",
    status: "In Progress",
    progress: 30,
    targetAmount: 8000000,
    currentAmount: 2400000,
    createdAt: "2025-01-05",
  },
  {
    id: 11,
    name: "Home Renovation",
    status: "In Progress",
    progress: 15,
    targetAmount: 150000000,
    currentAmount: 22500000,
    createdAt: "2025-02-01",
  },
  {
    id: 12,
    name: "Investment Fund",
    status: "Completed",
    progress: 100,
    targetAmount: 100000000,
    currentAmount: 100000000,
    createdAt: "2024-07-15",
  },
];

export default function SavingGoalsPage() {
  // State for filtering and pagination
  const [activeTab, setActiveTab] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [itemsPerPage, setItemsPerPage] = useState<number>(8);

  // Filter goals based on active tab and search query
  const filteredGoals = mockSavingGoals.filter((goal) => {
    // Filter by tab
    if (activeTab === "in-progress" && goal.status !== "In Progress")
      return false;
    if (activeTab === "completed" && goal.status !== "Completed") return false;

    // Filter by search query
    if (
      searchQuery &&
      !goal.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;

    return true;
  });

  // Sort filtered goals
  const sortedGoals = [...filteredGoals].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "oldest":
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case "progress-high":
        return b.progress - a.progress;
      case "progress-low":
        return a.progress - b.progress;
      case "amount-high":
        return b.targetAmount - a.targetAmount;
      case "amount-low":
        return a.targetAmount - b.targetAmount;
      default:
        return 0;
    }
  });

  // Calculate pagination
  const totalPages = Math.ceil(sortedGoals.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedGoals = sortedGoals.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery, sortBy, itemsPerPage]);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      // Calculate start and end of middle pages
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if at the beginning
      if (currentPage <= 3) {
        endPage = 4;
      }

      // Adjust if at the end
      if (currentPage >= totalPages - 2) {
        startPage = totalPages - 3;
      }

      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pages.push("ellipsis-start");
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pages.push("ellipsis-end");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex bg-gray-50">
      {/* Main Content */}
      <div className="flex-1">
        <header>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-emerald-600 ">
                Saving Goals
              </h1>
            </div>
            <Link to="/saving-goals/create">
              <Button className="text-white bg-emerald-500 cursor-pointer hover:bg-emerald-600 transition-colors">
                <Plus className="h-5 w-5 mr-2" />
                Add New Goal
              </Button>
            </Link>
          </div>
        </header>

        <main className="mt-6">
          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <TabsList>
                <TabsTrigger value="all">All Goals</TabsTrigger>
                <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search goals..."
                    className="pl-9 w-full sm:w-[200px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <SlidersHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="p-2">
                      <p className="text-sm font-medium mb-2">Sort by</p>
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="newest">Newest first</SelectItem>
                          <SelectItem value="oldest">Oldest first</SelectItem>
                          <SelectItem value="progress-high">
                            Progress (high to low)
                          </SelectItem>
                          <SelectItem value="progress-low">
                            Progress (low to high)
                          </SelectItem>
                          <SelectItem value="amount-high">
                            Amount (high to low)
                          </SelectItem>
                          <SelectItem value="amount-low">
                            Amount (low to high)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="p-2 border-t">
                      <p className="text-sm font-medium mb-2">Items per page</p>
                      <Select
                        value={itemsPerPage.toString()}
                        onValueChange={(value) =>
                          setItemsPerPage(Number.parseInt(value))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Items per page" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="4">4</SelectItem>
                          <SelectItem value="8">8</SelectItem>
                          <SelectItem value="12">12</SelectItem>
                          <SelectItem value="16">16</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <TabsContent value="all" className="mt-0">
              {paginatedGoals.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg border">
                  <p className="text-gray-500">No saving goals found</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {paginatedGoals.map((goal) => (
                    <Link
                      to="/saving-goals/$savingGoalId"
                      params={{ savingGoalId: goal.id.toString() }}
                      key={goal.id}
                    >
                      <Card className="h-full hover:shadow-md transition-shadow cursor-pointer pt-0">
                        <div className="aspect-square bg-gray-200 flex items-center justify-center rounded-t-xl overflow-hidden">
                          <img
                            src="https://www.choicehotels.com/cms/images/choice-hotels/demand-articles/img_best-beach-vacations-01/img_best-beach-vacations-01.jpg"
                            alt={goal.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <CardContent className="pt-4">
                          <div className="flex items-center justify-between mb-2">
                            <Badge
                              className={
                                goal.status === "Completed"
                                  ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100"
                                  : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                              }
                            >
                              {goal.status}
                            </Badge>
                            <span className="text-sm font-medium">
                              {goal.progress}%
                            </span>
                          </div>
                          <h3 className="font-medium">{goal.name}</h3>
                          <Progress
                            value={goal.progress}
                            className="h-1.5 mt-2"
                          />
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="in-progress" className="mt-0">
              {paginatedGoals.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg border">
                  <p className="text-gray-500">No in-progress goals found</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {paginatedGoals.map((goal) => (
                    <Link
                      to="/saving-goals/$savingGoalId"
                      params={{ savingGoalId: goal.id.toString() }}
                      key={goal.id}
                    >
                      <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                        <div className="aspect-square bg-gray-200 flex items-center justify-center">
                          <img
                            src={`/placeholder.svg?height=200&width=200&text=${encodeURIComponent(goal.name)}`}
                            alt={goal.name}
                            width={200}
                            height={200}
                            className="object-cover"
                          />
                        </div>
                        <CardContent className="pt-4">
                          <div className="flex items-center justify-between mb-2">
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                              {goal.status}
                            </Badge>
                            <span className="text-sm font-medium">
                              {goal.progress}%
                            </span>
                          </div>
                          <h3 className="font-medium">{goal.name}</h3>
                          <Progress
                            value={goal.progress}
                            className="h-1.5 mt-2"
                          />
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="completed" className="mt-0">
              {paginatedGoals.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg border">
                  <p className="text-gray-500">No completed goals found</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {paginatedGoals.map((goal) => (
                    <Link
                      to="/saving-goals/$savingGoalId"
                      params={{ savingGoalId: goal.id.toString() }}
                      key={goal.id}
                    >
                      <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                        <div className="aspect-square bg-gray-200 flex items-center justify-center">
                          <img
                            src={`/placeholder.svg?height=200&width=200&text=${encodeURIComponent(goal.name)}`}
                            alt={goal.name}
                            width={200}
                            height={200}
                            className="object-cover"
                          />
                        </div>
                        <CardContent className="pt-4">
                          <div className="flex items-center justify-between mb-2">
                            <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
                              {goal.status}
                            </Badge>
                            <span className="text-sm font-medium">
                              {goal.progress}%
                            </span>
                          </div>
                          <h3 className="font-medium">{goal.name}</h3>
                          <Progress
                            value={goal.progress}
                            className="h-1.5 mt-2"
                          />
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>

          {totalPages > 0 && (
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Showing {startIndex + 1}-
                {Math.min(startIndex + itemsPerPage, sortedGoals.length)} of{" "}
                {sortedGoals.length} goals
              </div>

              <div className="w-fit">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1) setCurrentPage(currentPage - 1);
                        }}
                        className={
                          currentPage === 1
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      />
                    </PaginationItem>

                    {getPageNumbers().map((page, index) =>
                      page === "ellipsis-start" || page === "ellipsis-end" ? (
                        <PaginationItem key={`ellipsis-${index}`}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      ) : (
                        <PaginationItem key={`page-${page}`}>
                          <PaginationLink
                            href="#"
                            isActive={currentPage === page}
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(page as number);
                            }}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    )}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage < totalPages)
                            setCurrentPage(currentPage + 1);
                        }}
                        className={
                          currentPage === totalPages
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
