"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ImageSlot } from "@/components/ImageSlot";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export type ActiveRoute = "inicio" | "nosotros" | "servicios" | "sensibilizacion" | "eventos" | "contacto" | "solicitar" | "";

// Routes with a full-bleed photo hero at the very top (dark enough for a
// transparent white-text header). Routes without one (sensibilizacion,
// eventos, solicitar — text-only headers) are omitted, so the header
// stays solid there since there's no hero to float over.
const ROUTES_WITH_HERO = new Set<ActiveRoute>(["inicio", "nosotros", "servicios"]);

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
  const solid = isScrolled || !ROUTES_WITH_HERO.has(active);
  // Every hero (photo-backed) reads dark at the top, so the transparent
  // header is always white text; it only switches to dark text once it
  // solidifies to a white bar.
  const onDark = !solid;

  const navTextClass = onDark ? "text-white/80 hover:text-white" : "text-[#111111]/65 hover:text-[#111111]";
  const navActiveClass = onDark ? "text-white" : "text-[#111111]";

  const getLinkClasses = (route: ActiveRoute) => cn(
    "text-[14px] transition-colors flex items-center gap-1.5",
    isActive(route) ? cn("font-semibold", navActiveClass) : cn("font-medium", navTextClass)
  );

  return (
    <>
      <div
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] font-sans transition-all duration-300",
          solid ? "bg-white/90 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.06)] py-3 md:py-4" : "bg-transparent py-6 md:py-8"
        )}
      >
        <div className="px-6 md:px-12 lg:px-[100px] max-w-[1600px] mx-auto flex items-center justify-between">

          <Link href="/" className="flex items-center rounded-2xl bg-white px-3.5 py-2 md:px-4 md:py-2.5 shadow-sm">
            <Image
              src="/logo-asofrain.png"
              alt="ASOFRAIN Logo"
              width={160}
              height={45}
              className="h-7 md:h-8 w-auto"
              priority
              unoptimized
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-9">
            <Link href="/" className={getLinkClasses("inicio")}>
              Inicio
            </Link>

            <div className="relative group">
              <Link href="/nosotros" className={getLinkClasses("nosotros")}>
                Nosotros
              </Link>
              <div className="absolute top-[calc(100%+20px)] left-1/2 -translate-x-1/2 hidden group-hover:flex flex-row gap-3.5 bg-white rounded-[22px] p-5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.25)] w-[720px]">
                <Link href="/nosotros#quienes-somos" className="flex-1 text-left text-[#111111] hover:opacity-80 transition-opacity">
                  <div className="w-full aspect-square rounded-[14px] overflow-hidden bg-gradient-to-br from-[#62AF9D] to-[#3d7a6d] relative">
                    <ImageSlot placeholder="Foto equipo ASOFRAIN" className="absolute inset-0 bg-transparent text-white/70" />
                  </div>
                  <div className="mt-3 text-[14px] font-semibold">Quiénes somos</div>
                </Link>
                <Link href="/nosotros#historia" className="flex-1 text-left text-[#111111] hover:opacity-80 transition-opacity">
                  <div className="w-full aspect-square rounded-[14px] overflow-hidden bg-gradient-to-br from-[#111111] to-[#3d7a6d] relative">
                    <ImageSlot placeholder="Historia" className="absolute inset-0 bg-transparent text-white/70" />
                  </div>
                  <div className="mt-3 text-[14px] font-semibold">Historia</div>
                </Link>
                <Link href="/nosotros#valores" className="flex-1 text-left text-[#111111] hover:opacity-80 transition-opacity">
                  <div className="w-full aspect-square rounded-[14px] overflow-hidden bg-gradient-to-br from-[#3d7a6d] to-[#111111] relative">
                    <ImageSlot placeholder="Valores" className="absolute inset-0 bg-transparent text-white/70" />
                  </div>
                  <div className="mt-3 text-[14px] font-semibold">Valores y aliados</div>
                </Link>
              </div>
            </div>

            <div className="relative group">
              <Link href="/servicios" className={getLinkClasses("servicios")}>
                Servicios
              </Link>
              <div className="absolute top-[calc(100%+20px)] left-1/2 -translate-x-1/2 hidden group-hover:flex flex-row gap-3.5 bg-white rounded-[22px] p-5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.25)] w-[840px]">
                <Link href="/servicios#descripcion" className="flex-1 text-left text-[#111111] hover:opacity-80 transition-opacity">
                  <div className="w-full aspect-square rounded-[14px] overflow-hidden relative bg-gradient-to-br from-[#62AF9D] to-[#4d9686]">
                    <ImageSlot placeholder="Descripción de servicios" className="absolute inset-0 bg-transparent text-white/70" />
                  </div>
                  <div className="mt-3 text-[14px] font-semibold">Descripción</div>
                </Link>
                <Link href="/servicios#rutas" className="flex-1 text-left text-[#111111] hover:opacity-80 transition-opacity">
                  <div className="w-full aspect-square rounded-[14px] overflow-hidden relative bg-gradient-to-br from-[#111111] to-[#3d7a6d]">
                    <ImageSlot placeholder="Rutas y horarios" className="absolute inset-0 bg-transparent text-white/70" />
                  </div>
                  <div className="mt-3 text-[14px] font-semibold">Rutas y horarios</div>
                </Link>
                <Link href="/servicios#sectores" className="flex-1 text-left text-[#111111] hover:opacity-80 transition-opacity">
                  <div className="w-full aspect-square rounded-[14px] overflow-hidden relative bg-gradient-to-br from-[#4d9686] to-[#111111]">
                    <ImageSlot placeholder="Sectores atendidos" className="absolute inset-0 bg-transparent text-white/70" />
                  </div>
                  <div className="mt-3 text-[14px] font-semibold">Sectores</div>
                </Link>
                <Link href="/servicios#tarifa" className="flex-1 text-left text-[#111111] hover:opacity-80 transition-opacity">
                  <div className="w-full aspect-square rounded-[14px] overflow-hidden relative bg-gradient-to-br from-[#62AF9D] to-[#111111]">
                    <ImageSlot placeholder="Tarifa" className="absolute inset-0 bg-transparent text-white/70" />
                  </div>
                  <div className="mt-3 text-[14px] font-semibold">Tarifa y productos</div>
                </Link>
              </div>
            </div>

            <div className="relative group">
              <button type="button" className={getLinkClasses("")}>
                Iniciativas
              </button>
              <div className="absolute top-[calc(100%+20px)] left-1/2 -translate-x-1/2 hidden group-hover:flex flex-row gap-3.5 bg-white rounded-[22px] p-5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.25)] w-[560px]">
                <Link href="/sensibilizacion" className="flex-1 text-left text-[#111111] hover:opacity-80 transition-opacity">
                  <div className="w-full aspect-square rounded-[14px] overflow-hidden relative bg-gradient-to-br from-[#62AF9D] to-[#111111]">
                    <ImageSlot placeholder="Campañas" className="absolute inset-0 bg-transparent text-white/70" />
                  </div>
                  <div className="mt-3 text-[14px] font-semibold">Sensibilización</div>
                </Link>
                <Link href="/eventos" className="flex-1 text-left text-[#111111] hover:opacity-80 transition-opacity">
                  <div className="w-full aspect-square rounded-[14px] overflow-hidden relative bg-gradient-to-br from-[#111111] to-[#4d9686]">
                    <ImageSlot placeholder="Institucionales" className="absolute inset-0 bg-transparent text-white/70" />
                  </div>
                  <div className="mt-3 text-[14px] font-semibold">Eventos</div>
                </Link>
              </div>
            </div>

            <div className={cn("h-4 w-px", onDark ? "bg-white/25" : "bg-black/15")} />

            <Link
              href="/solicitar"
              className={cn(
                "inline-flex px-[22px] py-[10px] text-[13.5px] font-semibold rounded-full transition-colors hover:bg-[#62AF9D] hover:text-[#111111]",
                onDark ? "bg-white text-[#111111]" : "bg-[#111111] text-white"
              )}
            >
              Solicitar servicio
            </Link>
          </nav>

          <button
            className={cn("lg:hidden p-2 rounded-full transition-colors focus:outline-none", onDark ? "text-white hover:bg-white/10" : "text-[#111111] hover:bg-black/[0.04]")}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[90] bg-white pt-[110px] px-6 pb-6 overflow-y-auto lg:hidden">
          <nav className="flex flex-col gap-4 text-lg">
            <Link
              href="/"
              className={cn("p-4 rounded-xl", isActive("inicio") ? "bg-[#62AF9D]/12 font-bold text-[#111111]" : "font-medium text-[#111111]/75")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link
              href="/nosotros"
              className={cn("p-4 rounded-xl", isActive("nosotros") ? "bg-[#62AF9D]/12 font-bold text-[#111111]" : "font-medium text-[#111111]/75")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Nosotros
            </Link>
            <Link
              href="/servicios"
              className={cn("p-4 rounded-xl", isActive("servicios") ? "bg-[#62AF9D]/12 font-bold text-[#111111]" : "font-medium text-[#111111]/75")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Servicios
            </Link>
            <Link
              href="/sensibilizacion"
              className={cn("p-4 rounded-xl", isActive("sensibilizacion") ? "bg-[#62AF9D]/12 font-bold text-[#111111]" : "font-medium text-[#111111]/75")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sensibilización
            </Link>
            <Link
              href="/eventos"
              className={cn("p-4 rounded-xl", isActive("eventos") ? "bg-[#62AF9D]/12 font-bold text-[#111111]" : "font-medium text-[#111111]/75")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Eventos
            </Link>
            <Link
              href="/solicitar"
              className="mt-4 px-6 py-4 text-center font-semibold bg-[#111111] text-white rounded-full hover:bg-[#62AF9D] hover:text-[#111111] transition-colors"
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
