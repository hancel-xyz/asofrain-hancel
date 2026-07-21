import { getEstructura } from "@/lib/data";
import { updateSensibilizacionGaleria } from "../actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AdminForm } from "@/components/AdminForm";
import { GaleriaDropzone } from "./GaleriaDropzone";

export default async function AdminSensibilizacionGaleriaPage() {
  const data = await getEstructura();
  if (!data) return <div>Error cargando datos</div>;

  const page = data.sitio.paginas.find((p: any) => p.id === "sensibilizacion");
  if (!page) return <div>Página no encontrada</div>;

  const section = page.secciones.galeria;

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Sensibilizacion - galeria</h1>
        <p className="text-muted-foreground">Administra el contenido de esta sección.</p>
      </div>

      <AdminForm action={updateSensibilizacionGaleria} className="grid gap-6">
        
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
            <CardTitle>Imágenes</CardTitle>
            <CardDescription>Arrastra imágenes para agregarlas a la galería, o haz clic para elegirlas.</CardDescription>
          </CardHeader>
          <CardContent>
            <GaleriaDropzone
              // Remounts whenever the persisted image ids/urls change (e.g. right
              // after a save that uploaded something), discarding any in-memory
              // File objects so they can't be resubmitted on the next save.
              key={section.imagenes.map((item: { id: string; url: string }) => `${item.id}:${item.url}`).join("|")}
              initialImages={section.imagenes.map((item: { id: string; url: string; alt: string }) => ({
                id: item.id,
                url: item.url,
                alt: item.alt,
              }))}
            />
          </CardContent>
        </Card>
      
      </AdminForm>
    </div>
  );
}
