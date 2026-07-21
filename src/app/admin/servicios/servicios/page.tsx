import { getEstructura } from "@/lib/data";
import { updateServiciosServicios } from "../actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AdminForm } from "@/components/AdminForm";

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
            <CardTitle>ITEMS</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {section.items.map((item: any, i: number) => (
              <div key={item.id} className="p-4 border rounded-lg space-y-4">
                <h4 className="font-medium">Item {i + 1}</h4>
                <input type="hidden" name="items_id" value={item.id} />
                
            <div className="flex flex-col gap-3">
              <Label htmlFor={`${item.id}_titulo`}>Titulo</Label>
              <Input id={`${item.id}_titulo`} name={`${item.id}_titulo`} defaultValue={item.titulo.valor} />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor={`${item.id}_descripcion`}>Descripcion</Label>
              <Textarea id={`${item.id}_descripcion`} name={`${item.id}_descripcion`} defaultValue={item.descripcion.valor} rows={4} />
            </div>
              </div>
            ))}
          </CardContent>
        </Card>
      
      </AdminForm>
    </div>
  );
}
