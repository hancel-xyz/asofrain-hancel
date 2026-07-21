import { getEstructura } from "@/lib/data";
import { updateNosotrosEntidadesAliadas } from "../actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { AdminForm } from "@/components/AdminForm";
import { PlusIcon, TrashIcon } from "lucide-react";

export default async function AdminNosotrosEntidadesAliadasPage() {
  const data = await getEstructura();
  if (!data) return <div>Error cargando datos</div>;
  const page = data.sitio.paginas.find((p: any) => p.id === "nosotros");
  if (!page) return <div>Página no encontrada</div>;
  const section = page.secciones.entidades_aliadas;

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Nosotros - Entidades Aliadas</h1>
        <p className="text-muted-foreground">Administra la sección de entidades aliadas (permite agregar más entidades).</p>
      </div>

      <AdminForm action={updateNosotrosEntidadesAliadas} className="grid gap-6">
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
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Entidades</CardTitle>
              <CardDescription>Edita los aliados actuales o agrega nuevos.</CardDescription>
            </div>
            <Button size="sm" className="gap-2">
              <PlusIcon className="w-4 h-4" />
              Agregar Entidad
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {section.aliados.map((a: any, i: number) => (
              <div key={a.id} className="space-y-4 border p-4 rounded-lg relative">
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button variant="ghost" size="icon" className="text-destructive h-8 w-8">
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
                <h3 className="font-medium text-lg">Aliado {i + 1}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-3 md:col-span-2">
                    <Label htmlFor={`a_${a.id.replace("aliado_", "")}_logo`}>Logo Entidad</Label>
                    <Input id={`a_${a.id.replace("aliado_", "")}_logo`} name={`a_${a.id.replace("aliado_", "")}_logo`} type="file" accept="image/*" />
                    <p className="text-xs text-muted-foreground">Actual: {a.logo.valor}</p>
                  </div>
                  <div className="flex flex-col gap-3 md:col-span-2">
                    <Label htmlFor={`a_${a.id.replace("aliado_", "")}_titulo`}>Título / Nombre <span className="font-normal text-muted-foreground text-xs">(Usa *asteriscos* para destacar una palabra)</span></Label>
                    <Input id={`a_${a.id.replace("aliado_", "")}_titulo`} name={`a_${a.id.replace("aliado_", "")}_titulo`} defaultValue={a.titulo.valor} />
                  </div>
                  <div className="flex flex-col gap-3 md:col-span-2">
                    <Label htmlFor={`a_${a.id.replace("aliado_", "")}_desc`}>Descripción</Label>
                    <Textarea id={`a_${a.id.replace("aliado_", "")}_desc`} name={`a_${a.id.replace("aliado_", "")}_desc`} defaultValue={a.descripcion.valor} rows={2} />
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
