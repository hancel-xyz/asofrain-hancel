const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'src/app/admin/nosotros');

const pages = [
  { dir: 'hero', action: 'updateNosotrosHero', section: 'hero', file: 'page.tsx' },
  { dir: 'quienes-somos', action: 'updateNosotrosQuienesSomos', section: 'quienes_somos', file: 'page.tsx' },
  { dir: 'historia', action: 'updateNosotrosHistoria', section: 'historia', file: 'page.tsx' },
  { dir: 'mision', action: 'updateNosotrosMision', section: 'mision', file: 'page.tsx' },
  { dir: 'vision', action: 'updateNosotrosVision', section: 'vision', file: 'page.tsx' },
  { dir: 'valores', action: 'updateNosotrosValores', section: 'valores', file: 'page.tsx' },
  { dir: 'objeto-social', action: 'updateNosotrosObjetoSocial', section: 'objeto_social', file: 'page.tsx' },
  { dir: 'objeto-ambiental', action: 'updateNosotrosObjetoAmbiental', section: 'objeto_ambiental', file: 'page.tsx' },
  { dir: 'frase-1', action: 'updateNosotrosFrase1', section: 'frase_1', file: 'page.tsx' }
];

for (const p of pages) {
  const filePath = path.join(baseDir, p.dir, p.file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Remove "use client";
  content = content.replace(/"use client";\s*/g, '');
  
  // Add imports
  const importToAdd = `import { getEstructura } from "@/lib/data";\nimport { ${p.action} } from "../actions";\n`;
  content = importToAdd + content;
  
  // Change export default function Name() { to async function Name() {
  content = content.replace(/export default function (\w+)\(\) {/, `export default async function $1() {\n  const data = await getEstructura();\n  if (!data) return <div>Error cargando datos</div>;\n  const page = data.sitio.paginas.find((p: any) => p.id === "nosotros");\n  if (!page) return <div>Página no encontrada</div>;\n  const section = page.secciones.${p.section};\n`);
  
  // Change <div className="grid gap-6"> to <form action={actionName} className="grid gap-6">
  content = content.replace(/<div className="grid gap-6">/, `<form action={${p.action}} className="grid gap-6">`);
  // Closing div for form
  content = content.replace(/<\/div>\s*<\/div>\s*\);\s*}/, `</form>\n    </div>\n  );\n}`);
  
  // Replace <Button>Guardar Cambios</Button> with type="submit"
  content = content.replace(/<Button>Guardar Cambios<\/Button>/g, `<Button type="submit">Guardar Cambios</Button>`);
  
  // Also add type="button" to Cancelar
  content = content.replace(/<Button variant="outline">Cancelar<\/Button>/g, `<Button type="button" variant="outline">Cancelar</Button>`);

  // Specific value replacements based on what we see in the action
  if (p.dir === 'hero') {
    content = content.replace(/id="titulo"([^>]*)defaultValue="[^"]*"/, 'id="titulo" name="titulo"$1defaultValue={section.titulo.valor}');
    content = content.replace(/id="descripcion"([^>]*)defaultValue="[^"]*"/, 'id="descripcion" name="descripcion"$1defaultValue={section.descripcion.valor}');
    content = content.replace(/id="cta1_texto"([^>]*)defaultValue="[^"]*"/, 'id="cta1_texto" name="cta1_texto"$1defaultValue={section.cta_1?.texto}');
    content = content.replace(/id="cta1_url"([^>]*)defaultValue="[^"]*"/, 'id="cta1_url" name="cta1_url"$1defaultValue={section.cta_1?.url}');
    content = content.replace(/id="cta2_texto"([^>]*)defaultValue="[^"]*"/, 'id="cta2_texto" name="cta2_texto"$1defaultValue={section.cta_2?.texto}');
    content = content.replace(/id="cta2_url"([^>]*)defaultValue="[^"]*"/, 'id="cta2_url" name="cta2_url"$1defaultValue={section.cta_2?.url}');
  }
  else if (p.dir === 'quienes-somos') {
    content = content.replace(/id="titulo"([^>]*)defaultValue="[^"]*"/, 'id="titulo" name="titulo"$1defaultValue={section.titulo.valor}');
    content = content.replace(/id="descripcion"([^>]*)defaultValue="[^"]*"/, 'id="descripcion" name="descripcion"$1defaultValue={section.descripcion.valor}');
  }
  else if (p.dir === 'historia') {
    content = content.replace(/id="titulo"([^>]*)defaultValue="[^"]*"/, 'id="titulo" name="titulo"$1defaultValue={section.titulo.valor}');
    for (let i = 1; i <= 4; i++) {
      content = content.replace(new RegExp(`id="f${i}_ano"([^>]*)defaultValue="[^"]*"`), `id="f${i}_ano" name="f${i}_ano"$1defaultValue={section.filas[${i-1}]?.ano.valor}`);
      content = content.replace(new RegExp(`id="f${i}_titulo"([^>]*)defaultValue="[^"]*"`), `id="f${i}_titulo" name="f${i}_titulo"$1defaultValue={section.filas[${i-1}]?.titulo.valor}`);
      content = content.replace(new RegExp(`id="f${i}_desc"([^>]*)defaultValue="[^"]*"`), `id="f${i}_desc" name="f${i}_desc"$1defaultValue={section.filas[${i-1}]?.descripcion.valor}`);
    }
  }
  else if (p.dir === 'mision') {
    content = content.replace(/id="descripcion"([^>]*)defaultValue="[^"]*"/, 'id="descripcion" name="descripcion"$1defaultValue={section.descripcion.valor}');
  }
  else if (p.dir === 'vision') {
    content = content.replace(/id="descripcion"([^>]*)defaultValue="[^"]*"/, 'id="descripcion" name="descripcion"$1defaultValue={section.descripcion.valor}');
  }
  else if (p.dir === 'valores') {
    content = content.replace(/id="titulo"([^>]*)defaultValue="[^"]*"/, 'id="titulo" name="titulo"$1defaultValue={section.titulo.valor}');
    // Since we used a .map initially with hardcoded values in page.tsx, we need to rewrite that block
    // Let's replace the whole {[...].map} block with section.cuadros.map
    content = content.replace(/\{\[\s*\{[\s\S]*?\]\.map\(\(v\)/g, `{section.cuadros.map((v: any)`);
    content = content.replace(/v\.title/g, 'v.titulo.valor');
    content = content.replace(/v\.desc/g, 'v.descripcion.valor');
    content = content.replace(/id=\{`c\$\{v\.id\}_titulo`\} defaultValue=\{v\.titulo\.valor\}/g, 'id={`c${v.id}_titulo`} name={`c${v.id}_titulo`} defaultValue={v.titulo.valor}');
    content = content.replace(/id=\{`c\$\{v\.id\}_desc`\} defaultValue=\{v\.descripcion\.valor\}/g, 'id={`c${v.id}_desc`} name={`c${v.id}_desc`} defaultValue={v.descripcion.valor}');
  }
  else if (p.dir === 'objeto-social') {
    content = content.replace(/id="titulo"([^>]*)defaultValue="[^"]*"/, 'id="titulo" name="titulo"$1defaultValue={section.titulo.valor}');
    content = content.replace(/id="descripcion"([^>]*)defaultValue="[^"]*"/, 'id="descripcion" name="descripcion"$1defaultValue={section.descripcion.valor}');
  }
  else if (p.dir === 'objeto-ambiental') {
    content = content.replace(/id="titulo"([^>]*)defaultValue="[^"]*"/, 'id="titulo" name="titulo"$1defaultValue={section.titulo.valor}');
    content = content.replace(/id="descripcion"([^>]*)defaultValue="[^"]*"/, 'id="descripcion" name="descripcion"$1defaultValue={section.descripcion.valor}');
  }
  else if (p.dir === 'frase-1') {
    content = content.replace(/id="titulo_pequeno"([^>]*)defaultValue="[^"]*"/, 'id="titulo_pequeno" name="titulo_pequeno"$1defaultValue={section.titulo_pequeno.valor}');
    content = content.replace(/id="texto_frase"([^>]*)defaultValue="[^"]*"/, 'id="texto_frase" name="texto_frase"$1defaultValue={section.texto.valor}');
  }
  
  fs.writeFileSync(filePath, content, 'utf-8');
}

// Entidades Aliadas (manual block replace since we used 'a' and mapped it)
let eaPath = path.join(baseDir, 'entidades-aliadas', 'page.tsx');
let eaContent = fs.readFileSync(eaPath, 'utf-8');
eaContent = eaContent.replace(/"use client";\s*/g, '');
eaContent = `import { getEstructura } from "@/lib/data";\nimport { updateNosotrosEntidadesAliadas } from "../actions";\n` + eaContent;
eaContent = eaContent.replace(/export default function (\w+)\(\) {/, `export default async function $1() {\n  const data = await getEstructura();\n  if (!data) return <div>Error cargando datos</div>;\n  const page = data.sitio.paginas.find((p: any) => p.id === "nosotros");\n  if (!page) return <div>Página no encontrada</div>;\n  const section = page.secciones.entidades_aliadas;\n`);
eaContent = eaContent.replace(/<div className="grid gap-6">/, `<form action={updateNosotrosEntidadesAliadas} className="grid gap-6">`);
eaContent = eaContent.replace(/<\/div>\s*<\/div>\s*\);\s*}/, `</form>\n    </div>\n  );\n}`);
eaContent = eaContent.replace(/<Button>Guardar Cambios<\/Button>/g, `<Button type="submit">Guardar Cambios</Button>`);
eaContent = eaContent.replace(/<Button variant="outline">Cancelar<\/Button>/g, `<Button type="button" variant="outline">Cancelar</Button>`);
eaContent = eaContent.replace(/id="titulo"([^>]*)defaultValue="[^"]*"/, 'id="titulo" name="titulo"$1defaultValue={section.titulo.valor}');

// Replace hardcoded map with dynamic mapping
eaContent = eaContent.replace(/\{\[\s*\{[\s\S]*?\]\.map\(\(a, i\)/g, `{section.aliados.map((a: any, i: number)`);
eaContent = eaContent.replace(/a\.title/g, 'a.titulo.valor');
eaContent = eaContent.replace(/a\.desc/g, 'a.descripcion.valor');
// Fix ID references to remove 'aliado_' prefix to just the number
eaContent = eaContent.replace(/const idNum = a.id.replace\('aliado_', ''\);/g, ''); // just in case
eaContent = eaContent.replace(/a\$\{a\.id\}/g, 'a_${a.id.replace("aliado_", "")}');
eaContent = eaContent.replace(/defaultValue=\{a\.titulo\.valor\}/g, 'name={`a_${a.id.replace("aliado_", "")}_titulo`} defaultValue={a.titulo.valor}');
eaContent = eaContent.replace(/defaultValue=\{a\.descripcion\.valor\}/g, 'name={`a_${a.id.replace("aliado_", "")}_desc`} defaultValue={a.descripcion.valor}');

fs.writeFileSync(eaPath, eaContent, 'utf-8');

console.log("Done");
