import { getEstructura } from "@/lib/data";
import { updateNosotrosMision } from "../actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { AdminForm } from "@/components/AdminForm";

export default async function AdminNosotrosMisionPage() {
  const data = await getEstructura();
  if (!data) return <div>Error cargando datos</div>;
  const page = data.sitio.paginas.find((p: any) => p.id === "nosotros");
  if (!page) return <div>Página no encontrada</div>;
  const section = page.secciones.mision;

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Nosotros - Misión</h1>
        <p className="text-muted-foreground">Administra el texto de la Misión.</p>
      </div>

      <AdminForm action={updateNosotrosMision} className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Misión</CardTitle>
            <CardDescription>Edita la descripción principal.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea 
                id="descripcion" name="descripcion" 
                defaultValue={section.descripcion.valor}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        
      </AdminForm>
    </div>
  );
}
