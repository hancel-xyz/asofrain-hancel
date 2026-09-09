"use server";
import { getEstructura, updateEstructuraPageSection } from "@/lib/data";
import { uploadMediaFile } from "@/lib/media";
import { revalidatePath } from "next/cache";

/* eslint-disable @typescript-eslint/no-explicit-any */

// Uploads a single gallery image directly (bypassing the big form submit).
// Bundling many photos into one giant Server Action payload alongside the
// rest of the (potentially dozens of images long) gallery form is what was
// causing "Ocurrio un error al guardar los cambios": either the request body
// or the upload itself would fail for the whole batch, even though most of
// those fields were unrelated, already-saved images.
export async function uploadGaleriaImage(formData: FormData) {
  return uploadMediaFile(formData.get("file"), {
    pageSlug: "sensibilizacion",
    sectionKey: "galeria",
  });
}

export async function updateSensibilizacionEncabezado(formData: FormData) {
  const estructura = await getEstructura();
  const page = estructura?.sitio.paginas.find((p: any) => p.id === "sensibilizacion");
  if (!page) return;

  const data = {
    titulo: { ...page.secciones.encabezado.titulo, valor: formData.get("titulo")?.toString() || "" },
    descripcion: { ...page.secciones.encabezado.descripcion, valor: formData.get("descripcion")?.toString() || "" },
  };

  // Handle arrays explicitly if they exist


  await updateEstructuraPageSection("sensibilizacion", "encabezado", data);
  revalidatePath("/", "layout");
}

/**
 * Uploads one photo of a campaign's gallery on its own, the moment it's
 * picked, for the same reason the site-wide gallery does: a type can hold
 * dozens of photos and bundling them into the single "Guardar Cambios" submit
 * would push the whole (already uploaded) set through the Server Action body
 * again and fail the entire save.
 */
export async function uploadTipoSensibilizacionImagen(formData: FormData) {
  return uploadMediaFile(formData.get("file"), {
    pageSlug: "sensibilizacion",
    sectionKey: "tipos_sensibilizacion",
  });
}

export async function updateSensibilizacionTiposSensibilizacion(formData: FormData) {
  const estructura = await getEstructura();
  const page = estructura?.sitio.paginas.find((p: any) => p.id === "sensibilizacion");
  if (!page) return;

  const data: any = {
    permite_agregar: page.secciones.tipos_sensibilizacion.permite_agregar,
    tipos: [] as any[],
  };

  // The admin UI lets you add/remove types client-side, so the set of ids to
  // persist comes from the submission itself (tipos_id, one per card, in
  // order) rather than from the previously saved array.
  const existingById = new Map(
    (page.secciones.tipos_sensibilizacion.tipos ?? []).map((item: any) => [item.id, item])
  );
  const tipoIds = formData.getAll("tipos_id").map((v) => v.toString()).filter(Boolean);

  data.tipos = await Promise.all(
    tipoIds.map(async (id) => {
      const existing = existingById.get(id) as any;
      const updatedItem: any = existing
        ? { ...existing }
        : {
            id,
            imagen: { valor: "", editable_admin: true, tipo: "imagen" },
            tipo: { valor: "", editable_admin: true },
            titulo: { valor: "", editable_admin: true },
            vinetas: { permite_agregar: true, items: [] },
            galeria: [],
          };

      const uploaded = await uploadMediaFile(formData.get(`${id}_imagen`), {
        pageSlug: "sensibilizacion",
        sectionKey: "tipos_sensibilizacion",
      });
      if (uploaded) updatedItem.imagen = { ...updatedItem.imagen, valor: uploaded.url, key: uploaded.key };
      if (formData.has(`${id}_tipo`)) updatedItem.tipo = { ...updatedItem.tipo, valor: formData.get(`${id}_tipo`)?.toString() || "" };
      if (formData.has(`${id}_titulo`)) updatedItem.titulo = { ...updatedItem.titulo, valor: formData.get(`${id}_titulo`)?.toString() || "" };

      // Bullets can be added and removed too, so the list is rebuilt from the
      // ids that came back (they are only unique within their own card, hence
      // the card id prefix on every field).
      const vinetasExistentes = new Map(
        (updatedItem.vinetas?.items ?? []).map((vineta: any) => [vineta.id, vineta])
      );
      const vinetaIds = formData.getAll(`${id}_vineta_id`).map((v) => v.toString()).filter(Boolean);
      updatedItem.vinetas = {
        permite_agregar: updatedItem.vinetas?.permite_agregar ?? true,
        items: vinetaIds.map((vinetaId) => {
          const previa = vinetasExistentes.get(vinetaId) as any;
          const vineta: any = previa ? { ...previa } : { id: vinetaId, valor: "", editable_admin: true };
          const campo = `${id}_${vinetaId}`;
          if (formData.has(campo)) vineta.valor = formData.get(campo)?.toString() || "";
          return vineta;
        }),
      };

      // Gallery photos were already uploaded one by one; only their ids, urls,
      // keys and alt text travel with this save.
      const galeriaExistente = new Map(
        (updatedItem.galeria ?? []).map((img: any) => [img.id, img])
      );
      const imagenIds = formData.getAll(`${id}_galeria_id`).map((v) => v.toString()).filter(Boolean);
      updatedItem.galeria = imagenIds.map((imagenId) => {
        const previa = galeriaExistente.get(imagenId) as any;
        const imagen: any = previa ? { ...previa } : { id: imagenId, url: "", alt: "" };
        const url = formData.get(`${imagenId}_url`)?.toString() || "";
        if (url) imagen.url = url;
        if (formData.has(`${imagenId}_key`)) imagen.key = formData.get(`${imagenId}_key`)?.toString() || imagen.key;
        if (formData.has(`${imagenId}_alt`)) imagen.alt = formData.get(`${imagenId}_alt`)?.toString() || "";
        return imagen;
      });

      return updatedItem;
    })
  );

  await updateEstructuraPageSection("sensibilizacion", "tipos_sensibilizacion", data);
  revalidatePath("/", "layout");
}

