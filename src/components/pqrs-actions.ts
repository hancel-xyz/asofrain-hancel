"use server";

import { insforge } from "@/lib/insforge";

export async function submitPqrs(formData: FormData) {
  const tipo = String(formData.get("tipo") || "").trim();
  const nombre = String(formData.get("nombre") || "").trim();
  const mensaje = String(formData.get("mensaje") || "").trim();

  if (!tipo || !nombre || !mensaje) {
    return { error: "Completa el tipo, tu nombre y el mensaje." };
  }

  const { error } = await insforge.database.from("pqrs").insert([
    {
      tipo,
      nombre,
      correo: String(formData.get("correo") || "").trim(),
      telefono: String(formData.get("telefono") || "").trim(),
      mensaje,
    },
  ]);

  if (error) {
    console.error("submitPqrs failed:", error);
    return { error: "No se pudo enviar. Intenta de nuevo." };
  }

  return { error: null };
}
