import { CalendarDaysIcon, ImagesIcon, PartyPopperIcon } from "lucide-react";
import { getEstructura } from "@/lib/data";
import { HighlightText } from "@/components/HighlightText";
import { Reveal } from "@/components/Reveal";
import { EventosFilterableGrid, type EventoCard } from "./EventosFilterableGrid";
import { getEventYear } from "@/lib/eventDate";

interface RawEventoCard {
  id: string;
  fecha: { valor: string };
  titulo: { valor: string };
  descripcion?: { valor?: string };
  foto: { url: string; alt: string; encuadre?: string };
  galeria?: { id: string; url?: string; alt?: string; encuadre?: string }[];
}

export default async function EventosPage() {
  const data = await getEstructura();
  const pageData = data?.sitio.paginas.find((p: { id: string }) => p.id === "eventos");
  const s = pageData?.secciones.listado_eventos;

  const cards: EventoCard[] = ((s?.cards ?? []) as RawEventoCard[]).map((card) => ({
    id: card.id,
    fecha: card.fecha.valor,
    titulo: card.titulo.valor,
    descripcion: card.descripcion?.valor ?? "",
    fotoUrl: card.foto.url,
    fotoAlt: card.foto.alt,
    fotoEncuadre: card.foto.encuadre,
    galeria: (card.galeria ?? []).map((img) => ({
      id: img.id,
      url: img.url ?? "",
      alt: img.alt ?? "",
      encuadre: img.encuadre,
    })),
  }));

  const years = Array.from(
    new Set(cards.map((c) => getEventYear(c.fecha)).filter((y): y is number => y !== null))
  ).sort((a, b) => b - a);

  const totalFotos = cards.reduce((acc, card) => acc + card.galeria.filter((i) => i.url).length, 0);

  return (
    <div className="bg-brand-sand font-sans">
      <section className="relative overflow-hidden px-4 md:px-[60px] pt-[110px] md:pt-[140px] pb-[60px] md:pb-[90px]">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-lime/12 via-brand/[0.06] to-transparent pointer-events-none"></div>
        <div className="absolute inset-x-0 top-0 h-[400px] text-brand/[0.12] pattern-dots-lg [mask-image:linear-gradient(to_bottom,black,transparent)] pointer-events-none"></div>
        <div className="absolute -top-20 left-[-80px] w-[360px] h-[360px] rounded-full bg-brand/25 blur-[110px] pointer-events-none animate-af-float"></div>
        <div
          className="absolute top-[80px] right-[-70px] w-[340px] h-[340px] rounded-full bg-brand-lime/25 blur-[110px] pointer-events-none animate-af-float"
          style={{ animationDelay: "-3s" }}
        ></div>

        <div className="relative max-w-[1360px] mx-auto">
          <div className="mb-[40px] md:mb-[54px]">
            <Reveal variant="fade">
              <span className="inline-flex items-center gap-2.5 rounded-full border border-brand/30 bg-white px-4 py-2 text-[11px] font-bold tracking-[2px] uppercase text-brand-dark mb-6 shadow-sm">
                <PartyPopperIcon className="h-3.5 w-3.5" aria-hidden />
                Eventos institucionales
              </span>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="font-display font-semibold text-[clamp(36px,6vw,64px)] leading-[1.04] m-0 tracking-[-0.02em] max-w-[900px] text-brand-ink">
                <HighlightText
                  text={s?.titulo.valor || ""}
                  highlightClassName="font-display font-medium not-italic text-brand-dark"
                />
              </h1>
            </Reveal>

            <Reveal delay={190} variant="fade">
              <div className="mt-6 flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-2 rounded-full bg-white border border-black/[0.07] px-4 py-2.5 text-[12.5px] font-semibold text-brand-muted">
                  <CalendarDaysIcon className="h-4 w-4 text-brand-dark" aria-hidden />
                  {cards.length} {cards.length === 1 ? "evento" : "eventos"}
                </span>
                {totalFotos > 0 && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-white border border-black/[0.07] px-4 py-2.5 text-[12.5px] font-semibold text-brand-muted">
                    <ImagesIcon className="h-4 w-4 text-brand-lime-dark" aria-hidden />
                    {totalFotos} {totalFotos === 1 ? "foto" : "fotos"}
                  </span>
                )}
                <span className="text-[13px] text-brand-muted">Abre cualquier evento para ver su galería.</span>
              </div>
            </Reveal>
          </div>

          <EventosFilterableGrid cards={cards} years={years} filtroActivo={!!s?.filtro_por_ano?.activo} />
        </div>
      </section>
    </div>
  );
}
