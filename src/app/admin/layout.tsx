import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { getCurrentAdminUser } from "@/lib/auth/server";

// Admin pages read/write live content in InsForge, so they must always be
// rendered per-request rather than cached as static HTML at build time.
export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentAdminUser();
  if (!user) redirect("/login");

  return (
    <SidebarProvider>
      <AppSidebar user={{ name: user.profile?.name || user.email, email: user.email }} />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}
