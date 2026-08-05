"use client";

import { useState, useTransition } from "react";
import { submitSolicitud } from "@/app/(site)/solicitar/actions";

const TIPOS_CLIENTE = [
  "Propiedad horizontal",
  "Colegio",
  "Entidad pública",
  "Empresa",
  "Comercio",
  "Sector salud",
  "Sector hotelero",
  "Oficina",
  "Comunidad",
  "Otro",
];

export function SolicitarForm() {
  const [tipoCliente, setTipoCliente] = useState(TIPOS_CLIENTE[0]);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set("tipo_cliente", tipoCliente);

    startTransition(async () => {
      const result = await submitSolicitud(formData);
      if (result?.error) {
        setError(result.error);
      } else {
        setSent(true);
      }
    });
  }

  if (sent) {
    return (
      <div className="bg-white border border-black/[0.08] rounded-[24px] p-6 md:p-[52px] flex flex-col items-center justify-center text-center min-h-[400px]">
        <div className="w-14 h-14 rounded-full bg-[#4CAF50] text-white flex items-center justify-center text-[24px] mb-5">✓</div>
        <h2 className="font-display font-semibold text-[26px] text-[#111111] mb-3">¡Solicitud enviada!</h2>
        <p className="text-[15px] text-[#4A5A52] max-w-[420px]">
          Un asesor se comunicará contigo en menos de 24 horas hábiles para agendar la visita técnica.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-black/[0.08] rounded-[24px] p-6 md:p-[52px]">
      <div className="mb-8">
        <label className="block text-[11px] tracking-[1.5px] text-[#4CAF50] font-semibold mb-3.5 uppercase">01 · TIPO DE CLIENTE</label>
        <div className="flex gap-2 flex-wrap">
          {TIPOS_CLIENTE.map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => setTipoCliente(t)}
              className={`px-[18px] py-[11px] rounded-full text-[13px] font-semibold cursor-pointer transition-colors ${
                tipoCliente === t
                  ? "bg-[#111111] text-white"
                  : "bg-white border border-black/[0.1] font-medium hover:bg-[#4CAF50]/15 text-[#111111]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-[11px] tracking-[1.5px] text-[#4CAF50] font-semibold mb-3.5 uppercase">02 · DATOS DE CONTACTO</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-3.5">
          <div>
            <label className="block text-[10.5px] tracking-[1px] text-[#111111]/70 font-medium mb-1.5 uppercase">NOMBRE / RAZÓN SOCIAL</label>
            <input name="nombre" required type="text" placeholder="Nombre completo o empresa" className="w-full px-4 py-3.5 bg-white border border-black/[0.1] rounded-xl font-sans text-[14px] text-[#111111] focus:outline-none focus:border-[#4CAF50]" />
          </div>
          <div>
            <label className="block text-[10.5px] tracking-[1px] text-[#111111]/70 font-medium mb-1.5 uppercase">LOCALIDAD</label>
            <select name="localidad" defaultValue="" className="w-full px-4 py-3.5 bg-white border border-black/[0.1] rounded-xl font-sans text-[14px] text-[#111111] focus:outline-none focus:border-[#4CAF50] appearance-none">
              <option value="">Selecciona una localidad</option>
              <option>Suba</option>
              <option>Engativá</option>
              <option>Usaquén</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-3.5">
          <div>
            <label className="block text-[10.5px] tracking-[1px] text-[#111111]/70 font-medium mb-1.5 uppercase">CORREO</label>
            <input name="correo" required type="email" placeholder="contacto@ejemplo.com" className="w-full px-4 py-3.5 bg-white border border-black/[0.1] rounded-xl font-sans text-[14px] text-[#111111] focus:outline-none focus:border-[#4CAF50]" />
          </div>
          <div>
            <label className="block text-[10.5px] tracking-[1px] text-[#111111]/70 font-medium mb-1.5 uppercase">TELÉFONO</label>
            <input name="telefono" type="tel" placeholder="+57" className="w-full px-4 py-3.5 bg-white border border-black/[0.1] rounded-xl font-sans text-[14px] text-[#111111] focus:outline-none focus:border-[#4CAF50]" />
          </div>
        </div>
        <div>
          <label className="block text-[10.5px] tracking-[1px] text-[#111111]/70 font-medium mb-1.5 uppercase">DIRECCIÓN DEL PUNTO DE RECOLECCIÓN</label>
          <input name="direccion" type="text" placeholder="Ej. Calle 123 # 45-67" className="w-full px-4 py-3.5 bg-white border border-black/[0.1] rounded-xl font-sans text-[14px] text-[#111111] focus:outline-none focus:border-[#4CAF50]" />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-[11px] tracking-[1.5px] text-[#4CAF50] font-semibold mb-3.5 uppercase">03 · DESCRIPCIÓN DE LA NECESIDAD</label>
        <textarea name="descripcion" placeholder="Volumen estimado, frecuencia deseada, tipos de material predominantes, particularidades del sitio, horario preferido..." className="w-full p-[16px_18px] bg-white border border-black/[0.1] rounded-xl font-sans text-[14px] text-[#111111] min-h-[160px] resize-y focus:outline-none focus:border-[#4CAF50]"></textarea>
      </div>

      {error && <p className="text-[13px] text-red-600 mb-4">{error}</p>}

      <div className="flex items-center justify-between gap-5 flex-wrap pt-5 border-t border-black/[0.08]">
        <label className="flex items-center gap-2.5 text-[12.5px] text-[#111111]/75 cursor-pointer">
          <input name="acepta_datos" type="checkbox" required className="w-4 h-4 accent-[#4CAF50]" />
          Acepto el tratamiento de datos personales
        </label>
        <button
          type="submit"
          disabled={isPending}
          className="px-[34px] py-[18px] bg-[#006B4D] text-white border-none rounded-full font-sans text-[14.5px] font-semibold cursor-pointer flex items-center gap-3 hover:bg-[#4CAF50] hover:text-[#111111] transition-colors w-full sm:w-auto justify-center disabled:opacity-60"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#4CAF50]"></span>
          {isPending ? "Enviando..." : "Enviar solicitud"} <span className="text-[18px]">→</span>
        </button>
      </div>
    </form>
  );
}
