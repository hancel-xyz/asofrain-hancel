import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { getCurrentAdminUser } from "@/lib/auth/server";
import { LoginForm } from "@/components/login-form";
import { getEstructura } from "@/lib/data";

// Admin pages read/write live content in InsForge, so they must always be
// rendered per-request rather than cached as static HTML at build time.
export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentAdminUser();

  // No redirect to a separate /login route: visiting any /admin/* URL while
  // signed out shows the login form right there (URL stays on /admin), and
  // signing in lands back on /admin — no page/children are rendered (and no
  // admin data is fetched) until there's a session.
  if (!user) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    );
  }

  const data = await getEstructura();
  const settingsGeneral = data?.sitio.paginas.find((p: any) => p.id === "settings")?.secciones?.general;

  return (
    <SidebarProvider>
      <AppSidebar
        user={{ name: user.profile?.name || user.email, email: user.email }}
        org={{ nombre: settingsGeneral?.nombre?.valor || "Organización", logoUrl: settingsGeneral?.logo?.valor || "" }}
      />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}
