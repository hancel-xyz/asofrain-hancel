import Link from "next/link";
import { SolicitarForm } from "@/components/SolicitarForm";

export default function SolicitarPage() {
  return (
    <div className="bg-white font-sans">
      <section className="px-4 md:px-[60px] pt-[100px] md:pt-[120px] pb-[30px] md:pb-[50px] bg-white">
        <div className="max-w-[1360px] mx-auto">
          <Link href="/" className="inline-block text-[11px] md:text-[12px] tracking-[2px] text-[#4CAF50] font-semibold mb-6 hover:text-[#111111] transition-colors">← VOLVER AL INICIO</Link>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-[80px] items-end mt-2 md:mt-5">
            <div>
              <div className="text-[11px] tracking-[2.5px] text-[#4CAF50] font-semibold mb-4 md:mb-5 uppercase">— SOLICITAR SERVICIO</div>
              <h1 className="font-display font-semibold text-[clamp(36px,8vw,80px)] leading-[1.05] tracking-[-0.02em] m-0 text-[#111111]">
                Empecemos<br/>a aprovechar.
              </h1>
            </div>
            <p className="text-[16px] md:text-[17px] leading-[1.6] text-[#4A5A52] m-0 mb-2 md:mb-5 max-w-[520px]">
              Cuéntanos qué tipo de usuario eres y qué necesitas. Un asesor se comunicará contigo en menos de <strong className="text-[#111111]">24 horas hábiles</strong> para agendar visita técnica sin costo.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 md:px-[60px] pt-[20px] md:pt-10 pb-[60px] md:pb-[100px] bg-white">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-6 items-start">

          {/* Formulario */}
          <SolicitarForm />

          {/* Sidebar informativa */}
          <div className="flex flex-col gap-4 lg:sticky top-[110px]">
            <div className="bg-[#4CAF50] text-[#111111] rounded-[24px] p-6 md:p-9 relative overflow-hidden">
              <div className="text-[11px] tracking-[2px] text-[#111111]/70 font-semibold mb-4 uppercase">— ¿QUÉ SIGUE?</div>
              <div className="flex flex-col gap-4 md:gap-5">
                {[
                  { n: '1', t: 'Recibimos tu solicitud', d: 'Notificación automática al equipo comercial.', active: false },
                  { n: '2', t: 'Un asesor te contacta', d: 'En menos de 24 horas hábiles.', active: false },
                  { n: '3', t: 'Visita técnica', d: 'Diagnóstico y propuesta operativa sin costo.', active: false },
                  { n: '4', t: 'Inicio del servicio', d: 'Ruta activa y trazabilidad al SUI.', active: true },
                ].map((s) => (
                  <div key={s.n} className="flex gap-3 md:gap-3.5 items-start">
                    <div className={`min-w-[28px] md:min-w-[32px] h-[28px] md:h-[32px] rounded-full flex items-center justify-center font-display font-semibold text-[14px] md:text-[15px] ${s.active ? 'bg-[#006B4D] text-white' : 'bg-white text-[#111111]'}`}>
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
              <div className="text-[11px] tracking-[2px] text-[#4CAF50] font-semibold mb-3.5 uppercase">CONTACTO DIRECTO</div>
              <a href="tel:+573225105246" className="block font-display font-semibold text-[24px] mb-2.5 text-[#111111] tracking-[-0.01em] hover:text-[#4CAF50] transition-colors">+57 322 510 5246</a>
              <a href="mailto:asofrain.admi@gmail.com" className="block font-display font-semibold text-[18px] text-[#111111] tracking-[-0.01em] break-all hover:text-[#4CAF50] transition-colors">asofrain.admi@gmail.com</a>
            </div>

            <div className="p-[20px_24px] bg-[#4CAF50]/12 border border-[#4CAF50]/30 rounded-[14px] text-[13px] text-[#006B4D] leading-[1.55]">
              <strong>Sin costo extra:</strong> el servicio público de aprovechamiento se acredita a tu factura de aseo. No pagas más por reciclar.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
