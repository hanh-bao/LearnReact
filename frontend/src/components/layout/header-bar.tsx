import { DollarSign } from "lucide-react";

const HeaderBar = () => {
  return (
    <header className="bg-emerald-500 p-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-full">
            <DollarSign className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">
            Personal Finance Management
          </h1>
        </div>
      </div>
    </header>
  );
};

export default HeaderBar;
