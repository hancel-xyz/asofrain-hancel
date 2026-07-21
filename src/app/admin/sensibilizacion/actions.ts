"use server";
import { getEstructura, updateEstructuraPageSection } from "@/lib/data";
import { uploadMediaFile } from "@/lib/media";
import { revalidatePath } from "next/cache";

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

  const data: any = {
    permite_agregar: page.secciones.galeria.permite_agregar,
    titulo: { ...page.secciones.galeria.titulo, valor: formData.get("titulo")?.toString() || "" },
    imagenes: await Promise.all(
      imageIds.map(async (id) => {
        const existing = existingById.get(id);
        const updatedItem: any = existing ? { ...existing } : { id, url: "", alt: "", editable_admin: true };

        const uploaded = await uploadMediaFile(formData.get(`${id}_url`), {
          pageSlug: "sensibilizacion",
          sectionKey: "galeria",
          alt: formData.get(`${id}_alt`)?.toString(),
        });
        if (uploaded) {
          updatedItem.url = uploaded.url;
          updatedItem.key = uploaded.key;
        }
        if (formData.has(`${id}_alt`)) updatedItem.alt = formData.get(`${id}_alt`)?.toString() || "";
        return updatedItem;
      })
    ),
  };

  await updateEstructuraPageSection("sensibilizacion", "galeria", data);
  revalidatePath("/", "layout");
}

