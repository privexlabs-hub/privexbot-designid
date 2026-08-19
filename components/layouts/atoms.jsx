'use client';

import React from 'react';
import { COLORS, Icon, Ico } from '@/components/brand';
import { tones } from './slab';

/**
 * The small pieces every archetype builds from — eyebrow, display headline,
 * body, pill, CTA, quote mark.
 *
 * Sizes stay props rather than a fixed scale: display type across the existing
 * catalog runs 84 → 380px, genuinely tuned per artboard, so a rigid scale would
 * flatten the design. What is shared here is the *treatment* — weights,
 * tracking, line-height ratios and lane-aware colour — not the size.
 *
 * Colours come from `COLORS` directly and are never computed. The editor's
 * accent switching works by string-matching brand hexes in rendered inline
 * styles, so a derived colour silently drops out of it.
 */

export function Eyebrow({ lane = 'lane-mono', size = 16, color, children, style }) {
  const t = tones(lane);
  return (
    <div
      style={{
        fontSize: size,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        // brand.css .eyebrow is 600; several templates had inlined 700.
        fontWeight: 600,
        color: color ?? (lane === 'lane-dark' ? t.accent : lane === 'lane-light' ? COLORS.signal700 : COLORS.ink500),
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function Display({
  lane = 'lane-mono',
  size = 84,
  weight = 700,
  lineHeight = 0.98,
  tracking = '-0.025em',
  color,
  children,
  style,
}) {
  return (
    <div
      className="display"
      style={{
        fontSize: size,
        fontWeight: weight,
        lineHeight,
        letterSpacing: tracking,
        color: color ?? tones(lane).heading,
        whiteSpace: 'pre-line',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function Body({ lane = 'lane-mono', size = 22, lineHeight = 1.45, maxWidth, color, children, style }) {
  return (
    <div
      style={{
        fontSize: size,
        lineHeight,
        color: color ?? tones(lane).body,
        maxWidth,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** Status pill — the sage "attested" badge and its siblings. */
export function Pill({ tone = 'sage', size = 16, dot = true, children, style }) {
  const palette = {
    sage: { bg: 'rgba(62, 138, 94, 0.18)', border: 'rgba(62, 138, 94, 0.4)', fg: COLORS.attest300, dot: COLORS.attest300 },
    indigo: { bg: 'rgba(88, 102, 194, 0.18)', border: 'rgba(88, 102, 194, 0.4)', fg: COLORS.signal300, dot: COLORS.signal300 },
    danger: { bg: 'rgba(229, 72, 77, 0.16)', border: 'rgba(229, 72, 77, 0.4)', fg: COLORS.danger300, dot: COLORS.danger300 },
    glass: { bg: 'rgba(255,255,255,0.08)', border: 'rgba(255,255,255,0.18)', fg: COLORS.ink0, dot: COLORS.attest300 },
    solid: { bg: COLORS.ink25, border: COLORS.ink100, fg: COLORS.ink700, dot: COLORS.signal500 },
  }[tone];
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: Math.round(size * 0.625),
        padding: `${Math.round(size * 0.5)}px ${size}px`,
        borderRadius: 999,
        background: palette.bg,
        border: `1px solid ${palette.border}`,
        color: palette.fg,
        fontSize: size,
        fontWeight: 600,
        letterSpacing: '0.04em',
        fontFamily: 'JetBrains Mono',
        ...style,
      }}
    >
      {dot && (
        <span style={{ width: Math.round(size * 0.5), height: Math.round(size * 0.5), borderRadius: 999, background: palette.dot }} />
      )}
      {children}
    </div>
  );
}

/** Filled call-to-action with the arrow glyph. */
export function Cta({ lane = 'lane-mono', size = 20, tone, children, style }) {
  const fill =
    tone ??
    (lane === 'lane-dark' ? COLORS.ink0 : lane === 'lane-light' ? COLORS.signal500 : COLORS.ink950);
  const fg = fill === COLORS.ink0 ? COLORS.ink950 : COLORS.ink0;
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: size * 0.5,
        padding: `${size * 0.7}px ${size * 1.1}px`,
        borderRadius: 12,
        background: fill,
        color: fg,
        fontSize: size,
        fontWeight: 700,
        ...style,
      }}
    >
      {children} <Ico name="arrow" size={size} stroke={2.2} />
    </div>
  );
}

/**
 * The quote glyph.
 *
 * Was duplicated inline in `QuotePost` and `StoryQuote`, and the `StoryQuote`
 * copy was malformed — its second path opened the right glyph then jumped to the
 * left glyph's coordinates before drawing the right one as a second subpath,
 * painting a stray filled wedge across the artboard. This is the correct one.
 */
export function QuoteMark({ width = 140, color = COLORS.signal500, style }) {
  const height = Math.round((width / 140) * 100);
  return (
    <svg width={width} height={height} viewBox="0 0 140 100" fill="none" style={style}>
      <path d="M30 80 Q20 80 20 60 Q20 40 40 30 L48 42 Q34 48 34 60 L46 60 L46 80 L30 80z" fill={color} />
      <path d="M90 80 Q80 80 80 60 Q80 40 100 30 L108 42 Q94 48 94 60 L106 60 L106 80 L90 80z" fill={color} />
    </svg>
  );
}

/** Icon + wordmark lockup, used in headers and footers. */
export function MarkLockup({ lane = 'lane-mono', size = 40, text = 'PRIVEXBOT', style }) {
  const t = tones(lane);
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.35, ...style }}>
      <Icon color={t.mark} size={size} />
      <span
        style={{
          fontFamily: 'Inter Tight',
          fontWeight: 800,
          fontSize: size * 0.55,
          letterSpacing: '0.08em',
          color: lane === 'lane-dark' ? COLORS.ink0 : lane === 'lane-light' ? COLORS.signal500 : COLORS.ink900,
        }}
      >
        {text}
      </span>
    </div>
  );
}

export function Hairline({ lane = 'lane-mono', style }) {
  return <div style={{ height: 1, background: tones(lane).hairline, ...style }} />;
}
