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
