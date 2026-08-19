import { COLORS } from '@/components/brand';

// Lane options come straight from brand.css — no second palette.
export const LANES = [
  { id: '', label: 'Default' },
  { id: 'lane-mono', label: 'Mono' },
  { id: 'lane-dark', label: 'Dark' },
  { id: 'lane-light', label: 'Light' },
  { id: 'lane-editorial', label: 'Editorial' },
];

// Accents are the existing brand signal scale plus the sage attest accent.
export const ACCENTS = [
  { id: '', label: 'Brand indigo', swatch: COLORS.signal500 },
  { id: 'signal700', label: 'Deep indigo', swatch: COLORS.signal700 },
  { id: 'signal400', label: 'Light indigo', swatch: COLORS.signal400 },
  { id: 'attest500', label: 'Attest sage', swatch: COLORS.attest500 },
  { id: 'ink950', label: 'Ink', swatch: COLORS.ink950 },
];

// Templates hardcode the indigo scale in inline styles, so re-accenting is done
// by rewriting those inline values on the rendered DOM rather than threading a
// colour prop through 30 components. Each entry maps brand indigo -> accent.
const ACCENT_MAP = {
  signal700: {
    [COLORS.signal500]: COLORS.signal700,
    [COLORS.signal400]: COLORS.signal600,
    [COLORS.signal300]: COLORS.signal400,
    [COLORS.signal50]: COLORS.signal100,
  },
  signal400: {
    [COLORS.signal500]: COLORS.signal400,
    [COLORS.signal700]: COLORS.signal500,
    [COLORS.signal300]: COLORS.signal200,
  },
  attest500: {
    [COLORS.signal500]: COLORS.attest500,
    [COLORS.signal700]: COLORS.attest700,
    [COLORS.signal400]: COLORS.attest500,
    [COLORS.signal300]: COLORS.attestLight,
    [COLORS.signal50]: COLORS.attest100,
  },
  ink950: {
    [COLORS.signal500]: COLORS.ink950,
    [COLORS.signal700]: COLORS.ink900,
    [COLORS.signal400]: COLORS.ink700,
    [COLORS.signal300]: COLORS.ink300,
    [COLORS.signal50]: COLORS.ink50,
  },
};

const rgb = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgb(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255})`;
};
// Backdrop glows are written as rgba(r, g, b, a). That is neither the hex form
// nor `rgb(r, g, b)`, so before this the accent switch recoloured the text and
// pills and left every background glow indigo — a half-recoloured artboard.
// Matching the `rgba(r, g, b` prefix catches them at any alpha.
const rgbaPrefix = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
};

/**
 * Swap any inline colour matching the brand indigo scale for the chosen accent.
 * The first call caches each element's original style attribute, so clearing the
 * accent restores the template exactly. Safe to run after every render.
 */
export function applyAccent(root, accentId) {
  if (!root) return;
  const map = ACCENT_MAP[accentId];
  for (const el of [root, ...root.querySelectorAll('*')]) {
    if (el.__brandStyle === undefined) el.__brandStyle = el.getAttribute('style') || '';
    const original = el.__brandStyle;
    if (!map) {
      if (el.getAttribute('style') !== original) el.setAttribute('style', original);
      continue;
    }
    let next = original;
    for (const [from, to] of Object.entries(map)) {
      next = next
        .split(from).join(to)
        .split(rgb(from)).join(rgb(to))
        .split(rgbaPrefix(from)).join(rgbaPrefix(to));
    }
    if (next !== el.getAttribute('style')) el.setAttribute('style', next);
  }
}
