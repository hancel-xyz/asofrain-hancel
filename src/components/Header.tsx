"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ImageSlot } from "@/components/ImageSlot";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export type ActiveRoute = "inicio" | "nosotros" | "servicios" | "sensibilizacion" | "eventos" | "contacto" | "solicitar" | "";

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getActiveRoute = (): ActiveRoute => {
    if (pathname === "/") return "inicio";
    if (pathname.startsWith("/nosotros")) return "nosotros";
    if (pathname.startsWith("/servicios")) return "servicios";
    if (pathname.startsWith("/sensibilizacion")) return "sensibilizacion";
    if (pathname.startsWith("/eventos")) return "eventos";
    if (pathname.startsWith("/contacto")) return "contacto";
    if (pathname.startsWith("/solicitar")) return "solicitar";
    return "";
  };

  const active = getActiveRoute();
  const isActive = (route: ActiveRoute) => active === route;

  const getLinkClasses = (route: ActiveRoute) => cn(
    "px-5 py-2.5 text-[14px] rounded-[12px] transition-colors flex items-center gap-2",
    isActive(route) ? "font-bold bg-[#eae5d0] text-[#3d5f38]" : "font-medium bg-[#FAF8F5] text-[#3d5f38] hover:bg-[#eae5d0]"
  );

  return (
    <>
      <div className="fixed top-3 md:top-4 left-3 right-3 md:left-4 md:right-4 z-[100] font-sans pointer-events-none">
        <header className="pointer-events-auto flex items-center justify-between gap-[18px] px-4 md:px-6 py-2.5 md:py-3 bg-[#FAF8F5] border border-[#1a2e21]/10 rounded-[16px] md:rounded-[20px] shadow-[0_8px_30px_-12px_rgba(26,46,33,0.15)] max-w-[1440px] mx-auto">
          
          <Link href="/" className="flex items-center gap-2.5 text-[#3d5f38] px-2 py-1">
            <Image 
              src="/logo-asofrain.png" 
              alt="ASOFRAIN Logo" 
              width={160} 
              height={45} 
              className="h-9 md:h-10 w-auto" 
              priority
              unoptimized
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-1.5">
            <Link href="/" className={getLinkClasses("inicio")}>
              Inicio
            </Link>

            <div className="relative group">
              <Link href="/nosotros" className={getLinkClasses("nosotros")}>
                Nosotros
                <span className="text-[10px] opacity-70">▾</span>
              </Link>
              <div className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 hidden group-hover:flex flex-row gap-3.5 bg-[#FAF8F5] border border-[#1a2e21]/10 rounded-[22px] p-5 shadow-[0_24px_60px_-20px_rgba(26,46,33,0.25)] w-[720px]">
                <Link href="/nosotros#quienes-somos" className="flex-1 text-left text-[#3d5f38] hover:opacity-85 transition-opacity">
                  <div className="w-full aspect-square rounded-[14px] overflow-hidden bg-gradient-to-br from-[#c8a875] to-[#8a9584] relative">
                    <ImageSlot placeholder="Foto equipo ASOFRAIN" className="absolute inset-0 bg-transparent text-white/70" />
                  </div>
                  <div className="mt-3 text-[14px] font-semibold">Quiénes somos</div>
                </Link>
                <Link href="/nosotros#historia" className="flex-1 text-left text-[#3d5f38] hover:opacity-85 transition-opacity">
                  <div className="w-full aspect-square rounded-[14px] overflow-hidden bg-gradient-to-br from-[#5a8a4a] to-[#3d5f38] relative">
                    <ImageSlot placeholder="Historia" className="absolute inset-0 bg-transparent text-white/70" />
                  </div>
                  <div className="mt-3 text-[14px] font-semibold">Historia</div>
                </Link>
                <Link href="/nosotros#valores" className="flex-1 text-left text-[#3d5f38] hover:opacity-85 transition-opacity">
                  <div className="w-full aspect-square rounded-[14px] overflow-hidden bg-gradient-to-br from-[#1a2e21] to-[#3d5f38] relative">
                    <ImageSlot placeholder="Valores" className="absolute inset-0 bg-transparent text-white/70" />
                  </div>
                  <div className="mt-3 text-[14px] font-semibold">Valores y aliados</div>
                </Link>
              </div>
            </div>

            <div className="relative group">
              <Link href="/servicios" className={getLinkClasses("servicios")}>
                Servicios
                <span className="text-[10px] opacity-70">▾</span>
              </Link>
              <div className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 hidden group-hover:flex flex-row gap-3.5 bg-[#FAF8F5] border border-[#1a2e21]/10 rounded-[22px] p-5 shadow-[0_24px_60px_-20px_rgba(26,46,33,0.25)] w-[840px]">
                <Link href="/servicios#descripcion" className="flex-1 text-left text-[#3d5f38] hover:opacity-85 transition-opacity">
                  <div className="w-full aspect-square rounded-[14px] overflow-hidden relative bg-gradient-to-br from-[#c8a875] to-[#a58756]">
                    <ImageSlot placeholder="Descripción de servicios" className="absolute inset-0 bg-transparent text-white/70" />
                  </div>
                  <div className="mt-3 text-[14px] font-semibold">Descripción</div>
                </Link>
                <Link href="/servicios#rutas" className="flex-1 text-left text-[#3d5f38] hover:opacity-85 transition-opacity">
                  <div className="w-full aspect-square rounded-[14px] overflow-hidden relative bg-gradient-to-br from-[#5a8a4a] to-[#3d5f38]">
                    <ImageSlot placeholder="Rutas y horarios" className="absolute inset-0 bg-transparent text-white/70" />
                  </div>
                  <div className="mt-3 text-[14px] font-semibold">Rutas y horarios</div>
                </Link>
                <Link href="/servicios#sectores" className="flex-1 text-left text-[#3d5f38] hover:opacity-85 transition-opacity">
                  <div className="w-full aspect-square rounded-[14px] overflow-hidden relative bg-gradient-to-br from-[#8a9584] to-[#3d5f38]">
                    <ImageSlot placeholder="Sectores atendidos" className="absolute inset-0 bg-transparent text-white/70" />
                  </div>
                  <div className="mt-3 text-[14px] font-semibold">Sectores</div>
                </Link>
                <Link href="/servicios#tarifa" className="flex-1 text-left text-[#3d5f38] hover:opacity-85 transition-opacity">
                  <div className="w-full aspect-square rounded-[14px] overflow-hidden relative bg-gradient-to-br from-[#c8a875] to-[#3d5f38]">
                    <ImageSlot placeholder="Tarifa" className="absolute inset-0 bg-transparent text-white/70" />
                  </div>
                  <div className="mt-3 text-[14px] font-semibold">Tarifa y productos</div>
                </Link>
              </div>
            </div>

            <div className="relative group">
              <button
                type="button"
                className={cn(
                  "px-5 py-2.5 text-[14px] rounded-[12px] transition-colors flex items-center gap-2",
                  (isActive("sensibilizacion") || isActive("eventos"))
                    ? "font-bold bg-[#eae5d0] text-[#3d5f38]"
                    : "font-medium bg-[#FAF8F5] text-[#3d5f38] hover:bg-[#eae5d0]"
                )}
              >
                Iniciativas
                <span className="text-[10px] opacity-70">▾</span>
              </button>
              <div className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 hidden group-hover:flex flex-row gap-3.5 bg-[#FAF8F5] border border-[#1a2e21]/10 rounded-[22px] p-5 shadow-[0_24px_60px_-20px_rgba(26,46,33,0.25)] w-[560px]">
                <Link href="/sensibilizacion" className="flex-1 text-left text-[#3d5f38] hover:opacity-85 transition-opacity">
                  <div className="w-full aspect-square rounded-[14px] overflow-hidden relative bg-gradient-to-br from-[#5a8a4a] to-[#c8a875]">
                    <ImageSlot placeholder="Campañas" className="absolute inset-0 bg-transparent text-white/70" />
                  </div>
                  <div className="mt-3 text-[14px] font-semibold">Sensibilización</div>
                </Link>
                <Link href="/eventos" className="flex-1 text-left text-[#3d5f38] hover:opacity-85 transition-opacity">
                  <div className="w-full aspect-square rounded-[14px] overflow-hidden relative bg-gradient-to-br from-[#c8a875] to-[#8a9584]">
                    <ImageSlot placeholder="Institucionales" className="absolute inset-0 bg-transparent text-white/70" />
                  </div>
                  <div className="mt-3 text-[14px] font-semibold">Eventos</div>
                </Link>
              </div>
            </div>

          </nav>

          <div className="flex items-center gap-2">
            <Link href="/solicitar" className="hidden sm:inline-flex px-[22px] py-[11px] text-[13.5px] font-semibold bg-[#3d5f38] text-[#FAF8F5] rounded-[12px] hover:bg-[#1a2e21] transition-colors">
              Solicitar servicio
            </Link>
            
            <button 
              className="lg:hidden p-1.5 md:p-2 text-[#3d5f38] rounded-lg hover:bg-[#eae5d0] transition-colors focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </header>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[90] bg-[#FAF8F5] pt-[100px] px-6 pb-6 overflow-y-auto lg:hidden">
          <nav className="flex flex-col gap-4 text-lg">
            <Link 
              href="/" 
              className={cn("p-4 rounded-xl", isActive("inicio") ? "bg-[#eae5d0] font-bold text-[#3d5f38]" : "font-medium text-[#3d5f38]")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link 
              href="/nosotros" 
              className={cn("p-4 rounded-xl", isActive("nosotros") ? "bg-[#eae5d0] font-bold text-[#3d5f38]" : "font-medium text-[#3d5f38]")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Nosotros
            </Link>
            <Link 
              href="/servicios" 
              className={cn("p-4 rounded-xl", isActive("servicios") ? "bg-[#eae5d0] font-bold text-[#3d5f38]" : "font-medium text-[#3d5f38]")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Servicios
            </Link>
            <Link
              href="/sensibilizacion"
              className={cn("p-4 rounded-xl", isActive("sensibilizacion") ? "bg-[#eae5d0] font-bold text-[#3d5f38]" : "font-medium text-[#3d5f38]")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sensibilización
            </Link>
            <Link
              href="/eventos"
              className={cn("p-4 rounded-xl", isActive("eventos") ? "bg-[#eae5d0] font-bold text-[#3d5f38]" : "font-medium text-[#3d5f38]")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Eventos
            </Link>
            <Link 
              href="/solicitar" 
              className="mt-4 px-6 py-4 text-center font-semibold bg-[#3d5f38] text-[#FAF8F5] rounded-xl hover:bg-[#1a2e21] transition-colors sm:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Solicitar servicio
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
