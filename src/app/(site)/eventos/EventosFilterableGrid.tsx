"use client";

import { useMemo, useState } from "react";
import { CalendarDaysIcon, ChevronRightIcon, ImagesIcon } from "lucide-react";
import { ImageSlot, focalToPosition } from "@/components/ImageSlot";
import { GaleriaLightbox } from "@/components/GaleriaLightbox";
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
  fotoUrl: string;
  fotoAlt: string;
  fotoEncuadre?: string;
  galeria: EventoGaleriaImagen[];
}

export function EventosFilterableGrid({
  cards,
  years,
  anoInicial,
  filtroActivo,
}: {
  cards: EventoCard[];
  years: number[];
  /** Year the listing opens on; null when there is nothing dated to show. */
  anoInicial: number | null;
  filtroActivo: boolean;
}) {
  const [selectedYear, setSelectedYear] = useState<number | null>(anoInicial);
  const [openEventId, setOpenEventId] = useState<string | null>(null);

  const visibleCards = useMemo(() => {
    // With the filter switched off there is nothing to pick, so everything shows.
    if (!filtroActivo || selectedYear === null) return cards;
    return cards.filter((c) => getEventYear(c.fecha) === selectedYear);
  }, [cards, selectedYear, filtroActivo]);

  const openEvent = cards.find((c) => c.id === openEventId) ?? null;

  return (
    <>
      {filtroActivo && years.length > 0 && (
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar snap-x snap-mandatory mb-[40px] md:mb-[50px]">
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
            // Only a gallery makes an event worth opening now.
            const abrible = fotos.length > 0;

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
                    <div className="text-[18px] md:text-[21px] font-bold leading-snug text-brand-ink">
                      {card.titulo}
                    </div>
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
  return (
    <GaleriaLightbox
      fotos={evento.galeria}
      titulo={evento.titulo}
      ariaLabel={`Galería del evento ${evento.titulo}`}
      emptyText="Este evento todavía no tiene fotos publicadas."
      eyebrow={
        <>
          <CalendarDaysIcon className="h-3.5 w-3.5" aria-hidden />
          {formatEventDateLabel(evento.fecha)}
        </>
      }
      onClose={onClose}
    />
  );
}
