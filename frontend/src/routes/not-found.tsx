import NotFoundAnimatedPage from "@/pages/error/not-found-animated";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/not-found")({
  component: NotFoundComponent,
});

function NotFoundComponent() {
  return <NotFoundAnimatedPage />;
}
