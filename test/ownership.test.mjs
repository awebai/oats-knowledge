import assert from 'node:assert/strict';
import { realpathSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';
import { BASE_ID, OWNERS, REPO_ROOT, loadOkf, validateOwnership, assertStrictResult } from '../scripts/validate.mjs';

const okf = await loadOkf();
const files = okf.tree(realpathSync(join(REPO_ROOT, 'knowledge')));
const base = JSON.parse(Buffer.from(files['okf-base.json'], 'base64').toString());
const encode = value => Buffer.from(JSON.stringify(value)).toString('base64');
const mutate = change => {
  const candidate = structuredClone(base);
  change(candidate);
  return { ...files, 'okf-base.json': encode(candidate) };
};

test('whole base has the thirteen reviewed owner UUIDs and resolvable declarations', () => {
  const result = validateOwnership(files, okf);
  assert.equal(result.id, BASE_ID);
  assert.equal(Object.keys(result.nodes).length, 13);
  for (const [name, owner] of Object.entries(OWNERS)) assert.equal(result.nodes[name].owner, owner);
});

const malformed = [
  ['changed base identity', b => { b.id = 'another-base'; }],
  ['unknown base field', b => { b.registry = 'not-accepted-metadata'; }],
  ['unknown node field', b => { b.nodes['oats-expert'].readers = []; }],
  ['missing owner', b => { delete b.nodes['oats-expert'].owner; }],
  ['changed owner UUID', b => { b.nodes['oats-expert'].owner = '11111111-1111-4111-8111-111111111111'; }],
  ['duplicate owner', b => { b.nodes['oats-assistant'].owner = b.nodes['oats-expert'].owner; }],
  ['overlapping nodes', b => { b.nodes['oats-assistant'].path = 'nodes/oats-expert'; }],
  ['path traversal', b => { b.nodes['oats-expert'].path = '../outside'; }],
  ['absolute path', b => { b.nodes['oats-expert'].path = '/outside'; }],
  ['hidden path', b => { b.nodes['oats-expert'].path = '.hidden'; }],
  ['missing node', b => { delete b.nodes['oats-assistant']; }],
  ['extra node alias', b => { b.nodes.extra = { ...b.nodes['oats-expert'] }; }],
];
for (const [label, change] of malformed) test(`rejects ${label}`, () => {
  assert.throws(() => validateOwnership(mutate(change), okf));
});

for (const path of ['index.md', 'log.md', 'nodes/oats-expert/index.md', 'nodes/oats-expert/log.md']) {
  test(`rejects missing ${path}`, () => {
    const candidate = { ...files }; delete candidate[path];
    assert.throws(() => validateOwnership(candidate, okf));
  });
}
for (const path of ['unowned.md', 'nodes/stray/fact.md', 'nodes/oats-expert/.hidden.md', 'nodes/oats-expert/extra.json']) {
  test(`rejects hidden, unowned or non-Markdown input: ${path}`, () => {
    assert.throws(() => validateOwnership({ ...files, [path]: encode('invalid') }, okf));
  });
}

test('rejects malformed JSON', () => {
  assert.throws(() => validateOwnership({ ...files, 'okf-base.json': Buffer.from('{').toString('base64') }, okf));
});
test('cross-node reads resolve without granting write ownership', () => {
  const declaration = okf.validateDeclaration({ version: 1, owner: OWNERS['oats-expert'],
    owns: ['oats/oats-expert'], reads: ['oats/oats-desktop-expert', 'oats/oats-kernel-expert'] });
  const bindings = { bases: { oats: { id: BASE_ID } } };
  okf.resolveNodes(declaration, bindings, { oats: base });
  assert.throws(() => okf.resolveNodes({ ...declaration, owns: ['oats/oats-desktop-expert'] }, bindings, { oats: base }),
    error => error.code === 'E_OWNER');
  assert.throws(() => okf.resolveNodes({ ...declaration, reads: ['oats/missing'] }, bindings, { oats: base }));
});
test('strict producer warnings cannot produce a green validation', () => {
  assertStrictResult({ conformant: true, errors: [], warnings: [] });
  assert.throws(() => assertStrictResult({ conformant: true, errors: [], warnings: ['broken link'] }));
  assert.throws(() => assertStrictResult({ conformant: false, errors: ['missing type'], warnings: [] }));
});
