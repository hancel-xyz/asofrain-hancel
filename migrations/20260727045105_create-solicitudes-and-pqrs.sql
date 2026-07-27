-- Public form submissions (/solicitar and the footer's PQRS form). Both are
-- written and read exclusively through Server Actions using the admin/API-key
-- client (src/lib/insforge.ts), which — as table owner via project_admin —
-- bypasses RLS entirely; RLS is enabled with no policies as a deny-all
-- backstop against direct anon/authenticated access through PostgREST.

CREATE TABLE public.solicitudes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tipo_cliente text NOT NULL DEFAULT '',
  nombre text NOT NULL DEFAULT '',
  localidad text NOT NULL DEFAULT '',
  correo text NOT NULL DEFAULT '',
  telefono text NOT NULL DEFAULT '',
  direccion text NOT NULL DEFAULT '',
  descripcion text NOT NULL DEFAULT '',
  acepta_datos boolean NOT NULL DEFAULT false,
  estado text NOT NULL DEFAULT 'nueva',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.solicitudes ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.pqrs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tipo text NOT NULL DEFAULT '',
  nombre text NOT NULL DEFAULT '',
  correo text NOT NULL DEFAULT '',
  telefono text NOT NULL DEFAULT '',
  mensaje text NOT NULL DEFAULT '',
  estado text NOT NULL DEFAULT 'nueva',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.pqrs ENABLE ROW LEVEL SECURITY;
