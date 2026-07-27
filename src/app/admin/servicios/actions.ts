"use server";
import { getEstructura, updateEstructuraPageSection } from "@/lib/data";
import { uploadMediaFile } from "@/lib/media";
import { revalidatePath } from "next/cache";

export async function updateServiciosHero(formData: FormData) {
  const estructura = await getEstructura();
  const page = estructura?.sitio.paginas.find((p: any) => p.id === "servicios");
  if (!page) return;

  const uploaded = await uploadMediaFile(formData.get("imagen_fondo"), {
    pageSlug: "servicios",
    sectionKey: "hero",
  });

  const data = {
    imagen_fondo: uploaded
      ? { ...page.secciones.hero.imagen_fondo, valor: uploaded.url, key: uploaded.key }
      : page.secciones.hero.imagen_fondo,
    titulo: { ...page.secciones.hero.titulo, valor: formData.get("titulo")?.toString() || "" },
    descripcion: { ...page.secciones.hero.descripcion, valor: formData.get("descripcion")?.toString() || "" },
    descripcion_2: { ...page.secciones.hero.descripcion_2, valor: formData.get("descripcion_2")?.toString() || "" },
  };

  // Handle arrays explicitly if they exist


  await updateEstructuraPageSection("servicios", "hero", data);
  revalidatePath("/", "layout");
}

export async function updateServiciosServicios(formData: FormData) {
  const estructura = await getEstructura();
  const page = estructura?.sitio.paginas.find((p: any) => p.id === "servicios");
  if (!page) return;

  const data = {
    titulo: { ...page.secciones.servicios.titulo, valor: formData.get("titulo")?.toString() || "" },
    items: [
      // La lista completa requeriría re-parsear formData para arrays.
      // Por ahora mantendremos el array original y solo actualizaremos los valores que lleguen
    ],
  };

  // Handle arrays explicitly if they exist
  const itemsArray = page.secciones.servicios.items;
  if (itemsArray) {
    const updateditems = itemsArray.map((item: any) => {
      const id = item.id;
      const updatedItem = { ...item };
      if (formData.has(`${id}_titulo`)) updatedItem.titulo = { ...updatedItem.titulo, valor: formData.get(`${id}_titulo`)?.toString() || "" };
      if (formData.has(`${id}_descripcion`)) updatedItem.descripcion = { ...updatedItem.descripcion, valor: formData.get(`${id}_descripcion`)?.toString() || "" };
      return updatedItem;
    });
    if (Array.isArray(data.items)) data.items = updateditems;
    else data.items = updateditems;
  }

  await updateEstructuraPageSection("servicios", "servicios", data);
  revalidatePath("/", "layout");
}

export async function updateServiciosServicioDestacadoPlus(formData: FormData) {
  const estructura = await getEstructura();
  const page = estructura?.sitio.paginas.find((p: any) => p.id === "servicios");
  if (!page) return;

  const data = {
    subtitulo_pequeno: { ...page.secciones.servicio_destacado_plus.subtitulo_pequeno, valor: formData.get("subtitulo_pequeno")?.toString() || "" },
    titulo: { ...page.secciones.servicio_destacado_plus.titulo, valor: formData.get("titulo")?.toString() || "" },
    descripcion: { ...page.secciones.servicio_destacado_plus.descripcion, valor: formData.get("descripcion")?.toString() || "" },
    items: [
      // La lista completa requeriría re-parsear formData para arrays.
      // Por ahora mantendremos el array original y solo actualizaremos los valores que lleguen
    ],
  };

  // Handle arrays explicitly if they exist
  const itemsArray = page.secciones.servicio_destacado_plus.items;
  if (itemsArray) {
    const updateditems = itemsArray.map((item: any) => {
      const id = item.id;
      const updatedItem = { ...item };
      if (formData.has(`${id}_titulo`)) updatedItem.titulo = { ...updatedItem.titulo, valor: formData.get(`${id}_titulo`)?.toString() || "" };
      if (formData.has(`${id}_descripcion`)) updatedItem.descripcion = { ...updatedItem.descripcion, valor: formData.get(`${id}_descripcion`)?.toString() || "" };
      return updatedItem;
    });
    if (Array.isArray(data.items)) data.items = updateditems;
    else data.items = updateditems;
  }

  await updateEstructuraPageSection("servicios", "servicio_destacado_plus", data);
  revalidatePath("/", "layout");
}

export async function updateServiciosRutasLocalidadesHorarios(formData: FormData) {
  const estructura = await getEstructura();
  const page = estructura?.sitio.paginas.find((p: any) => p.id === "servicios");
  if (!page) return;

  const data = {
    nota: page.secciones.rutas_localidades_horarios.nota,
    permite_agregar: page.secciones.rutas_localidades_horarios.permite_agregar,
    titulo: { ...page.secciones.rutas_localidades_horarios.titulo, valor: formData.get("titulo")?.toString() || "" },
    descripcion: { ...page.secciones.rutas_localidades_horarios.descripcion, valor: formData.get("descripcion")?.toString() || "" },
    tabla: {
      ...page.secciones.rutas_localidades_horarios.tabla,
      // mapping filas...
    },
  };

  // Handle arrays explicitly if they exist
  const tablaArray = page.secciones.rutas_localidades_horarios.tabla.filas;
  if (tablaArray) {
    const updatedtabla = tablaArray.map((item: any) => {
      const id = item.id;
      const updatedItem = { ...item };
      if (formData.has(`${id}_localidad`)) updatedItem.localidad = { ...updatedItem.localidad, valor: formData.get(`${id}_localidad`)?.toString() || "" };
      if (formData.has(`${id}_dias`)) updatedItem.dias = { ...updatedItem.dias, valor: formData.get(`${id}_dias`)?.toString() || "" };
      if (formData.has(`${id}_horario`)) updatedItem.horario = { ...updatedItem.horario, valor: formData.get(`${id}_horario`)?.toString() || "" };
      updatedItem.estado = { activa: formData.get(`${id}_activa`) === "on" };
      return updatedItem;
    });
    if (Array.isArray(data.tabla)) data.tabla = updatedtabla;
    else data.tabla.filas = updatedtabla;
  }

  await updateEstructuraPageSection("servicios", "rutas_localidades_horarios", data);
  revalidatePath("/", "layout");
}

