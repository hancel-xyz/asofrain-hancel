"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PlusIcon, TrashIcon } from "lucide-react";

interface AliadoData {
  id: string;
  logoUrl: string;
  titulo: string;
  descripcion: string;
}

function generateAliadoId() {
  return `aliado_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

export function AliadosEditor({ initialAliados }: { initialAliados: AliadoData[] }) {
  const [aliados, setAliados] = useState<AliadoData[]>(initialAliados);

  function addAliado() {
    setAliados((prev) => [...prev, { id: generateAliadoId(), logoUrl: "", titulo: "", descripcion: "" }]);
  }

  function removeAliado(id: string) {
    setAliados((prev) => prev.filter((a) => a.id !== id));
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm text-muted-foreground">
          {aliados.length} {aliados.length === 1 ? "entidad" : "entidades"}
        </span>
        <Button type="button" className="gap-2" onClick={addAliado}>
          <PlusIcon className="h-4 w-4" />
          Agregar Entidad
        </Button>
      </div>

      {aliados.length === 0 && (
        <p className="text-sm text-muted-foreground border border-dashed rounded-lg p-6 text-center">
          Todavía no hay entidades. Agrega la primera con el botón de arriba.
        </p>
      )}

      {aliados.map((a, i) => (
        <div key={a.id} className="space-y-4 border p-4 rounded-lg relative">
          <div className="absolute top-4 right-4 flex gap-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-destructive h-8 w-8"
              onClick={() => removeAliado(a.id)}
              aria-label="Eliminar esta entidad"
            >
              <TrashIcon className="h-4 w-4" />
            </Button>
          </div>
          <h3 className="font-medium text-lg">Aliado {i + 1}</h3>

          <input type="hidden" name="aliados_id" value={a.id} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-3 md:col-span-2">
              <Label htmlFor={`${a.id}_logo`}>Logo Entidad</Label>
              <Input id={`${a.id}_logo`} name={`${a.id}_logo`} type="file" accept="image/*" />
              <p className="text-xs text-muted-foreground">Actual: {a.logoUrl || "(sin logo, se muestra la inicial del nombre)"}</p>
            </div>
            <div className="flex flex-col gap-3 md:col-span-2">
              <Label htmlFor={`${a.id}_titulo`}>Título / Nombre <span className="font-normal text-muted-foreground text-xs">(Usa *asteriscos* para destacar una palabra)</span></Label>
              <Input id={`${a.id}_titulo`} name={`${a.id}_titulo`} defaultValue={a.titulo} />
            </div>
            <div className="flex flex-col gap-3 md:col-span-2">
              <Label htmlFor={`${a.id}_desc`}>Descripción</Label>
              <Textarea id={`${a.id}_desc`} name={`${a.id}_desc`} defaultValue={a.descripcion} rows={2} />
            </div>
          </div>
        </div>
      ))}

      <p className="text-xs text-muted-foreground text-center">
        La última entidad de la lista siempre se muestra destacada en /nosotros, ocupando el espacio restante de su fila.
      </p>
    </div>
  );
}
