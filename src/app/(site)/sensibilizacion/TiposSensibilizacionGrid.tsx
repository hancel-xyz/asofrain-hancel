"use client";

import { useState } from "react";
import { CheckIcon, ImagesIcon } from "lucide-react";
import { ImageSlot } from "@/components/ImageSlot";
import { GaleriaLightbox, type LightboxFoto } from "@/components/GaleriaLightbox";
import { Reveal } from "@/components/Reveal";
import { awarenessIcon } from "@/lib/brandVisuals";
import { cn } from "@/lib/utils";

export interface TipoSensibilizacion {
  id: string;
  tipo: string;
  titulo: string;
  imagenUrl: string;
  vinetas: string[];
  galeria: LightboxFoto[];
}

// One deliberate colour per audience: teal for los niños, slate for la
// propiedad horizontal, lime for los usuarios en general. Everything in the
// card (chip, bullets, glow, footer rule) is derived from that choice.
const CARD_THEMES = [
  {
    wrapper: "bg-gradient-to-br from-brand to-brand-dark text-white",
    pattern: "text-white/15 pattern-rings",
    chip: "bg-white/25 ring-1 ring-white/35 text-white",
    eyebrow: "text-white/85",
    title: "text-white",
    body: "text-white/80",
    bulletChip: "bg-white/25 text-white",
    rule: "bg-white/40",
    frame: "ring-white/30",
    imgFallback: "bg-white/15 text-white/60",
    cta: "bg-white/20 ring-1 ring-white/35 text-white group-hover:bg-white/30",
  },
  {
    wrapper: "bg-gradient-to-br from-brand-forest to-brand-forest-dark text-white",
    pattern: "text-white/12 pattern-grid",
    chip: "bg-white/20 ring-1 ring-white/30 text-white",
    eyebrow: "text-white/85",
    title: "text-white",
    body: "text-white/80",
    bulletChip: "bg-brand-lime/30 text-brand-lime",
    rule: "bg-brand-lime/70",
    frame: "ring-white/25",
    imgFallback: "bg-white/12 text-white/60",
    cta: "bg-brand-lime/25 ring-1 ring-brand-lime/40 text-brand-lime group-hover:bg-brand-lime/35",
  },
  {
    // Verde Lima is light enough that body copy needs near-full ink to hold
    // its contrast against it.
    // Both ends stay light (Verde Lima into Verde Oliva) so the dark type on
    // this card holds its contrast all the way down.
    wrapper: "bg-gradient-to-br from-brand-lime to-brand-olive text-brand-ink",
    pattern: "text-white/25 pattern-waves",
    chip: "bg-brand-ink/12 ring-1 ring-brand-ink/20 text-brand-ink",
    eyebrow: "text-brand-ink/75",
    title: "text-brand-ink",
    body: "text-brand-ink/90",
    bulletChip: "bg-brand-ink/15 text-brand-ink",
    rule: "bg-brand-ink/35",
    frame: "ring-brand-ink/15",
    imgFallback: "bg-brand-ink/10 text-brand-ink/50",
    cta: "bg-brand-ink/12 ring-1 ring-brand-ink/20 text-brand-ink group-hover:bg-brand-ink/20",
  },
];

/**
 * The awareness cards, each one with its own photo gallery.
 *
 * A card that has photos says so twice — a counter over the cover and a "Ver
 * galería" button at the foot — so it reads as something you can open, and the
 * whole card is clickable for it. Cards with no photos keep the plain rule.
 */
