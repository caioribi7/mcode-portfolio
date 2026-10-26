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
 assert.match(html,/MCode-Identidade-Visual\/01-Logos-SVG\/mcode-horizontal-cor-escuro.svg/);
 for (const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
  if (!/^(?:http|mailto:|tel:)/.test(match[1])) assert.ok(existsSync(new URL('../'+match[1],import.meta.url)),`Missing asset ${match[1]}`);
 }
 });
