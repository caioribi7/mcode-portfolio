import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const source = readFileSync(new URL('../liquid-background.mjs', import.meta.url), 'utf8');

function setup({ reduced = false, fine = true, webgl = true } = {}) {
  const events = {}, frames = new Map(), uniforms = {};
  let sequence = 0, draws = 0;
  const known = {
    getShaderParameter: () => true, getProgramParameter: () => true, getShaderInfoLog: () => '',
    getUniformLocation: (_, name) => name,
    uniform1f(name, value) { assert.ok(Number.isFinite(value), name); uniforms[name] = value; },
    uniform2f(name, a, b) { assert.ok(Number.isFinite(a + b), name); uniforms[name] = [a, b]; },
    uniform4fv(name, data) { uniforms[name] = Array.from(data); },
    uniform2fv(name, data) { uniforms[name] = Array.from(data); },
    drawArrays() { draws++; },
  };
  // Qualquer outra chamada WebGL vira um no-op; constantes viram o próprio nome
  const gl = new Proxy(known, {
    get: (target, key) => key in target ? target[key] : (/^[A-Z0-9_]+$/.test(String(key)) ? key : () => ({})),
  });
  const canvas = { getContext: type => (webgl && type === 'webgl2' ? gl : null), addEventListener() {} };
  const document = {
    hidden: false, querySelector: () => canvas,
    addEventListener(type, callback) { events[type] = callback; },
    documentElement: { addEventListener(type, callback) { events[type] = callback; } },
  };
  runInNewContext(source, {
    document, console, Float32Array,
    window: { innerWidth: 390, innerHeight: 844, devicePixelRatio: 3, addEventListener(type, cb) { events[type] = cb; } },
    matchMedia: query => ({ matches: query.includes('reduced') ? reduced : fine, addEventListener() {} }),
    requestAnimationFrame(callback) { frames.set(++sequence, callback); return sequence; },
    cancelAnimationFrame(id) { frames.delete(id); },
  });
  const step = time => {
    const [id, callback] = frames.entries().next().value;
    frames.delete(id);
    callback(time);
  };
  return { events, frames, uniforms, canvas, step, get draws() { return draws; } };
}

test('halftone pass is sharp at capped device ratio and the liquid flows over time', () => {
  const state = setup();
  assert.equal(state.canvas.width, 780, 'Pixel ratio capped at 2 for the halftone pass');
  assert.equal(state.uniforms.uCell, 12, 'Dot cell scales with pixel ratio');
  assert.equal(state.frames.size, 1, 'Ambient animation is scheduled');
  state.step(16);
  const first = state.uniforms.uTime;
  state.step(32);
  assert.ok(state.uniforms.uTime > first, 'Time advances');
});

test('a still pointer keeps stirring; leaving the window releases it; click ripples', () => {
  const state = setup();
  state.events.pointermove({ pointerType: 'mouse', clientX: 150, clientY: 200 });
  state.events.pointerdown({ pointerType: 'mouse', clientX: 150, clientY: 200 });
  for (let time = 16; time < 300; time += 16) state.step(time);
  assert.ok(state.uniforms.uPulse > 0, 'Click ripple is active');
  assert.deepEqual(state.uniforms.uClick, [75, (844 - 200) * 0.5], 'Click is in liquid texture coordinates');
  for (let time = 300; time < 4000; time += 16) state.step(time);
  assert.ok(state.uniforms.uIntensity > 0.99, 'Influence stays while the pointer rests');
  assert.equal(state.uniforms.uPulse, 0);
  state.events.pointerleave();
  for (let time = 4000; time < 6000; time += 16) state.step(time);
  assert.ok(state.uniforms.uIntensity < 0.01, 'Influence fades after the pointer leaves');
});

test('mouse movement leaves a fading stirring trail', () => {
  const state = setup();
  for (let i = 0; i < 6; i++) state.events.pointermove({ pointerType: 'mouse', clientX: 100 + i * 30, clientY: 300 });
  state.step(16);
  const strengths = () => state.uniforms.uTrail.filter((_, i) => i % 4 === 2);
  assert.ok(strengths().filter(v => v > 0).length >= 4, 'Trail points are stirring the liquid');
  for (let time = 32; time < 2000; time += 16) state.step(time);
  assert.ok(strengths().every(v => v === 0), 'Trail fades out');
});

test('flow keeps moving under reduced motion (explicit request); touch is ignored; no WebGL is a no-op', () => {
  const reduced = setup({ reduced: true });
  reduced.step(16);
  reduced.step(32);
  assert.equal(reduced.frames.size, 1, 'Ambient flow continues');

  const touch = setup({ fine: false });
  touch.events.pointermove({ pointerType: 'touch', clientX: 150, clientY: 200 });
  touch.step(16);
  assert.equal(touch.uniforms.uIntensity, 0);

  const none = setup({ webgl: false });
  assert.equal(none.frames.size, 0);
  assert.equal(none.events.pointermove, undefined);
});
