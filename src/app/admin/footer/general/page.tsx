import { getEstructura } from "@/lib/data";
import { updateFooterGeneral } from "../actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AdminForm } from "@/components/AdminForm";
import { RedesEditor } from "./RedesEditor";

export default async function AdminFooterGeneralPage() {
  const data = await getEstructura();
  if (!data) return <div>Error cargando datos</div>;

  const page = data.sitio.paginas.find((p: { id: string }) => p.id === "footer");
  if (!page) return <div>Página no encontrada</div>;

  const section = page.secciones.general;

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Footer - General</h1>
        <p className="text-muted-foreground">Administra la descripción y las redes sociales del pie de página.</p>
      </div>

      <AdminForm action={updateFooterGeneral} className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Descripción</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea id="descripcion" name="descripcion" defaultValue={section.descripcion.valor} rows={3} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Redes sociales</CardTitle>
            <CardDescription>Agrega, edita o elimina las redes sociales que se muestran en el footer.</CardDescription>
          </CardHeader>
          <CardContent>
            <RedesEditor
              key={section.redes.map((r: { id: string; nombre: string; url: string }) => `${r.id}:${r.nombre}:${r.url}`).join("|")}
              initialRedes={section.redes.map((r: { id: string; nombre: string; url: string }) => ({
                id: r.id,
                nombre: r.nombre,
                url: r.url,
              }))}
            />
          </CardContent>
        </Card>
      </AdminForm>
    </div>
  );
}
