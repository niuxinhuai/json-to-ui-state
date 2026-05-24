#!/usr/bin/env node
import fs from 'node:fs';

const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h') || args.length === 0) {
  console.log(`json-to-ui-state

Usage:
  json-to-ui-state <input.json> [--out fixtures.json]

Generates frontend/mobile UI fixture states from a JSON response.`);
  process.exit(0);
}

const input = args[0];
const outIndex = args.indexOf('--out');
const out = outIndex >= 0 ? args[outIndex + 1] : null;
const data = JSON.parse(fs.readFileSync(input, 'utf8'));

function map(value, fn) {
  if (Array.isArray(value)) return fn.array(value.map((item) => map(item, fn)));
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, map(child, fn)]));
  if (typeof value === 'string') return fn.string(value);
  if (typeof value === 'number') return fn.number(value);
  if (typeof value === 'boolean') return fn.boolean(value);
  return fn.other(value);
}

const fixtures = {
  normal: data,
  empty: map(data, {
    array: () => [],
    string: () => '',
    number: () => 0,
    boolean: () => false,
    other: () => null
  }),
  longText: map(data, {
    array: (value) => value,
    string: (value) => value ? `${value} `.repeat(12).trim() : 'Long text placeholder '.repeat(10).trim(),
    number: (value) => value,
    boolean: (value) => value,
    other: (value) => value
  }),
  edgeNumbers: map(data, {
    array: (value) => value,
    string: (value) => value,
    number: (value) => value >= 0 ? 999999 : -999999,
    boolean: (value) => value,
    other: (value) => value
  }),
  missingFields: map(data, {
    array: (value) => value.slice(0, 1),
    string: () => null,
    number: () => null,
    boolean: () => null,
    other: () => null
  }),
  errorLike: {
    error: true,
    code: 'UI_FIXTURE_ERROR',
    message: 'Generated error state',
    data: null
  }
};

const text = JSON.stringify(fixtures, null, 2);
if (out) {
  fs.writeFileSync(out, text);
  console.log(`Wrote ${out}`);
} else {
  console.log(text);
}
