"use client";

import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { submitPqrs } from "@/components/pqrs-actions";

const TIPOS_PQRS = ["Petición", "Queja", "Reclamo", "Sugerencia"];

export function PqrsDialog({ triggerClassName }: { triggerClassName?: string }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await submitPqrs(formData);
      if (result?.error) setError(result.error);
      else setSent(true);
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) {
          setSent(false);
          setError(null);
        }
      }}
    >
      <DialogTrigger className={triggerClassName}>Radicar PQRS</DialogTrigger>
      <DialogContent>
        {sent ? (
          <div className="py-4 text-center">
            <div className="w-12 h-12 rounded-full bg-[#4CAF50] text-white flex items-center justify-center text-[20px] mx-auto mb-4">✓</div>
            <DialogTitle>PQRS radicada</DialogTitle>
            <DialogDescription className="mt-2">
              Recibimos tu solicitud. Te responderemos a través de los datos de contacto proporcionados.
            </DialogDescription>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Radicar PQRS</DialogTitle>
              <DialogDescription>
                Peticiones, quejas, reclamos o sugerencias sobre el servicio.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="grid gap-3.5">
              <div className="grid gap-1.5">
                <label htmlFor="pqrs_tipo" className="text-xs font-medium text-foreground/80">Tipo</label>
                <select
                  id="pqrs_tipo"
                  name="tipo"
                  required
                  defaultValue=""
                  className="w-full px-3 py-2.5 border rounded-md text-sm bg-background focus:outline-none focus:border-[#4CAF50]"
                >
                  <option value="" disabled>Selecciona un tipo</option>
                  {TIPOS_PQRS.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="grid gap-1.5">
                <label htmlFor="pqrs_nombre" className="text-xs font-medium text-foreground/80">Nombre completo</label>
                <input id="pqrs_nombre" name="nombre" required type="text" className="w-full px-3 py-2.5 border rounded-md text-sm bg-background focus:outline-none focus:border-[#4CAF50]" />
              </div>
              <div className="grid grid-cols-2 gap-3.5">
                <div className="grid gap-1.5">
                  <label htmlFor="pqrs_correo" className="text-xs font-medium text-foreground/80">Correo</label>
                  <input id="pqrs_correo" name="correo" type="email" className="w-full px-3 py-2.5 border rounded-md text-sm bg-background focus:outline-none focus:border-[#4CAF50]" />
                </div>
                <div className="grid gap-1.5">
                  <label htmlFor="pqrs_telefono" className="text-xs font-medium text-foreground/80">Teléfono</label>
                  <input id="pqrs_telefono" name="telefono" type="tel" className="w-full px-3 py-2.5 border rounded-md text-sm bg-background focus:outline-none focus:border-[#4CAF50]" />
                </div>
              </div>
              <div className="grid gap-1.5">
                <label htmlFor="pqrs_mensaje" className="text-xs font-medium text-foreground/80">Mensaje</label>
                <textarea id="pqrs_mensaje" name="mensaje" required rows={4} className="w-full px-3 py-2.5 border rounded-md text-sm bg-background resize-y focus:outline-none focus:border-[#4CAF50]" />
              </div>

              {error && <p className="text-xs text-red-600">{error}</p>}

              <button
                type="submit"
                disabled={isPending}
                className="mt-1 px-5 py-2.5 bg-[#006B4D] text-white rounded-full text-sm font-semibold hover:bg-[#4CAF50] hover:text-[#002E1F] transition-colors disabled:opacity-60"
              >
                {isPending ? "Enviando..." : "Enviar"}
              </button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
