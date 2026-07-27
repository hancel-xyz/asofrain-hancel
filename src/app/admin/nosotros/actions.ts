"use server";

import { getEstructura, updateEstructuraPageSection } from "@/lib/data";
import { uploadMediaFile } from "@/lib/media";
import { revalidatePath } from "next/cache";

export async function updateNosotrosHero(formData: FormData) {
  const estructura = await getEstructura();
  const page = estructura?.sitio.paginas.find((p: any) => p.id === "nosotros");

  const data: any = {
    titulo: { valor: formData.get("titulo") as string },
    descripcion: { valor: formData.get("descripcion") as string },
    cta_1: {
      texto: formData.get("cta1_texto") as string,
      url: formData.get("cta1_url") as string
    },
    cta_2: {
      texto: formData.get("cta2_texto") as string,
      url: formData.get("cta2_url") as string
    }
  };

  const uploaded = await uploadMediaFile(formData.get("imagen_fondo"), {
    pageSlug: "nosotros",
    sectionKey: "hero",
  });
  if (uploaded) {
    data.imagen_fondo = { ...page?.secciones.hero.imagen_fondo, valor: uploaded.url, key: uploaded.key };
  }

  await updateEstructuraPageSection("nosotros", "hero", data);
  revalidatePath("/");
  revalidatePath("/admin/nosotros/hero");
}

export async function updateNosotrosQuienesSomos(formData: FormData) {
  const data = {
    titulo: { valor: formData.get("titulo") as string },
    descripcion: { valor: formData.get("descripcion") as string }
  };
  await updateEstructuraPageSection("nosotros", "quienes_somos", data);
  revalidatePath("/");
  revalidatePath("/admin/nosotros/quienes-somos");
}

export async function updateNosotrosHistoria(formData: FormData) {
  const data = {
    titulo: { valor: formData.get("titulo") as string },
    filas: [1, 2, 3, 4].map((id) => ({
      id: `fila_${id}`,
      ano: { valor: formData.get(`f${id}_ano`) as string },
      titulo: { valor: formData.get(`f${id}_titulo`) as string },
      descripcion: { valor: formData.get(`f${id}_desc`) as string }
    }))
  };
  await updateEstructuraPageSection("nosotros", "historia", data);
  revalidatePath("/");
  revalidatePath("/admin/nosotros/historia");
}

export async function updateNosotrosMision(formData: FormData) {
  const data = { descripcion: { valor: formData.get("descripcion") as string } };
  await updateEstructuraPageSection("nosotros", "mision", data);
  revalidatePath("/");
  revalidatePath("/admin/nosotros/mision");
}

export async function updateNosotrosVision(formData: FormData) {
  const data = { descripcion: { valor: formData.get("descripcion") as string } };
  await updateEstructuraPageSection("nosotros", "vision", data);
  revalidatePath("/");
  revalidatePath("/admin/nosotros/vision");
}

export async function updateNosotrosValores(formData: FormData) {
  const data = {
    titulo: { valor: formData.get("titulo") as string },
    cuadros: [1, 2, 3, 4, 5, 6, 7, 8].map((id) => ({
      id: `cuadro_${id}`,
      numero: { automatico: true, valor: id },
      titulo: { valor: formData.get(`c${id}_titulo`) as string },
      descripcion: { valor: formData.get(`c${id}_desc`) as string }
    }))
  };
  await updateEstructuraPageSection("nosotros", "valores", data);
  revalidatePath("/");
  revalidatePath("/admin/nosotros/valores");
}

export async function updateNosotrosObjetoSocial(formData: FormData) {
  const data = {
    titulo: { valor: formData.get("titulo") as string },
    descripcion: { valor: formData.get("descripcion") as string }
  };
  await updateEstructuraPageSection("nosotros", "objeto_social", data);
  revalidatePath("/");
  revalidatePath("/admin/nosotros/objeto-social");
}

export async function updateNosotrosObjetoAmbiental(formData: FormData) {
  const data = {
    titulo: { valor: formData.get("titulo") as string },
    descripcion: { valor: formData.get("descripcion") as string }
  };
  await updateEstructuraPageSection("nosotros", "objeto_ambiental", data);
  revalidatePath("/");
  revalidatePath("/admin/nosotros/objeto-ambiental");
}

export async function updateNosotrosFrase1(formData: FormData) {
  const data = {
    titulo_pequeno: { valor: formData.get("titulo_pequeno") as string },
    texto: { valor: formData.get("texto_frase") as string }
  };
  await updateEstructuraPageSection("nosotros", "frase_1", data);
  revalidatePath("/");
  revalidatePath("/admin/nosotros/frase-1");
}

// Entidades aliadas (we will just read all keys starting with 'a_' for now)
export async function updateNosotrosEntidadesAliadas(formData: FormData) {
  const titulo = formData.get("titulo") as string;

  const estructura = await getEstructura();
  const page = estructura?.sitio.paginas.find((p: any) => p.id === "nosotros");
  const existingAliados = page?.secciones.entidades_aliadas.aliados ?? [];
  const existingById = new Map<string, any>(existingAliados.map((a: any) => [a.id, a]));

  // The admin UI lets you add/remove aliados client-side, so the set of ids
  // to persist (and their order) comes from the submission itself
  // (aliados_id, one per row, in order) rather than from the previously saved array.
  const ids = formData.getAll("aliados_id").map((v) => v.toString()).filter(Boolean);

  const aliados = await Promise.all(
    ids.map(async (id) => {
      const existing = existingById.get(id);
      const uploaded = await uploadMediaFile(formData.get(`${id}_logo`), {
        pageSlug: "nosotros",
        sectionKey: "entidades_aliadas",
      });
      const logo = uploaded
        ? { ...existing?.logo, valor: uploaded.url, key: uploaded.key }
        : existing?.logo ?? { valor: "", editable_admin: true, tipo: "imagen" };

      return {
        id,
        logo,
        titulo: { valor: formData.get(`${id}_titulo`)?.toString() || "" },
        descripcion: { valor: formData.get(`${id}_desc`)?.toString() || "" },
      };
    })
  );

  const data = {
    titulo: { valor: titulo },
    aliados: aliados
  };

  await updateEstructuraPageSection("nosotros", "entidades_aliadas", data);
  revalidatePath("/");
  revalidatePath("/admin/nosotros/entidades-aliadas");
}

export async function updateNosotrosMenuPreview(formData: FormData) {
  const estructura = await getEstructura();
  const page = estructura?.sitio.paginas.find((p: any) => p.id === "nosotros");
  if (!page) return;

  const section = page.secciones.menu_preview;
  const data: any = {};

  for (const key of ["quienes_somos", "historia", "valores"] as const) {
    const uploaded = await uploadMediaFile(formData.get(key), {
      pageSlug: "nosotros",
      sectionKey: "menu_preview",
    });
    if (uploaded) {
      data[key] = { ...section[key], valor: uploaded.url, key: uploaded.key };
    }
  }

  await updateEstructuraPageSection("nosotros", "menu_preview", data);
  revalidatePath("/", "layout");
}
