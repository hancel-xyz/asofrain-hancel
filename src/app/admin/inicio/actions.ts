"use server";

import { getEstructura, updateEstructuraPageSection } from "@/lib/data";
import { uploadMediaFile } from "@/lib/media";
import { revalidatePath } from "next/cache";

export async function updateInicioHero(formData: FormData) {
  const data: any = {
    titulo: { valor: formData.get("titulo") as string },
    descripcion: { valor: formData.get("descripcion") as string },
    cta: {
      texto: formData.get("cta_texto") as string,
      url: formData.get("cta_url") as string
    }
  };

  const estructura = await getEstructura();
  const page = estructura?.sitio.paginas.find((p: any) => p.id === "inicio");
  const uploaded = await uploadMediaFile(formData.get("imagen_fondo"), {
    pageSlug: "inicio",
    sectionKey: "hero",
  });
  // `encuadre` is the object-position the hero photo is cropped around; it can
  // be re-adjusted without re-uploading the image.
  const encuadre = formData.get("imagen_fondo_encuadre")?.toString();
  if (uploaded || encuadre) {
    data.imagen_fondo = {
      ...page?.secciones.hero.imagen_fondo,
      ...(uploaded ? { valor: uploaded.url, key: uploaded.key } : {}),
      ...(encuadre ? { encuadre } : {}),
    };
  }

  await updateEstructuraPageSection("inicio", "hero", data);
  revalidatePath("/");
  revalidatePath("/admin/inicio/hero");
}

export async function updateInicioMetricas(formData: FormData) {
  // eca_lista comes as comma-separated string
  const ecaLista = (formData.get("m3_eca_lista") as string || "").split(",").map(s => s.trim()).filter(Boolean);

  const data = {
    dato_breve: { valor: formData.get("dato_breve") as string },
    titulo_principal: { valor: formData.get("titulo_principal") as string },
    descripcion: { valor: formData.get("descripcion") as string },
    items: [
      {
        id: "metrica_1",
        titulo: { valor: "Toneladas aprovechadas", fijo: true },
        numero: { valor: formData.get("m1_numero") as string },
        descripcion: {
          tipo_activo: "texto",
          texto: { valor: formData.get("m1_desc") as string },
          items: { valor: [] }
        }
      },
      {
        id: "metrica_2",
        titulo: { valor: "Localidades", fijo: true },
        numero: { valor: formData.get("m2_numero") as string },
        descripcion: {
          tipo_activo: "texto",
          texto: { valor: formData.get("m2_desc") as string },
          items: { valor: [] }
        }
      },
      {
        id: "metrica_3",
        titulo: { valor: "ECAs ACTIVAS", fijo: true },
        numero: { valor: formData.get("m3_numero") as string },
        descripcion: {
          tipo_activo: "texto",
          texto: { valor: formData.get("m3_desc") as string },
          items: { valor: [] }
        }
      },
      {
        id: "metrica_4",
        titulo: { valor: "ECAs:", fijo: true },
        numero: { valor: "" },
        descripcion: {
          tipo_activo: "items",
          texto: { valor: "" },
          items: { valor: ecaLista }
        }
      }
    ]
  };

  await updateEstructuraPageSection("inicio", "metricas", data);
  revalidatePath("/");
  revalidatePath("/admin/inicio/metricas");
}

/**
 * Uploads the home page's institutional image or video on its own, as soon as
 * it's picked, instead of bundling it into the section's "Guardar Cambios"
 * submit — a video would otherwise blow past the Server Action body limit and
 * fail the whole save.
 */
export async function uploadInicioMedia(formData: FormData) {
  return uploadMediaFile(formData.get("file"), {
    pageSlug: "inicio",
    sectionKey: "servicios_vista_general",
  });
}

export async function updateInicioServicios(formData: FormData) {
  const estructura = await getEstructura();
  const page = estructura?.sitio.paginas.find((p: any) => p.id === "inicio");

  const data: any = {
    titulo_media: { valor: formData.get("titulo_media") as string },
    servicios: {
      titulo: { valor: formData.get("servicios_titulo") as string },
      cards: [
        { id: "servicio_1", numero: { valor: "01" }, titulo: { valor: formData.get("s1_titulo") as string } },
        { id: "servicio_2", numero: { valor: "02" }, titulo: { valor: formData.get("s2_titulo") as string } },
        { id: "servicio_3", numero: { valor: "03" }, titulo: { valor: formData.get("s3_titulo") as string } },
        { id: "servicio_4", numero: { valor: "04" }, titulo: { valor: formData.get("s4_titulo") as string } },
        { id: "servicio_5", numero: { valor: "05" }, titulo: { valor: formData.get("s5_titulo") as string } }
      ]
    }
  };

  // The media file (which can now be a video, so potentially tens of MB) is
  // uploaded on its own via `uploadInicioMedia` the moment it's picked; only
  // its url/key/mime travel with this save.
  const mediaUrl = formData.get("media_url")?.toString() || "";
  const mediaKey = formData.get("media_key")?.toString();
  const mediaMime = formData.get("media_mime")?.toString();
  if (mediaUrl) {
    data.media = {
      ...page?.secciones.servicios_vista_general.media,
      url: mediaUrl,
      ...(mediaKey ? { key: mediaKey } : {}),
      ...(mediaMime ? { mime: mediaMime } : {}),
    };
  }

  await updateEstructuraPageSection("inicio", "servicios_vista_general", data);
  revalidatePath("/");
  revalidatePath("/admin/inicio/servicios");
}

export async function updateInicioFrase(formData: FormData) {
  const data = {
    titulo_pequeno: { valor: formData.get("titulo_pequeno") as string },
    texto: { valor: formData.get("texto") as string }
  };

  await updateEstructuraPageSection("inicio", "frase", data);
  revalidatePath("/");
  revalidatePath("/admin/inicio/frase");
}
