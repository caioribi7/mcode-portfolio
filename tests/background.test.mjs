import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const source = readFileSync(new URL('../contour-background.mjs', import.meta.url), 'utf8');

function setup({ webgl = 'webgl2' } = {}) {
  const events = {}, frames = new Map(), uniforms = {};
  let sequence = 0, draws = 0;
  const known = {
    getShaderParameter: () => true, getShaderInfoLog: () => '',
    getUniformLocation: (_, name) => name,
    uniform1f(name, value) { assert.ok(Number.isFinite(value), name); uniforms[name] = value; },
    uniform2f(name, a, b) { assert.ok(Number.isFinite(a + b), name); uniforms[name] = [a, b]; },
    drawArrays() { draws++; },
  };
  const gl = new Proxy(known, {
    get: (target, key) => key in target ? target[key] : (/^[A-Z0-9_]+$/.test(String(key)) ? key : () => ({})),
  });
  const contexts = [];
  const canvas = { getContext(type) { contexts.push(type); return type === webgl ? gl : null; } };
  const document = {
    hidden: false, querySelector: () => canvas,
    addEventListener(type, callback) { events[type] = callback; },
    documentElement: { addEventListener(type, callback) { events[type] = callback; } },
  };
  runInNewContext(source, {
    document, console, Float32Array, performance: { now: () => 0 },
    window: { innerWidth: 390, innerHeight: 844, devicePixelRatio: 3, addEventListener(type, cb) { events[type] = cb; } },
    requestAnimationFrame(callback) { frames.set(++sequence, callback); return sequence; },
  });
  const step = time => {
    const [id, callback] = frames.entries().next().value;
    frames.delete(id);
    callback(time);
  };
  return { events, frames, uniforms, canvas, contexts, step, get draws() { return draws; } };
}

test('contour field renders at capped ratio and keeps animating', () => {
  const state = setup();
  assert.equal(state.canvas.width, 585, 'Pixel ratio capped at 1.5');
  assert.equal(state.frames.size, 1);
  state.step(16);
  const first = state.uniforms.uTime;
  state.step(32);
  assert.ok(state.uniforms.uTime > first, 'Time advances');
  assert.equal(state.uniforms.uScale, 1.4, 'Wider contours on phones');
  assert.equal(state.frames.size, 1, 'Never stops, no reduced-motion pause');
});

test('the hill follows the pointer and wanders on its own when idle', () => {
  const state = setup();
  state.events.pointermove({ clientX: 100, clientY: 200 });
  for (let t = 16; t < 1500; t += 16) state.step(t);
  const [x, y] = state.uniforms.uHill;
  assert.ok(Math.abs(x - 150) < 2 && Math.abs(y - (844 - 200) * 1.5) < 2, 'Hill sits under the pointer');
  assert.ok(state.uniforms.uLift > 0.95);
  state.events.pointerleave();
  for (let t = 1500; t < 4000; t += 16) state.step(t);
  assert.ok(state.uniforms.uLift < 0.7, 'Hill softens when the pointer leaves');
  const before = state.uniforms.uHill.join();
  state.step(4100);
  assert.notEqual(state.uniforms.uHill.join(), before, 'Hill keeps wandering');
});

test('falls back to WebGL1 and is a no-op without WebGL', () => {
  const v1 = setup({ webgl: 'webgl' });
  assert.deepEqual(v1.contexts, ['webgl2', 'webgl']);
  assert.equal(v1.frames.size, 1);
  const none = setup({ webgl: null });
  assert.equal(none.frames.size, 0);
  assert.equal(none.events.pointermove, undefined);
});
