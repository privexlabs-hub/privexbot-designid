'use client';

import React from 'react';
import { Frame, Icon, DotGrid, COLORS } from '@/components/brand';
import { resolveBackdrop } from './backdrop';

/**
 * `Slab` — the shape every artboard in this kit already was.
 *
 * Read the 41 hand-written templates and the same skeleton appears in almost
 * all of them: a `Frame` in one of the four brand lanes, an optional backdrop
 * and dot-grid texture, an optional accent stripe, then a padded flex column
 * with content pinned to the top, middle and bottom. Slab is that skeleton,
 * named once.
 *
 * Everything renders through `Frame`, so `LaneOverrideProvider` and the editor's
 * lane switching keep working untouched.
 */

/** Lane -> the tones its foreground text uses. Kept here so archetypes agree. */
export const LANE_TONES = {
  'lane-dark': {
    heading: COLORS.ink0,
    body: COLORS.ink200,
    muted: COLORS.ink300,
    accent: COLORS.signal300,
    mark: 'white',
    hairline: 'rgba(255,255,255,0.12)',
  },
  'lane-mono': {
    heading: COLORS.ink900,
    body: COLORS.ink500,
    muted: COLORS.ink400,
    accent: COLORS.signal500,
    mark: 'black',
    hairline: COLORS.ink100,
  },
  'lane-light': {
    heading: COLORS.ink900,
    body: COLORS.ink500,
    muted: COLORS.ink400,
    accent: COLORS.signal500,
    mark: 'indigo',
    hairline: COLORS.ink100,
  },
  'lane-editorial': {
    heading: COLORS.ink900,
    body: COLORS.ink500,
    muted: COLORS.ink400,
    accent: COLORS.signal500,
    mark: 'black',
    hairline: COLORS.ink100,
  },
};

export const tones = (lane) => LANE_TONES[lane] ?? LANE_TONES['lane-mono'];

/**
 * The single brand footer.
 *
 * Replaces the two near-identical implementations that had drifted apart —
 * `PostFooter` in posts.jsx used a 16px hashtag line, `PostFoot` in
 * engagement-posts.jsx used 14px, so the same element rendered differently
 * depending on which file a template happened to live in. 16px wins: it was
 * used by more templates.
 */
export function BrandFooter({ lane = 'lane-mono', tags = [], right, size = 1 }) {
  const t = tones(lane);
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: 20 * size,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 * size }}>
        <Icon color={t.mark} size={32 * size} />
        <span
          style={{
            fontFamily: 'Inter Tight',
            fontWeight: 800,
            fontSize: 22 * size,
            letterSpacing: '0.08em',
            color: lane === 'lane-dark' ? COLORS.ink0 : t.accent === COLORS.signal500 && lane === 'lane-light' ? COLORS.signal500 : COLORS.ink900,
          }}
        >
          PRIVEXBOT
        </span>
      </div>
      {right ?? (
        <div
          style={{
            fontFamily: 'JetBrains Mono',
            fontSize: 16 * size,
            color: t.muted,
            letterSpacing: '0.02em',
          }}
        >
          {tags.map((x) => `#${x}`).join('  ')}
        </div>
      )}
    </div>
  );
}

/**
 * @param {object} p
 * @param {string} p.lane            one of the brand.css lane classes
 * @param {number} p.w
 * @param {number} p.h
 * @param {number} [p.pad=72]        inner padding
 * @param {string|null} [p.backdrop] registry name or raw CSS gradient
 * @param {object|false} [p.dots]    DotGrid props, or false for none
 * @param {'top'|'left'|false} [p.stripe] accent bar edge
 * @param {number} [p.stripeSize=8]
 * @param {React.ReactNode} [p.top] [p.middle] [p.bottom]
 * @param {React.ReactNode} [p.children] used instead of the three slots
 */
export function Slab({
  lane = 'lane-mono',
  w,
  h,
  pad = 72,
  backdrop = null,
  dots = false,
  stripe = false,
  stripeSize = 8,
  stripeColor,
  markSlot,
  top,
  middle,
  bottom,
  children,
  frameStyle,
  contentStyle,
}) {
  const bg = resolveBackdrop(backdrop);
  const slots = [top, middle, bottom].filter((x) => x !== undefined && x !== null);
  const stripeStyle =
    stripe === 'top'
      ? { top: 0, left: 0, right: 0, height: stripeSize }
      : stripe === 'left'
        ? { top: 0, left: 0, bottom: 0, width: stripeSize }
        : null;

  return (
    <Frame lane={lane} width={w} height={h} style={frameStyle}>
      {bg && <div style={{ position: 'absolute', inset: 0, background: bg }} />}
      {dots && <DotGrid {...dots} />}
      {markSlot}
      {stripeStyle && (
        <div
          style={{
            position: 'absolute',
            ...stripeStyle,
            background: stripeColor ?? COLORS.signal500,
          }}
        />
      )}
      <div
        style={{
          position: 'relative',
          height: '100%',
          padding: pad,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          zIndex: 2,
          ...contentStyle,
        }}
      >
        {children ?? slots}
      </div>
    </Frame>
  );
}
