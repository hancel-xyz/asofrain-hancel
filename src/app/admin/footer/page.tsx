import { getEstructura } from "@/lib/data";
import { updateFooterFondo } from "./actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AdminForm } from "@/components/AdminForm";

export default async function AdminFooterPage() {
  const data = await getEstructura();
  if (!data) return <div>Error cargando datos</div>;

  const page = data.sitio.paginas.find((p: { id: string }) => p.id === "footer");
  if (!page) return <div>Página no encontrada</div>;

  const section = page.secciones.fondo;

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Footer</h1>
        <p className="text-muted-foreground">Administra la imagen de fondo del pie de página del sitio.</p>
      </div>

      <AdminForm action={updateFooterFondo} className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Imagen de fondo</CardTitle>
            <CardDescription>
              Si subes una imagen, el footer la usará de fondo (con un degradado oscuro para que el texto siga siendo legible). Si no subes nada, el footer se muestra en blanco.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="imagen_fondo">Subir imagen</Label>
              <Input id="imagen_fondo" name="imagen_fondo" type="file" accept="image/*" />
              <p className="text-xs text-muted-foreground">Actual: {section.imagen_fondo.valor || "(sin imagen, footer en blanco)"}</p>
            </div>
          </CardContent>
        </Card>
      </AdminForm>
    </div>
  );
}
