import Link from "next/link";
import Image from "next/image";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  BoxesIcon,
  CheckIcon,
  CircleDollarSignIcon,
  ClockIcon,
  MapPinIcon,
  PackageSearchIcon,
  SparklesIcon,
} from "lucide-react";
import { ImageSlot, isRealImageUrl, focalToPosition } from "@/components/ImageSlot";
import { getEstructura } from "@/lib/data";
import { HighlightText } from "@/components/HighlightText";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { accentAt, sectorIcon, serviceIcon } from "@/lib/brandVisuals";
import { cn } from "@/lib/utils";

const HERO_MARGIN = "px-6 md:px-12 lg:px-[100px]";

/* eslint-disable @typescript-eslint/no-explicit-any */

export default async function ServiciosPage() {
  const data = await getEstructura();
  const pageData = data?.sitio.paginas.find((p: any) => p.id === "servicios");
  const s = pageData?.secciones;
  const heroFocal = focalToPosition(s?.hero.imagen_fondo?.encuadre);
  const procesos: any[] = s?.servicios.items ?? [];

  return (
    <div className="bg-brand-sand font-sans">
      {/* ================= HERO ================= */}
      <section className="relative min-h-screen min-h-[100dvh] flex flex-col overflow-hidden bg-brand-deep">
        {isRealImageUrl(s?.hero.imagen_fondo?.valor) ? (
          <Image
            src={s.hero.imagen_fondo.valor}
            alt="ASOFRAIN — Servicios"
            fill
            priority
            unoptimized
            className="object-cover"
            style={{ objectPosition: heroFocal }}
          />
        ) : (
          <div className="absolute inset-0">
            <ImageSlot
              placeholder="Hero Servicios: operación en ECA / compactación / camión selectivo"
              className="bg-brand-deep text-white/30"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 md:from-black/55 via-transparent to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-brand/40 via-transparent to-brand-slate/45 mix-blend-color pointer-events-none"></div>
        <div className="absolute -bottom-32 -left-24 w-[460px] h-[460px] rounded-full bg-brand/25 blur-[120px] pointer-events-none animate-af-float"></div>
        <div className="absolute inset-0 text-white/[0.09] pattern-diag [mask-image:linear-gradient(to_top,black,transparent_70%)] pointer-events-none"></div>
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.045] mix-blend-overlay" aria-hidden>
          <filter id="grain-servicios">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain-servicios)" />
        </svg>

        <div
          className={`relative z-10 flex-1 flex flex-col justify-end ${HERO_MARGIN} pt-[110px] pb-[100px] max-w-[1600px] mx-auto w-full text-white`}
        >
          <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-10">
            <Reveal className="md:flex-[2]">
              <div className="flex items-center gap-2.5 mb-5 md:mb-6">
                <span className="h-[2px] w-8 rounded-full bg-brand-lime" />
                <span className="text-[11px] tracking-[3px] text-brand-lime font-bold uppercase">03 · Servicios</span>
              </div>
              <h1 className="font-display font-semibold text-[clamp(36px,7vw,88px)] leading-[1.02] tracking-[-0.02em] m-0 max-w-[820px]">
                <HighlightText
                  text={s?.hero.titulo.valor || ""}
                  highlightClassName="font-display font-semibold not-italic text-brand-lime"
                />
              </h1>
            </Reveal>

            <Reveal delay={150} variant="right" className="md:flex-1 self-start border-t border-white/30 pt-5 mt-4 md:mt-0">
              <div className="text-[11px] tracking-[2px] text-brand-lime font-bold mb-3.5 uppercase">003 — Descripción</div>
              <p className="text-[14.5px] leading-[1.65] text-white/85 m-0 mb-5 text-just">{s?.hero.descripcion.valor}</p>
              <div className="border-b border-white/25 pb-3.5 mb-3.5"></div>
              <div className="flex items-center gap-2 text-[11px] tracking-[2px] text-white/60 font-semibold uppercase">
                <MapPinIcon className="h-3.5 w-3.5 text-brand-lime" aria-hidden />
                Disponible en 3 localidades
              </div>
              <div className="mt-2 text-[15px] font-display font-medium">{s?.hero.descripcion_2.valor}</div>
            </Reveal>
          </div>

          <Reveal delay={260}>
            <Link
              href="#descripcion"
              className="btn-sheen btn-sheen-dark mt-8 md:mt-10 inline-flex items-center gap-3.5 px-[20px] md:px-[22px] py-[12px] md:py-[14px] bg-white shadow-sm rounded-full text-brand-ink text-[13px] font-semibold hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-16px_rgba(0,0,0,0.55)] transition-all duration-300 group"
            >
              <span className="w-[34px] md:w-[38px] h-[34px] md:h-[38px] rounded-full bg-brand text-brand-ink flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRightIcon className="h-[18px] w-[18px]" aria-hidden />
              </span>
              Ver los {procesos.length} procesos
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ================= LOS PROCESOS ================= */}
      <section
        id="descripcion"
        className="relative px-4 md:px-[60px] pt-[60px] md:pt-[110px] pb-[50px] md:pb-[80px] scroll-mt-[100px]"
      >
        <div className="absolute inset-x-0 top-0 h-[300px] text-brand/[0.10] pattern-grid [mask-image:linear-gradient(to_bottom,black,transparent)] pointer-events-none"></div>

        <div className="relative max-w-[1360px] mx-auto">
          <SectionHeading
            eyebrow="Descripción de servicios"
            title={s?.servicios.titulo.valor}
            subtitle="De la separación en la fuente al reporte de toneladas al SUI: una sola cadena, sin intermediarios, con trazabilidad en cada eslabón."
            size="xl"
            className="mb-12 md:mb-[70px]"
          />

          {/* Cada proceso es una fila editorial: imagen + ícono + detalle,
              alternando el lado en escritorio para que se lea como un flujo. */}
          <ol className="relative flex flex-col gap-5 md:gap-6 list-none p-0 m-0 mb-[60px] md:mb-[90px]">
            {procesos.map((item: any, idx: number) => {
              const accent = accentAt(idx);
              const Icon = serviceIcon(item.titulo.valor, idx);
              const reversed = idx % 2 === 1;
              const step = String(idx + 1).padStart(2, "0");
              const isLast = idx === procesos.length - 1;

              return (
                <Reveal as="li" key={item.id} delay={40} className="relative">
                  <article
                    className={cn(
                      "group relative overflow-hidden rounded-[26px] border transition-all duration-300 hover:shadow-[0_28px_60px_-38px_rgba(17,17,17,0.5)]",
                      accent.soft,
                      accent.ring
                    )}
                  >
                    <div
                      className={cn(
                        "grid grid-cols-1 items-stretch",
                        reversed ? "lg:grid-cols-[1fr_1.05fr]" : "lg:grid-cols-[1.05fr_1fr]"
                      )}
                    >
                      {/* Imagen — cambia de lado en filas pares para que la
                          secuencia se lea como un recorrido y no como una lista. */}
                      <div className={cn("relative min-h-[220px] lg:min-h-[330px] overflow-hidden", reversed && "lg:order-2")}>
                        <div className="absolute inset-0 transition-transform duration-[900ms] group-hover:scale-[1.06]">
                          <ImageSlot
                            src={item.imagen?.valor}
                            focal={focalToPosition(item.imagen?.encuadre)}
                            placeholder={`Foto del proceso ${step}`}
                            className={cn("h-full w-full", accent.chip)}
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none lg:hidden"></div>
                        <span
                          className={cn(
                            "absolute top-5 left-5 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[2px] backdrop-blur-sm",
                            accent.solid
                          )}
                        >
                          Proceso {step}
                        </span>
                      </div>

                      {/* Contenido */}
                      <div className={cn("relative p-7 md:p-10 lg:p-11 flex flex-col justify-center", reversed && "lg:order-1")}>
                        <div className="absolute inset-0 text-brand-ink/[0.07] pattern-dots opacity-50 pointer-events-none"></div>

                        <div className="relative flex items-center gap-4 mb-5">
                          <span
                            className={cn(
                              "inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6",
                              accent.solid
                            )}
                          >
                            <Icon className="h-7 w-7" aria-hidden />
                          </span>
                          <span className={cn("font-display font-semibold text-[46px] leading-none opacity-30", accent.text)}>
                            {step}
                          </span>
                        </div>

                        <h3 className="relative font-display font-semibold text-[22px] md:text-[27px] leading-[1.18] tracking-[-0.01em] text-brand-ink m-0 mb-3">
                          {item.titulo.valor}
                        </h3>
                        <p className="relative text-[14px] md:text-[15px] leading-[1.7] text-brand-muted m-0 text-just">
                          {item.descripcion.valor}
                        </p>

                        <div className={cn("relative mt-6 h-[3px] w-12 rounded-full transition-all duration-500 group-hover:w-24", accent.solid)}></div>
                      </div>
                    </div>
                  </article>

                  {/* Conector entre pasos */}
                  {!isLast && (
                    <div className="flex justify-center py-1" aria-hidden>
                      <span className="flex flex-col items-center gap-1">
                        <span className="h-4 w-px bg-brand-ink/15"></span>
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-ink/25"></span>
                        <span className="h-4 w-px bg-brand-ink/15"></span>
                      </span>
                    </div>
                  )}
                </Reveal>
              );
            })}
          </ol>

          {/* Compactación plus */}
          <Reveal variant="scale">
            <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-brand-deep via-brand-deep to-brand-slate text-white p-8 md:p-10 lg:p-[64px]">
              <div className="absolute inset-0 text-white/10 pattern-rings pointer-events-none"></div>
              <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-brand-lime/25 blur-[100px] pointer-events-none animate-af-float"></div>

              <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-[60px] items-start">
                <div>
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-lime text-brand-ink mb-6">
                    <BoxesIcon className="h-6 w-6" aria-hidden />
                  </span>
                  <div className="flex items-center gap-2.5 mb-4">
                    <span className="h-[2px] w-7 rounded-full bg-brand-lime" />
                    <span className="text-[11px] tracking-[2.5px] font-bold uppercase text-brand-lime">
                      {s?.servicio_destacado_plus.subtitulo_pequeno.valor}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-[34px] md:text-[46px] leading-[1.05] m-0 mb-4 md:mb-5 tracking-[-0.02em]">
                    {s?.servicio_destacado_plus.titulo.valor}
                  </h3>
                  <p className="text-[15px] md:text-[16px] leading-[1.7] m-0 text-white/75 text-just">
                    {s?.servicio_destacado_plus.descripcion.valor}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-1">
                  {s?.servicio_destacado_plus.items.map((item: any, idx: number) => (
                    <Reveal
                      key={item.id}
                      delay={idx * 70}
                      variant="fade"
                      className="flex items-start gap-4 py-4 border-b border-white/15 group/item"
                    >
                      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/12 ring-1 ring-white/20 text-brand-lime transition-transform duration-500 group-hover/item:scale-110">
                        <CheckIcon className="h-4 w-4" aria-hidden />
                      </span>
                      <div>
                        <div className="text-[15.5px] md:text-[16px] font-semibold mb-1">{item.titulo.valor}</div>
                        <div className="text-[13px] leading-[1.6] text-white/65">{item.descripcion.valor}</div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= RUTAS Y HORARIOS ================= */}
      <section id="rutas" className="px-4 md:px-[60px] py-[50px] md:py-[80px] scroll-mt-[100px]">
        <div className="max-w-[1360px] mx-auto">
          <div className="flex justify-between items-start md:items-end mb-[40px] md:mb-[44px] flex-col md:flex-row gap-4 md:gap-5">
            <SectionHeading
              eyebrow="Rutas, localidades y horarios"
              title={s?.rutas_localidades_horarios.titulo.valor}
              as="h3"
              size="lg"
              tone="slate"
            />
            <Reveal delay={120} className="max-w-[360px]">
              <p className="text-[13.5px] leading-[1.7] text-brand-muted md:text-right text-just">
                {s?.rutas_localidades_horarios.descripcion.valor}
              </p>
            </Reveal>
          </div>

          <Reveal variant="fade">
            <div className="overflow-hidden rounded-[22px] border border-black/[0.07] bg-white shadow-[0_20px_50px_-42px_rgba(17,17,17,0.5)]">
              <div className="hidden md:grid grid-cols-[1fr_2fr_2fr_1fr] p-[18px_32px] bg-brand-slate text-white text-[11px] tracking-[2px] font-bold uppercase">
                <div>Localidad</div>
                <div>Días</div>
                <div>Horario</div>
                <div className="text-right">Estado</div>
              </div>
              {s?.rutas_localidades_horarios.tabla.filas.map((item: any, i: number) => {
                const accent = accentAt(i);
                return (
                  <div
                    key={item.id}
                    className={cn(
                      "group grid grid-cols-2 md:grid-cols-[1fr_2fr_2fr_1fr] p-[20px_24px] md:p-[26px_32px] items-center gap-y-3 gap-x-4 md:gap-0 text-brand-ink transition-colors hover:bg-brand-sand",
                      i > 0 && "border-t border-black/[0.07]"
                    )}
                  >
                    <div className="col-span-2 md:col-span-1 flex items-center gap-3">
                      <span className={cn("inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl", accent.chip)}>
                        <MapPinIcon className="h-4 w-4" aria-hidden />
                      </span>
                      <span className="font-display font-semibold text-[24px] md:text-[27px] leading-none">
                        {item.localidad.valor}
                      </span>
                    </div>
                    <div className="text-[14px] md:text-[15px]">
                      <span className="md:hidden text-[11px] font-semibold uppercase tracking-[1.5px] text-brand-dark block mb-1">
                        Días
                      </span>
                      {item.dias.valor}
                    </div>
                    <div className="text-[14px] md:text-[15px] flex items-center gap-2">
                      <ClockIcon className="hidden md:block h-4 w-4 text-brand-ink/35 shrink-0" aria-hidden />
                      <span>
                        <span className="md:hidden text-[11px] font-semibold uppercase tracking-[1.5px] text-brand-dark block mb-1">
                          Horario
                        </span>
                        {item.horario.valor}
                      </span>
                    </div>
                    <div className="col-span-2 md:col-span-1 md:text-right mt-2 md:mt-0">
                      {item.estado?.activa !== false ? (
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-brand-lime/20 text-brand-lime-dark rounded-full text-[12px] font-bold">
                          <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-brand-lime animate-af-ping-ring"></span>
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-lime-dark"></span>
                          </span>
                          Activa
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-black/[0.05] text-brand-ink/40 rounded-full text-[12px] font-semibold">
                          <span className="h-2 w-2 rounded-full bg-brand-ink/25"></span>
                          No activa
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= SECTORES ATENDIDOS ================= */}
      <section id="sectores" className="px-4 md:px-[60px] py-[50px] md:py-[80px] scroll-mt-[100px]">
        <div className="max-w-[1360px] mx-auto">
          <SectionHeading
            eyebrow="Sectores atendidos"
            title={s?.sectores_atendidos.titulo.valor}
            as="h3"
            size="lg"
            tone="lime"
            className="mb-[40px] md:mb-[50px]"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {s?.sectores_atendidos.sectores.map((sector: any, idx: number) => {
              const accent = accentAt(idx);
              const Icon = sectorIcon(`${sector.titulo.valor} ${sector.descripcion.valor}`, idx);
              return (
                <Reveal key={sector.id} delay={(idx % 3) * 90}>
                  <div
                    className={cn(
                      "group h-full rounded-2xl border bg-white p-6 md:p-7 flex items-center gap-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_-28px_rgba(17,17,17,0.45)]",
                      accent.ring
                    )}
                  >
                    <div className="relative w-[54px] h-[54px] shrink-0">
                      {isRealImageUrl(sector.imagen?.valor) ? (
                        <div className="h-full w-full rounded-xl overflow-hidden ring-1 ring-black/[0.06]">
                          <ImageSlot src={sector.imagen.valor} placeholder="" className={accent.chip} />
                        </div>
                      ) : (
                        <span
                          className={cn(
                            "flex h-full w-full items-center justify-center rounded-xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6",
                            accent.chip
                          )}
                        >
                          <Icon className="h-6 w-6" aria-hidden />
                        </span>
                      )}
                      <span
                        className={cn(
                          "absolute -bottom-1.5 -right-1.5 inline-flex h-6 w-6 items-center justify-center rounded-lg ring-2 ring-white",
                          accent.solid
                        )}
                      >
                        <Icon className="h-3 w-3" aria-hidden />
                      </span>
                    </div>
                    <div className="min-w-0">
                      <div className="text-[16px] md:text-[17px] font-semibold text-brand-ink leading-snug">
                        {sector.titulo.valor}
                      </div>
                      <div className="text-[12.5px] leading-[1.55] text-brand-muted mt-1">{sector.descripcion.valor}</div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= TARIFA Y PRODUCTOS ================= */}
      <section id="tarifa" className="px-4 md:px-[60px] pt-[50px] md:pt-[80px] pb-[60px] md:pb-[90px] scroll-mt-[100px]">
        <div className="max-w-[1360px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-[60px] items-start">
            <div>
              <SectionHeading
                eyebrow="Tarifa y productos"
                title={s?.tarifas_y_productos.titulo.valor}
                as="h3"
                size="lg"
              />
              <Reveal delay={120}>
                <p className="text-[15.5px] md:text-[16px] leading-[1.7] text-brand-muted m-0 mt-5 mb-8 whitespace-pre-wrap text-just">
                  {s?.tarifas_y_productos.descripcion.valor}
                </p>
                <Link
                  href={s?.tarifas_y_productos.cta.url || "/normatividad"}
                  className="btn-sheen group inline-flex items-center gap-2.5 px-[26px] py-[14px] bg-brand-ink text-white rounded-full text-[14px] font-semibold hover:bg-brand-dark transition-all duration-300 hover:-translate-y-0.5 w-full sm:w-auto justify-center"
                >
                  {s?.tarifas_y_productos.cta.texto}
                  <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                </Link>
              </Reveal>
            </div>

            <Reveal variant="right" delay={100}>
              <div className="relative overflow-hidden rounded-[22px] border border-brand/25 bg-white p-8 md:p-10">
                <div className="absolute inset-0 text-brand/[0.07] pattern-dots pointer-events-none"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand/15 text-brand-dark">
                      <PackageSearchIcon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="text-[11px] tracking-[2px] text-brand-dark font-bold uppercase">
                      Productos aprovechados
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
                    {s?.tarifas_y_productos.productos_aprovechados.items.map((item: any, i: number, arr: any[]) => (
                      <div
                        key={item.id}
                        className={cn(
                          "flex items-center gap-2.5 py-3 text-[14.5px] md:text-[15px] text-brand-ink",
                          i < arr.length - (arr.length % 2 === 0 ? 2 : 1) && "border-b border-black/[0.07]"
                        )}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-lime shrink-0"></span>
                        {item.nombre.valor}
                      </div>
                    ))}
                  </div>
                  <div className="mt-7 flex items-start gap-3 p-4 bg-brand/10 border border-brand/25 rounded-xl text-[12.5px] md:text-[13px] text-brand-dark leading-relaxed">
                    <SparklesIcon className="h-4 w-4 shrink-0 mt-0.5" aria-hidden />
                    <span>
                      Consulta el marco tarifario ilustrado y la lista completa de materiales desde la sección de
                      Normatividad.
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal variant="scale" className="mt-[60px] md:mt-[80px]">
            <div className="relative overflow-hidden p-8 md:p-[60px] bg-gradient-to-r from-brand-lime via-brand to-brand-dark rounded-[26px] grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-6 md:gap-10 items-center text-center md:text-left text-brand-ink">
              <div className="absolute inset-0 text-white/25 pattern-diag pointer-events-none"></div>
              <div className="relative w-[70px] md:w-[80px] h-[70px] md:h-[80px] rounded-full bg-white flex items-center justify-center text-brand-dark mx-auto md:mx-0 shrink-0 shadow-lg">
                <CircleDollarSignIcon className="h-9 w-9 md:h-10 md:w-10" aria-hidden />
              </div>
              <div className="relative">
                <div className="font-display font-semibold text-[26px] md:text-[32px] tracking-[-0.01em] leading-tight mb-2 md:mb-0">
                  {s?.cta_final.titulo.valor}
                </div>
                <div className="mt-1 md:mt-2 text-[14px] md:text-[14.5px] text-brand-ink/70 max-w-[420px] mx-auto md:mx-0">
                  {s?.cta_final.descripcion.valor}
                </div>
              </div>
              <Link
                href={s?.cta_final.boton.url || "/solicitar"}
                className="btn-sheen relative group px-[26px] md:px-[30px] py-[14px] md:py-[17px] bg-brand-ink text-white rounded-full text-[14px] font-semibold flex items-center justify-center gap-2.5 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-18px_rgba(17,17,17,0.85)] transition-all duration-300 mt-2 md:mt-0 w-full sm:w-auto"
              >
                {s?.cta_final.boton.texto}
                <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
