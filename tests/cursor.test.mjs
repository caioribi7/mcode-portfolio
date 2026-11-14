import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const source = readFileSync(new URL('../cursor.mjs', import.meta.url), 'utf8');

function setup({ reduced = false, fine = true } = {}) {
  const events = {}, frames = new Map(), classes = new Set();
  let sequence = 0;
  const prefs = { matches: reduced, addEventListener(_, fn) { this.change = fn; } };
  const makeCanvas = () => {
    const cells = [];
    const ctx = {
      globalAlpha: 1, fillStyle: '', scale() {},
      clearRect() { cells.length = 0; },
      fillRect(x, y, w, h) { assert.ok(Number.isFinite(x + y + w + h)); cells.push({ x, y }); },
    };
    return { cells, getContext: () => ctx };
  };
  const ring = makeCanvas(), core = makeCanvas();
  const cursor = {
    style: {},
    querySelector: selector => (selector === '.cursor-ring' ? ring : core),
  };
  const document = {
    hidden: false,
    querySelector: () => cursor,
    addEventListener(type, fn) { events[type] = fn; },
    documentElement: {
      addEventListener(type, fn) { events[type] = fn; },
      classList: { add: key => classes.add(key), remove: key => classes.delete(key) },
    },
  };
  runInNewContext(source, {
    document,
    window: { devicePixelRatio: 2, addEventListener(type, fn) { events[type] = fn; } },
    matchMedia: query => (query.includes('reduced') ? prefs : { matches: fine, addEventListener() {} }),
    requestAnimationFrame(fn) { frames.set(++sequence, fn); return sequence; },
    cancelAnimationFrame(id) { frames.delete(id); },
  });
  function move(kind = '', x = 100, y = 120) {
    events.pointermove({ pointerType: 'mouse', clientX: x, clientY: y, target: {
      closest: selector => (kind && selector.includes(kind) ? {} : null),
    } });
  }
  function step(time) {
    const [id, fn] = frames.entries().next().value;
    frames.delete(id);
    fn(time);
  }
  const extent = canvas => Math.max(...canvas.cells.map(c => Math.hypot(c.x - 20, c.y - 20)));
  return { events, frames, classes, cursor, ring, core, prefs, move, step, extent };
}

test('cursor sits exactly on the pointer, with no trailing', () => {
  const state = setup();
  state.move('', 100, 120);
  assert.equal(state.cursor.style.transform, 'translate3d(100px, 120px, 0)');
  state.move('', 640, 300);
  assert.equal(state.cursor.style.transform, 'translate3d(640px, 300px, 0)', 'Position updates inside the event, before any frame');
  assert.equal(state.classes.has('cursor-ready'), true);
  state.step(16);
  assert.ok(state.ring.cells.length > 20, 'Dithered ring is drawn');
  assert.ok(state.core.cells.length > 0, 'Dithered core is drawn');
});

test('ring grows over links and the dither animates over time', () => {
  const state = setup();
  state.move();
  state.step(16);
  const rest = state.extent(state.ring);
  const restCells = state.ring.cells.map(c => `${c.x},${c.y}`).join();
  state.step(400);
  assert.notEqual(state.ring.cells.map(c => `${c.x},${c.y}`).join(), restCells, 'Ring wobbles');
  state.move('button');
  for (let time = 416; time < 1400; time += 16) state.step(time);
  assert.ok(state.extent(state.ring) > rest + 2, 'Ring expands over interactive elements');
});

test('fields, keyboard and touch restore the native cursor', () => {
  const state = setup();
  state.move();
  state.move('input');
  assert.equal(state.classes.has('cursor-ready'), false);
  assert.equal(state.frames.size, 0);
  state.move();
  state.events.keydown({ key: 'Tab' });
  assert.equal(state.classes.has('cursor-ready'), false);

  const touch = setup({ fine: false });
  touch.move();
  assert.equal(touch.classes.has('cursor-ready'), false);
  assert.equal(touch.frames.size, 0);
});

test('cursor keeps animating under reduced motion (explicit request)', () => {
  const state = setup({ reduced: true });
  state.move('button');
  assert.equal(state.classes.has('cursor-ready'), true);
  assert.equal(state.frames.size, 1, 'Animation loop runs');
  state.step(16);
  assert.equal(state.frames.size, 1, 'and keeps running');
  assert.ok(state.ring.cells.length > 0);
  assert.equal(state.cursor.style.transform, 'translate3d(100px, 120px, 0)');
});
