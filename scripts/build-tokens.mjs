#!/usr/bin/env node
/**
 * Generates every consumer of the brand tokens from one source file.
 *
 *   tokens/brand.tokens.json          (W3C Design Tokens Community Group, 2025.10)
 *     -> styles/tokens.generated.css      CSS custom properties
 *     -> components/tokens.generated.js   the COLORS map used by every template
 *     -> public/tokens.json               flat map for engineers / Figma / Style Dictionary
 *     -> public/tokens.scss               Sass variables
 *     -> public/tokens.android.xml        Android colour resources
 *
 * Whole files are generated, never regions inside hand-edited ones — patching a
 * fenced block inside a file people also edit by hand is a merge-conflict
 * generator. Nothing here writes into brand.css or brand.jsx.
 *
 * Run: npm run tokens   (also runs automatically from prebuild)
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = 'tokens/brand.tokens.json';
const src = JSON.parse(readFileSync(resolve(root, SRC), 'utf8'));

const LINES = ['GENERATED FILE — DO NOT EDIT.', `Source: ${SRC}`, 'Regenerate: npm run tokens'];
/** Banner as a block comment (CSS / XML) or as line comments (JS). */
const BANNER = (style) =>
  style === 'js'
    ? LINES.map((l) => `// ${l}`).join('\n')
    : LINES.join('\n   ');

/** Walk the DTCG tree and flatten to [{family, step, name, value, description}]. */
function flatten(tree) {
  const out = [];
  for (const [family, group] of Object.entries(tree.color ?? {})) {
    for (const [step, token] of Object.entries(group)) {
      if (step.startsWith('$')) continue;
      out.push({
        family,
        step,
        cssName: `--${family}-${step}`,
        jsName: `${family}${step}`,
        value: token.$value,
        description: token.$description ?? group.$description ?? '',
      });
    }
  }
  return out;
}

const tokens = flatten(src);

/**
 * Non-colour tokens. These lived in the same :root block as the colours and are
 * every bit as load-bearing — losing --font-sans silently reverts the whole site
 * to a fallback face, which is exactly what happened the first time this
 * generator only emitted colours.
 */
function others(tree) {
  const out = [];
  const px = (v) => (typeof v === 'object' ? `${v.value}${v.unit}` : String(v));
  for (const [name, t] of Object.entries(tree.fontFamily ?? {})) {
    if (name.startsWith('$')) continue;
    out.push({
      cssName: `--font-${name}`,
      value: t.$value.map((f) => (f.includes(' ') ? `'${f}'` : f)).join(', '),
    });
  }
  for (const [name, t] of Object.entries(tree.radius ?? {})) {
    if (name.startsWith('$')) continue;
    out.push({ cssName: `--r-${name}`, value: px(t.$value) });
  }
  for (const [name, t] of Object.entries(tree.easing ?? {})) {
    if (name.startsWith('$')) continue;
    out.push({ cssName: `--ease-${name}`, value: `cubic-bezier(${t.$value.join(', ')})` });
  }
  return out;
}
const nonColour = others(src);
if (!nonColour.length) throw new Error('no non-colour tokens found — check the source file');
if (!tokens.length) throw new Error(`no colour tokens found in ${SRC}`);

const dup = tokens.map((t) => t.cssName).filter((n, i, a) => a.indexOf(n) !== i);
if (dup.length) throw new Error(`duplicate token names: ${dup.join(', ')}`);

const bad = tokens.filter((t) => !/^#[0-9A-F]{6}$/i.test(t.value));
if (bad.length) {
  throw new Error(
    `expected 6-digit hex values, got: ${bad.map((t) => `${t.cssName}=${t.value}`).join(', ')}`,
  );
}

const write = (rel, body) => {
  const abs = resolve(root, rel);
  mkdirSync(dirname(abs), { recursive: true });
  writeFileSync(abs, body);
  return `  ${rel.padEnd(34)} ${body.length.toLocaleString()} bytes`;
};

const byFamily = tokens.reduce((acc, t) => ((acc[t.family] ??= []).push(t), acc), {});
const results = [];

// ── CSS custom properties ──────────────────────────────────────────────────
results.push(
  write(
    'styles/tokens.generated.css',
    `/* ${BANNER('block')} */\n\n:root {\n` +
      Object.entries(byFamily)
        .map(
          ([family, list]) =>
            `  /* ${family} */\n` +
            list.map((t) => `  ${t.cssName}: ${t.value};`).join('\n'),
        )
        .join('\n\n') +
      '\n\n  /* type, radii, motion */\n' +
      nonColour.map((t) => `  ${t.cssName}: ${t.value};`).join('\n') +
      '\n}\n',
  ),
);

// ── JS colour map ──────────────────────────────────────────────────────────
// Two aliases are kept so existing component code keeps compiling unchanged:
// COLORS.attestLight (now attest300) and the flat COLORS.danger / COLORS.warn
// (now danger500 / warn500).
const alias = { attestLight: 'attest300', danger: 'danger500', warn: 'warn500' };
results.push(
  write(
    'components/tokens.generated.js',
    `${BANNER('js')}\n\n` +
      `export const COLORS = {\n` +
      Object.entries(byFamily)
        .map(
          ([family, list]) =>
            `  // ${family}\n` +
            list.map((t) => `  ${t.jsName}: '${t.value}',`).join('\n'),
        )
        .join('\n\n') +
      `\n\n  // back-compat aliases for pre-token component code\n` +
      Object.entries(alias)
        .map(([from, to]) => {
          const t = tokens.find((x) => x.jsName === to);
          if (!t) throw new Error(`alias ${from} -> ${to} has no matching token`);
          return `  ${from}: '${t.value}',`;
        })
        .join('\n') +
      `\n};\n\n` +
      `/** Ordered token list, used by the playbook palette and the contrast check. */\n` +
      `export const TOKEN_LIST = ${JSON.stringify(
        tokens.map(({ family, step, cssName, jsName, value }) => ({
          family,
          step,
          cssName,
          jsName,
          value,
        })),
        null,
        2,
      )};\n\nexport default COLORS;\n`,
  ),
);

// ── Flat JSON, Sass and Android, for anyone outside this repo ──────────────
results.push(
  write(
    'public/tokens.json',
    JSON.stringify(
      {
        $description: src.$description,
        generatedFrom: SRC,
        color: Object.fromEntries(tokens.map((t) => [`${t.family}-${t.step}`, t.value])),
      },
      null,
      2,
    ) + '\n',
  ),
);
results.push(
  write(
    'public/tokens.scss',
    `${BANNER('js')}\n\n` +
      tokens.map((t) => `$${t.family}-${t.step}: ${t.value};`).join('\n') +
      '\n',
  ),
);
results.push(
  write(
    'public/tokens.android.xml',
    `<?xml version="1.0" encoding="utf-8"?>\n<!-- ${BANNER('block')} -->\n<resources>\n` +
      tokens
        .map((t) => `  <color name="${t.family}_${t.step}">${t.value}</color>`)
        .join('\n') +
      '\n</resources>\n',
  ),
);

console.log(`tokens: ${tokens.length} colours from ${SRC}`);
console.log(results.join('\n'));
