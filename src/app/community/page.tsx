import { redirect } from "next/navigation";

export default function CommunityRedirectPage() {
  redirect("/communities");
  return null;
}
