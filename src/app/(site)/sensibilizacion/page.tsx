import Link from "next/link";
import { ArrowRightIcon, CameraIcon, MegaphoneIcon, SparklesIcon } from "lucide-react";
import { ImageSlot } from "@/components/ImageSlot";
import { getEstructura } from "@/lib/data";
import { HighlightText } from "@/components/HighlightText";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { TiposSensibilizacionGrid, type TipoSensibilizacion } from "./TiposSensibilizacionGrid";
import { cn } from "@/lib/utils";

/* eslint-disable @typescript-eslint/no-explicit-any */

export default async function SensibilizacionPage() {
  const data = await getEstructura();
  const pageData = data?.sitio.paginas.find((p: any) => p.id === "sensibilizacion");
  const s = pageData?.secciones;
  const imagenes: any[] = s?.galeria.imagenes ?? [];
  // Flattened here so the (client) cards get plain data instead of the whole
  // editable-field structure.
  const tipos: TipoSensibilizacion[] = (s?.tipos_sensibilizacion.tipos ?? []).map((tipo: any) => ({
    id: tipo.id,
    tipo: tipo.tipo.valor,
    titulo: tipo.titulo.valor,
    imagenUrl: tipo.imagen.valor,
    vinetas: (tipo.vinetas?.items ?? []).map((vineta: any) => vineta.valor),
    galeria: (tipo.galeria ?? []).map((img: any) => ({
      id: img.id,
      url: img.url,
      alt: img.alt,
      encuadre: img.encuadre,
    })),
  }));

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
                <h1 className="font-display font-bold text-[clamp(38px,5.8vw,68px)] leading-[1.04] m-0 tracking-[-0.02em] text-brand-ink">
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
                <p className="text-[16px] md:text-[19px] leading-[1.6] font-medium text-brand-muted m-0 mt-3 text-just">
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
          <TiposSensibilizacionGrid tipos={tipos} />
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
