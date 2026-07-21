import { getEstructura } from "@/lib/data";
import { updateInicioMetricas } from "../actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { AdminForm } from "@/components/AdminForm";

export default async function AdminInicioMetricasPage() {
  const data = await getEstructura();
  if (!data) return <div>Error cargando datos</div>;

  const page = data.sitio.paginas.find((p: any) => p.id === "inicio");
  if (!page) return <div>Página no encontrada</div>;

  const section = page.secciones.metricas;

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Inicio - Métricas</h1>
        <p className="text-muted-foreground">Administra los números e impacto de la organización.</p>
      </div>

      <AdminForm action={updateInicioMetricas} className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Textos Principales</CardTitle>
            <CardDescription>Configura los textos introductorios de la sección.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="dato_breve">Dato Breve (Tag)</Label>
              <Input id="dato_breve" name="dato_breve" defaultValue={section.dato_breve.valor} />
            </div>
            
            <div className="flex flex-col gap-3">
              <Label htmlFor="titulo_principal">Título principal <span className="font-normal text-muted-foreground text-xs">(Usa *asteriscos* para destacar una palabra)</span></Label>
              <Input id="titulo_principal" name="titulo_principal" defaultValue={section.titulo_principal.valor} />
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
            <CardTitle>Métricas Detalladas</CardTitle>
            <CardDescription>Los números que demuestran el impacto.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4 border p-4 rounded-lg">
              <h3 className="font-medium text-lg border-b pb-2">Métrica 1: Toneladas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="m1_numero">Número</Label>
                  <Input id="m1_numero" name="m1_numero" defaultValue={section.items[0]?.numero.valor} />
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="m1_desc">Texto descriptivo</Label>
                  <Input id="m1_desc" name="m1_desc" defaultValue={section.items[0]?.descripcion.texto.valor} />
                </div>
              </div>
            </div>

            <div className="space-y-4 border p-4 rounded-lg">
              <h3 className="font-medium text-lg border-b pb-2">Métrica 2: Localidades</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="m2_numero">Número</Label>
                  <Input id="m2_numero" name="m2_numero" defaultValue={section.items[1]?.numero.valor} />
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="m2_desc">Texto descriptivo</Label>
                  <Input id="m2_desc" name="m2_desc" defaultValue={section.items[1]?.descripcion.texto.valor} />
                </div>
              </div>
            </div>

            <div className="space-y-4 border p-4 rounded-lg">
              <h3 className="font-medium text-lg border-b pb-2">Métrica 3: ECAs Activas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="m3_numero">Número</Label>
                  <Input id="m3_numero" name="m3_numero" defaultValue={section.items[2]?.numero.valor} />
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="m3_desc">Texto descriptivo</Label>
                  <Input id="m3_desc" name="m3_desc" defaultValue={section.items[2]?.descripcion.texto.valor} />
                </div>
                <div className="flex flex-col gap-3 md:col-span-2">
                  <Label htmlFor="m3_eca_lista">Nombres de ECAs (separadas por coma)</Label>
                  <Input id="m3_eca_lista" name="m3_eca_lista" defaultValue={section.items[3]?.descripcion.items.valor.join(", ")} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        
      </AdminForm>
    </div>
  );
}
