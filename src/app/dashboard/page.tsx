import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getUserLands } from "@/actions/land";
import { getContactRequests } from "@/actions/contact";
import { DashboardContent } from "./DashboardContent";

export const metadata = {
  title: "Dashboard | LandSeller",
  description: "Manage your land listings and view contact requests",
};

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const [lands, contactRequests] = await Promise.all([
    getUserLands(),
    getContactRequests(),
  ]);

  return (
    <DashboardContent
      user={session.user}
      lands={lands}
      contactRequests={contactRequests}
    />
  );
}
