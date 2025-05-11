import BudgetPage from "@/pages/budget/dashboard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/budgets/")({
  component: BudgetsComponent,
});

function BudgetsComponent() {
  return <BudgetPage />;
}
