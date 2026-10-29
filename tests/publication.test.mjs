import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, readdir, cp, rm, lstat, realpath } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { prepareSite, PUBLIC_FILES } from '../scripts/prepare-site.mjs';

const project = fileURLToPath(new URL('../', import.meta.url));

async function fixture(t) {
  const base = await realpath(tmpdir());
  const root = await mkdtemp(join(base, 'mcode-publication-'));
  t.after(async () => {
    // Validate the absolute deletion target before recursive cleanup on Windows.
    assert.equal(dirname(root), base);
    assert.ok(root.startsWith(join(base, 'mcode-publication-')));
    await rm(root, { recursive: true, force: true });
  });
  for (const file of PUBLIC_FILES) {
    await mkdir(dirname(join(root, file)), { recursive: true });
    await cp(join(project, file), join(root, file));
  }
  return root;
}

async function listFiles(root, current = root) {
  const files = [];
  for (const item of await readdir(current, { withFileTypes: true })) {
    const target = join(current, item.name);
    if (item.isDirectory()) files.push(...await listFiles(root, target));
    else files.push(relative(root, target).split(sep).join('/'));
  }
  return files.sort();
}

test('publication includes only explicit assets and licenses, never local secrets or docs', async (t) => {
  const root = await fixture(t);
  await writeFile(join(root, '.env'), 'EXAMPLE_SECRET=fixture-only');
  await mkdir(join(root, 'docs'));
  await writeFile(join(root, 'docs', 'private.md'), 'not public');
  await writeFile(join(root, 'assets', 'README.md'), 'not public');
  const output = await prepareSite(root);
  assert.deepEqual(await listFiles(output), [...PUBLIC_FILES].sort());
  for (const file of PUBLIC_FILES) {
    assert.deepEqual(await readFile(join(output, file)), await readFile(join(root, file)));
  }
  for (const file of PUBLIC_FILES.filter((name) => /\.(?:html|css|mjs)$/.test(name))) {
    const content = await readFile(join(output, file), 'utf8');
    const references = [
      ...content.matchAll(/(?:src|href)="([^"#]+)"/g),
      ...content.matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g),
      ...content.matchAll(/\bfrom\s+['"]([^'"]+)['"]/g),
    ];
    for (const match of references) {
      if (/^(?:[a-z]+:|#)/i.test(match[1])) continue;
      const link = match[1].endsWith('/') ? `${match[1]}index.html` : match[1];
      const target = link.startsWith('/')
        ? join(output, link.slice(1)) : join(dirname(join(output, file)), link);
      assert.ok((await lstat(target)).isFile(), `${file}: missing ${match[1]}`);
    }
  }
});

test('unexpected files in dist block packaging and are preserved', async (t) => {
  const root = await fixture(t);
  const output = await prepareSite(root);
  await writeFile(join(output, '.env'), 'fixture-only');
  await assert.rejects(prepareSite(root), /recusado|inesperado/);
  assert.equal(await readFile(join(output, '.env'), 'utf8'), 'fixture-only');
});

test('repackaging refreshes source changes and a missing source aborts before copying', async (t) => {
  const root = await fixture(t);
  const output = await prepareSite(root);
  await writeFile(join(root, 'app.mjs'), '// refreshed fixture');
  await prepareSite(root);
  assert.equal(await readFile(join(output, 'app.mjs'), 'utf8'), '// refreshed fixture');
  await rm(join(root, '404.html'));
  await assert.rejects(prepareSite(root), { code: 'ENOENT' });
  assert.ok((await lstat(join(output, '404.html'))).isFile());
});
