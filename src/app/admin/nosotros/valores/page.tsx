import { getEstructura } from "@/lib/data";
import { updateNosotrosValores } from "../actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { AdminForm } from "@/components/AdminForm";

export default async function AdminNosotrosValoresPage() {
  const data = await getEstructura();
  if (!data) return <div>Error cargando datos</div>;
  const page = data.sitio.paginas.find((p: any) => p.id === "nosotros");
  if (!page) return <div>Página no encontrada</div>;
  const section = page.secciones.valores;

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Nosotros - Valores</h1>
        <p className="text-muted-foreground">Administra los 8 principios / valores de la organización.</p>
      </div>

      <AdminForm action={updateNosotrosValores} className="grid gap-6">
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
            <CardTitle>Cuadros de Valores</CardTitle>
            <CardDescription>Edita cada uno de los 8 principios (el número es automático).</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {section.cuadros.map((v: any) => (
              <div key={v.id} className="space-y-4 border p-4 rounded-lg relative">
                <div className="absolute top-4 right-4 text-muted-foreground font-bold"># {v.id}</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-3">
                    <Label htmlFor={`c${v.id}_titulo`}>Título del Valor</Label>
                    <Input id={`c${v.id}_titulo`} name={`c${v.id}_titulo`} defaultValue={v.titulo.valor} />
                  </div>
                  <div className="flex flex-col gap-3 md:col-span-2">
                    <Label htmlFor={`c${v.id}_desc`}>Descripción</Label>
                    <Textarea id={`c${v.id}_desc`} name={`c${v.id}_desc`} defaultValue={v.descripcion.valor} rows={2} />
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
