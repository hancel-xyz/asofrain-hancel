import { getEstructura } from "@/lib/data";
import { updateSensibilizacionTiposSensibilizacion } from "../actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AdminForm } from "@/components/AdminForm";

export default async function AdminSensibilizacionTiposSensibilizacionPage() {
  const data = await getEstructura();
  if (!data) return <div>Error cargando datos</div>;

  const page = data.sitio.paginas.find((p: any) => p.id === "sensibilizacion");
  if (!page) return <div>Página no encontrada</div>;

  const section = page.secciones.tipos_sensibilizacion;

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Sensibilizacion - tipos sensibilizacion</h1>
        <p className="text-muted-foreground">Administra el contenido de esta sección.</p>
      </div>

      <AdminForm action={updateSensibilizacionTiposSensibilizacion} className="grid gap-6">
        
        
        <Card>
          <CardHeader>
            <CardTitle>TIPOS</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {section.tipos.map((item: any, i: number) => (
              <div key={item.id} className="p-4 border rounded-lg space-y-4">
                <h4 className="font-medium">Item {i + 1}</h4>
                <input type="hidden" name="tipos_id" value={item.id} />
                
            <div className="flex flex-col gap-3">
              <Label htmlFor={`${item.id}_imagen`}>Imagen</Label>
              <Input id={`${item.id}_imagen`} name={`${item.id}_imagen`} type="file" accept="image/*,video/*" />
              <p className="text-xs text-muted-foreground">Actual: {item.imagen.valor}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor={`${item.id}_tipo`}>Tipo</Label>
              <Input id={`${item.id}_tipo`} name={`${item.id}_tipo`} defaultValue={item.tipo.valor} />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor={`${item.id}_titulo`}>Titulo</Label>
              <Input id={`${item.id}_titulo`} name={`${item.id}_titulo`} defaultValue={item.titulo.valor} />
            </div>
            <div className="flex flex-col gap-3">
              <Label>Viñetas</Label>
              <div className="space-y-2">
                {item.vinetas.items.map((vineta: any, vi: number) => (
                  <div key={vineta.id} className="flex flex-col gap-1">
                    <Label htmlFor={`${item.id}_${vineta.id}`} className="text-xs text-muted-foreground">Viñeta {vi + 1}</Label>
                    <Input id={`${item.id}_${vineta.id}`} name={`${item.id}_${vineta.id}`} defaultValue={vineta.valor} />
                  </div>
                ))}
              </div>
            </div>
              </div>
            ))}
          </CardContent>
        </Card>
      
      </AdminForm>
    </div>
  );
}
