import { getEstructura } from "@/lib/data";
import { updateNosotrosEntidadesAliadas } from "../actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AdminForm } from "@/components/AdminForm";
import { AliadosEditor } from "./AliadosEditor";

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
          <CardHeader>
            <CardTitle>Entidades</CardTitle>
            <CardDescription>Edita los aliados actuales o agrega nuevos.</CardDescription>
          </CardHeader>
          <CardContent>
            <AliadosEditor
              // Remounts whenever the persisted aliado ids/logo urls change (e.g.
              // right after a save that uploaded something), discarding any
              // in-memory File objects so they can't be resubmitted on the next save.
              key={section.aliados.map((a: any) => `${a.id}:${a.logo.valor}`).join("|")}
              initialAliados={section.aliados.map((a: any) => ({
                id: a.id,
                logoUrl: a.logo.valor,
                titulo: a.titulo.valor,
                descripcion: a.descripcion.valor,
              }))}
            />
          </CardContent>
        </Card>
      </AdminForm>
    </div>
  );
}
