"use server";

import { createClient } from "@insforge/sdk";

/**
 * Anonymous client, for the flows that belong to the account holder rather
 * than to the panel: the reset code is mailed to them and only they can
 * complete it. The admin key must not be used here — it would let anyone who
 * reaches these actions set a password without proving they own the inbox.
 */
type AuthRestablecer = {
  sendResetPasswordEmail(request: { email: string }): Promise<{ error: unknown }>;
  resetPassword(request: { newPassword: string; otp: string }): Promise<{ error: unknown }>;
};

function authPublico(): AuthRestablecer {
  const cliente = createClient({
    baseUrl: process.env.NEXT_PUBLIC_INSFORGE_URL,
    anonKey: process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY,
  });
  // Narrowed on purpose: these two methods are typed through zod-inferred
  // schemas so large that expanding them exhausts the type checker's heap.
  return cliente.auth as unknown as AuthRestablecer;
}

/**
 * Mails a one-time code to an account so its owner can set a new password.
 *
 * The backend exposes no way for an admin to write someone else's password
 * directly, which is the right design: a password only ever reaches the
 * account through the person who reads that inbox.
 */
export async function sendPasswordResetCode(email: string) {
  const destino = email.trim();
  if (!destino) return { error: "Ingresa el correo de la cuenta." };

  const { error } = await authPublico().sendResetPasswordEmail({ email: destino });
  if (error) {
    console.error("sendPasswordResetCode failed:", error);
    return { error: "No se pudo enviar el código. Revisa el correo e intenta de nuevo." };
  }
  return { error: null };
}

/** Completes the reset with the code that was mailed out. */
export async function resetPasswordWithCode(formData: FormData) {
  const otp = String(formData.get("otp") || "").trim();
  const newPassword = String(formData.get("password") || "");

  if (!otp) return { error: "Ingresa el código que llegó al correo." };
  if (newPassword.length < 6) return { error: "La contraseña debe tener al menos 6 caracteres." };

  const { error } = await authPublico().resetPassword({ newPassword, otp });
  if (error) {
    console.error("resetPasswordWithCode failed:", error);
    return { error: "El código no es válido o ya venció. Pide uno nuevo." };
  }
  return { error: null };
}
