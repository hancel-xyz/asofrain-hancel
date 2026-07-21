import { getEstructura } from "@/lib/data";
import { updateNosotrosHistoria } from "../actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { AdminForm } from "@/components/AdminForm";

export default async function AdminNosotrosHistoriaPage() {
  const data = await getEstructura();
  if (!data) return <div>Error cargando datos</div>;
  const page = data.sitio.paginas.find((p: any) => p.id === "nosotros");
  if (!page) return <div>Página no encontrada</div>;
  const section = page.secciones.historia;

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Nosotros - Historia</h1>
        <p className="text-muted-foreground">Administra la línea de tiempo de la historia.</p>
      </div>

      <AdminForm action={updateNosotrosHistoria} className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Título Principal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <Label htmlFor="titulo">Título <span className="font-normal text-muted-foreground text-xs">(Usa *asteriscos* para destacar una palabra)</span></Label>
              <Input id="titulo" name="titulo" defaultValue={section.titulo.valor} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Línea de Tiempo (Hitos)</CardTitle>
            <CardDescription>Edita los 4 hitos históricos de la organización.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            
            <div className="space-y-4 border p-4 rounded-lg">
              <h3 className="font-medium text-lg">Fila 1</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="f1_ano">Año / Texto breve</Label>
                  <Input id="f1_ano" name="f1_ano" defaultValue={section.filas[0]?.ano.valor} />
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="f1_titulo">Título del hito</Label>
                  <Input id="f1_titulo" name="f1_titulo" defaultValue={section.filas[0]?.titulo.valor} />
                </div>
                <div className="flex flex-col gap-3 md:col-span-2">
                  <Label htmlFor="f1_desc">Descripción</Label>
                  <Textarea id="f1_desc" name="f1_desc" defaultValue={section.filas[0]?.descripcion.valor} rows={2} />
                </div>
              </div>
            </div>

            <div className="space-y-4 border p-4 rounded-lg">
              <h3 className="font-medium text-lg">Fila 2</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="f2_ano">Año / Texto breve</Label>
                  <Input id="f2_ano" name="f2_ano" defaultValue={section.filas[1]?.ano.valor} />
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="f2_titulo">Título del hito</Label>
                  <Input id="f2_titulo" name="f2_titulo" defaultValue={section.filas[1]?.titulo.valor} />
                </div>
                <div className="flex flex-col gap-3 md:col-span-2">
                  <Label htmlFor="f2_desc">Descripción</Label>
                  <Textarea id="f2_desc" name="f2_desc" defaultValue={section.filas[1]?.descripcion.valor} rows={2} />
                </div>
              </div>
            </div>

            <div className="space-y-4 border p-4 rounded-lg">
              <h3 className="font-medium text-lg">Fila 3</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="f3_ano">Año / Texto breve</Label>
                  <Input id="f3_ano" name="f3_ano" defaultValue={section.filas[2]?.ano.valor} />
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="f3_titulo">Título del hito</Label>
                  <Input id="f3_titulo" name="f3_titulo" defaultValue={section.filas[2]?.titulo.valor} />
                </div>
                <div className="flex flex-col gap-3 md:col-span-2">
                  <Label htmlFor="f3_desc">Descripción</Label>
                  <Textarea id="f3_desc" name="f3_desc" defaultValue={section.filas[2]?.descripcion.valor} rows={2} />
                </div>
              </div>
            </div>

            <div className="space-y-4 border p-4 rounded-lg">
              <h3 className="font-medium text-lg">Fila 4</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="f4_ano">Año / Texto breve</Label>
                  <Input id="f4_ano" name="f4_ano" defaultValue={section.filas[3]?.ano.valor} />
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="f4_titulo">Título del hito</Label>
                  <Input id="f4_titulo" name="f4_titulo" defaultValue={section.filas[3]?.titulo.valor} />
                </div>
                <div className="flex flex-col gap-3 md:col-span-2">
                  <Label htmlFor="f4_desc">Descripción</Label>
                  <Textarea id="f4_desc" name="f4_desc" defaultValue={section.filas[3]?.descripcion.valor} rows={2} />
                </div>
              </div>
            </div>

          </CardContent>
        </Card>

        
      </AdminForm>
    </div>
  );
}
