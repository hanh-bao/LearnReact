import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Link } from "@tanstack/react-router";
import {
  BarChart3,
  Bell,
  CalendarIcon,
  DollarSign,
  Home,
  PieChart,
  Settings,
} from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-1/5 border-r bg-white flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2 font-semibold text-lg">
          <DollarSign className="h-5 w-5 text-emerald-500" />
          <span>Be Rich</span>
        </div>
      </div>
      <nav className="p-2 flex-1 overflow-y-auto">
        <div className="space-y-1">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100"
          >
            <Home className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>
          <Link
            to="/budgets"
            className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100"
          >
            <PieChart className="h-5 w-5" />
            <span>Budget</span>
          </Link>
          <Link
            to="/saving-goals"
            className="flex items-center gap-3 px-3 py-2 text-white rounded-md bg-emerald-500"
          >
            <CalendarIcon className="h-5 w-5" />
            <span>Saving Goals</span>
          </Link>
          <Link
            to="/transactions"
            className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100"
          >
            <Bell className="h-5 w-5" />
            <span>Transactions</span>
          </Link>
          <Link
            to="/reports"
            className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100"
          >
            <BarChart3 className="h-5 w-5" />
            <span>Reports</span>
          </Link>
          <Link
            to="/settings"
            className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100"
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>
        </div>
      </nav>
      <div className="p-4 border-t">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback>JC</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">Jane Cooper</p>
            <p className="text-xs text-gray-500">Premium User</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
