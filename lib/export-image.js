'use client';

/**
 * One export pipeline for both routes.
 *
 * Before this existed the canvas rasterised via foreignObject-SVG at a hardcoded
 * 3x while the editor used html-to-image at 1x, so the same artboard produced a
 * 3240px file from one page and a 1080px file from the other. Everything now
 * goes through exportNode().
 *
 * Three things this guards that the old paths did not:
 *
 * 1. Canvas area. iOS Safari refuses canvases over ~16.7 megapixels, and over
 *    the cap browsers do not throw — the canvas exists and every draw silently
 *    no-ops, so you get a blank PNG. A 1080x1920 artboard at 3x is 18.7 MP and a
 *    2560x1440 banner is 33.2 MP, both over. We probe the real limit at runtime
 *    (constants vary by device and OS version) and clamp, reporting what we did
 *    rather than emitting a blank file.
 * 2. Fonts. document.fonts.ready plus a double rAF before capture, because
 *    html-to-image resolves its internal <img> before a late-loading face
 *    applies — the widely-reported "first export uses fallback fonts" bug.
 * 3. Memory. toBlob rather than toDataURL (no ~1.37x base64 string on the main
 *    thread), and canvases are shrunk to 1x1 after use because iOS Safari
 *    retains canvas memory across repeated exports until output goes blank.
 */
import * as htmlToImage from 'html-to-image';

/** Scales offered in the UI. 1 is already full resolution — we author at true pixel size. */
export const SCALES = [1, 2, 3];

/**
 * Can this browser actually rasterise a canvas of this size?
 * Draws an opaque pixel in the far corner and reads it back — a direct
 * functional test, rather than trusting a table of per-browser constants.
 */
function canRasterise(w, h) {
  let c = null;
  try {
    c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    const ctx = c.getContext('2d');
    if (!ctx) return false;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(w - 1, h - 1, 1, 1);
    return ctx.getImageData(w - 1, h - 1, 1, 1).data[3] !== 0;
  } catch {
    return false;
  } finally {
    if (c) {
      c.width = 1;
      c.height = 1;
    }
  }
}

const probeCache = new Map();

/**
 * Largest usable scale <= desired for a w x h artboard.
 * @returns {{scale:number, clamped:boolean}}
 */
export function fitScale(w, h, desired = 1) {
  const candidates = SCALES.filter((s) => s <= desired).sort((a, b) => b - a);
  for (const s of candidates) {
    const key = `${w * s}x${h * s}`;
    if (!probeCache.has(key)) probeCache.set(key, canRasterise(w * s, h * s));
    if (probeCache.get(key)) return { scale: s, clamped: s !== desired };
  }
  // Even 1x failed. Return it anyway so the caller can surface a real error
  // instead of silently handing back a blank image.
  return { scale: 1, clamped: true };
}

/** Wait for fonts, then for two frames, so layout and font application have settled. */
export async function settle() {
  try {
    await document.fonts.ready;
  } catch {
    /* Font Loading API unavailable — not fatal */
  }
  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
}

/**
 * Capture a mounted node as a PNG Blob at its native size.
 *
 * @param {HTMLElement} node
 * @param {object}  opts
 * @param {number}  opts.width        artboard width in CSS px
 * @param {number}  opts.height       artboard height in CSS px
 * @param {number} [opts.scale=1]     desired pixel ratio; clamped if too large
 * @param {string} [opts.fontEmbedCSS] precomputed font CSS, reused across a batch
 * @param {(info:{scale:number,clamped:boolean})=>void} [opts.onScale]
 * @returns {Promise<Blob>}
 */
export async function exportNode(node, opts) {
  const { width, height, scale = 1, fontEmbedCSS, onScale } = opts;
  if (!node) throw new Error('exportNode: no node');

  const fit = fitScale(width, height, scale);
  onScale?.(fit);

  const blob = await htmlToImage.toBlob(node, {
    width,
    height,
    pixelRatio: fit.scale,
    cacheBust: true,
    ...(fontEmbedCSS ? { fontEmbedCSS } : {}),
  });
  if (!blob) throw new Error('exportNode: the browser returned no image data');
  return blob;
}

/**
 * Font CSS is expensive to build (it fetches and base64-inlines every face), and
 * identical for every artboard on the page. Compute once, pass to each capture.
 */
export async function getSharedFontCSS(node) {
  try {
    return await htmlToImage.getFontEmbedCSS(node);
  } catch {
    return undefined; // fall back to per-capture embedding
  }
}

/** Trigger a browser download for a Blob. */
export function saveBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

/** Convenience: capture and save in one call. */
export async function exportAndSave(node, { filename, ...opts }) {
  await settle();
  const blob = await exportNode(node, opts);
  saveBlob(blob, filename);
  return blob;
}
