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

test('portfolio features Masterbase, with LEMMA, the cartório and Sorvebom side by side', () => {
 const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
 const work = html.match(/<section[^>]*id="trabalhos"[\s\S]*?<\/section>/)?.[0];
 assert.ok(work);
 assert.equal((work.match(/<article\b/g) || []).length, 4);
 assert.match(work, /<article class="project-card project-card-full project-card-masterbase">/);
 assert.equal((work.match(/project-card-full/g) || []).length, 1, 'Only Masterbase spans the full row');
 assert.match(work, /href="https:\/\/masterbase-seven\.vercel\.app"/);
 assert.match(work, /href="https:\/\/github\.com\/caioribi7\/masterbase"/);
 assert.equal((work.match(/<h3>EM BREVE<\/h3>/g) || []).length, 0);
 assert.match(work, /project-card-full/);
 assert.match(work, /href="https:\/\/www\.institutolemma\.com\.br"/);
 assert.match(work, /Instituto LEMMA/);
 assert.match(work, /href="https:\/\/cartorio-project-topaz\.vercel\.app"/);
 assert.match(work, /Cartório Algacyr Barros/);
 assert.doesNotMatch(work, /Vértice|construtora\.mcode/);
 assert.match(work, /href="https:\/\/sorvebom\.mcode\.dev\.br"/);
 assert.match(work, /Sorvebom/);
 assert.doesNotMatch(work, /<button\b|<details\b|Bara|project-orbit/);
 assert.doesNotMatch(html, /project-image-viewer|data-image-preview/);
});

test('all four cases use a looping video cover, started by app.mjs while visible', () => {
 const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
 for (const name of ['masterbase', 'lemma', 'cartorio', 'sorvebom']) {
  const card = html.match(new RegExp(`<a class="project project-${name}"[\\s\\S]*?</a>`))?.[0];
  assert.ok(card, `Missing ${name} card`);
  const video = card.match(/<video\b[^>]*>/)?.[0];
  assert.ok(video, `${name} card must have a cover video`);
  for (const attr of ['class="project-video"', 'data-autoplay-loop', 'muted', 'loop', 'playsinline', `poster="assets/${name}-capa-poster.webp"`, 'aria-hidden="true"']) assert.ok(video.includes(attr), `${name}: missing ${attr}`);
  assert.doesNotMatch(video, /\bautoplay\b(?!-)/, 'Playback is started by app.mjs only while the card is visible');
  assert.match(card, new RegExp(`<source src="assets/${name}-capa\\.webm" type="video/webm">`));
  assert.match(card, new RegExp(`<source src="assets/${name}-capa\\.mp4" type="video/mp4">`));
  assert.doesNotMatch(card, new RegExp(`${name}-vector|${name}-title-art`));
  for (const ext of ['.mp4', '.webm', '-poster.webp']) assert.ok(existsSync(new URL(`../assets/${name}-capa${ext}`, import.meta.url)), `Missing ${name}-capa${ext}`);
 }
 const app = readFileSync(new URL('../app.mjs', import.meta.url), 'utf8');
 assert.match(app, /IntersectionObserver/);
 assert.match(app, /\.play\(\)/);
});

test('dev profile pages exist, are published and stay free of personal e-mails', () => {
 const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
 for (const [slug, name, github] of [['caioribi', 'Caio Ribi', 'caioribi7'], ['mateusdias', 'Mateus Dias', 'root-mwteus']]) {
  const page = readFileSync(new URL(`../${slug}/index.html`, import.meta.url), 'utf8');
  assert.match(page, new RegExp(`<link rel="canonical" href="https://mcode\.dev\.br/${slug}">`));
  assert.match(page, new RegExp(`<h1 id="profile-name"`));
  assert.match(page, new RegExp(name.split(' ')[0].toUpperCase()));
  assert.match(page, new RegExp(`https://github\.com/${github}`));
  assert.match(page, /href="\/#contato"/);
  assert.doesNotMatch(page, /(?:src|href)="(?!\/|https?:|#|mailto:)/, 'Assets use absolute paths so the folder route works');
  assert.doesNotMatch(page, /@gmail\.com/, 'Contact goes through MCode, not personal e-mail');
  assert.match(html, new RegExp(`href="/${slug}"`), `Devs section links to /${slug}`);
 }
});
