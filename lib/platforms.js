/**
 * Platform limits and safe areas.
 *
 * Every number here is from a first-party source, with the source and the date
 * it was checked, because these drift and third-party "social media size guide"
 * blogs are frequently years stale. Anything we could not source first-party is
 * marked and shown as advisory rather than enforced.
 */

export const VERIFIED_ON = '2026-08-18';

/**
 * Character limits. `counting` matters as much as the number:
 *  - X weights emoji and CJK as 2, and every URL as exactly 23 regardless of length.
 *  - Threads counts UTF-8 bytes, so an emoji costs 4+.
 *  - YouTube's API counts description bytes, not characters.
 * One naive `.length` counter cannot serve these, so each limit says how to count.
 */
export const LIMITS = [
  { platform: 'X', field: 'Post', max: 280, counting: 'x',
    source: 'docs.x.com/fundamentals/counting-characters' },
  { platform: 'X', field: 'Post (Premium)', max: 25000, counting: 'x',
    source: 'docs.x.com/fundamentals/counting-characters' },
  { platform: 'X', field: 'Bio', max: 160, counting: 'chars',
    source: 'docs.x.com/fundamentals/counting-characters' },
  { platform: 'X', field: 'Alt text', max: 1000, counting: 'chars',
    source: 'docs.x.com — note: 420 is the pre-2022 value, still widely repeated' },
  { platform: 'Instagram', field: 'Caption (feed & Reels)', max: 2200, counting: 'chars',
    source: 'Instagram Graph API' },
  { platform: 'Instagram', field: 'Alt text', max: 1000, counting: 'chars',
    source: 'Instagram Graph API — images and carousels only, not Reels/Stories' },
  { platform: 'Instagram', field: 'Bio', max: 150, counting: 'chars',
    source: 'third-party (unanimous, not first-party)', advisory: true },
  { platform: 'Threads', field: 'Post', max: 500, counting: 'bytes',
    source: 'Threads API' },
  { platform: 'LinkedIn', field: 'Post', max: 3000, counting: 'chars',
    source: 'LinkedIn API' },
  { platform: 'LinkedIn', field: 'Article body', max: 125000, counting: 'chars',
    source: 'LinkedIn — blogs commonly say 110,000; that is wrong' },
  { platform: 'TikTok', field: 'Caption', max: 2200, counting: 'chars',
    source: 'TikTok Content Posting API (UTF-16 runes)' },
  { platform: 'YouTube', field: 'Title', max: 100, counting: 'chars',
    source: 'YouTube Data API' },
  { platform: 'YouTube', field: 'Description', max: 5000, counting: 'bytes',
    source: 'YouTube Data API (byte-counted)' },
  { platform: 'YouTube', field: 'Channel description', max: 1000, counting: 'chars',
    source: 'YouTube Data API' },
  { platform: 'Pinterest', field: 'Pin description', max: 800, counting: 'chars',
    source: 'Pinterest API — the commonly cited 500 is stale' },
];

/**
 * Instagram hashtag cap — two credible sources disagree, so we show the
 * conservative number and say why rather than silently picking one.
 */
export const HASHTAG_NOTE = {
  conservative: 5,
  alternative: 30,
  text:
    'Instagram hashtags: Later documents a drop to 5 per post/reel from 18 Dec 2025, ' +
    'while Meta’s API docs still describe 30 (caption + first comment combined). ' +
    'Stay at or under 5 until this is confirmed against a live account.',
};

const URL_RE = /(?:https?:\/\/|www\.)\S+/g;
// Rough CJK + emoji ranges — the scripts X counts as two.
const WIDE_RE = /[ᄀ-ᇿ⺀-꓏가-퟿豈-﫿︰-﹏＀-｠￠-￦]|\p{Extended_Pictographic}/gu;

/**
 * Count a string the way a given platform does.
 * @param {string} text
 * @param {'chars'|'bytes'|'x'} mode
 */
export function countFor(text, mode = 'chars') {
  const s = String(text ?? '');
  if (mode === 'bytes') return new TextEncoder().encode(s).length;
  if (mode === 'x') {
    // Every URL counts as 23 whatever its length; wide characters count double.
    const urls = s.match(URL_RE) ?? [];
    const withoutUrls = s.replace(URL_RE, '');
    const wide = (withoutUrls.match(WIDE_RE) ?? []).length;
    return [...withoutUrls].length + wide + urls.length * 23;
  }
  // Grapheme-aware where available, so a family emoji is one character, not seven.
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    return [...new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(s)].length;
  }
  return [...s].length;
}

/**
 * Safe areas.
 *
 * Meta's is the only officially published safe area in this space, given as
 * percentages: "roughly 14% of the top, 35% of the bottom and 6% on each side"
 * must stay clear of text and logos (Meta Ads Guide, Instagram Reels). It is
 * also more conservative on both axes than every third-party TikTok/Shorts
 * figure, so one overlay is defensible for all vertical formats.
 *
 * YouTube channel art is the other first-party number: a 1235x338 safe area
 * inside 2560x1440 (YouTube Help 10456525).
 */
export const SAFE_AREAS = [
  {
    id: 'vertical',
    label: 'Vertical · Reels / Stories / Shorts / TikTok',
    match: (w, h) => h / w > 1.5,
    insets: { top: 0.14, bottom: 0.35, left: 0.06, right: 0.06 },
    source: 'Meta Ads Guide — Instagram Reels (14% / 35% / 6%)',
  },
  {
    id: 'yt-banner',
    label: 'YouTube channel art',
    match: (w, h) => w === 2560 && h === 1440,
    box: { width: 1235, height: 338 },
    source: 'YouTube Help 10456525',
  },
];

/** The safe-area rectangle in px for an artboard, or null if none applies. */
export function safeAreaFor(w, h) {
  const spec = SAFE_AREAS.find((s) => s.match(w, h));
  if (!spec) return null;
  if (spec.box) {
    return {
      label: spec.label,
      source: spec.source,
      x: Math.round((w - spec.box.width) / 2),
      y: Math.round((h - spec.box.height) / 2),
      width: spec.box.width,
      height: spec.box.height,
    };
  }
  const { top, bottom, left, right } = spec.insets;
  return {
    label: spec.label,
    source: spec.source,
    x: Math.round(w * left),
    y: Math.round(h * top),
    width: Math.round(w * (1 - left - right)),
    height: Math.round(h * (1 - top - bottom)),
  };
}
