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
    <div className="bg-[#FAF8F5] font-sans">
      {/* LISTADO DE EVENTOS */}
      <section className="px-4 md:px-[60px] pt-[130px] md:pt-[160px] pb-[80px] md:pb-[100px] bg-[#FAF8F5]">
        <div className="max-w-[1360px] mx-auto">
          <div className="mb-[40px] md:mb-[50px]">
            <div className="text-[11px] tracking-[2.5px] text-[#3d5f38] font-semibold mb-3 md:mb-4 uppercase">EVENTOS INSTITUCIONALES</div>
            <h1 className="font-instrument font-normal text-[clamp(44px,7vw,84px)] leading-none m-0 tracking-[-0.02em] max-w-[900px]">
              <HighlightText text={s?.titulo.valor || ""} highlightClassName="italic text-[#5a8a4a]" />
            </h1>
          </div>

          <EventosFilterableGrid cards={cards} years={years} filtroActivo={!!s?.filtro_por_ano?.activo} />
        </div>
      </section>

    </div>
  );
}