export async function updateServiciosSectoresAtendidos(formData: FormData) {
  const estructura = await getEstructura();
  const page = estructura?.sitio.paginas.find((p: any) => p.id === "servicios");
  if (!page) return;

  const data: any = {
    nota: page.secciones.sectores_atendidos.nota,
    permite_agregar: page.secciones.sectores_atendidos.permite_agregar,
    titulo: { ...page.secciones.sectores_atendidos.titulo, valor: formData.get("titulo")?.toString() || "" },
    sectores: [] as any[],
  };

  // Handle arrays explicitly if they exist
  const sectoresArray = page.secciones.sectores_atendidos.sectores;
  if (sectoresArray) {
    data.sectores = await Promise.all(
      sectoresArray.map(async (item: any) => {
        const id = item.id;
        const updatedItem = { ...item };
        const uploaded = await uploadMediaFile(formData.get(`${id}_imagen`), {
          pageSlug: "servicios",
          sectionKey: "sectores_atendidos",
        });
        if (uploaded) updatedItem.imagen = { ...updatedItem.imagen, valor: uploaded.url, key: uploaded.key };
        if (formData.has(`${id}_titulo`)) updatedItem.titulo = { ...updatedItem.titulo, valor: formData.get(`${id}_titulo`)?.toString() || "" };
        if (formData.has(`${id}_descripcion`)) updatedItem.descripcion = { ...updatedItem.descripcion, valor: formData.get(`${id}_descripcion`)?.toString() || "" };
        return updatedItem;
      })
    );
  }

  await updateEstructuraPageSection("servicios", "sectores_atendidos", data);
  revalidatePath("/", "layout");
}

export async function updateServiciosTarifasYProductos(formData: FormData) {
  const estructura = await getEstructura();
  const page = estructura?.sitio.paginas.find((p: any) => p.id === "servicios");
  if (!page) return;

  const data = {
    titulo: { ...page.secciones.tarifas_y_productos.titulo, valor: formData.get("titulo")?.toString() || "" },
    descripcion: { ...page.secciones.tarifas_y_productos.descripcion, valor: formData.get("descripcion")?.toString() || "" },
    cta: { ...page.secciones.tarifas_y_productos.cta, texto: formData.get("cta_texto")?.toString() || "", url: formData.get("cta_url")?.toString() || "" },
    productos_aprovechados: {
      ...page.secciones.tarifas_y_productos.productos_aprovechados,
      // mapping items...
    },
  };

  // Handle arrays explicitly if they exist
  const productos_aprovechadosArray = page.secciones.tarifas_y_productos.productos_aprovechados.items;
  if (productos_aprovechadosArray) {
    const updatedproductos_aprovechados = productos_aprovechadosArray.map((item: any) => {
      const id = item.id;
      const updatedItem = { ...item };
      if (formData.has(`${id}_nombre`)) updatedItem.nombre = { ...updatedItem.nombre, valor: formData.get(`${id}_nombre`)?.toString() || "" };
      return updatedItem;
    });
    if (Array.isArray(data.productos_aprovechados)) data.productos_aprovechados = updatedproductos_aprovechados;
    else data.productos_aprovechados.items = updatedproductos_aprovechados;
  }

  await updateEstructuraPageSection("servicios", "tarifas_y_productos", data);
  revalidatePath("/", "layout");
}

export async function updateServiciosCtaFinal(formData: FormData) {
  const estructura = await getEstructura();
  const page = estructura?.sitio.paginas.find((p: any) => p.id === "servicios");
  if (!page) return;

  const data = {
    titulo: { ...page.secciones.cta_final.titulo, valor: formData.get("titulo")?.toString() || "" },
    descripcion: { ...page.secciones.cta_final.descripcion, valor: formData.get("descripcion")?.toString() || "" },
    boton: { ...page.secciones.cta_final.boton, texto: formData.get("boton_texto")?.toString() || "", url: formData.get("boton_url")?.toString() || "" },
  };

  // Handle arrays explicitly if they exist


  await updateEstructuraPageSection("servicios", "cta_final", data);
  revalidatePath("/", "layout");
}


export async function updateServiciosMenuPreview(formData: FormData) {
  const estructura = await getEstructura();
  const page = estructura?.sitio.paginas.find((p: any) => p.id === "servicios");
  if (!page) return;

  const section = page.secciones.menu_preview;
  const data: any = {};

  for (const key of ["descripcion", "rutas", "sectores", "tarifa"] as const) {
    const uploaded = await uploadMediaFile(formData.get(key), {
      pageSlug: "servicios",
      sectionKey: "menu_preview",
    });
    if (uploaded) {
      data[key] = { ...section[key], valor: uploaded.url, key: uploaded.key };
    }
  }

  await updateEstructuraPageSection("servicios", "menu_preview", data);
  revalidatePath("/", "layout");
}
