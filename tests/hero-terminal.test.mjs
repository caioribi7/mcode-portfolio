import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

test('hero terminal types mcode start and then plays the pre-rendered 3D scene', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(html, /<script src="hero-terminal\.mjs" type="module"><\/script>/);
  assert.match(html, /id="hero-term" role="img" aria-label="[^"]+"/);
  assert.match(html, /<source src="assets\/mcode-terminal\.webm" type="video\/webm">/);
  assert.match(html, /<source src="assets\/mcode-terminal\.mp4" type="video\/mp4">/);
  assert.doesNotMatch(html, /logo-canvas|logo-animation/);
  for (const ext of ['webm', 'mp4']) assert.ok(existsSync(new URL(`../assets/mcode-terminal.${ext}`, import.meta.url)));
  const js = readFileSync(new URL('../hero-terminal.mjs', import.meta.url), 'utf8');
  assert.match(js, /mcode start/);
  assert.match(js, /\.play\(\)/);
  assert.ok((js.match(/\bcycle\(\);/g) || []).length >= 2, 'The loop restarts itself');
  assert.doesNotMatch(js, /prefers-reduced-motion/, 'Animation stays active by explicit request');
});
