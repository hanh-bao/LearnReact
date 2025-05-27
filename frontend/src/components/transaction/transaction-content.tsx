"use client";

import { useEffect, useState } from "react";
import { FileText, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TransactionHistoryContent } from "../report/transaction-history-content";
import { Link } from "@tanstack/react-router";
import { formatCurrency } from "@/helpers/format/number-format";
import { getAllTransactions } from "@/services/transaction.service";
import { toast } from "sonner";
import { Pagination, TransactionResponse } from "@/types/transaction";
import { TransactionHistoryPagination } from "../report/transaction-history-pagination";
import { DateRangeDialog } from "../dialogs/date-range-dialogs";
import { DatefilterFormValues } from "@/helpers/validations/date-filter-schema";
import { set } from "date-fns";

export function TransactionsContent() {
  const [activeTab, setActiveTab] = useState<
    "today" | "last30days" | "thismonth" | "thisyear" | "custom"
  >("today");

  const [transactions, setTransactions] = useState<TransactionResponse[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    totalItems: 0,
    totalPages: 1,
    limit: 10,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [customRange, setCustomRange] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  // State for search functionality
  const [searchQuery, setSearchQuery] = useState("");
  const [searchColumn, setSearchColumn] = useState<string>("all");

  // State for filters
  const [selectedType, setSelectedType] = useState<string>("All Types");
  const [selectedCategories, setSelectedCategories] = useState<string>("");

  // State for sorting
  const [sortField, setSortField] = useState<string>("");

  // State for types and categories
  const [typies, setTypies] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const [filterPriority, setFilterPriority] = useState<
    "type" | "category" | null
  >(null);

  const handleTypeChange = (newType: string) => {
    setSelectedType(newType);
    if (filterPriority === null) {
      setFilterPriority("type"); // Người dùng chọn type đầu tiên
    } else {
      if (newType === "All Types") {
        setFilterPriority(null); // Nếu chọn "All Types", bỏ chọn filter
      }
    }
  };

  const handleCategoryChange = (newCategory: string) => {
    setSelectedCategories(newCategory);
    if (filterPriority === null) {
      setFilterPriority("category"); // Người dùng chọn category đầu tiên
    } else {
      if (newCategory === "") {
        setFilterPriority(null); // Nếu bỏ chọn category, bỏ chọn filter
      }
    }
  };

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  } as const;

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
    setCurrentPage(1); // Reset to first page for consistency
  };

  const handleApplyDateRange = (data: DatefilterFormValues) => {
    setCustomRange(
      `${data.start.toLocaleDateString("en-CA", options)} - ${data.end.toLocaleDateString("en-CA", options)}`
    );
    setIsDatePickerOpen(false);
    setCurrentPage(1);
  };

  const handleCancelDateRange = () => {
    setIsDatePickerOpen(false);
  };

  useEffect(() => {
    if (activeTab === "custom") {
      setTransactions([]);
      setIsDatePickerOpen(true);
      setPagination({
        currentPage: 1,
        totalItems: 0,
        totalPages: 0,
        limit: 10,
      });
    }
  }, [activeTab]);

  // gọi loadData mỗi lần activeTab thay đổi (chỉ với các tab lịch sử, không summary)
  useEffect(() => {
    if (activeTab === "custom" && !customRange) return;

    const today = new Date().toLocaleDateString("en-CA", options);
    let startDate = today;
    let endDate = today;

    switch (activeTab) {
      case "last30days":
        startDate = new Date(Date.now() - 30 * 86400000).toLocaleDateString(
          "en-CA",
          options
        );

        break;
      case "thismonth":
        startDate = new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          1
        ).toLocaleDateString("en-CA", options);

        break;
      case "thisyear":
        startDate = new Date(new Date().getFullYear(), 0, 1).toLocaleDateString(
          "en-CA",
          options
        );

        break;
      case "custom":
        const [_startDate, _endDate] = customRange.split(" - ");

        startDate = _startDate;
        endDate = _endDate;

        break;
    }

    const fetchData = async () => {
      await getAllTransactions({
        startDate,
        endDate,
        page: currentPage,
        limit: pagination.limit,
        search: searchQuery,
        column: searchColumn,
        categoryType: selectedType,
        categoryName: selectedCategories,
        sortFields: sortField,
      })
        .then((resp) => {
          if (resp.success) {
            setTransactions(resp.result.data);
            setPagination(resp.result.pagination);
            if (resp.result.data.length === 0 && currentPage > 1) {
              setCurrentPage(1);
            }
            // newTypies và newCategories lấy từ BE.
            const newTypies = Array.from(
              new Set(resp.result.data.map((t) => t.categoryType))
            );
            const newCategories = Array.from(
              new Set(resp.result.data.map((t) => t.categoryName))
            );
            if (filterPriority === "type") {
              setCategories(newCategories);
            } else if (filterPriority === "category") {
              setTypies(newTypies);
              if (newTypies.length === 1) {
                setTypies([newTypies[0]]);
                setSelectedType(newTypies[0]);
              } else {
                setTypies(newTypies);
                setSelectedType("All Types");
              }
            } else {
              setCategories(newCategories);
              setTypies(newTypies);
            }
          } else {
            toast.error(resp.code, { description: resp.message });
          }
        })
        .catch((err) => {
          toast.error(err.message);
        })
        .finally(() => {});
    };

    fetchData();
  }, [
    activeTab,
    currentPage,
    customRange,
    searchQuery,
    searchColumn,
    selectedType,
    selectedCategories,
    sortField,
    refreshKey,
  ]);

  // Calculate totals
  const income = transactions
    .filter((t) => t.categoryType === "INCOME")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.categoryType === "EXPENSE")
    .reduce((sum, t) => sum + t.amount, 0);

  const total = income - expense;

  return (
    <div className="container mx-auto py-6">
      {/* Time period tabs */}
      <Tabs
        defaultValue="today"
        value={activeTab}
        onValueChange={(value) => {
          setActiveTab(value as typeof activeTab);
        }}
        className="mb-6"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4 px-4">
          <TabsList className="bg-gray-100 dark:bg-gray-800 py-1 h-fit">
            <TabsTrigger
              value="today"
              className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white mx-1"
            >
              Today
            </TabsTrigger>
            <TabsTrigger
              value="last30days"
              className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white mr-1"
            >
              Last 30 days
            </TabsTrigger>
            <TabsTrigger
              value="thismonth"
              className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white mr-1"
            >
              This month
            </TabsTrigger>
            <TabsTrigger
              value="thisyear"
              className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white mr-1"
            >
              This year
            </TabsTrigger>
            <TabsTrigger
              value="custom"
              className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white mr-1"
              onClick={() => {
                setIsDatePickerOpen(true);
              }}
            >
              {customRange ? customRange : "Custom"}
            </TabsTrigger>
          </TabsList>

          <div className="flex gap-2">
            <Link
              to="/transactions/create"
              className="relative overflow-hidden"
            >
              <Button className="gap-2 bg-emerald-500 hover:bg-emerald-600">
                <Plus className="h-4 w-4" />
                Add Transaction
              </Button>
            </Link>
          </div>
        </div>

        {/* Financial summary cards */}
        <div className="grid grid-cols-3 gap-4 mb-4 px-4">
          <Card className="bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800 h-fit">
            <CardContent>
              <div className="flex flex-col items-center text-center">
                <h3 className="text-sm font-medium text-amber-800 dark:text-amber-300 mb-1">
                  Income
                </h3>
                <p className="text-xl font-bold text-amber-600 dark:text-amber-400">
                  {formatCurrency(income)}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800 h-fit">
            <CardContent>
              <div className="flex flex-col items-center text-center">
                <h3 className="text-sm font-medium text-red-800 dark:text-red-300 mb-1">
                  Expense
                </h3>
                <p className="text-xl font-bold text-red-600 dark:text-red-400">
                  {formatCurrency(expense)}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800 h-fit">
            <CardContent>
              <div className="flex flex-col items-center text-center">
                <h3 className="text-sm font-medium text-emerald-800 dark:text-emerald-300 mb-1">
                  Total
                </h3>
                <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                  {formatCurrency(total)}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Budget section */}
        <Card className="mx-4 bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800">
          <CardContent className="px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-amber-600 dark:text-amber-400 mr-2" />
                <span className="font-medium text-amber-800 dark:text-amber-300">
                  Budget
                </span>
              </div>
              <Button className="bg-emerald-500 hover:bg-emerald-600">
                <Link to="/budget">Budget setup</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <TabsContent value={activeTab}>
          <TransactionHistoryContent
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchColumn={searchColumn}
            setSearchColumn={setSearchColumn}
            typies={typies}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            categories={categories}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            transactions={transactions}
            sortField={sortField}
            setSortField={setSortField}
            onDeleteSuccess={handleRefresh}
          />

          <TransactionHistoryPagination
            currentPage={currentPage}
            totalPages={pagination.totalPages}
            setCurrentPage={setCurrentPage}
          />
        </TabsContent>
      </Tabs>

      {/* Date Range Picker Dialog */}
      <DateRangeDialog
        open={isDatePickerOpen}
        onOpenChange={setIsDatePickerOpen}
        onApply={handleApplyDateRange}
        onCancel={handleCancelDateRange}
      />
    </div>
  );
}
