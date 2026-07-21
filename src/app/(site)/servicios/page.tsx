import Link from "next/link";
import { ImageSlot } from "@/components/ImageSlot";
import { getEstructura } from "@/lib/data";
import { HighlightText } from "@/components/HighlightText";

export default async function ServiciosPage() {
  const data = await getEstructura();
  const pageData = data?.sitio.paginas.find((p: any) => p.id === "servicios");
  const s = pageData?.secciones;

  return (
    <div className="bg-[#1a2e21] text-[#FAF8F5] font-sans">
      {/* HERO */}
      <section className="relative min-h-[90vh] px-4 md:px-5 pt-[90px] md:pt-[110px] pb-4 md:pb-5 flex items-stretch">
        <div className="relative flex-1 rounded-[24px] overflow-hidden">
          <div className="absolute inset-0">
            <ImageSlot src={s?.hero.imagen_fondo.valor} placeholder="Hero Servicios: operación en ECA / compactación / camión selectivo" className="bg-[#1a2e21] text-[#FAF8F5]/40" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f1f16]/60 md:from-[#0f1f16]/45 from-0% via-[#0f1f16]/30 md:via-[#0f1f16]/15 via-50% to-[#0f1f16]/90 md:to-[#0f1f16]/85 pointer-events-none"></div>

          <div className="relative z-10 h-full flex flex-col md:grid md:grid-cols-[2fr_1fr] gap-8 md:gap-10 px-6 md:px-[80px] py-10 md:py-[80px] pointer-events-none md:items-end justify-center md:justify-end">
            <div>
              <div className="text-[11px] tracking-[3px] text-[#c8a875] font-semibold mb-4 md:mb-6 uppercase">— 03 · SERVICIOS</div>
              <h1 className="font-instrument font-normal text-[clamp(48px,11vw,152px)] leading-[0.9] tracking-[-0.03em] m-0 max-w-[900px]">
                <HighlightText text={s?.hero.titulo.valor || ""} highlightClassName="italic text-[#c8a875]" />
              </h1>
            </div>
            <div className="self-start border-t border-[#FAF8F5]/40 pt-5 pointer-events-auto mt-4 md:mt-0">
              <div className="text-[11px] tracking-[2px] text-[#c8a875] font-semibold mb-3.5 uppercase">003 — DESCRIPCIÓN</div>
              <p className="text-[14.5px] leading-[1.55] text-[#FAF8F5]/85 m-0 mb-5">
                {s?.hero.descripcion.valor}
              </p>
              <div className="border-b border-[#FAF8F5]/30 pb-3.5 mb-3.5"></div>
              <div className="text-[11px] tracking-[2px] text-[#FAF8F5]/60 font-semibold uppercase">DISPONIBLE EN 3 LOCALIDADES</div>
              <div className="mt-2 text-[15px] font-instrument">{s?.hero.descripcion_2.valor}</div>
            </div>
          </div>

          <div className="absolute bottom-6 md:bottom-9 left-6 md:left-[80px] z-10 inline-flex items-center gap-3.5 px-[20px] md:px-[22px] py-[12px] md:py-[14px] bg-[#FAF8F5] border border-[#1a2e21]/10 shadow-sm rounded-full text-[#1a2e21] text-[13px] font-semibold">
            <span className="w-[34px] md:w-[38px] h-[34px] md:h-[38px] rounded-full bg-[#c8a875] text-[#1a2e21] flex items-center justify-center text-[16px] shrink-0">↗</span>
            <Link href="#descripcion" className="text-[#1a2e21] hover:text-[#c8a875] transition-colors">Ver los 5 servicios</Link>
          </div>
        </div>
      </section>

      {/* DESCRIPCIÓN — cards */}
      <section id="descripcion" className="px-4 md:px-[60px] pt-[80px] md:pt-[140px] pb-[60px] md:pb-[100px] bg-[#1a2e21] scroll-mt-[100px]">
        <div className="max-w-[1360px] mx-auto">
          <div className="mb-10 md:mb-[60px]">
            <div className="text-[11px] tracking-[2.5px] text-[#c8a875] font-semibold mb-4 md:mb-5 uppercase">DESCRIPCIÓN DE SERVICIOS</div>
            <h2 className="font-instrument font-normal text-[clamp(44px,5.5vw,84px)] leading-[0.98] m-0 tracking-[-0.02em]">
              <HighlightText text={s?.servicios.titulo.valor || ""} highlightClassName="italic text-[#c8a875]" />
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-[60px] md:mb-[80px]">
            {s?.servicios.items.map((item: any, idx: number) => {
              const span = idx < 3 ? 2 : 3;
              return (
                <div key={item.id} className={`bg-[#FAF8F5]/5 border border-[#FAF8F5]/10 rounded-[20px] p-8 md:p-[36px_32px] min-h-[240px] md:min-h-[280px] flex flex-col justify-between ${span === 2 ? 'md:col-span-1 lg:col-span-2' : 'md:col-span-2 lg:col-span-3'}`}>
                  <div className="font-instrument text-[36px] text-[#c8a875] leading-none mb-6 md:mb-0">{String(idx + 1).padStart(2, '0')}</div>
                  <div>
                    <div className="text-[20px] md:text-[22px] font-semibold mb-2.5">{item.titulo.valor}</div>
                    <div className="text-[13.5px] md:text-[14px] text-[#FAF8F5]/70 leading-[1.55]">{item.descripcion.valor}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Compactación plus */}
          <div className="bg-[#c8a875] text-[#1a2e21] rounded-[24px] p-8 md:p-10 lg:p-[64px] relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-[60px] items-start">
              <div>
                <div className="text-[11px] tracking-[2.5px] font-bold mb-3 md:mb-4 uppercase">— {s?.servicio_destacado_plus.subtitulo_pequeno.valor}</div>
                <h3 className="font-instrument font-normal text-[44px] md:text-[56px] leading-[0.98] m-0 mb-4 md:mb-5 tracking-[-0.02em]">{s?.servicio_destacado_plus.titulo.valor}</h3>
                <p className="text-[15px] md:text-[16px] leading-[1.55] m-0 opacity-85">{s?.servicio_destacado_plus.descripcion.valor}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3">
                {s?.servicio_destacado_plus.items.map((item: any, idx: number) => (
                  <div key={item.id} className={`flex items-start gap-4 py-4 ${idx < 4 ? 'border-b border-[#1a2e21]/20' : 'sm:border-0 border-b border-[#1a2e21]/20'}`}>
                    <div className="font-instrument text-[24px] leading-none">{String(idx + 1).padStart(2, '0')}</div>
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
      <section id="rutas" className="px-4 md:px-[60px] py-[60px] md:py-[100px] bg-[#1a2e21] scroll-mt-[100px]">
        <div className="max-w-[1360px] mx-auto">
          <div className="flex justify-between items-start md:items-end mb-[40px] md:mb-[44px] flex-col md:flex-row gap-4 md:gap-5">
            <div>
              <div className="text-[11px] tracking-[2.5px] text-[#c8a875] font-semibold mb-3 md:mb-4 uppercase">RUTAS, LOCALIDADES Y HORARIOS</div>
              <h3 className="font-instrument font-normal text-[44px] md:text-[56px] leading-none m-0 tracking-[-0.02em]">
                <HighlightText text={s?.rutas_localidades_horarios.titulo.valor || ""} highlightClassName="italic text-[#c8a875]" />
              </h3>
            </div>
            <div className="text-[13px] text-[#FAF8F5]/65 max-w-[360px] md:text-right">
              {s?.rutas_localidades_horarios.descripcion.valor}
            </div>
          </div>

          <div className="border border-[#FAF8F5]/15 rounded-[20px] overflow-hidden">
            <div className="hidden md:grid grid-cols-[1fr_2fr_2fr_1fr] p-[20px_32px] bg-[#FAF8F5]/5 text-[11px] tracking-[2px] text-[#c8a875] font-semibold uppercase">
              <div>LOCALIDAD</div><div>DÍAS</div><div>HORARIO</div><div className="text-right">ESTADO</div>
            </div>
            {s?.rutas_localidades_horarios.tabla.filas.map((item: any, i: number) => (
              <div key={item.id} className={`grid grid-cols-2 md:grid-cols-[1fr_2fr_2fr_1fr] p-[20px_24px] md:p-[28px_32px] items-center gap-y-3 gap-x-4 md:gap-0 ${i > 0 ? 'border-t border-[#FAF8F5]/10' : 'md:border-t border-[#FAF8F5]/10'}`}>
                <div className="font-instrument text-[28px] md:text-[32px] col-span-2 md:col-span-1">{item.localidad.valor}</div>
                <div className="text-[14px] md:text-[15px]"><span className="md:hidden text-[11px] text-[#c8a875] block mb-1">DÍAS</span>{item.dias.valor}</div>
                <div className="text-[14px] md:text-[15px]"><span className="md:hidden text-[11px] text-[#c8a875] block mb-1">HORARIO</span>{item.horario.valor}</div>
                <div className="col-span-2 md:col-span-1 md:text-right mt-2 md:mt-0">
                  <span className="inline-block px-3.5 py-1.5 bg-[#5a8a4a]/25 text-[#a5c98e] rounded-full text-[12px] font-semibold">● {item.estado.valor}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTORES ATENDIDOS */}
      <section id="sectores" className="px-4 md:px-[60px] py-[60px] md:py-[100px] bg-[#1a2e21] scroll-mt-[100px]">
        <div className="max-w-[1360px] mx-auto">
          <div className="mb-[40px] md:mb-[44px]">
            <div className="text-[11px] tracking-[2.5px] text-[#c8a875] font-semibold mb-3 md:mb-4 uppercase">SECTORES ATENDIDOS</div>
            <h3 className="font-instrument font-normal text-[44px] md:text-[56px] leading-none m-0 tracking-[-0.02em]">
              <HighlightText text={s?.sectores_atendidos.titulo.valor || ""} highlightClassName="italic text-[#c8a875]" />
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {s?.sectores_atendidos.sectores.map((sector: any) => (
              <div key={sector.id} className="bg-[#FAF8F5]/5 border border-[#FAF8F5]/10 rounded-2xl p-6 md:p-[30px] flex items-center gap-4 md:gap-5">
                <div className="w-[48px] h-[48px] md:w-[52px] md:h-[52px] rounded-xl overflow-hidden shrink-0">
                  <ImageSlot src={sector.imagen.valor} placeholder="" className="bg-[#c8a875]/30 text-[#1a2e21]/50" />
                </div>
                <div>
                  <div className="text-[16px] md:text-[17px] font-semibold">{sector.titulo.valor}</div>
                  <div className="text-[12.5px] text-[#FAF8F5]/60 mt-0.5">{sector.descripcion.valor}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TARIFA Y PRODUCTOS */}
      <section id="tarifa" className="px-4 md:px-[60px] pt-[60px] md:pt-[100px] pb-[80px] md:pb-[140px] bg-[#1a2e21] scroll-mt-[100px]">
        <div className="max-w-[1360px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-[60px] items-start">
            <div>
              <div className="text-[11px] tracking-[2.5px] text-[#c8a875] font-semibold mb-4 md:mb-5 uppercase">TARIFA Y PRODUCTOS</div>
              <h3 className="font-instrument font-normal text-[44px] md:text-[56px] leading-none m-0 mb-5 md:mb-6 tracking-[-0.02em]">
                <HighlightText text={s?.tarifas_y_productos.titulo.valor || ""} highlightClassName="italic text-[#c8a875]" />
              </h3>
              <p className="text-[15.5px] md:text-[16px] leading-[1.6] text-[#FAF8F5]/80 m-0 mb-8 whitespace-pre-wrap">{s?.tarifas_y_productos.descripcion.valor}</p>
              <Link href={s?.tarifas_y_productos.cta.url || "#"} className="inline-flex items-center gap-2.5 px-[26px] py-[14px] bg-[#c8a875] text-[#1a2e21] rounded-full text-[14px] font-semibold hover:bg-[#FAF8F5] transition-colors w-full sm:w-auto justify-center">
                {s?.tarifas_y_productos.cta.texto}
              </Link>
            </div>

            <div className="bg-[#FAF8F5]/5 border border-[#FAF8F5]/15 rounded-[20px] p-8 md:p-10">
              <div className="text-[11px] tracking-[2px] text-[#c8a875] font-semibold mb-4 md:mb-5 uppercase">PRODUCTOS APROVECHADOS</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                {s?.tarifas_y_productos.productos_aprovechados.items.map((item: any, i: number, arr: any[]) => (
                  <div key={item.id} className={`py-3 text-[14.5px] md:text-[15px] ${i < arr.length - (arr.length % 2 === 0 ? 2 : 1) ? 'border-b border-[#FAF8F5]/10' : ''}`}>
                    {item.nombre.valor}
                  </div>
                ))}
              </div>
              <div className="mt-7 p-4 bg-[#c8a875]/15 border border-[#c8a875]/30 rounded-xl text-[12.5px] md:text-[13px] text-[#c8a875] leading-relaxed">
                Consulta el marco tarifario ilustrado y la lista completa de materiales desde la sección de Normatividad.
              </div>
            </div>
          </div>

          <div className="mt-[60px] md:mt-[80px] p-8 md:p-[60px] bg-[#FAF8F5]/5 border border-[#FAF8F5]/10 rounded-[24px] grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-6 md:gap-10 items-center text-center md:text-left">
            <div className="w-[70px] md:w-[80px] h-[70px] md:h-[80px] rounded-full bg-[#c8a875] flex items-center justify-center font-instrument text-[36px] md:text-[44px] text-[#1a2e21] mx-auto md:mx-0 shrink-0">
              $
            </div>
            <div>
              <div className="font-instrument text-[28px] md:text-[32px] tracking-[-0.01em] leading-tight mb-2 md:mb-0">{s?.cta_final.titulo.valor}</div>
              <div className="mt-1 md:mt-2 text-[14px] md:text-[14.5px] text-[#FAF8F5]/70 max-w-[400px] mx-auto md:mx-0">{s?.cta_final.descripcion.valor}</div>
            </div>
            <Link href={s?.cta_final.boton.url || "#"} className="px-[26px] md:px-[28px] py-[14px] md:py-[16px] bg-[#c8a875] text-[#1a2e21] rounded-full text-[14px] font-semibold flex items-center justify-center gap-2.5 hover:bg-[#FAF8F5] transition-colors mt-2 md:mt-0 w-full sm:w-auto">
              {s?.cta_final.boton.texto}
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
