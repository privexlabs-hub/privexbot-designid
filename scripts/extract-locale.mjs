#!/usr/bin/env node
/**
 * Writes content/locales/en.json from the field defaults in the template
 * catalog. en.json is the extraction baseline every other locale is translated
 * from, so it is generated rather than hand-kept — that way it cannot drift
 * from the templates it describes.
 *
 * Run: npm run locales
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const src = readFileSync(resolve(root, 'app/editor/templates.js'), 'utf8');

// The catalog is a literal, so a light parse is enough and avoids importing JSX.
const out = {};
let count = 0;
const idRe = /\{ id: '([a-z0-9-]+)'/g;
let m;
while ((m = idRe.exec(src))) {
  const id = m[1];
  const seg = src.slice(m.index);
  const fi = seg.indexOf('fields: [');
  if (fi < 0) continue;
  let i = fi + 'fields: ['.length - 1;
  let depth = 0;
  let j = i;
  for (; j < seg.length; j++) {
    if (seg[j] === '[') depth++;
    else if (seg[j] === ']' && --depth === 0) break;
  }
  const block = seg.slice(i, j);
  const fields = {};
  const fRe = /\{ k: '(\w+)'[^}]*?\bdef: (?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)")/g;
  let f;
  while ((f = fRe.exec(block))) {
    const raw = f[2] ?? f[3];
    fields[f[1]] = raw.replace(/\\n/g, '\n').replace(/\\'/g, "'").replace(/\\"/g, '"');
    count++;
  }
  if (Object.keys(fields).length) out[id] = fields;
}

writeFileSync(
  resolve(root, 'content/locales/en.json'),
  JSON.stringify(
    {
      _locale: 'en',
      _label: 'English',
      _script: 'latin',
      _status: 'source',
      _note: 'Generated from the template defaults by scripts/extract-locale.mjs. Do not hand-edit.',
      templates: out,
    },
    null,
    2,
  ) + '\n',
);
console.log(`locales: extracted ${count} strings across ${Object.keys(out).length} templates -> content/locales/en.json`);
