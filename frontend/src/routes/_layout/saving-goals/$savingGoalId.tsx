import SavingGoalDetailPage from "@/pages/saving-goal/detail";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/saving-goals/$savingGoalId")({
  component: SavingGoalComponent,
});

function SavingGoalComponent() {
  const { savingGoalId } = Route.useParams();

  return <SavingGoalDetailPage savingGoalId={savingGoalId} />;
}
