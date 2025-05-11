import SavingGoalsPage from "@/pages/saving-goal/dashboard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/saving-goals/")({
  component: SavingGoalsComponent,
});

function SavingGoalsComponent() {
  return <SavingGoalsPage />;
}
