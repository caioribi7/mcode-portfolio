import { copyFile, lstat, mkdir, readdir } from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));

// Explicit publication boundary. Never copy the repository recursively.
export const PUBLIC_FILES = Object.freeze([
  'index.html',
  '404.html',
  'robots.txt',
  'styles.css',
  'refinements.css',
  'app.mjs',
  'cursor.mjs',
  'halftone-background.mjs',
  'brief.mjs',
  'logo-animation.mjs',
  'logo-geometry.mjs',
  'assets/frame-composition.svg',
  'assets/social-preview.jpg',
  'assets/fonts/anton.ttf',
  'assets/fonts/barlow.ttf',
  'assets/fonts/space-grotesk.ttf',
  'assets/fonts/geist-mono.ttf',
  'assets/fonts/OFL-SpaceGrotesk.txt',
  'assets/fonts/OFL-GeistMono.txt',
  'assets/fonts/OFL-Anton.txt',
  'assets/fonts/OFL-Barlow.txt',
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
    await copyFile(join(source, file), target);
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
