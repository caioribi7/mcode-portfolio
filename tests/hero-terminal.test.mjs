import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('hero terminal runs a short deploy loop with rising scores, no video', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(html, /<script src="hero-terminal\.mjs" type="module"><\/script>/);
  assert.match(html, /id="hero-term" role="img" aria-label="[^"]+"/);
  assert.equal((html.match(/class="ht-score" data-value="\d+"/g) || []).length, 3);
  assert.doesNotMatch(html, /mcode-terminal\.(webm|mp4)|logo-canvas/);
  const js = readFileSync(new URL('../hero-terminal.mjs', import.meta.url), 'utf8');
  assert.ok((js.match(/\bcycle\(\);/g) || []).length >= 2, 'The loop restarts itself');
  assert.doesNotMatch(js, /prefers-reduced-motion/, 'Animation stays active by explicit request');
});
