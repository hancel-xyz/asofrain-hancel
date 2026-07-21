"use client";

import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageSlot } from "@/components/ImageSlot";
import { UploadCloudIcon, TrashIcon, RefreshCwIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface GaleriaImageData {
  id: string;
  url: string;
  alt: string;
}

interface GaleriaImageState extends GaleriaImageData {
  file?: File;
  previewUrl?: string;
}

function generateImageId() {
  return `imagen_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

/** Attaches a File to a hidden file input via DataTransfer so it travels
 * with the surrounding <form> submit just like a normally-picked file. */
function attachFileRef(file?: File) {
  return (el: HTMLInputElement | null) => {
    if (!el || !file) return;
    const dt = new DataTransfer();
    dt.items.add(file);
    el.files = dt.files;
  };
}

export function GaleriaDropzone({ initialImages }: { initialImages: GaleriaImageData[] }) {
  const [images, setImages] = useState<GaleriaImageState[]>(initialImages);
  const [isDragging, setIsDragging] = useState(false);
  const browseInputRef = useRef<HTMLInputElement>(null);
  const replaceInputRef = useRef<HTMLInputElement>(null);
  const replacingId = useRef<string | null>(null);

  function addFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    const newImages: GaleriaImageState[] = Array.from(fileList)
      .filter((f) => f.type.startsWith("image/"))
      .map((file) => ({
        id: generateImageId(),
        url: "",
        alt: "",
        file,
        previewUrl: URL.createObjectURL(file),
      }));
    if (newImages.length === 0) return;
    setImages((prev) => [...newImages, ...prev]);
  }

  function removeImage(id: string) {
    setImages((prev) => prev.filter((img) => img.id !== id));
  }

  function updateAlt(id: string, alt: string) {
    setImages((prev) => prev.map((img) => (img.id === id ? { ...img, alt } : img)));
  }

  function replaceImage(id: string, file: File) {
    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, file, previewUrl: URL.createObjectURL(file) } : img))
    );
  }

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
      </div>

      {images.length === 0 ? (
        <p className="text-sm text-muted-foreground border border-dashed rounded-lg p-6 text-center">
          Aún no hay imágenes en la galería.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <div key={img.id} className="group relative border rounded-lg overflow-hidden bg-background">
              <input type="hidden" name="imagenes_id" value={img.id} />
              <input ref={attachFileRef(img.file)} type="file" name={`${img.id}_url`} className="hidden" />

              <div className="aspect-square relative">
                <ImageSlot
                  src={img.previewUrl || img.url}
                  placeholder="Sin imagen"
                  className="bg-muted text-muted-foreground"
                />

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
                  <Button
                    type="button"
                    size="icon"
                    variant="destructive"
                    className="h-8 w-8"
                    onClick={() => removeImage(img.id)}
                    aria-label="Eliminar imagen"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Input
                value={img.alt}
                onChange={(e) => updateAlt(img.id, e.target.value)}
                placeholder="Texto alternativo"
                className="rounded-none border-0 border-t text-xs h-9 focus-visible:ring-0"
              />
              {/* keep the field name stable for the server action even though the
                  visible input above is controlled for a smoother typing experience */}
              <input type="hidden" name={`${img.id}_alt`} value={img.alt} readOnly />
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-muted-foreground text-center">
        Las imágenes que agregues, reemplaces o elimines aquí se aplican al hacer clic en &quot;Guardar Cambios&quot;.
      </p>
    </div>
  );
}
