"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ImageSlot } from "@/components/ImageSlot";
import { ImagesIcon, Loader2Icon, PlusIcon, TrashIcon, UploadCloudIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { uploadTipoSensibilizacionImagen } from "../actions";

export interface TipoGaleriaImagen {
  id: string;
  url: string;
  alt: string;
  key?: string;
}

export interface TipoVineta {
  id: string;
  valor: string;
}

export interface TipoData {
  id: string;
  tipo: string;
  titulo: string;
  imagenUrl: string;
  vinetas: TipoVineta[];
  galeria: TipoGaleriaImagen[];
}

interface GaleriaImagenState extends TipoGaleriaImagen {
  status: "ready" | "uploading" | "error";
  previewUrl?: string;
}

interface TipoState extends Omit<TipoData, "galeria"> {
  galeria: GaleriaImagenState[];
  /** Object URL of a newly picked cover, so it previews before saving. */
  imagenPreview?: string;
}

function generateTipoId() {
  return `tipo_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

function generateImagenId() {
  return `imagen_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

function generateVinetaId() {
  return `vineta_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

/**
 * Awareness types: you can create as many as you need, each with its cover,
 * its bullets and its own photo gallery.
 *
 * Covers ride along with "Guardar Cambios" (one small file per type), while
 * gallery photos upload the moment they're dropped — a gallery can hold dozens
 * of them and bundling those into the save would blow up the request.
 */
export function TiposEditor({ initialTipos }: { initialTipos: TipoData[] }) {
  const [tipos, setTipos] = useState<TipoState[]>(() =>
    initialTipos.map((tipo) => ({
      ...tipo,
      galeria: tipo.galeria.map((img) => ({ ...img, status: "ready" as const })),
    }))
  );

  // Object URLs created for previews are revoked when the editor unmounts.
  const objectUrls = useRef<string[]>([]);
  useEffect(() => {
    const urls = objectUrls.current;
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, []);

  function trackObjectUrl(file: File) {
    const url = URL.createObjectURL(file);
    objectUrls.current.push(url);
    return url;
  }

  function patchTipo(id: string, patch: Partial<TipoState>) {
    setTipos((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  }

  function addTipo() {
    setTipos((prev) => [
      ...prev,
      {
        id: generateTipoId(),
        tipo: "",
        titulo: "",
        imagenUrl: "",
        vinetas: [{ id: generateVinetaId(), valor: "" }],
        galeria: [],
      },
    ]);
  }

  function removeTipo(id: string) {
    setTipos((prev) => prev.filter((t) => t.id !== id));
  }

  function addVineta(tipoId: string) {
    setTipos((prev) =>
      prev.map((t) =>
        t.id === tipoId ? { ...t, vinetas: [...t.vinetas, { id: generateVinetaId(), valor: "" }] } : t
      )
    );
  }

  function removeVineta(tipoId: string, vinetaId: string) {
    setTipos((prev) =>
      prev.map((t) => (t.id === tipoId ? { ...t, vinetas: t.vinetas.filter((v) => v.id !== vinetaId) } : t))
    );
  }

  function patchVineta(tipoId: string, vinetaId: string, valor: string) {
    setTipos((prev) =>
      prev.map((t) =>
        t.id === tipoId
          ? { ...t, vinetas: t.vinetas.map((v) => (v.id === vinetaId ? { ...v, valor } : v)) }
          : t
      )
    );
  }

  function patchImagen(tipoId: string, imagenId: string, patch: Partial<GaleriaImagenState>) {
    setTipos((prev) =>
      prev.map((t) =>
        t.id === tipoId
          ? { ...t, galeria: t.galeria.map((img) => (img.id === imagenId ? { ...img, ...patch } : img)) }
          : t
      )
    );
  }

  async function uploadOne(tipoId: string, imagenId: string, file: File) {
    patchImagen(tipoId, imagenId, { status: "uploading" });
    try {
      const fd = new FormData();
      fd.append("file", file);
      const uploaded = await uploadTipoSensibilizacionImagen(fd);
      if (uploaded) {
        patchImagen(tipoId, imagenId, { url: uploaded.url, key: uploaded.key, status: "ready" });
      } else {
        patchImagen(tipoId, imagenId, { status: "error" });
        toast.error("No se pudo subir la imagen.");
      }
    } catch (error) {
      console.error(error);
      patchImagen(tipoId, imagenId, { status: "error" });
      toast.error("No se pudo subir la imagen.");
    }
  }

  async function addGaleriaFiles(tipoId: string, fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    const files = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
    if (files.length === 0) return;

    const nuevas: GaleriaImagenState[] = files.map((file) => ({
      id: generateImagenId(),
      url: "",
      alt: "",
      status: "uploading",
      previewUrl: trackObjectUrl(file),
    }));

    setTipos((prev) =>
      prev.map((t) => (t.id === tipoId ? { ...t, galeria: [...t.galeria, ...nuevas] } : t))
    );

    // One at a time so a long drop doesn't hammer the backend at once.
    for (let i = 0; i < files.length; i++) {
      await uploadOne(tipoId, nuevas[i].id, files[i]);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-sm text-muted-foreground">
          {tipos.length} {tipos.length === 1 ? "tipo" : "tipos"} de sensibilización
        </span>
        <Button type="button" className="gap-2" onClick={addTipo}>
          <PlusIcon className="h-4 w-4" />
          Agregar tipo
        </Button>
      </div>

      {tipos.length === 0 && (
        <p className="text-sm text-muted-foreground border border-dashed rounded-lg p-8 text-center">
          Todavía no hay tipos de sensibilización. Agrega el primero con el botón de arriba.
        </p>
      )}

      {tipos.map((tipo, i) => (
        <div key={tipo.id} className="p-4 border rounded-lg space-y-5">
          <div className="flex items-center justify-between">
            <h4 className="font-medium flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-muted text-xs font-semibold">
                {i + 1}
              </span>
              {tipo.titulo || tipo.tipo || "Tipo de sensibilización"}
            </h4>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-destructive h-8 w-8"
              onClick={() => removeTipo(tipo.id)}
              aria-label="Eliminar este tipo"
            >
              <TrashIcon className="h-4 w-4" />
            </Button>
          </div>

          <input type="hidden" name="tipos_id" value={tipo.id} />

          {/* ---- Imagen de portada + preview ---- */}
          <div className="grid gap-4 md:grid-cols-[1fr_260px] md:items-start">
            <div className="flex flex-col gap-3">
              <Label htmlFor={`${tipo.id}_imagen`}>Imagen</Label>
              <Input
                id={`${tipo.id}_imagen`}
                name={`${tipo.id}_imagen`}
                type="file"
                accept="image/*,video/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  patchTipo(tipo.id, { imagenPreview: file ? trackObjectUrl(file) : undefined });
                }}
              />
              <p className="text-xs text-muted-foreground">
                Es la imagen que encabeza la tarjeta en la página de sensibilización. Se sube al guardar.
              </p>
            </div>
            <div className="space-y-1.5">
              <div className="relative aspect-[16/10] rounded-lg overflow-hidden border">
                <ImageSlot
                  src={tipo.imagenPreview || tipo.imagenUrl}
                  placeholder="Sin imagen"
                  className="bg-muted text-muted-foreground"
                />
              </div>
              <p className="text-xs text-muted-foreground text-center">
                {tipo.imagenPreview ? "Nueva imagen (sin guardar)" : "Imagen actual"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor={`${tipo.id}_tipo`}>Tipo</Label>
              <Input
                id={`${tipo.id}_tipo`}
                name={`${tipo.id}_tipo`}
                value={tipo.tipo}
                onChange={(e) => patchTipo(tipo.id, { tipo: e.target.value })}
                placeholder="04 · COLEGIOS"
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor={`${tipo.id}_titulo`}>Titulo</Label>
              <Input
                id={`${tipo.id}_titulo`}
                name={`${tipo.id}_titulo`}
                value={tipo.titulo}
                onChange={(e) => patchTipo(tipo.id, { titulo: e.target.value })}
                placeholder="Título de la tarjeta"
              />
            </div>
          </div>

          {/* ---- Viñetas ---- */}
          <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-medium">Viñetas</span>
              <Button type="button" size="sm" variant="outline" className="gap-2" onClick={() => addVineta(tipo.id)}>
                <PlusIcon className="h-3.5 w-3.5" />
                Agregar viñeta
              </Button>
            </div>

            {tipo.vinetas.length === 0 ? (
              <p className="text-xs text-muted-foreground">Esta tarjeta no tiene viñetas.</p>
            ) : (
              <div className="space-y-2">
                {tipo.vinetas.map((vineta, vi) => (
                  <div key={vineta.id} className="flex items-center gap-2">
                    <input type="hidden" name={`${tipo.id}_vineta_id`} value={vineta.id} />
                    <Input
                      name={`${tipo.id}_${vineta.id}`}
                      value={vineta.valor}
                      onChange={(e) => patchVineta(tipo.id, vineta.id, e.target.value)}
                      placeholder={`Viñeta ${vi + 1}`}
                      aria-label={`Viñeta ${vi + 1}`}
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 shrink-0 text-destructive"
                      onClick={() => removeVineta(tipo.id, vineta.id)}
                      aria-label={`Eliminar la viñeta ${vi + 1}`}
                    >
                      <TrashIcon className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ---- Galería del tipo ---- */}
          <div className="rounded-lg border bg-muted/30 p-4 space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <ImagesIcon className="h-4 w-4 text-muted-foreground" />
                Galería de esta sensibilización
              </div>
              <span className="text-xs text-muted-foreground">
                {tipo.galeria.length} {tipo.galeria.length === 1 ? "imagen" : "imágenes"}
              </span>
            </div>

            <GaleriaDropzone tipoId={tipo.id} onFiles={addGaleriaFiles} />

            {tipo.galeria.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
                {tipo.galeria.map((img, imgIndex) => (
                  <div key={img.id} className="group relative rounded-lg border bg-background overflow-hidden">
                    {/* Only submitted once it actually has an uploaded url, so an
                        in-progress or failed upload can never save a blank entry. */}
                    {img.url && (
                      <>
                        <input type="hidden" name={`${tipo.id}_galeria_id`} value={img.id} />
                        <input type="hidden" name={`${img.id}_url`} value={img.url} />
                        {img.key && <input type="hidden" name={`${img.id}_key`} value={img.key} />}
                        <input type="hidden" name={`${img.id}_alt`} value={img.alt} readOnly />
                      </>
                    )}

                    <div className="relative aspect-square">
                      <ImageSlot
                        src={img.previewUrl || img.url}
                        placeholder={`Foto ${imgIndex + 1}`}
                        className="bg-muted text-muted-foreground"
                      />

                      {img.status === "uploading" && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                          <Loader2Icon className="h-6 w-6 text-white animate-spin" />
                        </div>
                      )}

                      {img.status === "error" && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-white text-xs p-2 text-center">
                          Error al subir · elimínala y vuelve a intentarlo
                        </div>
                      )}

                      <Button
                        type="button"
                        size="icon"
                        variant="destructive"
                        className="absolute top-1.5 right-1.5 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() =>
                          setTipos((prev) =>
                            prev.map((t) =>
                              t.id === tipo.id ? { ...t, galeria: t.galeria.filter((g) => g.id !== img.id) } : t
                            )
                          )
                        }
                        aria-label={`Eliminar la foto ${imgIndex + 1}`}
                      >
                        <TrashIcon className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}

      <p className="text-xs text-muted-foreground text-center">
        Las fotos de la galería se suben apenas las agregas. Los demás cambios (tipos, textos, viñetas, portadas y
        eliminaciones) se aplican al hacer clic en &quot;Guardar Cambios&quot;.
      </p>
    </div>
  );
}

function GaleriaDropzone({
  tipoId,
  onFiles,
}: {
  tipoId: string;
  onFiles: (tipoId: string, files: FileList | null) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
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
        onFiles(tipoId, e.dataTransfer.files);
      }}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
      }}
      className={cn(
        "flex flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed p-7 text-center cursor-pointer transition-colors",
        isDragging
          ? "border-primary bg-primary/5"
          : "border-muted-foreground/25 hover:border-muted-foreground/50 hover:bg-muted/40"
      )}
    >
      <UploadCloudIcon className="h-6 w-6 text-muted-foreground" />
      <p className="text-sm font-medium">Arrastra las fotos de esta sensibilización o haz clic para subirlas</p>
      <p className="text-xs text-muted-foreground">Puedes soltar varias a la vez · PNG, JPG, WEBP</p>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          onFiles(tipoId, e.target.files);
          e.target.value = "";
        }}
      />
    </div>
  );
}
