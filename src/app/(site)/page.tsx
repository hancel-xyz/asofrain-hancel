import Link from "next/link";
import Image from "next/image";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  LeafIcon,
  MapPinIcon,
  QuoteIcon,
  SparklesIcon,
} from "lucide-react";
import { ImageSlot, isRealImageUrl, focalToPosition } from "@/components/ImageSlot";
import { getEstructura } from "@/lib/data";
import { HighlightText } from "@/components/HighlightText";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { SectionHeading } from "@/components/SectionHeading";
import { VideoInstitucional } from "@/components/VideoInstitucional";
import { MediaFondo } from "@/components/MediaFondo";
import { accentAt, metricIcon, serviceIcon } from "@/lib/brandVisuals";
import { fotosAlAzar } from "@/lib/fotos";
import { isVideoMedia } from "@/lib/mediaType";
import { leerFondo } from "@/lib/fondo";
import { cn } from "@/lib/utils";

const HERO_MARGIN = "px-6 md:px-12 lg:px-[100px]";

const TEAL_HIGHLIGHT = "font-display font-medium not-italic text-brand-dark";

/* eslint-disable @typescript-eslint/no-explicit-any */

export default async function HomePage() {
  const data = await getEstructura();
  const pageData = data?.sitio.paginas.find((p: any) => p.id === "inicio");
  const heroData = pageData?.secciones.hero;
  const heroFocal = focalToPosition(heroData?.imagen_fondo?.encuadre);
  // Extra scrim over the hero photo, dialled in from the admin.
  const heroOscuridad: number = heroData?.imagen_fondo?.oscuridad ?? 0;
  // The institutional slot takes either a photo or a video; `videoUrl` is set
  // only in the second case, so the card renders the right one.
  const media = pageData?.secciones.servicios_vista_general.media;
  const mediaUrl: string | undefined = media?.url;
  const videoUrl = mediaUrl && isVideoMedia(mediaUrl, media?.mime) ? mediaUrl : null;
  const tituloMedia: string | undefined = pageData?.secciones.servicios_vista_general.titulo_media.valor;
  const metricas = pageData?.secciones.metricas;
  const metricItems: any[] = metricas?.items ?? [];
  const fraseFondo = leerFondo(pageData?.secciones.frase?.fondo);
  // One draw for the whole page so the same photo never shows up twice.
  const fotos = fotosAlAzar(8);

  return (
    <div className="bg-brand-sand font-sans overflow-hidden">
      {/* ================= HERO ================= */}
      <section className="relative min-h-screen min-h-[100dvh] flex flex-col overflow-hidden bg-brand-deep">
        {isRealImageUrl(heroData?.imagen_fondo?.valor) ? (
          <Image
            src={heroData.imagen_fondo.valor}
            alt="ASOFRAIN"
            fill
            priority
            unoptimized
            className="object-cover"
            style={{ objectPosition: heroFocal }}
          />
        ) : (
          <div className="absolute inset-0">
            <ImageSlot placeholder="Imagen de fondo (se sube desde el admin)" className="bg-brand-deep text-white/30" />
          </div>
        )}

        {/* Cinematic grade: dark base for legibility, then a teal→slate duotone
            so the hero shares the palette the rest of the page now uses. */}
        {heroOscuridad > 0 && (
          <div
            className="absolute inset-0 bg-brand-deep pointer-events-none"
            style={{ opacity: heroOscuridad / 100 }}
          ></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 md:from-black/55 via-transparent to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-brand/40 via-transparent to-brand-forest/45 mix-blend-color pointer-events-none"></div>

        {/* Ambient light blooms */}
        <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-brand/25 blur-[110px] pointer-events-none animate-af-float"></div>
        <div
          className="absolute bottom-[-140px] right-[-80px] w-[520px] h-[520px] rounded-full bg-brand-lime/20 blur-[130px] pointer-events-none animate-af-float"
          style={{ animationDelay: "-3s" }}
        ></div>

        {/* Dot pattern — texture in the empty right half */}
        <div className="absolute inset-0 text-white/[0.10] pattern-dots-lg [mask-image:linear-gradient(to_left,black,transparent_65%)] pointer-events-none"></div>

        {/* Film grain */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.045] mix-blend-overlay" aria-hidden>
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>

        <div
          className={cn(
            "relative z-10 flex-1 flex flex-col justify-center pt-[110px] pb-[110px] max-w-[1600px] mx-auto w-full text-white",
            HERO_MARGIN
          )}
        >
          <Reveal delay={80} variant="fade">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 backdrop-blur-md px-4 py-2 text-[12px] font-semibold tracking-[0.08em] uppercase mb-6">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-brand-lime animate-af-ping-ring"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-lime"></span>
              </span>
              <LeafIcon className="h-3.5 w-3.5" aria-hidden />
              Servicio público de aprovechamiento
            </span>
          </Reveal>

          <Reveal delay={160}>
            <h1 className="font-display font-semibold text-[clamp(38px,5.8vw,76px)] leading-[1.06] tracking-[-0.02em] mb-5 md:mb-6 max-w-[760px] text-balance">
              {heroData ? (
                <HighlightText
                  text={heroData.titulo.valor}
                  highlightClassName="font-display font-semibold not-italic text-brand-lime"
                />
              ) : (
                <>Nuestro futuro no es desechable, actuemos ahora.</>
              )}
            </h1>
          </Reveal>

          <Reveal delay={240}>
            <p className="text-[15.5px] md:text-[17px] leading-[1.7] max-w-[520px] mb-9 font-normal text-white/85 text-just">
              {heroData
                ? heroData.descripcion.valor
                : "Recuperamos, transportamos y aprovechamos residuos sólidos en Suba, Engativá y Usaquén — devolviéndoles valor."}
            </p>
          </Reveal>

          <Reveal delay={320}>
            <div className="flex items-center gap-3.5 flex-wrap">
              <Link
                href={heroData ? heroData.cta.url : "/solicitar"}
                className="btn-sheen btn-sheen-dark group px-[26px] md:px-[30px] py-[14px] md:py-[16px] text-[15px] md:text-[16px] font-semibold bg-white text-brand-ink rounded-full inline-flex items-center gap-2.5 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_-12px_rgba(0,0,0,0.55)] transition-all duration-300 shadow-lg"
              >
                {heroData ? heroData.cta.texto : "Solicitar servicio"}
                <ArrowRightIcon className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </Link>
              <Link
                href="/servicios"
                className="px-[24px] py-[14px] md:py-[16px] text-[15px] font-semibold rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-white inline-flex items-center gap-2 hover:bg-white/20 hover:-translate-y-0.5 transition-all duration-300"
              >
                Ver servicios
                <ArrowUpRightIcon className="h-4 w-4" aria-hidden />
              </Link>
              <a
                href="#metricas"
                aria-label="Ver el impacto"
                className="w-[50px] h-[50px] md:w-[54px] md:h-[54px] rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white flex items-center justify-center hover:bg-white/25 transition-colors shrink-0"
              >
                <ArrowDownIcon className="h-5 w-5 animate-af-bob" aria-hidden />
              </a>
            </div>
          </Reveal>

          <Reveal delay={420} variant="fade">
            <div className="mt-11 flex flex-wrap items-center gap-x-3 gap-y-2.5 text-[13px] text-white/75">
              <span className="uppercase tracking-[2px] text-[11px] font-semibold text-white/55">Operamos en</span>
              {["Suba", "Engativá", "Usaquén"].map((zona) => (
                <span
                  key={zona}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/[0.07] px-3 py-1.5 font-medium backdrop-blur-sm"
                >
                  <MapPinIcon className="h-3.5 w-3.5 text-brand-lime" aria-hidden />
                  {zona}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= MÉTRICAS ================= */}
      <section id="metricas" className="relative px-4 md:px-6 py-[60px] md:py-[90px] scroll-mt-[100px]">
        <div className="absolute inset-x-0 top-0 h-[320px] text-brand/[0.10] pattern-grid [mask-image:linear-gradient(to_bottom,black,transparent)] pointer-events-none"></div>

        <div className="relative max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-[60px] mb-10 md:mb-12 items-end">
            <SectionHeading
              eyebrow={metricas?.dato_breve.valor}
              title={metricas?.titulo_principal.valor}
              size="xl"
              highlightClassName={TEAL_HIGHLIGHT}
            />
            <Reveal delay={120} className="md:ml-auto max-w-[480px]">
              <p className="text-[16px] leading-[1.7] text-brand-muted text-just mb-2">{metricas?.descripcion.valor}</p>
            </Reveal>
          </div>

          {/* The figures are whatever the admin listed: the first one gets the
              full infographic treatment, list-type figures span the row as a
              chip bar, and the rest are cards. */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {metricItems.map((item: any, idx: number) => {
              const esLista = item.descripcion?.tipo_activo === "items";
              const lista: string[] = item.descripcion?.items?.valor ?? [];
              const Icon = metricIcon(item.titulo?.valor ?? "", idx);
              const accent = accentAt(idx);

              if (esLista) {
                return (
                  <Reveal key={item.id} delay={120} className="md:col-span-2 lg:col-span-3">
                    <div className="relative h-full overflow-hidden rounded-[26px] md:rounded-[30px] bg-brand-deep text-white p-7 md:p-8 flex flex-col md:flex-row md:items-center gap-5">
                      <div className="absolute inset-0 text-white/10 pattern-diag pointer-events-none"></div>
                      <div className="relative flex items-center gap-3.5 shrink-0">
                        <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-mint ring-4 ring-brand-lime/25">
                          <Icon className="h-6 w-6 text-brand-forest" aria-hidden />
                        </span>
                        <span className="font-display text-[16px] md:text-[17px] font-bold uppercase leading-[1.15] tracking-[0.01em] text-white">
                          {item.titulo?.valor}
                        </span>
                      </div>
                      <div className="relative flex flex-wrap gap-2 flex-1">
                        {lista.map((valor: string) => (
                          <span
                            key={valor}
                            className="px-3.5 py-2 bg-white/10 border border-white/20 rounded-full text-[13px] font-medium text-white hover:bg-brand-lime hover:text-brand-ink hover:border-brand-lime transition-colors cursor-default"
                          >
                            {valor}
                          </span>
                        ))}
                      </div>
                      <div className="relative hidden lg:flex gap-2 shrink-0">
                        {[0, 1, 2].map((i) => (
                          <div key={i} className="h-[72px] w-[72px] rounded-2xl overflow-hidden ring-2 ring-white/20">
                            <ImageSlot src={fotos[i]} placeholder="" className="bg-white/10" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                );
              }

              if (idx === 0) {
                return (
                  <Reveal key={item.id} className="md:col-span-2 lg:col-span-1 lg:row-span-2">
                    <div className="group relative h-full overflow-hidden rounded-[26px] md:rounded-[30px] bg-gradient-to-br from-brand-forest to-brand-deep text-white p-8 md:p-10 min-h-[440px] flex flex-col justify-between shadow-[0_24px_60px_-30px_rgba(0,77,51,0.85)]">
                      <div className="absolute inset-0 text-white/10 pattern-rings pointer-events-none"></div>
                      <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-brand-lime/20 blur-3xl pointer-events-none"></div>

                      <div className="relative">
                        <div className="flex items-center gap-4 mb-7">
                          <span className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand-mint ring-4 ring-brand-lime/25 transition-transform duration-500 group-hover:scale-110">
                            <Icon className="h-8 w-8 text-brand-forest" aria-hidden />
                          </span>
                          <span className="font-display text-[19px] md:text-[22px] font-bold uppercase leading-[1.15] tracking-[0.01em] text-white">
                            {item.titulo?.valor}
                          </span>
                        </div>

                        {item.numero?.valor && (
                          <div className="inline-flex rounded-[20px] bg-brand-lime px-6 py-3 md:px-8 md:py-4">
                            <span className="font-display font-bold text-[clamp(44px,6.5vw,88px)] leading-[0.95] tracking-[-0.03em] text-brand-forest-dark">
                              <CountUp value={item.numero.valor} />
                            </span>
                          </div>
                        )}

                        <div className="mt-5 text-[14.5px] leading-[1.6] text-white/75 max-w-[340px] text-just">
                          {item.descripcion?.texto?.valor}
                        </div>
                      </div>

                      {/* Sparkline-style ramp: the bars grow from the baseline as
                          the tile scrolls in, brightening toward the present year. */}
                      <div className="relative flex items-end gap-1.5 md:gap-2 h-[90px] mt-8">
                        {[24, 38, 52, 66, 78, 88, 100].map((height, i, arr) => (
                          <div
                            key={height}
                            className="metric-bar flex-1 rounded-md bg-white"
                            style={{
                              height: `${height}%`,
                              opacity: 0.28 + (i / (arr.length - 1)) * 0.62,
                              transitionDelay: `${i * 90}ms`,
                            }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                );
              }

              return (
                <Reveal key={item.id} delay={(idx % 3) * 90}>
                  <div
                    className={cn(
                      "group h-full rounded-[26px] md:rounded-[30px] border p-7 md:p-8 min-h-[212px] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_-26px_rgba(0,46,31,0.4)]",
                      accent.soft,
                      accent.ring
                    )}
                  >
                    <div className="flex items-center gap-3.5 mb-6">
                      <span
                        className={cn(
                          "inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full ring-4 ring-white/60 shadow-sm transition-transform duration-500 group-hover:scale-110",
                          accent.solid
                        )}
                      >
                        <Icon className="h-6 w-6" aria-hidden />
                      </span>
                      <span className={cn("font-display text-[16px] md:text-[17px] font-bold uppercase leading-[1.15] tracking-[0.01em]", accent.text)}>
                        {item.titulo?.valor}
                      </span>
                    </div>
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        {item.numero?.valor && (
                          <div className={cn("font-display font-bold text-[52px] md:text-[64px] leading-[0.85] tracking-[-0.02em]", accent.text)}>
                            <CountUp value={item.numero.valor} />
                          </div>
                        )}
                        <div className="mt-2.5 text-[13.5px] leading-[1.6] text-brand-muted">
                          {item.descripcion?.texto?.valor}
                        </div>
                      </div>
                      <div className="hidden sm:block h-[84px] w-[84px] shrink-0 rounded-2xl overflow-hidden ring-2 ring-white/70 shadow-sm">
                        <ImageSlot src={fotos[(idx + 2) % fotos.length]} placeholder="" className="bg-brand/10" />
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= INSTITUCIONAL + SERVICIOS ================= */}
      <section className="px-4 md:px-6 py-[50px] pb-[60px] md:pb-[90px]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Reveal variant="left">
            <div className="group relative h-full rounded-[26px] md:rounded-[30px] overflow-hidden min-h-[400px] md:min-h-[560px] bg-brand-deep">
              {videoUrl ? (
                // `*asteriscos*` are highlight markup for the visible heading,
                // not something to read out in the accessible name.
                <VideoInstitucional src={videoUrl} titulo={tituloMedia?.replace(/\*/g, "")} />
              ) : (
                <div className="absolute inset-0 transition-transform duration-[900ms] group-hover:scale-105">
                  <ImageSlot src={mediaUrl} placeholder="Imagen institucional" className="bg-brand-deep text-white/40" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent from-35% to-black/80 pointer-events-none"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-deep/60 via-transparent to-transparent pointer-events-none"></div>
              <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8 text-white pointer-events-none">
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="h-[2px] w-7 rounded-full bg-brand-lime" />
                  <span className="text-[11px] tracking-[2.5px] font-bold uppercase text-brand-lime">Institucional</span>
                </div>
                <h3 className="font-display font-semibold text-[26px] md:text-[34px] leading-[1.08] m-0 tracking-[-0.01em]">
                  <HighlightText
                    text={tituloMedia || ""}
                    highlightClassName="font-display font-medium not-italic text-brand-lime"
                  />
                </h3>
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col gap-3">
            <SectionHeading
              eyebrow="Nuestros servicios"
              title={pageData?.secciones.servicios_vista_general.servicios.titulo.valor}
              as="h3"
              size="md"
              highlightClassName={TEAL_HIGHLIGHT}
              className="mt-4 lg:mt-0 mb-2"
            />

            {pageData?.secciones.servicios_vista_general.servicios.cards
              .slice(0, 4)
              .map((srv: any, idx: number) => {
                const accent = accentAt(idx);
                const Icon = serviceIcon(srv.titulo.valor, idx);
                return (
                  <Reveal key={srv.numero.valor} delay={idx * 80} variant="right">
                    <Link
                      href="/servicios#descripcion"
                      className={cn(
                        "flex items-center gap-4 p-5 md:p-[22px] bg-white border rounded-[20px] md:rounded-[22px] text-brand-ink transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_rgba(0,46,31,0.45)] group",
                        accent.ring
                      )}
                    >
                      <span
                        className={cn(
                          "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6",
                          accent.chip
                        )}
                      >
                        <Icon className="h-[22px] w-[22px]" aria-hidden />
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className={cn("block text-[11px] tracking-[2px] font-bold mb-1", accent.text)}>
                          {srv.numero.valor}
                        </span>
                        <span className="block text-[15px] md:text-[16.5px] font-semibold leading-snug">
                          {srv.titulo.valor}
                        </span>
                      </span>
                      <ArrowRightIcon
                        className="h-5 w-5 shrink-0 text-brand-ink/35 transition-all duration-300 group-hover:text-brand-ink group-hover:translate-x-1"
                        aria-hidden
                      />
                    </Link>
                  </Reveal>
                );
              })}

            {pageData?.secciones.servicios_vista_general.servicios.cards[4] && (
              <Reveal delay={340} variant="right">
                <Link
                  href="/servicios#descripcion"
                  className="btn-sheen btn-sheen-dark relative overflow-hidden flex items-center gap-4 p-5 md:p-[22px] rounded-[20px] md:rounded-[22px] bg-gradient-to-r from-brand-lime to-brand text-brand-ink transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_44px_-22px_rgba(0,77,51,0.8)] group"
                >
                  <span className="absolute inset-0 text-brand-ink/10 pattern-diag pointer-events-none"></span>
                  <span className="relative inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-ink/15 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <SparklesIcon className="h-[22px] w-[22px]" aria-hidden />
                  </span>
                  <span className="relative flex-1 min-w-0">
                    <span className="block text-[11px] tracking-[2px] font-bold mb-1">★ PLUS</span>
                    <span className="block text-[15px] md:text-[16.5px] font-bold leading-snug">
                      {pageData.secciones.servicios_vista_general.servicios.cards[4].titulo.valor}
                    </span>
                  </span>
                  <ArrowRightIcon className="relative h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                </Link>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* ================= FRASE DE CIERRE ================= */}
      <section className="px-4 md:px-6 py-[60px] md:py-[100px]">
        <Reveal variant="scale" className="max-w-[1400px] mx-auto">
          {/* The copy sits in a column down one side so the photo or video
              behind it stays visible instead of being covered edge to edge. */}
          <div
            className={cn(
              "relative isolate overflow-hidden rounded-[26px] md:rounded-[36px] min-h-[460px] md:min-h-[540px] flex items-center",
              !fraseFondo && "bg-gradient-to-br from-brand via-brand to-brand-lime"
            )}
          >
            <MediaFondo fondo={fraseFondo} className="-z-10" />
            <div
              className={cn(
                "absolute inset-0 -z-10 pointer-events-none",
                fraseFondo ? "text-white/10" : "text-white/25",
                "pattern-rings"
              )}
            ></div>
            {fraseFondo && (
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-deep/85 via-brand-deep/45 to-transparent pointer-events-none"></div>
            )}

            <div className="relative w-full px-6 md:px-[60px] lg:px-[76px] py-[56px] md:py-[80px]">
              <div className="max-w-[720px]">
                <span
                  className={cn(
                    "inline-flex h-14 w-14 items-center justify-center rounded-full backdrop-blur-sm ring-1 mb-7",
                    fraseFondo ? "bg-brand-lime/25 ring-brand-lime/50" : "bg-white/25 ring-white/40"
                  )}
                >
                  <QuoteIcon className={cn("h-6 w-6", fraseFondo ? "text-brand-lime" : "text-white")} aria-hidden />
                </span>

                {/* Quote first and largest; the label under it is the subtitle. */}
                <p
                  className={cn(
                    "font-display font-bold text-[clamp(30px,4.6vw,58px)] leading-[1.1] tracking-[-0.015em] m-0 text-balance",
                    fraseFondo ? "text-white" : "text-brand-ink"
                  )}
                >
                  <HighlightText
                    text={pageData?.secciones.frase.texto.valor || ""}
                    highlightClassName={cn(
                      "font-display font-bold not-italic",
                      fraseFondo ? "text-brand-lime" : "text-white"
                    )}
                  />
                </p>

                <div
                  className={cn(
                    "mt-6 font-display text-[20px] md:text-[26px] tracking-[0.1em] font-bold uppercase leading-none",
                    fraseFondo ? "text-brand-lime" : "text-brand-ink/70"
                  )}
                >
                  {pageData?.secciones.frase.titulo_pequeno.valor}
                </div>

                <Link
                  href="/solicitar"
                  className="btn-sheen mt-9 inline-flex items-center gap-2.5 rounded-full bg-brand-dark px-7 py-4 text-[14.5px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-forest hover:shadow-[0_18px_40px_-18px_rgba(0,77,51,0.85)] group"
                >
                  Solicitar el servicio
                  <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
