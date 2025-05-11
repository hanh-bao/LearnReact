"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { format, addDays, startOfMonth, endOfMonth } from "date-fns";
import { cn } from "@/lib/utils";
import {
  DollarSign,
  CalendarDays,
  Plus,
  Trash2,
  AlertCircle,
  Save,
} from "lucide-react";
import { Link, useRouter } from "@tanstack/react-router";
import { formatCurrency } from "@/helpers/formats/number-format";

// Available budget categories
const availableCategories = [
  { id: "housing", name: "Housing", icon: "🏠" },
  { id: "food", name: "Food", icon: "🍔" },
  { id: "transportation", name: "Transportation", icon: "🚗" },
  { id: "entertainment", name: "Entertainment", icon: "🎬" },
  { id: "utilities", name: "Utilities", icon: "💡" },
  { id: "healthcare", name: "Healthcare", icon: "🏥" },
  { id: "shopping", name: "Shopping", icon: "🛍️" },
  { id: "education", name: "Education", icon: "📚" },
  { id: "personal", name: "Personal Care", icon: "💇" },
  { id: "travel", name: "Travel", icon: "✈️" },
  { id: "gifts", name: "Gifts & Donations", icon: "🎁" },
  { id: "savings", name: "Savings", icon: "💰" },
  { id: "debt", name: "Debt Payments", icon: "💳" },
  { id: "misc", name: "Miscellaneous", icon: "📦" },
];

