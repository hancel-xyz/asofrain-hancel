import Link from "next/link";
import Image from "next/image";
import { ImageSlot, isRealImageUrl } from "@/components/ImageSlot";
import { getEstructura } from "@/lib/data";
import { HighlightText } from "@/components/HighlightText";

function isVideoUrl(url?: string) {
  return !!url && /\.(mp4|webm|mov)(\?|$)/i.test(url);
}

export default async function HomePage() {
  const data = await getEstructura();
  const pageData = data?.sitio.paginas.find((p: any) => p.id === "inicio");
  const heroData = pageData?.secciones.hero;
  const mediaUrl: string | undefined = pageData?.secciones.servicios_vista_general.media.url;

  return (
    <div className="bg-[#FAF8F5] font-sans overflow-hidden">
      {/* FULL SCREEN HERO */}
      <section className="relative min-h-[90vh] md:min-h-screen flex items-center pt-[100px] md:pt-[120px] pb-20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={isRealImageUrl(heroData?.imagen_fondo?.valor) ? heroData.imagen_fondo.valor : "/fondo-hero.png"}
            alt="Fondo Hero ASOFRAIN"
            fill
            className="object-cover object-center"
            priority
            unoptimized
          />
        </div>
        {/* Overlay gradient for text legibility */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b md:bg-gradient-to-r from-[#0f1f16]/80 md:from-[#0f1f16]/90 via-[#0f1f16]/60 to-transparent pointer-events-none"></div>

        <div className="relative z-10 px-4 md:px-10 lg:px-[80px] w-full max-w-[1440px] mx-auto text-[#FAF8F5]">
          {/* Tagline / Chip */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FAF8F5] rounded-full text-[12px] md:text-[13px] font-semibold text-[#1a2e21] tracking-[0.5px] mb-6 md:mb-8 border border-[#1a2e21]/10 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5a8a4a]"></span>
            Servicio público de aprovechamiento
          </div>
          
          <h1 className="font-instrument font-normal text-[clamp(52px,9vw,110px)] leading-[0.92] tracking-[-0.03em] mb-6 md:mb-8 max-w-[900px] text-balance">
            {heroData ? (
              <HighlightText text={heroData.titulo.valor} highlightClassName="italic text-[#c8a875]" />
            ) : (
              <>Nuestro futuro no es <em className="italic text-[#c8a875]">desechable</em>,<br className="hidden md:block" /> actuemos ahora.</>
            )}
          </h1>
          
          <p className="text-[16px] md:text-[20px] leading-[1.6] max-w-[560px] mb-8 font-light text-[#FAF8F5]/85">
            {heroData ? heroData.descripcion.valor : "Recuperamos, transportamos y aprovechamos residuos sólidos en Suba, Engativá y Usaquén — devolviéndoles valor."}
          </p>
          
          <div className="flex gap-3 flex-wrap">
            <Link href={heroData ? heroData.cta.url : "/solicitar"} className="px-[24px] md:px-[32px] py-[14px] md:py-[18px] text-[15px] md:text-[16px] font-semibold bg-[#FAF8F5] text-[#1a2e21] rounded-xl md:rounded-xl inline-flex items-center gap-2.5 hover:-translate-y-0.5 transition-transform w-full sm:w-auto justify-center shadow-lg">
              {heroData ? heroData.cta.texto : "Solicitar servicio"}
            </Link>
          </div>
        </div>
      </section>

      {/* MÉTRICAS */}
      <section className="px-4 md:px-6 py-[60px] md:py-[80px]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-[60px] mb-10 md:mb-12 items-end">
            <div>
              <div className="text-[12px] tracking-widest text-[#3d5f38] font-semibold mb-4 uppercase">{pageData?.secciones.metricas.dato_breve.valor}</div>
              <h2 className="font-medium text-[clamp(40px,4.5vw,68px)] leading-[0.98] tracking-[-0.03em] m-0">
                <HighlightText text={pageData?.secciones.metricas.titulo_principal.valor || ""} />
              </h2>
            </div>
            <p className="text-[16px] leading-relaxed text-[#3d5f38] max-w-[480px] md:ml-auto mb-2">
              {pageData?.secciones.metricas.descripcion.valor}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr] gap-4">
            <div className="lg:row-span-2 bg-[#3d5f38] text-[#FAF8F5] rounded-[24px] md:rounded-[28px] p-8 md:p-10 min-h-[440px] flex flex-col justify-between relative overflow-hidden">
              <div>
                <div className="text-[11px] tracking-widest text-[#c8a875] font-semibold mb-5 uppercase">{pageData?.secciones.metricas.items[0].titulo.valor}</div>
                <div className="font-instrument font-normal text-[clamp(64px,9vw,132px)] leading-[0.9] tracking-[-0.04em]">{pageData?.secciones.metricas.items[0].numero.valor}</div>
                <div className="mt-4 text-[15px] text-[#FAF8F5]/75 max-w-[340px]">{pageData?.secciones.metricas.items[0].descripcion.texto.valor}</div>
              </div>
              <div className="flex items-end gap-1.5 md:gap-2 h-[90px] mt-8">
                <div className="flex-1 bg-[#c8a875]/25 rounded-md h-[24%]"></div>
                <div className="flex-1 bg-[#c8a875]/35 rounded-md h-[38%]"></div>
                <div className="flex-1 bg-[#c8a875]/45 rounded-md h-[52%]"></div>
                <div className="flex-1 bg-[#c8a875]/60 rounded-md h-[66%]"></div>
                <div className="flex-1 bg-[#c8a875]/72 rounded-md h-[78%]"></div>
                <div className="flex-1 bg-[#c8a875]/85 rounded-md h-[88%]"></div>
                <div className="flex-1 bg-[#c8a875] rounded-md h-[100%]"></div>
              </div>
            </div>

            <div className="bg-[#eae5d0] rounded-[24px] md:rounded-[28px] p-8 min-h-[212px] flex flex-col justify-between">
              <div className="text-[11px] tracking-widest text-[#3d5f38] font-semibold mb-6 uppercase">{pageData?.secciones.metricas.items[1].titulo.valor}</div>
              <div>
                <div className="font-instrument text-[72px] md:text-[90px] leading-[0.85] tracking-[-0.03em] text-[#3d5f38]">{pageData?.secciones.metricas.items[1].numero.valor}</div>
                <div className="mt-2 text-[14px] text-[#3d5f38]">{pageData?.secciones.metricas.items[1].descripcion.texto.valor}</div>
              </div>
            </div>
            
            <div className="bg-[#eae5d0] rounded-[24px] md:rounded-[28px] p-8 min-h-[212px] flex flex-col justify-between">
              <div className="text-[11px] tracking-widest text-[#3d5f38] font-semibold mb-6 uppercase">{pageData?.secciones.metricas.items[2].titulo.valor}</div>
              <div>
                <div className="font-instrument text-[72px] md:text-[90px] leading-[0.85] tracking-[-0.03em] text-[#3d5f38]">{pageData?.secciones.metricas.items[2].numero.valor}</div>
                <div className="mt-2 text-[14px] text-[#3d5f38]">{pageData?.secciones.metricas.items[2].descripcion.texto.valor}</div>
              </div>
            </div>
            
            <div className="bg-[#c8a875] rounded-[24px] md:rounded-[28px] p-7 md:col-span-2 flex flex-col md:flex-row md:items-center gap-4 md:gap-5">
              <div className="text-[11px] tracking-widest text-[#1a2e21] font-semibold uppercase">{pageData?.secciones.metricas.items[3].titulo.valor}</div>
              <div className="flex flex-wrap gap-2">
                {pageData?.secciones.metricas.items[3].descripcion.items.valor.map((eca: string) => (
                  <div key={eca} className="px-3.5 py-2 bg-[#FAF8F5] rounded-full text-[13px] font-medium text-[#3d5f38]">
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
          
          <div className="relative rounded-[24px] md:rounded-[28px] overflow-hidden min-h-[400px] md:min-h-[520px] bg-[#1a2e21]">
            <div className="absolute inset-0">
              {isVideoUrl(mediaUrl) ? (
                <video src={mediaUrl} className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted playsInline />
              ) : (
                <ImageSlot src={mediaUrl} placeholder="Video institucional (.mp4)" className="bg-[#1a2e21] text-[#FAF8F5]/40" />
              )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent from-40% to-[#1a2e21]/70 pointer-events-none"></div>
            <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8 text-[#FAF8F5] pointer-events-none">
              <div className="inline-flex items-center justify-center w-[50px] h-[50px] md:w-[60px] md:h-[60px] rounded-full bg-[#FAF8F5] border border-[#1a2e21]/10 shadow-sm mb-4 md:mb-5 pointer-events-auto cursor-pointer hover:bg-white transition-colors">
                <div className="w-0 h-0 border-l-[11px] md:border-l-[13px] border-l-[#1a2e21] border-y-[6px] md:border-y-[8px] border-y-transparent ml-1"></div>
              </div>
              <div className="text-[11px] tracking-widest text-[#c8a875] font-semibold mb-2.5 uppercase">— VIDEO INSTITUCIONAL</div>
              <h3 className="font-instrument font-normal text-[28px] md:text-[34px] leading-[1.05] m-0 tracking-[-0.01em]">
                <HighlightText text={pageData?.secciones.servicios_vista_general.titulo_media.valor || ""} />
              </h3>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="text-[12px] tracking-widest text-[#3d5f38] font-semibold uppercase mt-4 lg:mt-0">Nuestros servicios</div>
            <h3 className="font-medium text-[36px] md:text-[44px] leading-none m-0 mb-3 tracking-[-0.03em]">
              <HighlightText text={pageData?.secciones.servicios_vista_general.servicios.titulo.valor || ""} />
            </h3>
            
            {pageData?.secciones.servicios_vista_general.servicios.cards.slice(0, 4).map((srv: any) => (
              <Link key={srv.numero.valor} href="/servicios#descripcion" className="flex items-center justify-between p-5 md:p-6 bg-[#eae5d0] rounded-[20px] md:rounded-[22px] text-[#1a2e21] hover:bg-[#3d5f38] hover:text-[#FAF8F5] transition-colors group">
                <div>
                  <div className="text-[11px] tracking-widest text-[#3d5f38] group-hover:text-[#FAF8F5]/80 font-semibold mb-1 transition-colors">{srv.numero.valor}</div>
                  <div className="text-[15px] md:text-[17px] font-semibold pr-4">{srv.titulo.valor}</div>
                </div>
                <span className="text-[20px] md:text-[22px] shrink-0">→</span>
              </Link>
            ))}
            
            {pageData?.secciones.servicios_vista_general.servicios.cards[4] && (
              <Link href="/servicios#descripcion" className="flex items-center justify-between p-5 md:p-6 bg-[#c8a875] rounded-[20px] md:rounded-[22px] text-[#1a2e21] hover:bg-[#3d5f38] hover:text-[#c8a875] transition-colors group">
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
        <div className="max-w-[1400px] mx-auto px-6 md:px-[60px] py-[60px] md:py-[80px] bg-[#eae5d0] rounded-[24px] md:rounded-[32px] text-center">
          <div className="text-[11px] tracking-widest text-[#3d5f38] font-semibold mb-6 uppercase">{pageData?.secciones.frase.titulo_pequeno.valor}</div>
          <p className="font-instrument font-normal text-[clamp(32px,5vw,68px)] leading-[1.05] tracking-[-0.02em] mx-auto max-w-[1000px] text-balance text-[#1a2e21]">
            <HighlightText text={pageData?.secciones.frase.texto.valor || ""} />
          </p>
        </div>
      </section>
    </div>
  );
}
