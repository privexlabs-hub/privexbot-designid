#!/usr/bin/env node
/**
 * Fails if a colour pairing the design system actually relies on drops below
 * its WCAG 2.2 threshold. Reads the generated tokens, so it re-runs against
 * whatever is in tokens/brand.tokens.json.
 *
 * Only pairings the templates genuinely use are asserted. Checking every
 * token against every other token would produce hundreds of meaningless
 * failures and get switched off, which is worse than not having the check.
 *
 * Run: npm run check:contrast
 */
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ratio, AA_NORMAL, AA_LARGE } from '../lib/contrast.js';

// Read the generated JSON rather than importing the JS module, so this script
// stays plain ESM with no package-type juggling.
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const flat = JSON.parse(readFileSync(resolve(root, 'public/tokens.json'), 'utf8')).color;
const COLORS = Object.fromEntries(
  Object.entries(flat).map(([k, v]) => [k.replace('-', ''), v]),
);

/** [label, foreground, background, threshold] */
const PAIRS = [
  // Body and display text on each of the four lanes in brand.css
  ['lane-mono: body on white', COLORS.ink900, COLORS.ink0, AA_NORMAL],
  ['lane-mono: muted on white', COLORS.ink500, COLORS.ink0, AA_NORMAL],
  ['lane-dark: body on ink-950', COLORS.ink50, COLORS.ink950, AA_NORMAL],
  ['lane-dark: muted on ink-950', COLORS.ink200, COLORS.ink950, AA_NORMAL],
  ['lane-light: body on signal-50', COLORS.ink900, COLORS.signal50, AA_NORMAL],
  ['lane-editorial: body on ink-25', COLORS.ink900, COLORS.ink25, AA_NORMAL],

  // Brand accent used as text
  ['accent: signal-500 on white', COLORS.signal500, COLORS.ink0, AA_NORMAL],
  ['accent: signal-300 on ink-950', COLORS.signal300, COLORS.ink950, AA_NORMAL],
  ['accent: signal-700 on signal-50', COLORS.signal700, COLORS.signal50, AA_NORMAL],

  // Reversed-out text on filled brand surfaces
  ['on-fill: white on signal-500', COLORS.ink0, COLORS.signal500, AA_NORMAL],
  ['on-fill: white on ink-950', COLORS.ink0, COLORS.ink950, AA_NORMAL],
  ['on-fill: signal-100 on signal-500', COLORS.signal100, COLORS.signal500, AA_NORMAL],

  // Status colours as text on their own tinted surfaces
  ['status: attest-700 on attest-100', COLORS.attest700, COLORS.attest100, AA_NORMAL],
  ['status: danger-700 on danger-100', COLORS.danger700, COLORS.danger100, AA_NORMAL],
  ['status: warn-700 on warn-100', COLORS.warn700, COLORS.warn100, AA_NORMAL],
  ['status: attest-300 on ink-950', COLORS.attest300, COLORS.ink950, AA_NORMAL],

  // Non-text UI. WCAG 1.4.11 applies to the boundaries of interactive controls
  // and to graphics that carry meaning — it explicitly exempts purely decorative
  // elements. ink-100 hairlines separate cards and table rows without conveying
  // anything on their own (the layout already does), so they are not asserted
  // here; ink-100 measures 1.37:1 on white and raising it would change the look
  // of every template. If a control boundary ever depends on ink-100, that is a
  // real failure and belongs in this list.
  ['ui: signal-500 status dot on white', COLORS.signal500, COLORS.ink0, AA_LARGE],
  ['ui: attest-500 status dot on white', COLORS.attest500, COLORS.ink0, AA_LARGE],
  ['ui: danger-500 status dot on white', COLORS.danger500, COLORS.ink0, AA_LARGE],
];

let failed = 0;
const rows = PAIRS.map(([label, fg, bg, min]) => {
  const r = ratio(fg, bg);
  const ok = r >= min;
  if (!ok) failed++;
  return `  ${ok ? 'pass' : 'FAIL'}  ${String(r).padStart(5)}:1  (min ${min})  ${label}`;
});

console.log(`contrast: ${PAIRS.length} pairings checked\n${rows.join('\n')}`);

if (failed) {
  console.error(
    `\n${failed} pairing(s) below threshold. Either fix the token values in ` +
      `tokens/brand.tokens.json, or — if the pairing is genuinely not used for ` +
      `text — move it to the ${'AA_LARGE'} tier with a comment saying why.`,
  );
  process.exit(1);
}
console.log('\nAll checked pairings meet WCAG 2.2 AA.');
