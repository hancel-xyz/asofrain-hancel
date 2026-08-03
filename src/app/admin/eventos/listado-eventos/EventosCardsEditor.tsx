"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ImageSlot } from "@/components/ImageSlot";
import { FocalPointPicker } from "@/components/FocalPointPicker";
import { ImagesIcon, Loader2Icon, PlusIcon, TrashIcon, UploadCloudIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { uploadEventoImagen } from "../actions";

export interface EventoGaleriaImagen {
  id: string;
  url: string;
  alt: string;
  encuadre?: string;
  key?: string;
}

export interface EventoCardData {
  id: string;
  fecha: string;
  titulo: string;
  descripcion: string;
  fotoUrl: string;
  fotoEncuadre: string;
  galeria: EventoGaleriaImagen[];
}

interface GaleriaImagenState extends EventoGaleriaImagen {
  status: "ready" | "uploading" | "error";
  previewUrl?: string;
}

interface CardState extends Omit<EventoCardData, "galeria"> {
  galeria: GaleriaImagenState[];
  /** Object URL of a newly picked cover, so the focal picker previews it. */
  fotoPreview?: string;
}

function generateCardId() {
  return `evento_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

function generateImagenId() {
  return `imagen_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

/** Normalizes legacy free-text values (e.g. "08 MAR") to empty, so the native
 * date input starts blank instead of silently rejecting an invalid string. */
function toDateInputValue(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : "";
}

export function EventosCardsEditor({ initialCards }: { initialCards: EventoCardData[] }) {
  const [cards, setCards] = useState<CardState[]>(() =>
    initialCards.map((card) => ({
      ...card,
      galeria: card.galeria.map((img) => ({ ...img, status: "ready" as const })),
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

  function addCard() {
    setCards((prev) => [
      {
        id: generateCardId(),
        fecha: "",
        titulo: "",
        descripcion: "",
        fotoUrl: "",
        fotoEncuadre: "50% 50%",
        galeria: [],
      },
      ...prev,
    ]);
  }

  function removeCard(id: string) {
    setCards((prev) => prev.filter((c) => c.id !== id));
  }

  function patchCard(id: string, patch: Partial<CardState>) {
    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  }

  function patchImagen(cardId: string, imagenId: string, patch: Partial<GaleriaImagenState>) {
    setCards((prev) =>
      prev.map((card) =>
        card.id === cardId
          ? { ...card, galeria: card.galeria.map((img) => (img.id === imagenId ? { ...img, ...patch } : img)) }
          : card
      )
    );
  }

  async function uploadOne(cardId: string, imagenId: string, file: File) {
    patchImagen(cardId, imagenId, { status: "uploading" });
    try {
      const fd = new FormData();
      fd.append("file", file);
      const uploaded = await uploadEventoImagen(fd);
      if (uploaded) {
        patchImagen(cardId, imagenId, { url: uploaded.url, key: uploaded.key, status: "ready" });
      } else {
        patchImagen(cardId, imagenId, { status: "error" });
        toast.error("No se pudo subir la imagen.");
      }
    } catch (error) {
      console.error(error);
      patchImagen(cardId, imagenId, { status: "error" });
      toast.error("No se pudo subir la imagen.");
    }
  }

  async function addGaleriaFiles(cardId: string, fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    const files = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
    if (files.length === 0) return;

    const nuevas: GaleriaImagenState[] = files.map((file) => ({
      id: generateImagenId(),
      url: "",
      alt: "",
      encuadre: "50% 50%",
      status: "uploading",
      previewUrl: trackObjectUrl(file),
    }));

    setCards((prev) =>
      prev.map((card) => (card.id === cardId ? { ...card, galeria: [...card.galeria, ...nuevas] } : card))
    );

    // One at a time so a long drop doesn't hammer the backend at once.
    for (let i = 0; i < files.length; i++) {
      await uploadOne(cardId, nuevas[i].id, files[i]);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm text-muted-foreground">
          {cards.length} {cards.length === 1 ? "evento" : "eventos"}
        </span>
        <Button type="button" className="gap-2" onClick={addCard}>
          <PlusIcon className="h-4 w-4" />
          Agregar evento
        </Button>
      </div>

      {cards.length === 0 && (
        <p className="text-sm text-muted-foreground border border-dashed rounded-lg p-6 text-center">
          Todavía no hay eventos. Agrega el primero con el botón de arriba.
        </p>
      )}

      {cards.map((card, i) => (
        <div key={card.id} className="p-4 border rounded-lg space-y-5 relative">
          <div className="flex items-center justify-between">
            <h4 className="font-medium flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-muted text-xs font-semibold">
                {cards.length - i}
              </span>
              {card.titulo || "Evento"}
            </h4>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-destructive h-8 w-8"
              onClick={() => removeCard(card.id)}
              aria-label="Eliminar este evento"
            >
              <TrashIcon className="h-4 w-4" />
            </Button>
          </div>

          <input type="hidden" name="cards_id" value={card.id} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor={`${card.id}_fecha`}>Fecha</Label>
              <Input
                id={`${card.id}_fecha`}
                name={`${card.id}_fecha`}
                type="date"
                defaultValue={toDateInputValue(card.fecha)}
              />
              <p className="text-xs text-muted-foreground">
                Se usa para mostrar la fecha en la tarjeta y para el filtro por año en el sitio.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor={`${card.id}_titulo`}>Título</Label>
              <Input
                id={`${card.id}_titulo`}
                name={`${card.id}_titulo`}
                value={card.titulo}
                onChange={(e) => patchCard(card.id, { titulo: e.target.value })}
                placeholder="Título del evento"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor={`${card.id}_descripcion`}>Descripción (opcional)</Label>
            <Textarea
              id={`${card.id}_descripcion`}
              name={`${card.id}_descripcion`}
              defaultValue={card.descripcion}
              rows={3}
              placeholder="Un párrafo corto que se muestra al abrir el evento."
            />
          </div>

          {/* ---- Foto de portada + encuadre ---- */}
          <div className="rounded-lg border bg-muted/30 p-4 space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium">
              <ImagesIcon className="h-4 w-4 text-muted-foreground" />
              Foto de portada
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_260px] md:items-start">
              <div className="flex flex-col gap-3">
                <Label htmlFor={`${card.id}_foto`}>Imagen</Label>
                <Input
                  id={`${card.id}_foto`}
                  name={`${card.id}_foto`}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    patchCard(card.id, { fotoPreview: file ? trackObjectUrl(file) : undefined });
                  }}
                />
                <p className="text-xs text-muted-foreground">
                  Es la imagen que se ve en la tarjeta del listado. Elige a la derecha qué zona debe quedar
                  siempre visible: la tarjeta recorta la foto.
                </p>
              </div>
              <FocalPointPicker
                // Remount when the picked file changes so the picker starts
                // from the centre for the new photo instead of the old framing.
                key={card.fotoPreview || card.fotoUrl || "vacio"}
                name={`${card.id}_encuadre`}
                src={card.fotoPreview || card.fotoUrl || undefined}
                defaultValue={card.fotoPreview ? "50% 50%" : card.fotoEncuadre}
                aspectClassName="aspect-[16/10]"
              />
            </div>
          </div>

          {/* ---- Galería del evento ---- */}
          <div className="rounded-lg border bg-muted/30 p-4 space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <ImagesIcon className="h-4 w-4 text-muted-foreground" />
                Galería del evento
              </div>
              <span className="text-xs text-muted-foreground">
                {card.galeria.length} {card.galeria.length === 1 ? "imagen" : "imágenes"}
              </span>
            </div>

            <GaleriaDropzone cardId={card.id} onFiles={addGaleriaFiles} />

            {card.galeria.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {card.galeria.map((img, imgIndex) => (
                  <div key={img.id} className="rounded-lg border bg-background p-3 space-y-3">
                    {/* Only submitted once it actually has an uploaded url, so an
                        in-progress or failed upload can never save a blank entry. */}
                    {img.url && (
                      <>
                        <input type="hidden" name={`${card.id}_galeria_id`} value={img.id} />
                        <input type="hidden" name={`${img.id}_url`} value={img.url} />
                        {img.key && <input type="hidden" name={`${img.id}_key`} value={img.key} />}
                        <input type="hidden" name={`${img.id}_alt`} value={img.alt} readOnly />
                      </>
                    )}

                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-medium text-muted-foreground">Foto {imgIndex + 1}</span>
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7 text-destructive"
                        onClick={() =>
                          setCards((prev) =>
                            prev.map((c) =>
                              c.id === card.id ? { ...c, galeria: c.galeria.filter((g) => g.id !== img.id) } : c
                            )
                          )
                        }
                        aria-label="Eliminar imagen"
                      >
                        <TrashIcon className="h-3.5 w-3.5" />
                      </Button>
                    </div>

                    {img.url ? (
                      // The framing picker doubles as the thumbnail, so there's
                      // only ever one copy of the photo per card.
                      <FocalPointPicker
                        name={`${img.id}_encuadre`}
                        src={img.url}
                        defaultValue={img.encuadre || "50% 50%"}
                        aspectClassName="aspect-[4/3]"
                        hint="Zona visible al recortar."
                      />
                    ) : (
                      <div className="relative aspect-[4/3] rounded-lg overflow-hidden border">
                        <ImageSlot
                          src={img.previewUrl}
                          placeholder="Sin imagen"
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
                      </div>
                    )}

                    <Input
                      value={img.alt}
                      onChange={(e) => patchImagen(card.id, img.id, { alt: e.target.value })}
                      placeholder="Descripción de la foto"
                      className="h-8 text-xs"
                      disabled={!img.url}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}

      <p className="text-xs text-muted-foreground text-center">
        Las fotos de la galería se suben apenas las agregas. Los demás cambios (textos, encuadres, eliminaciones)
        se aplican al hacer clic en &quot;Guardar Cambios&quot;.
      </p>
    </div>
  );
}

function GaleriaDropzone({
  cardId,
  onFiles,
}: {
  cardId: string;
  onFiles: (cardId: string, files: FileList | null) => void;
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
        onFiles(cardId, e.dataTransfer.files);
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
      <p className="text-sm font-medium">Arrastra las fotos de este evento o haz clic para subirlas</p>
      <p className="text-xs text-muted-foreground">Puedes soltar varias a la vez · PNG, JPG, WEBP</p>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          onFiles(cardId, e.target.files);
          e.target.value = "";
        }}
      />
    </div>
  );
}
