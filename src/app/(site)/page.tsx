import Link from "next/link";
import Image from "next/image";
import { ImageSlot, isRealImageUrl } from "@/components/ImageSlot";
import { getEstructura } from "@/lib/data";
import { HighlightText } from "@/components/HighlightText";
import { cn } from "@/lib/utils";

function isVideoUrl(url?: string) {
  return !!url && /\.(mp4|webm|mov)(\?|$)/i.test(url);
}

const HERO_MARGIN = "px-6 md:px-12 lg:px-[100px]";

const TEAL_HIGHLIGHT = "font-display font-medium not-italic text-[#111111]";

export default async function HomePage() {
  const data = await getEstructura();
  const pageData = data?.sitio.paginas.find((p: any) => p.id === "inicio");
  const heroData = pageData?.secciones.hero;
  const mediaUrl: string | undefined = pageData?.secciones.servicios_vista_general.media.url;

  return (
    <div className="bg-white font-sans overflow-hidden">
      {/* FULL SCREEN HERO — the real photo defined in the admin, cinematic grading on top */}
      <section className="relative min-h-[100svh] flex flex-col overflow-hidden bg-[#0d2b24]">
        {isRealImageUrl(heroData?.imagen_fondo?.valor) ? (
          <Image
            src={heroData.imagen_fondo.valor}
            alt="ASOFRAIN"
            fill
            priority
            unoptimized
            className="object-cover object-center"
          />
        ) : (
          <div className="absolute inset-0"><ImageSlot placeholder="Imagen de fondo (se sube desde el admin)" className="bg-[#0d2b24] text-white/30" /></div>
        )}

        {/* Cinematic color-grade + legibility scrim over the photo */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 md:from-black/50 via-transparent to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 bg-[#62AF9D] mix-blend-color opacity-25 pointer-events-none"></div>

        {/* Film grain */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.045] mix-blend-overlay" aria-hidden>
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>

        {/* Content */}
        <div className={cn("relative z-10 flex-1 flex flex-col justify-center pt-[90px] pb-[100px] max-w-[1600px] mx-auto w-full text-white", HERO_MARGIN)}>
          <h1 className="font-display font-semibold text-[clamp(36px,5.5vw,72px)] leading-[1.08] tracking-[-0.02em] mb-5 md:mb-6 max-w-[720px] text-balance">
            {heroData ? (
              <HighlightText text={heroData.titulo.valor} highlightClassName="font-display font-semibold not-italic text-white" />
            ) : (
              <>Nuestro futuro no es desechable, actuemos ahora.</>
            )}
          </h1>

          <p className="text-[15px] md:text-[17px] leading-[1.65] max-w-[460px] mb-8 font-normal text-white/80 tracking-[0.1px]">
            {heroData ? heroData.descripcion.valor : "Recuperamos, transportamos y aprovechamos residuos sólidos en Suba, Engativá y Usaquén — devolviéndoles valor."}
          </p>

          <div className="flex items-center gap-3.5 flex-wrap">
            <Link href={heroData ? heroData.cta.url : "/solicitar"} className="px-[26px] md:px-[30px] py-[14px] md:py-[16px] text-[15px] md:text-[16px] font-semibold bg-white text-[#111111] rounded-full inline-flex items-center gap-2.5 hover:-translate-y-0.5 transition-transform shadow-lg">
                {heroData ? heroData.cta.texto : "Solicitar servicio"}
              <span aria-hidden>→</span>
            </Link>
            <a href="#metricas" aria-label="Ver el impacto" className="w-[50px] h-[50px] md:w-[54px] md:h-[54px] rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white flex items-center justify-center hover:bg-white/25 transition-colors shrink-0">
              <span aria-hidden className="text-lg">↓</span>
            </a>
          </div>
        </div>
      </section>

      {/* MÉTRICAS */}
      <section id="metricas" className="px-4 md:px-6 py-[60px] md:py-[80px] scroll-mt-[100px]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-[60px] mb-10 md:mb-12 items-end">
            <div>
              <div className="text-[12px] tracking-widest text-[#62AF9D] font-semibold mb-4 uppercase">{pageData?.secciones.metricas.dato_breve.valor}</div>
              <h2 className="font-display font-semibold text-[clamp(36px,4.5vw,60px)] leading-[1.02] tracking-[-0.02em] m-0 text-[#111111]">
                <HighlightText text={pageData?.secciones.metricas.titulo_principal.valor || ""} highlightClassName={TEAL_HIGHLIGHT} />
              </h2>
            </div>
            <p className="text-[16px] leading-relaxed text-[#4b5563] max-w-[480px] md:ml-auto mb-2">
              {pageData?.secciones.metricas.descripcion.valor}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr] gap-4">
            <div className="lg:row-span-2 bg-[#62AF9D] text-[#111111] rounded-[24px] md:rounded-[28px] p-8 md:p-10 min-h-[440px] flex flex-col justify-between relative overflow-hidden">
              <div>
                <div className="text-[11px] tracking-widest text-[#111111]/70 font-semibold mb-5 uppercase">{pageData?.secciones.metricas.items[0].titulo.valor}</div>
                <div className="font-display font-semibold text-[clamp(56px,8vw,120px)] leading-[0.9] tracking-[-0.02em]">{pageData?.secciones.metricas.items[0].numero.valor}</div>
                <div className="mt-4 text-[15px] text-[#111111]/70 max-w-[340px]">{pageData?.secciones.metricas.items[0].descripcion.texto.valor}</div>
              </div>
              <div className="flex items-end gap-1.5 md:gap-2 h-[90px] mt-8">
                <div className="flex-1 bg-[#111111]/15 rounded-md h-[24%]"></div>
                <div className="flex-1 bg-[#111111]/22 rounded-md h-[38%]"></div>
                <div className="flex-1 bg-[#111111]/30 rounded-md h-[52%]"></div>
                <div className="flex-1 bg-[#111111]/40 rounded-md h-[66%]"></div>
                <div className="flex-1 bg-[#111111]/50 rounded-md h-[78%]"></div>
                <div className="flex-1 bg-[#111111]/62 rounded-md h-[88%]"></div>
                <div className="flex-1 bg-[#111111]/75 rounded-md h-[100%]"></div>
              </div>
            </div>

            <div className="bg-white border border-black/[0.08] rounded-[24px] md:rounded-[28px] p-8 min-h-[212px] flex flex-col justify-between">
              <div className="text-[11px] tracking-widest text-[#111111]/70 font-semibold mb-6 uppercase">{pageData?.secciones.metricas.items[1].titulo.valor}</div>
              <div>
                <div className="font-display font-semibold text-[64px] md:text-[80px] leading-[0.85] tracking-[-0.02em] text-[#111111]">{pageData?.secciones.metricas.items[1].numero.valor}</div>
                <div className="mt-2 text-[14px] text-[#4b5563]">{pageData?.secciones.metricas.items[1].descripcion.texto.valor}</div>
              </div>
            </div>

            <div className="bg-white border border-black/[0.08] rounded-[24px] md:rounded-[28px] p-8 min-h-[212px] flex flex-col justify-between">
              <div className="text-[11px] tracking-widest text-[#111111]/70 font-semibold mb-6 uppercase">{pageData?.secciones.metricas.items[2].titulo.valor}</div>
              <div>
                <div className="font-display font-semibold text-[64px] md:text-[80px] leading-[0.85] tracking-[-0.02em] text-[#111111]">{pageData?.secciones.metricas.items[2].numero.valor}</div>
                <div className="mt-2 text-[14px] text-[#4b5563]">{pageData?.secciones.metricas.items[2].descripcion.texto.valor}</div>
              </div>
            </div>

            <div className="bg-white border border-black/[0.08] rounded-[24px] md:rounded-[28px] p-7 md:col-span-2 flex flex-col md:flex-row md:items-center gap-4 md:gap-5">
              <div className="text-[11px] tracking-widest text-[#111111] font-semibold uppercase">{pageData?.secciones.metricas.items[3].titulo.valor}</div>
              <div className="flex flex-wrap gap-2">
                {pageData?.secciones.metricas.items[3].descripcion.items.valor.map((eca: string) => (
                  <div key={eca} className="px-3.5 py-2 bg-white border border-[#62AF9D]/25 rounded-full text-[13px] font-medium text-[#111111]">
                    {eca}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO + SERVICIOS PREVIEW */}
      <section className="px-4 md:px-6 py-[60px] pb-[80px] md:pb-[100px]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-5">

          <div className="relative rounded-[24px] md:rounded-[28px] overflow-hidden min-h-[400px] md:min-h-[520px] bg-[#111111]">
            <div className="absolute inset-0">
              {isVideoUrl(mediaUrl) ? (
                <video src={mediaUrl} className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted playsInline />
              ) : (
                <ImageSlot src={mediaUrl} placeholder="Video institucional (.mp4)" className="bg-[#111111] text-white/40" />
              )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent from-40% to-black/70 pointer-events-none"></div>
            <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8 text-white pointer-events-none">
              <div className="inline-flex items-center justify-center w-[50px] h-[50px] md:w-[60px] md:h-[60px] rounded-full bg-white shadow-sm mb-4 md:mb-5 pointer-events-auto cursor-pointer hover:bg-[#62AF9D] transition-colors">
                <div className="w-0 h-0 border-l-[11px] md:border-l-[13px] border-l-[#111111] border-y-[6px] md:border-y-[8px] border-y-transparent ml-1"></div>
              </div>
              <div className="text-[11px] tracking-widest text-[#62AF9D] font-semibold mb-2.5 uppercase">— VIDEO INSTITUCIONAL</div>
              <h3 className="font-display font-semibold text-[26px] md:text-[32px] leading-[1.05] m-0 tracking-[-0.01em]">
                <HighlightText text={pageData?.secciones.servicios_vista_general.titulo_media.valor || ""} highlightClassName="font-display font-medium not-italic text-[#62AF9D]" />
              </h3>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="text-[12px] tracking-widest text-[#62AF9D] font-semibold uppercase mt-4 lg:mt-0">Nuestros servicios</div>
            <h3 className="font-display font-semibold text-[32px] md:text-[40px] leading-none m-0 mb-3 tracking-[-0.02em] text-[#111111]">
              <HighlightText text={pageData?.secciones.servicios_vista_general.servicios.titulo.valor || ""} highlightClassName={TEAL_HIGHLIGHT} />
            </h3>

            {pageData?.secciones.servicios_vista_general.servicios.cards.slice(0, 4).map((srv: any) => (
              <Link key={srv.numero.valor} href="/servicios#descripcion" className="flex items-center justify-between p-5 md:p-6 bg-white border border-black/[0.08] rounded-[20px] md:rounded-[22px] text-[#111111] hover:bg-[#62AF9D] transition-colors group">
                <div>
                  <div className="text-[11px] tracking-widest text-[#62AF9D] group-hover:text-[#111111] font-semibold mb-1 transition-colors">{srv.numero.valor}</div>
                  <div className="text-[15px] md:text-[17px] font-semibold pr-4">{srv.titulo.valor}</div>
                </div>
                <span className="text-[20px] md:text-[22px] shrink-0">→</span>
              </Link>
            ))}

            {pageData?.secciones.servicios_vista_general.servicios.cards[4] && (
              <Link href="/servicios#descripcion" className="flex items-center justify-between p-5 md:p-6 bg-[#62AF9D] rounded-[20px] md:rounded-[22px] text-[#111111] hover:bg-[#4d9686] transition-colors group">
                <div>
                  <div className="text-[11px] tracking-widest font-bold mb-1">★ PLUS</div>
                  <div className="text-[15px] md:text-[17px] font-bold">{pageData.secciones.servicios_vista_general.servicios.cards[4].titulo.valor}</div>
                </div>
                <span className="text-[20px] md:text-[22px]">→</span>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* FRASE DE CIERRE */}
      <section className="px-4 md:px-6 py-[80px] md:py-[120px]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-[60px] py-[60px] md:py-[80px] bg-[#62AF9D] rounded-[24px] md:rounded-[32px] text-center">
          <div className="text-[11px] tracking-widest text-[#111111]/70 font-semibold mb-6 uppercase">{pageData?.secciones.frase.titulo_pequeno.valor}</div>
          <p className="font-display font-semibold text-[clamp(28px,5vw,56px)] leading-[1.1] tracking-[-0.01em] mx-auto max-w-[1000px] text-balance text-[#111111]">
            <HighlightText text={pageData?.secciones.frase.texto.valor || ""} highlightClassName="font-display font-medium not-italic text-white" />
          </p>
        </div>
      </section>
    </div>
  );
}
