import { listSolicitudes } from "./actions";
import { SolicitudesList } from "./SolicitudesList";

export default async function AdminSolicitudesPage() {
  const solicitudes = await listSolicitudes();

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Solicitudes</h1>
        <p className="text-muted-foreground">
          Solicitudes de servicio enviadas desde /solicitar. {solicitudes.length} en total.
        </p>
      </div>

      <SolicitudesList solicitudes={solicitudes} />
    </div>
  );
}
