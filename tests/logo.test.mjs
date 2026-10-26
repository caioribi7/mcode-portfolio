import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

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

test('hero uses an accessible, pausable logo animation instead of the reference character',()=>{
 const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
 assert.match(html,/id="logo-canvas"/);
 assert.match(html,/id="logo-motion"/);
 assert.doesNotMatch(html,/reference-character|class="character"/);
});
