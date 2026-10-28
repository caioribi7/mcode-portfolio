import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const source = readFileSync(new URL('../cursor.mjs', import.meta.url), 'utf8');

function setup({ reduced = false, fine = true } = {}) {
  const events = {}, frames = new Map(), classes = new Set();
  const prefs = { matches: reduced, addEventListener(_, fn) { this.change = fn; } };
  const cursor = {
    dataset: {}, style: { setProperty() {} }, classList: { add() {}, remove() {} },
    querySelector() { return { textContent: '' }; },
  };
  const document = {
    hidden: false,
    querySelector() { return cursor; },
    addEventListener(type, fn) { events[type] = fn; },
    documentElement: {
      addEventListener(type, fn) { events[type] = fn; },
      classList: { add: key => classes.add(key), remove: key => classes.delete(key) },
    },
  };
  runInNewContext(source, {
    document,
    window: { addEventListener(type, fn) { events[type] = fn; } },
    matchMedia: query => query.includes('reduced') ? prefs : { matches: fine, addEventListener() {} },
    requestAnimationFrame(fn) { frames.set(1, fn); return 1; },
    cancelAnimationFrame(id) { frames.delete(id); },
  });
  function move(kind = '') {
    events.pointermove({ pointerType: 'mouse', clientX: 100, clientY: 120, target: {
      closest: selector => selector.includes(kind) && kind ? {} : null,
    } });
  }
  return { events, frames, classes, cursor, prefs, move };
}

test('cursor adapts to projects and links, and restores the native cursor for fields and keyboard', () => {
  const state = setup();
  state.move('.project');
  assert.equal(state.cursor.dataset.mode, 'project');
  assert.equal(state.classes.has('cursor-ready'), true);
  state.move('button');
  assert.equal(state.cursor.dataset.mode, 'link');
  state.move('input');
  assert.equal(state.classes.has('cursor-ready'), false);
  assert.equal(state.frames.size, 0);
  state.move();
  state.events.keydown({ key: 'Tab' });
  assert.equal(state.classes.has('cursor-ready'), false);
});

test('touch pointers keep the native cursor and do not schedule animation', () => {
  for (const options of [{ fine: false }]) {
    const state = setup(options);
    state.move();
    assert.equal(state.classes.has('cursor-ready'), false);
    assert.equal(state.frames.size, 0);
  }
  const state = setup();
  state.move();
  state.prefs.matches = true;
  state.prefs.change();
  assert.equal(state.classes.has('cursor-ready'), false);
  assert.equal(state.frames.size, 0);
});

test('reduced motion still shows the terminal cursor but tracks directly without an animation loop', () => {
  const state = setup({ reduced: true });
  state.move('button');
  assert.equal(state.classes.has('cursor-ready'), true);
  assert.equal(state.cursor.dataset.mode, 'link');
  assert.equal(state.frames.size, 0);
  assert.equal(state.cursor.style.transform, 'translate3d(100px, 120px, 0)');
});
