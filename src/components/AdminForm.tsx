"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface AdminFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  action: (formData: FormData) => Promise<void>;
  children: React.ReactNode;
}

export function AdminForm({ action, children, className, ...props }: AdminFormProps) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      try {
        await action(formData);
        // Clear every file input after a successful save. Without this, a
        // previously-picked file stays attached to the input (this is a
        // client-side fetch submit, not a real page navigation, so the form
        // is never reset), and the *same* file gets re-uploaded — and a new
        // media_assets row gets created for it — on every subsequent save.
        form.querySelectorAll<HTMLInputElement>('input[type="file"]').forEach((input) => {
          input.value = "";
        });
        toast.success("La información se ha guardado correctamente.");
      } catch (error) {
        toast.error("Ocurrió un error al guardar los cambios.");
        console.error(error);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className={className} {...props}>
      {children}
      <div className="flex justify-end gap-4 mt-4">
        <Button type="button" variant="outline" disabled={isPending}>Cancelar</Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Guardando..." : "Guardar Cambios"}
        </Button>
      </div>
    </form>
  );
}
