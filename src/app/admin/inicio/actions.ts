"use server";

import { getEstructura, updateEstructuraPageSection } from "@/lib/data";
import { uploadMediaFile } from "@/lib/media";
import { leerFondoDeFormData } from "@/lib/fondo";
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
  // How dark the layer over the photo is, so the hero copy stays readable
  // whatever image is uploaded.
  const oscuridadRaw = formData.get("imagen_fondo_oscuridad")?.toString();
  const oscuridad = oscuridadRaw !== undefined ? Number(oscuridadRaw) : undefined;
  if (uploaded || encuadre || oscuridad !== undefined) {
    data.imagen_fondo = {
      ...page?.secciones.hero.imagen_fondo,
      ...(uploaded ? { valor: uploaded.url, key: uploaded.key } : {}),
      ...(encuadre ? { encuadre } : {}),
      ...(Number.isFinite(oscuridad) ? { oscuridad: Math.min(100, Math.max(0, oscuridad as number)) } : {}),
    };
  }

  await updateEstructuraPageSection("inicio", "hero", data);
  revalidatePath("/");
  revalidatePath("/admin/inicio/hero");
}

export async function updateInicioMetricas(formData: FormData) {
  const estructura = await getEstructura();
  const page = estructura?.sitio.paginas.find((p: any) => p.id === "inicio");

  // The set of figures is whatever the editor submitted, in its order — they
  // used to be four fixed slots, so adding one meant changing this file.
  const previas = new Map<string, any>(
    (page?.secciones.metricas.items ?? []).map((m: any) => [m.id, m])
  );
  const ids = formData.getAll("metricas_id").map((v) => v.toString()).filter(Boolean);

  const data = {
    dato_breve: { valor: formData.get("dato_breve") as string },
    titulo_principal: { valor: formData.get("titulo_principal") as string },
    descripcion: { valor: formData.get("descripcion") as string },
    items: ids.map((id) => {
      const tipo = formData.get(`${id}_tipo`)?.toString() === "items" ? "items" : "texto";
      const lista = (formData.get(`${id}_items`)?.toString() || "")
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean);

      return {
        ...(previas.get(id) ?? {}),
        id,
        titulo: { valor: formData.get(`${id}_titulo`)?.toString() || "" },
        numero: { valor: formData.get(`${id}_numero`)?.toString() || "" },
        descripcion: {
          tipo_activo: tipo,
          texto: { valor: formData.get(`${id}_texto`)?.toString() || "" },
          items: { valor: lista },
        },
      };
    }),
  };

  await updateEstructuraPageSection("inicio", "metricas", data);
  revalidatePath("/");
  revalidatePath("/admin/inicio/metricas");
}

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

/** Uploads the photo or video behind the closing quote. */
export async function uploadInicioFraseFondo(formData: FormData) {
  return uploadMediaFile(formData.get("file"), {
    pageSlug: "inicio",
    sectionKey: "frase",
  });
}

export async function updateInicioFrase(formData: FormData) {
  const estructura = await getEstructura();
  const page = estructura?.sitio.paginas.find((p: any) => p.id === "inicio");

  const data: any = {
    titulo_pequeno: { valor: formData.get("titulo_pequeno") as string },
    texto: { valor: formData.get("texto") as string },
  };

  const fondo = leerFondoDeFormData(formData, "fondo", page?.secciones.frase?.fondo);
  if (fondo) data.fondo = fondo;

  await updateEstructuraPageSection("inicio", "frase", data);
  revalidatePath("/");
  revalidatePath("/admin/inicio/frase");
}
