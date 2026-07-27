import Link from "next/link";
import Image from "next/image";
import { getEstructura } from "@/lib/data";
import { isRealImageUrl } from "@/components/ImageSlot";

export async function Footer() {
  const data = await getEstructura();
  const page = data?.sitio.paginas.find((p: any) => p.id === "footer");
  const fondoUrl = page?.secciones?.fondo?.imagen_fondo?.valor;
  const hasImage = isRealImageUrl(fondoUrl);

  const descripcion = page?.secciones?.general?.descripcion?.valor || "";
  const redes: { id: string; nombre: string; url: string }[] = page?.secciones?.general?.redes ?? [];
  const email = page?.secciones?.contacto?.email?.valor || "";
  const telefono = page?.secciones?.contacto?.telefono?.valor || "";
  const telefonoHref = telefono.replace(/[^\d+]/g, "");
  const [emailUser, emailDomain] = email.split("@");

  const nosotrosPage = data?.sitio.paginas.find((p: any) => p.id === "nosotros");
  const aliados: { id: string; titulo: { valor: string } }[] = nosotrosPage?.secciones?.entidades_aliadas?.aliados ?? [];

  const documentosPage = data?.sitio.paginas.find((p: any) => p.id === "documentos");
  const documentos: { id: string; titulo: string; url: string }[] = (documentosPage?.secciones?.lista?.documentos ?? []).filter(
    (d: any) => d.titulo && d.url
  );

  const text70 = hasImage ? "text-white/70 hover:text-white" : "text-[#111111]/70 hover:text-[#111111]";
  const text60 = hasImage ? "text-white/60" : "text-[#111111]/60";
  const text50 = hasImage ? "text-white/50" : "text-[#111111]/50";
  const textBase = hasImage ? "text-white hover:text-[#62AF9D]" : "text-[#111111] hover:text-[#62AF9D]";
  const iconBtn = hasImage
    ? "bg-white/10 border-white/20 text-white hover:bg-[#62AF9D] hover:border-[#62AF9D]"
    : "bg-white border-black/[0.08] text-[#111111] hover:bg-[#62AF9D] hover:border-[#62AF9D]";

  return (
    <footer className="px-4 pt-8 pb-4 bg-white font-sans">
      <div
        className={`relative isolate max-w-[1560px] mx-auto rounded-[32px] p-8 md:px-[60px] md:pt-[80px] md:pb-[40px] overflow-hidden ${
          hasImage ? "text-white" : "bg-white border border-black/[0.08] text-[#111111]"
        }`}
      >
        {hasImage && (
          <>
            <Image src={fondoUrl} alt="" fill unoptimized className="object-cover object-center -z-20" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/60 to-black/40 pointer-events-none"></div>
          </>
        )}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-[60px] pb-[50px] border-b ${hasImage ? "border-white/20" : "border-black/[0.08]"}`}>

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
            {descripcion && (
              <p className={`text-[14px] leading-relaxed max-w-[340px] mb-6 ${text60}`}>
                {descripcion}
              </p>
            )}
            {redes.length > 0 && (
              <div className="flex gap-2.5">
                {redes.map((red) => (
                  <Link
                    key={red.id}
                    href={red.url || "#"}
                    target={red.url ? "_blank" : undefined}
                    rel={red.url ? "noopener noreferrer" : undefined}
                    aria-label={red.nombre}
                    className={`w-10 h-10 rounded-full border flex items-center justify-center font-semibold text-sm transition-colors uppercase ${iconBtn}`}
                  >
                    {red.nombre.slice(0, 2)}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="text-[10px] tracking-widest text-[#62AF9D] font-semibold mb-5">NAVEGACIÓN</div>
            <div className="flex flex-col gap-3 text-[14px]">
              <Link href="/" className={`transition-colors ${text70}`}>Inicio</Link>
              <Link href="/nosotros" className={`transition-colors ${text70}`}>Nosotros</Link>
              <Link href="/servicios" className={`transition-colors ${text70}`}>Servicios</Link>
              <Link href="/sensibilizacion" className={`transition-colors ${text70}`}>Sensibilización</Link>
              <Link href="/eventos" className={`transition-colors ${text70}`}>Eventos</Link>
            </div>
          </div>

          {documentos.length > 0 && (
            <div>
              <div className="text-[10px] tracking-widest text-[#62AF9D] font-semibold mb-5">LEGAL</div>
              <div className="flex flex-col gap-3 text-[14px]">
                {documentos.map((doc) => (
                  <a key={doc.id} href={doc.url} target="_blank" rel="noopener noreferrer" className={`transition-colors ${text70}`}>
                    {doc.titulo}
                  </a>
                ))}
              </div>
            </div>
          )}

          <div>
            <div className="text-[10px] tracking-widest text-[#62AF9D] font-semibold mb-5">ALIADOS</div>
            <div className={`flex flex-col gap-3 text-[13px] ${text60}`}>
              {aliados.map((aliado) => (
                <div key={aliado.id}>{aliado.titulo.valor.replace(/\*/g, "")}</div>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 lg:col-span-1">
            <div className="text-[10px] tracking-widest text-[#62AF9D] font-semibold mb-5">CONTACTO DIRECTO</div>
            {email && (
              <a href={`mailto:${email}`} className={`block font-semibold text-[18px] mb-4 break-all transition-colors ${textBase}`}>
                {emailDomain ? <>{emailUser}<br />@{emailDomain}</> : email}
              </a>
            )}
            {telefono && (
              <a href={`tel:${telefonoHref}`} className={`block font-semibold text-[18px] transition-colors ${textBase}`}>
                {telefono}
              </a>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center pt-6 flex-wrap gap-5 text-center md:text-left">
          <div className={`text-[12px] w-full md:w-auto ${text50}`}>© 2026 ASOFRAIN E.S.P. · Todos los derechos reservados</div>
          <div className={`text-[12px] w-full md:w-auto ${text50}`}>
            Desarrollado por <a href="https://hansel.xyz" className={`text-[#62AF9D] transition-colors ${hasImage ? "hover:text-white" : "hover:text-[#111111]"}`}>Hancel.xyz</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
