"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrashIcon, CheckIcon } from "lucide-react";
import { updateSolicitudEstado, deleteSolicitud, type SolicitudRow } from "./actions";

export function SolicitudesList({ solicitudes }: { solicitudes: SolicitudRow[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleToggleEstado(id: string, current: string) {
    const next = current === "atendida" ? "nueva" : "atendida";
    startTransition(async () => {
      const result = await updateSolicitudEstado(id, next);
      if (result?.error) toast.error(result.error);
      else router.refresh();
    });
  }

  function handleDelete(id: string) {
    if (!confirm("¿Eliminar esta solicitud?")) return;
    startTransition(async () => {
      const result = await deleteSolicitud(id);
      if (result?.error) toast.error(result.error);
      else {
        toast.success("Solicitud eliminada.");
        router.refresh();
      }
    });
  }

  if (solicitudes.length === 0) {
    return (
      <p className="text-sm text-muted-foreground border border-dashed rounded-lg p-10 text-center">
        Todavía no hay solicitudes.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {solicitudes.map((s) => (
        <div key={s.id} className="border rounded-lg p-4 space-y-2">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium">{s.nombre}</span>
                <Badge variant="outline">{s.tipo_cliente}</Badge>
                <Badge variant={s.estado === "atendida" ? "default" : "secondary"}>{s.estado}</Badge>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {new Date(s.created_at).toLocaleString("es-CO", { dateStyle: "medium", timeStyle: "short" })}
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-1.5"
                disabled={isPending}
                onClick={() => handleToggleEstado(s.id, s.estado)}
              >
                <CheckIcon className="h-3.5 w-3.5" />
                {s.estado === "atendida" ? "Marcar como nueva" : "Marcar atendida"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-destructive h-8 w-8"
                disabled={isPending}
                onClick={() => handleDelete(s.id)}
                aria-label="Eliminar solicitud"
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 text-sm text-muted-foreground pt-2 border-t">
            <div><span className="font-medium text-foreground">Correo:</span> {s.correo}</div>
            <div><span className="font-medium text-foreground">Teléfono:</span> {s.telefono || "—"}</div>
            <div><span className="font-medium text-foreground">Localidad:</span> {s.localidad || "—"}</div>
            <div><span className="font-medium text-foreground">Dirección:</span> {s.direccion || "—"}</div>
          </div>
          {s.descripcion && (
            <div className="text-sm pt-2 border-t">
              <span className="font-medium">Descripción:</span> {s.descripcion}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
