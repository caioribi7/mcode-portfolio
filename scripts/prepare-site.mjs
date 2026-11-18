import { copyFile, lstat, mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));

// Compactação sem dependências e sem perda: tira comentários e espaços que não mudam nada.
// CSS: sem comentários, espaços colapsados e cortados em volta de { } ; , > e no fim do bloco.
// HTML: sem comentários (exceto condicionais) e sem a indentação do começo das linhas;
// o espaço entre palavras e entre tags inline fica intacto. JS fica como está (já é pequeno).
export function minifyCss(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{};,>])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim();
}

export function minifyHtml(html) {
  return html
    .replace(/<!--(?!\[)[\s\S]*?-->/g, '')
    .replace(/\r\n?/g, '\n')
    .replace(/\n[ \t]+/g, '\n')
    .replace(/\n{2,}/g, '\n')
    .trim() + '\n';
}

const MINIFIERS = { '.css': minifyCss, '.html': minifyHtml };

// Explicit publication boundary. Never copy the repository recursively.
export const PUBLIC_FILES = Object.freeze([
  'index.html',
  '404.html',
  'caioribi/index.html',
  'mateusdias/index.html',
  'robots.txt',
  'sitemap.xml',
  'BingSiteAuth.xml',
  'styles.css',
  'refinements.css',
  'app.mjs',
  'cursor.mjs',
  'contour-background.mjs',
  'sheen.mjs',
  'logo-animation.mjs',
  'logo-geometry.mjs',
  'assets/social-preview.jpg',
  'assets/masterbase-capa.mp4',
  'assets/masterbase-capa.webm',
  'assets/masterbase-capa-poster.webp',
  'assets/lemma-capa.mp4',
  'assets/lemma-capa.webm',
  'assets/lemma-capa-poster.webp',
  'assets/sorvebom-mag-cookies.webp',
  'assets/sorvebom-mag-black.webp',
  'assets/sorvebom-picole-abacaxi.webp',
  'assets/sorvebom-pote-sonho-de-verao-2l.webp',
  'assets/sorvebom-pote-leitinho-trufado-zero-1l.webp',
  'assets/cartorio-selo.webp',
  'devs/dev-1.jpg',
  'devs/dev-2.jpg',
  'devs/dev-1.webp',
  'devs/dev-2.webp',
  'assets/fonts/anton.woff2',
  'assets/fonts/space-grotesk.woff2',
  'assets/fonts/geist-mono.woff2',
  'assets/fonts/OFL-SpaceGrotesk.txt',
  'assets/fonts/OFL-GeistMono.txt',
  'assets/fonts/OFL-Anton.txt',
  'MCode-Identidade-Visual/01-Logos-SVG/mcode-horizontal-cor-escuro.svg',
  'MCode-Identidade-Visual/01-Logos-SVG/mcode-simbolo-verde.svg',
  'MCode-Identidade-Visual/03-Web/favicon.svg',
]);

async function statIfPresent(path) {
  try { return await lstat(path); }
  catch (error) { if (error.code === 'ENOENT') return null; throw error; }
}

async function inspectOutput(root, allowedFiles, allowedDirs, current = root) {
  const info = await statIfPresent(current);
  if (!info) return;
  const local = relative(root, current).replaceAll('\\', '/');
  if (info.isSymbolicLink()) throw new Error(`Link simbólico recusado em dist/: ${local || '.'}`);
  if (info.isDirectory()) {
    if (local && !allowedDirs.has(local)) throw new Error(`Diretório inesperado em dist/: ${local}`);
    for (const entry of await readdir(current)) {
      await inspectOutput(root, allowedFiles, allowedDirs, join(current, entry));
    }
  } else if (!info.isFile() || !allowedFiles.has(local) || info.nlink !== 1) {
    throw new Error(`Arquivo inesperado ou vínculo recusado em dist/: ${local || '.'}`);
  }
}

export async function prepareSite(sourceDirectory = projectRoot) {
  const source = resolve(sourceDirectory);
  const output = join(source, 'dist');
  const directories = new Set();
  for (const file of PUBLIC_FILES) {
    // Check all source segments: copying a symlink could disclose local files.
    const parts = file.split('/');
    let cursor = source;
    for (const [index, part] of parts.entries()) {
      cursor = join(cursor, part);
      const info = await lstat(cursor);
      if (info.isSymbolicLink() || (index === parts.length - 1 ? !info.isFile() : !info.isDirectory())) {
        throw new Error(`Origem inválida ou link simbólico: ${file}`);
      }
    }
    let directory = dirname(file).replaceAll('\\', '/');
    while (directory !== '.') {
      directories.add(directory);
      directory = dirname(directory).replaceAll('\\', '/');
    }
  }
  // Refuse stale/unknown contents instead of deleting user files automatically.
  await inspectOutput(output, new Set(PUBLIC_FILES), directories);
  await mkdir(output, { recursive: true });
  for (const file of PUBLIC_FILES) {
    const target = join(output, file);
    await mkdir(dirname(target), { recursive: true });
    const minify = MINIFIERS[file.slice(file.lastIndexOf('.'))];
    if (minify) await writeFile(target, minify(await readFile(join(source, file), 'utf8')));
    else await copyFile(join(source, file), target);
  }
  return output;
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  try {
    const output = await prepareSite();
    console.log(`${PUBLIC_FILES.length} arquivos copiados para ${output}`);
  } catch (error) {
    console.error(`Publicação local não preparada: ${error.message}`);
    process.exitCode = 1;
  }
}
