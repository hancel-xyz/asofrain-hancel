import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// Content lives in InsForge and can change at any time via the admin panel,
// so these pages must be rendered per-request rather than cached as static
// HTML at build time (otherwise admin edits would never show up until the
// next deploy).
export const dynamic = "force-dynamic";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
}
