import { getEstructura } from "@/lib/data";
import { updateSensibilizacionTiposSensibilizacion } from "../actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminForm } from "@/components/AdminForm";
import { TiposEditor, type TipoData } from "./TiposEditor";

/* eslint-disable @typescript-eslint/no-explicit-any */

export default async function AdminSensibilizacionTiposSensibilizacionPage() {
  const data = await getEstructura();
  if (!data) return <div>Error cargando datos</div>;

  const page = data.sitio.paginas.find((p: any) => p.id === "sensibilizacion");
  if (!page) return <div>Página no encontrada</div>;

  const section = page.secciones.tipos_sensibilizacion;

  const tipos: TipoData[] = (section.tipos ?? []).map((item: any) => ({
    id: item.id,
    tipo: item.tipo.valor,
    titulo: item.titulo.valor,
    // The seeded content stores a placeholder string here until a real photo
    // is uploaded, which ImageSlot already renders as "no image".
    imagenUrl: item.imagen.valor,
    vinetas: (item.vinetas?.items ?? []).map((vineta: any) => ({ id: vineta.id, valor: vineta.valor })),
    galeria: (item.galeria ?? []).map((img: any) => ({
      id: img.id,
      url: img.url,
      alt: img.alt ?? "",
      key: img.key,
    })),
  }));

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Sensibilizacion - tipos sensibilizacion</h1>
        <p className="text-muted-foreground">Administra el contenido de esta sección.</p>
      </div>

      <AdminForm action={updateSensibilizacionTiposSensibilizacion} className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>TIPOS</CardTitle>
            <CardDescription>
              Crea los tipos de sensibilización que necesites. Cada uno tiene su portada, sus viñetas y su propia
              galería de fotos, que se ve en la página pública al abrir la tarjeta.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TiposEditor
              // Remounts whenever the persisted types/photos change (e.g. right
              // after a save that uploaded something), discarding any in-memory
              // File objects so they can't be resubmitted on the next save.
              key={tipos.map((t) => `${t.id}:${t.imagenUrl}:${t.galeria.length}`).join("|")}
              initialTipos={tipos}
            />
          </CardContent>
        </Card>
      </AdminForm>
    </div>
  );
}
