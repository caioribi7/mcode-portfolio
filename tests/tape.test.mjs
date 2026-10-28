import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

test('ticker repeats identical groups for a seamless loop and supports reduced motion',()=>{
 const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
 const css=readFileSync(new URL('../styles.css',import.meta.url),'utf8');
 const groups = [...html.matchAll(/<div class="ticker-group"[^>]*>([\s\S]*?)<\/div>/g)];
 assert.equal(groups.length, 2);
 assert.equal(groups[0][1], groups[1][1]);
 assert.match(css, /animation: ticker-slide 26s linear infinite/);
 assert.match(css, /prefers-reduced-motion: reduce/);
 assert.match(css, /\.ticker-group:nth-child\(2\)\s*\{ display: none/);
});
