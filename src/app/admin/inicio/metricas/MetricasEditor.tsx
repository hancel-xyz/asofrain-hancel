"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, ChevronUpIcon, PlusIcon, TrashIcon } from "lucide-react";

export interface MetricaData {
  id: string;
  titulo: string;
  numero: string;
  /** "texto" shows a sentence under the figure, "items" shows a chip list. */
  tipo: "texto" | "items";
  texto: string;
  items: string;
}

function generarId() {
  return `metrica_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

/**
 * Add, reorder and remove the figures in the impact section.
 *
 * They used to be four fixed slots with hard-coded titles, which meant a new
 * figure needed a code change; now the section is whatever the list says.
 */
export function MetricasEditor({ initialMetricas }: { initialMetricas: MetricaData[] }) {
  const [metricas, setMetricas] = useState<MetricaData[]>(initialMetricas);

  function agregar() {
    setMetricas((prev) => [
      ...prev,
      { id: generarId(), titulo: "", numero: "", tipo: "texto", texto: "", items: "" },
    ]);
  }

  function eliminar(id: string) {
    setMetricas((prev) => prev.filter((m) => m.id !== id));
  }

  function mover(index: number, delta: number) {
    setMetricas((prev) => {
      const destino = index + delta;
      if (destino < 0 || destino >= prev.length) return prev;
      const copia = [...prev];
      [copia[index], copia[destino]] = [copia[destino], copia[index]];
      return copia;
    });
  }

  function actualizar(id: string, patch: Partial<MetricaData>) {
    setMetricas((prev) => prev.map((m) => (m.id === id ? { ...m, ...patch } : m)));
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm text-muted-foreground">
          {metricas.length} {metricas.length === 1 ? "métrica" : "métricas"}
        </span>
        <Button type="button" className="gap-2" onClick={agregar}>
          <PlusIcon className="h-4 w-4" />
          Agregar métrica
        </Button>
      </div>

      {metricas.length === 0 && (
        <p className="text-sm text-muted-foreground border border-dashed rounded-lg p-6 text-center">
          Todavía no hay métricas. Agrega la primera con el botón de arriba.
        </p>
      )}

      {metricas.map((m, i) => (
        <div key={m.id} className="p-4 border rounded-lg space-y-4">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-medium flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-muted text-xs font-semibold">
                {i + 1}
              </span>
              {m.titulo || "Métrica"}
            </h4>
            <div className="flex items-center gap-1">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => mover(i, -1)}
                disabled={i === 0}
                aria-label="Subir esta métrica"
              >
                <ChevronUpIcon className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => mover(i, 1)}
                disabled={i === metricas.length - 1}
                aria-label="Bajar esta métrica"
              >
                <ChevronDownIcon className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-destructive h-8 w-8"
                onClick={() => eliminar(m.id)}
                aria-label="Eliminar esta métrica"
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <input type="hidden" name="metricas_id" value={m.id} />
          <input type="hidden" name={`${m.id}_tipo`} value={m.tipo} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor={`${m.id}_titulo`}>Título</Label>
              <Input
                id={`${m.id}_titulo`}
                name={`${m.id}_titulo`}
                value={m.titulo}
                onChange={(e) => actualizar(m.id, { titulo: e.target.value })}
                placeholder="Ej. Usuarios atendidos por ASOFRAIN"
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor={`${m.id}_numero`}>Número</Label>
              <Input
                id={`${m.id}_numero`}
                name={`${m.id}_numero`}
                defaultValue={m.numero}
                placeholder="Ej. 15.000"
                disabled={m.tipo === "items"}
              />
              <p className="text-xs text-muted-foreground">
                Se anima contando desde cero. Déjalo vacío si esta métrica solo muestra una lista.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Label>¿Qué se muestra debajo del número?</Label>
            <div className="flex gap-2">
              <Button
                type="button"
                size="sm"
                variant={m.tipo === "texto" ? "default" : "outline"}
                onClick={() => actualizar(m.id, { tipo: "texto" })}
              >
                Una frase
              </Button>
              <Button
                type="button"
                size="sm"
                variant={m.tipo === "items" ? "default" : "outline"}
                onClick={() => actualizar(m.id, { tipo: "items" })}
              >
                Una lista
              </Button>
            </div>
          </div>

          {m.tipo === "texto" ? (
            <div className="flex flex-col gap-3">
              <Label htmlFor={`${m.id}_texto`}>Frase</Label>
              <Textarea
                id={`${m.id}_texto`}
                name={`${m.id}_texto`}
                defaultValue={m.texto}
                rows={2}
                placeholder="Ej. Más de 30 sensibilizaciones y reciclatones."
              />
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Label htmlFor={`${m.id}_items`}>Lista (separada por comas)</Label>
              <Input
                id={`${m.id}_items`}
                name={`${m.id}_items`}
                defaultValue={m.items}
                placeholder="Rincón, Prieto Hermanos, Ecoambit"
              />
            </div>
          )}
        </div>
      ))}

      <p className="text-xs text-muted-foreground text-center">
        Las métricas que agregues, muevas o elimines se aplican al hacer clic en &quot;Guardar Cambios&quot;.
      </p>
    </div>
  );
}
