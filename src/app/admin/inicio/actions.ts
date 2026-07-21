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
  if (uploaded) {
    data.imagen_fondo = { ...page?.secciones.hero.imagen_fondo, valor: uploaded.url, key: uploaded.key };
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

  const uploaded = await uploadMediaFile(formData.get("media_file"), {
    pageSlug: "inicio",
    sectionKey: "servicios_vista_general",
  });
  if (uploaded) {
    data.media = { ...page?.secciones.servicios_vista_general.media, url: uploaded.url, key: uploaded.key };
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
