import CreateSavingGoalPage from "@/pages/saving-goal/add";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/saving-goals/create")({
  component: SavingGoalCreateComponent,
});

function SavingGoalCreateComponent() {
  return <CreateSavingGoalPage />;
}
