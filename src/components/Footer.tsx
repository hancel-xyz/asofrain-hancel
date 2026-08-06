import Link from "next/link";
import Image from "next/image";
import {
  CalendarDaysIcon,
  ClockIcon,
  FileTextIcon,
  HouseIcon,
  MegaphoneIcon,
  RecycleIcon,
  UsersIcon,
  MailIcon,
  MapPinIcon,
  MessageSquareShareIcon,
  PhoneIcon,
} from "lucide-react";
import { getEstructura } from "@/lib/data";
import { ImageSlot, isRealImageUrl } from "@/components/ImageSlot";
import { PqrsDialog } from "@/components/PqrsDialog";
import { Reveal } from "@/components/Reveal";
import { SocialIcon } from "@/components/SocialIcon";
import { cn } from "@/lib/utils";

/* eslint-disable @typescript-eslint/no-explicit-any */

interface Aliado {
  id: string;
  logo?: { valor?: string };
  titulo: { valor: string };
  descripcion?: { valor?: string };
}

/**
 * Heading for a footer column. These read as real section titles — Montserrat
 * caps with a rule under them — rather than as the fine print they used to be.
 */
function ColumnHeading({ title, sub, onPhoto }: { title: string; sub?: string; onPhoto: boolean }) {
  return (
    <div className="mb-5">
      <div
        className={cn(
          "font-display text-[17px] md:text-[19px] tracking-[0.02em] font-bold uppercase leading-none",
          onPhoto ? "text-brand-lime" : "text-brand-dark"
        )}
      >
        {title}
      </div>
      <span className={cn("mt-2.5 block h-[3px] w-9 rounded-full", onPhoto ? "bg-brand-lime" : "bg-brand")} />
      {sub && (
        <div className={cn("mt-2.5 text-[12.5px]", onPhoto ? "text-white/50" : "text-brand-ink/50")}>{sub}</div>
      )}
    </div>
  );
}

