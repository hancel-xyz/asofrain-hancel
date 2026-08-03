import { getEstructura } from "@/lib/data";
import { updateNosotrosHero } from "../actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { AdminForm } from "@/components/AdminForm";
import { ImagenConEncuadreField } from "@/components/ImagenConEncuadreField";

export default async function AdminNosotrosHeroPage() {
  const data = await getEstructura();
  if (!data) return <div>Error cargando datos</div>;
  const page = data.sitio.paginas.find((p: any) => p.id === "nosotros");
  if (!page) return <div>Página no encontrada</div>;
  const section = page.secciones.hero;

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Nosotros - Hero</h1>
        <p className="text-muted-foreground">Administra el contenido de la sección principal (Hero) de la página de Nosotros.</p>
      </div>

      <AdminForm action={updateNosotrosHero} className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Imagen de Fondo</CardTitle>
            <CardDescription>
              Sube la imagen que se mostrará de fondo en la sección Hero y elige qué zona debe quedar visible.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ImagenConEncuadreField
              name="imagen_fondo"
              label="Subir imagen"
              help="La foto ocupa toda la pantalla, así que se recorta según el tamaño del dispositivo. Marca a la derecha el punto que siempre debe verse."
              currentUrl={section.imagen_fondo?.valor}
              currentFocal={section.imagen_fondo?.encuadre}
              aspectClassName="aspect-[16/9]"
            />
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
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Call to Actions (CTA)</CardTitle>
            <CardDescription>Botones de acción principal del Hero.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4 border p-4 rounded-lg">
              <h3 className="font-medium">CTA 1</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="cta1_texto">Texto del botón</Label>
                  <Input id="cta1_texto" name="cta1_texto" defaultValue={section.cta_1?.texto} />
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="cta1_url">URL de destino</Label>
                  <Input id="cta1_url" name="cta1_url" defaultValue={section.cta_1?.url} />
                </div>
              </div>
            </div>

            <div className="space-y-4 border p-4 rounded-lg">
              <h3 className="font-medium">CTA 2</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="cta2_texto">Texto del botón</Label>
                  <Input id="cta2_texto" name="cta2_texto" defaultValue={section.cta_2?.texto} />
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="cta2_url">URL de destino</Label>
                  <Input id="cta2_url" name="cta2_url" defaultValue={section.cta_2?.url} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        
      </AdminForm>
    </div>
  );
}
