import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const source = readFileSync(new URL('../liquid-background.mjs', import.meta.url), 'utf8');

function setup({ reduced = false, fine = true, webgl = true } = {}) {
  const events = {}, frames = new Map(), uniforms = {};
  let sequence = 0, draws = 0;
  const gl = {
    createShader: () => ({}), shaderSource() {}, compileShader() {}, getShaderParameter: () => true,
    getShaderInfoLog: () => '', createProgram: () => ({}), attachShader() {}, linkProgram() {},
    getProgramParameter: () => true, useProgram() {}, createBuffer: () => ({}), bindBuffer() {},
    bufferData() {}, getAttribLocation: () => 0, enableVertexAttribArray() {}, vertexAttribPointer() {},
    getUniformLocation: (_, name) => name, viewport() {},
    uniform1f(name, value) { assert.ok(Number.isFinite(value), name); uniforms[name] = value; },
    uniform2f(name, a, b) { assert.ok(Number.isFinite(a + b), name); uniforms[name] = [a, b]; },
    drawArrays() { draws++; },
  };
  const canvas = { getContext: type => (webgl && type === 'webgl2' ? gl : null), addEventListener() {} };
  const document = {
    hidden: false, querySelector: () => canvas,
    addEventListener(type, callback) { events[type] = callback; },
    documentElement: { addEventListener(type, callback) { events[type] = callback; } },
  };
  let now = 0;
  runInNewContext(source, {
    document, performance: { now: () => now }, console, Float32Array,
    window: { innerWidth: 390, innerHeight: 844, devicePixelRatio: 3, addEventListener(type, cb) { events[type] = cb; } },
    matchMedia: query => ({ matches: query.includes('reduced') ? reduced : fine, addEventListener() {} }),
    requestAnimationFrame(callback) { frames.set(++sequence, callback); return sequence; },
    cancelAnimationFrame(id) { frames.delete(id); },
  });
  const step = time => {
    now = time;
    const [id, callback] = frames.entries().next().value;
    frames.delete(id);
    callback(time);
  };
  return { events, frames, uniforms, canvas, step, get draws() { return draws; } };
}

test('liquid renders at capped half resolution and flows over time', () => {
  const state = setup();
  assert.equal(state.canvas.width, 390, 'Pixel ratio capped at 2, rendered at half scale');
  assert.equal(state.frames.size, 1, 'Ambient animation is scheduled');
  state.step(16);
  const first = state.uniforms.uTime;
  state.step(32);
  assert.ok(state.uniforms.uTime > first, 'Time advances');
});

test('mouse bends the liquid, click ripples, and the effect relaxes after the mouse stops', () => {
  const state = setup();
  state.events.pointermove({ pointerType: 'mouse', clientX: 150, clientY: 200 });
  state.events.pointerdown({ pointerType: 'mouse', clientX: 150, clientY: 200 });
  let peak = 0;
  for (let time = 16; time < 200; time += 16) { state.step(time); peak = Math.max(peak, state.uniforms.uIntensity); }
  assert.ok(peak > 0.5, 'Pointer influence rises');
  assert.ok(state.uniforms.uPulse > 0, 'Click ripple is active');
  assert.deepEqual(state.uniforms.uClick, [150, 844 - 200], 'Click is flipped to GL coordinates');
  for (let time = 200; time < 3000; time += 16) state.step(time);
  assert.ok(state.uniforms.uIntensity < 0.01, 'Influence settles once input stops');
  assert.equal(state.uniforms.uPulse, 0);
});

test('reduced motion draws direct responses without a loop; touch is ignored; no WebGL is a no-op', () => {
  const reduced = setup({ reduced: true });
  reduced.step(16);
  assert.equal(reduced.frames.size, 0, 'No perpetual loop under reduced motion');
  const before = reduced.draws;
  reduced.events.pointermove({ pointerType: 'mouse', clientX: 150, clientY: 200 });
  assert.equal(reduced.uniforms.uIntensity, 1);
  assert.equal(reduced.draws, before + 1);
  assert.equal(reduced.frames.size, 0);

  const touch = setup({ fine: false });
  touch.events.pointermove({ pointerType: 'touch', clientX: 150, clientY: 200 });
  touch.step(16);
  assert.equal(touch.uniforms.uIntensity, 0);

  const none = setup({ webgl: false });
  assert.equal(none.frames.size, 0);
  assert.equal(none.events.pointermove, undefined);
});
