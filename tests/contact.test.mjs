import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const contact = html.match(/<section\b[^>]*id="contato"[^>]*>([\s\S]*?)<\/section>/)?.[1];

test('contact works through real email and instagram links without forms or JavaScript', () => {
  assert.ok(contact);
  assert.match(contact, /href="mailto:mcode\.contato@gmail\.com"/);
  assert.match(contact, /href="https:\/\/www\.instagram\.com\/mcode\.web\/"/);
  assert.doesNotMatch(contact, /<(?:form|input|textarea|fieldset)\b/);
});

test('unconfigured WhatsApp channel remains an honest, noninteractive placeholder', () => {
  assert.match(contact, /<div class="contact-option is-pending" data-channel="whatsapp">/);
  assert.doesNotMatch(contact, /<a[^>]*data-channel="whatsapp"/);
  assert.equal((contact.match(/>Em breve</g) || []).length, 1);
  assert.doesNotMatch(contact, /href="#"|href="https:\/\/wa\.me/);
});
