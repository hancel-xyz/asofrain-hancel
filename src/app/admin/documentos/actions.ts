"use server";
import { getEstructura, updateEstructuraPageSection } from "@/lib/data";
import { uploadMediaFile } from "@/lib/media";
import { revalidatePath } from "next/cache";

// Uploads a single PDF directly (bypassing the big form submit) — same fix
// as the Sensibilizacion gallery: uploading happens immediately per-file
// instead of bundling every document's bytes into one save request.
export async function uploadDocumento(formData: FormData) {
  return uploadMediaFile(formData.get("file"), {
    pageSlug: "documentos",
    sectionKey: "lista",
  });
}

export async function updateDocumentosLista(formData: FormData) {
  const estructura = await getEstructura();
  const page = estructura?.sitio.paginas.find((p: any) => p.id === "documentos");
  if (!page) return;

  const existingById = new Map<string, any>(
    (page.secciones.lista.documentos ?? []).map((d: any) => [d.id, d])
  );
  const docIds = formData.getAll("documentos_id").map((v) => v.toString()).filter(Boolean);

  const data = {
    documentos: docIds.map((id) => {
      const existing = existingById.get(id);
      const url = formData.get(`${id}_url`)?.toString() || "";
      return {
        id,
        titulo: formData.get(`${id}_titulo`)?.toString() || existing?.titulo || "",
        url: url || existing?.url || "",
        key: formData.get(`${id}_key`)?.toString() || existing?.key || "",
      };
    }),
  };

  await updateEstructuraPageSection("documentos", "lista", data);
  revalidatePath("/", "layout");
}