export async function Footer() {
  const data = await getEstructura();
  const page = data?.sitio.paginas.find((p: any) => p.id === "footer");
  const fondoUrl = page?.secciones?.fondo?.imagen_fondo?.valor;
  const hasImage = isRealImageUrl(fondoUrl);

  const descripcion = page?.secciones?.general?.descripcion?.valor || "";
  const redes: { id: string; nombre: string; url: string }[] = page?.secciones?.general?.redes ?? [];

  const contacto = page?.secciones?.contacto ?? {};
  const email = contacto.email?.valor || "";
  const telefono = contacto.telefono?.valor || "";
  const direccion = contacto.direccion?.valor || "";
  const ciudad = contacto.ciudad?.valor || "";
  const horario = contacto.horario?.valor || "";
  const telefonoHref = telefono.replace(/[^\d+]/g, "");

  // Moved out of /nosotros: the alliances are institutional credentials, so
  // they now live in the footer where they back every page instead of only one.
  const nosotrosPage = data?.sitio.paginas.find((p: any) => p.id === "nosotros");
  const aliadosSection = nosotrosPage?.secciones?.entidades_aliadas;
  const aliados: Aliado[] = aliadosSection?.aliados ?? [];

  const documentosPage = data?.sitio.paginas.find((p: any) => p.id === "documentos");
  const documentos: { id: string; titulo: string; url: string }[] = (
    documentosPage?.secciones?.lista?.documentos ?? []
  ).filter((d: any) => d.titulo && d.url);

  const text70 = hasImage ? "text-white/70 hover:text-white" : "text-brand-ink/70 hover:text-brand-ink";
  const text60 = hasImage ? "text-white/60" : "text-brand-ink/60";
  const text50 = hasImage ? "text-white/50" : "text-brand-ink/50";
  const textBase = hasImage ? "text-white hover:text-brand-lime" : "text-brand-ink hover:text-brand-dark";
  const rule = hasImage ? "border-white/20" : "border-black/[0.08]";
  const chip = hasImage
    ? "bg-white/10 ring-1 ring-white/20 text-brand-lime"
    : "bg-brand/12 ring-1 ring-brand/25 text-brand-dark";
  const iconBtn = hasImage
    ? "bg-white/10 border-white/20 text-white hover:bg-brand-lime hover:border-brand-lime hover:text-brand-ink"
    : "bg-white border-black/[0.08] text-brand-ink hover:bg-brand-lime hover:border-brand-lime";


  return (
    <footer className="bg-brand-sand font-sans">
      {/* ============ ENTIDADES ALIADAS (movido desde /nosotros) ============ */}
      {aliados.length > 0 && (
        <section id="entidades" className="px-4 md:px-6 pt-[60px] md:pt-[90px] pb-8 scroll-mt-[100px]">
          <div className="max-w-[1560px] mx-auto md:px-[52px]">
            <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-9 md:mb-11">
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="h-[2px] w-7 rounded-full bg-brand-forest" />
                  <span className="text-[11px] tracking-[2.5px] font-bold uppercase text-brand-forest">
                    Entidades aliadas
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-forest" />
                </div>
                <h2 className="font-display font-semibold text-[28px] md:text-[38px] leading-[1.08] tracking-[-0.02em] m-0 text-brand-ink max-w-[620px]">
                  {aliadosSection?.titulo?.valor || "Operamos de la mano del ecosistema institucional."}
                </h2>
              </div>
              <p className="text-[14px] leading-[1.7] text-brand-muted max-w-[360px] text-just">
                Alineados con las entidades regulatorias, de vigilancia y de política pública del sector.
              </p>
            </Reveal>

            {/* Compact cards: more of them fit per row and each takes less
                room, while the type inside keeps its size so the entity names
                stay just as readable. */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 md:gap-3">
              {aliados.map((aliado, idx) => {
                const nombre = aliado.titulo.valor.replace(/\*/g, "");
                return (
                  <Reveal key={aliado.id} delay={(idx % 6) * 60} variant="scale">
                    <div className="group h-full rounded-[14px] bg-white border border-black/[0.07] p-3.5 flex flex-col gap-2.5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-[0_14px_32px_-24px_rgba(0,46,31,0.45)]">
                      <div className="h-11 w-11 rounded-lg overflow-hidden bg-white flex items-center justify-center font-display font-semibold text-[17px] text-brand-ink ring-1 ring-black/[0.05]">
                        {isRealImageUrl(aliado.logo?.valor) ? (
                          <ImageSlot
                            src={aliado.logo.valor}
                            placeholder={nombre}
                            imgClassName="object-contain p-1 transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : (
                          nombre.charAt(0)
                        )}
                      </div>
                      <div className="mt-auto">
                        <div className="text-[11px] tracking-[1.5px] font-bold uppercase text-brand-dark">{nombre}</div>
                        {aliado.descripcion?.valor && (
                          <div className="mt-1 text-[13px] leading-[1.45] font-medium text-brand-ink/75">
                            {aliado.descripcion.valor}
                          </div>
                        )}
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ============ PIE DE PÁGINA ============ */}
      <div className="px-4 pt-8 pb-4">
        <div
          className={cn(
            "relative isolate max-w-[1560px] mx-auto rounded-[32px] p-8 md:px-[60px] md:pt-[70px] md:pb-[40px] overflow-hidden",
            hasImage ? "text-white" : "bg-white border border-black/[0.08] text-brand-ink"
          )}
        >
          {hasImage && (
            <>
              <Image src={fondoUrl} alt="" fill unoptimized className="object-cover object-center -z-20" />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/88 via-black/65 to-black/45 pointer-events-none"></div>
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-deep/50 via-transparent to-brand-forest/40 pointer-events-none"></div>
            </>
          )}
          <div
            className={cn(
              "absolute inset-0 -z-10 pointer-events-none",
              hasImage ? "text-white/[0.07]" : "text-brand/[0.08]",
              "pattern-dots [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]"
            )}
          ></div>

          <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-x-[50px] md:gap-y-12 pb-[46px] border-b", rule)}>
            {/* Marca */}
            <div className="lg:col-span-4">
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
                <p className={cn("text-[14px] leading-[1.75] max-w-[360px] mb-6 text-just", text60)}>{descripcion}</p>
              )}
              {redes.length > 0 && (
                <>
                  <ColumnHeading title="Síguenos" onPhoto={hasImage} />
                  <div className="flex gap-2.5">
                    {redes.map((red) => (
                      <Link
                        key={red.id}
                        href={red.url || "#"}
                        target={red.url ? "_blank" : undefined}
                        rel={red.url ? "noopener noreferrer" : undefined}
                        aria-label={red.nombre}
                        title={red.nombre}
                        className={cn(
                          "w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 hover:scale-105",
                          iconBtn
                        )}
                      >
                        <SocialIcon name={red.nombre} className="h-[18px] w-[18px]" />
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Navegación */}
            <div className="lg:col-span-2">
              <ColumnHeading title="Navegación" sub="Recorre el sitio" onPhoto={hasImage} />
              <nav className="flex flex-col gap-3 text-[14px]">
                {[
                  { href: "/", label: "Inicio", Icon: HouseIcon },
                  { href: "/nosotros", label: "Nosotros", Icon: UsersIcon },
                  { href: "/servicios", label: "Servicios", Icon: RecycleIcon },
                  { href: "/sensibilizacion", label: "Sensibilización", Icon: MegaphoneIcon },
                  { href: "/eventos", label: "Eventos", Icon: CalendarDaysIcon },
                ].map(({ href, label, Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className={cn("group inline-flex items-center gap-2.5 transition-colors w-fit", text70)}
                  >
                    <Icon className="h-4 w-4 shrink-0 opacity-60 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5" aria-hidden />
                    {label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Legal */}
            {documentos.length > 0 && (
              <div className="lg:col-span-2">
                <ColumnHeading title="Legal" sub="Documentos públicos" onPhoto={hasImage} />
                <div className="flex flex-col gap-3 text-[14px]">
                  {documentos.map((doc) => (
                    <a
                      key={doc.id}
                      href={`/api/documentos/view?url=${encodeURIComponent(doc.url)}&filename=${encodeURIComponent(doc.titulo)}.pdf`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn("group inline-flex items-start gap-2 transition-colors", text70)}
                    >
                      <FileTextIcon className="h-4 w-4 shrink-0 mt-0.5 opacity-60 transition-opacity group-hover:opacity-100" aria-hidden />
                      {doc.titulo}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Contacto */}
            <div className="md:col-span-2 lg:col-span-4">
              <ColumnHeading title="Contacto" sub="Escríbenos o visítanos" onPhoto={hasImage} />

              <ul className="flex flex-col gap-4">
                {email && (
                  <li className="flex items-start gap-3">
                    <span className={cn("mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl", chip)}>
                      <MailIcon className="h-[17px] w-[17px]" aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span className={cn("block text-[11px] uppercase tracking-[1.5px] font-semibold mb-0.5", text50)}>
                        Correo
                      </span>
                      <a
                        href={`mailto:${email}`}
                        className={cn("block font-semibold text-[15px] break-all transition-colors", textBase)}
                      >
                        {email}
                      </a>
                    </span>
                  </li>
                )}

                {telefono && (
                  <li className="flex items-start gap-3">
                    <span className={cn("mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl", chip)}>
                      <PhoneIcon className="h-[17px] w-[17px]" aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span className={cn("block text-[11px] uppercase tracking-[1.5px] font-semibold mb-0.5", text50)}>
                        Teléfono
                      </span>
                      <a href={`tel:${telefonoHref}`} className={cn("block font-semibold text-[15px] transition-colors", textBase)}>
                        {telefono}
                      </a>
                    </span>
                  </li>
                )}

                {(direccion || ciudad) && (
                  <li className="flex items-start gap-3">
                    <span className={cn("mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl", chip)}>
                      <MapPinIcon className="h-[17px] w-[17px]" aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span className={cn("block text-[11px] uppercase tracking-[1.5px] font-semibold mb-0.5", text50)}>
                        Ubicación
                      </span>
                      <span className={cn("block font-semibold text-[15px] leading-[1.5]", hasImage ? "text-white" : "text-brand-ink")}>
                        {direccion}
                      </span>
                      {ciudad && <span className={cn("block text-[13px] mt-0.5", text60)}>{ciudad}</span>}
                    </span>
                  </li>
                )}

                {horario && (
                  <li className="flex items-start gap-3">
                    <span className={cn("mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl", chip)}>
                      <ClockIcon className="h-[17px] w-[17px]" aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span className={cn("block text-[11px] uppercase tracking-[1.5px] font-semibold mb-0.5", text50)}>
                        Horario de atención
                      </span>
                      <span className={cn("block text-[14px] leading-[1.5]", hasImage ? "text-white/85" : "text-brand-ink/80")}>
                        {horario}
                      </span>
                    </span>
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* PQRS */}
          <div className={cn("flex flex-col md:flex-row md:items-center gap-5 md:gap-8 py-7 border-b", rule)}>
            <span className={cn("inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl", chip)}>
              <MessageSquareShareIcon className="h-5 w-5" aria-hidden />
            </span>
            <div className="flex-1">
              <div className={cn("font-display font-semibold text-[19px] md:text-[21px] tracking-[-0.01em]", hasImage ? "text-white" : "text-brand-ink")}>
                PQRS
              </div>
              <p className={cn("text-[13.5px] leading-relaxed mt-1 max-w-[520px]", text60)}>
                Peticiones, quejas, reclamos o sugerencias sobre el servicio. Te respondemos dentro de los términos de ley.
              </p>
            </div>
            <PqrsDialog
              triggerClassName={cn(
                "btn-sheen inline-flex px-6 py-3 rounded-full text-[13.5px] font-semibold border transition-all duration-300 hover:-translate-y-0.5",
                iconBtn
              )}
            />
          </div>

          <div className="flex justify-between items-center pt-6 flex-wrap gap-x-5 gap-y-2 text-center md:text-left">
            <div className={cn("text-[12px] w-full md:w-auto", text50)}>
              © 2026 ASOFRAIN E.S.P. · Todos los derechos reservados
            </div>
            <div className={cn("text-[12px] w-full md:w-auto md:order-last", text50)}>
              Todos los datos publicados en este sitio web son propiedad de ASOFRAIN E.S.P.
            </div>
            <div className={cn("text-[12px] w-full md:w-auto", text50)}>
              Desarrollado por{" "}
              <a
                href="https://hansel.xyz"
                className={cn("font-semibold transition-colors", hasImage ? "text-brand-lime hover:text-white" : "text-brand-dark hover:text-brand-ink")}
              >
                Hancel.xyz
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
