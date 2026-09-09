"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from "lucide-react";
import { ImageSlot, focalToPosition } from "@/components/ImageSlot";
import { cn } from "@/lib/utils";

export interface LightboxFoto {
  id: string;
  url: string;
  alt?: string;
  encuadre?: string;
}

/**
 * Full-screen photo viewer shared by every gallery on the site (events,
 * awareness campaigns…). Only the header copy changes between them, so the
 * stage, the arrows, the keyboard handling and the thumbnail strip live here.
 */
export function GaleriaLightbox({
  fotos,
  titulo,
  eyebrow,
  ariaLabel,
  emptyText = "Todavía no hay fotos publicadas.",
  onClose,
}: {
  fotos: LightboxFoto[];
  titulo: string;
  eyebrow?: React.ReactNode;
  ariaLabel?: string;
  emptyText?: string;
  onClose: () => void;
}) {
  const visibles = useMemo(() => fotos.filter((img) => img.url), [fotos]);
  const [index, setIndex] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);

  const go = useCallback(
    (delta: number) => {
      if (visibles.length === 0) return;
      setIndex((prev) => (prev + delta + visibles.length) % visibles.length);
    },
    [visibles.length]
  );

  useEffect(() => {
    closeRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKeyDown);

    // Freeze the page behind the viewer.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [go, onClose]);

  const actual = visibles[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel || `Galería de ${titulo}`}
      className="fixed inset-0 z-[200] flex items-center justify-center p-3 md:p-8"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="absolute inset-0 bg-brand-deep/92 backdrop-blur-md" aria-hidden></div>
      <div className="absolute inset-0 text-white/[0.06] pattern-dots-lg pointer-events-none" aria-hidden></div>

      <div className="relative w-full max-w-[1100px] max-h-full overflow-y-auto hide-scrollbar rounded-[24px] bg-white shadow-2xl">
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Cerrar galería"
          className="absolute top-4 right-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-brand-ink shadow-lg transition-transform duration-300 hover:scale-110 hover:rotate-90"
        >
          <XIcon className="h-5 w-5" aria-hidden />
        </button>

        {/* Encabezado */}
        <div className="relative bg-gradient-to-br from-brand to-brand-dark text-white px-6 md:px-10 py-7 md:py-9 overflow-hidden">
          <div className="absolute inset-0 text-white/15 pattern-rings pointer-events-none"></div>
          <div className="relative">
            {eyebrow && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 ring-1 ring-white/30 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[1.5px]">
                {eyebrow}
              </span>
            )}
            <h2 className="font-display font-semibold text-[26px] md:text-[36px] leading-[1.1] tracking-[-0.01em] mt-4 mb-0 pr-12">
              {titulo}
            </h2>
          </div>
        </div>

        {visibles.length === 0 ? (
          <p className="px-6 md:px-10 py-10 text-center text-[14px] text-brand-muted">{emptyText}</p>
        ) : (
          <div className="p-4 md:p-6">
            {/* Sized in viewport units rather than by aspect ratio so the stage
                always spans the modal and the thumbnail strip stays on screen;
                the photo letterboxes inside it via object-contain. */}
            <div className="relative w-full rounded-[18px] overflow-hidden bg-brand-deep h-[44vh] md:h-[52vh] min-h-[240px]">
              <ImageSlot
                key={actual.id}
                src={actual.url}
                focal={focalToPosition(actual.encuadre)}
                alt={actual.alt || titulo}
                placeholder={titulo}
                className="bg-brand-deep text-white/40"
                imgClassName="object-contain"
              />

              {visibles.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Foto anterior"
                    className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-brand-ink shadow-lg transition-all duration-300 hover:scale-110 hover:bg-white"
                  >
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Foto siguiente"
                    className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-brand-ink shadow-lg transition-all duration-300 hover:scale-110 hover:bg-white"
                  >
                    <ChevronRightIcon className="h-5 w-5" aria-hidden />
                  </button>
                  <span className="absolute bottom-3 right-3 rounded-full bg-brand-deep/80 backdrop-blur-sm px-3 py-1.5 text-[12px] font-semibold text-white">
                    {index + 1} / {visibles.length}
                  </span>
                </>
              )}
            </div>

            {visibles.length > 1 && (
              <div className="mt-4 flex gap-2.5 overflow-x-auto hide-scrollbar pb-1">
                {visibles.map((foto, i) => (
                  <button
                    key={foto.id}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Ver foto ${i + 1}`}
                    aria-current={i === index}
                    className={cn(
                      "relative h-16 w-24 shrink-0 overflow-hidden rounded-lg ring-2 transition-all duration-300",
                      i === index ? "ring-brand scale-[1.03]" : "ring-transparent opacity-60 hover:opacity-100"
                    )}
                  >
                    <ImageSlot
                      src={foto.url}
                      focal={focalToPosition(foto.encuadre)}
                      placeholder=""
                      className="bg-brand/15"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
