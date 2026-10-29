import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const contact = html.match(/<section\b[^>]*id="contato"[^>]*>([\s\S]*?)<\/section>/)?.[1];

test('contact works through a real email link without a form or JavaScript', () => {
  assert.ok(contact);
  assert.match(contact, /href="mailto:mcode\.contato@gmail\.com"/);
  assert.doesNotMatch(contact, /<(?:form|input|textarea|fieldset)\b/);
});

test('unconfigured WhatsApp and Instagram channels are honest, noninteractive placeholders', () => {
  for (const channel of ['whatsapp', 'instagram']) {
    assert.match(contact, new RegExp(`<div class="contact-option is-pending" data-channel="${channel}">`));
    assert.doesNotMatch(contact, new RegExp(`<a[^>]*data-channel="${channel}"`));
  }
  assert.equal((contact.match(/>Em breve</g) || []).length, 2);
  assert.doesNotMatch(contact, /href="#"|href="https:\/\/(?:wa\.me|(?:www\.)?instagram\.com)/);
});
