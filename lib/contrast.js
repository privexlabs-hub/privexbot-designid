/**
 * WCAG 2.2 contrast maths. No dependencies, no DOM — so the same module backs
 * both the live badge in the editor and the `npm run check:contrast` gate.
 *
 * Thresholds (WCAG 2.2 SC 1.4.3 / 1.4.11):
 *   4.5:1  normal text
 *   3:1    large text (>=24px, or >=18.66px bold) and non-text UI/graphics
 */

/** '#RRGGBB' -> [r,g,b] 0-255 */
export function parseHex(hex) {
  const h = String(hex).trim().replace('#', '');
  const full = h.length === 3 ? h.replace(/./g, (c) => c + c) : h;
  if (!/^[0-9a-f]{6}$/i.test(full)) throw new Error(`not a hex colour: ${hex}`);
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** Relative luminance, per WCAG 2.2 definition. */
export function luminance(hex) {
  const [r, g, b] = parseHex(hex).map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Contrast ratio between two colours, 1..21. */
export function contrast(a, b) {
  const la = luminance(a);
  const lb = luminance(b);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

export const AA_NORMAL = 4.5;
export const AA_LARGE = 3;

/** Round half-down to 2dp so a 4.4996 never displays as a passing "4.5". */
export const ratio = (a, b) => Math.floor(contrast(a, b) * 100) / 100;

/**
 * Grade a foreground/background pair.
 * @returns {{ratio:number, normal:boolean, large:boolean, level:'AAA'|'AA'|'AA Large'|'fail'}}
 */
export function grade(fg, bg) {
  const r = ratio(fg, bg);
  return {
    ratio: r,
    normal: r >= AA_NORMAL,
    large: r >= AA_LARGE,
    level: r >= 7 ? 'AAA' : r >= AA_NORMAL ? 'AA' : r >= AA_LARGE ? 'AA Large' : 'fail',
  };
}
