import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

function setup({ reduced = false, fine = true } = {}) {
  const events = {}, frames = new Map(), dots = [];
  let sequence = 0;
  const context = {
    clearRect() { dots.length = 0; }, setTransform() {}, beginPath() {}, fill() {},
    arc(x,y,radius) { assert.ok(Number.isFinite(x+y+radius)); dots.push({x,y,radius}); },
  };
  const canvas = { getContext:()=>context };
  const document = {
    hidden: false, querySelector:()=>canvas,
    addEventListener(type, callback) { events[type] = callback; },
    documentElement: { addEventListener(type, callback) { events[type] = callback; } },
  };
  runInNewContext(readFileSync(new URL('../halftone-background.mjs',import.meta.url),'utf8'), {
    document, performance:{now:()=>0},
    window: {innerWidth:390,innerHeight:844,devicePixelRatio:3,addEventListener(type,callback){events[type]=callback;}},
    matchMedia:query=>({matches:query.includes('reduced')?reduced:fine,addEventListener(){}}),
    requestAnimationFrame(callback){ frames.set(++sequence,callback); return sequence; },
    cancelAnimationFrame(id){ frames.delete(id); },
  });
  return { events, frames, dots, canvas, document };
}

test('halftone responds to the mouse and click, then stops scheduling frames when settled', () => {
  const state = setup();
  assert.equal(state.canvas.width,585,'Pixel ratio is capped at 1.5');
  state.events.pointermove({pointerType:'mouse',clientX:150,clientY:200});
  state.events.pointerdown({pointerType:'mouse'});
  let animated = false;
  for(let time=16;state.frames.size&&time<4000;time+=16) {
    const [id,callback] = state.frames.entries().next().value;
    state.frames.delete(id);
    callback(time);
    animated ||= state.dots.some(dot=>dot.radius>0.9);
  }
  assert.equal(animated,true,'Nearby dots react to pointer movement');
  assert.equal(state.frames.size,0,'No perpetual idle rendering');
  state.events.pointerleave();
  assert.ok(state.dots.every(dot=>dot.radius===0.85));
});

test('reduced motion draws a direct response; touch leaves the background static', () => {
  const reduced = setup({reduced:true});
  reduced.events.pointermove({pointerType:'mouse',clientX:150,clientY:200});
  assert.equal(reduced.frames.size,0);
  assert.ok(reduced.dots.some(dot=>dot.radius>0.9));
  const touch = setup({fine:false});
  touch.events.pointermove({pointerType:'touch',clientX:150,clientY:200});
  assert.equal(touch.frames.size,0);
  assert.ok(touch.dots.every(dot=>dot.radius===0.85));
});