// Generate months
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function CreateBudgetPage() {
  const router = useRouter();
  const [month, setMonth] = useState("April");
  const [startDate, setStartDate] = useState<Date>(startOfMonth(new Date()));
  const [endDate, setEndDate] = useState<Date>(endOfMonth(new Date()));
  const [totalBudget, setTotalBudget] = useState("8000000");
  const [categories, setCategories] = useState<
    Array<{ id: string; amount: string }>
  >([]);
  const [newCategory, setNewCategory] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate total allocated and remaining amounts
  const totalAllocated = categories.reduce(
    (sum, cat) => sum + (Number.parseInt(cat.amount) || 0),
    0
  );
  const remaining = Number.parseInt(totalBudget) - totalAllocated;
  const allocationPercentage = totalBudget
    ? (totalAllocated / Number.parseInt(totalBudget)) * 100
    : 0;

  // Add a new category
  const addCategory = () => {
    if (!newCategory) {
      setError("Please select a category");
      return;
    }

    if (
      !newAmount ||
      isNaN(Number.parseInt(newAmount)) ||
      Number.parseInt(newAmount) <= 0
    ) {
      setError("Please enter a valid amount");
      return;
    }

    // Check if category already exists
    if (categories.some((cat) => cat.id === newCategory)) {
      setError("This category already exists in your budget");
      return;
    }

    setCategories([...categories, { id: newCategory, amount: newAmount }]);
    setNewCategory("");
    setNewAmount("");
    setError(null);
  };

  // Remove a category
  const removeCategory = (id: string) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect to budget page
      router.navigate({ to: "/budgets" });
    } catch (error) {
      console.error("Error creating budget:", error);
      setError("Failed to create budget. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update start and end dates when month changes
  const handleMonthChange = (selectedMonth: string) => {
    setMonth(selectedMonth);
    const monthIndex = months.indexOf(selectedMonth);
    const year = new Date().getFullYear();
    const newStartDate = new Date(year, monthIndex, 1);
    const newEndDate = new Date(year, monthIndex + 1, 0);
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1">
        <div>
          <div className="flex items-center mb-1">
            <Link
              to="/budgets"
              className="flex items-center text-emerald-600 hover:text-emerald-700"
            >
              <span>Budgets</span>
            </Link>
            <span className="mx-1.5">/</span>
            <span>Create Monthly Budget</span>
          </div>
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-emerald-600 ">
              Create Monthly Budget
            </h1>
          </div>
        </div>

        <main className="mt-6 w-9/12 mx-auto relative">
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Budget Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="month">Month</Label>
                      <Select value={month} onValueChange={handleMonthChange}>
                        <SelectTrigger id="month">
                          <SelectValue placeholder="Select month" />
                        </SelectTrigger>
                        <SelectContent>
                          {months.map((m) => (
                            <SelectItem key={m} value={m}>
                              {m}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Start Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !startDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarDays className="mr-2 h-4 w-4" />
                              {startDate
                                ? format(startDate, "PPP")
                                : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={startDate}
                              onSelect={(date) => {
                                if (date) {
                                  setStartDate(date);
                                  if (endDate && date > endDate) {
                                    setEndDate(addDays(date, 1));
                                  }
                                }
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="space-y-2">
                        <Label>End Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !endDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarDays className="mr-2 h-4 w-4" />
                              {endDate ? format(endDate, "PPP") : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={endDate}
                              onSelect={(date) => date && setEndDate(date)}
                              disabled={(date) => date < startDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="total-budget">Total Budget (VND)</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                        <input
                          type="text"
                          inputMode="numeric"
                          className="pl-10 pr-10 w-full border border-input bg-background px-3 py-2 text-sm shadow-sm rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                          placeholder="0"
                          value={formatCurrency(totalBudget)}
                          onChange={(e) => {
                            const rawValue = e.target.value.replace(/\D/g, ""); // chỉ giữ số
                            setTotalBudget(rawValue); // cập nhật vào form
                          }}
                        />
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-4">Budget Categories</h3>

                      {categories.length > 0 && (
                        <div className="space-y-4 mb-6">
                          {categories.map((category) => {
                            const categoryInfo = availableCategories.find(
                              (c) => c.id === category.id
                            );
                            return (
                              <div
                                key={category.id}
                                className="flex items-center justify-between border-b pb-3"
                              >
                                <div className="flex items-center">
                                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
                                    <span>{categoryInfo?.icon || "📊"}</span>
                                  </div>
                                  <div>
                                    <p className="font-medium">
                                      {categoryInfo?.name || category.id}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <p className="font-medium">
                                    {formatCurrency(category.amount)} VND
                                  </p>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeCategory(category.id)}
                                    type="button"
                                  >
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                  </Button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      <div className="grid grid-cols-5 gap-4">
                        <div className="col-span-2">
                          <Label htmlFor="category" className="mb-2">
                            Category
                          </Label>
                          <Select
                            value={newCategory}
                            onValueChange={setNewCategory}
                          >
                            <SelectTrigger id="category">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {availableCategories
                                .filter(
                                  (cat) =>
                                    !categories.some((c) => c.id === cat.id)
                                )
                                .map((category) => (
                                  <SelectItem
                                    key={category.id}
                                    value={category.id}
                                  >
                                    <div className="flex items-center">
                                      <span className="mr-2">
                                        {category.icon}
                                      </span>
                                      <span>{category.name}</span>
                                    </div>
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="col-span-2">
                          <Label htmlFor="amount" className="mb-2">
                            Amount (VND)
                          </Label>

                          <input
                            type="text"
                            inputMode="numeric"
                            className="w-full border border-input bg-background px-3 py-2 text-sm shadow-sm rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                            placeholder="0"
                            value={formatCurrency(newAmount)}
                            onChange={(e) => {
                              const rawValue = e.target.value.replace(
                                /\D/g,
                                ""
                              ); // chỉ giữ số
                              setNewAmount(rawValue); // cập nhật vào form
                            }}
                          />
                        </div>
                        <div className="flex items-end">
                          <Button
                            type="button"
                            onClick={addCategory}
                            className="w-full"
                          >
                            <Plus className="h-4 w-4 mr-0.5" />
                            Add
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Budget Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Total Budget:</span>
                        <span className="font-medium">
                          {formatCurrency(totalBudget)} VND
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Categories:</span>
                        <span className="font-medium">{categories.length}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Allocated:</span>
                        <span className="font-medium">
                          {formatCurrency(totalAllocated)} VND
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Remaining:</span>
                        <span
                          className={`font-medium ${remaining < 0 ? "text-red-500" : ""}`}
                        >
                          {formatCurrency(remaining)} VND
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">
                          Allocation Progress:
                        </span>
                        <span className="font-medium">
                          {Math.round(allocationPercentage)}%
                        </span>
                      </div>
                      <Progress
                        value={allocationPercentage}
                        className={cn(
                          "h-2 bg-muted [&>div]:bg-emerald-500 [&>div]:transition-all [&>div]:duration-300",
                          allocationPercentage > 100 && "[&>div]:bg-red-500"
                        )}
                      />
                      {allocationPercentage > 100 && (
                        <p className="text-xs text-red-500 flex">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          You've allocated more than your total budget
                        </p>
                      )}
                    </div>

                    {categories.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium">
                          Category Breakdown
                        </h4>
                        <div className="space-y-2">
                          {categories.map((category) => {
                            const categoryInfo = availableCategories.find(
                              (c) => c.id === category.id
                            );
                            const percentage =
                              (Number.parseInt(category.amount) /
                                Number.parseInt(totalBudget)) *
                              100;
                            return (
                              <div key={category.id} className="space-y-1">
                                <div className="flex justify-between text-xs">
                                  <span>
                                    {categoryInfo?.name || category.id}
                                  </span>
                                  <span>{Math.round(percentage)}%</span>
                                </div>
                                <Progress
                                  value={percentage}
                                  className="h-1.5"
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <div className="flex justify-end gap-4 mt-6">
                  <Button variant="outline" type="button" asChild>
                    <Link to="/budgets">Cancel</Link>
                  </Button>
                  <Button
                    type="submit"
                    className="gap-2"
                    disabled={
                      isSubmitting ||
                      categories.length === 0 ||
                      allocationPercentage > 100
                    }
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin">
                          <svg className="h-4 w-4" viewBox="0 0 24 24">
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                        </span>
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        <span>Save Budget</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
