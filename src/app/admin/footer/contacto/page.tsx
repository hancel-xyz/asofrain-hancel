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
        <p className="text-muted-foreground">
          Administra los datos de contacto que aparecen en el footer del sitio. Los campos que dejes vacíos
          simplemente no se muestran.
        </p>
      </div>

      <AdminForm action={updateFooterContacto} className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Contacto directo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input id="email" name="email" type="email" defaultValue={section.email?.valor} />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="telefono">Teléfono</Label>
              <Input id="telefono" name="telefono" defaultValue={section.telefono?.valor} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ubicación y horario</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="direccion">Dirección</Label>
              <Input
                id="direccion"
                name="direccion"
                defaultValue={section.direccion?.valor}
                placeholder="Ej. Calle 128B # 58-30"
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="ciudad">Ciudad / localidad</Label>
              <Input
                id="ciudad"
                name="ciudad"
                defaultValue={section.ciudad?.valor}
                placeholder="Ej. Suba, Bogotá D.C."
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="horario">Horario de atención</Label>
              <Input
                id="horario"
                name="horario"
                defaultValue={section.horario?.valor}
                placeholder="Ej. Lunes a viernes · 7:00 a.m. – 5:00 p.m."
              />
            </div>
          </CardContent>
        </Card>
      </AdminForm>
    </div>
  );
}
