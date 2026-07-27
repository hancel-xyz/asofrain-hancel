import { listAdminUsers } from "../actions";
import { getCurrentAdminUser } from "@/lib/auth/server";
import { AdminUsersManager } from "./AdminUsersManager";

export default async function AdminSettingsAdministradoresPage() {
  const [users, currentUser] = await Promise.all([listAdminUsers(), getCurrentAdminUser()]);

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Configuración - Administradores</h1>
        <p className="text-muted-foreground">Crea o elimina las cuentas que pueden entrar a este panel.</p>
      </div>

      <AdminUsersManager users={users} currentUserId={currentUser?.id ?? null} />
    </div>
  );
}
