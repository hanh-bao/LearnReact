"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, MoreVertical } from "lucide-react";
import { Link } from "@tanstack/react-router";

type Props = {
  savingGoalId: string;
};

export default function SavingGoalDetailPage({ savingGoalId }: Props) {
  // Mock data for the specific saving goal
  const goalData = {
    id: savingGoalId,
    name: "Vacation Fund",
    status: "In Progress",
    progress: 38,
    startDate: "01/01/2025",
    endDate: "01/08/2025",
    currentAmount: "3,800,000",
    targetAmount: "10,000,000",
    currency: "VND",
    transactions: [
      {
        id: 1,
        date: "15/04/2025",
        amount: "$100",
        note: "Hangout with friends",
        category: "Saving",
      },
      {
        id: 2,
        date: "15/04/2025",
        amount: "$100",
        note: "Hangout with friends",
        category: "Saving",
      },
      {
        id: 3,
        date: "15/04/2025",
        amount: "$100",
        note: "Hangout with friends",
        category: "Saving",
      },
      {
        id: 4,
        date: "15/04/2025",
        amount: "$100",
        note: "Hangout with friends",
        category: "Saving",
      },
    ],
  };

  return (
    <div className="flex-1 flex flex-col gap-6">
      <div>
        <div className="flex items-center mb-1">
          <Link
            to="/saving-goals"
            className="flex items-center text-emerald-600 hover:text-emerald-700"
          >
            <span>Saving Goals</span>
          </Link>
          <span className="mx-1.5">/</span>
          <span> {goalData.name}</span>
        </div>
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-emerald-600 ">
            {goalData.name}
          </h1>
        </div>
      </div>

      <div className="flex flex-col gap-8 ">
        <div className="grid md:grid-cols-3 gap-6 overflow-hidden">
          <Card className="md:col-span-2">
            <CardHeader className="pb-0">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold">{goalData.name}</h3>
                  <Badge className="mt-1 bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
                    {goalData.progress}% Complete
                  </Badge>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit Goal</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      Delete Goal
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Start Date</p>
                  <p className="font-medium">{goalData.startDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">End Date</p>
                  <p className="font-medium">{goalData.endDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Current Amount</p>
                  <p className="font-medium">
                    {goalData.currentAmount} {goalData.currency}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Target Amount</p>
                  <p className="font-medium">
                    {goalData.targetAmount} {goalData.currency}
                  </p>
                </div>
              </div>

              <Progress value={goalData.progress} className="h-2 mb-2" />

              <div className="flex justify-between text-sm text-gray-500 mb-4">
                <span>0 {goalData.currency}</span>
                <span>
                  {goalData.targetAmount} {goalData.currency}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="p-0">
            <div className="aspect-square bg-gray-200 flex items-center justify-center rounded-xl overflow-hidden">
              <img
                src="https://th.bing.com/th/id/R.03ce17cafe5eac1271eefe83c28c33b3?rik=wUfps7RVmE2B2w&riu=http%3a%2f%2freviewvilla.vn%2fwp-content%2fuploads%2f2022%2f12%2fresort-vinh-hy-3.jpg&ehk=%2b4hSl8mhHGtVCybvXuk3KeLmGza4CKQwfjXrAYT5iCs%3d&risl=&pid=ImgRaw&r=0"
                alt={goalData.name}
                className="object-cover h-full w-full"
              />
            </div>
          </Card>
        </div>

        <div className="relative bg-white rounded-lg border shadow-sm overflow-hidden">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold">Recent Transactions</h2>
            <Button className="gap-2" onClick={() => {}}>
              <Plus className="h-4 w-4" />
              <span>Add Transaction</span>
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox />
                </TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Note</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {goalData.transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>{transaction.note}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700 border-blue-200"
                    >
                      {transaction.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="p-4 border-t">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">4</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">5</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">11</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
}
