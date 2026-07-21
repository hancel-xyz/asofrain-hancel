import Link from "next/link";
import { ImageSlot, isRealImageUrl } from "@/components/ImageSlot";
import { getEstructura } from "@/lib/data";
import { HighlightText } from "@/components/HighlightText";

export default async function NosotrosPage() {
  const data = await getEstructura();
  const pageData = data?.sitio.paginas.find((p: any) => p.id === "nosotros");

  return (
    <div className="bg-[#FAF8F5] font-sans">
      {/* HERO */}
      <section className="relative min-h-[90vh] px-4 md:px-5 pt-[90px] md:pt-[110px] pb-4 md:pb-5 flex items-stretch">
        <div className="relative flex-1 rounded-[24px] overflow-hidden">
          <div className="absolute inset-0">
            <ImageSlot src={pageData?.secciones.hero.imagen_fondo.valor} placeholder="Hero Nosotros: retrato de recuperadores ambientales / bodega" className="bg-[#1a2e21] text-[#FAF8F5]/40" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f1f16]/85 from-0% via-[#0f1f16]/75 md:via-[#0f1f16]/55 via-45% to-[#0f1f16]/40 md:to-[#0f1f16]/20 pointer-events-none"></div>

          <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-[80px] py-10 md:py-[60px] text-[#FAF8F5] pointer-events-none max-w-[1400px]">
            <div className="text-[11px] tracking-[3px] text-[#c8a875] font-semibold mb-4 md:mb-6 uppercase">— 02 · NOSOTROS</div>
            <h1 className="font-instrument font-normal text-[clamp(48px,11vw,148px)] leading-[0.92] tracking-[-0.03em] mb-5 md:mb-7 max-w-[1000px] m-0">
              <HighlightText text={pageData?.secciones.hero.titulo.valor || ""} highlightClassName="italic text-[#c8a875]" />
            </h1>
            <p className="text-[16px] md:text-[18px] leading-[1.55] text-[#FAF8F5]/85 max-w-[560px] mb-8 font-light m-0">
              {pageData?.secciones.hero.descripcion.valor}
            </p>
            <div className="pointer-events-auto flex flex-wrap gap-3">
              {pageData?.secciones.hero.cta_1?.texto && (
                <Link href={pageData.secciones.hero.cta_1.url || "#"} className="px-[22px] md:px-[26px] py-[12px] md:py-[14px] bg-[#FAF8F5] text-[#1a2e21] rounded-full text-[13.5px] md:text-[14px] font-semibold flex items-center gap-2.5 hover:-translate-y-0.5 transition-transform">
                  {pageData.secciones.hero.cta_1.texto} <span className="text-[18px]">→</span>
                </Link>
              )}
              {pageData?.secciones.hero.cta_2?.texto && (
                <Link href={pageData.secciones.hero.cta_2.url || "#"} className="px-[22px] md:px-[26px] py-[12px] md:py-[14px] bg-[#FAF8F5] text-[#1a2e21] border border-[#1a2e21]/10 shadow-sm rounded-full text-[13.5px] md:text-[14px] font-semibold hover:bg-white transition-colors">
                  {pageData.secciones.hero.cta_2.texto}
                </Link>
              )}
            </div>
          </div>

          <div className="absolute bottom-6 md:bottom-9 left-6 right-6 md:left-auto md:right-[60px] z-10 text-[#FAF8F5]/70 font-instrument text-[20px] md:text-[22px] italic md:text-right max-w-[400px] leading-[1.3]">
            "Detrás de cada tonelada aprovechada, un oficio digno."
          </div>
        </div>
      </section>

      {/* QUIÉNES SOMOS */}
      <section id="quienes-somos" className="px-4 md:px-[60px] pt-[80px] md:pt-[140px] pb-[60px] md:pb-[100px] bg-[#FAF8F5] scroll-mt-[100px]">
        <div className="max-w-[1360px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 md:gap-[80px] items-start">
            <div>
              <div className="text-[11px] tracking-[2.5px] text-[#3d5f38] font-semibold mb-4 md:mb-5 uppercase">QUIÉNES SOMOS</div>
              <h2 className="font-instrument font-normal text-[clamp(44px,5.5vw,84px)] leading-[0.98] m-0 tracking-[-0.02em]">
                <HighlightText text={pageData?.secciones.quienes_somos.titulo.valor || ""} />
              </h2>
            </div>
            <div className="text-[16px] md:text-[17px] leading-[1.65] text-[#1a2e21] whitespace-pre-wrap">
              {pageData?.secciones.quienes_somos.descripcion.valor}
            </div>
          </div>
        </div>
      </section>

      {/* HISTORIA */}
      <section id="historia" className="px-4 md:px-[60px] py-[60px] md:py-[100px] bg-[#FAF8F5] scroll-mt-[100px]">
        <div className="max-w-[1360px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 md:gap-[80px] items-start">
            <div>
              <div className="text-[11px] tracking-[2.5px] text-[#3d5f38] font-semibold mb-4 md:mb-5 uppercase">HISTORIA</div>
              <h3 className="font-instrument font-normal text-[44px] md:text-[56px] leading-none m-0 tracking-[-0.02em]">
                <HighlightText text={pageData?.secciones.historia.titulo.valor || ""} />
              </h3>
            </div>
            <div className="flex flex-col">
              {pageData?.secciones.historia.filas.map((item: any, idx: number) => {
                const isLast = idx === pageData.secciones.historia.filas.length - 1;
                const color = isLast ? '#5a8a4a' : '#c8a875';
                return (
                  <div key={idx} className={`grid grid-cols-1 sm:grid-cols-[130px_1fr] gap-4 sm:gap-[30px] py-[28px] ${!isLast ? 'border-b border-[#1a2e21]/10' : ''}`}>
                    <div className={`font-instrument text-[52px] leading-none`} style={{ color }}>{item.ano.valor}</div>
                    <div>
                      <div className="text-[17px] md:text-[18px] font-semibold mb-1.5">{item.titulo.valor}</div>
                      <div className="text-[14px] md:text-[14.5px] text-[#3d5f38] leading-[1.55]">{item.descripcion.valor}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* MISIÓN Y VISIÓN */}
      <section id="mision-vision" className="px-4 md:px-[60px] py-[60px] md:py-[100px] bg-[#FAF8F5] scroll-mt-[100px]">
        <div className="max-w-[1360px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            <div className="bg-[#eae5d0] rounded-[24px] px-8 md:px-12 py-10 md:py-[52px] min-h-[300px] md:min-h-[400px] flex flex-col justify-between">
              <div className="text-[11px] tracking-[2.5px] text-[#3d5f38] font-semibold uppercase">MISIÓN</div>
              <p className="font-instrument font-normal text-[28px] md:text-[36px] leading-[1.15] mt-8 md:mt-6 mb-0 tracking-[-0.01em] whitespace-pre-wrap">
                {pageData?.secciones.mision.descripcion.valor}
              </p>
            </div>
            <div className="bg-[#1a2e21] text-[#FAF8F5] rounded-[24px] px-8 md:px-12 py-10 md:py-[52px] min-h-[300px] md:min-h-[400px] flex flex-col justify-between relative overflow-hidden">
              <div className="text-[11px] tracking-[2.5px] text-[#c8a875] font-semibold relative z-10 uppercase">VISIÓN · 2035</div>
              <p className="font-instrument font-normal text-[28px] md:text-[36px] leading-[1.15] mt-8 md:mt-6 mb-0 tracking-[-0.01em] relative z-10 whitespace-pre-wrap">
                {pageData?.secciones.vision.descripcion.valor}
              </p>
              <div className="absolute -right-[60px] -bottom-[60px] w-[250px] md:w-[320px] h-[250px] md:h-[320px] rounded-full bg-[radial-gradient(circle,rgba(200,168,117,0.2)_0%,transparent_70%)]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* VALORES */}
      <section id="valores" className="px-4 md:px-[60px] py-[60px] md:py-[100px] bg-[#FAF8F5] scroll-mt-[100px]">
        <div className="max-w-[1360px] mx-auto">
          <div className="mb-10 md:mb-[50px]">
            <div className="text-[11px] tracking-[2.5px] text-[#3d5f38] font-semibold mb-3 md:mb-4 uppercase">VALORES INSTITUCIONALES</div>
            <h3 className="font-instrument font-normal text-[44px] md:text-[56px] leading-none m-0 tracking-[-0.02em]">
              <HighlightText text={pageData?.secciones.valores.titulo.valor || ""} />
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-[#1a2e21]/10">
            {pageData?.secciones.valores.cuadros.map((v: any, idx: number) => {
              const isHighlight = idx === pageData.secciones.valores.cuadros.length - 1;
              return (
                <div key={v.numero.valor} className={`p-6 md:p-8 pb-8 md:pb-9 border-r border-b border-[#1a2e21]/10 ${isHighlight ? 'bg-[#c8a875]' : ''}`}>
                  <div className={`font-instrument text-[36px] leading-none ${isHighlight ? 'text-[#1a2e21]' : 'text-[#c8a875]'}`}>0{v.numero.valor}</div>
                  <div className={`mt-5 md:mt-6 text-[17px] md:text-[18px] font-semibold ${isHighlight ? 'text-[#1a2e21]' : 'text-[#1a2e21]'}`}>{v.titulo.valor}</div>
                  <div className={`mt-2 text-[13.5px] leading-[1.55] ${isHighlight ? 'text-[#1a2e21]/75' : 'text-[#3d5f38]'}`}>{v.descripcion.valor}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* OBJETO SOCIAL / AMBIENTAL */}
      <section className="px-4 md:px-[60px] py-[60px] md:py-[100px] bg-[#FAF8F5]">
        <div className="max-w-[1360px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-[80px] py-10 md:py-[60px] border-y border-[#1a2e21]/10">
            <div>
              <div className="text-[11px] tracking-[2.5px] text-[#3d5f38] font-semibold mb-4 md:mb-5 uppercase">OBJETO SOCIAL</div>
              <h3 className="font-instrument font-normal text-[36px] md:text-[40px] leading-[1.05] m-0 mb-4 md:mb-5 tracking-[-0.01em]">
                <HighlightText text={pageData?.secciones.objeto_social.titulo.valor || ""} />
              </h3>
              <p className="text-[15.5px] md:text-[16px] leading-[1.65] text-[#3d5f38] m-0 whitespace-pre-wrap">{pageData?.secciones.objeto_social.descripcion.valor}</p>
            </div>
            <div>
              <div className="text-[11px] tracking-[2.5px] text-[#3d5f38] font-semibold mb-4 md:mb-5 uppercase">OBJETO AMBIENTAL</div>
              <h3 className="font-instrument font-normal text-[36px] md:text-[40px] leading-[1.05] m-0 mb-4 md:mb-5 tracking-[-0.01em]">
                <HighlightText text={pageData?.secciones.objeto_ambiental.titulo.valor || ""} />
              </h3>
              <p className="text-[15.5px] md:text-[16px] leading-[1.65] text-[#3d5f38] m-0 whitespace-pre-wrap">{pageData?.secciones.objeto_ambiental.descripcion.valor}</p>
            </div>
          </div>
          <div className="py-[60px] text-center">
            <div className="text-[11px] tracking-[2.5px] text-[#3d5f38] font-semibold mb-4 md:mb-6 uppercase">{pageData?.secciones.frase_1.titulo_pequeno.valor}</div>
            <p className="font-instrument font-normal text-[32px] md:text-[44px] leading-[1.15] m-0 mx-auto max-w-[900px] tracking-[-0.01em]">
              <HighlightText text={pageData?.secciones.frase_1.texto.valor || ""} />
            </p>
          </div>
        </div>
      </section>

      {/* ENTIDADES */}
      <section id="entidades" className="px-4 md:px-[60px] pt-[60px] md:pt-[120px] pb-[80px] md:pb-[140px] bg-[#FAF8F5] scroll-mt-[100px]">
        <div className="max-w-[1360px] mx-auto">
          <div className="flex justify-between items-start md:items-end mb-[40px] md:mb-[50px] flex-col md:flex-row gap-5">
            <div>
              <div className="text-[11px] tracking-[2.5px] text-[#3d5f38] font-semibold mb-3 md:mb-4 uppercase">ENTIDADES ALIADAS</div>
              <h3 className="font-instrument font-normal text-[44px] md:text-[56px] leading-none m-0 tracking-[-0.02em]">
                <HighlightText text={pageData?.secciones.entidades_aliadas.titulo.valor || ""} />
              </h3>
            </div>
            <div className="text-[14px] text-[#3d5f38] max-w-[360px]">Alineados con las entidades regulatorias, de vigilancia y de política pública del sector.</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pageData?.secciones.entidades_aliadas.aliados.slice(0, pageData.secciones.entidades_aliadas.aliados.length - 1).map((e: any) => (
              <div key={e.id} className="bg-[#eae5d0] rounded-[18px] p-[36px_30px] min-h-[200px] flex flex-col justify-between">
                <div className="w-14 h-14 rounded-xl bg-[#FAF8F5] overflow-hidden flex items-center justify-center font-instrument text-[26px] text-[#1a2e21]">
                  {isRealImageUrl(e.logo.valor) ? (
                    <ImageSlot src={e.logo.valor} placeholder={e.titulo.valor} />
                  ) : (
                    e.titulo.valor.charAt(0)
                  )}
                </div>
                <div>
                  <div className="text-[11px] tracking-[1.5px] text-[#3d5f38] font-semibold">{e.titulo.valor}</div>
                  <div className="mt-1.5 text-[15px] font-semibold">{e.descripcion.valor}</div>
                </div>
              </div>
            ))}
            {pageData?.secciones.entidades_aliadas.aliados.length > 0 && (
              <div className="bg-[#1a2e21] text-[#FAF8F5] rounded-[18px] p-[30px] md:p-[36px_30px] min-h-[200px] flex flex-col justify-between md:col-span-2 lg:col-span-3">
                <div className="w-14 h-14 rounded-xl bg-[#c8a875] overflow-hidden flex items-center justify-center font-instrument text-[26px] text-[#1a2e21] mb-6 md:mb-0">
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
                    <div className="text-[11px] tracking-[1.5px] text-[#c8a875] font-semibold">{pageData.secciones.entidades_aliadas.aliados[pageData.secciones.entidades_aliadas.aliados.length - 1].titulo.valor}</div>
                  </div>
                  <div className="text-[13.5px] text-[#FAF8F5]/70 max-w-[420px] whitespace-pre-wrap">{pageData.secciones.entidades_aliadas.aliados[pageData.secciones.entidades_aliadas.aliados.length - 1].descripcion.valor}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
