import Link from "next/link";
import Image from "next/image";
import { ImageSlot, isRealImageUrl } from "@/components/ImageSlot";
import { getEstructura } from "@/lib/data";
import { HighlightText } from "@/components/HighlightText";

const HERO_MARGIN = "px-6 md:px-12 lg:px-[100px]";

export default async function ServiciosPage() {
  const data = await getEstructura();
  const pageData = data?.sitio.paginas.find((p: any) => p.id === "servicios");
  const s = pageData?.secciones;

  return (
    <div className="bg-white font-sans">
      {/* HERO */}
      <section className="relative min-h-[100svh] flex flex-col overflow-hidden bg-[#0d2b24]">
        {isRealImageUrl(s?.hero.imagen_fondo?.valor) ? (
          <Image
            src={s.hero.imagen_fondo.valor}
            alt="ASOFRAIN — Servicios"
            fill
            priority
            unoptimized
            className="object-cover object-center"
          />
        ) : (
          <div className="absolute inset-0"><ImageSlot placeholder="Hero Servicios: operación en ECA / compactación / camión selectivo" className="bg-[#0d2b24] text-white/30" /></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 md:from-black/50 via-transparent to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 bg-[#62AF9D] mix-blend-color opacity-25 pointer-events-none"></div>
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.045] mix-blend-overlay" aria-hidden>
          <filter id="grain-servicios">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain-servicios)" />
        </svg>

        <div className={`relative z-10 flex-1 flex flex-col justify-end ${HERO_MARGIN} pt-[90px] pb-[100px] max-w-[1600px] mx-auto w-full text-white`}>
          <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-10">
            <div className="md:flex-[2]">
              <div className="text-[11px] tracking-[3px] text-[#62AF9D] font-semibold mb-4 md:mb-6 uppercase">— 03 · SERVICIOS</div>
              <h1 className="font-display font-semibold text-[clamp(36px,7vw,88px)] leading-[1.02] tracking-[-0.02em] m-0 max-w-[820px]">
                <HighlightText text={s?.hero.titulo.valor || ""} highlightClassName="font-display font-semibold not-italic text-white" />
              </h1>
            </div>
            <div className="md:flex-1 self-start border-t border-white/30 pt-5 mt-4 md:mt-0">
              <div className="text-[11px] tracking-[2px] text-[#62AF9D] font-semibold mb-3.5 uppercase">003 — DESCRIPCIÓN</div>
              <p className="text-[14.5px] leading-[1.55] text-white/85 m-0 mb-5">
                {s?.hero.descripcion.valor}
              </p>
              <div className="border-b border-white/25 pb-3.5 mb-3.5"></div>
              <div className="text-[11px] tracking-[2px] text-white/60 font-semibold uppercase">DISPONIBLE EN 3 LOCALIDADES</div>
              <div className="mt-2 text-[15px] font-display font-medium">{s?.hero.descripcion_2.valor}</div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 md:bottom-9 left-6 md:left-[100px] z-10 inline-flex items-center gap-3.5 px-[20px] md:px-[22px] py-[12px] md:py-[14px] bg-white shadow-sm rounded-full text-[#111111] text-[13px] font-semibold">
          <span className="w-[34px] md:w-[38px] h-[34px] md:h-[38px] rounded-full bg-[#62AF9D] text-[#111111] flex items-center justify-center text-[16px] shrink-0">↗</span>
          <Link href="#descripcion" className="text-[#111111] hover:text-[#62AF9D] transition-colors">Ver los 5 servicios</Link>
        </div>
      </section>

      {/* DESCRIPCIÓN — cards */}
      <section id="descripcion" className="px-4 md:px-[60px] pt-[80px] md:pt-[140px] pb-[60px] md:pb-[100px] bg-white scroll-mt-[100px]">
        <div className="max-w-[1360px] mx-auto">
          <div className="mb-10 md:mb-[60px]">
            <div className="text-[11px] tracking-[2.5px] text-[#62AF9D] font-semibold mb-4 md:mb-5 uppercase">DESCRIPCIÓN DE SERVICIOS</div>
            <h2 className="font-display font-semibold text-[clamp(36px,5.5vw,64px)] leading-[1.05] m-0 tracking-[-0.02em] text-[#111111]">
              <HighlightText text={s?.servicios.titulo.valor || ""} />
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-[60px] md:mb-[80px]">
            {s?.servicios.items.map((item: any, idx: number) => {
              const span = idx < 3 ? 2 : 3;
              return (
                <div key={item.id} className={`bg-white border border-black/[0.08] rounded-[20px] p-8 md:p-[36px_32px] min-h-[240px] md:min-h-[280px] flex flex-col justify-between ${span === 2 ? 'md:col-span-1 lg:col-span-2' : 'md:col-span-2 lg:col-span-3'}`}>
                  <div className="font-display font-semibold text-[32px] text-[#62AF9D] leading-none mb-6 md:mb-0">{String(idx + 1).padStart(2, '0')}</div>
                  <div>
                    <div className="text-[20px] md:text-[22px] font-semibold mb-2.5 text-[#111111]">{item.titulo.valor}</div>
                    <div className="text-[13.5px] md:text-[14px] text-[#4b5563] leading-[1.55]">{item.descripcion.valor}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Compactación plus */}
          <div className="bg-[#62AF9D] text-[#111111] rounded-[24px] p-8 md:p-10 lg:p-[64px] relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-[60px] items-start">
              <div>
                <div className="text-[11px] tracking-[2.5px] font-bold mb-3 md:mb-4 uppercase">— {s?.servicio_destacado_plus.subtitulo_pequeno.valor}</div>
                <h3 className="font-display font-semibold text-[36px] md:text-[48px] leading-[1.05] m-0 mb-4 md:mb-5 tracking-[-0.02em]">{s?.servicio_destacado_plus.titulo.valor}</h3>
                <p className="text-[15px] md:text-[16px] leading-[1.55] m-0 opacity-80">{s?.servicio_destacado_plus.descripcion.valor}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3">
                {s?.servicio_destacado_plus.items.map((item: any, idx: number) => (
                  <div key={item.id} className={`flex items-start gap-4 py-4 ${idx < 4 ? 'border-b border-[#111111]/15' : 'sm:border-0 border-b border-[#111111]/15'}`}>
                    <div className="font-display font-semibold text-[22px] leading-none">{String(idx + 1).padStart(2, '0')}</div>
                    <div>
                      <div className="text-[15.5px] md:text-[16px] font-semibold mb-1">{item.titulo.valor}</div>
                      <div className="text-[13px] opacity-70">{item.descripcion.valor}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RUTAS Y HORARIOS */}
      <section id="rutas" className="px-4 md:px-[60px] py-[60px] md:py-[100px] bg-white scroll-mt-[100px]">
        <div className="max-w-[1360px] mx-auto">
          <div className="flex justify-between items-start md:items-end mb-[40px] md:mb-[44px] flex-col md:flex-row gap-4 md:gap-5">
            <div>
              <div className="text-[11px] tracking-[2.5px] text-[#62AF9D] font-semibold mb-3 md:mb-4 uppercase">RUTAS, LOCALIDADES Y HORARIOS</div>
              <h3 className="font-display font-semibold text-[36px] md:text-[48px] leading-none m-0 tracking-[-0.02em] text-[#111111]">
                <HighlightText text={s?.rutas_localidades_horarios.titulo.valor || ""} />
              </h3>
            </div>
            <div className="text-[13px] text-[#4b5563] max-w-[360px] md:text-right">
              {s?.rutas_localidades_horarios.descripcion.valor}
            </div>
          </div>

          <div className="border border-black/[0.08] rounded-[20px] overflow-hidden">
            <div className="hidden md:grid grid-cols-[1fr_2fr_2fr_1fr] p-[20px_32px] bg-white text-[11px] tracking-[2px] text-[#62AF9D] font-semibold uppercase border-b border-black/[0.08]">
              <div>LOCALIDAD</div><div>DÍAS</div><div>HORARIO</div><div className="text-right">ESTADO</div>
            </div>
            {s?.rutas_localidades_horarios.tabla.filas.map((item: any, i: number) => (
              <div key={item.id} className={`grid grid-cols-2 md:grid-cols-[1fr_2fr_2fr_1fr] p-[20px_24px] md:p-[28px_32px] items-center gap-y-3 gap-x-4 md:gap-0 text-[#111111] ${i > 0 ? 'border-t border-black/[0.08]' : 'md:border-t border-black/[0.08]'}`}>
                <div className="font-display font-semibold text-[26px] md:text-[30px] col-span-2 md:col-span-1">{item.localidad.valor}</div>
                <div className="text-[14px] md:text-[15px]"><span className="md:hidden text-[11px] text-[#62AF9D] block mb-1">DÍAS</span>{item.dias.valor}</div>
                <div className="text-[14px] md:text-[15px]"><span className="md:hidden text-[11px] text-[#62AF9D] block mb-1">HORARIO</span>{item.horario.valor}</div>
                <div className="col-span-2 md:col-span-1 md:text-right mt-2 md:mt-0">
                  <span className="inline-block px-3.5 py-1.5 bg-[#62AF9D]/15 text-[#3d7a6d] rounded-full text-[12px] font-semibold">● {item.estado.valor}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTORES ATENDIDOS */}
      <section id="sectores" className="px-4 md:px-[60px] py-[60px] md:py-[100px] bg-white scroll-mt-[100px]">
        <div className="max-w-[1360px] mx-auto">
          <div className="mb-[40px] md:mb-[44px]">
            <div className="text-[11px] tracking-[2.5px] text-[#62AF9D] font-semibold mb-3 md:mb-4 uppercase">SECTORES ATENDIDOS</div>
            <h3 className="font-display font-semibold text-[36px] md:text-[48px] leading-none m-0 tracking-[-0.02em] text-[#111111]">
              <HighlightText text={s?.sectores_atendidos.titulo.valor || ""} />
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {s?.sectores_atendidos.sectores.map((sector: any) => (
              <div key={sector.id} className="bg-white border border-black/[0.08] rounded-2xl p-6 md:p-[30px] flex items-center gap-4 md:gap-5">
                <div className="w-[48px] h-[48px] md:w-[52px] md:h-[52px] rounded-xl overflow-hidden shrink-0">
                  <ImageSlot src={sector.imagen.valor} placeholder="" className="bg-[#62AF9D]/20 text-[#111111]/40" />
                </div>
                <div>
                  <div className="text-[16px] md:text-[17px] font-semibold text-[#111111]">{sector.titulo.valor}</div>
                  <div className="text-[12.5px] text-[#4b5563] mt-0.5">{sector.descripcion.valor}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TARIFA Y PRODUCTOS */}
      <section id="tarifa" className="px-4 md:px-[60px] pt-[60px] md:pt-[100px] pb-[80px] md:pb-[100px] bg-white scroll-mt-[100px]">
        <div className="max-w-[1360px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-[60px] items-start">
            <div>
              <div className="text-[11px] tracking-[2.5px] text-[#62AF9D] font-semibold mb-4 md:mb-5 uppercase">TARIFA Y PRODUCTOS</div>
              <h3 className="font-display font-semibold text-[36px] md:text-[48px] leading-none m-0 mb-5 md:mb-6 tracking-[-0.02em] text-[#111111]">
                <HighlightText text={s?.tarifas_y_productos.titulo.valor || ""} />
              </h3>
              <p className="text-[15.5px] md:text-[16px] leading-[1.6] text-[#4b5563] m-0 mb-8 whitespace-pre-wrap">{s?.tarifas_y_productos.descripcion.valor}</p>
              <Link href={s?.tarifas_y_productos.cta.url || "#"} className="inline-flex items-center gap-2.5 px-[26px] py-[14px] bg-[#111111] text-white rounded-full text-[14px] font-semibold hover:bg-[#62AF9D] hover:text-[#111111] transition-colors w-full sm:w-auto justify-center">
                {s?.tarifas_y_productos.cta.texto}
              </Link>
            </div>

            <div className="bg-white border border-black/[0.08] rounded-[20px] p-8 md:p-10">
              <div className="text-[11px] tracking-[2px] text-[#62AF9D] font-semibold mb-4 md:mb-5 uppercase">PRODUCTOS APROVECHADOS</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                {s?.tarifas_y_productos.productos_aprovechados.items.map((item: any, i: number, arr: any[]) => (
                  <div key={item.id} className={`py-3 text-[14.5px] md:text-[15px] text-[#111111] ${i < arr.length - (arr.length % 2 === 0 ? 2 : 1) ? 'border-b border-black/[0.08]' : ''}`}>
                    {item.nombre.valor}
                  </div>
                ))}
              </div>
              <div className="mt-7 p-4 bg-[#62AF9D]/12 border border-[#62AF9D]/30 rounded-xl text-[12.5px] md:text-[13px] text-[#3d7a6d] leading-relaxed">
                Consulta el marco tarifario ilustrado y la lista completa de materiales desde la sección de Normatividad.
              </div>
            </div>
          </div>

          <div className="mt-[60px] md:mt-[80px] p-8 md:p-[60px] bg-[#62AF9D] rounded-[24px] grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-6 md:gap-10 items-center text-center md:text-left text-[#111111]">
            <div className="w-[70px] md:w-[80px] h-[70px] md:h-[80px] rounded-full bg-white flex items-center justify-center font-display font-semibold text-[32px] md:text-[40px] text-[#111111] mx-auto md:mx-0 shrink-0">
              $
            </div>
            <div>
              <div className="font-display font-semibold text-[26px] md:text-[30px] tracking-[-0.01em] leading-tight mb-2 md:mb-0">{s?.cta_final.titulo.valor}</div>
              <div className="mt-1 md:mt-2 text-[14px] md:text-[14.5px] text-[#111111]/70 max-w-[400px] mx-auto md:mx-0">{s?.cta_final.descripcion.valor}</div>
            </div>
            <Link href={s?.cta_final.boton.url || "#"} className="px-[26px] md:px-[28px] py-[14px] md:py-[16px] bg-[#111111] text-white rounded-full text-[14px] font-semibold flex items-center justify-center gap-2.5 hover:bg-white hover:text-[#111111] transition-colors mt-2 md:mt-0 w-full sm:w-auto">
              {s?.cta_final.boton.texto}
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
