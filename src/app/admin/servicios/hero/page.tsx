import { getEstructura } from "@/lib/data";
import { updateServiciosHero } from "../actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AdminForm } from "@/components/AdminForm";
import { ImagenConEncuadreField } from "@/components/ImagenConEncuadreField";

export default async function AdminServiciosHeroPage() {
  const data = await getEstructura();
  if (!data) return <div>Error cargando datos</div>;

  const page = data.sitio.paginas.find((p: any) => p.id === "servicios");
  if (!page) return <div>Página no encontrada</div>;

  const section = page.secciones.hero;

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Servicios - hero</h1>
        <p className="text-muted-foreground">Administra el contenido de esta sección.</p>
      </div>

      <AdminForm action={updateServiciosHero} className="grid gap-6">
        
        <Card>
          <CardHeader>
            <CardTitle>Configuración General</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            
            <ImagenConEncuadreField
              name="imagen_fondo"
              label="Imagen de fondo"
              help="La foto ocupa toda la pantalla, así que se recorta según el tamaño del dispositivo. Marca a la derecha el punto que siempre debe verse."
              currentUrl={section.imagen_fondo?.valor}
              currentFocal={section.imagen_fondo?.encuadre}
              aspectClassName="aspect-[16/9]"
            />
            <div className="flex flex-col gap-3">
              <Label htmlFor="titulo">Titulo</Label>
              <Input id="titulo" name="titulo" defaultValue={section.titulo.valor} />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="descripcion">Descripcion</Label>
              <Textarea id="descripcion" name="descripcion" defaultValue={section.descripcion.valor} rows={4} />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="descripcion_2">Descripcion 2</Label>
              <Textarea id="descripcion_2" name="descripcion_2" defaultValue={section.descripcion_2.valor} rows={4} />
            </div>
          </CardContent>
        </Card>
        
      </AdminForm>
    </div>
  );
}
