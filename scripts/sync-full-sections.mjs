import "dotenv/config";
import { readFileSync } from "fs";
import { createAdminClient } from "@insforge/sdk";

const insforge = createAdminClient({
  baseUrl: process.env.INSFORGE_URL,
  apiKey: process.env.INSFORGE_API_KEY,
});

const estructura = JSON.parse(readFileSync(new URL("../estructura.json", import.meta.url), "utf-8"));

async function main() {
  for (const pagina of estructura.sitio.paginas) {
    const { data: page, error: pageError } = await insforge.database
      .from("pages")
      .select("id")
      .eq("slug", pagina.id)
      .maybeSingle();
    if (pageError || !page) {
      console.error(`Page not found for slug ${pagina.id}`, pageError);
      continue;
    }

    for (const [sectionKey, sectionData] of Object.entries(pagina.secciones)) {
      const { error } = await insforge.database
        .from("page_sections")
        .update({ data: sectionData })
        .eq("page_id", page.id)
        .eq("section_key", sectionKey);
      if (error) {
        console.error(`Failed to sync ${pagina.id}.${sectionKey}`, error);
      } else {
        console.log(`Synced ${pagina.id}.${sectionKey}`);
      }
    }
  }
}

main();
