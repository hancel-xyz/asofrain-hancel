"use server";
import { getEstructura, updateEstructuraPageSection } from "@/lib/data";
import { uploadMediaFile } from "@/lib/media";
import { revalidatePath } from "next/cache";

export async function updateEventosListadoEventos(formData: FormData) {
  const estructura = await getEstructura();
  const page = estructura?.sitio.paginas.find((p: any) => p.id === "eventos");
  if (!page) return;

  const data = {
    titulo: { ...page.secciones.listado_eventos.titulo, valor: formData.get("titulo")?.toString() || "" },
    filtro_por_ano: {
      ...page.secciones.listado_eventos.filtro_por_ano,
      activo: formData.get("filtro_por_ano_activo") === "on",
      valor_default: formData.get("filtro_por_ano_valor_default")?.toString() || "",
    },
    permite_agregar: page.secciones.listado_eventos.permite_agregar,
    cards: [] as any[],
  };

  // The admin UI lets you add/remove event cards client-side, so the set of
  // ids to persist comes from the submission itself (cards_id, one per row,
  // in order) rather than from the previously saved array.
  const existingById = new Map(
    (page.secciones.listado_eventos.cards ?? []).map((item: any) => [item.id, item])
  );
  const cardIds = formData.getAll("cards_id").map((v) => v.toString()).filter(Boolean);

  data.cards = await Promise.all(
    cardIds.map(async (id) => {
      const existing = existingById.get(id);
      const updatedItem: any = existing
        ? { ...existing }
        : {
            id,
            foto: { url: "", alt: "", editable_admin: true },
            fecha: { valor: "", editable_admin: true },
            titulo: { valor: "", editable_admin: true },
          };

      if (formData.has(`${id}_fecha`)) updatedItem.fecha = { ...updatedItem.fecha, valor: formData.get(`${id}_fecha`)?.toString() || "" };
      if (formData.has(`${id}_titulo`)) updatedItem.titulo = { ...updatedItem.titulo, valor: formData.get(`${id}_titulo`)?.toString() || "" };

      const uploaded = await uploadMediaFile(formData.get(`${id}_foto`), {
        pageSlug: "eventos",
        sectionKey: "listado_eventos",
        alt: updatedItem.titulo?.valor,
      });
      if (uploaded) {
        updatedItem.foto = { ...updatedItem.foto, url: uploaded.url, key: uploaded.key };
      }
      return updatedItem;
    })
  );

  await updateEstructuraPageSection("eventos", "listado_eventos", data);
  revalidatePath("/", "layout");
}


export async function updateEventosMenuPreview(formData: FormData) {
  const estructura = await getEstructura();
  const page = estructura?.sitio.paginas.find((p: any) => p.id === "eventos");
  if (!page) return;

  const section = page.secciones.menu_preview;
  const uploaded = await uploadMediaFile(formData.get("imagen"), {
    pageSlug: "eventos",
    sectionKey: "menu_preview",
  });
  if (!uploaded) return;

  await updateEstructuraPageSection("eventos", "menu_preview", {
    imagen: { ...section.imagen, valor: uploaded.url, key: uploaded.key },
  });
  revalidatePath("/", "layout");
}
