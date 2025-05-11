import CreateBudgetPage from "@/pages/budget/add";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/budgets/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return <CreateBudgetPage />;
}
