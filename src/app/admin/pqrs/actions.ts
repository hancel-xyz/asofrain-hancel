"use server";

import { insforge } from "@/lib/insforge";
import { revalidatePath } from "next/cache";

export interface PqrsRow {
  id: string;
  tipo: string;
  nombre: string;
  correo: string;
  telefono: string;
  mensaje: string;
  estado: string;
  created_at: string;
}

export async function listPqrs(): Promise<PqrsRow[]> {
  const { data, error } = await insforge.database
    .from("pqrs")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("listPqrs failed:", error);
    return [];
  }
  return (data as PqrsRow[]) ?? [];
}

export async function updatePqrsEstado(id: string, estado: string) {
  const { error } = await insforge.database.from("pqrs").update({ estado }).eq("id", id);
  if (error) return { error: "No se pudo actualizar el estado." };
  revalidatePath("/admin/pqrs");
  return { error: null };
}

export async function deletePqrs(id: string) {
  const { error } = await insforge.database.from("pqrs").delete().eq("id", id);
  if (error) return { error: "No se pudo eliminar." };
  revalidatePath("/admin/pqrs");
  return { error: null };
}
