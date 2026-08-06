"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CalendarDaysIcon, ChevronLeftIcon, ChevronRightIcon, ImagesIcon, XIcon } from "lucide-react";
import { ImageSlot, focalToPosition } from "@/components/ImageSlot";
import { Reveal } from "@/components/Reveal";
import { formatEventDateLabel, getEventYear } from "@/lib/eventDate";
import { accentAt } from "@/lib/brandVisuals";
import { cn } from "@/lib/utils";

export interface EventoGaleriaImagen {
  id: string;
  url: string;
  alt: string;
  encuadre?: string;
}

export interface EventoCard {
  id: string;
  fecha: string;
  titulo: string;
  descripcion: string;
  fotoUrl: string;
  fotoAlt: string;
  fotoEncuadre?: string;
  galeria: EventoGaleriaImagen[];
}

export function EventosFilterableGrid({
  cards,
  years,
  filtroActivo,
}: {
  cards: EventoCard[];
  years: number[];
  filtroActivo: boolean;
}) {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [openEventId, setOpenEventId] = useState<string | null>(null);

  const visibleCards = useMemo(() => {
    if (selectedYear === null) return cards;
    return cards.filter((c) => getEventYear(c.fecha) === selectedYear);
  }, [cards, selectedYear]);

  const openEvent = cards.find((c) => c.id === openEventId) ?? null;

  return (
    <>
      {filtroActivo && years.length > 0 && (
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar snap-x snap-mandatory mb-[40px] md:mb-[50px]">
          <FilterPill active={selectedYear === null} onClick={() => setSelectedYear(null)}>
            Todos
          </FilterPill>
          {years.map((year) => (
            <FilterPill key={year} active={selectedYear === year} onClick={() => setSelectedYear(year)}>
              {year}
            </FilterPill>
          ))}
        </div>
      )}

      {visibleCards.length === 0 ? (
        <p className="text-[14px] text-brand-muted">No hay eventos para este año.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {visibleCards.map((card, idx) => {
            const accent = accentAt(idx);
            const fotos = card.galeria.filter((img) => img.url);
            const abrible = fotos.length > 0 || !!card.descripcion;

            const CardTag = abrible ? "button" : "div";

            return (
              <Reveal key={card.id} delay={(idx % 3) * 90}>
                <CardTag
                  {...(abrible
                    ? {
                        type: "button" as const,
                        onClick: () => setOpenEventId(card.id),
                        "aria-label": `Ver el evento ${card.titulo}`,
                      }
                    : {})}
                  className={cn(
                    "group relative w-full h-full text-left overflow-hidden rounded-[24px] border transition-all duration-300",
                    accent.soft,
                    accent.ring,
                    abrible && "cursor-pointer hover:-translate-y-1.5 hover:shadow-[0_26px_54px_-30px_rgba(0,46,31,0.5)]"
                  )}
                >
                  <div className="relative h-[190px] md:h-[210px] overflow-hidden">
                    <div className="absolute inset-0 transition-transform duration-[900ms] group-hover:scale-110">
                      <ImageSlot
                        src={card.fotoUrl}
                        focal={focalToPosition(card.fotoEncuadre)}
                        placeholder={card.fotoAlt || card.titulo}
                        className={accent.chip}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none"></div>

                    <span
                      className={cn(
                        "absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-[1.5px]",
                        accent.solid
                      )}
                    >
                      <CalendarDaysIcon className="h-3.5 w-3.5" aria-hidden />
                      {formatEventDateLabel(card.fecha)}
                    </span>

                    {fotos.length > 0 && (
                      <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1.5 text-[11.5px] font-bold text-brand-ink shadow-sm transition-transform duration-300 group-hover:scale-105">
                        <ImagesIcon className="h-3.5 w-3.5" aria-hidden />
                        {fotos.length}
                      </span>
                    )}
                  </div>

                  <div className="p-5 md:p-[22px_24px]">
                    <div className="text-[16.5px] md:text-[18px] font-semibold leading-snug text-brand-ink">
                      {card.titulo}
                    </div>
                    {card.descripcion && (
                      <p className="mt-2 text-[13.5px] leading-[1.6] text-brand-muted line-clamp-2 text-just">
                        {card.descripcion}
                      </p>
                    )}
                    {abrible && (
                      <span className={cn("mt-4 inline-flex items-center gap-2 text-[12.5px] font-bold uppercase tracking-[1.5px]", accent.text)}>
                        Ver galería
                        <ChevronRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                      </span>
                    )}
                    <div className={cn("mt-4 h-[3px] w-10 rounded-full transition-all duration-500 group-hover:w-full", accent.solid)}></div>
                  </div>
                </CardTag>
              </Reveal>
            );
          })}
        </div>
      )}

      {openEvent && <EventoGaleriaModal evento={openEvent} onClose={() => setOpenEventId(null)} />}
    </>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "snap-start px-5 py-2.5 rounded-full text-[13px] font-semibold cursor-pointer whitespace-nowrap transition-all duration-300",
        active
          ? "bg-brand text-brand-ink border border-brand shadow-[0_10px_24px_-14px_rgba(0,107,77,0.9)]"
          : "bg-white border border-black/10 text-brand-ink/70 hover:border-brand/50 hover:text-brand-ink hover:-translate-y-0.5"
      )}
    >
      {children}
    </button>
  );
}

/** Full-screen viewer for a single event's photos. */
function EventoGaleriaModal({ evento, onClose }: { evento: EventoCard; onClose: () => void }) {
  const fotos = useMemo(() => evento.galeria.filter((img) => img.url), [evento.galeria]);
  const [index, setIndex] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);

  const go = useCallback(
    (delta: number) => {
      if (fotos.length === 0) return;
      setIndex((prev) => (prev + delta + fotos.length) % fotos.length);
    },
    [fotos.length]
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

  const actual = fotos[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Galería del evento ${evento.titulo}`}
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
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 ring-1 ring-white/30 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[1.5px]">
              <CalendarDaysIcon className="h-3.5 w-3.5" aria-hidden />
              {formatEventDateLabel(evento.fecha)}
            </span>
            <h2 className="font-display font-semibold text-[26px] md:text-[36px] leading-[1.1] tracking-[-0.01em] mt-4 mb-0 pr-12">
              {evento.titulo}
            </h2>
            {evento.descripcion && (
              <p className="mt-3 text-[14.5px] leading-[1.7] text-white/80 max-w-[720px] text-just">
                {evento.descripcion}
              </p>
            )}
          </div>
        </div>

        {fotos.length === 0 ? (
          <p className="px-6 md:px-10 py-10 text-center text-[14px] text-brand-muted">
            Este evento todavía no tiene fotos publicadas.
          </p>
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
                alt={actual.alt || evento.titulo}
                placeholder={evento.titulo}
                className="bg-brand-deep text-white/40"
                imgClassName="object-contain"
              />

              {fotos.length > 1 && (
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
                    {index + 1} / {fotos.length}
                  </span>
                </>
              )}
            </div>

            {actual.alt && (
              <p className="mt-3 px-1 text-[13.5px] leading-[1.6] text-brand-muted">{actual.alt}</p>
            )}

            {fotos.length > 1 && (
              <div className="mt-4 flex gap-2.5 overflow-x-auto hide-scrollbar pb-1">
                {fotos.map((foto, i) => (
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
