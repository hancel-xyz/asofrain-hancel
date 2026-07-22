"use server";

import { insforge } from "./insforge";

export async function getEstructura(): Promise<any> {
  try {
    const { data: pages, error: pagesError } = await insforge.database
      .from("pages")
      .select("id, slug, nombre, ruta");
    if (pagesError) throw pagesError;
    if (!pages) throw new Error("No pages found in InsForge");

    const { data: sections, error: sectionsError } = await insforge.database
      .from("page_sections")
      .select("page_id, section_key, data");
    if (sectionsError) throw sectionsError;

    const sectionsByPage = new Map<string, Record<string, any>>();
    for (const s of (sections ?? []) as { page_id: string; section_key: string; data: any }[]) {
      if (!sectionsByPage.has(s.page_id)) sectionsByPage.set(s.page_id, {});
      sectionsByPage.get(s.page_id)![s.section_key] = s.data;
    }

    const paginas = (pages as { id: string; slug: string; nombre: string; ruta: string }[]).map((p) => ({
      id: p.slug,
      nombre: p.nombre,
      ruta: p.ruta,
      secciones: sectionsByPage.get(p.id) ?? {},
    }));

    return { sitio: { paginas } };
  } catch (error) {
    console.error("Error reading estructura from InsForge:", error);
    return null;
  }
}

export async function updateEstructuraPageSection(pageId: string, sectionId: string, newData: any) {
  try {
    const { data: page, error: pageError } = await insforge.database
      .from("pages")
      .select("id")
      .eq("slug", pageId)
      .maybeSingle();
    if (pageError) throw pageError;
    if (!page) throw new Error(`Page ${pageId} not found`);

    const { data: section, error: sectionError } = await insforge.database
      .from("page_sections")
      .select("id, data")
      .eq("page_id", page.id)
      .eq("section_key", sectionId)
      .maybeSingle();
    if (sectionError) throw sectionError;
    if (!section) throw new Error(`Section ${sectionId} not found in page ${pageId}`);

    const currentData: Record<string, any> = (section.data as Record<string, any>) ?? {};
    const merged: Record<string, any> = { ...currentData };

    // Merge new data into the section. Only update keys that exist in newData.
    for (const key of Object.keys(newData)) {
      const currentValue = currentData[key];
      const newValue = newData[key];
      if (Array.isArray(newValue)) {
        // Arrays are replaced wholesale, never object-spread (spreading an
        // array merges by index into a plain object, corrupting the list)
        merged[key] = newValue;
      } else if (currentValue && typeof currentValue === "object" && typeof newValue === "object") {
        // We assume the structure is { valor: "..." } or similar
        merged[key] = { ...currentValue, ...newValue };
      } else {
        // If it's a new key, just set it
        merged[key] = newValue;
      }
    }

    const { error: updateError } = await insforge.database
      .from("page_sections")
      .update({ data: merged })
      .eq("id", section.id);
    if (updateError) throw updateError;

    return true;
  } catch (error) {
    console.error("Error writing section to InsForge:", error);
    throw error;
  }
}
