import type { Metadata } from "next";
import { cookies } from "next/headers";

import { AdminDashboardClient } from "@/components/admin/admin-dashboard-client";
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/lib/auth/admin-session";

export const metadata: Metadata = {
  title: "Admin | Imóvel em Floripa",
  description: "Protected administration area for property management.",
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  const isAuthenticated = Boolean(token && verifyAdminSessionToken(token));

  return <AdminDashboardClient initialAuthenticated={isAuthenticated} />;
}
