import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

test('hero tape is straight and displays the requested wording exactly',()=>{
 const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
 const css=readFileSync(new URL('../refinements.css',import.meta.url),'utf8');
 assert.equal(html.match(/class="tape">([^<]*)</)?.[1],'Design de interfaces • Desenvolvimento web • Identidade digital');
 assert.ok(/\.tape\s*\{[^}]*transform:\s*none/.test(css),'Active tape rule must remove rotation');
});
