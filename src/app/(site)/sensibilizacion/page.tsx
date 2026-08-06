import Link from "next/link";
import { ArrowRightIcon, CameraIcon, CheckIcon, MegaphoneIcon, SparklesIcon } from "lucide-react";
import { ImageSlot } from "@/components/ImageSlot";
import { getEstructura } from "@/lib/data";
import { HighlightText } from "@/components/HighlightText";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { awarenessIcon } from "@/lib/brandVisuals";
import { cn } from "@/lib/utils";

/* eslint-disable @typescript-eslint/no-explicit-any */

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
    bullet: "bg-white/70",
    bulletChip: "bg-white/25 text-white",
    rule: "bg-white/40",
    frame: "ring-white/30",
    imgFallback: "bg-white/15 text-white/60",
  },
  {
    wrapper: "bg-gradient-to-br from-brand-forest to-brand-forest-dark text-white",
    pattern: "text-white/12 pattern-grid",
    chip: "bg-white/20 ring-1 ring-white/30 text-white",
    eyebrow: "text-white/85",
    title: "text-white",
    body: "text-white/80",
    bullet: "bg-brand-lime",
    bulletChip: "bg-brand-lime/30 text-brand-lime",
    rule: "bg-brand-lime/70",
    frame: "ring-white/25",
    imgFallback: "bg-white/12 text-white/60",
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
    bullet: "bg-brand-ink/70",
    bulletChip: "bg-brand-ink/15 text-brand-ink",
    rule: "bg-brand-ink/35",
    frame: "ring-brand-ink/15",
    imgFallback: "bg-brand-ink/10 text-brand-ink/50",
  },
];

