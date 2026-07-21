-- Site content schema for asofrain-hancel: replaces the local estructura.json
-- file with persisted tables. One row per page (pages), one row per named
-- section per page holding that section's scalar fields (page_sections),
-- and dedicated child tables for every repeated list of items (historia
-- rows, valores, aliados, servicios cards, sectores, tipos+vinetas,
-- galeria, eventos cards, etc.) instead of large JSONB arrays.

-- ============================================================
-- 1. pages
-- ============================================================
CREATE TABLE public.pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  nombre TEXT NOT NULL,
  ruta TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER pages_updated_at
  BEFORE UPDATE ON public.pages
  FOR EACH ROW
  EXECUTE FUNCTION system.update_updated_at();

-- ============================================================
-- 2. page_sections — scalar/small config fields per section
-- ============================================================
CREATE TABLE public.page_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID NOT NULL REFERENCES public.pages(id) ON DELETE CASCADE,
  section_key TEXT NOT NULL,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  sort_order INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (page_id, section_key)
);

CREATE INDEX idx_page_sections_page_id ON public.page_sections(page_id);

CREATE TRIGGER page_sections_updated_at
  BEFORE UPDATE ON public.page_sections
  FOR EACH ROW
  EXECUTE FUNCTION system.update_updated_at();

-- ============================================================
-- 3. Child tables for repeated list content
-- ============================================================

-- Inicio > Metricas > items (4 fixed metrics: toneladas, localidades, ECAs activas, ECAs listado)
CREATE TABLE public.inicio_metricas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_section_id UUID NOT NULL REFERENCES public.page_sections(id) ON DELETE CASCADE,
  sort_order INT NOT NULL DEFAULT 0,
  titulo TEXT NOT NULL,
  numero TEXT NOT NULL DEFAULT '',
  descripcion_tipo TEXT NOT NULL DEFAULT 'texto' CHECK (descripcion_tipo IN ('texto', 'items')),
  descripcion_texto TEXT NOT NULL DEFAULT '',
  descripcion_items TEXT[] NOT NULL DEFAULT '{}'
);
CREATE INDEX idx_inicio_metricas_section ON public.inicio_metricas(page_section_id);

-- Inicio > Servicios (vista general) > cards
CREATE TABLE public.inicio_servicios_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_section_id UUID NOT NULL REFERENCES public.page_sections(id) ON DELETE CASCADE,
  sort_order INT NOT NULL DEFAULT 0,
  numero TEXT NOT NULL,
  titulo TEXT NOT NULL
);
CREATE INDEX idx_inicio_servicios_cards_section ON public.inicio_servicios_cards(page_section_id);

-- Nosotros > Historia > filas
CREATE TABLE public.nosotros_historia_filas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_section_id UUID NOT NULL REFERENCES public.page_sections(id) ON DELETE CASCADE,
  sort_order INT NOT NULL DEFAULT 0,
  ano TEXT NOT NULL,
  titulo TEXT NOT NULL,
  descripcion TEXT NOT NULL DEFAULT ''
);
CREATE INDEX idx_nosotros_historia_filas_section ON public.nosotros_historia_filas(page_section_id);

-- Nosotros > Valores > cuadros
CREATE TABLE public.nosotros_valores_cuadros (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_section_id UUID NOT NULL REFERENCES public.page_sections(id) ON DELETE CASCADE,
  sort_order INT NOT NULL DEFAULT 0,
  titulo TEXT NOT NULL,
  descripcion TEXT NOT NULL DEFAULT ''
);
CREATE INDEX idx_nosotros_valores_cuadros_section ON public.nosotros_valores_cuadros(page_section_id);

-- Nosotros > Entidades aliadas > aliados
CREATE TABLE public.nosotros_entidades_aliados (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_section_id UUID NOT NULL REFERENCES public.page_sections(id) ON DELETE CASCADE,
  sort_order INT NOT NULL DEFAULT 0,
  logo_url TEXT NOT NULL DEFAULT '',
  titulo TEXT NOT NULL,
  descripcion TEXT NOT NULL DEFAULT ''
);
CREATE INDEX idx_nosotros_entidades_aliados_section ON public.nosotros_entidades_aliados(page_section_id);

-- Servicios > Servicios > items (the 5 process cards)
CREATE TABLE public.servicios_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_section_id UUID NOT NULL REFERENCES public.page_sections(id) ON DELETE CASCADE,
  sort_order INT NOT NULL DEFAULT 0,
  titulo TEXT NOT NULL,
  descripcion TEXT NOT NULL DEFAULT ''
);
CREATE INDEX idx_servicios_items_section ON public.servicios_items(page_section_id);

-- Servicios > Servicio destacado (Plus) > items
CREATE TABLE public.servicios_destacado_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_section_id UUID NOT NULL REFERENCES public.page_sections(id) ON DELETE CASCADE,
  sort_order INT NOT NULL DEFAULT 0,
  titulo TEXT NOT NULL,
  descripcion TEXT NOT NULL DEFAULT ''
);
CREATE INDEX idx_servicios_destacado_items_section ON public.servicios_destacado_items(page_section_id);

