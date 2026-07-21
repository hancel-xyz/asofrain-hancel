import { getEstructura } from "@/lib/data";
import { updateNosotrosQuienesSomos } from "../actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { AdminForm } from "@/components/AdminForm";

export default async function AdminNosotrosQuienesSomosPage() {
  const data = await getEstructura();
  if (!data) return <div>Error cargando datos</div>;
  const page = data.sitio.paginas.find((p: any) => p.id === "nosotros");
  if (!page) return <div>Página no encontrada</div>;
  const section = page.secciones.quienes_somos;

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Nosotros - Quiénes somos</h1>
        <p className="text-muted-foreground">Administra la sección "Quiénes somos".</p>
      </div>

      <AdminForm action={updateNosotrosQuienesSomos} className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Contenido Principal</CardTitle>
            <CardDescription>Edita el título y la descripción de la sección.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="titulo">Título <span className="font-normal text-muted-foreground text-xs">(Usa *asteriscos* para destacar una palabra)</span></Label>
              <Textarea 
                id="titulo" name="titulo" 
                defaultValue={section.titulo.valor}
                rows={2}
              />
            </div>
            
            <div className="flex flex-col gap-3">
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea 
                id="descripcion" name="descripcion" 
                defaultValue={section.descripcion.valor}
                rows={6}
              />
            </div>
          </CardContent>
        </Card>

        
      </AdminForm>
    </div>
  );
}
