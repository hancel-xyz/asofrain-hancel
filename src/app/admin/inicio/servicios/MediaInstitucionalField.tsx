"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { FilmIcon, ImageIcon, Loader2Icon, UploadCloudIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageSlot } from "@/components/ImageSlot";
import { isVideoMedia } from "@/lib/mediaType";
import { cn } from "@/lib/utils";
import { uploadInicioMedia } from "../actions";

/** Matches the Server Action body limit in next.config.ts, with room to spare. */
const MAX_MB = 45;

interface MediaState {
  url: string;
  key: string;
  mime: string;
}

/**
 * Picks the image *or* video shown in the institutional card on the home page.
 *
 * The file uploads the moment it's chosen (a video is far too big to ride
 * along with the rest of the form), and the resulting url/key/mime are what
 * the save submits.
 */
export function MediaInstitucionalField({
  currentUrl = "",
  currentKey = "",
  currentMime = "",
}: {
  currentUrl?: string;
  currentKey?: string;
  currentMime?: string;
}) {
  const [media, setMedia] = useState<MediaState>({
    url: currentUrl,
    key: currentKey,
    mime: currentMime,
  });
  const [status, setStatus] = useState<"idle" | "uploading" | "error">("idle");
  // Shows the picked file straight away, before (and after) it reaches storage.
  const [localPreview, setLocalPreview] = useState<{ url: string; isVideo: boolean } | null>(null);
  const objectUrl = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
    };
  }, []);

  async function handleFile(file: File | undefined) {
    if (!file) return;

    if (file.size > MAX_MB * 1024 * 1024) {
      toast.error(`El archivo pesa ${(file.size / 1024 / 1024).toFixed(0)} MB. El máximo es ${MAX_MB} MB.`);
      return;
    }

    if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
    objectUrl.current = URL.createObjectURL(file);
    setLocalPreview({ url: objectUrl.current, isVideo: file.type.startsWith("video/") });
    setStatus("uploading");

    try {
      const fd = new FormData();
      fd.append("file", file);
      const uploaded = await uploadInicioMedia(fd);
      if (!uploaded) throw new Error("upload devolvió null");
      setMedia({ url: uploaded.url, key: uploaded.key, mime: uploaded.mime });
      setStatus("idle");
      toast.success(
        uploaded.mime.startsWith("video/")
          ? "Video subido. Guarda los cambios para publicarlo."
          : "Imagen subida. Guarda los cambios para publicarla."
      );
    } catch (error) {
      console.error(error);
      setStatus("error");
      toast.error("No se pudo subir el archivo. Intenta de nuevo.");
    }
  }

  // A blob: url carries no extension or mime, so the picked file's own type
  // decides how to preview it; otherwise fall back to what's saved.
  const previewSrc = localPreview?.url || media.url;
  const previewIsVideo = localPreview ? localPreview.isVideo : isVideoMedia(media.url, media.mime);

  return (
    <div className="space-y-4">
      {/* Submitted with the form; the file itself never is. */}
      <input type="hidden" name="media_url" value={media.url} readOnly />
      <input type="hidden" name="media_key" value={media.key} readOnly />
      <input type="hidden" name="media_mime" value={media.mime} readOnly />

      <div className="grid gap-4 md:grid-cols-[1fr_320px] md:items-start">
        <div className="flex flex-col gap-3">
          <Label htmlFor="media_file">Imagen o video</Label>
          <Input
            id="media_file"
            type="file"
            accept="image/*,video/*"
            disabled={status === "uploading"}
            onChange={(e) => {
              handleFile(e.target.files?.[0]);
              e.target.value = "";
            }}
          />
          <p className="text-xs text-muted-foreground">
            Puedes subir una foto (JPG, PNG, WEBP) o un video (MP4, WEBM). Si subes un video, en la página se
            reproduce solo, en silencio y en bucle; quien quiera verlo completo y con sonido puede abrirlo desde
            la misma tarjeta. Máximo {MAX_MB} MB — para videos largos, recorta el clip antes de subirlo.
          </p>
          {status === "uploading" && (
            <p className="flex items-center gap-2 text-xs text-muted-foreground">
              <Loader2Icon className="h-3.5 w-3.5 animate-spin" />
              Subiendo… no cierres esta página.
            </p>
          )}
          {status === "error" && (
            <p className="text-xs text-destructive">No se pudo subir el archivo. Vuelve a elegirlo.</p>
          )}
          {media.url && status === "idle" && (
            <p className="flex items-center gap-2 text-xs text-muted-foreground">
              {previewIsVideo ? <FilmIcon className="h-3.5 w-3.5" /> : <ImageIcon className="h-3.5 w-3.5" />}
              Actualmente: {previewIsVideo ? "video" : "imagen"}
            </p>
          )}
        </div>

        <div
          className={cn(
            "relative aspect-[4/3] overflow-hidden rounded-lg border bg-muted",
            status === "uploading" && "opacity-70"
          )}
        >
          {previewSrc ? (
            previewIsVideo ? (
              // eslint-disable-next-line jsx-a11y/media-has-caption
              <video
                key={previewSrc}
                src={previewSrc}
                className="absolute inset-0 h-full w-full object-cover"
                muted
                loop
                playsInline
                autoPlay
                controls
              />
            ) : (
              <ImageSlot src={previewSrc} placeholder="Sin archivo" className="bg-muted text-muted-foreground" />
            )
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground">
              <UploadCloudIcon className="h-6 w-6 opacity-40" />
              <span className="text-xs">Aún no hay imagen ni video</span>
            </div>
          )}

          {status === "uploading" && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <Loader2Icon className="h-6 w-6 animate-spin text-white" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
