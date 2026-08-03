"use server";
import { getEstructura, updateEstructuraPageSection } from "@/lib/data";
import { uploadMediaFile } from "@/lib/media";
import { revalidatePath } from "next/cache";

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Uploads one photo of an event's gallery on its own, the moment it's picked.
 *
 * An event can hold dozens of photos; bundling them into the single "Guardar
 * Cambios" submit would push the whole (already uploaded) set through the
 * Server Action body again and fail the entire save. By the time
 * `updateEventosListadoEventos` runs, the gallery is just ids and urls.
 */
export async function uploadEventoImagen(formData: FormData) {
  return uploadMediaFile(formData.get("file"), {
    pageSlug: "eventos",
    sectionKey: "listado_eventos",
    alt: formData.get("alt")?.toString() ?? "",
  });
}

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
      const existing = existingById.get(id) as any;
      const updatedItem: any = existing
        ? { ...existing }
        : {
            id,
            foto: { url: "", alt: "", encuadre: "50% 50%", editable_admin: true },
            fecha: { valor: "", editable_admin: true },
            titulo: { valor: "", editable_admin: true },
            descripcion: { valor: "", editable_admin: true },
            galeria: [],
          };

      if (formData.has(`${id}_fecha`)) updatedItem.fecha = { ...updatedItem.fecha, valor: formData.get(`${id}_fecha`)?.toString() || "" };
      if (formData.has(`${id}_titulo`)) updatedItem.titulo = { ...updatedItem.titulo, valor: formData.get(`${id}_titulo`)?.toString() || "" };
      if (formData.has(`${id}_descripcion`)) {
        updatedItem.descripcion = { ...updatedItem.descripcion, valor: formData.get(`${id}_descripcion`)?.toString() || "" };
      }

      const uploaded = await uploadMediaFile(formData.get(`${id}_foto`), {
        pageSlug: "eventos",
        sectionKey: "listado_eventos",
        alt: updatedItem.titulo?.valor,
      });
      if (uploaded) {
        updatedItem.foto = { ...updatedItem.foto, url: uploaded.url, key: uploaded.key };
      }
      // Which part of the cover survives the card crop.
      if (formData.has(`${id}_encuadre`)) {
        updatedItem.foto = { ...updatedItem.foto, encuadre: formData.get(`${id}_encuadre`)?.toString() || "50% 50%" };
      }

      // Gallery photos were already uploaded one by one; only their ids,
      // urls, alt text and framing travel with this save.
      const galeriaExistente = new Map(
        (updatedItem.galeria ?? []).map((img: any) => [img.id, img])
      );
      const imagenIds = formData
        .getAll(`${id}_galeria_id`)
        .map((v) => v.toString())
        .filter(Boolean);

      updatedItem.galeria = imagenIds.map((imagenId) => {
        const previa = galeriaExistente.get(imagenId) as any;
        const imagen: any = previa ? { ...previa } : { id: imagenId, url: "", alt: "", encuadre: "50% 50%" };
        const url = formData.get(`${imagenId}_url`)?.toString() || "";
        if (url) imagen.url = url;
        if (formData.has(`${imagenId}_key`)) imagen.key = formData.get(`${imagenId}_key`)?.toString() || imagen.key;
        if (formData.has(`${imagenId}_alt`)) imagen.alt = formData.get(`${imagenId}_alt`)?.toString() || "";
        if (formData.has(`${imagenId}_encuadre`)) imagen.encuadre = formData.get(`${imagenId}_encuadre`)?.toString() || "50% 50%";
        return imagen;
      });

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
