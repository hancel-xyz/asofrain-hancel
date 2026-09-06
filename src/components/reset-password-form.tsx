"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MailIcon } from "lucide-react";
import { resetPasswordWithCode, sendPasswordResetCode } from "@/lib/auth/reset";

/**
 * Two-step password reset: ask for the code, then set the new password.
 *
 * The backend has no way for one account to write another's password, so a
 * change always travels through the inbox of whoever owns the account — the
 * same form serves an admin resetting their own password and a locked-out one
 * recovering access from the sign-in screen.
 */
export function ResetPasswordForm({
  defaultEmail = "",
  onDone,
  onCancel,
}: {
  defaultEmail?: string;
  onDone?: () => void;
  onCancel?: () => void;
}) {
  const [email, setEmail] = useState(defaultEmail);
  const [codigoEnviado, setCodigoEnviado] = useState(false);
  const [isPending, startTransition] = useTransition();

  function enviarCodigo() {
    startTransition(async () => {
      const result = await sendPasswordResetCode(email);
      if (result.error) {
        toast.error(result.error);
        return;
      }
      setCodigoEnviado(true);
      toast.success(`Enviamos un código a ${email.trim()}. Revisa la bandeja de entrada.`);
    });
  }

  function cambiar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await resetPasswordWithCode(formData);
      if (result.error) {
        toast.error(result.error);
        return;
      }
      toast.success("Contraseña actualizada. Ya puedes entrar con la nueva.");
      setCodigoEnviado(false);
      onDone?.();
    });
  }

  return (
    <div className="grid gap-4">
      <div className="flex flex-col gap-3">
        <Label htmlFor="reset_email">Correo de la cuenta</Label>
        <div className="flex gap-2">
          <Input
            id="reset_email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nombre@asofrain.com"
            disabled={isPending}
            autoComplete="email"
          />
          <Button type="button" variant="outline" className="gap-2 shrink-0" onClick={enviarCodigo} disabled={isPending || !email.trim()}>
            <MailIcon className="h-4 w-4" />
            {codigoEnviado ? "Reenviar" : "Enviar código"}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Te llega un código de un solo uso a ese correo. Nadie —ni desde este panel— puede fijar la contraseña
          de otra persona sin él.
        </p>
      </div>

      {codigoEnviado && (
        <form onSubmit={cambiar} className="grid gap-4 rounded-lg border bg-muted/30 p-4">
          <div className="flex flex-col gap-3">
            <Label htmlFor="reset_otp">Código del correo</Label>
            <Input id="reset_otp" name="otp" required disabled={isPending} inputMode="numeric" autoComplete="one-time-code" />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="reset_password">Nueva contraseña</Label>
            <Input
              id="reset_password"
              name="password"
              type="password"
              required
              minLength={6}
              disabled={isPending}
              autoComplete="new-password"
            />
            <p className="text-xs text-muted-foreground">Mínimo 6 caracteres.</p>
          </div>
          <div className="flex justify-end gap-2">
            {onCancel && (
              <Button type="button" variant="ghost" onClick={onCancel} disabled={isPending}>
                Cancelar
              </Button>
            )}
            <Button type="submit" disabled={isPending}>
              {isPending ? "Guardando…" : "Cambiar contraseña"}
            </Button>
          </div>
        </form>
      )}

      {!codigoEnviado && onCancel && (
        <div className="flex justify-end">
          <Button type="button" variant="ghost" onClick={onCancel} disabled={isPending}>
            Volver
          </Button>
        </div>
      )}
    </div>
  );
}
