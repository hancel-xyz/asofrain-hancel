import { listPqrs } from "./actions";
import { PqrsList } from "./PqrsList";

export default async function AdminPqrsPage() {
  const items = await listPqrs();

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">PQRS</h1>
        <p className="text-muted-foreground">
          Peticiones, quejas, reclamos y sugerencias radicadas desde el footer del sitio. {items.length} en total.
        </p>
      </div>

      <PqrsList items={items} />
    </div>
  );
}
