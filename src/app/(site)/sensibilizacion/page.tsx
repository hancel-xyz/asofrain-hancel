import { ImageSlot } from "@/components/ImageSlot";
import { getEstructura } from "@/lib/data";
import { HighlightText } from "@/components/HighlightText";

export default async function SensibilizacionPage() {
  const data = await getEstructura();
  const pageData = data?.sitio.paginas.find((p: any) => p.id === "sensibilizacion");
  const s = pageData?.secciones;

  const cardStyles = [
    { wrapper: "bg-[#FAF8F5] border border-[#1a2e21]/5 shadow-sm", eyebrow: "text-[#3d5f38]", list: "text-[#3d5f38]", img: "bg-[#c8a875]/20 text-[#1a2e21]/40" },
    { wrapper: "bg-[#FAF8F5] border border-[#1a2e21]/5 shadow-sm", eyebrow: "text-[#3d5f38]", list: "text-[#3d5f38]", img: "bg-[#5a8a4a]/20 text-[#1a2e21]/40" },
    { wrapper: "bg-[#1a2e21] text-[#FAF8F5]", eyebrow: "text-[#c8a875]", list: "text-[#FAF8F5]/85", img: "bg-[#FAF8F5]/10 text-[#FAF8F5]/40" },
  ];

  return (
    <div className="bg-[#FAF8F5] font-sans">
      {/* ENCABEZADO */}
      <section className="px-4 md:px-[60px] pt-[130px] md:pt-[160px] pb-[60px] md:pb-[100px] bg-[#FAF8F5]">
        <div className="max-w-[1360px] mx-auto">
          <div className="flex justify-between items-start md:items-end mb-[10px] gap-5 md:gap-[60px] flex-col md:flex-row flex-wrap">
            <div>
              <div className="text-[11px] tracking-[2.5px] text-[#3d5f38] font-semibold mb-3 md:mb-5 uppercase">— SENSIBILIZACIÓN</div>
              <h1 className="font-instrument font-normal text-[clamp(44px,7vw,84px)] leading-[0.98] m-0 tracking-[-0.02em] max-w-[900px]">
                <HighlightText text={s?.encabezado.titulo.valor || ""} highlightClassName="italic text-[#5a8a4a]" />
              </h1>
            </div>
            <p className="text-[15px] md:text-[16px] leading-[1.6] text-[#3d5f38] max-w-[400px]">{s?.encabezado.descripcion.valor}</p>
          </div>
        </div>
      </section>

      {/* TIPOS DE SENSIBILIZACIÓN */}
      <section id="campanas" className="px-4 md:px-[60px] pb-[60px] md:pb-[100px] bg-[#FAF8F5] scroll-mt-[100px]">
        <div className="max-w-[1360px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {s?.tipos_sensibilizacion.tipos.map((tipo: any, idx: number) => {
              const style = cardStyles[idx % cardStyles.length];
              return (
                <div key={tipo.id} className={`rounded-[24px] p-6 md:p-[36px_32px] md:min-h-[520px] flex flex-col ${style.wrapper}`}>
                  <div className="h-[200px] rounded-[14px] overflow-hidden mb-5 md:mb-6 relative">
                    <ImageSlot src={tipo.imagen.valor} placeholder={tipo.titulo.valor} className={style.img} />
                  </div>
                  <div className={`text-[11px] tracking-[2px] font-semibold mb-2 md:mb-2.5 uppercase ${style.eyebrow}`}>{tipo.tipo.valor}</div>
                  <div className="font-instrument text-[28px] md:text-[32px] leading-[1.05] mb-4 tracking-[-0.01em]">{tipo.titulo.valor}</div>
                  <ul className={`m-0 pl-[18px] text-[13.5px] md:text-[14px] leading-[1.75] list-disc ${style.list}`}>
                    {tipo.vinetas.items.map((vineta: any) => (
                      <li key={vineta.id}>{vineta.valor}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* GALERÍA */}
      <section className="px-4 md:px-[60px] py-[60px] md:py-[100px] bg-[#FAF8F5]">
        <div className="max-w-[1360px] mx-auto">
          <div className="mb-[40px] md:mb-[44px]">
            <div className="text-[11px] tracking-[2.5px] text-[#3d5f38] font-semibold mb-3 md:mb-4 uppercase">GALERÍA · SENSIBILIZACIONES</div>
            {s?.galeria.titulo.valor && (
              <h3 className="font-instrument font-normal text-[44px] md:text-[56px] leading-none m-0 tracking-[-0.02em]">
                <HighlightText text={s.galeria.titulo.valor} highlightClassName="italic text-[#5a8a4a]" />
              </h3>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[160px] md:auto-rows-[220px] gap-2 md:gap-3">
            {s?.galeria.imagenes.map((img: any, idx: number) => (
              <div key={img.id} className={`rounded-xl md:rounded-2xl overflow-hidden relative ${idx === 0 ? 'col-span-2 row-span-2' : ''}`}>
                <ImageSlot src={img.url} placeholder={img.alt || `Foto 0${idx + 1}`} className="bg-[#1a2e21]/10 text-[#1a2e21]/30" />
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
