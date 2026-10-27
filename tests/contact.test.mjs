import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { buildBrief } from '../brief.mjs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const script = readFileSync(new URL('../app.mjs', import.meta.url), 'utf8')
  .replace(/^import .*?;\s*/, '');

function initialize({ failAt } = {}) {
  function element(id) {
    return {
      id, disabled: id === '#brief-fields', hidden: false,
      value: '', textContent: '', events: {},
      addEventListener(type, listener) {
        if (id === failAt) throw new Error('Simulated initialization failure');
        (this.events[type] ??= []).push(listener);
      },
      setAttribute() {}, getAttribute() { return 'false'; },
      focus() { this.focused = true; },
      select() { this.selected = true; },
      classList: { toggle() {} },
    };
  }
  const elements = new Map();
  const document = {
    querySelector(id) {
      if (!elements.has(id)) elements.set(id, element(id));
      return elements.get(id);
    },
    querySelectorAll() { return []; },
    addEventListener() {},
  };
  document.querySelector('#brief-fields');
  document.querySelector('#brief-availability');
  let error;
  try {
    runInNewContext(script, {
      document, buildBrief,
      window: { matchMedia() { return { addEventListener() {} }; } },
      navigator: { clipboard: { async writeText() { throw new Error('Clipboard denied'); } } },
      FormData: class {
        constructor(form) { assert.equal(form.id, '#brief-form'); }
        *[Symbol.iterator]() {
          yield ['name', 'Visitante'];
          yield ['email', 'visitante@example.com'];
          yield ['idea', '<script>example</script>'];
        }
      },
    });
  } catch (failure) { error = failure; }
  return { elements, error };
}

test('without JavaScript all brief fields and submit controls start inside a disabled fieldset', () => {
  const form = html.match(/<form\b[^>]*id="brief-form"[^>]*>([\s\S]*?)<\/form>/)?.[1];
  assert.ok(form);
  const fields = form.match(/<fieldset\b(?=[^>]*id="brief-fields")(?=[^>]*\bdisabled\b)[^>]*>([\s\S]*?)<\/fieldset>/);
  assert.ok(fields, 'Disabled fieldset must be present in the static HTML');
  assert.doesNotMatch(fields[1], /<legend\b/i, 'No enabled controls in the disabled-fieldset legend exception');
  const outside = form.replace(fields[0], '');
  assert.doesNotMatch(outside, /<(?:input|textarea|button|select)\b/i);
  assert.match(outside, /id="brief-availability"[^>]*>[^<]*JavaScript/);
});

for (const failAt of ['.menu-toggle', '#copy-brief']) {
  test(`initialization failure at ${failAt} keeps fields disabled and native submission blocked`, () => {
    const { elements, error } = initialize({ failAt });
    assert.match(error.message, /Simulated/);
    assert.equal(elements.get('#brief-fields').disabled, true);
    assert.equal(elements.get('#brief-availability').hidden, false);
    let prevented = false;
    elements.get('#brief-form').events.submit[0]({ preventDefault() { prevented = true; } });
    assert.equal(prevented, true);
  });
}

test('successful initialization enables a local brief and clipboard denial offers manual copying', async () => {
  const { elements, error } = initialize();
  assert.equal(error, undefined);
  assert.equal(elements.get('#brief-fields').disabled, false);
  assert.equal(elements.get('#brief-availability').hidden, true);
  let prevented = false;
  for (const listener of elements.get('#brief-form').events.submit) {
    listener({ preventDefault() { prevented = true; } });
  }
  assert.equal(prevented, true);
  assert.match(elements.get('#brief-text').value, /<script>example<\/script>/);
  assert.match(elements.get('#copy-status').textContent, /Nenhuma mensagem foi enviada/);
  assert.equal(elements.get('#brief-result').hidden, false);
  await elements.get('#copy-brief').events.click[0]();
  assert.equal(elements.get('#brief-text').selected, true);
  assert.match(elements.get('#copy-status').textContent, /Ctrl\+C/);
});
