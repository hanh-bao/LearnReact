import { ProfileForm } from "@/pages/profile/profile-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/profile")({
  component: ProfileComponent,
});

function ProfileComponent() {
  return <ProfileForm />;
}
