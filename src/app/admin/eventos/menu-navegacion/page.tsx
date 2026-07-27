import { getEstructura } from "@/lib/data";
import { updateEventosMenuPreview } from "../actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AdminForm } from "@/components/AdminForm";

export default async function AdminEventosMenuNavegacionPage() {
  const data = await getEstructura();
  if (!data) return <div>Error cargando datos</div>;

  const page = data.sitio.paginas.find((p: { id: string }) => p.id === "eventos");
  if (!page) return <div>Página no encontrada</div>;

  const section = page.secciones.menu_preview;

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Eventos - Menú de navegación</h1>
        <p className="text-muted-foreground">
          Imagen que aparece en el menú desplegable &quot;Iniciativas&quot; del header, para la opción Eventos.
        </p>
      </div>

      <AdminForm action={updateEventosMenuPreview} className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Imagen del menú</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3 max-w-sm">
              <Label htmlFor="imagen">Imagen</Label>
              <Input id="imagen" name="imagen" type="file" accept="image/*" />
              <p className="text-xs text-muted-foreground truncate">Actual: {section.imagen.valor || "(sin imagen)"}</p>
            </div>
          </CardContent>
        </Card>
      </AdminForm>
    </div>
  );
}
