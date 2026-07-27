import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getEstructura } from "@/lib/data";

// Content lives in InsForge and can change at any time via the admin panel,
// so these pages must be rendered per-request rather than cached as static
// HTML at build time (otherwise admin edits would never show up until the
// next deploy).
export const dynamic = "force-dynamic";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getEstructura();
  const find = (id: string) => data?.sitio.paginas.find((p: any) => p.id === id)?.secciones?.menu_preview;
  const nosotrosMenu = find("nosotros");
  const serviciosMenu = find("servicios");
  const sensibilizacionMenu = find("sensibilizacion");
  const eventosMenu = find("eventos");

  const menuImages = {
    nosotros: {
      quienesSomos: nosotrosMenu?.quienes_somos?.valor || "",
      historia: nosotrosMenu?.historia?.valor || "",
      valores: nosotrosMenu?.valores?.valor || "",
    },
    servicios: {
      descripcion: serviciosMenu?.descripcion?.valor || "",
      rutas: serviciosMenu?.rutas?.valor || "",
      sectores: serviciosMenu?.sectores?.valor || "",
      tarifa: serviciosMenu?.tarifa?.valor || "",
    },
    sensibilizacion: sensibilizacionMenu?.imagen?.valor || "",
    eventos: eventosMenu?.imagen?.valor || "",
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header menuImages={menuImages} />
      <main className="flex-1 w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
}
