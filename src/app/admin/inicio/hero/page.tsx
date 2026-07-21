import { getEstructura } from "@/lib/data";
import { updateInicioHero } from "../actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { AdminForm } from "@/components/AdminForm";
import { redirect } from "next/navigation";

export default async function AdminInicioHeroPage() {
  const data = await getEstructura();
  if (!data) return <div>Error cargando datos</div>;

  const page = data.sitio.paginas.find((p: any) => p.id === "inicio");
  if (!page) return <div>Página no encontrada</div>;

  const section = page.secciones.hero;

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Inicio - Hero</h1>
        <p className="text-muted-foreground">Administra el contenido de la sección principal (Hero) de la página de inicio.</p>
      </div>

      <AdminForm action={updateInicioHero} className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Imagen de Fondo</CardTitle>
            <CardDescription>Sube la imagen que se mostrará de fondo en la sección Hero.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="imagen_fondo">Subir imagen (Pendiente de integrar API de subida)</Label>
              <Input id="imagen_fondo" name="imagen_fondo" type="file" accept="image/*" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Textos Principales</CardTitle>
            <CardDescription>Edita el título y la descripción principal.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="titulo">Título <span className="font-normal text-muted-foreground text-xs">(Usa *asteriscos* para destacar una palabra)</span></Label>
              <Textarea 
                id="titulo" 
                name="titulo"
                defaultValue={section.titulo.valor}
                rows={2}
              />
            </div>
            
            <div className="flex flex-col gap-3">
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea 
                id="descripcion" 
                name="descripcion"
                defaultValue={section.descripcion.valor}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Call to Action (CTA)</CardTitle>
            <CardDescription>Botón de acción principal del Hero.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="cta_texto">Texto del botón</Label>
                <Input id="cta_texto" name="cta_texto" defaultValue={section.cta.texto} />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="cta_url">URL de destino</Label>
                <Input id="cta_url" name="cta_url" defaultValue={section.cta.url} />
              </div>
            </div>
          </CardContent>
        </Card>

        
      </AdminForm>
    </div>
  );
}
