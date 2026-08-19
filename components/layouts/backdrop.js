import { COLORS } from '@/components/brand';

/**
 * Backdrop grammar.
 *
 * The 41 hand-written templates contained 19 distinct `radial-gradient` strings
 * and 5 `linear-gradient` strings. Read together they are not 24 different
 * ideas — they are one idea (a positioned glow, in a brand tone, at some
 * opacity) with the numbers tuned per artboard. This captures that grammar so
 * the tuning stays as data while the CSS stops being copy-pasted.
 *
 * Two things this fixes as a side effect:
 *
 * 1. The old strings hardcoded `rgba(88,102,194,…)` etc., so a token change
 *    never reached them. Tones resolve from `COLORS`.
 * 2. Accent switching silently skipped every backdrop. `applyAccent` matches
 *    hex and `rgb(…)`, and `rgba(57, 71, 168, 0.25)` is neither — so choosing
 *    the sage accent re-tinted the text and left the background glow indigo.
 *    Emitting `rgba()` derived from a token, plus the matching rgba support
 *    added to `app/editor/theme.js`, makes the whole artboard recolour.
 */

/** Brand tones a backdrop may use. Names describe intent, not hex. */
export const TONES = {
  indigo: COLORS.signal500,
  indigoLight: COLORS.signal400,
  indigoDeep: COLORS.signal700,
  sage: COLORS.attest500,
  white: COLORS.ink0,
  ink: COLORS.ink950,
};

/** '#RRGGBB' + alpha -> 'rgba(r, g, b, a)', spaced the way the DOM serialises it. */
export function rgba(hex, alpha = 1) {
  const n = parseInt(String(hex).replace('#', ''), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}

const toneHex = (tone) => TONES[tone] ?? tone;

/**
 * One or more radial glows.
 * @param {Array<{at:string, tone:string, alpha:number, to?:string, shape?:string}>} layers
 */
export function glow(layers) {
  return layers
    .map(({ at, tone, alpha, to = '55%', shape = 'ellipse' }) =>
      `radial-gradient(${shape} at ${at}, ${rgba(toneHex(tone), alpha)}, transparent ${to})`)
    .join(', ');
}

/**
 * A linear wash, optionally followed by radial glows.
 * @param {{angle?:string, stops:Array<{tone?:string, alpha?:number, at:string}>}} wash
 * @param {Array} [layers] additional radial glows
 */
export function wash({ angle = '180deg', stops }, layers = []) {
  const linear = `linear-gradient(${angle}, ${stops
    .map(({ tone, alpha = 1, at }) =>
      `${tone ? rgba(toneHex(tone), alpha) : 'transparent'} ${at}`)
    .join(', ')})`;
  return layers.length ? `${linear}, ${glow(layers)}` : linear;
}

/**
 * Named backdrops for the recurring intents. Templates that need art direction
 * outside these still pass their own `glow(...)`/`wash(...)` composition — the
 * grammar is the shared thing, not a fixed menu.
 */
export const BACKDROPS = {
  none: null,
  darkHero: glow([
    { at: '30% 20%', tone: 'indigoLight', alpha: 0.25 },
    { at: '80% 90%', tone: 'sage', alpha: 0.18 },
  ]),
  darkHeroStrong: glow([
    { at: '80% 20%', tone: 'indigoLight', alpha: 0.45, to: '50%' },
    { at: '20% 90%', tone: 'indigo', alpha: 0.35 },
  ]),
  darkFooted: glow([
    { at: '50% 100%', tone: 'indigo', alpha: 0.4, to: '60%' },
    { at: '20% 0%', tone: 'sage', alpha: 0.18, to: '50%' },
  ]),
  lightTint: glow([{ at: '80% 90%', tone: 'indigo', alpha: 0.08, to: '60%' }]),
  sageCorner: glow([{ at: '20% 80%', tone: 'sage', alpha: 0.18, to: '50%' }]),
  campaign: glow([{ at: '30% 30%', tone: 'indigoLight', alpha: 0.4, to: '60%' }]),
};

/** Resolve a backdrop prop: a registry name, a raw CSS string, or nothing. */
export function resolveBackdrop(backdrop) {
  if (!backdrop) return null;
  if (typeof backdrop === 'string') return BACKDROPS[backdrop] ?? backdrop;
  return null;
}
