"use server";

import { insforge } from "@/lib/insforge";
import { revalidatePath } from "next/cache";

export interface SolicitudRow {
  id: string;
  tipo_cliente: string;
  nombre: string;
  localidad: string;
  correo: string;
  telefono: string;
  direccion: string;
  descripcion: string;
  acepta_datos: boolean;
  estado: string;
  created_at: string;
}

export async function listSolicitudes(): Promise<SolicitudRow[]> {
  const { data, error } = await insforge.database
    .from("solicitudes")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("listSolicitudes failed:", error);
    return [];
  }
  return (data as SolicitudRow[]) ?? [];
}

export async function updateSolicitudEstado(id: string, estado: string) {
  const { error } = await insforge.database.from("solicitudes").update({ estado }).eq("id", id);
  if (error) return { error: "No se pudo actualizar el estado." };
  revalidatePath("/admin/solicitudes");
  return { error: null };
}

export async function deleteSolicitud(id: string) {
  const { error } = await insforge.database.from("solicitudes").delete().eq("id", id);
  if (error) return { error: "No se pudo eliminar la solicitud." };
  revalidatePath("/admin/solicitudes");
  return { error: null };
}
