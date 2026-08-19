"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { FilmIcon, ImageIcon, Loader2Icon, UploadCloudIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FocalPointPicker } from "@/components/FocalPointPicker";
import { isVideoMedia } from "@/lib/mediaType";
import { MAX_MB_FONDO, OSCURIDAD_POR_DEFECTO } from "@/lib/fondo";
import { cn } from "@/lib/utils";

/**
 * The one control for any section backdrop: pick a photo or a video, frame it,
 * and dial in how dark the layer over it should be.
 *
 * Submits `<name>_url`, `<name>_key`, `<name>_mime`, `<name>_encuadre` and
 * `<name>_oscuridad`. The file itself uploads the moment it is chosen — a
 * video is far too big to ride along with the rest of the form.
 */
export function FondoMediaField({
  name,
  label = "Imagen o video de fondo",
  help,
  currentUrl = "",
  currentKey = "",
  currentMime = "",
  currentEncuadre = "50% 50%",
  currentOscuridad = OSCURIDAD_POR_DEFECTO,
  subir,
  aspectClassName = "aspect-[16/9]",
}: {
  name: string;
  label?: string;
  help?: string;
  currentUrl?: string;
  currentKey?: string;
  currentMime?: string;
  currentEncuadre?: string;
  currentOscuridad?: number;
  /** Server action that uploads one file and returns its url/key/mime. */
  subir: (formData: FormData) => Promise<{ url: string; key: string; mime: string } | null>;
  aspectClassName?: string;
}) {
  const [media, setMedia] = useState({ url: currentUrl, key: currentKey, mime: currentMime });
  const [status, setStatus] = useState<"idle" | "uploading" | "error">("idle");
  const [oscuridad, setOscuridad] = useState(currentOscuridad);
  const [localPreview, setLocalPreview] = useState<{ url: string; isVideo: boolean } | null>(null);
  const objectUrl = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
    };
  }, []);

  async function handleFile(file: File | undefined) {
    if (!file) return;

    if (file.size > MAX_MB_FONDO * 1024 * 1024) {
      toast.error(
        `El archivo pesa ${(file.size / 1024 / 1024).toFixed(0)} MB y el máximo es ${MAX_MB_FONDO} MB.`
      );
      return;
    }

    if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
    objectUrl.current = URL.createObjectURL(file);
    setLocalPreview({ url: objectUrl.current, isVideo: file.type.startsWith("video/") });
    setStatus("uploading");

    try {
      const fd = new FormData();
      fd.append("file", file);
      const subida = await subir(fd);
      if (!subida) throw new Error("la subida devolvio null");
      setMedia({ url: subida.url, key: subida.key, mime: subida.mime });
      setStatus("idle");
      toast.success("Archivo subido. Guarda los cambios para publicarlo.");
    } catch (error) {
      console.error(error);
      setStatus("error");
      toast.error("No se pudo subir el archivo. Intenta de nuevo.");
    }
  }

  const previewSrc = localPreview?.url || media.url;
  const esVideo = localPreview ? localPreview.isVideo : isVideoMedia(media.url, media.mime);

  return (
    <div className="space-y-5">
      <input type="hidden" name={`${name}_url`} value={media.url} readOnly />
      <input type="hidden" name={`${name}_key`} value={media.key} readOnly />
      <input type="hidden" name={`${name}_mime`} value={media.mime} readOnly />
      <input type="hidden" name={`${name}_oscuridad`} value={oscuridad} readOnly />

      <div className="grid gap-4 md:grid-cols-[1fr_300px] md:items-start">
        <div className="flex flex-col gap-3">
          <Label htmlFor={`${name}_file`}>{label}</Label>
          <Input
            id={`${name}_file`}
            type="file"
            accept="image/*,video/*"
            disabled={status === "uploading"}
            onChange={(e) => {
              handleFile(e.target.files?.[0]);
              e.target.value = "";
            }}
          />
          <p className="text-xs text-muted-foreground">
            {help ? `${help} ` : ""}Puedes subir una foto (JPG, PNG, WEBP) o un video (MP4, WEBM). El video se
            reproduce solo, en silencio y en bucle. <strong>Peso máximo: {MAX_MB_FONDO} MB</strong> — si el video
            pesa más, recórtalo o bájale la calidad antes de subirlo.
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
              {esVideo ? <FilmIcon className="h-3.5 w-3.5" /> : <ImageIcon className="h-3.5 w-3.5" />}
              Actualmente: {esVideo ? "video" : "imagen"}
            </p>
          )}

          <div className="flex flex-col gap-2 pt-2">
            <Label htmlFor={`${name}_oscuridad_range`} className="flex items-center justify-between">
              <span>Capa oscura sobre el fondo</span>
              <span className="font-normal text-muted-foreground tabular-nums">{oscuridad}%</span>
            </Label>
            <input
              id={`${name}_oscuridad_range`}
              type="range"
              min={0}
              max={100}
              step={5}
              value={oscuridad}
              onChange={(e) => setOscuridad(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <p className="text-xs text-muted-foreground">
              Sube el porcentaje si el texto encima no se lee bien; bájalo para que la foto o el video se aprecie
              más. La vista previa de la derecha muestra el resultado.
            </p>
          </div>
        </div>

        <div className={cn("relative overflow-hidden rounded-lg border bg-muted", aspectClassName)}>
          {previewSrc ? (
            <>
              {esVideo ? (
                // eslint-disable-next-line jsx-a11y/media-has-caption
                <video
                  key={previewSrc}
                  src={previewSrc}
                  className="absolute inset-0 h-full w-full object-cover"
                  muted
                  loop
                  playsInline
                  autoPlay
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={previewSrc} alt="" className="absolute inset-0 h-full w-full object-cover" />
              )}
              <div
                className="absolute inset-0 bg-[#002E1F] transition-opacity"
                style={{ opacity: oscuridad / 100 }}
              />
              <span className="absolute inset-x-0 bottom-0 p-3 text-center text-xs font-semibold text-white drop-shadow">
                Así se verá el texto encima
              </span>
            </>
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

      {previewSrc && (
        <FocalPointPicker
          key={previewSrc}
          name={`${name}_encuadre`}
          src={esVideo ? undefined : previewSrc}
          defaultValue={localPreview ? "50% 50%" : currentEncuadre}
          aspectClassName="aspect-[16/9]"
          hint={
            esVideo
              ? "El encuadre solo aplica a imágenes."
              : "Haz clic sobre la zona que siempre debe verse al recortarse."
          }
        />
      )}
    </div>
  );
}
