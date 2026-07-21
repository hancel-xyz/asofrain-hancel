import { getEstructura } from "@/lib/data";
import { updateSensibilizacionEncabezado } from "../actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AdminForm } from "@/components/AdminForm";

export default async function AdminSensibilizacionEncabezadoPage() {
  const data = await getEstructura();
  if (!data) return <div>Error cargando datos</div>;

  const page = data.sitio.paginas.find((p: any) => p.id === "sensibilizacion");
  if (!page) return <div>Página no encontrada</div>;

  const section = page.secciones.encabezado;

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Sensibilizacion - encabezado</h1>
        <p className="text-muted-foreground">Administra el contenido de esta sección.</p>
      </div>

      <AdminForm action={updateSensibilizacionEncabezado} className="grid gap-6">
        
        <Card>
          <CardHeader>
            <CardTitle>Configuración General</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            
            <div className="flex flex-col gap-3">
              <Label htmlFor="titulo">Titulo</Label>
              <Input id="titulo" name="titulo" defaultValue={section.titulo.valor} />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="descripcion">Descripcion</Label>
              <Textarea id="descripcion" name="descripcion" defaultValue={section.descripcion.valor} rows={4} />
            </div>
          </CardContent>
        </Card>
        
      </AdminForm>
    </div>
  );
}
