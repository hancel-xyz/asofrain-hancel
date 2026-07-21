const fs = require("fs");
const path = require("path");

const estructura = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "estructura.json"), "utf-8")
);

function sql(str) {
  if (str === null || str === undefined) return "NULL";
  return "'" + String(str).replace(/'/g, "''") + "'";
}

function sqlArray(arr) {
  if (!arr || arr.length === 0) return "'{}'";
  return "ARRAY[" + arr.map((s) => sql(s)).join(", ") + "]::text[]";
}

function sqlBool(b) {
  return b ? "true" : "false";
}

const lines = [];
lines.push("-- Seed data generated from estructura.json — do not edit by hand.");
lines.push("");

const paginas = estructura.sitio.paginas;

function page(id) {
  return paginas.find((p) => p.id === id);
}

// ---------- pages ----------
const pageRows = [
  ["inicio", "Inicio", "/"],
  ["nosotros", "Nosotros", "/nosotros"],
  ["servicios", "Servicios", "/servicios"],
  ["sensibilizacion", "Sensibilización", "/sensibilizacion"],
  ["eventos", "Eventos", "/eventos"],
];

lines.push("INSERT INTO public.pages (slug, nombre, ruta) VALUES");
lines.push(
  pageRows
    .map(([slug, nombre, ruta]) => `  (${sql(slug)}, ${sql(nombre)}, ${sql(ruta)})`)
    .join(",\n") + ";"
);
lines.push("");

// helper to emit a page_sections insert returning nothing special; we look it up by (slug, section_key) later via subqueries
function insertSection(slug, sectionKey, dataObj, sortOrder = 0) {
  const json = JSON.stringify(dataObj).replace(/'/g, "''");
  lines.push(
    `INSERT INTO public.page_sections (page_id, section_key, data, sort_order) VALUES ((SELECT id FROM public.pages WHERE slug = ${sql(
      slug
    )}), ${sql(sectionKey)}, '${json}'::jsonb, ${sortOrder});`
  );
}

function sectionIdSubquery(slug, sectionKey) {
  return `(SELECT id FROM public.page_sections WHERE page_id = (SELECT id FROM public.pages WHERE slug = ${sql(
    slug
  )}) AND section_key = ${sql(sectionKey)})`;
}

// ============================================================
// INICIO
// ============================================================
{
  const p = page("inicio");
  const s = p.secciones;

  insertSection("inicio", "hero", {
    imagen_fondo: s.hero.imagen_fondo.valor,
    titulo: s.hero.titulo.valor,
    descripcion: s.hero.descripcion.valor,
    cta_texto: s.hero.cta.texto,
    cta_url: s.hero.cta.url,
  });

  insertSection("inicio", "metricas", {
    dato_breve: s.metricas.dato_breve.valor,
    titulo_principal: s.metricas.titulo_principal.valor,
    descripcion: s.metricas.descripcion.valor,
  });
  lines.push(
    `INSERT INTO public.inicio_metricas (page_section_id, sort_order, titulo, numero, descripcion_tipo, descripcion_texto, descripcion_items) VALUES`
  );
  lines.push(
    s.metricas.items
      .map(
        (item, i) =>
          `  (${sectionIdSubquery("inicio", "metricas")}, ${i}, ${sql(
            item.titulo.valor
          )}, ${sql(item.numero.valor)}, ${sql(
            item.descripcion.tipo_activo
          )}, ${sql(item.descripcion.texto.valor)}, ${sqlArray(
            item.descripcion.items.valor
          )})`
      )
      .join(",\n") + ";"
  );
  lines.push("");

  insertSection("inicio", "servicios_vista_general", {
    media_url: s.servicios_vista_general.media.url,
    titulo_media: s.servicios_vista_general.titulo_media.valor,
    servicios_titulo: s.servicios_vista_general.servicios.titulo.valor,
  });
  lines.push(
    `INSERT INTO public.inicio_servicios_cards (page_section_id, sort_order, numero, titulo) VALUES`
  );
  lines.push(
    s.servicios_vista_general.servicios.cards
      .map(
        (c, i) =>
          `  (${sectionIdSubquery(
            "inicio",
            "servicios_vista_general"
          )}, ${i}, ${sql(c.numero.valor)}, ${sql(c.titulo.valor)})`
      )
      .join(",\n") + ";"
  );
  lines.push("");

  insertSection("inicio", "frase", {
    titulo_pequeno: s.frase.titulo_pequeno.valor,
    texto: s.frase.texto.valor,
  });
}

// ============================================================
// NOSOTROS
// ============================================================
{
  const p = page("nosotros");
  const s = p.secciones;

  insertSection("nosotros", "hero", {
    imagen_fondo: s.hero.imagen_fondo.valor,
    titulo: s.hero.titulo.valor,
    descripcion: s.hero.descripcion.valor,
    cta_1_texto: s.hero.cta_1.texto,
    cta_1_url: s.hero.cta_1.url,
    cta_2_texto: s.hero.cta_2.texto,
    cta_2_url: s.hero.cta_2.url,
  });

  insertSection("nosotros", "quienes_somos", {
    titulo: s.quienes_somos.titulo.valor,
    descripcion: s.quienes_somos.descripcion.valor,
  });

  insertSection("nosotros", "historia", { titulo: s.historia.titulo.valor });
  lines.push(
    `INSERT INTO public.nosotros_historia_filas (page_section_id, sort_order, ano, titulo, descripcion) VALUES`
  );
  lines.push(
    s.historia.filas
      .map(
        (f, i) =>
          `  (${sectionIdSubquery("nosotros", "historia")}, ${i}, ${sql(
            f.ano.valor
          )}, ${sql(f.titulo.valor)}, ${sql(f.descripcion.valor)})`
      )
      .join(",\n") + ";"
  );
  lines.push("");

  insertSection("nosotros", "mision", { descripcion: s.mision.descripcion.valor });
  insertSection("nosotros", "vision", { descripcion: s.vision.descripcion.valor });

  insertSection("nosotros", "valores", { titulo: s.valores.titulo.valor });
  lines.push(
    `INSERT INTO public.nosotros_valores_cuadros (page_section_id, sort_order, titulo, descripcion) VALUES`
  );
  lines.push(
    s.valores.cuadros
      .map(
        (c, i) =>
          `  (${sectionIdSubquery("nosotros", "valores")}, ${i}, ${sql(
            c.titulo.valor
          )}, ${sql(c.descripcion.valor)})`
      )
      .join(",\n") + ";"
  );
  lines.push("");

  insertSection("nosotros", "objeto_social", {
    titulo: s.objeto_social.titulo.valor,
    descripcion: s.objeto_social.descripcion.valor,
  });
  insertSection("nosotros", "objeto_ambiental", {
    titulo: s.objeto_ambiental.titulo.valor,
    descripcion: s.objeto_ambiental.descripcion.valor,
  });
  insertSection("nosotros", "frase_1", {
    titulo_pequeno: s.frase_1.titulo_pequeno.valor,
    texto: s.frase_1.texto.valor,
  });

  insertSection("nosotros", "entidades_aliadas", {
    titulo: s.entidades_aliadas.titulo.valor,
  });
  lines.push(
    `INSERT INTO public.nosotros_entidades_aliados (page_section_id, sort_order, logo_url, titulo, descripcion) VALUES`
  );
  lines.push(
    s.entidades_aliadas.aliados
      .map(
        (a, i) =>
          `  (${sectionIdSubquery("nosotros", "entidades_aliadas")}, ${i}, ${sql(
            a.logo.valor
          )}, ${sql(a.titulo.valor)}, ${sql(a.descripcion.valor)})`
      )
      .join(",\n") + ";"
  );
  lines.push("");
}

// ============================================================
// SERVICIOS
// ============================================================
{
  const p = page("servicios");
  const s = p.secciones;

  insertSection("servicios", "hero", {
    imagen_fondo: s.hero.imagen_fondo.valor,
    titulo: s.hero.titulo.valor,
    descripcion: s.hero.descripcion.valor,
    descripcion_2: s.hero.descripcion_2.valor,
  });

  insertSection("servicios", "servicios", { titulo: s.servicios.titulo.valor });
  lines.push(
    `INSERT INTO public.servicios_items (page_section_id, sort_order, titulo, descripcion) VALUES`
  );
  lines.push(
    s.servicios.items
      .map(
        (item, i) =>
          `  (${sectionIdSubquery("servicios", "servicios")}, ${i}, ${sql(
            item.titulo.valor
          )}, ${sql(item.descripcion.valor)})`
      )
      .join(",\n") + ";"
  );
  lines.push("");

  insertSection("servicios", "servicio_destacado_plus", {
    subtitulo_pequeno: s.servicio_destacado_plus.subtitulo_pequeno.valor,
    titulo: s.servicio_destacado_plus.titulo.valor,
    descripcion: s.servicio_destacado_plus.descripcion.valor,
  });
  lines.push(
    `INSERT INTO public.servicios_destacado_items (page_section_id, sort_order, titulo, descripcion) VALUES`
  );
  lines.push(
    s.servicio_destacado_plus.items
      .map(
        (item, i) =>
          `  (${sectionIdSubquery(
            "servicios",
            "servicio_destacado_plus"
          )}, ${i}, ${sql(item.titulo.valor)}, ${sql(item.descripcion.valor)})`
      )
      .join(",\n") + ";"
  );
  lines.push("");

  insertSection("servicios", "rutas_localidades_horarios", {
    titulo: s.rutas_localidades_horarios.titulo.valor,
    descripcion: s.rutas_localidades_horarios.descripcion.valor,
  });
  lines.push(
    `INSERT INTO public.servicios_rutas_filas (page_section_id, sort_order, localidad, dias, horario, activo) VALUES`
  );
  lines.push(
    s.rutas_localidades_horarios.tabla.filas
      .map(
        (f, i) =>
          `  (${sectionIdSubquery(
            "servicios",
            "rutas_localidades_horarios"
          )}, ${i}, ${sql(f.localidad.valor)}, ${sql(f.dias.valor)}, ${sql(
            f.horario.valor
          )}, ${sqlBool(true)})`
      )
      .join(",\n") + ";"
  );
  lines.push("");

  insertSection("servicios", "sectores_atendidos", {
    titulo: s.sectores_atendidos.titulo.valor,
  });
  lines.push(
    `INSERT INTO public.servicios_sectores (page_section_id, sort_order, imagen_url, titulo, descripcion) VALUES`
  );
  lines.push(
    s.sectores_atendidos.sectores
      .map(
        (sec, i) =>
          `  (${sectionIdSubquery("servicios", "sectores_atendidos")}, ${i}, ${sql(
            sec.imagen.valor
          )}, ${sql(sec.titulo.valor)}, ${sql(sec.descripcion.valor)})`
      )
      .join(",\n") + ";"
  );
  lines.push("");

  insertSection("servicios", "tarifas_y_productos", {
    titulo: s.tarifas_y_productos.titulo.valor,
    descripcion: s.tarifas_y_productos.descripcion.valor,
    cta_texto: s.tarifas_y_productos.cta.texto,
    cta_url: s.tarifas_y_productos.cta.url,
  });
  lines.push(
    `INSERT INTO public.servicios_productos (page_section_id, sort_order, nombre) VALUES`
  );
  lines.push(
    s.tarifas_y_productos.productos_aprovechados.items
      .map(
        (item, i) =>
          `  (${sectionIdSubquery("servicios", "tarifas_y_productos")}, ${i}, ${sql(
            item.nombre.valor
          )})`
      )
      .join(",\n") + ";"
  );
  lines.push("");

  insertSection("servicios", "cta_final", {
    titulo: s.cta_final.titulo.valor,
    descripcion: s.cta_final.descripcion.valor,
    boton_texto: s.cta_final.boton.texto,
    boton_url: s.cta_final.boton.url,
  });
}

// ============================================================
// SENSIBILIZACION
// ============================================================
{
  const p = page("sensibilizacion");
  const s = p.secciones;

  insertSection("sensibilizacion", "encabezado", {
    titulo: s.encabezado.titulo.valor,
    descripcion: s.encabezado.descripcion.valor,
  });

  insertSection("sensibilizacion", "tipos_sensibilizacion", {});
  lines.push(
    `INSERT INTO public.sensibilizacion_tipos (page_section_id, sort_order, imagen_url, tipo, titulo) VALUES`
  );
  lines.push(
    s.tipos_sensibilizacion.tipos
      .map(
        (t, i) =>
          `  (${sectionIdSubquery(
            "sensibilizacion",
            "tipos_sensibilizacion"
          )}, ${i}, ${sql(t.imagen.valor)}, ${sql(t.tipo.valor)}, ${sql(
            t.titulo.valor
          )})`
      )
      .join(",\n") + ";"
  );
  lines.push("");

  s.tipos_sensibilizacion.tipos.forEach((t, ti) => {
    lines.push(
      `INSERT INTO public.sensibilizacion_vinetas (tipo_id, sort_order, texto) VALUES`
    );
    const tipoSubquery = `(SELECT id FROM public.sensibilizacion_tipos WHERE page_section_id = ${sectionIdSubquery(
      "sensibilizacion",
      "tipos_sensibilizacion"
    )} AND sort_order = ${ti})`;
    lines.push(
      t.vinetas.items
        .map((v, vi) => `  (${tipoSubquery}, ${vi}, ${sql(v.valor)})`)
        .join(",\n") + ";"
    );
    lines.push("");
  });

  insertSection("sensibilizacion", "galeria", {
    titulo: s.galeria.titulo.valor,
  });
  lines.push(
    `INSERT INTO public.sensibilizacion_galeria (page_section_id, sort_order, url, alt) VALUES`
  );
  lines.push(
    s.galeria.imagenes
      .map(
        (img, i) =>
          `  (${sectionIdSubquery("sensibilizacion", "galeria")}, ${i}, ${sql(
            img.url
          )}, ${sql(img.alt)})`
      )
      .join(",\n") + ";"
  );
  lines.push("");
}

// ============================================================
// EVENTOS
// ============================================================
{
  const p = page("eventos");
  const s = p.secciones;

  insertSection("eventos", "listado_eventos", {
    titulo: s.listado_eventos.titulo.valor,
    filtro_por_ano_activo: s.listado_eventos.filtro_por_ano.activo,
    filtro_por_ano_valor_default: s.listado_eventos.filtro_por_ano.valor_default,
  });
  lines.push(
    `INSERT INTO public.eventos_cards (page_section_id, sort_order, foto_url, foto_alt, fecha, titulo) VALUES`
  );
  lines.push(
    s.listado_eventos.cards
      .map(
        (c, i) =>
          `  (${sectionIdSubquery("eventos", "listado_eventos")}, ${i}, ${sql(
            c.foto.url
          )}, ${sql(c.foto.alt)}, ${sql(c.fecha.valor)}, ${sql(c.titulo.valor)})`
      )
      .join(",\n") + ";"
  );
  lines.push("");
}

const outPath = path.join(__dirname, "..", "migrations-seed", "seed.sql");
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, lines.join("\n") + "\n", "utf-8");
console.log("Wrote " + outPath);
