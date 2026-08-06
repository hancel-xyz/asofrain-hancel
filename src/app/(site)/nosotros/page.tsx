import Link from "next/link";
import Image from "next/image";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  LeafIcon,
  QuoteIcon,
  SproutIcon,
  TargetIcon,
  TelescopeIcon,
  UsersIcon,
} from "lucide-react";
import { ImageSlot, isRealImageUrl, focalToPosition } from "@/components/ImageSlot";
import { getEstructura } from "@/lib/data";
import { HighlightText } from "@/components/HighlightText";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { accentAt, valueIcon } from "@/lib/brandVisuals";
import { fotosAlAzar } from "@/lib/fotos";
import { cn } from "@/lib/utils";

const HERO_MARGIN = "px-6 md:px-12 lg:px-[100px]";

/* eslint-disable @typescript-eslint/no-explicit-any */

export default async function NosotrosPage() {
  const data = await getEstructura();
  const pageData = data?.sitio.paginas.find((p: any) => p.id === "nosotros");
  const s = pageData?.secciones;
  const heroFocal = focalToPosition(s?.hero.imagen_fondo?.encuadre);
  // One draw for the whole page so no photo repeats between sections.
  const fotos = fotosAlAzar(10);

  return (
    <div className="bg-brand-sand font-sans">
      {/* ================= HERO ================= */}
      <section className="relative min-h-screen min-h-[100dvh] flex flex-col overflow-hidden bg-brand-deep">
        {isRealImageUrl(s?.hero.imagen_fondo?.valor) ? (
          <Image
            src={s.hero.imagen_fondo.valor}
            alt="ASOFRAIN — Nosotros"
            fill
            priority
            unoptimized
            className="object-cover"
            style={{ objectPosition: heroFocal }}
          />
        ) : (
          <div className="absolute inset-0">
            <ImageSlot
              placeholder="Hero Nosotros: retrato de recuperadores ambientales / bodega"
              className="bg-brand-deep text-white/30"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 md:from-black/55 via-transparent to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-brand/40 via-transparent to-brand-forest/45 mix-blend-color pointer-events-none"></div>
        <div className="absolute -top-24 -right-24 w-[440px] h-[440px] rounded-full bg-brand-lime/20 blur-[120px] pointer-events-none animate-af-float"></div>
        <div className="absolute inset-0 text-white/[0.09] pattern-dots-lg [mask-image:linear-gradient(to_left,black,transparent_60%)] pointer-events-none"></div>
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.045] mix-blend-overlay" aria-hidden>
          <filter id="grain-nosotros">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain-nosotros)" />
        </svg>

        <div
          className={`relative z-10 flex-1 flex flex-col justify-center ${HERO_MARGIN} pt-[110px] pb-[110px] max-w-[1600px] mx-auto w-full text-white`}
        >
          <Reveal variant="fade">
            <div className="flex items-center gap-2.5 mb-5 md:mb-6">
              <span className="h-[2px] w-8 rounded-full bg-brand-lime" />
              <span className="text-[11px] tracking-[3px] text-brand-lime font-bold uppercase">02 · Nosotros</span>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="font-display font-semibold text-[clamp(36px,6vw,76px)] leading-[1.05] tracking-[-0.02em] mb-5 md:mb-6 max-w-[820px] m-0">
              <HighlightText
                text={s?.hero.titulo.valor || ""}
                highlightClassName="font-display font-semibold not-italic text-brand-lime"
              />
            </h1>
          </Reveal>
          <Reveal delay={190}>
            <p className="text-[15.5px] md:text-[17px] leading-[1.7] text-white/85 max-w-[540px] mb-8 font-normal m-0 text-just">
              {s?.hero.descripcion.valor}
            </p>
          </Reveal>
          <Reveal delay={280}>
            <div className="flex flex-wrap gap-3">
              {s?.hero.cta_1?.texto && (
                <Link
                  href={s.hero.cta_1.url || "#"}
                  className="btn-sheen btn-sheen-dark group px-[24px] md:px-[28px] py-[13px] md:py-[15px] bg-white text-brand-ink rounded-full text-[14px] font-semibold flex items-center gap-2.5 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_-14px_rgba(0,0,0,0.6)] transition-all duration-300"
                >
                  {s.hero.cta_1.texto}
                  <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                </Link>
              )}
              {s?.hero.cta_2?.texto && (
                <Link
                  href={s.hero.cta_2.url || "#"}
                  className="px-[24px] md:px-[28px] py-[13px] md:py-[15px] bg-white/10 backdrop-blur-md border border-white/25 text-white rounded-full text-[14px] font-semibold hover:bg-white/20 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
                >
                  {s.hero.cta_2.texto}
                  <ArrowUpRightIcon className="h-4 w-4" aria-hidden />
                </Link>
              )}
            </div>
          </Reveal>
        </div>

        <div className="hidden md:flex items-start gap-3 absolute bottom-9 md:right-12 lg:right-[100px] z-10 text-white/70 font-display text-[20px] md:text-[22px] text-right max-w-[420px] leading-[1.3]">
          <QuoteIcon className="h-6 w-6 shrink-0 text-brand-lime mt-1" aria-hidden />
          <span>&ldquo;Detrás de cada tonelada aprovechada, un oficio digno.&rdquo;</span>
        </div>
      </section>

      {/* ================= QUIÉNES SOMOS ================= */}
      <section
        id="quienes-somos"
        className="relative px-4 md:px-[60px] pt-[60px] md:pt-[110px] pb-[50px] md:pb-[80px] scroll-mt-[100px]"
      >
        <div className="absolute inset-x-0 top-0 h-[280px] text-brand/[0.10] pattern-grid [mask-image:linear-gradient(to_bottom,black,transparent)] pointer-events-none"></div>
        <div className="relative max-w-[1360px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 md:gap-[80px] items-start">
            <SectionHeading eyebrow="Quiénes somos" title={s?.quienes_somos.titulo.valor} size="xl" />
            <Reveal delay={120} variant="right">
              <div className="relative rounded-[24px] bg-white border border-black/[0.06] p-7 md:p-10 shadow-[0_20px_50px_-40px_rgba(0,46,31,0.5)]">
                <span className="absolute -top-3 left-8 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand text-white shadow-lg">
                  <UsersIcon className="h-5 w-5" aria-hidden />
                </span>
                <div className="text-[16px] md:text-[17px] leading-[1.75] text-brand-muted whitespace-pre-wrap text-just mt-4">
                  {s?.quienes_somos.descripcion.valor}
                </div>

                {/* Faces of the organisation, in the photo-strip style of the
                    brand's printed pieces. */}
                <div className="mt-7 grid grid-cols-3 gap-2.5">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="h-[96px] md:h-[130px] rounded-[14px] overflow-hidden ring-1 ring-black/[0.06]">
                      <ImageSlot src={fotos[i]} placeholder="" className="bg-brand/10" />
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= HISTORIA ================= */}
      <section id="historia" className="px-4 md:px-[60px] py-[50px] md:py-[80px] scroll-mt-[100px]">
        <div className="max-w-[1360px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 md:gap-[80px] items-start">
            <SectionHeading eyebrow="Historia" title={s?.historia.titulo.valor} as="h3" size="lg" tone="slate" />

            <div className="relative flex flex-col">
              {/* Timeline spine */}
              <div className="absolute left-[145px] top-3 bottom-3 w-px bg-gradient-to-b from-brand via-brand-lime to-brand-forest/40 hidden sm:block"></div>

              {s?.historia.filas.map((item: any, idx: number) => {
                const isLast = idx === s.historia.filas.length - 1;
                const accent = accentAt(idx);
                return (
                  <Reveal
                    key={idx}
                    delay={idx * 90}
                    variant="right"
                    className={cn(
                      "relative grid grid-cols-1 sm:grid-cols-[130px_1fr] gap-4 sm:gap-[30px] py-[28px]",
                      !isLast && "border-b border-black/[0.07]"
                    )}
                  >
                    <div className="flex items-center gap-3 sm:block">
                      <span
                        className={cn(
                          "hidden sm:block absolute left-[138px] top-[36px] h-3.5 w-3.5 rounded-full ring-4 ring-brand-sand",
                          accent.solid
                        )}
                      ></span>
                      <div className={cn("font-display font-semibold text-[42px] leading-none", accent.text)}>
                        {item.ano.valor}
                      </div>
                    </div>
                    <div className="flex items-start gap-5">
                      <div className="min-w-0 flex-1">
                        <div className="text-[17px] md:text-[18.5px] font-semibold mb-1.5 text-brand-ink">
                          {item.titulo.valor}
                        </div>
                        <div className="text-[14px] md:text-[14.5px] text-brand-muted leading-[1.65] text-just">
                          {item.descripcion.valor}
                        </div>
                      </div>
                      <div className="hidden md:block h-[92px] w-[124px] shrink-0 rounded-[14px] overflow-hidden ring-1 ring-brand-forest/10">
                        <ImageSlot src={fotos[idx + 3]} placeholder="" className="bg-brand/10" />
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ================= MISIÓN Y VISIÓN ================= */}
      <section id="mision-vision" className="px-4 md:px-[60px] py-[50px] md:py-[80px] scroll-mt-[100px]">
        <div className="max-w-[1360px] mx-auto">
          <SectionHeading
            eyebrow="Propósito"
            title="Lo que hacemos hoy y *hacia dónde vamos*."
            as="h3"
            size="lg"
            tone="lime"
            className="mb-9 md:mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {/* MISIÓN — slate, "el presente" */}
            <Reveal variant="left">
              <div className="group relative h-full overflow-hidden rounded-[26px] bg-brand-forest text-white px-8 md:px-12 py-10 md:py-[52px] min-h-[320px] md:min-h-[430px] flex flex-col justify-between shadow-[0_26px_60px_-38px_rgba(0,77,51,0.95)]">
                <div className="absolute inset-0 text-white/10 pattern-grid pointer-events-none"></div>
                <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none"></div>

                <div className="relative flex items-center gap-4">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                    <TargetIcon className="h-6 w-6 text-white" aria-hidden />
                  </span>
                  <div>
                    <div className="font-display font-semibold text-[26px] leading-none tracking-[-0.01em]">Misión</div>
                    <div className="text-[11px] tracking-[2.5px] font-bold uppercase text-white/60 mt-1.5">
                      Nuestro presente
                    </div>
                  </div>
                </div>

                <p className="relative font-display font-medium text-[21px] md:text-[26px] leading-[1.45] mt-8 mb-0 tracking-[-0.005em] whitespace-pre-wrap text-just text-white/95">
                  {s?.mision.descripcion.valor}
                </p>
              </div>
            </Reveal>

            {/* VISIÓN — verde, "el futuro" */}
            <Reveal variant="right" delay={120}>
              <div className="group relative h-full overflow-hidden rounded-[26px] bg-gradient-to-br from-brand-lime via-brand to-brand-dark text-brand-ink px-8 md:px-12 py-10 md:py-[52px] min-h-[320px] md:min-h-[430px] flex flex-col justify-between shadow-[0_26px_60px_-38px_rgba(0,77,51,0.95)]">
                <div className="absolute inset-0 text-white/25 pattern-rings pointer-events-none"></div>
                <div className="absolute -left-16 -bottom-20 w-64 h-64 rounded-full bg-white/25 blur-3xl pointer-events-none animate-af-float"></div>

                <div className="relative flex items-center gap-4">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/35 ring-1 ring-white/50 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <TelescopeIcon className="h-6 w-6 text-brand-ink" aria-hidden />
                  </span>
                  <div>
                    <div className="font-display font-semibold text-[26px] leading-none tracking-[-0.01em]">Visión</div>
                    <div className="text-[11px] tracking-[2.5px] font-bold uppercase text-brand-ink/60 mt-1.5">
                      Hacia 2035
                    </div>
                  </div>
                </div>

                <p className="relative font-display font-medium text-[21px] md:text-[26px] leading-[1.45] mt-8 mb-0 tracking-[-0.005em] whitespace-pre-wrap text-just">
                  {s?.vision.descripcion.valor}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= VALORES ================= */}
      <section id="valores" className="relative px-4 md:px-[60px] py-[50px] md:py-[90px] scroll-mt-[100px]">
        <div className="absolute inset-0 text-brand-forest/[0.07] pattern-diag [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] pointer-events-none"></div>

        <div className="relative max-w-[1360px] mx-auto">
          <SectionHeading
            eyebrow="Valores institucionales"
            title={s?.valores.titulo.valor}
            subtitle="No son una lista decorativa: cada principio se traduce en una decisión concreta de operación, de trato y de reporte."
            as="h3"
            size="lg"
            className="mb-10 md:mb-[54px]"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {s?.valores.cuadros.map((v: any, idx: number) => {
              const accent = accentAt(idx);
              const Icon = valueIcon(`${v.titulo.valor} ${v.descripcion.valor}`, idx);
              return (
                <Reveal key={v.numero.valor} delay={(idx % 4) * 80}>
                  <div
                    className={cn(
                      "group relative h-full overflow-hidden rounded-[22px] border p-6 md:p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_48px_-26px_rgba(0,46,31,0.45)]",
                      accent.soft,
                      accent.ring
                    )}
                  >
                    <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl bg-current pointer-events-none"></div>

                    <div className="flex items-start justify-between gap-3">
                      <span
                        className={cn(
                          "inline-flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6",
                          accent.solid
                        )}
                      >
                        <Icon className="h-[22px] w-[22px]" aria-hidden />
                      </span>
                      <span className={cn("font-display font-semibold text-[30px] leading-none opacity-45", accent.text)}>
                        {String(v.numero.valor).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="mt-6 text-[17px] md:text-[18px] font-semibold text-brand-ink leading-snug">
                      {v.titulo.valor}
                    </div>
                    <div className="mt-2 text-[13.5px] leading-[1.6] text-brand-muted text-just">
                      {v.descripcion.valor}
                    </div>

                    <div
                      className={cn(
                        "mt-5 h-[3px] w-10 rounded-full transition-all duration-500 group-hover:w-full",
                        accent.solid
                      )}
                    ></div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= OBJETO SOCIAL / AMBIENTAL ================= */}
      <section className="px-4 md:px-[60px] py-[50px] md:py-[80px]">
        <div className="max-w-[1360px] mx-auto">
          <SectionHeading
            eyebrow="Nuestro objeto"
            title="Dos compromisos, *una sola operación*."
            as="h3"
            size="lg"
            tone="slate"
            className="mb-9 md:mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {/* OBJETO SOCIAL */}
            <Reveal variant="left">
              <article className="group relative h-full overflow-hidden rounded-[26px] bg-[#004D33]/10 border border-[#004D33]/30 p-8 md:p-11 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_54px_-30px_rgba(0,77,51,0.6)]">
                <div className="absolute inset-0 text-brand-forest/[0.09] pattern-dots pointer-events-none"></div>
                <div className="absolute right-6 top-6 text-brand-forest/10 pointer-events-none">
                  <UsersIcon className="h-28 w-28" aria-hidden />
                </div>

                <div className="relative">
                  <span className="inline-flex h-13 w-13 items-center justify-center rounded-2xl bg-brand-forest text-white p-3.5 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                    <UsersIcon className="h-6 w-6" aria-hidden />
                  </span>
                  <div className="flex items-center gap-2.5 mt-6 mb-3">
                    <span className="h-[2px] w-7 rounded-full bg-brand-forest" />
                    <span className="text-[11px] tracking-[2.5px] font-bold uppercase text-brand-forest">Objeto social</span>
                  </div>
                  <h4 className="font-display font-semibold text-[28px] md:text-[34px] leading-[1.12] m-0 mb-4 tracking-[-0.01em] text-brand-ink">
                    <HighlightText
                      text={s?.objeto_social.titulo.valor || ""}
                      highlightClassName="font-display font-medium not-italic text-brand-forest"
                    />
                  </h4>
                  <p className="text-[15.5px] md:text-[16px] leading-[1.7] text-brand-muted m-0 whitespace-pre-wrap text-just">
                    {s?.objeto_social.descripcion.valor}
                  </p>
                </div>
              </article>
            </Reveal>

            {/* OBJETO AMBIENTAL */}
            <Reveal variant="right" delay={120}>
              <article className="group relative h-full overflow-hidden rounded-[26px] bg-[#A6CE39]/22 border border-[#A6CE39]/55 p-8 md:p-11 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_54px_-30px_rgba(0,77,51,0.6)]">
                <div className="absolute inset-0 text-brand-lime/25 pattern-waves pointer-events-none"></div>
                <div className="absolute right-6 top-6 text-brand-lime/20 pointer-events-none">
                  <LeafIcon className="h-28 w-28" aria-hidden />
                </div>

                <div className="relative">
                  <span className="inline-flex items-center justify-center rounded-2xl bg-brand-lime text-brand-ink p-3.5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <SproutIcon className="h-6 w-6" aria-hidden />
                  </span>
                  <div className="flex items-center gap-2.5 mt-6 mb-3">
                    <span className="h-[2px] w-7 rounded-full bg-brand-lime" />
                    <span className="text-[11px] tracking-[2.5px] font-bold uppercase text-brand-lime-dark">
                      Objeto ambiental
                    </span>
                  </div>
                  <h4 className="font-display font-semibold text-[28px] md:text-[34px] leading-[1.12] m-0 mb-4 tracking-[-0.01em] text-brand-ink">
                    <HighlightText
                      text={s?.objeto_ambiental.titulo.valor || ""}
                      highlightClassName="font-display font-medium not-italic text-brand-lime-dark"
                    />
                  </h4>
                  <p className="text-[15.5px] md:text-[16px] leading-[1.7] text-brand-muted m-0 whitespace-pre-wrap text-just">
                    {s?.objeto_ambiental.descripcion.valor}
                  </p>
                </div>
              </article>
            </Reveal>
          </div>

          {/* FRASE */}
          <Reveal variant="scale" className="mt-[50px] md:mt-[70px]">
            <div className="relative overflow-hidden rounded-[26px] md:rounded-[32px] bg-brand-deep text-white px-6 md:px-16 py-[54px] md:py-[76px] text-center">
              <div className="absolute inset-0 text-white/10 pattern-rings pointer-events-none"></div>
              <div className="absolute -left-24 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-brand/30 blur-3xl pointer-events-none animate-af-float"></div>
              <div className="absolute -right-24 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-brand-lime/25 blur-3xl pointer-events-none animate-af-float" style={{ animationDelay: "-3s" }}></div>

              <div className="relative">
                <span className="inline-flex h-13 w-13 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25 p-3.5 mb-6">
                  <QuoteIcon className="h-6 w-6 text-brand-lime" aria-hidden />
                </span>
                <div className="text-[11px] tracking-[3px] text-brand-lime font-bold mb-5 uppercase">
                  {s?.frase_1.titulo_pequeno.valor}
                </div>
                <p className="font-display font-semibold text-[28px] md:text-[42px] leading-[1.2] m-0 mx-auto max-w-[900px] tracking-[-0.01em] text-balance">
                  <HighlightText
                    text={s?.frase_1.texto.valor || ""}
                    highlightClassName="font-display font-medium not-italic text-brand-lime"
                  />
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
