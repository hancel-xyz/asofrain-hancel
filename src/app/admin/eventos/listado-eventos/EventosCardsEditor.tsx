"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ImageSlot } from "@/components/ImageSlot";
import { PlusIcon, TrashIcon } from "lucide-react";

interface EventoCardData {
  id: string;
  fecha: string;
  titulo: string;
  fotoUrl: string;
}

function generateCardId() {
  return `evento_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

/** Normalizes legacy free-text values (e.g. "08 MAR") to empty, so the native
 * date input starts blank instead of silently rejecting an invalid string. */
function toDateInputValue(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : "";
}

export function EventosCardsEditor({ initialCards }: { initialCards: EventoCardData[] }) {
  const [cards, setCards] = useState<EventoCardData[]>(initialCards);

  function addCard() {
    setCards((prev) => [{ id: generateCardId(), fecha: "", titulo: "", fotoUrl: "" }, ...prev]);
  }

  function removeCard(id: string) {
    setCards((prev) => prev.filter((c) => c.id !== id));
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm text-muted-foreground">
          {cards.length} {cards.length === 1 ? "evento" : "eventos"}
        </span>
        <Button type="button" className="gap-2" onClick={addCard}>
          <PlusIcon className="h-4 w-4" />
          Agregar evento
        </Button>
      </div>

      {cards.length === 0 && (
        <p className="text-sm text-muted-foreground border border-dashed rounded-lg p-6 text-center">
          Todavía no hay eventos. Agrega el primero con el botón de arriba.
        </p>
      )}

      {cards.map((card, i) => (
        <div key={card.id} className="p-4 border rounded-lg space-y-4 relative">
          <div className="flex items-center justify-between">
            <h4 className="font-medium flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-muted text-xs font-semibold">
                {cards.length - i}
              </span>
              Evento
            </h4>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-destructive h-8 w-8"
              onClick={() => removeCard(card.id)}
              aria-label="Eliminar este evento"
            >
              <TrashIcon className="h-4 w-4" />
            </Button>
          </div>

          <input type="hidden" name="cards_id" value={card.id} />

          <div className="flex gap-4 items-start">
            <div className="w-20 h-20 rounded-md overflow-hidden shrink-0 border">
              <ImageSlot src={card.fotoUrl} placeholder="Sin foto" className="bg-muted text-muted-foreground" />
            </div>
            <div className="flex-1 flex flex-col gap-3">
              <Label htmlFor={`${card.id}_foto`}>Foto</Label>
              <Input id={`${card.id}_foto`} name={`${card.id}_foto`} type="file" accept="image/*" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor={`${card.id}_fecha`}>Fecha</Label>
              <Input
                id={`${card.id}_fecha`}
                name={`${card.id}_fecha`}
                type="date"
                defaultValue={toDateInputValue(card.fecha)}
              />
              <p className="text-xs text-muted-foreground">
                Se usa para mostrar la fecha en la tarjeta y para el filtro por año en el sitio.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor={`${card.id}_titulo`}>Título</Label>
              <Input
                id={`${card.id}_titulo`}
                name={`${card.id}_titulo`}
                defaultValue={card.titulo}
                placeholder="Título del evento"
              />
            </div>
          </div>
        </div>
      ))}

      <p className="text-xs text-muted-foreground text-center">
        Los eventos que agregues o elimines aquí se aplican al hacer clic en &quot;Guardar Cambios&quot;.
      </p>
    </div>
  );
}
