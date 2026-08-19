import { getEstructura } from "@/lib/data";
import { updateInicioFrase, uploadInicioFraseFondo } from "../actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { AdminForm } from "@/components/AdminForm";
import { FondoMediaField } from "@/components/FondoMediaField";
import { leerFondo, OSCURIDAD_POR_DEFECTO } from "@/lib/fondo";

export default async function AdminInicioFrasePage() {
  const data = await getEstructura();
  if (!data) return <div>Error cargando datos</div>;

  const page = data.sitio.paginas.find((p: any) => p.id === "inicio");
  if (!page) return <div>Página no encontrada</div>;

  const section = page.secciones.frase;
  const fondo = leerFondo(section.fondo);

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Inicio - Frase</h1>
        <p className="text-muted-foreground">Administra la frase de cierre de la página de inicio.</p>
      </div>

      <AdminForm action={updateInicioFrase} className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Textos de la Frase</CardTitle>
            <CardDescription>Configura el pequeño título superior y la frase principal.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="titulo_pequeno">Título pequeño <span className="font-normal text-muted-foreground text-xs">(Usa *asteriscos* para destacar una palabra)</span></Label>
              <Input id="titulo_pequeno" name="titulo_pequeno" defaultValue={section.titulo_pequeno.valor} />
            </div>
            
            <div className="flex flex-col gap-3">
              <Label htmlFor="texto">Texto de la frase</Label>
              <Textarea 
                id="texto" 
                name="texto"
                defaultValue={section.texto.valor}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fondo de la sección</CardTitle>
            <CardDescription>
              La imagen o el video que se ve detrás de la frase. Si no subes nada, la sección usa el verde de la
              marca.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FondoMediaField
              name="fondo"
              subir={uploadInicioFraseFondo}
              currentUrl={fondo?.url}
              currentKey={fondo?.key}
              currentMime={fondo?.mime}
              currentEncuadre={fondo?.encuadre}
              currentOscuridad={fondo?.oscuridad ?? OSCURIDAD_POR_DEFECTO}
            />
          </CardContent>
        </Card>
      </AdminForm>
    </div>
  );
}
