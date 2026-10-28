import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';

 test('landing page exposes MCode identity, navigation and honest conceptual work', () => {
 assert.ok(existsSync(new URL('../index.html', import.meta.url)), 'Landing page must exist');
 const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
 assert.match(html,/<html lang="pt-BR"/);
 assert.match(html,/<main/);
 for (const id of ['trabalhos','estudio','contato']) assert.ok(html.includes(`id="${id}"`),`Missing ${id}`);
 assert.match(html,/conceituais/i);
 assert.match(html,/href="mailto:mcode\.contato@gmail\.com"/);
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
 assert.match(mobile, /\.service-module \{[^}]*padding: 22px 20px;/);
 assert.match(mobile, /\.studio-action-strip \{[^}]*flex-direction: column;[^}]*align-items: flex-start;/);
 assert.doesNotMatch(mobile, /\.studio-intro|\.studio-service|\.studio-closing/);
 assert.equal((css.match(/^\.hero-outline \{/gm) || []).length, 1, 'Hero outline has a single base rule');
});
