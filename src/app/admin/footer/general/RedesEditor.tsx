"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PlusIcon, TrashIcon } from "lucide-react";

interface RedData {
  id: string;
  nombre: string;
  url: string;
}

function generateRedId() {
  return `red_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

export function RedesEditor({ initialRedes }: { initialRedes: RedData[] }) {
  const [redes, setRedes] = useState<RedData[]>(initialRedes);

  function addRed() {
    setRedes((prev) => [...prev, { id: generateRedId(), nombre: "", url: "" }]);
  }

  function removeRed(id: string) {
    setRedes((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm text-muted-foreground">
          {redes.length} {redes.length === 1 ? "red social" : "redes sociales"}
        </span>
        <Button type="button" className="gap-2" onClick={addRed}>
          <PlusIcon className="h-4 w-4" />
          Agregar red social
        </Button>
      </div>

      {redes.length === 0 && (
        <p className="text-sm text-muted-foreground border border-dashed rounded-lg p-6 text-center">
          Todavía no hay redes sociales. Agrega la primera con el botón de arriba.
        </p>
      )}

      {redes.map((r, i) => (
        <div key={r.id} className="space-y-4 border p-4 rounded-lg relative">
          <div className="absolute top-4 right-4 flex gap-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-destructive h-8 w-8"
              onClick={() => removeRed(r.id)}
              aria-label="Eliminar esta red social"
            >
              <TrashIcon className="h-4 w-4" />
            </Button>
          </div>
          <h3 className="font-medium text-lg">Red social {i + 1}</h3>

          <input type="hidden" name="redes_id" value={r.id} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor={`${r.id}_nombre`}>Nombre</Label>
              <Input id={`${r.id}_nombre`} name={`${r.id}_nombre`} defaultValue={r.nombre} placeholder="Facebook, Instagram, TikTok..." />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor={`${r.id}_url`}>Enlace</Label>
              <Input id={`${r.id}_url`} name={`${r.id}_url`} defaultValue={r.url} placeholder="https://..." />
            </div>
          </div>
        </div>
      ))}

      <p className="text-xs text-muted-foreground text-center">
        Las redes sociales que agregues o elimines aquí se aplican al hacer clic en &quot;Guardar Cambios&quot;.
      </p>
    </div>
  );
}
