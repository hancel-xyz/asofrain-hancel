import { getEstructura } from "@/lib/data";
import { updateSettingsGeneral } from "../actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AdminForm } from "@/components/AdminForm";

export default async function AdminSettingsGeneralPage() {
  const data = await getEstructura();
  if (!data) return <div>Error cargando datos</div>;

  const page = data.sitio.paginas.find((p: { id: string }) => p.id === "settings");
  if (!page) return <div>Página no encontrada</div>;

  const section = page.secciones.general;

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Configuración - General</h1>
        <p className="text-muted-foreground">Administra el nombre y el logo de la organización mostrados en este panel.</p>
      </div>

      <AdminForm action={updateSettingsGeneral} className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Organización</CardTitle>
            <CardDescription>
              Esto solo afecta el panel de administración (la tarjeta debajo del logo), no el sitio público.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="nombre">Nombre de la organización</Label>
              <Input id="nombre" name="nombre" defaultValue={section.nombre.valor} />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="logo">Logo</Label>
              <Input id="logo" name="logo" type="file" accept="image/*" />
              <p className="text-xs text-muted-foreground">Actual: {section.logo.valor || "(sin logo)"}</p>
            </div>
          </CardContent>
        </Card>
      </AdminForm>
    </div>
  );
}
