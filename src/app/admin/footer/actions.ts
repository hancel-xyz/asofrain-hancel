"use server";
import { getEstructura, updateEstructuraPageSection } from "@/lib/data";
import { uploadMediaFile } from "@/lib/media";
import { revalidatePath } from "next/cache";

export async function updateFooterFondo(formData: FormData) {
  const estructura = await getEstructura();
  const page = estructura?.sitio.paginas.find((p: any) => p.id === "footer");
  if (!page) return;

  const data: any = {};

  const uploaded = await uploadMediaFile(formData.get("imagen_fondo"), {
    pageSlug: "footer",
    sectionKey: "fondo",
  });
  if (uploaded) {
    data.imagen_fondo = { ...page.secciones.fondo.imagen_fondo, valor: uploaded.url, key: uploaded.key };
  }

  await updateEstructuraPageSection("footer", "fondo", data);
  revalidatePath("/", "layout");
}

export async function updateFooterGeneral(formData: FormData) {
  const estructura = await getEstructura();
  const page = estructura?.sitio.paginas.find((p: any) => p.id === "footer");
  if (!page) return;

  const existingById = new Map<string, any>(
    (page.secciones.general.redes ?? []).map((r: any) => [r.id, r])
  );
  const redIds = formData.getAll("redes_id").map((v) => v.toString()).filter(Boolean);

  const data = {
    descripcion: { ...page.secciones.general.descripcion, valor: formData.get("descripcion")?.toString() || "" },
    redes: redIds.map((id) => {
      const existing = existingById.get(id);
      return {
        id,
        nombre: formData.get(`${id}_nombre`)?.toString() || existing?.nombre || "",
        url: formData.get(`${id}_url`)?.toString() || existing?.url || "",
      };
    }),
  };

  await updateEstructuraPageSection("footer", "general", data);
  revalidatePath("/", "layout");
}

export async function updateFooterContacto(formData: FormData) {
  const estructura = await getEstructura();
  const page = estructura?.sitio.paginas.find((p: any) => p.id === "footer");
  if (!page) return;

  const data = {
    email: { ...page.secciones.contacto.email, valor: formData.get("email")?.toString() || "" },
    telefono: { ...page.secciones.contacto.telefono, valor: formData.get("telefono")?.toString() || "" },
    // Added with the footer redesign; sections saved before this simply have
    // no value for them yet and the footer hides whatever is empty.
    direccion: { ...page.secciones.contacto.direccion, valor: formData.get("direccion")?.toString() || "" },
    ciudad: { ...page.secciones.contacto.ciudad, valor: formData.get("ciudad")?.toString() || "" },
    horario: { ...page.secciones.contacto.horario, valor: formData.get("horario")?.toString() || "" },
  };

  await updateEstructuraPageSection("footer", "contacto", data);
  revalidatePath("/", "layout");
}
