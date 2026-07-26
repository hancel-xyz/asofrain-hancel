import { getEstructura } from "@/lib/data";
import { updateServiciosRutasLocalidadesHorarios } from "../actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AdminForm } from "@/components/AdminForm";

export default async function AdminServiciosRutasLocalidadesHorariosPage() {
  const data = await getEstructura();
  if (!data) return <div>Error cargando datos</div>;

  const page = data.sitio.paginas.find((p: any) => p.id === "servicios");
  if (!page) return <div>Página no encontrada</div>;

  const section = page.secciones.rutas_localidades_horarios;

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Servicios - rutas localidades horarios</h1>
        <p className="text-muted-foreground">Administra el contenido de esta sección.</p>
      </div>

      <AdminForm action={updateServiciosRutasLocalidadesHorarios} className="grid gap-6">
        
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
              <Input id="descripcion" name="descripcion" defaultValue={section.descripcion.valor} />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>TABLA</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {section.tabla.filas.map((item: any, i: number) => (
              <div key={item.id} className="p-4 border rounded-lg space-y-4">
                <h4 className="font-medium">Item {i + 1}</h4>
                <input type="hidden" name="tabla_id" value={item.id} />
                
            <div className="flex flex-col gap-3">
              <Label htmlFor={`${item.id}_localidad`}>Localidad</Label>
              <Input id={`${item.id}_localidad`} name={`${item.id}_localidad`} defaultValue={item.localidad.valor} />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor={`${item.id}_dias`}>Dias</Label>
              <Input id={`${item.id}_dias`} name={`${item.id}_dias`} defaultValue={item.dias.valor} />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor={`${item.id}_horario`}>Horario</Label>
              <Input id={`${item.id}_horario`} name={`${item.id}_horario`} defaultValue={item.horario.valor} />
            </div>
            <div className="flex items-center gap-2 pt-2">
              <input
                id={`${item.id}_activa`}
                name={`${item.id}_activa`}
                type="checkbox"
                defaultChecked={item.estado?.activa !== false}
                className="h-4 w-4"
              />
              <Label htmlFor={`${item.id}_activa`}>Ruta activa</Label>
            </div>
              </div>
            ))}
          </CardContent>
        </Card>
      
      </AdminForm>
    </div>
  );
}
