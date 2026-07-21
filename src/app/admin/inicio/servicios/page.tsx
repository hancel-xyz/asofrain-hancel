import { getEstructura } from "@/lib/data";
import { updateInicioServicios } from "../actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AdminForm } from "@/components/AdminForm";

export default async function AdminInicioServiciosPage() {
  const data = await getEstructura();
  if (!data) return <div>Error cargando datos</div>;

  const page = data.sitio.paginas.find((p: any) => p.id === "inicio");
  if (!page) return <div>Página no encontrada</div>;

  const section = page.secciones.servicios_vista_general;

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Inicio - Servicios</h1>
        <p className="text-muted-foreground">Administra el video institucional y la lista rápida de servicios.</p>
      </div>

      <AdminForm action={updateInicioServicios} className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Contenido Multimedia (Video/Imagen)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="media_file">Subir Archivo (Pendiente integración API)</Label>
              <Input id="media_file" name="media_file" type="file" accept="video/*,image/*" />
            </div>
            
            <div className="flex flex-col gap-3">
              <Label htmlFor="titulo_media">Título de la Media <span className="font-normal text-muted-foreground text-xs">(Usa *asteriscos* para destacar una palabra)</span></Label>
              <Input id="titulo_media" name="titulo_media" defaultValue={section.titulo_media.valor} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Servicios</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col gap-3">
              <Label htmlFor="servicios_titulo">Título de la sección <span className="font-normal text-muted-foreground text-xs">(Usa *asteriscos* para destacar una palabra)</span></Label>
              <Input id="servicios_titulo" name="servicios_titulo" defaultValue={section.servicios.titulo.valor} />
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Items de Servicios (Máximo 5 por diseño actual)</h3>
              
              {[0, 1, 2, 3, 4].map((idx) => {
                const s = section.servicios.cards[idx] || {};
                const sId = idx + 1;
                return (
                  <div key={idx} className="flex gap-4 items-center">
                    <span className="text-sm font-medium w-6 text-muted-foreground">{`0${sId}`}</span>
                    <Input name={`s${sId}_titulo`} defaultValue={s.titulo?.valor || ""} placeholder={`Título servicio ${sId}`} />
                  </div>
                );
              })}
            </div>

          </CardContent>
        </Card>

        
      </AdminForm>
    </div>
  );
}
