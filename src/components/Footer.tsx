import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="px-4 pt-8 pb-4 bg-[#FAF8F5] font-sans">
      <div className="max-w-[1560px] mx-auto bg-[#1a2e21] text-[#FAF8F5] rounded-[32px] p-8 md:px-[60px] md:pt-[80px] md:pb-[40px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-[60px] pb-[50px] border-b border-[#FAF8F5]/10">
          
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Image 
                src="/logo-asofrain.png" 
                alt="ASOFRAIN Logo" 
                width={200} 
                height={56} 
                className="h-10 md:h-12 w-auto brightness-0 invert" 
                unoptimized
              />
            </div>
            <p className="text-[14px] leading-relaxed text-[#FAF8F5]/60 max-w-[340px] mb-6">
              Prestadores del servicio público de aprovechamiento en Suba, Engativá y Usaquén. Dignificando el oficio del recuperador ambiental desde 2006.
            </p>
            <div className="flex gap-2.5">
              <Link href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-[#FAF8F5]/10 flex items-center justify-center text-[#FAF8F5] font-instrument text-lg hover:bg-[#c8a875] hover:text-[#1a2e21] transition-colors">
                f
              </Link>
              <Link href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-[#FAF8F5]/10 flex items-center justify-center text-[#FAF8F5] font-instrument text-lg hover:bg-[#c8a875] hover:text-[#1a2e21] transition-colors">
                ig
              </Link>
            </div>
          </div>

          <div>
            <div className="text-[10px] tracking-widest text-[#c8a875] font-semibold mb-5">NAVEGACIÓN</div>
            <div className="flex flex-col gap-3 text-[14px]">
              <Link href="/" className="text-[#FAF8F5]/75 hover:text-[#FAF8F5] transition-colors">Inicio</Link>
              <Link href="/nosotros" className="text-[#FAF8F5]/75 hover:text-[#FAF8F5] transition-colors">Nosotros</Link>
              <Link href="/servicios" className="text-[#FAF8F5]/75 hover:text-[#FAF8F5] transition-colors">Servicios</Link>
              <Link href="/sensibilizacion" className="text-[#FAF8F5]/75 hover:text-[#FAF8F5] transition-colors">Sensibilización</Link>
              <Link href="/eventos" className="text-[#FAF8F5]/75 hover:text-[#FAF8F5] transition-colors">Eventos</Link>
              <Link href="/contacto" className="text-[#FAF8F5]/75 hover:text-[#FAF8F5] transition-colors">Contacto</Link>
            </div>
          </div>

          <div>
            <div className="text-[10px] tracking-widest text-[#c8a875] font-semibold mb-5">LEGAL</div>
            <div className="flex flex-col gap-3 text-[14px]">
              <Link href="/normatividad" className="text-[#FAF8F5]/75 hover:text-[#FAF8F5] transition-colors">Normatividad legal</Link>
              <Link href="/normatividad#ccu" className="text-[#FAF8F5]/75 hover:text-[#FAF8F5] transition-colors">Condiciones Uniformes</Link>
              <Link href="/normatividad#tarifa" className="text-[#FAF8F5]/75 hover:text-[#FAF8F5] transition-colors">Marco tarifario CRA 720</Link>
              <Link href="#" className="text-[#FAF8F5]/75 hover:text-[#FAF8F5] transition-colors">Tratamiento de datos</Link>
            </div>
          </div>

          <div>
            <div className="text-[10px] tracking-widest text-[#c8a875] font-semibold mb-5">ALIADOS</div>
            <div className="flex flex-col gap-3 text-[13px] text-[#FAF8F5]/65">
              <div>SSPD</div>
              <div>UAESP</div>
              <div>Alcaldías Locales</div>
              <div>CRA</div>
              <div>MinVivienda</div>
              <div>SDA</div>
            </div>
          </div>

          <div className="md:col-span-2 lg:col-span-1">
            <div className="text-[10px] tracking-widest text-[#c8a875] font-semibold mb-5">CONTACTO DIRECTO</div>
            <a href="mailto:asofrain.admi@gmail.com" className="block font-instrument text-[22px] text-[#FAF8F5] mb-4 break-all hover:text-[#c8a875] transition-colors">
              asofrain.admi<br/>@gmail.com
            </a>
            <a href="tel:+573225105246" className="block font-instrument text-[22px] text-[#FAF8F5] hover:text-[#c8a875] transition-colors">
              +57 322 510 5246
            </a>
          </div>
        </div>

        <div className="flex justify-between items-center pt-6 flex-wrap gap-5 text-center md:text-left">
          <div className="text-[12px] text-[#FAF8F5]/50 w-full md:w-auto">© 2026 ASOFRAIN E.S.P. · Todos los derechos reservados</div>
          <div className="text-[12px] text-[#FAF8F5]/50 w-full md:w-auto">
            Ingeniería digital por <a href="https://hansel.xyz" className="text-[#c8a875] hover:text-[#FAF8F5] transition-colors">hansel.xyz</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
