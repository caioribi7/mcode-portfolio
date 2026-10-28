import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdtemp, mkdir, copyFile, writeFile, rm, realpath } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';

test('production preview serves only dist, correct MIME, a real 404 and rejects invalid paths', async t => {
  const base = await realpath(tmpdir());
  const root = await mkdtemp(join(base, 'mcode-preview-'));
  let child;
  t.after(async () => {
    if (child && child.exitCode === null) {
      await new Promise(resolve => { child.once('exit', resolve); child.kill(); });
    }
    assert.equal(dirname(root), base);
    assert.ok(root.startsWith(join(base, 'mcode-preview-')));
    await rm(root, { recursive: true, force: true });
  });
  await mkdir(join(root, 'scripts'));
  await mkdir(join(root, 'dist'));
  await copyFile(new URL('../scripts/serve.mjs', import.meta.url), join(root, 'scripts/serve.mjs'));
  await writeFile(join(root, 'dist/index.html'), '<h1>Public site</h1>');
  await writeFile(join(root, 'dist/404.html'), '<h1>Not found</h1>');
  await writeFile(join(root, 'dist/app.mjs'), 'export const publicFile = true;');
  await writeFile(join(root, '.env'), 'PRIVATE_FIXTURE');
  child = spawn(process.execPath, [join(root, 'scripts/serve.mjs'), '--production'], {
    env: { ...process.env, PORT: '0' }, windowsHide: true,
  });
  const port = await new Promise((resolve, reject) => {
    let output = '';
    child.stdout.on('data', chunk => {
      output += chunk;
      const match = output.match(/localhost:(\d+)/);
      if (match) resolve(match[1]);
    });
    child.once('error', reject);
    child.once('exit', code => reject(new Error(`Preview exited: ${code}`)));
  });
  const url = `http://127.0.0.1:${port}`;
  const home = await fetch(url);
  assert.match(home.headers.get('content-type'), /text\/html/);
  assert.equal(await home.text(), '<h1>Public site</h1>');
  assert.match((await fetch(`${url}/app.mjs`)).headers.get('content-type'), /application\/javascript/);
  for (const path of ['/.env', '/scripts/serve.mjs', '/missing-page']) {
    const response = await fetch(url + path);
    assert.equal(response.status, 404);
    assert.equal(await response.text(), '<h1>Not found</h1>');
  }
  assert.equal((await fetch(`${url}/%ZZ`)).status, 400);
  assert.equal((await fetch(`${url}/..%5C.env`)).status, 403);
});
