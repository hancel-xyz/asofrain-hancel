import { getEstructura } from "@/lib/data";
import { updateServiciosServicios } from "../actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AdminForm } from "@/components/AdminForm";
import { ImagenConEncuadreField } from "@/components/ImagenConEncuadreField";

export default async function AdminServiciosServiciosPage() {
  const data = await getEstructura();
  if (!data) return <div>Error cargando datos</div>;

  const page = data.sitio.paginas.find((p: any) => p.id === "servicios");
  if (!page) return <div>Página no encontrada</div>;

  const section = page.secciones.servicios;

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Servicios - servicios</h1>
        <p className="text-muted-foreground">Administra el contenido de esta sección.</p>
      </div>

      <AdminForm action={updateServiciosServicios} className="grid gap-6">
        
        <Card>
          <CardHeader>
            <CardTitle>Configuración General</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            
            <div className="flex flex-col gap-3">
              <Label htmlFor="titulo">Titulo</Label>
              <Input id="titulo" name="titulo" defaultValue={section.titulo.valor} />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Procesos</CardTitle>
            <CardDescription>
              Cada proceso se muestra en la página con un ícono automático (según el título), su imagen y su
              descripción.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {section.items.map((item: any, i: number) => (
              <div key={item.id} className="p-4 border rounded-lg space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-muted text-xs font-semibold">
                    {i + 1}
                  </span>
                  Proceso
                </h4>
                <input type="hidden" name="items_id" value={item.id} />

                <div className="flex flex-col gap-3">
                  <Label htmlFor={`${item.id}_titulo`}>Titulo</Label>
                  <Input id={`${item.id}_titulo`} name={`${item.id}_titulo`} defaultValue={item.titulo.valor} />
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor={`${item.id}_descripcion`}>Descripcion</Label>
                  <Textarea id={`${item.id}_descripcion`} name={`${item.id}_descripcion`} defaultValue={item.descripcion.valor} rows={4} />
                </div>

                <ImagenConEncuadreField
                  name={`${item.id}_imagen`}
                  label="Imagen del proceso"
                  help="Se muestra junto al proceso en la página pública. Formato horizontal recomendado."
                  currentUrl={item.imagen?.valor}
                  currentFocal={item.imagen?.encuadre}
                  aspectClassName="aspect-[4/3]"
                />
              </div>
            ))}
          </CardContent>
        </Card>
      
      </AdminForm>
    </div>
  );
}
