import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';

 test('landing page exposes MCode identity, navigation and honest conceptual work', () => {
 assert.ok(existsSync(new URL('../index.html', import.meta.url)), 'Landing page must exist');
 const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
 assert.match(html,/<html lang="pt-BR"/);
 assert.match(html,/<main/);
 for (const id of ['trabalhos','estudio','devs','contato']) assert.ok(html.includes(`id="${id}"`),`Missing ${id}`);
 assert.match(html,/conceituais/i);
 assert.match(html,/href="mailto:mcode\.contato@gmail\.com(?:\?[^\"]*)?"/);
 assert.doesNotMatch(html,/floating-status-card|status-grid-bar|footer-specs|fonts\.googleapis\.com/);
 assert.match(html,/MCode-Identidade-Visual\/01-Logos-SVG\/mcode-horizontal-cor-escuro.svg/);
 for (const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
  if (!/^(?:http|mailto:|tel:)/.test(match[1])) assert.ok(existsSync(new URL('../'+match[1],import.meta.url)),`Missing asset ${match[1]}`);
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

test("Bara's Hotel appears with its screenshot and location without a link", () => {
 const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
 const css = readFileSync(new URL('../styles.css', import.meta.url), 'utf8');
 const prepareScript = readFileSync(new URL('../scripts/prepare-site.mjs', import.meta.url), 'utf8');
 assert.match(html, /class="project project-baras"/);
 assert.match(html, /Bara's Hotel/);
 assert.match(html, /PROJETO DESENVOLVIDO/);
 assert.match(html, /assets\/baras-hotel\.jpg/);
 const hotel = html.match(/<div class="project project-baras">([\s\S]*?)<\/article>/)?.[1];
 assert.ok(hotel);
 assert.match(hotel, /Bom Conselho, Pernambuco/);
 assert.doesNotMatch(hotel, /href="https?:|project-open|project-footer-link/);
 assert.match(hotel, /href="assets\/baras-hotel.jpg" data-image-preview/);
 assert.match(css, /\.baras-art img\s*\{[^}]*object-fit:\s*contain;/);
 assert.ok(existsSync(new URL('../assets/baras-hotel.jpg', import.meta.url)), 'Hotel screenshot must exist');
});
