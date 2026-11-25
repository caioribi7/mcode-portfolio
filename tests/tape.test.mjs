import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('the old ticker is replaced by a divider whose spark keeps running', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../styles.css', import.meta.url), 'utf8');
  assert.doesNotMatch(html, /class="ticker/);
  assert.match(html, /<div class="hero-divider" aria-hidden="true"><span class="hero-divider-spark"><\/span><\/div>/);
  assert.match(css, /animation: divider-run [\d.]+s [^;]*infinite/);
  assert.doesNotMatch(css, /animation: none !important/);
});

test('buttons are square, without pearl pills, icons, arrows or metallic text', () => {
  for (const page of ['index.html', 'caioribi/index.html', 'mateusdias/index.html', '404.html']) {
    const html = readFileSync(new URL(`../${page}`, import.meta.url), 'utf8');
    assert.doesNotMatch(html, /class="pearl|pearl-star|href="#arrow"|link-arrow|contact-option-arrow|sheen/, page);
  }
});
