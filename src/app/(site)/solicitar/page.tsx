import Link from "next/link";

export default function SolicitarPage() {
  return (
    <div className="bg-white font-sans">
      <section className="px-4 md:px-[60px] pt-[110px] md:pt-[140px] pb-[40px] md:pb-[60px] bg-white">
        <div className="max-w-[1360px] mx-auto">
          <Link href="/" className="inline-block text-[11px] md:text-[12px] tracking-[2px] text-[#62AF9D] font-semibold mb-6 hover:text-[#111111] transition-colors">← VOLVER AL INICIO</Link>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-[80px] items-end mt-2 md:mt-5">
            <div>
              <div className="text-[11px] tracking-[2.5px] text-[#62AF9D] font-semibold mb-4 md:mb-5 uppercase">— SOLICITAR SERVICIO</div>
              <h1 className="font-display font-semibold text-[clamp(36px,8vw,80px)] leading-[1.05] tracking-[-0.02em] m-0 text-[#111111]">
                Empecemos<br/>a aprovechar.
              </h1>
            </div>
            <p className="text-[16px] md:text-[17px] leading-[1.6] text-[#4b5563] m-0 mb-2 md:mb-5 max-w-[520px]">
              Cuéntanos qué tipo de usuario eres y qué necesitas. Un asesor se comunicará contigo en menos de <strong className="text-[#111111]">24 horas hábiles</strong> para agendar visita técnica sin costo.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 md:px-[60px] pt-[20px] md:pt-10 pb-[80px] md:pb-[140px] bg-white">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-6 items-start">

          {/* Formulario */}
          <div className="bg-white border border-black/[0.08] rounded-[24px] p-6 md:p-[52px]">
            <div className="mb-8">
              <label className="block text-[11px] tracking-[1.5px] text-[#62AF9D] font-semibold mb-3.5 uppercase">01 · TIPO DE CLIENTE</label>
              <div className="flex gap-2 flex-wrap">
                <div className="px-[18px] py-[11px] bg-[#111111] text-white rounded-full text-[13px] font-semibold cursor-pointer">Propiedad horizontal</div>
                {['Colegio', 'Entidad pública', 'Empresa', 'Comercio', 'Sector salud', 'Sector hotelero', 'Oficina', 'Comunidad', 'Otro'].map(t => (
                  <div key={t} className="px-[18px] py-[11px] bg-white border border-black/[0.1] rounded-full text-[13px] font-medium cursor-pointer hover:bg-[#62AF9D]/15 transition-colors text-[#111111]">{t}</div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-[11px] tracking-[1.5px] text-[#62AF9D] font-semibold mb-3.5 uppercase">02 · DATOS DE CONTACTO</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-3.5">
                <div>
                  <label className="block text-[10.5px] tracking-[1px] text-[#111111]/70 font-medium mb-1.5 uppercase">NOMBRE / RAZÓN SOCIAL</label>
                  <input type="text" placeholder="Nombre completo o empresa" className="w-full px-4 py-3.5 bg-white border border-black/[0.1] rounded-xl font-sans text-[14px] text-[#111111] focus:outline-none focus:border-[#62AF9D]" />
                </div>
                <div>
                  <label className="block text-[10.5px] tracking-[1px] text-[#111111]/70 font-medium mb-1.5 uppercase">LOCALIDAD</label>
                  <select className="w-full px-4 py-3.5 bg-white border border-black/[0.1] rounded-xl font-sans text-[14px] text-[#111111] focus:outline-none focus:border-[#62AF9D] appearance-none">
                    <option>Selecciona una localidad</option>
                    <option>Suba</option>
                    <option>Engativá</option>
                    <option>Usaquén</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-3.5">
                <div>
                  <label className="block text-[10.5px] tracking-[1px] text-[#111111]/70 font-medium mb-1.5 uppercase">CORREO</label>
                  <input type="email" placeholder="contacto@ejemplo.com" className="w-full px-4 py-3.5 bg-white border border-black/[0.1] rounded-xl font-sans text-[14px] text-[#111111] focus:outline-none focus:border-[#62AF9D]" />
                </div>
                <div>
                  <label className="block text-[10.5px] tracking-[1px] text-[#111111]/70 font-medium mb-1.5 uppercase">TELÉFONO</label>
                  <input type="tel" placeholder="+57" className="w-full px-4 py-3.5 bg-white border border-black/[0.1] rounded-xl font-sans text-[14px] text-[#111111] focus:outline-none focus:border-[#62AF9D]" />
                </div>
              </div>
              <div>
                <label className="block text-[10.5px] tracking-[1px] text-[#111111]/70 font-medium mb-1.5 uppercase">DIRECCIÓN DEL PUNTO DE RECOLECCIÓN</label>
                <input type="text" placeholder="Ej. Calle 123 # 45-67" className="w-full px-4 py-3.5 bg-white border border-black/[0.1] rounded-xl font-sans text-[14px] text-[#111111] focus:outline-none focus:border-[#62AF9D]" />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-[11px] tracking-[1.5px] text-[#62AF9D] font-semibold mb-3.5 uppercase">03 · DESCRIPCIÓN DE LA NECESIDAD</label>
              <textarea placeholder="Volumen estimado, frecuencia deseada, tipos de material predominantes, particularidades del sitio, horario preferido..." className="w-full p-[16px_18px] bg-white border border-black/[0.1] rounded-xl font-sans text-[14px] text-[#111111] min-h-[160px] resize-y focus:outline-none focus:border-[#62AF9D]"></textarea>
            </div>

            <div className="flex items-center justify-between gap-5 flex-wrap pt-5 border-t border-black/[0.08]">
              <label className="flex items-center gap-2.5 text-[12.5px] text-[#111111]/75 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-[#62AF9D]" />
                Acepto el tratamiento de datos personales
              </label>
              <button className="px-[34px] py-[18px] bg-[#111111] text-white border-none rounded-full font-sans text-[14.5px] font-semibold cursor-pointer flex items-center gap-3 hover:bg-[#62AF9D] hover:text-[#111111] transition-colors w-full sm:w-auto justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#62AF9D]"></span>
                Enviar solicitud <span className="text-[18px]">→</span>
              </button>
            </div>
          </div>

          {/* Sidebar informativa */}
          <div className="flex flex-col gap-4 lg:sticky top-[110px]">
            <div className="bg-[#62AF9D] text-[#111111] rounded-[24px] p-6 md:p-9 relative overflow-hidden">
              <div className="text-[11px] tracking-[2px] text-[#111111]/70 font-semibold mb-4 uppercase">— ¿QUÉ SIGUE?</div>
              <div className="flex flex-col gap-4 md:gap-5">
                {[
                  { n: '1', t: 'Recibimos tu solicitud', d: 'Notificación automática al equipo comercial.', active: false },
                  { n: '2', t: 'Un asesor te contacta', d: 'En menos de 24 horas hábiles.', active: false },
                  { n: '3', t: 'Visita técnica', d: 'Diagnóstico y propuesta operativa sin costo.', active: false },
                  { n: '4', t: 'Inicio del servicio', d: 'Ruta activa y trazabilidad al SUI.', active: true },
                ].map((s) => (
                  <div key={s.n} className="flex gap-3 md:gap-3.5 items-start">
                    <div className={`min-w-[28px] md:min-w-[32px] h-[28px] md:h-[32px] rounded-full flex items-center justify-center font-display font-semibold text-[14px] md:text-[15px] ${s.active ? 'bg-[#111111] text-white' : 'bg-white text-[#111111]'}`}>
                      {s.n}
                    </div>
                    <div>
                      <div className="text-[14px] md:text-[14.5px] font-semibold mb-0.5 md:mb-1">{s.t}</div>
                      <div className="text-[12.5px] text-[#111111]/65 leading-[1.5]">{s.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-black/[0.08] rounded-[24px] p-6 md:p-[32px_30px]">
              <div className="text-[11px] tracking-[2px] text-[#62AF9D] font-semibold mb-3.5 uppercase">CONTACTO DIRECTO</div>
              <a href="tel:+573225105246" className="block font-display font-semibold text-[24px] mb-2.5 text-[#111111] tracking-[-0.01em] hover:text-[#62AF9D] transition-colors">+57 322 510 5246</a>
              <a href="mailto:asofrain.admi@gmail.com" className="block font-display font-semibold text-[18px] text-[#111111] tracking-[-0.01em] break-all hover:text-[#62AF9D] transition-colors">asofrain.admi@gmail.com</a>
            </div>

            <div className="p-[20px_24px] bg-[#62AF9D]/12 border border-[#62AF9D]/30 rounded-[14px] text-[13px] text-[#3d7a6d] leading-[1.55]">
              <strong>Sin costo extra:</strong> el servicio público de aprovechamiento se acredita a tu factura de aseo. No pagas más por reciclar.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
