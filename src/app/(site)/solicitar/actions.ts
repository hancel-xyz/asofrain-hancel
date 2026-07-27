"use server";

import { insforge } from "@/lib/insforge";

export async function submitSolicitud(formData: FormData) {
  const tipo_cliente = String(formData.get("tipo_cliente") || "").trim();
  const nombre = String(formData.get("nombre") || "").trim();
  const correo = String(formData.get("correo") || "").trim();
  const acepta_datos = formData.get("acepta_datos") === "on";

  if (!nombre || !correo) {
    return { error: "Completa al menos el nombre y el correo." };
  }
  if (!acepta_datos) {
    return { error: "Debes aceptar el tratamiento de datos personales." };
  }

  const { error } = await insforge.database.from("solicitudes").insert([
    {
      tipo_cliente: tipo_cliente || "Otro",
      nombre,
      localidad: String(formData.get("localidad") || "").trim(),
      correo,
      telefono: String(formData.get("telefono") || "").trim(),
      direccion: String(formData.get("direccion") || "").trim(),
      descripcion: String(formData.get("descripcion") || "").trim(),
      acepta_datos,
    },
  ]);

  if (error) {
    console.error("submitSolicitud failed:", error);
    return { error: "No se pudo enviar la solicitud. Intenta de nuevo." };
  }

  return { error: null };
}
