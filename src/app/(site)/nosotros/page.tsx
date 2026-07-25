import Link from "next/link";
import Image from "next/image";
import { ImageSlot, isRealImageUrl } from "@/components/ImageSlot";
import { getEstructura } from "@/lib/data";
import { HighlightText } from "@/components/HighlightText";

const HERO_MARGIN = "px-6 md:px-12 lg:px-[100px]";

export default async function NosotrosPage() {
  const data = await getEstructura();
  const pageData = data?.sitio.paginas.find((p: any) => p.id === "nosotros");

  return (
    <div className="bg-white font-sans">
      {/* HERO — full-bleed photo, matches the header treatment site-wide */}
      <section className="relative h-[100svh] overflow-hidden bg-[#0d2b24]">
        {isRealImageUrl(pageData?.secciones.hero.imagen_fondo?.valor) ? (
          <Image
            src={pageData.secciones.hero.imagen_fondo.valor}
            alt="ASOFRAIN — Nosotros"
            fill
            priority
            unoptimized
            className="object-cover object-center"
          />
        ) : (
          <ImageSlot placeholder="Hero Nosotros: retrato de recuperadores ambientales / bodega" className="bg-[#0d2b24] text-white/30" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 md:from-black/50 via-transparent to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 bg-[#62AF9D] mix-blend-color opacity-25 pointer-events-none"></div>
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.045] mix-blend-overlay" aria-hidden>
          <filter id="grain-nosotros">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain-nosotros)" />
        </svg>

        <div className={`relative z-10 h-full flex flex-col justify-center ${HERO_MARGIN} pt-[90px] pb-[100px] max-w-[1600px] mx-auto text-white`}>
          <div className="text-[11px] tracking-[3px] text-[#62AF9D] font-semibold mb-4 md:mb-6 uppercase">— 02 · NOSOTROS</div>
          <h1 className="font-display font-semibold text-[clamp(36px,6vw,76px)] leading-[1.05] tracking-[-0.02em] mb-5 md:mb-6 max-w-[820px] m-0">
            <HighlightText text={pageData?.secciones.hero.titulo.valor || ""} highlightClassName="font-display font-semibold not-italic text-white" />
          </h1>
          <p className="text-[15px] md:text-[17px] leading-[1.65] text-white/80 max-w-[520px] mb-8 font-normal m-0">
            {pageData?.secciones.hero.descripcion.valor}
          </p>
          <div className="flex flex-wrap gap-3">
            {pageData?.secciones.hero.cta_1?.texto && (
              <Link href={pageData.secciones.hero.cta_1.url || "#"} className="px-[22px] md:px-[26px] py-[12px] md:py-[14px] bg-white text-[#111111] rounded-full text-[13.5px] md:text-[14px] font-semibold flex items-center gap-2.5 hover:-translate-y-0.5 transition-transform">
                {pageData.secciones.hero.cta_1.texto} <span className="text-[18px]">→</span>
              </Link>
            )}
            {pageData?.secciones.hero.cta_2?.texto && (
              <Link href={pageData.secciones.hero.cta_2.url || "#"} className="px-[22px] md:px-[26px] py-[12px] md:py-[14px] bg-white/10 backdrop-blur-md border border-white/25 text-white rounded-full text-[13.5px] md:text-[14px] font-semibold hover:bg-white/20 transition-colors">
                {pageData.secciones.hero.cta_2.texto}
              </Link>
            )}
          </div>
        </div>

        <div className="hidden md:block absolute bottom-9 md:right-12 lg:right-[100px] z-10 text-white/70 font-display text-[20px] md:text-[22px] text-right max-w-[400px] leading-[1.3]">
          "Detrás de cada tonelada aprovechada, un oficio digno."
        </div>
      </section>

      {/* QUIÉNES SOMOS */}
      <section id="quienes-somos" className="px-4 md:px-[60px] pt-[80px] md:pt-[140px] pb-[60px] md:pb-[100px] bg-white scroll-mt-[100px]">
        <div className="max-w-[1360px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 md:gap-[80px] items-start">
            <div>
              <div className="text-[11px] tracking-[2.5px] text-[#62AF9D] font-semibold mb-4 md:mb-5 uppercase">QUIÉNES SOMOS</div>
              <h2 className="font-display font-semibold text-[clamp(36px,4.5vw,64px)] leading-[1.05] m-0 tracking-[-0.02em] text-[#111111]">
                <HighlightText text={pageData?.secciones.quienes_somos.titulo.valor || ""} />
              </h2>
            </div>
            <div className="text-[16px] md:text-[17px] leading-[1.65] text-[#4b5563] whitespace-pre-wrap">
              {pageData?.secciones.quienes_somos.descripcion.valor}
            </div>
          </div>
        </div>
      </section>

      {/* HISTORIA */}
      <section id="historia" className="px-4 md:px-[60px] py-[60px] md:py-[100px] bg-white scroll-mt-[100px]">
        <div className="max-w-[1360px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 md:gap-[80px] items-start">
            <div>
              <div className="text-[11px] tracking-[2.5px] text-[#62AF9D] font-semibold mb-4 md:mb-5 uppercase">HISTORIA</div>
              <h3 className="font-display font-semibold text-[36px] md:text-[48px] leading-none m-0 tracking-[-0.02em] text-[#111111]">
                <HighlightText text={pageData?.secciones.historia.titulo.valor || ""} />
              </h3>
            </div>
            <div className="flex flex-col">
              {pageData?.secciones.historia.filas.map((item: any, idx: number) => {
                const isLast = idx === pageData.secciones.historia.filas.length - 1;
                return (
                  <div key={idx} className={`grid grid-cols-1 sm:grid-cols-[130px_1fr] gap-4 sm:gap-[30px] py-[28px] ${!isLast ? 'border-b border-black/[0.08]' : ''}`}>
                    <div className="font-display font-semibold text-[44px] leading-none text-[#62AF9D]">{item.ano.valor}</div>
                    <div>
                      <div className="text-[17px] md:text-[18px] font-semibold mb-1.5 text-[#111111]">{item.titulo.valor}</div>
                      <div className="text-[14px] md:text-[14.5px] text-[#4b5563] leading-[1.55]">{item.descripcion.valor}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* MISIÓN Y VISIÓN */}
      <section id="mision-vision" className="px-4 md:px-[60px] py-[60px] md:py-[100px] bg-white scroll-mt-[100px]">
        <div className="max-w-[1360px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            <div className="bg-[#F2F9F7] rounded-[24px] px-8 md:px-12 py-10 md:py-[52px] min-h-[300px] md:min-h-[400px] flex flex-col justify-between">
              <div className="text-[11px] tracking-[2.5px] text-[#111111]/70 font-semibold uppercase">MISIÓN</div>
              <p className="font-display font-semibold text-[26px] md:text-[34px] leading-[1.2] mt-8 md:mt-6 mb-0 tracking-[-0.01em] whitespace-pre-wrap text-[#111111]">
                {pageData?.secciones.mision.descripcion.valor}
              </p>
            </div>
            <div className="bg-[#62AF9D] text-[#111111] rounded-[24px] px-8 md:px-12 py-10 md:py-[52px] min-h-[300px] md:min-h-[400px] flex flex-col justify-between relative overflow-hidden">
              <div className="text-[11px] tracking-[2.5px] font-semibold relative z-10 uppercase text-[#111111]/70">VISIÓN · 2035</div>
              <p className="font-display font-semibold text-[26px] md:text-[34px] leading-[1.2] mt-8 md:mt-6 mb-0 tracking-[-0.01em] relative z-10 whitespace-pre-wrap">
                {pageData?.secciones.vision.descripcion.valor}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VALORES */}
      <section id="valores" className="px-4 md:px-[60px] py-[60px] md:py-[100px] bg-white scroll-mt-[100px]">
        <div className="max-w-[1360px] mx-auto">
          <div className="mb-10 md:mb-[50px]">
            <div className="text-[11px] tracking-[2.5px] text-[#62AF9D] font-semibold mb-3 md:mb-4 uppercase">VALORES INSTITUCIONALES</div>
            <h3 className="font-display font-semibold text-[36px] md:text-[48px] leading-none m-0 tracking-[-0.02em] text-[#111111]">
              <HighlightText text={pageData?.secciones.valores.titulo.valor || ""} />
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-black/[0.08]">
            {pageData?.secciones.valores.cuadros.map((v: any, idx: number) => {
              const isHighlight = idx === pageData.secciones.valores.cuadros.length - 1;
              return (
                <div key={v.numero.valor} className={`p-6 md:p-8 pb-8 md:pb-9 border-r border-b border-black/[0.08] ${isHighlight ? 'bg-[#62AF9D]' : ''}`}>
                  <div className={`font-display font-semibold text-[32px] leading-none ${isHighlight ? 'text-[#111111]' : 'text-[#62AF9D]'}`}>0{v.numero.valor}</div>
                  <div className="mt-5 md:mt-6 text-[17px] md:text-[18px] font-semibold text-[#111111]">{v.titulo.valor}</div>
                  <div className={`mt-2 text-[13.5px] leading-[1.55] ${isHighlight ? 'text-[#111111]/75' : 'text-[#4b5563]'}`}>{v.descripcion.valor}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* OBJETO SOCIAL / AMBIENTAL */}
      <section className="px-4 md:px-[60px] py-[60px] md:py-[100px] bg-white">
        <div className="max-w-[1360px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-[80px] py-10 md:py-[60px] border-y border-black/[0.08]">
            <div>
              <div className="text-[11px] tracking-[2.5px] text-[#62AF9D] font-semibold mb-4 md:mb-5 uppercase">OBJETO SOCIAL</div>
              <h3 className="font-display font-semibold text-[30px] md:text-[36px] leading-[1.1] m-0 mb-4 md:mb-5 tracking-[-0.01em] text-[#111111]">
                <HighlightText text={pageData?.secciones.objeto_social.titulo.valor || ""} />
              </h3>
              <p className="text-[15.5px] md:text-[16px] leading-[1.65] text-[#4b5563] m-0 whitespace-pre-wrap">{pageData?.secciones.objeto_social.descripcion.valor}</p>
            </div>
            <div>
              <div className="text-[11px] tracking-[2.5px] text-[#62AF9D] font-semibold mb-4 md:mb-5 uppercase">OBJETO AMBIENTAL</div>
              <h3 className="font-display font-semibold text-[30px] md:text-[36px] leading-[1.1] m-0 mb-4 md:mb-5 tracking-[-0.01em] text-[#111111]">
                <HighlightText text={pageData?.secciones.objeto_ambiental.titulo.valor || ""} />
              </h3>
              <p className="text-[15.5px] md:text-[16px] leading-[1.65] text-[#4b5563] m-0 whitespace-pre-wrap">{pageData?.secciones.objeto_ambiental.descripcion.valor}</p>
            </div>
          </div>
          <div className="py-[60px] text-center">
            <div className="text-[11px] tracking-[2.5px] text-[#62AF9D] font-semibold mb-4 md:mb-6 uppercase">{pageData?.secciones.frase_1.titulo_pequeno.valor}</div>
            <p className="font-display font-semibold text-[28px] md:text-[40px] leading-[1.2] m-0 mx-auto max-w-[900px] tracking-[-0.01em] text-[#111111]">
              <HighlightText text={pageData?.secciones.frase_1.texto.valor || ""} />
            </p>
          </div>
        </div>
      </section>

      {/* ENTIDADES */}
      <section id="entidades" className="px-4 md:px-[60px] pt-[60px] md:pt-[120px] pb-[80px] md:pb-[140px] bg-white scroll-mt-[100px]">
        <div className="max-w-[1360px] mx-auto">
          <div className="flex justify-between items-start md:items-end mb-[40px] md:mb-[50px] flex-col md:flex-row gap-5">
            <div>
              <div className="text-[11px] tracking-[2.5px] text-[#62AF9D] font-semibold mb-3 md:mb-4 uppercase">ENTIDADES ALIADAS</div>
              <h3 className="font-display font-semibold text-[36px] md:text-[48px] leading-none m-0 tracking-[-0.02em] text-[#111111]">
                <HighlightText text={pageData?.secciones.entidades_aliadas.titulo.valor || ""} />
              </h3>
            </div>
            <div className="text-[14px] text-[#4b5563] max-w-[360px]">Alineados con las entidades regulatorias, de vigilancia y de política pública del sector.</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pageData?.secciones.entidades_aliadas.aliados.slice(0, pageData.secciones.entidades_aliadas.aliados.length - 1).map((e: any) => (
              <div key={e.id} className="bg-[#F2F9F7] rounded-[18px] p-[36px_30px] min-h-[200px] flex flex-col justify-between">
                <div className="w-14 h-14 rounded-xl bg-white overflow-hidden flex items-center justify-center font-display font-semibold text-[22px] text-[#111111]">
                  {isRealImageUrl(e.logo.valor) ? (
                    <ImageSlot src={e.logo.valor} placeholder={e.titulo.valor} />
                  ) : (
                    e.titulo.valor.charAt(0)
                  )}
                </div>
                <div>
                  <div className="text-[11px] tracking-[1.5px] text-[#62AF9D] font-semibold">{e.titulo.valor}</div>
                  <div className="mt-1.5 text-[15px] font-semibold text-[#111111]">{e.descripcion.valor}</div>
                </div>
              </div>
            ))}
            {pageData?.secciones.entidades_aliadas.aliados.length > 0 && (
              <div className="bg-[#62AF9D] text-[#111111] rounded-[18px] p-[30px] md:p-[36px_30px] min-h-[200px] flex flex-col justify-between md:col-span-2 lg:col-span-3">
                <div className="w-14 h-14 rounded-xl bg-white overflow-hidden flex items-center justify-center font-display font-semibold text-[22px] text-[#111111] mb-6 md:mb-0">
                  {(() => {
                    const ultimo = pageData.secciones.entidades_aliadas.aliados[pageData.secciones.entidades_aliadas.aliados.length - 1];
                    return isRealImageUrl(ultimo.logo.valor) ? (
                      <ImageSlot src={ultimo.logo.valor} placeholder={ultimo.titulo.valor} />
                    ) : (
                      ultimo.titulo.valor.charAt(0)
                    );
                  })()}
                </div>
                <div className="flex justify-between items-start md:items-end gap-6 md:gap-10 flex-col md:flex-row">
                  <div>
                    <div className="text-[11px] tracking-[1.5px] font-semibold text-[#111111]/70">{pageData.secciones.entidades_aliadas.aliados[pageData.secciones.entidades_aliadas.aliados.length - 1].titulo.valor}</div>
                  </div>
                  <div className="text-[13.5px] text-[#111111]/70 max-w-[420px] whitespace-pre-wrap">{pageData.secciones.entidades_aliadas.aliados[pageData.secciones.entidades_aliadas.aliados.length - 1].descripcion.valor}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