export async function updateSensibilizacionGaleria(formData: FormData) {
  const estructura = await getEstructura();
  const page = estructura?.sitio.paginas.find((p: any) => p.id === "sensibilizacion");
  if (!page) return;

  // The admin UI lets you drag-and-drop to add/remove gallery images, so the
  // set of ids to persist comes from the submission itself (imagenes_id, one
  // per card) rather than from the previously saved array.
  const existingById = new Map(
    (page.secciones.galeria.imagenes ?? []).map((item: any) => [item.id, item])
  );
  const imageIds = formData.getAll("imagenes_id").map((v) => v.toString()).filter(Boolean);

  // Images are uploaded individually (via uploadGaleriaImage) as soon as
  // they're picked, so by the time this action runs it only ever receives
  // small string fields (ids, urls, keys, alt text) — never raw file bytes.
  const data: any = {
    permite_agregar: page.secciones.galeria.permite_agregar,
    titulo: { ...page.secciones.galeria.titulo, valor: formData.get("titulo")?.toString() || "" },
    imagenes: imageIds.map((id) => {
      const existing = existingById.get(id);
      const updatedItem: any = existing ? { ...existing } : { id, url: "", alt: "", editable_admin: true };

      const url = formData.get(`${id}_url`)?.toString() || "";
      if (url) updatedItem.url = url;
      if (formData.has(`${id}_key`)) updatedItem.key = formData.get(`${id}_key`)?.toString() || updatedItem.key;
      if (formData.has(`${id}_alt`)) updatedItem.alt = formData.get(`${id}_alt`)?.toString() || "";
      return updatedItem;
    }),
  };

  await updateEstructuraPageSection("sensibilizacion", "galeria", data);
  revalidatePath("/", "layout");
}


export async function updateSensibilizacionMenuPreview(formData: FormData) {
  const estructura = await getEstructura();
  const page = estructura?.sitio.paginas.find((p: any) => p.id === "sensibilizacion");
  if (!page) return;

  const section = page.secciones.menu_preview;
  const uploaded = await uploadMediaFile(formData.get("imagen"), {
    pageSlug: "sensibilizacion",
    sectionKey: "menu_preview",
  });
  if (!uploaded) return;

  await updateEstructuraPageSection("sensibilizacion", "menu_preview", {
    imagen: { ...section.imagen, valor: uploaded.url, key: uploaded.key },
  });
  revalidatePath("/", "layout");
}
