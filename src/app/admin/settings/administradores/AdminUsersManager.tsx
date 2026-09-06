"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { KeyRoundIcon, PlusIcon, ShieldCheckIcon, TrashIcon } from "lucide-react";
import { createAdminUser, deleteAdminUser, type AdminUserRow } from "../actions";
import { sendPasswordResetCode } from "@/lib/auth/reset";
import { ResetPasswordForm } from "@/components/reset-password-form";

export function AdminUsersManager({
  users,
  currentUserId,
  currentUserEmail,
}: {
  users: AdminUserRow[];
  currentUserId: string | null;
  currentUserEmail: string | null;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [enviandoId, setEnviandoId] = useState<string | null>(null);

  function handleReset(user: AdminUserRow) {
    setEnviandoId(user.id);
    startTransition(async () => {
      const result = await sendPasswordResetCode(user.email);
      setEnviandoId(null);
      if (result.error) {
        toast.error(result.error);
        return;
      }
      toast.success(
        `Código enviado a ${user.email}. Quien use esa cuenta lo escribe aquí abajo o en "¿Olvidaste tu contraseña?" al entrar.`
      );
    });
  }

  function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      const result = await createAdminUser(formData);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Administrador creado correctamente.");
        form.reset();
        router.refresh();
      }
    });
  }

  function handleDelete(id: string) {
    if (!confirm("¿Eliminar este administrador? Esta acción no se puede deshacer.")) return;
    setDeletingId(id);
    startTransition(async () => {
      const result = await deleteAdminUser(id);
      setDeletingId(null);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Administrador eliminado.");
        router.refresh();
      }
    });
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Nuevo administrador</CardTitle>
          <CardDescription>Crea una cuenta con acceso completo a este panel.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreate} className="grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
            <div className="flex flex-col gap-3">
              <Label htmlFor="new_email">Correo electrónico</Label>
              <Input id="new_email" name="email" type="email" required disabled={isPending} />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="new_password">Contraseña</Label>
              <Input id="new_password" name="password" type="password" required minLength={6} disabled={isPending} />
            </div>
            <Button type="submit" disabled={isPending} className="gap-2">
              <PlusIcon className="h-4 w-4" />
              Crear
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Administradores actuales</CardTitle>
          <CardDescription>{users.length} {users.length === 1 ? "cuenta" : "cuentas"} con acceso a este panel.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {users.map((user) => (
            <div key={user.id} className="flex items-center justify-between gap-4 border rounded-lg p-4">
              <div>
                <div className="font-medium text-sm flex items-center gap-2">
                  {user.email}
                  {user.id === currentUserId && (
                    <span className="text-xs text-muted-foreground">(tú)</span>
                  )}
                  {user.is_project_admin && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                      <ShieldCheckIcon className="h-3 w-3" />
                      Dueño del proyecto
                    </span>
                  )}
                </div>
                <div className="text-xs text-muted-foreground">
                  Creado el {new Date(user.created_at).toLocaleDateString("es-CO", { year: "numeric", month: "long", day: "numeric" })}
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="gap-2"
                  disabled={isPending}
                  onClick={() => handleReset(user)}
                >
                  <KeyRoundIcon className={enviandoId === user.id ? "h-4 w-4 animate-pulse" : "h-4 w-4"} />
                  Restablecer contraseña
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-destructive h-8 w-8"
                  disabled={isPending || user.id === currentUserId}
                  onClick={() => handleDelete(user.id)}
                  aria-label="Eliminar administrador"
                >
                  <TrashIcon className={deletingId === user.id ? "h-4 w-4 animate-pulse" : "h-4 w-4"} />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cambiar una contraseña</CardTitle>
          <CardDescription>
            Pide el código con el botón de arriba (o aquí mismo) y escríbelo junto con la nueva contraseña. Sirve
            para tu propia cuenta y para la de cualquier otro administrador que te pase su código.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResetPasswordForm defaultEmail={currentUserEmail ?? ""} />
        </CardContent>
      </Card>
    </div>
  );
}
