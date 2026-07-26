"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageSlot } from "@/components/ImageSlot";
import { UploadCloudIcon, TrashIcon, RefreshCwIcon, Loader2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { uploadGaleriaImage } from "../actions";

interface GaleriaImageData {
  id: string;
  url: string;
  alt: string;
}

interface GaleriaImageState extends GaleriaImageData {
  key?: string;
  status: "ready" | "uploading" | "error";
  previewUrl?: string;
}

function generateImageId() {
  return `imagen_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

export function GaleriaDropzone({ initialImages }: { initialImages: GaleriaImageData[] }) {
  const [images, setImages] = useState<GaleriaImageState[]>(
    initialImages.map((img) => ({ ...img, status: "ready" }))
  );
  const [isDragging, setIsDragging] = useState(false);
  const browseInputRef = useRef<HTMLInputElement>(null);
  const replaceInputRef = useRef<HTMLInputElement>(null);
  const replacingId = useRef<string | null>(null);

  // Each image uploads on its own, right when it's picked — never bundled
  // into the big "Guardar Cambios" submit — so the save request stays tiny
  // (ids/urls/alt text only) no matter how many photos are in the gallery.
  async function uploadOne(id: string, file: File) {
    setImages((prev) => prev.map((img) => (img.id === id ? { ...img, status: "uploading" } : img)));
    try {
      const fd = new FormData();
      fd.append("file", file);
      const uploaded = await uploadGaleriaImage(fd);
      setImages((prev) =>
        prev.map((img) =>
          img.id === id
            ? uploaded
              ? { ...img, url: uploaded.url, key: uploaded.key, status: "ready" }
              : { ...img, status: "error" }
            : img
        )
      );
      if (!uploaded) toast.error("No se pudo subir la imagen.");
    } catch (error) {
      console.error(error);
      setImages((prev) => prev.map((img) => (img.id === id ? { ...img, status: "error" } : img)));
      toast.error("No se pudo subir la imagen.");
    }
  }

  async function addFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    const files = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
    if (files.length === 0) return;

    const newImages: GaleriaImageState[] = files.map((file) => ({
      id: generateImageId(),
      url: "",
      alt: "",
      status: "uploading",
      previewUrl: URL.createObjectURL(file),
    }));
    setImages((prev) => [...newImages, ...prev]);

    // Uploaded one at a time (not Promise.all) to avoid piling many
    // simultaneous large uploads onto the backend at once.
    for (let i = 0; i < files.length; i++) {
      await uploadOne(newImages[i].id, files[i]);
    }
  }

  function removeImage(id: string) {
    setImages((prev) => prev.filter((img) => img.id !== id));
  }

  function updateAlt(id: string, alt: string) {
    setImages((prev) => prev.map((img) => (img.id === id ? { ...img, alt } : img)));
  }

  function replaceImage(id: string, file: File) {
    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, previewUrl: URL.createObjectURL(file) } : img))
    );
    uploadOne(id, file);
  }

  const uploadingCount = images.filter((img) => img.status === "uploading").length;

  return (
    <div className="space-y-4">
      {/* Dropbox-style multi-file dropzone */}
      <div
        role="button"
        tabIndex={0}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          addFiles(e.dataTransfer.files);
        }}
        onClick={() => browseInputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") browseInputRef.current?.click();
        }}
        className={cn(
          "flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-10 text-center cursor-pointer transition-colors",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-muted-foreground/50 hover:bg-muted/40"
        )}
      >
        <UploadCloudIcon className="h-8 w-8 text-muted-foreground" />
        <p className="text-sm font-medium">Arrastra imágenes aquí o haz clic para subir</p>
        <p className="text-xs text-muted-foreground">Puedes soltar varias a la vez · PNG, JPG, WEBP</p>
        <input
          ref={browseInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            addFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      {/* Shared hidden input used to receive a replacement file for a single existing card */}
      <input
        ref={replaceInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file && replacingId.current) replaceImage(replacingId.current, file);
          e.target.value = "";
          replacingId.current = null;
        }}
      />

      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          {images.length} {images.length === 1 ? "imagen" : "imágenes"}
        </span>
        {uploadingCount > 0 && (
          <span className="text-sm text-muted-foreground flex items-center gap-1.5">
            <Loader2Icon className="h-3.5 w-3.5 animate-spin" />
            Subiendo {uploadingCount} {uploadingCount === 1 ? "imagen" : "imágenes"}…
          </span>
        )}
      </div>

      {images.length === 0 ? (
        <p className="text-sm text-muted-foreground border border-dashed rounded-lg p-6 text-center">
          Aún no hay imágenes en la galería.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <div key={img.id} className="group relative border rounded-lg overflow-hidden bg-background">
              {/* Only submitted once it actually has an uploaded url, so an
                  in-progress or failed upload can never save a blank entry. */}
              {img.url && (
                <>
                  <input type="hidden" name="imagenes_id" value={img.id} />
                  <input type="hidden" name={`${img.id}_url`} value={img.url} />
                  {img.key && <input type="hidden" name={`${img.id}_key`} value={img.key} />}
                </>
              )}

              <div className="aspect-square relative">
                <ImageSlot
                  src={img.previewUrl || img.url}
                  placeholder="Sin imagen"
                  className="bg-muted text-muted-foreground"
                />

                {img.status === "uploading" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <Loader2Icon className="h-6 w-6 text-white animate-spin" />
                  </div>
                )}

                {img.status === "error" && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/60 text-white text-xs p-2 text-center">
                    Error al subir
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      className="h-7 text-xs"
                      onClick={() => {
                        replacingId.current = img.id;
                        replaceInputRef.current?.click();
                      }}
                    >
                      Reintentar
                    </Button>
                  </div>
                )}

                {img.status === "ready" && (
                  <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      type="button"
                      size="icon"
                      variant="secondary"
                      className="h-8 w-8"
                      onClick={() => {
                        replacingId.current = img.id;
                        replaceInputRef.current?.click();
                      }}
                      aria-label="Reemplazar imagen"
                    >
                      <RefreshCwIcon className="h-4 w-4" />
                    </Button>
                  </div>
                )}

                <Button
                  type="button"
                  size="icon"
                  variant="destructive"
                  className="absolute top-1.5 right-1.5 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeImage(img.id)}
                  aria-label="Eliminar imagen"
                >
                  <TrashIcon className="h-3.5 w-3.5" />
                </Button>
              </div>

              <Input
                value={img.alt}
                onChange={(e) => updateAlt(img.id, e.target.value)}
                placeholder="Texto alternativo"
                className="rounded-none border-0 border-t text-xs h-9 focus-visible:ring-0"
              />
              {/* keep the field name stable for the server action even though the
                  visible input above is controlled for a smoother typing experience */}
              {img.url && <input type="hidden" name={`${img.id}_alt`} value={img.alt} readOnly />}
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-muted-foreground text-center">
        Las imágenes se suben apenas las agregas. Los cambios de orden, texto alternativo o
        eliminación se aplican al hacer clic en &quot;Guardar Cambios&quot;.
      </p>
    </div>
  );
}
