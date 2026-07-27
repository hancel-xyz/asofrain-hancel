import { getEstructura } from "@/lib/data";
import { updateNosotrosMenuPreview } from "../actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AdminForm } from "@/components/AdminForm";

export default async function AdminNosotrosMenuNavegacionPage() {
  const data = await getEstructura();
  if (!data) return <div>Error cargando datos</div>;

  const page = data.sitio.paginas.find((p: { id: string }) => p.id === "nosotros");
  if (!page) return <div>Página no encontrada</div>;

  const section = page.secciones.menu_preview;

  const fields = [
    { key: "quienes_somos", label: "Quiénes somos" },
    { key: "historia", label: "Historia" },
    { key: "valores", label: "Valores y aliados" },
  ] as const;

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Nosotros - Menú de navegación</h1>
        <p className="text-muted-foreground">
          Imágenes que aparecen en el menú desplegable del header al pasar el mouse sobre &quot;Nosotros&quot;.
        </p>
      </div>

      <AdminForm action={updateNosotrosMenuPreview} className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Imágenes del menú</CardTitle>
            <CardDescription>Una imagen por cada opción del menú desplegable.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-3">
            {fields.map((f) => (
              <div key={f.key} className="flex flex-col gap-3">
                <Label htmlFor={f.key}>{f.label}</Label>
                <Input id={f.key} name={f.key} type="file" accept="image/*" />
                <p className="text-xs text-muted-foreground truncate">Actual: {section[f.key].valor || "(sin imagen)"}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </AdminForm>
    </div>
  );
}
