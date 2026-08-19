#!/usr/bin/env node
/**
 * Exports every template as a PNG from the running editor, for before/after
 * comparison across a refactor.
 *
 * It drives the editor's own Export PNG button rather than screenshotting the
 * DOM. Two earlier attempts at DOM capture both raced: the stage fits the
 * artboard to the viewport with a ResizeObserver, so the preview transform
 * settles a frame or two after mount, and a baseline captured at 0.5 against a
 * current run at 0.76 makes every diff meaningless. Overriding the transform
 * before capture loses the same race — React re-renders and puts it back.
 *
 * Going through the export path removes the preview scale from the question
 * entirely, renders at exact native size, and has the useful property of
 * comparing the artefact users actually receive.
 *
 * Usage: node scripts/shoot-artboards.mjs <outDir> [baseUrl]
 */
import { mkdirSync, readFileSync, writeFileSync, renameSync, existsSync, readdirSync, rmSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = resolve(process.cwd(), process.argv[2] ?? 'shots');
const base = process.argv[3] ?? 'http://localhost:8124';
const tmpDir = `${outDir}__dl`;
rmSync(tmpDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });
mkdirSync(tmpDir, { recursive: true });

const src = readFileSync(resolve(root, 'app/editor/templates.js'), 'utf8');
const ids = [...src.matchAll(/\{ id: '([a-z0-9-]+)'/g)].map((m) => m[1]);

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
  args: ['--no-sandbox'],
});
const page = await browser.newPage();
// Big enough that the largest artboard (2560x1440) renders at 1:1.
await page.setViewport({ width: 2800, height: 2000 });
const failures = [];
for (const id of ids) {
  try {
    await page.goto(`${base}/capture?t=${id}`, { waitUntil: 'networkidle0', timeout: 60000 });
    await page.waitForSelector('#capture-root[data-ready="1"]', { timeout: 20000 });
    await page.evaluate(() => document.fonts.ready);
    await new Promise((r) => setTimeout(r, 200));
    const el = await page.$('#capture-root');
    await el.screenshot({ path: resolve(outDir, `${id}.png`) });
    process.stdout.write('.');
  } catch (e) {
    failures.push(`${id}: ${e.message}`);
    process.stdout.write('x');
  }
}
await browser.close();
rmSync(tmpDir, { recursive: true, force: true });
writeFileSync(resolve(outDir, '_manifest.json'), JSON.stringify({ ids, failures }, null, 2));
console.log(`\n${ids.length - failures.length}/${ids.length} artboards exported -> ${outDir}`);
if (failures.length) console.error('failures:\n  ' + failures.join('\n  '));
