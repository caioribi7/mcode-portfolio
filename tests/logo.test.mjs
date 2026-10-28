import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { extrudeLogo, rotatePoint, faceNormal } from '../logo-geometry.mjs';

test('logo extrusion preserves the two original SVG contours and has front, back and depth', async () => {
 const { LOGO_CONTOURS, extrudeLogo } = await import('../logo-geometry.mjs');
 assert.deepEqual(LOGO_CONTOURS[0][0],[24,208]);
 assert.deepEqual(LOGO_CONTOURS[1],[[84,168],[232,168],[232,208],[84,208]]);
 const faces=extrudeLogo(48);
 assert.equal(faces.filter(f=>f.kind==='front').length,2);
 assert.equal(faces.filter(f=>f.kind==='back').length,2);
 assert.equal(faces.filter(f=>f.kind==='side').length,LOGO_CONTOURS.flat().length);
 assert.deepEqual([...new Set(faces.flatMap(f=>f.vertices.map(v=>v[2])))].sort((a,b)=>a-b),[-24,24]);
});

test('3D rotation is deterministic and returns to the initial shape after a full turn', async()=>{
 const { rotatePoint }=await import('../logo-geometry.mjs');
 const p=[104,-32,24];const a=rotatePoint(p,0);const b=rotatePoint(p,Math.PI*2);
 a.forEach((v,i)=>assert.ok(Math.abs(v-b[i])<1e-8));
 assert.ok(Math.abs(rotatePoint(p,Math.PI/2)[0]-a[0])>10);
});

test('hero uses the logo in a terminal without a pause control',()=>{
 const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
 assert.match(html,/id="logo-canvas"/);
 assert.doesNotMatch(html,/id="logo-motion"/);
 assert.match(html,/logo-terminal-bar/);
 assert.doesNotMatch(html,/reference-character|class="character"/);
});

test('ASCII starts automatically and keeps animating regardless of reduced motion or viewport visibility', () => {
 const frames = [];
 const ctx = { clearRect() {}, fillText(character,x,y) { frames.push([character,x,y,this.fillStyle,this.globalAlpha]); } };
 const surface = {
  clearRect() {}, beginPath() {}, moveTo() {}, lineTo() {}, closePath() {}, fill() {},
  getImageData(_x,_y,w,h) {
   const data = new Uint8ClampedArray(w*h*4);
   // A small solid mask exercises the logo glyphs separately from background rain.
   for(let y=10;y<30;y++) for(let x=12;x<40;x++) {
    const offset=(y*w+x)*4; data[offset]=200; data[offset+3]=255;
   }
   return { data };
  },
 };
 const canvas = { dataset:{}, getContext:()=>ctx, getBoundingClientRect:()=>({width:120}) };
 const scheduled = new Map();
 let nextFrame = 0;
 const window = {};
 runInNewContext(readFileSync(new URL('../logo-animation.mjs',import.meta.url),'utf8').replace(/^import[^\n]*\n/,''), {
  extrudeLogo, rotatePoint, faceNormal, window, Uint8ClampedArray,
  document:{hidden:true,querySelector:()=>canvas,createElement:()=>({getContext:()=>surface}),addEventListener(){}},
  matchMedia:()=>({matches:true,addEventListener(){}}),
  IntersectionObserver:class {observe(){}}, ResizeObserver:class {observe(){}},
  requestAnimationFrame(callback){scheduled.set(++nextFrame,callback);return nextFrame;},
  cancelAnimationFrame(id){scheduled.delete(id);},
 });
 assert.equal(scheduled.size,1,'Animation starts immediately even when reduced motion is set');
 assert.ok(Number(canvas.dataset.glyphs)>0);
 const first = [...frames]; frames.length=0;
 window.mcodeLogo.renderAt(0);
 assert.deepEqual(frames,first);
 frames.length=0;
 window.mcodeLogo.renderAt(600);
 assert.notDeepEqual(frames,first,'Rain and characters evolve with time');
 assert.ok(frames.every(([character])=>/^[\x20-\x7E]$/.test(character)));
 for (const time of [16, 64, 112]) {
  const [id, callback] = scheduled.entries().next().value;
  scheduled.delete(id);
  callback(time);
  assert.equal(scheduled.size,1,'Each frame schedules the next frame');
 }
 assert.ok(window.mcodeLogo.time>0,'Animation time advances without user interaction');
});
