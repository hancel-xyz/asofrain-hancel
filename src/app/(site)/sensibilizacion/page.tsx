import { ImageSlot } from "@/components/ImageSlot";
import { getEstructura } from "@/lib/data";
import { HighlightText } from "@/components/HighlightText";

export default async function SensibilizacionPage() {
  const data = await getEstructura();
  const pageData = data?.sitio.paginas.find((p: any) => p.id === "sensibilizacion");
  const s = pageData?.secciones;

  const cardStyles = [
    { wrapper: "bg-white border border-black/[0.08]", eyebrow: "text-[#62AF9D]", list: "text-[#4b5563]", title: "text-[#111111]", img: "bg-[#62AF9D]/20 text-[#111111]/40" },
    { wrapper: "bg-white border border-black/[0.08]", eyebrow: "text-[#62AF9D]", list: "text-[#4b5563]", title: "text-[#111111]", img: "bg-[#62AF9D]/20 text-[#111111]/40" },
    { wrapper: "bg-[#62AF9D] text-[#111111]", eyebrow: "text-[#111111]/70", list: "text-[#111111]/80", title: "text-[#111111]", img: "bg-white/25 text-[#111111]/50" },
  ];

  return (
    <div className="bg-white font-sans">
      {/* ENCABEZADO */}
      <section className="px-4 md:px-[60px] pt-[110px] md:pt-[130px] pb-[50px] md:pb-[80px] bg-white">
        <div className="max-w-[1360px] mx-auto">
          <div className="flex justify-between items-start md:items-end mb-[10px] gap-5 md:gap-[60px] flex-col md:flex-row flex-wrap">
            <div>
              <div className="text-[11px] tracking-[2.5px] text-[#62AF9D] font-semibold mb-3 md:mb-5 uppercase">— SENSIBILIZACIÓN</div>
              <h1 className="font-display font-semibold text-[clamp(36px,6vw,64px)] leading-[1.05] m-0 tracking-[-0.02em] max-w-[900px] text-[#111111]">
                <HighlightText text={s?.encabezado.titulo.valor || ""} />
              </h1>
            </div>
            <p className="text-[15px] md:text-[16px] leading-[1.6] text-[#4b5563] max-w-[400px]">{s?.encabezado.descripcion.valor}</p>
          </div>
        </div>
      </section>

      {/* TIPOS DE SENSIBILIZACIÓN */}
      <section id="campanas" className="px-4 md:px-[60px] pb-[50px] md:pb-[80px] bg-white scroll-mt-[100px]">
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
                  <div className={`font-display font-semibold text-[26px] md:text-[30px] leading-[1.1] mb-4 tracking-[-0.01em] ${style.title}`}>{tipo.titulo.valor}</div>
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
      <section className="px-4 md:px-[60px] py-[50px] md:py-[80px] bg-white">
        <div className="max-w-[1360px] mx-auto">
          <div className="mb-[40px] md:mb-[44px]">
            <div className="text-[11px] tracking-[2.5px] text-[#62AF9D] font-semibold mb-3 md:mb-4 uppercase">GALERÍA · SENSIBILIZACIONES</div>
            {s?.galeria.titulo.valor && (
              <h3 className="font-display font-semibold text-[36px] md:text-[48px] leading-none m-0 tracking-[-0.02em] text-[#111111]">
                <HighlightText text={s.galeria.titulo.valor} />
              </h3>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[160px] md:auto-rows-[220px] gap-2 md:gap-3">
            {s?.galeria.imagenes.map((img: any, idx: number) => (
              <div key={img.id} className={`rounded-xl md:rounded-2xl overflow-hidden relative ${idx === 0 ? 'col-span-2 row-span-2' : ''}`}>
                <ImageSlot src={img.url} placeholder={img.alt || `Foto 0${idx + 1}`} className="bg-white border border-black/[0.08] text-[#111111]/30" />
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
