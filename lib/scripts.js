/**
 * Per-script typography.
 *
 * Font fallback in browsers happens *per character*, so non-Latin text never
 * renders as tofu on a normal OS — it drops out of Inter and lands on a system
 * face. Two things do go wrong, and this module addresses both:
 *
 * 1. Han unification. Chinese, Japanese and Korean share code points but draw
 *    several of them differently (直, 骨, 令). Without a correct `lang`, the
 *    browser may render Japanese text with a Chinese face — readable, wrong, and
 *    obvious to a native reader. Setting `lang` is the cheapest correctness win
 *    available; all three engines consult it for platform fallback.
 * 2. Vertical rhythm. CJK glyphs fill the full em square and CJK fonts declare
 *    taller metrics, so the same numeric line-height yields a taller box than
 *    Inter. Thai needs roughly 150% additional vertical space (W3C). Templates
 *    are fixed-size, so each script gets a line-height multiplier.
 */

/** Stacks put Inter first deliberately — Latin takes Inter, other scripts skip past it. */
export const SCRIPTS = {
  latin: {
    label: 'Latin',
    lang: 'en',
    dir: 'ltr',
    stack: null, // the brand default already applies
    lineHeight: 1,
  },
  cyrillic: {
    label: 'Cyrillic',
    lang: 'ru',
    dir: 'ltr',
    stack: null, // self-hosted Inter Cyrillic subset covers it
    lineHeight: 1,
  },
  ja: {
    label: 'Japanese',
    lang: 'ja',
    dir: 'ltr',
    stack:
      "Inter, -apple-system, 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', " +
      "'Yu Gothic UI', 'Yu Gothic', YuGothic, Meiryo, 'Noto Sans JP', sans-serif",
    lineHeight: 1.15,
  },
  'zh-Hans': {
    label: 'Chinese (Simplified)',
    lang: 'zh-Hans',
    dir: 'ltr',
    stack:
      "Inter, -apple-system, 'PingFang SC', 'Hiragino Sans GB', " +
      "'Microsoft YaHei UI', 'Microsoft YaHei', 'Noto Sans SC', SimHei, sans-serif",
    lineHeight: 1.15,
  },
  ko: {
    label: 'Korean',
    lang: 'ko',
    dir: 'ltr',
    stack:
      "Inter, -apple-system, 'Apple SD Gothic Neo', 'Malgun Gothic', " +
      "'Noto Sans KR', 'Nanum Gothic', Dotum, sans-serif",
    lineHeight: 1.15,
  },
  ar: {
    label: 'Arabic',
    lang: 'ar',
    dir: 'rtl',
    stack:
      "Inter, 'Noto Sans Arabic', 'SF Arabic', 'Geeza Pro', 'Segoe UI', Tahoma, " +
      "'Noto Naskh Arabic', sans-serif",
    lineHeight: 1.2,
    // letter-spacing breaks Arabic letter joining outright.
    noLetterSpacing: true,
  },
  he: {
    label: 'Hebrew',
    lang: 'he',
    dir: 'rtl',
    stack: "Inter, 'Noto Sans Hebrew', 'Arial Hebrew', 'Segoe UI', sans-serif",
    lineHeight: 1.15,
    noLetterSpacing: true,
  },
  hi: {
    label: 'Hindi',
    lang: 'hi',
    dir: 'ltr',
    stack:
      "Inter, 'Noto Sans Devanagari', 'Kohinoor Devanagari', " +
      "'Devanagari Sangam MN', 'Nirmala UI', Mangal, sans-serif",
    lineHeight: 1.25,
  },
  th: {
    label: 'Thai',
    lang: 'th',
    dir: 'ltr',
    stack:
      "Inter, 'Noto Sans Thai', Thonburi, 'Sukhumvit Set', " +
      "'Leelawadee UI', Leelawadee, Tahoma, sans-serif",
    lineHeight: 1.5, // W3C: Thai needs ~150% additional vertical space
  },
};

export const DEFAULT_SCRIPT = 'latin';

/**
 * Style + attributes to apply to an artboard for a given script.
 * Returns plain props so a caller can spread them onto the wrapper element.
 */
export function scriptProps(key, localeCode) {
  const s = SCRIPTS[key] ?? SCRIPTS[DEFAULT_SCRIPT];
  // Latin and Cyrillic cover many languages, so the script alone cannot supply a
  // useful `lang` — prefer the locale's own code (de, es, ru...). For CJK the
  // script entry IS the language tag and is what disambiguates Han glyphs.
  const lang = s.stack ? s.lang : localeCode || s.lang;
  const style = {};
  if (s.stack) style.fontFamily = s.stack;
  if (s.lineHeight !== 1) style['--script-line-height'] = String(s.lineHeight);
  if (s.noLetterSpacing) style.letterSpacing = 'normal';
  return { lang, dir: s.dir, style };
}

/**
 * Wrap runs that bidi would scramble inside an RTL paragraph — @handles, URLs
 * and number ranges pick up direction from their neighbours, so "1st place"
 * inside Arabic renders as "1 - …st place". U+2066 LEFT-TO-RIGHT ISOLATE and
 * U+2069 POP DIRECTIONAL ISOLATE fix it without needing nested markup, which
 * matters because template text is passed as flat strings.
 */
export function isolateLtrRuns(text, dir) {
  if (dir !== 'rtl' || typeof text !== 'string') return text;
  return text.replace(
    /((?:https?:\/\/|www\.)\S+|@[\w.-]+|\d+(?:[./-]\d+)*(?:st|nd|rd|th)?)/gi,
    '⁦$1⁩',
  );
}
