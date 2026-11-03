import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';

test('landing page exposes MCode identity, navigation and honest conceptual work', () => {
 assert.ok(existsSync(new URL('../index.html', import.meta.url)), 'Landing page must exist');
 const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
 assert.match(html,/<html lang="pt-BR"/);
 assert.match(html,/<main/);
 for (const id of ['trabalhos','estudio','devs','contato']) assert.ok(html.includes(`id="${id}"`),`Missing ${id}`);
 assert.match(html,/CASES EM/);
 assert.match(html,/href="mailto:mcode\.contato@gmail\.com(?:\?[^\"]*)?"/);
 assert.doesNotMatch(html,/floating-status-card|status-grid-bar|footer-specs|fonts\.googleapis\.com/);
 assert.match(html,/MCode-Identidade-Visual\/01-Logos-SVG\/mcode-horizontal-cor-escuro.svg/);
 for (const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
  if (!/^(?:https?:|mailto:|tel:)/.test(match[1])) assert.ok(existsSync(new URL('../'+match[1],import.meta.url)),`Missing asset ${match[1]}`);
 }
});

test('studio section keeps its mobile layout rules aligned with the current markup', () => {
 const css = readFileSync(new URL('../styles.css', import.meta.url), 'utf8');
 const mobile = css.match(/@media \(max-width: 768px\) \{([\s\S]*?)\n\}/)?.[1];
 assert.ok(mobile, 'Mobile breakpoint must exist');
 assert.match(mobile, /\.studio-grid \{[^}]*gap: 28px;/);
 assert.match(mobile, /\.service-module \{[^}]*padding: 26px 0;/);
 assert.match(mobile, /\.studio-action-strip \{[^}]*flex-direction: column;[^}]*align-items: flex-start;/);
 assert.doesNotMatch(mobile, /\.studio-intro|\.studio-service|\.studio-closing/);
 assert.doesNotMatch(css, /\.hero-outline/, 'Hero title remains filled without an outline hover effect');
});

test('portfolio displays Instituto LEMMA as featured project alongside Vértice and Sorvebom', () => {
 const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
 const work = html.match(/<section[^>]*id="trabalhos"[\s\S]*?<\/section>/)?.[0];
 assert.ok(work);
 assert.equal((work.match(/<article\b/g) || []).length, 3);
 assert.equal((work.match(/<h3>EM BREVE<\/h3>/g) || []).length, 0);
 assert.match(work, /project-card-full/);
 assert.match(work, /href="https:\/\/www\.institutolemma\.com\.br"/);
 assert.match(work, /Instituto LEMMA/);
 assert.match(work, /href="https:\/\/construtora\.mcode\.dev\.br"/);
 assert.match(work, /Vértice/);
 assert.match(work, /href="https:\/\/sorvebom\.mcode\.dev\.br"/);
 assert.match(work, /Sorvebom/);
 assert.doesNotMatch(work, /<button\b|<details\b|Bara|project-orbit/);
 assert.doesNotMatch(html, /project-image-viewer|data-image-preview/);
});

test('Sorvebom card uses the looping video cover with poster and no autoplay attribute', () => {
 const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
 const card = html.match(/<a class="project project-sorvebom"[\s\S]*?<\/a>/)?.[0];
 assert.ok(card);
 const video = card.match(/<video\b[^>]*>/)?.[0];
 assert.ok(video, 'Sorvebom card must have a cover video');
 for (const attr of ['data-autoplay-loop', 'muted', 'loop', 'playsinline', 'poster="assets/sorvebom-capa-poster.jpg"', 'aria-hidden="true"']) assert.ok(video.includes(attr), `Missing ${attr}`);
 assert.doesNotMatch(video, /\bautoplay\b(?!-)/, 'Playback is started by app.mjs to respect reduced motion');
 assert.match(card, /<source src="assets\/sorvebom-capa\.webm" type="video\/webm">/);
 assert.match(card, /<source src="assets\/sorvebom-capa\.mp4" type="video\/mp4">/);
 assert.doesNotMatch(card, /sorvebom-vector|sorvebom-title-art/);
 for (const file of ['sorvebom-capa.mp4', 'sorvebom-capa.webm', 'sorvebom-capa-poster.jpg']) assert.ok(existsSync(new URL(`../assets/${file}`, import.meta.url)), `Missing ${file}`);
 const app = readFileSync(new URL('../app.mjs', import.meta.url), 'utf8');
 assert.match(app, /prefers-reduced-motion: reduce/);
 assert.match(app, /IntersectionObserver/);
});
