import { getEstructura } from "@/lib/data";
import { updateServiciosTarifasYProductos } from "../actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AdminForm } from "@/components/AdminForm";

export default async function AdminServiciosTarifasYProductosPage() {
  const data = await getEstructura();
  if (!data) return <div>Error cargando datos</div>;

  const page = data.sitio.paginas.find((p: any) => p.id === "servicios");
  if (!page) return <div>Página no encontrada</div>;

  const section = page.secciones.tarifas_y_productos;

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Servicios - tarifas y productos</h1>
        <p className="text-muted-foreground">Administra el contenido de esta sección.</p>
      </div>

      <AdminForm action={updateServiciosTarifasYProductos} className="grid gap-6">
        
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
            <div className="flex flex-col gap-3">
              <Label htmlFor="cta_texto">Cta - Texto</Label>
              <Input id="cta_texto" name="cta_texto" defaultValue={section.cta.texto} />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="cta_url">Cta - URL</Label>
              <Input id="cta_url" name="cta_url" defaultValue={section.cta.url} />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>PRODUCTOS APROVECHADOS</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {section.productos_aprovechados.items.map((item: any, i: number) => (
              <div key={item.id} className="p-4 border rounded-lg space-y-4">
                <h4 className="font-medium">Item {i + 1}</h4>
                <input type="hidden" name="productos_aprovechados_id" value={item.id} />
                
            <div className="flex flex-col gap-3">
              <Label htmlFor={`${item.id}_nombre`}>Nombre</Label>
              <Input id={`${item.id}_nombre`} name={`${item.id}_nombre`} defaultValue={item.nombre.valor} />
            </div>
              </div>
            ))}
          </CardContent>
        </Card>
      
      </AdminForm>
    </div>
  );
}
