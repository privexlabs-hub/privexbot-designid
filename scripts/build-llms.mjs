#!/usr/bin/env node
/**
 * Emits public/llms.txt and public/llms-tokens.txt.
 *
 * The pattern comes from Atlassian's design system, which publishes
 * llms.txt / llms-tokens.txt / llms-a11y.txt alongside its docs: a plain-text
 * summary an agent or a new engineer can read in one request, instead of
 * scraping a JavaScript-rendered site. It is close to free here because
 * everything it describes is already structured data.
 *
 * Run: npm run llms   (also runs from prebuild)
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(resolve(root, p), 'utf8');
const tokens = JSON.parse(read('public/tokens.json'));
const templatesSrc = read('app/editor/templates.js');

const templates = [...templatesSrc.matchAll(
  /\{ id: '([a-z0-9-]+)', group: '([^']+)', name: '([^']+)'[^}]*?w: (\d+), h: (\d+)/g,
)].map(([, id, group, name, w, h]) => ({ id, group, name, w, h }));

const byGroup = templates.reduce((a, t) => ((a[t.group] ??= []).push(t), a), {});

writeFileSync(
  resolve(root, 'public/llms.txt'),
  `# PrivexBot Brand ID

> The PrivexBot social brand kit: a pan/zoom canvas of every brand artboard, a
> post editor that exports PNG and ZIP, and the social playbook. Static Next.js
> app, no backend.

## Routes
- /          Brand kit canvas. 10 sections, ~53 artboards.
- /editor    Post editor. ${templates.length} templates, live editing, lane and accent
             switching, ${'5'} locales, PNG and ZIP export.
- /playbook  Social playbook. 13 sections, searchable, copy-to-clipboard.

## Machine-readable artifacts
- /tokens.json         all design tokens, flat name -> hex
- /tokens.scss         the same as Sass variables
- /tokens.android.xml  the same as Android colour resources
- /llms-tokens.txt     tokens as plain text
- /design-canvas-state.json  saved artboard order and renames for the canvas

## Source of truth
Design tokens live in tokens/brand.tokens.json (W3C Design Tokens Community
Group format). Everything else that carries a colour — the CSS custom
properties, the JS COLORS map, the playbook palette, the exports above — is
generated from it by scripts/build-tokens.mjs. Never edit a generated file.

## Templates (${templates.length})
${Object.entries(byGroup)
  .map(
    ([group, list]) =>
      `### ${group}\n` +
      list.map((t) => `- ${t.id} — ${t.name} (${t.w}x${t.h})`).join('\n'),
  )
  .join('\n\n')}

## Conventions that are easy to get wrong
- Asset paths must be root-absolute (/assets/...). A relative path resolves
  against the current route and 404s under /editor.
- Component load order matters: components/brand.jsx defines COLORS, Icon,
  Frame, Ico and DotGrid, which every template imports.
- styles/playbook.css and styles/editor.css are scoped to .pbroot / .edroot.
  Unscoped body/h1 rules would leak across routes after a client-side nav.
- Fonts are self-hosted so PNG export can inline @font-face same-origin.
- Exports go through lib/export-image.js, which clamps scale to the browser's
  real canvas limit. Do not call html-to-image directly.
`,
);

writeFileSync(
  resolve(root, 'public/llms-tokens.txt'),
  `# PrivexBot design tokens
# Generated from tokens/brand.tokens.json. ${Object.keys(tokens.color).length} colour tokens.
# CSS: var(--<name>)   JS: COLORS.<nameWithoutDash>

${Object.entries(tokens.color)
  .map(([name, value]) => `${name.padEnd(14)} ${value}`)
  .join('\n')}
`,
);

console.log(
  `llms: public/llms.txt (${templates.length} templates), public/llms-tokens.txt (${
    Object.keys(tokens.color).length
  } tokens)`,
);
