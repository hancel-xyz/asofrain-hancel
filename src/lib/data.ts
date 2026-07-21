"use server";

import fs from "fs/promises";
import path from "path";

const ESTRUCTURA_PATH = path.join(process.cwd(), "estructura.json");

export async function getEstructura() {
  try {
    const data = await fs.readFile(ESTRUCTURA_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading estructura.json:", error);
    return null;
  }
}

export async function updateEstructuraPageSection(pageId: string, sectionId: string, newData: any) {
  try {
    const estructura = await getEstructura();
    if (!estructura) throw new Error("Could not read estructura.json");

    const pageIndex = estructura.sitio.paginas.findIndex((p: any) => p.id === pageId);
    if (pageIndex === -1) throw new Error(`Page ${pageId} not found`);

    if (!estructura.sitio.paginas[pageIndex].secciones[sectionId]) {
      throw new Error(`Section ${sectionId} not found in page ${pageId}`);
    }

    // Merge new data into the section
    // Only update keys that exist in newData
    for (const key of Object.keys(newData)) {
      const currentValue = estructura.sitio.paginas[pageIndex].secciones[sectionId][key];
      const newValue = newData[key];
      if (Array.isArray(newValue)) {
        // Arrays are replaced wholesale, never object-spread (spreading an
        // array merges by index into a plain object, corrupting the list)
        estructura.sitio.paginas[pageIndex].secciones[sectionId][key] = newValue;
      } else if (currentValue && typeof currentValue === "object" && typeof newValue === "object") {
        // We assume the structure is { valor: "..." } or similar
        estructura.sitio.paginas[pageIndex].secciones[sectionId][key] = {
          ...currentValue,
          ...newValue
        };
      } else {
        // If it's a new key, just set it
        estructura.sitio.paginas[pageIndex].secciones[sectionId][key] = newValue;
      }
    }

    // Write back to file
    await fs.writeFile(ESTRUCTURA_PATH, JSON.stringify(estructura, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error writing to estructura.json:", error);
    throw error;
  }
}