-- Servicios > Rutas, localidades y horarios > tabla filas
CREATE TABLE public.servicios_rutas_filas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_section_id UUID NOT NULL REFERENCES public.page_sections(id) ON DELETE CASCADE,
  sort_order INT NOT NULL DEFAULT 0,
  localidad TEXT NOT NULL,
  dias TEXT NOT NULL DEFAULT '',
  horario TEXT NOT NULL DEFAULT '',
  activo BOOLEAN NOT NULL DEFAULT true
);
CREATE INDEX idx_servicios_rutas_filas_section ON public.servicios_rutas_filas(page_section_id);

-- Servicios > Sectores atendidos > sectores
CREATE TABLE public.servicios_sectores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_section_id UUID NOT NULL REFERENCES public.page_sections(id) ON DELETE CASCADE,
  sort_order INT NOT NULL DEFAULT 0,
  imagen_url TEXT NOT NULL DEFAULT '',
  titulo TEXT NOT NULL,
  descripcion TEXT NOT NULL DEFAULT ''
);
CREATE INDEX idx_servicios_sectores_section ON public.servicios_sectores(page_section_id);

-- Servicios > Tarifas y productos > productos aprovechados
CREATE TABLE public.servicios_productos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_section_id UUID NOT NULL REFERENCES public.page_sections(id) ON DELETE CASCADE,
  sort_order INT NOT NULL DEFAULT 0,
  nombre TEXT NOT NULL
);
CREATE INDEX idx_servicios_productos_section ON public.servicios_productos(page_section_id);

-- Sensibilizacion > Tipos de sensibilizacion
CREATE TABLE public.sensibilizacion_tipos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_section_id UUID NOT NULL REFERENCES public.page_sections(id) ON DELETE CASCADE,
  sort_order INT NOT NULL DEFAULT 0,
  imagen_url TEXT NOT NULL DEFAULT '',
  tipo TEXT NOT NULL,
  titulo TEXT NOT NULL
);
CREATE INDEX idx_sensibilizacion_tipos_section ON public.sensibilizacion_tipos(page_section_id);

-- Sensibilizacion > Tipos de sensibilizacion > vinetas (child of tipos)
CREATE TABLE public.sensibilizacion_vinetas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tipo_id UUID NOT NULL REFERENCES public.sensibilizacion_tipos(id) ON DELETE CASCADE,
  sort_order INT NOT NULL DEFAULT 0,
  texto TEXT NOT NULL
);
CREATE INDEX idx_sensibilizacion_vinetas_tipo ON public.sensibilizacion_vinetas(tipo_id);

-- Sensibilizacion > Galeria > imagenes
CREATE TABLE public.sensibilizacion_galeria (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_section_id UUID NOT NULL REFERENCES public.page_sections(id) ON DELETE CASCADE,
  sort_order INT NOT NULL DEFAULT 0,
  url TEXT NOT NULL DEFAULT '',
  alt TEXT NOT NULL DEFAULT ''
);
CREATE INDEX idx_sensibilizacion_galeria_section ON public.sensibilizacion_galeria(page_section_id);

-- Eventos > Listado de eventos > cards
CREATE TABLE public.eventos_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_section_id UUID NOT NULL REFERENCES public.page_sections(id) ON DELETE CASCADE,
  sort_order INT NOT NULL DEFAULT 0,
  foto_url TEXT NOT NULL DEFAULT '',
  foto_alt TEXT NOT NULL DEFAULT '',
  fecha TEXT NOT NULL,
  titulo TEXT NOT NULL
);
CREATE INDEX idx_eventos_cards_section ON public.eventos_cards(page_section_id);

-- ============================================================
-- 4. media_assets — registry for uploaded files (Storage-backed)
-- ============================================================
CREATE TABLE public.media_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bucket TEXT NOT NULL,
  object_key TEXT NOT NULL,
  url TEXT NOT NULL,
  alt TEXT NOT NULL DEFAULT '',
  mime_type TEXT,
  size_bytes BIGINT,
  page_id UUID REFERENCES public.pages(id) ON DELETE SET NULL,
  section_key TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (bucket, object_key)
);
CREATE INDEX idx_media_assets_page ON public.media_assets(page_id);

-- ============================================================
-- 5. Row Level Security — public marketing content: readable by
-- anyone, writable only by project_admin (server-side admin panel
-- uses the project API key, which bypasses RLS entirely).
-- ============================================================
DO $$
DECLARE
  t TEXT;
BEGIN
  FOR t IN
    SELECT unnest(ARRAY[
      'pages', 'page_sections',
      'inicio_metricas', 'inicio_servicios_cards',
      'nosotros_historia_filas', 'nosotros_valores_cuadros', 'nosotros_entidades_aliados',
      'servicios_items', 'servicios_destacado_items', 'servicios_rutas_filas',
      'servicios_sectores', 'servicios_productos',
      'sensibilizacion_tipos', 'sensibilizacion_vinetas', 'sensibilizacion_galeria',
      'eventos_cards',
      'media_assets'
    ])
  LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format(
      'CREATE POLICY "public read" ON public.%I FOR SELECT TO anon, authenticated USING (true)',
      t
    );
    EXECUTE format('GRANT SELECT ON public.%I TO anon, authenticated', t);
  END LOOP;
END $$;

GRANT USAGE ON SCHEMA public TO anon, authenticated;
