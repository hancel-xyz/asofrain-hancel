"use server";
import { getEstructura, updateEstructuraPageSection } from "@/lib/data";
import { uploadMediaFile } from "@/lib/media";
import { revalidatePath } from "next/cache";

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

export async function updateSensibilizacionTiposSensibilizacion(formData: FormData) {
  const estructura = await getEstructura();
  const page = estructura?.sitio.paginas.find((p: any) => p.id === "sensibilizacion");
  if (!page) return;

  const data: any = {
    permite_agregar: page.secciones.tipos_sensibilizacion.permite_agregar,
    tipos: [] as any[],
  };

  // Handle arrays explicitly if they exist
  const tiposArray = page.secciones.tipos_sensibilizacion.tipos;
  if (tiposArray) {
    data.tipos = await Promise.all(
      tiposArray.map(async (item: any) => {
        const id = item.id;
        const updatedItem = { ...item };
        const uploaded = await uploadMediaFile(formData.get(`${id}_imagen`), {
          pageSlug: "sensibilizacion",
          sectionKey: "tipos_sensibilizacion",
        });
        if (uploaded) updatedItem.imagen = { ...updatedItem.imagen, valor: uploaded.url, key: uploaded.key };
        if (formData.has(`${id}_tipo`)) updatedItem.tipo = { ...updatedItem.tipo, valor: formData.get(`${id}_tipo`)?.toString() || "" };
        if (formData.has(`${id}_titulo`)) updatedItem.titulo = { ...updatedItem.titulo, valor: formData.get(`${id}_titulo`)?.toString() || "" };

        const vinetasArray = item.vinetas?.items;
        if (vinetasArray) {
          updatedItem.vinetas = {
            ...item.vinetas,
            items: vinetasArray.map((vineta: any) => {
              const vinetaKey = `${id}_${vineta.id}`;
              return formData.has(vinetaKey)
                ? { ...vineta, valor: formData.get(vinetaKey)?.toString() || "" }
                : vineta;
            }),
          };
        }

        return updatedItem;
      })
    );
  }

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
