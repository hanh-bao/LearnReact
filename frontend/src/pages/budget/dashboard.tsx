"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MoreVertical,
  Plus,
  Search,
  TrendingUp,
  TrendingDown,
  Edit,
  Trash2,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

// Mock data for budget categories
const budgetCategories = [
  {
    id: 1,
    name: "Social Fund",
    amount: 1200000,
    spent: 600000,
    remaining: 600000,
    color: "bg-blue-500",
    icon: "👥",
  },
  {
    id: 2,
    name: "Food",
    amount: 1500000,
    spent: 900000,
    remaining: 600000,
    color: "bg-green-500",
    icon: "🍔",
  },
  {
    id: 3,
    name: "Housing",
    amount: 3000000,
    spent: 2500000,
    remaining: 500000,
    color: "bg-purple-500",
    icon: "🏠",
  },
  {
    id: 4,
    name: "Entertainment",
    amount: 1000000,
    spent: 300000,
    remaining: 700000,
    color: "bg-pink-500",
    icon: "🎬",
  },
  {
    id: 5,
    name: "Transportation",
    amount: 800000,
    spent: 400000,
    remaining: 400000,
    color: "bg-yellow-500",
    icon: "🚗",
  },
  {
    id: 6,
    name: "Misc",
    amount: 500000,
    spent: 200000,
    remaining: 300000,
    color: "bg-gray-500",
    icon: "📦",
  },
];

// Calculate totals
const totalBudget = budgetCategories.reduce(
  (sum, category) => sum + category.amount,
  0
);
const totalSpent = budgetCategories.reduce(
  (sum, category) => sum + category.spent,
  0
);
const totalRemaining = totalBudget - totalSpent;
const percentUsed = Math.round((totalSpent / totalBudget) * 100);

export default function BudgetPage() {
  const [month, setMonth] = useState("April");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter categories based on search query
  const filteredCategories = budgetCategories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1">
        <header>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-emerald-500">
                Monthly Budget
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search categories..."
                  className="pl-9 bg-white/90 border-0 w-[200px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select defaultValue={month} onValueChange={setMonth}>
                <SelectTrigger className="w-[120px] bg-white/90 border-0">
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="January">January</SelectItem>
                  <SelectItem value="February">February</SelectItem>
                  <SelectItem value="March">March</SelectItem>
                  <SelectItem value="April">April</SelectItem>
                  <SelectItem value="May">May</SelectItem>
                  <SelectItem value="June">June</SelectItem>
                  <SelectItem value="July">July</SelectItem>
                  <SelectItem value="August">August</SelectItem>
                  <SelectItem value="September">September</SelectItem>
                  <SelectItem value="October">October</SelectItem>
                  <SelectItem value="November">November</SelectItem>
                  <SelectItem value="December">December</SelectItem>
                </SelectContent>
              </Select>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                <Link to="/budgets/create">Add Budget</Link>
              </Button>
            </div>
          </div>
        </header>

        <main className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="gap-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Total Budget
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {totalBudget.toLocaleString()} VND
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Budget for {month}
                </div>
              </CardContent>
            </Card>
            <Card className="gap-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Total Spent
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="text-2xl font-bold">
                    {totalSpent.toLocaleString()} VND
                  </div>
                  <Badge className="ml-2 bg-amber-100 text-amber-800 hover:bg-amber-100">
                    {percentUsed}% used
                  </Badge>
                </div>
                <div className="text-xs text-gray-500 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1 text-emerald-500" />
                  <span>5% less than last month</span>
                </div>
              </CardContent>
            </Card>
            <Card className="gap-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Remaining
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {totalRemaining.toLocaleString()} VND
                </div>
                <div className="text-xs text-gray-500 mt-1 flex items-center">
                  <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
                  <span>3% less remaining than last month</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Budget Overview</CardTitle>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Category
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Total: {totalBudget.toLocaleString()} VND</span>
                  <span>{percentUsed}% used</span>
                </div>
                <Progress value={percentUsed} className="h-2" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                  {filteredCategories.map((category) => (
                    <div key={category.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${category.color} mr-2`}
                          >
                            <span>{category.icon}</span>
                          </div>
                          <div>
                            <h3 className="font-medium">{category.name}</h3>
                            <p className="text-xs text-gray-500">
                              {Math.round(
                                (category.spent / category.amount) * 100
                              )}
                              % used
                            </p>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="flex items-center">
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <Progress
                        value={Math.round(
                          (category.spent / category.amount) * 100
                        )}
                        className={`h-1.5 ${category.color}`}
                      />
                      <div className="flex justify-between mt-3 text-sm">
                        <div>
                          <p className="text-gray-500">Budget</p>
                          <p className="font-medium">
                            {category.amount.toLocaleString()} VND
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Spent</p>
                          <p className="font-medium">
                            {category.spent.toLocaleString()} VND
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Left</p>
                          <p className="font-medium">
                            {category.remaining.toLocaleString()} VND
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