export default async function SensibilizacionPage() {
  const data = await getEstructura();
  const pageData = data?.sitio.paginas.find((p: any) => p.id === "sensibilizacion");
  const s = pageData?.secciones;
  const imagenes: any[] = s?.galeria.imagenes ?? [];

  return (
    <div className="bg-brand-sand font-sans">
      {/* ================= ENCABEZADO ================= */}
      <section className="relative overflow-hidden px-4 md:px-[60px] pt-[110px] md:pt-[140px] pb-[50px] md:pb-[80px]">
        <div className="absolute inset-0 bg-gradient-to-b from-brand/12 via-brand-lime/[0.07] to-transparent pointer-events-none"></div>
        <div className="absolute inset-x-0 top-0 h-[420px] text-brand/[0.13] pattern-dots-lg [mask-image:linear-gradient(to_bottom,black,transparent)] pointer-events-none"></div>
        <div className="absolute -top-24 right-[-60px] w-[380px] h-[380px] rounded-full bg-brand-lime/25 blur-[110px] pointer-events-none animate-af-float"></div>
        <div
          className="absolute top-[120px] left-[-90px] w-[320px] h-[320px] rounded-full bg-brand-forest/20 blur-[110px] pointer-events-none animate-af-float"
          style={{ animationDelay: "-3s" }}
        ></div>

        <div className="relative max-w-[1360px] mx-auto">
          <div className="flex justify-between items-start md:items-end gap-6 md:gap-[60px] flex-col md:flex-row flex-wrap">
            <div className="max-w-[900px]">
              <Reveal variant="fade">
                <span className="inline-flex items-center gap-2.5 rounded-full border border-brand/30 bg-white px-4 py-2 text-[11px] font-bold tracking-[2px] uppercase text-brand-dark mb-6 shadow-sm">
                  <MegaphoneIcon className="h-3.5 w-3.5" aria-hidden />
                  Sensibilización
                </span>
              </Reveal>
              <Reveal delay={100}>
                <h1 className="font-display font-semibold text-[clamp(36px,6vw,64px)] leading-[1.05] m-0 tracking-[-0.02em] text-brand-ink">
                  <HighlightText
                    text={s?.encabezado.titulo.valor || ""}
                    highlightClassName="font-display font-medium not-italic text-brand-dark"
                  />
                </h1>
              </Reveal>
            </div>
            <Reveal delay={200} variant="right" className="max-w-[420px]">
              <div className="relative rounded-[20px] bg-white border border-black/[0.06] p-6 shadow-[0_20px_50px_-40px_rgba(0,46,31,0.6)]">
                <span className="absolute -top-3.5 left-6 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-lime text-brand-ink shadow-md">
                  <SparklesIcon className="h-4 w-4" aria-hidden />
                </span>
                <p className="text-[15px] md:text-[16px] leading-[1.75] text-brand-muted m-0 mt-3 text-just">
                  {s?.encabezado.descripcion.valor}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= TIPOS DE SENSIBILIZACIÓN ================= */}
      <section id="campanas" className="px-4 md:px-[60px] pb-[50px] md:pb-[90px] scroll-mt-[100px]">
        <div className="max-w-[1360px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {s?.tipos_sensibilizacion.tipos.map((tipo: any, idx: number) => {
              const theme = CARD_THEMES[idx % CARD_THEMES.length];
              const Icon = awarenessIcon(`${tipo.tipo.valor} ${tipo.titulo.valor}`, idx);
              return (
                <Reveal key={tipo.id} delay={idx * 120}>
                  <article
                    className={cn(
                      "group relative h-full overflow-hidden rounded-[26px] p-6 md:p-[34px_30px] md:min-h-[560px] flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-34px_rgba(0,46,31,0.6)]",
                      theme.wrapper
                    )}
                  >
                    <div className={cn("absolute inset-0 pointer-events-none", theme.pattern)}></div>
                    <div className="absolute -right-16 -bottom-16 w-56 h-56 rounded-full bg-white/15 blur-3xl pointer-events-none"></div>

                    <div className={cn("relative h-[200px] rounded-[16px] overflow-hidden mb-6 ring-1", theme.frame)}>
                      <div className="absolute inset-0 transition-transform duration-[900ms] group-hover:scale-110">
                        <ImageSlot src={tipo.imagen.valor} placeholder={tipo.titulo.valor} className={theme.imgFallback} />
                      </div>
                      <span
                        className={cn(
                          "absolute bottom-3 left-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl backdrop-blur-md transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6",
                          theme.chip
                        )}
                      >
                        <Icon className="h-5 w-5" aria-hidden />
                      </span>
                    </div>

                    <div className={cn("relative text-[11px] tracking-[2.5px] font-bold mb-2.5 uppercase", theme.eyebrow)}>
                      {tipo.tipo.valor}
                    </div>
                    <h3
                      className={cn(
                        "relative font-display font-semibold text-[26px] md:text-[30px] leading-[1.12] mb-5 tracking-[-0.01em] m-0",
                        theme.title
                      )}
                    >
                      {tipo.titulo.valor}
                    </h3>

                    <ul className="relative m-0 p-0 list-none flex flex-col gap-2.5">
                      {tipo.vinetas.items.map((vineta: any) => (
                        <li key={vineta.id} className={cn("flex items-start gap-2.5 text-[13.5px] md:text-[14px] leading-[1.6]", theme.body)}>
                          <span className={cn("mt-0.5 inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full", theme.bulletChip)}>
                            <CheckIcon className="h-3 w-3" aria-hidden />
                          </span>
                          <span>{vineta.valor}</span>
                        </li>
                      ))}
                    </ul>

                    <div className={cn("relative mt-auto pt-7 h-[3px] w-12 rounded-full transition-all duration-500 group-hover:w-24", theme.rule)}></div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= GALERÍA ================= */}
      <section className="relative px-4 md:px-[60px] py-[50px] md:py-[80px]">
        <div className="absolute inset-0 text-brand-forest/[0.07] pattern-diag [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] pointer-events-none"></div>

        <div className="relative max-w-[1360px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-[40px] md:mb-[50px]">
            <SectionHeading
              eyebrow="Galería · Sensibilizaciones"
              title={s?.galeria.titulo.valor}
              as="h2"
              size="lg"
              tone="slate"
            />
            <Reveal delay={120}>
              <span className="inline-flex items-center gap-2 rounded-full bg-white border border-black/[0.07] px-4 py-2.5 text-[12.5px] font-semibold text-brand-muted">
                <CameraIcon className="h-4 w-4 text-brand-dark" aria-hidden />
                {imagenes.length} {imagenes.length === 1 ? "registro" : "registros"} en campo
              </span>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[160px] md:auto-rows-[220px] gap-2.5 md:gap-3">
            {imagenes.map((img: any, idx: number) => (
              <Reveal
                key={img.id}
                delay={(idx % 6) * 60}
                variant="scale"
                className={cn(
                  "group relative rounded-xl md:rounded-2xl overflow-hidden ring-1 ring-black/[0.06]",
                  idx === 0 && "col-span-2 row-span-2"
                )}
              >
                <div className="absolute inset-0 transition-transform duration-[900ms] group-hover:scale-110">
                  <ImageSlot
                    src={img.url}
                    focal={img.encuadre}
                    placeholder={img.alt || `Foto 0${idx + 1}`}
                    className="bg-white text-brand-ink/30"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/85 via-brand-deep/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"></div>
                {img.alt && (
                  <div className="absolute inset-x-3 bottom-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 pointer-events-none">
                    <span className="text-[12px] font-semibold text-white leading-snug line-clamp-2">{img.alt}</span>
                  </div>
                )}
              </Reveal>
            ))}
          </div>

          <Reveal variant="scale" className="mt-[50px] md:mt-[70px]">
            <div className="relative overflow-hidden rounded-[26px] bg-brand-deep text-white p-8 md:p-[54px] grid grid-cols-1 md:grid-cols-[1fr_auto] gap-7 md:gap-10 items-center">
              <div className="absolute inset-0 text-white/10 pattern-rings pointer-events-none"></div>
              <div className="absolute -left-20 -bottom-24 w-72 h-72 rounded-full bg-brand/35 blur-[100px] pointer-events-none animate-af-float"></div>
              <div className="relative">
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="h-[2px] w-7 rounded-full bg-brand-lime" />
                  <span className="text-[11px] tracking-[2.5px] font-bold uppercase text-brand-lime">
                    ¿Quieres una jornada?
                  </span>
                </div>
                <h3 className="font-display font-semibold text-[27px] md:text-[36px] leading-[1.12] tracking-[-0.01em] m-0 mb-3">
                  Llevamos la sensibilización a tu conjunto, colegio o barrio.
                </h3>
                <p className="text-[14.5px] leading-[1.7] text-white/70 m-0 max-w-[560px] text-just">
                  Agendamos talleres de separación en la fuente y acompañamiento a la comunidad, ajustados al tipo de
                  usuario y a la ruta de tu localidad.
                </p>
              </div>
              <Link
                href="/solicitar"
                className="btn-sheen btn-sheen-dark relative group inline-flex items-center justify-center gap-2.5 rounded-full bg-brand-lime px-7 py-4 text-[14.5px] font-bold text-brand-ink transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-16px_rgba(166,206,57,0.8)]"
              >
                Solicitar jornada
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
