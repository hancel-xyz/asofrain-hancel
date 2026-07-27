"use server";

import { getEstructura, updateEstructuraPageSection } from "@/lib/data";
import { uploadMediaFile } from "@/lib/media";
import { insforge } from "@/lib/insforge";
import { getCurrentAdminUser } from "@/lib/auth/server";
import { revalidatePath } from "next/cache";

export async function updateSettingsGeneral(formData: FormData) {
  const estructura = await getEstructura();
  const page = estructura?.sitio.paginas.find((p: any) => p.id === "settings");
  if (!page) return;

  const data: any = {
    nombre: { ...page.secciones.general.nombre, valor: formData.get("nombre")?.toString() || "" },
  };

  const uploaded = await uploadMediaFile(formData.get("logo"), {
    pageSlug: "settings",
    sectionKey: "general",
  });
  if (uploaded) {
    data.logo = { ...page.secciones.general.logo, valor: uploaded.url, key: uploaded.key };
  }

  await updateEstructuraPageSection("settings", "general", data);
  revalidatePath("/admin", "layout");
}

export interface AdminUserRow {
  id: string;
  email: string;
  created_at: string;
}

export async function listAdminUsers(): Promise<AdminUserRow[]> {
  const { data, error } = await insforge.database.rpc("admin_list_users");
  if (error) {
    console.error("listAdminUsers failed:", error);
    return [];
  }
  return (data as AdminUserRow[]) ?? [];
}

export async function createAdminUser(formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return { error: "Ingresa un correo y una contraseña." };
  }
  if (password.length < 6) {
    return { error: "La contraseña debe tener al menos 6 caracteres." };
  }

  const { error } = await insforge.auth.signUp({ email, password });
  if (error) {
    return { error: "No se pudo crear el usuario. ¿El correo ya está registrado?" };
  }

  // signUp() always requires email verification (and its response never
  // includes the created user's id) even via the admin client — look the
  // row up by email and mark it verified so the new admin can sign in right away.
  const users = await listAdminUsers();
  const created = users.find((u) => u.email === email);
  if (created) await insforge.database.rpc("admin_verify_user", { target_id: created.id });

  revalidatePath("/admin/settings/administradores");
  return { error: null };
}

export async function deleteAdminUser(userId: string) {
  const currentUser = await getCurrentAdminUser();
  if (currentUser?.id === userId) {
    return { error: "No puedes eliminar tu propia cuenta." };
  }

  const { error } = await insforge.database.rpc("admin_remove_user", { target_id: userId });
  if (error) {
    return { error: error.message || "No se pudo eliminar el usuario." };
  }

  revalidatePath("/admin/settings/administradores");
  return { error: null };
}
