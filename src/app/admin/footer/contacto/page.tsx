import { getEstructura } from "@/lib/data";
import { updateFooterContacto } from "../actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AdminForm } from "@/components/AdminForm";

export default async function AdminFooterContactoPage() {
  const data = await getEstructura();
  if (!data) return <div>Error cargando datos</div>;

  const page = data.sitio.paginas.find((p: { id: string }) => p.id === "footer");
  if (!page) return <div>Página no encontrada</div>;

  const section = page.secciones.contacto;

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Footer - Contacto</h1>
        <p className="text-muted-foreground">Administra el correo y el teléfono de contacto directo del footer.</p>
      </div>

      <AdminForm action={updateFooterContacto} className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Contacto directo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input id="email" name="email" type="email" defaultValue={section.email.valor} />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="telefono">Teléfono</Label>
              <Input id="telefono" name="telefono" defaultValue={section.telefono.valor} />
            </div>
          </CardContent>
        </Card>
      </AdminForm>
    </div>
  );
}