export function TiposSensibilizacionGrid({ tipos }: { tipos: TipoSensibilizacion[] }) {
  const [abiertoId, setAbiertoId] = useState<string | null>(null);
  const abierto = tipos.find((t) => t.id === abiertoId) ?? null;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {tipos.map((tipo, idx) => {
          const theme = CARD_THEMES[idx % CARD_THEMES.length];
          const Icon = awarenessIcon(`${tipo.tipo} ${tipo.titulo}`, idx);
          const fotos = tipo.galeria.filter((img) => img.url);
          const abrible = fotos.length > 0;

          return (
            <Reveal key={tipo.id} delay={idx * 120}>
              <article
                {...(abrible
                  ? {
                      role: "button",
                      tabIndex: 0,
                      "aria-label": `Ver la galería de ${tipo.titulo}`,
                      onClick: () => setAbiertoId(tipo.id),
                      onKeyDown: (e: React.KeyboardEvent) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setAbiertoId(tipo.id);
                        }
                      },
                    }
                  : {})}
                className={cn(
                  "group relative h-full overflow-hidden rounded-[26px] p-6 md:p-[34px_30px] md:min-h-[560px] flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-34px_rgba(0,46,31,0.6)]",
                  abrible && "cursor-pointer",
                  theme.wrapper
                )}
              >
                <div className={cn("absolute inset-0 pointer-events-none", theme.pattern)}></div>
                <div className="absolute -right-16 -bottom-16 w-56 h-56 rounded-full bg-white/15 blur-3xl pointer-events-none"></div>

                <div className={cn("relative h-[200px] rounded-[16px] overflow-hidden mb-6 ring-1", theme.frame)}>
                  <div className="absolute inset-0 transition-transform duration-[900ms] group-hover:scale-110">
                    <ImageSlot src={tipo.imagenUrl} placeholder={tipo.titulo} className={theme.imgFallback} />
                  </div>
                  <span
                    className={cn(
                      "absolute bottom-3 left-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl backdrop-blur-md transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6",
                      theme.chip
                    )}
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>

                  {abrible && (
                    <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1.5 text-[11.5px] font-bold text-brand-ink shadow-sm transition-transform duration-300 group-hover:scale-105">
                      <ImagesIcon className="h-3.5 w-3.5" aria-hidden />
                      {fotos.length} {fotos.length === 1 ? "foto" : "fotos"}
                    </span>
                  )}
                </div>

                <div
                  className={cn(
                    "relative font-display font-bold text-[26px] md:text-[32px] leading-[1.05] tracking-[-0.01em] uppercase mb-2",
                    theme.title
                  )}
                >
                  {tipo.tipo}
                </div>
                <h3
                  className={cn(
                    "relative font-display font-semibold text-[17px] md:text-[21px] leading-[1.25] m-0 mb-5",
                    theme.eyebrow
                  )}
                >
                  {tipo.titulo}
                </h3>

                <ul className="relative m-0 p-0 list-none flex flex-col gap-2.5">
                  {tipo.vinetas.map((vineta, vi) => (
                    <li
                      key={vi}
                      className={cn(
                        "flex items-start gap-2.5 text-[13px] md:text-[13.5px] leading-[1.6]",
                        theme.body
                      )}
                    >
                      <span
                        className={cn(
                          "mt-0.5 inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full",
                          theme.bulletChip
                        )}
                      >
                        <CheckIcon className="h-3 w-3" aria-hidden />
                      </span>
                      <span>{vineta}</span>
                    </li>
                  ))}
                </ul>

                {abrible ? (
                  <div className="relative mt-auto pt-7">
                    <span
                      className={cn(
                        "inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[12.5px] font-bold uppercase tracking-[1.5px] backdrop-blur-sm transition-all duration-300 group-hover:gap-3",
                        theme.cta
                      )}
                    >
                      <ImagesIcon className="h-4 w-4" aria-hidden />
                      Ver galería
                    </span>
                  </div>
                ) : (
                  <div
                    className={cn(
                      "relative mt-auto pt-7 h-[3px] w-12 rounded-full transition-all duration-500 group-hover:w-24",
                      theme.rule
                    )}
                  ></div>
                )}
              </article>
            </Reveal>
          );
        })}
      </div>

      {abierto && (
        <GaleriaLightbox
          fotos={abierto.galeria}
          titulo={abierto.titulo}
          ariaLabel={`Galería de ${abierto.titulo}`}
          emptyText="Esta sensibilización todavía no tiene fotos publicadas."
          eyebrow={
            <>
              <ImagesIcon className="h-3.5 w-3.5" aria-hidden />
              {abierto.tipo}
            </>
          }
          onClose={() => setAbiertoId(null)}
        />
      )}
    </>
  );
}
