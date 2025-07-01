import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { verifySession } from "@/services/session/session";
import { redirect } from "next/navigation";

export default async function LayoutApp({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await verifySession();
  if (!session.isAuth || !session.userId) {
    redirect("/");
  }
  return <DashboardLayout>{children}</DashboardLayout>;
}
