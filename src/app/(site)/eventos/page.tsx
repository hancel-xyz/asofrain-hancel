import { getEstructura } from "@/lib/data";
import { HighlightText } from "@/components/HighlightText";
import { EventosFilterableGrid } from "./EventosFilterableGrid";
import { getEventYear } from "@/lib/eventDate";

interface RawEventoCard {
  id: string;
  fecha: { valor: string };
  titulo: { valor: string };
  foto: { url: string; alt: string };
}

export default async function EventosPage() {
  const data = await getEstructura();
  const pageData = data?.sitio.paginas.find((p: { id: string }) => p.id === "eventos");
  const s = pageData?.secciones.listado_eventos;

  const cards = ((s?.cards ?? []) as RawEventoCard[]).map((card) => ({
    id: card.id,
    fecha: card.fecha.valor,
    titulo: card.titulo.valor,
    fotoUrl: card.foto.url,
    fotoAlt: card.foto.alt,
  }));

  const years = Array.from(
    new Set(cards.map((c) => getEventYear(c.fecha)).filter((y): y is number => y !== null))
  ).sort((a, b) => b - a);

  return (
    <div className="bg-white font-sans">
      {/* LISTADO DE EVENTOS */}
      <section className="px-4 md:px-[60px] pt-[110px] md:pt-[130px] pb-[60px] md:pb-[80px] bg-white">
        <div className="max-w-[1360px] mx-auto">
          <div className="mb-[40px] md:mb-[50px]">
            <div className="text-[11px] tracking-[2.5px] text-[#62AF9D] font-semibold mb-3 md:mb-4 uppercase">EVENTOS INSTITUCIONALES</div>
            <h1 className="font-display font-semibold text-[clamp(36px,6vw,64px)] leading-none m-0 tracking-[-0.02em] max-w-[900px] text-[#111111]">
              <HighlightText text={s?.titulo.valor || ""} />
            </h1>
          </div>

          <EventosFilterableGrid cards={cards} years={years} filtroActivo={!!s?.filtro_por_ano?.activo} />
        </div>
      </section>

    </div>
  );
}
