import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="px-4 pt-8 pb-4 bg-white font-sans">
      <div className="max-w-[1560px] mx-auto bg-[#F2F9F7] text-[#111111] rounded-[32px] p-8 md:px-[60px] md:pt-[80px] md:pb-[40px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-[60px] pb-[50px] border-b border-black/[0.08]">

          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="/logo-asofrain.png"
                alt="ASOFRAIN Logo"
                width={200}
                height={56}
                className="h-10 md:h-12 w-auto"
                unoptimized
              />
            </div>
            <p className="text-[14px] leading-relaxed text-[#111111]/60 max-w-[340px] mb-6">
              Prestadores del servicio público de aprovechamiento en Suba, Engativá y Usaquén. Dignificando el oficio del recuperador ambiental desde 2006.
            </p>
            <div className="flex gap-2.5">
              <Link href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-white border border-black/[0.08] flex items-center justify-center text-[#111111] font-semibold text-sm hover:bg-[#62AF9D] hover:border-[#62AF9D] transition-colors">
                f
              </Link>
              <Link href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white border border-black/[0.08] flex items-center justify-center text-[#111111] font-semibold text-sm hover:bg-[#62AF9D] hover:border-[#62AF9D] transition-colors">
                ig
              </Link>
            </div>
          </div>

          <div>
            <div className="text-[10px] tracking-widest text-[#62AF9D] font-semibold mb-5">NAVEGACIÓN</div>
            <div className="flex flex-col gap-3 text-[14px]">
              <Link href="/" className="text-[#111111]/70 hover:text-[#111111] transition-colors">Inicio</Link>
              <Link href="/nosotros" className="text-[#111111]/70 hover:text-[#111111] transition-colors">Nosotros</Link>
              <Link href="/servicios" className="text-[#111111]/70 hover:text-[#111111] transition-colors">Servicios</Link>
              <Link href="/sensibilizacion" className="text-[#111111]/70 hover:text-[#111111] transition-colors">Sensibilización</Link>
              <Link href="/eventos" className="text-[#111111]/70 hover:text-[#111111] transition-colors">Eventos</Link>
              <Link href="/contacto" className="text-[#111111]/70 hover:text-[#111111] transition-colors">Contacto</Link>
            </div>
          </div>

          <div>
            <div className="text-[10px] tracking-widest text-[#62AF9D] font-semibold mb-5">LEGAL</div>
            <div className="flex flex-col gap-3 text-[14px]">
              <Link href="/normatividad" className="text-[#111111]/70 hover:text-[#111111] transition-colors">Normatividad legal</Link>
              <Link href="/normatividad#ccu" className="text-[#111111]/70 hover:text-[#111111] transition-colors">Condiciones Uniformes</Link>
              <Link href="/normatividad#tarifa" className="text-[#111111]/70 hover:text-[#111111] transition-colors">Marco tarifario CRA 720</Link>
              <Link href="#" className="text-[#111111]/70 hover:text-[#111111] transition-colors">Tratamiento de datos</Link>
            </div>
          </div>

          <div>
            <div className="text-[10px] tracking-widest text-[#62AF9D] font-semibold mb-5">ALIADOS</div>
            <div className="flex flex-col gap-3 text-[13px] text-[#111111]/60">
              <div>SSPD</div>
              <div>UAESP</div>
              <div>Alcaldías Locales</div>
              <div>CRA</div>
              <div>MinVivienda</div>
              <div>SDA</div>
            </div>
          </div>

          <div className="md:col-span-2 lg:col-span-1">
            <div className="text-[10px] tracking-widest text-[#62AF9D] font-semibold mb-5">CONTACTO DIRECTO</div>
            <a href="mailto:asofrain.admi@gmail.com" className="block font-semibold text-[18px] text-[#111111] mb-4 break-all hover:text-[#62AF9D] transition-colors">
              asofrain.admi<br/>@gmail.com
            </a>
            <a href="tel:+573225105246" className="block font-semibold text-[18px] text-[#111111] hover:text-[#62AF9D] transition-colors">
              +57 322 510 5246
            </a>
          </div>
        </div>

        <div className="flex justify-between items-center pt-6 flex-wrap gap-5 text-center md:text-left">
          <div className="text-[12px] text-[#111111]/50 w-full md:w-auto">© 2026 ASOFRAIN E.S.P. · Todos los derechos reservados</div>
          <div className="text-[12px] text-[#111111]/50 w-full md:w-auto">
            Ingeniería digital por <a href="https://hansel.xyz" className="text-[#62AF9D] hover:text-[#111111] transition-colors">hansel.xyz</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
