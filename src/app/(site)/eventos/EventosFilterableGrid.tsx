"use client";

import { useMemo, useState } from "react";
import { ImageSlot } from "@/components/ImageSlot";
import { formatEventDateLabel, getEventYear } from "@/lib/eventDate";

interface EventoCard {
  id: string;
  fecha: string;
  titulo: string;
  fotoUrl: string;
  fotoAlt: string;
}

export function EventosFilterableGrid({
  cards,
  years,
  filtroActivo,
}: {
  cards: EventoCard[];
  years: number[];
  filtroActivo: boolean;
}) {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const visibleCards = useMemo(() => {
    if (selectedYear === null) return cards;
    return cards.filter((c) => getEventYear(c.fecha) === selectedYear);
  }, [cards, selectedYear]);

  return (
    <>
      {filtroActivo && years.length > 0 && (
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar snap-x snap-mandatory mb-[40px] md:mb-[50px]">
          <button
            onClick={() => setSelectedYear(null)}
            className={`snap-start px-5 py-2.5 rounded-full text-[13px] font-semibold cursor-pointer whitespace-nowrap transition-colors ${
              selectedYear === null
                ? "bg-[#62AF9D] text-[#111111] border-none"
                : "bg-transparent border border-black/15 text-[#111111] font-medium hover:bg-black/[0.03]"
            }`}
          >
            Todos
          </button>
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`snap-start px-5 py-2.5 rounded-full text-[13px] font-semibold cursor-pointer whitespace-nowrap transition-colors ${
                selectedYear === year
                  ? "bg-[#62AF9D] text-[#111111] border-none"
                  : "bg-transparent border border-black/15 text-[#111111] font-medium hover:bg-black/[0.03]"
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      )}

      {visibleCards.length === 0 ? (
        <p className="text-[14px] text-[#4b5563]">No hay eventos para este año.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {visibleCards.map((card) => (
            <div key={card.id} className="bg-white border border-black/[0.08] rounded-[24px] overflow-hidden">
              <div className="h-[180px] md:h-[200px] relative">
                <ImageSlot src={card.fotoUrl} placeholder={card.fotoAlt || card.titulo} className="bg-[#62AF9D]/15 text-[#111111]/40" />
              </div>
              <div className="p-5 md:p-[22px_24px]">
                <div className="text-[11px] tracking-[1.5px] text-[#62AF9D] font-semibold mb-2">{formatEventDateLabel(card.fecha)}</div>
                <div className="text-[16px] md:text-[17px] font-semibold leading-tight text-[#111111]">{card.titulo}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
