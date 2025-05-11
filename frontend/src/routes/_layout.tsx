import HeaderBar from "@/components/layout/header-bar";
import Sidebar from "@/components/layout/sidebar";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout")({
  component: LayoutComponent,
});

function LayoutComponent() {
  return (
    <>
      <div className="flex w-full h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        <div className="w-4/5 flex flex-col">
          <HeaderBar />
          <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
