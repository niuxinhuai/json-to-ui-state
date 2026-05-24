import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cli = path.join(root, 'src', 'cli.js');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'json-to-ui-state-'));
const input = path.join(tmp, 'response.json');

fs.writeFileSync(input, JSON.stringify({
  users: [{ id: 1, name: 'Ada', active: true }]
}));

const output = execFileSync(process.execPath, [cli, input], { cwd: tmp, encoding: 'utf8' });
const fixtures = JSON.parse(output);

assert.equal(fixtures.normal.users[0].name, 'Ada');
assert.deepEqual(fixtures.empty.users, []);
assert.equal(fixtures.longText.users[0].name.includes('Ada Ada'), true);
assert.equal(fixtures.missingFields.users[0].id, null);
assert.equal(fixtures.errorLike.error, true);

console.log('json-to-ui-state tests passed');
