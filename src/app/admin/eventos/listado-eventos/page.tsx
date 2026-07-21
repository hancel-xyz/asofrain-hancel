import { getEstructura } from "@/lib/data";
import { updateEventosListadoEventos } from "../actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AdminForm } from "@/components/AdminForm";
import { EventosCardsEditor } from "./EventosCardsEditor";

export default async function AdminEventosListadoEventosPage() {
  const data = await getEstructura();
  if (!data) return <div>Error cargando datos</div>;

  const page = data.sitio.paginas.find((p: any) => p.id === "eventos");
  if (!page) return <div>Página no encontrada</div>;

  const section = page.secciones.listado_eventos;

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Eventos - listado eventos</h1>
        <p className="text-muted-foreground">Administra el contenido de esta sección.</p>
      </div>

      <AdminForm action={updateEventosListadoEventos} className="grid gap-6">
        
        <Card>
          <CardHeader>
            <CardTitle>Configuración General</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            
            <div className="flex flex-col gap-3">
              <Label htmlFor="titulo">Titulo</Label>
              <Input id="titulo" name="titulo" defaultValue={section.titulo.valor} />
            </div>
            <div className="flex items-center gap-2 pt-2">
              <input
                id="filtro_por_ano_activo"
                name="filtro_por_ano_activo"
                type="checkbox"
                defaultChecked={section.filtro_por_ano?.activo}
                className="h-4 w-4"
              />
              <Label htmlFor="filtro_por_ano_activo">Mostrar filtro por año</Label>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="filtro_por_ano_valor_default">Etiqueta del filtro por defecto</Label>
              <Input id="filtro_por_ano_valor_default" name="filtro_por_ano_valor_default" defaultValue={section.filtro_por_ano?.valor_default} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Eventos</CardTitle>
            <CardDescription>Agrega, edita o elimina los eventos que se muestran en /eventos.</CardDescription>
          </CardHeader>
          <CardContent>
            <EventosCardsEditor
              // Remounts whenever the persisted card ids/photo urls change (e.g.
              // right after a save that uploaded something), discarding any
              // in-memory File objects so they can't be resubmitted on the next save.
              key={section.cards.map((item: any) => `${item.id}:${item.foto.url}`).join("|")}
              initialCards={section.cards.map((item: any) => ({
                id: item.id,
                fecha: item.fecha.valor,
                titulo: item.titulo.valor,
                fotoUrl: item.foto.url,
              }))}
            />
          </CardContent>
        </Card>
      
      </AdminForm>
    </div>
  );
}
