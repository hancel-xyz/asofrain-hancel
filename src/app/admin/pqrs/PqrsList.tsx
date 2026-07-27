"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrashIcon, CheckIcon } from "lucide-react";
import { updatePqrsEstado, deletePqrs, type PqrsRow } from "./actions";

export function PqrsList({ items }: { items: PqrsRow[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleToggleEstado(id: string, current: string) {
    const next = current === "atendida" ? "nueva" : "atendida";
    startTransition(async () => {
      const result = await updatePqrsEstado(id, next);
      if (result?.error) toast.error(result.error);
      else router.refresh();
    });
  }

  function handleDelete(id: string) {
    if (!confirm("¿Eliminar esta PQRS?")) return;
    startTransition(async () => {
      const result = await deletePqrs(id);
      if (result?.error) toast.error(result.error);
      else {
        toast.success("PQRS eliminada.");
        router.refresh();
      }
    });
  }

  if (items.length === 0) {
    return (
      <p className="text-sm text-muted-foreground border border-dashed rounded-lg p-10 text-center">
        Todavía no hay PQRS radicadas.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.id} className="border rounded-lg p-4 space-y-2">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium">{item.nombre}</span>
                <Badge variant="outline">{item.tipo}</Badge>
                <Badge variant={item.estado === "atendida" ? "default" : "secondary"}>{item.estado}</Badge>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {new Date(item.created_at).toLocaleString("es-CO", { dateStyle: "medium", timeStyle: "short" })}
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-1.5"
                disabled={isPending}
                onClick={() => handleToggleEstado(item.id, item.estado)}
              >
                <CheckIcon className="h-3.5 w-3.5" />
                {item.estado === "atendida" ? "Marcar como nueva" : "Marcar atendida"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-destructive h-8 w-8"
                disabled={isPending}
                onClick={() => handleDelete(item.id)}
                aria-label="Eliminar PQRS"
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 text-sm text-muted-foreground pt-2 border-t">
            <div><span className="font-medium text-foreground">Correo:</span> {item.correo || "—"}</div>
            <div><span className="font-medium text-foreground">Teléfono:</span> {item.telefono || "—"}</div>
          </div>
          <div className="text-sm pt-2 border-t">
            <span className="font-medium">Mensaje:</span> {item.mensaje}
          </div>
        </div>
      ))}
    </div>
  );
}
