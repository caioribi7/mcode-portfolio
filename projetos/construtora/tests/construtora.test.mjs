import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runInNewContext } from 'node:vm';

const projectDir = fileURLToPath(new URL('../', import.meta.url));
const appSource = readFileSync(new URL('../app.mjs', import.meta.url), 'utf8');

test('index.html has valid internal anchors, conceptual notices, and no fake contact endpoints', async () => {
  const html = await readFile(join(projectDir, 'index.html'), 'utf8');

  // Identificação explícita de projeto conceitual e referências ilustrativas
  assert.match(html, /DEMONSTRAÇÃO CONCEITUAL MCODE/);
  assert.match(html, /VÉRTICE/);
  assert.match(html, /Engenharia &amp; Obra/);
  assert.match(html, /Estudo de referência visual/);
  assert.match(html, /Nenhum dado pessoal é solicitado ou enviado por esta demonstração/);

  // Proibição de destinos falsos ou mensagens enganosas de envio
  assert.doesNotMatch(html, /mailto:/i);
  assert.doesNotMatch(html, /tel:/i);
  assert.doesNotMatch(html, /mensagem enviada/i);

  // Todos os ids presentes no HTML e âncoras correspondentes
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));
  const anchors = [...html.matchAll(/\bhref="#([^"]+)"/g)].map((m) => m[1]);
  assert.ok(anchors.length >= 8, 'Deve conter links de navegação por âncora');
  for (const anchor of anchors) {
    assert.ok(ids.has(anchor), `Âncora #${anchor} deve apontar para um id existente no HTML`);
  }

  // Imagens devem possuir alt, width e height
  const imgTags = [...html.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
  assert.ok(imgTags.length >= 5, 'Deve conter a marca e as ilustrações arquitetônicas');
  for (const tag of imgTags) {
    assert.match(tag, /\bwidth="\d+"/);
    assert.match(tag, /\bheight="\d+"/);
    assert.match(tag, /\balt="[^"]*"/);
  }
});

test('all referenced local assets and OFL font licenses exist on disk', async () => {
  const html = await readFile(join(projectDir, 'index.html'), 'utf8');
  const css = await readFile(join(projectDir, 'styles.css'), 'utf8');

  const refs = [
    ...[...html.matchAll(/(?:src|href)="([^"#]+)"/g)].map((m) => m[1]),
    ...[...css.matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g)].map((m) => m[1]),
    'assets/fonts/OFL-SpaceGrotesk.txt',
    'assets/fonts/OFL-GeistMono.txt',
  ];

  for (const ref of refs) {
    if (/^[a-z]+:/i.test(ref)) continue;
    const fileStat = await stat(join(projectDir, ref));
    assert.ok(fileStat.isFile() && fileStat.size > 0, `Asset ausente ou vazio: ${ref}`);
  }
});

test('mobile menu interaction manages aria-expanded, Escape key, and navigation closing', () => {
  const makeNode = (props = {}) => {
    const attrs = new Map(Object.entries(props.attrs || {}));
    const classes = new Set(props.classes || []);
    return {
      id: props.id || '',
      events: {},
      focused: false,
      addEventListener(type, fn) { (this.events[type] ??= []).push(fn); },
      setAttribute(k, v) { attrs.set(k, String(v)); },
      getAttribute(k) { return attrs.get(k) ?? null; },
      focus() { this.focused = true; },
      classList: {
        add(c) { classes.add(c); },
        toggle(c, force) {
          const next = force === undefined ? !classes.has(c) : Boolean(force);
          if (next) classes.add(c); else classes.delete(c);
          return next;
        },
        contains(c) { return classes.has(c); },
      },
    };
  };

  const menuToggle = makeNode({ attrs: { 'aria-expanded': 'false' } });
  const primaryNav = makeNode({ id: 'primary-nav' });
  const singletons = new Map([
    ['.menu-toggle', menuToggle],
    ['#primary-nav', primaryNav],
  ]);

  const docEvents = {};
  const document = {
    documentElement: makeNode(),
    addEventListener(type, fn) { (docEvents[type] ??= []).push(fn); },
    querySelector(sel) { return singletons.get(sel) || null; },
  };

  const mediaListeners = [];
  const window = {
    matchMedia() {
      return {
        matches: false,
        addEventListener(type, fn) { mediaListeners.push(fn); },
      };
    },
  };

  runInNewContext(appSource, { document, window });

  // Verifica classe js-ready
  assert.equal(document.documentElement.classList.contains('js-ready'), true);

  // Abertura do menu móvel
  menuToggle.events.click[0]();
  assert.equal(menuToggle.getAttribute('aria-expanded'), 'true');
  assert.equal(primaryNav.classList.contains('is-open'), true);

  // Fechamento com tecla Escape e retorno de foco
  docEvents.keydown[0]({ key: 'Escape' });
  assert.equal(menuToggle.getAttribute('aria-expanded'), 'false');
  assert.equal(primaryNav.classList.contains('is-open'), false);
  assert.equal(menuToggle.focused, true);

  // Fechamento ao clicar em link da navegação
  menuToggle.events.click[0]();
  assert.equal(menuToggle.getAttribute('aria-expanded'), 'true');
  primaryNav.events.click[0]({
    target: { closest(sel) { return sel === 'a' ? true : null; } },
  });
  assert.equal(menuToggle.getAttribute('aria-expanded'), 'false');
  assert.equal(primaryNav.classList.contains('is-open'), false);
});
