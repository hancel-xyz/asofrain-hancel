"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createAuthActions } from "@insforge/sdk/ssr";

export async function signIn(formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return { error: "Ingresa tu correo y contraseña." };
  }

  const auth = createAuthActions({ cookies: await cookies() });
  const { data, error } = await auth.signInWithPassword({ email, password });

  if (error || !data?.user) {
    return { error: "Correo o contraseña incorrectos." };
  }

  redirect("/admin");
}

export async function signOutAction() {
  const auth = createAuthActions({ cookies: await cookies() });
  await auth.signOut();
  redirect("/login");
}
