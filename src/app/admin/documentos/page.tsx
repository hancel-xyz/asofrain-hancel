import { getEstructura } from "@/lib/data";
import { updateDocumentosLista } from "./actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminForm } from "@/components/AdminForm";
import { DocumentosEditor } from "./DocumentosEditor";

export default async function AdminDocumentosPage() {
  const data = await getEstructura();
  if (!data) return <div>Error cargando datos</div>;

  const page = data.sitio.paginas.find((p: { id: string }) => p.id === "documentos");
  if (!page) return <div>Página no encontrada</div>;

  const section = page.secciones.lista;

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Documentos</h1>
        <p className="text-muted-foreground">
          Sube documentos PDF (normatividad, condiciones, políticas...). Aparecen en la sección LEGAL
          del footer del sitio; al hacer clic se abren en una pestaña nueva.
        </p>
      </div>

      <AdminForm action={updateDocumentosLista} className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Documentos</CardTitle>
            <CardDescription>Agrega, edita o elimina los documentos publicados en el sitio.</CardDescription>
          </CardHeader>
          <CardContent>
            <DocumentosEditor
              key={section.documentos.map((d: { id: string; url: string }) => `${d.id}:${d.url}`).join("|")}
              initialDocumentos={section.documentos.map((d: { id: string; titulo: string; url: string; key?: string }) => ({
                id: d.id,
                titulo: d.titulo,
                url: d.url,
                key: d.key,
              }))}
            />
          </CardContent>
        </Card>
      </AdminForm>
    </div>
  );
}
