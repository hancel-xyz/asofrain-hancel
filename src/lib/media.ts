import { insforge } from "./insforge";

const MEDIA_BUCKET = "media";

export interface UploadedMedia {
  url: string;
  key: string;
  /** Mime type of the uploaded file, e.g. "image/png" or "video/mp4". */
  mime: string;
}

/**
 * Uploads a file coming from a Server Action's FormData to InsForge Storage
 * and registers it in media_assets. Returns null when the field was left
 * empty (no new file picked), so callers can keep the previously saved value.
 */
export async function uploadMediaFile(
  file: FormDataEntryValue | null,
  opts: { pageSlug: string; sectionKey: string; alt?: string }
): Promise<UploadedMedia | null> {
  if (!file || typeof file === "string" || file.size === 0) return null;

  const { data, error } = await insforge.storage.from(MEDIA_BUCKET).uploadAuto(file);
  if (error || !data) {
    console.error("uploadMediaFile: upload failed", error);
    throw new Error("No se pudo subir el archivo a InsForge Storage");
  }

  const { data: page } = await insforge.database
    .from("pages")
    .select("id")
    .eq("slug", opts.pageSlug)
    .maybeSingle();

  const { error: insertError } = await insforge.database.from("media_assets").insert([
    {
      bucket: MEDIA_BUCKET,
      object_key: data.key,
      url: data.url,
      alt: opts.alt ?? "",
      mime_type: file.type,
      size_bytes: file.size,
      page_id: page?.id ?? null,
      section_key: opts.sectionKey,
    },
  ]);
  if (insertError) {
    console.error("uploadMediaFile: media_assets insert failed", insertError);
  }

  return { url: data.url, key: data.key, mime: file.type };
}
