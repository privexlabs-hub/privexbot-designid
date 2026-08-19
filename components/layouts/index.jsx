'use client';

import React from 'react';
import { COLORS, Icon, Ico, DotGrid } from '@/components/brand';
import { Slab, tones, BrandFooter } from './slab';
import { Eyebrow, Display, Body, Pill, Cta, QuoteMark, MarkLockup, Hairline } from './atoms';

export { Slab, tones, BrandFooter } from './slab';
export * from './atoms';
export * from './backdrop';

/**
 * Layout archetypes.
 *
 * Each is a composition of `Slab` + atoms, taking content as props. A catalog
 * entry picks one, supplies content, and the editor renders it — so adding a
 * template is an entry in `app/editor/templates.js`, not a new file.
 *
 * Sizes stay props because display type genuinely varies per artboard (84 →
 * 380px across the catalog). What the archetype fixes is structure, spacing
 * rhythm and lane-aware colour, which is where drift actually happened.
 */

/** eyebrow → display headline → body → CTA. The dominant shape in the kit. */
export function Stack({
  lane = 'lane-mono',
  w,
  h,
  pad,
  backdrop,
  dots,
  stripe,
  eyebrow,
  badge,
  badgeTone = 'sage',
  title,
  titleSize = 84,
  titleColor,
  accentLine,
  body,
  bodySize = 22,
  bodyLineHeight = 1.45,
  bodyMaxWidth = 880,
  gap = 24,
  bullets,
  cta,
  tags = [],
  footerRight,
  scale = 1,
}) {
  const t = tones(lane);
  return (
    <Slab
      lane={lane}
      w={w}
      h={h}
      pad={pad ?? 72 * scale}
      backdrop={backdrop}
      dots={dots}
      stripe={stripe}
      top={
        (badge || eyebrow) && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
            {badge ? <Pill tone={badgeTone} size={16 * scale}>{badge}</Pill> : <span />}
            {eyebrow && <Eyebrow lane={lane} size={15 * scale}>{eyebrow}</Eyebrow>}
          </div>
        )
      }
      middle={
        <div style={{ display: 'flex', flexDirection: 'column', gap: gap * scale }}>
          {title && (
            <Display lane={lane} size={titleSize * scale} color={titleColor}>
              {title}
            </Display>
          )}
          {accentLine && (
            <Display lane={lane} size={titleSize * 0.55 * scale} color={t.accent} weight={500}>
              {accentLine}
            </Display>
          )}
          {body && <Body lane={lane} size={bodySize * scale} lineHeight={bodyLineHeight} maxWidth={bodyMaxWidth * scale}>{body}</Body>}
          {!!bullets?.length && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 * scale }}>
              {bullets.map((b, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 * scale }}>
                  <Ico name="check" size={22 * scale} stroke={2} style={{ color: COLORS.attest500 }} />
                  <span style={{ fontSize: 20 * scale, color: t.heading, fontWeight: 500 }}>
                    {typeof b === 'string' ? b : b.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      }
      bottom={
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 * scale }}>
          {cta && <Cta lane={lane} size={20 * scale}>{cta}</Cta>}
          <BrandFooter lane={lane} tags={tags} right={footerRight} size={scale} />
        </div>
      }
    />
  );
}

/** Giant number + caption. Big-stat cards, "did you know", data posts. */
export function Stat({
  frameStyle,
  lane = 'lane-light',
  w,
  h,
  pad,
  backdrop,
  dots,
  eyebrow,
  number,
  unit,
  numberSize = 240,
  caption,
  captionSize = 30,
  context,
  source,
  tags = [],
  scale = 1,
}) {
  const t = tones(lane);
  return (
    <Slab
      lane={lane}
      w={w}
      h={h}
      pad={pad ?? 72 * scale}
      frameStyle={frameStyle}
      backdrop={backdrop}
      dots={dots}
      top={eyebrow && <Eyebrow lane={lane} size={16 * scale}>{eyebrow}</Eyebrow>}
      middle={
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 * scale }}>
          {/* The number sits directly in the column — an intermediate
              baseline-aligned flex row changes the computed height and shifts
              the whole block by a few pixels. */}
          <div
            style={{
              fontFamily: 'Inter Tight',
              fontSize: numberSize * scale,
              fontWeight: 800,
              color: t.accent === COLORS.signal300 ? COLORS.signal300 : COLORS.signal500,
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
            }}
          >
            {number}
            {unit && <span style={{ fontSize: numberSize * 0.52 * scale }}>{unit}</span>}
          </div>
          {caption && (
            <div style={{ fontSize: captionSize * scale, color: t.heading, lineHeight: 1.25, fontWeight: 500, maxWidth: 880 * scale }}>
              {caption}
            </div>
          )}
          {context && <Body lane={lane} size={18 * scale} maxWidth={720 * scale}>{context}</Body>}
        </div>
      }
      bottom={
        source ? (
          // Stat cards put the source on the left and the mark on the right —
          // the reverse of the standard footer, and worth keeping: the source
          // is a citation, not a hashtag line.
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 13 * scale, color: t.muted }}>{source}</div>
            <MarkLockup lane={lane} size={36 * scale} />
          </div>
        ) : (
          <BrandFooter lane={lane} tags={tags} size={scale} />
        )
      }
    />
  );
}

/** Quote mark, quote, attribution. */
export function Quote({
  frameStyle,
  lane = 'lane-editorial',
  w,
  h,
  pad,
  backdrop,
  dots,
  eyebrow,
  quote,
  quoteSize = 60,
  author,
  role,
  scale = 1,
}) {
  const t = tones(lane);
  return (
    <Slab
      lane={lane}
      w={w}
      h={h}
      pad={pad ?? 80 * scale}
      frameStyle={frameStyle}
      backdrop={backdrop}
      dots={dots}
      markSlot={
        <div style={{ position: 'absolute', top: (pad ?? 80 * scale) - 16 * scale, right: (pad ?? 80 * scale) - 16 * scale }}>
          <QuoteMark width={140 * scale} color={COLORS.signal500} />
        </div>
      }
      top={eyebrow && <Eyebrow lane={lane} size={16 * scale}>{eyebrow}</Eyebrow>}
      middle={
        <Display lane={lane} size={quoteSize * scale} weight={600} lineHeight={1.08} tracking="-0.02em"
                 style={{ fontFamily: 'Inter Tight' }}>
          {quote}
        </Display>
      }
      bottom={
        <div>
          <Hairline lane={lane} style={{ marginBottom: 22 * scale }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 22 * scale, fontWeight: 700, color: t.heading }}>{author}</div>
              {role && <div style={{ fontSize: 17 * scale, color: t.body, marginTop: 4 * scale }}>{role}</div>}
            </div>
            <MarkLockup lane={lane} size={36 * scale} />
          </div>
        </div>
      }
    />
  );
}

/**
 * Two stacked panels. Not symmetric by design — problem/solution pairs a
 * bordered card with a solid-filled one, and before/after and myth/fact use the
 * same asymmetry, so each panel is styled independently.
 */
export function Split({
  lane = 'lane-mono',
  w,
  h,
  pad,
  stripe = 'top',
  eyebrow,
  panels = [],
  tags = [],
  scale = 1,
}) {
  const t = tones(lane);
  const style = {
    outline: { background: COLORS.ink25, border: `1px solid ${COLORS.ink100}`, color: COLORS.ink900, sub: COLORS.ink500 },
    fill: { background: COLORS.signal500, border: 'none', color: COLORS.ink0, sub: COLORS.signal100 },
    dark: { background: COLORS.ink950, border: 'none', color: COLORS.ink0, sub: COLORS.ink200 },
  };
  return (
    <Slab
      lane={lane}
      w={w}
      h={h}
      pad={pad ?? 72 * scale}
      stripe={stripe}
      contentStyle={{ gap: 28 * scale, justifyContent: 'flex-start' }}
    >
      {eyebrow && <Eyebrow lane={lane} size={16 * scale}>{eyebrow}</Eyebrow>}
      <div style={{ display: 'grid', gridTemplateRows: `repeat(${panels.length}, 1fr)`, gap: 28 * scale, flex: 1 }}>
        {panels.map((p, i) => {
          const s = style[p.variant ?? 'outline'];
          return (
            <div key={i} style={{ background: s.background, border: s.border, borderRadius: 16, padding: 36 * scale, color: s.color }}>
              {p.badge && (
                <Pill tone={p.badgeTone ?? 'danger'} size={13 * scale} style={{ marginBottom: 14 * scale }}>
                  {p.badge}
                </Pill>
              )}
              <div className="display" style={{ fontSize: 40 * scale, lineHeight: 1.1, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 14 * scale }}>
                {p.title}
              </div>
              {p.body && (
                <div style={{ fontSize: 18 * scale, color: s.sub, lineHeight: 1.5, fontStyle: p.italic ? 'italic' : 'normal' }}>
                  {p.body}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <BrandFooter lane={lane} tags={tags} size={scale} />
    </Slab>
  );
}

/** Numbered steps — how it works, tutorials, checklists. */
export function Steps({
  lane = 'lane-mono',
  w,
  h,
  pad,
  stripe = 'left',
  eyebrow,
  title,
  titleSize = 64,
  steps = [],
  tags = [],
  scale = 1,
}) {
  const t = tones(lane);
  return (
    <Slab
      lane={lane}
      w={w}
      h={h}
      pad={pad ?? 72 * scale}
      stripe={stripe}
      contentStyle={stripe === 'left' ? { paddingLeft: 88 * scale } : undefined}
      top={
        <div>
          {eyebrow && <Eyebrow lane={lane} size={16 * scale} style={{ marginBottom: 18 * scale }}>{eyebrow}</Eyebrow>}
          {title && <Display lane={lane} size={titleSize * scale} lineHeight={1.02}>{title}</Display>}
        </div>
      }
      middle={
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 * scale }}>
          {steps.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 22 * scale }}>
              <div
                style={{
                  width: 52 * scale, height: 52 * scale, borderRadius: '50%',
                  background: COLORS.signal500, color: COLORS.ink0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: 22 * scale, flexShrink: 0,
                }}
              >
                {s.n ?? i + 1}
              </div>
              <div style={{ flex: 1, paddingTop: 4 * scale }}>
                <div style={{ fontSize: 26 * scale, fontWeight: 600, color: t.heading }}>{s.t ?? s.title}</div>
                {(s.d ?? s.body) && (
                  <div style={{ fontSize: 18 * scale, color: t.body, marginTop: 6 * scale, lineHeight: 1.45 }}>
                    {s.d ?? s.body}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      }
      bottom={<BrandFooter lane={lane} tags={tags} size={scale} />}
    />
  );
}

/** Repeating cards — community spotlights, examples, social proof, logos. */
export function CardGrid({
  lane = 'lane-mono',
  w,
  h,
  pad,
  eyebrow,
  title,
  titleSize = 56,
  items = [],
  cols = 2,
  callout,
  tags = [],
  scale = 1,
}) {
  const t = tones(lane);
  return (
    <Slab
      lane={lane}
      w={w}
      h={h}
      pad={pad ?? 72 * scale}
      top={
        <div>
          {eyebrow && <Eyebrow lane={lane} size={16 * scale}>{eyebrow}</Eyebrow>}
          {title && <Display lane={lane} size={titleSize * scale} lineHeight={1} style={{ marginTop: 16 * scale }}>{title}</Display>}
        </div>
      }
      middle={
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 14 * scale }}>
          {items.map((it, i) => (
            <div
              key={i}
              style={{
                display: 'flex', alignItems: 'center', gap: 16 * scale, padding: 18 * scale,
                background: lane === 'lane-dark' ? 'rgba(255,255,255,0.05)' : COLORS.ink0,
                border: `1px solid ${t.hairline}`, borderRadius: 12,
              }}
            >
              {(it.icon ?? it.initial) && (
                <div
                  style={{
                    width: 56 * scale, height: 56 * scale, borderRadius: 12,
                    background: COLORS.signal100, color: COLORS.signal700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'Inter Tight', fontSize: 26 * scale, fontWeight: 800, flexShrink: 0,
                  }}
                >
                  {it.icon ?? it.initial}
                </div>
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 18 * scale, fontWeight: 700, color: t.heading }}>{it.name}</div>
                {it.tagline && (
                  <div style={{ fontSize: 14 * scale, color: t.body, marginTop: 2 * scale, lineHeight: 1.35 }}>
                    {it.tagline}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      }
      bottom={
        <div>
          {callout && (
            <div
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10 * scale,
                padding: `${14 * scale}px ${22 * scale}px`, borderRadius: 12,
                background: COLORS.signal500, color: COLORS.ink0,
                fontSize: 18 * scale, fontWeight: 600, marginBottom: 24 * scale,
              }}
            >
              <Ico name="arrow" size={18 * scale} stroke={2.4} /> {callout}
            </div>
          )}
          <BrandFooter lane={lane} tags={tags} size={scale} />
        </div>
      }
    />
  );
}

/** Comparison table — us vs them, feature matrices. */
export function CompareTable({
  lane = 'lane-mono',
  w,
  h,
  pad,
  eyebrow,
  title,
  titleSize = 48,
  themLabel = 'Typical AI platform',
  usLabel = 'PrivexBot',
  rows = [],
  tags = [],
  scale = 1,
}) {
  const t = tones(lane);
  return (
    <Slab
      lane={lane}
      w={w}
      h={h}
      pad={pad ?? 72 * scale}
      top={
        <div>
          {eyebrow && <Eyebrow lane={lane} size={16 * scale}>{eyebrow}</Eyebrow>}
          {title && <Display lane={lane} size={titleSize * scale} lineHeight={1} style={{ marginTop: 14 * scale }}>{title}</Display>}
        </div>
      }
      middle={
        <div style={{ borderRadius: 16, overflow: 'hidden', border: `1px solid ${COLORS.ink100}` }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', background: COLORS.ink25, borderBottom: `1px solid ${COLORS.ink100}` }}>
            <div style={{ padding: `${20 * scale}px ${24 * scale}px` }} />
            <div style={{ padding: `${20 * scale}px ${24 * scale}px`, fontSize: 16 * scale, color: COLORS.ink500, fontWeight: 600 }}>
              {themLabel}
            </div>
            <div
              style={{
                padding: `${20 * scale}px ${24 * scale}px`, fontSize: 16 * scale,
                color: COLORS.signal500, fontWeight: 700, background: COLORS.signal50,
                display: 'flex', alignItems: 'center', gap: 10 * scale,
              }}
            >
              <Icon color="indigo" size={22 * scale} /> {usLabel}
            </div>
          </div>
          {rows.map((r, i) => (
            <div
              key={i}
              style={{
                display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr',
                borderBottom: i < rows.length - 1 ? `1px solid ${COLORS.ink75}` : 'none',
              }}
            >
              <div style={{ padding: `${18 * scale}px ${24 * scale}px`, fontSize: 16 * scale, color: COLORS.ink700, fontWeight: 500 }}>
                {r.label}
              </div>
              <div style={{ padding: `${18 * scale}px ${24 * scale}px`, fontSize: 15 * scale, color: COLORS.ink500 }}>
                {r.a === false ? <span style={{ color: COLORS.danger500, fontWeight: 600 }}>—</span> : r.a}
              </div>
              <div
                style={{
                  padding: `${18 * scale}px ${24 * scale}px`, fontSize: 15 * scale,
                  color: COLORS.signal700, fontWeight: 600, background: COLORS.signal50,
                }}
              >
                {r.b}
              </div>
            </div>
          ))}
        </div>
      }
      bottom={<BrandFooter lane={lane} tags={tags} size={scale} />}
    />
  );
}

/** Monospace panel — attestation receipts, config, data payloads. */
export function MonoBlock({
  lane = 'lane-dark',
  w,
  h,
  pad,
  backdrop,
  dots,
  eyebrow,
  badge,
  title,
  titleSize = 52,
  lines = [],
  fileLabel,
  fileMeta,
  body,
  tags = [],
  scale = 1,
}) {
  const t = tones(lane);
  return (
    <Slab
      lane={lane}
      w={w}
      h={h}
      pad={pad ?? 64 * scale}
      backdrop={backdrop}
      dots={dots}
      contentStyle={{ gap: 0 }}
      top={
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {eyebrow && <Eyebrow lane={lane} size={15 * scale}>{eyebrow}</Eyebrow>}
          {badge && <Pill tone="sage" size={13 * scale}>{badge}</Pill>}
        </div>
      }
      middle={
        <>
          {title && <Display lane={lane} size={titleSize * scale} lineHeight={1.05} tracking="-0.02em">{title}</Display>}
          <div
            style={{
              background: 'rgba(0,0,0,0.45)', border: `1px solid rgba(136, 146, 216, 0.3)`,
              borderRadius: 14, padding: 30 * scale, marginTop: 28 * scale,
              fontFamily: 'JetBrains Mono', fontSize: 13 * scale, color: COLORS.signal200, lineHeight: 1.7,
            }}
          >
            {(fileLabel || fileMeta) && (
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(136, 146, 216, 0.2)', paddingBottom: 12 * scale, marginBottom: 12 * scale }}>
                <span style={{ color: COLORS.signal300, fontWeight: 600 }}>{fileLabel}</span>
                <span style={{ color: COLORS.ink400 }}>{fileMeta}</span>
              </div>
            )}
            {lines.map((l, i) => (
              <div key={i}>
                <span style={{ color: COLORS.ink400 }}>{l.k}</span>{' '}
                <span style={{ color: l.tone === 'sage' ? COLORS.attest300 : l.tone === 'danger' ? COLORS.danger300 : COLORS.ink0 }}>
                  {l.v}
                </span>
              </div>
            ))}
          </div>
        </>
      }
      bottom={
        <div>
          {body && <Body lane={lane} size={19 * scale} maxWidth={880 * scale} style={{ marginBottom: 28 * scale }}>{body}</Body>}
          <BrandFooter lane={lane} tags={tags} size={scale} />
        </div>
      }
    />
  );
}

/** Question with proportion bars — polls, survey results, conversation starters. */
export function Poll({
  lane = 'lane-mono',
  w,
  h,
  pad,
  eyebrow,
  question,
  questionSize = 52,
  options = [],
  footnote,
  tags = [],
  scale = 1,
}) {
  const t = tones(lane);
  const max = Math.max(1, ...options.map((o) => Number(o.pct) || 0));
  return (
    <Slab
      lane={lane}
      w={w}
      h={h}
      pad={pad ?? 72 * scale}
      top={eyebrow && <Eyebrow lane={lane} size={16 * scale}>{eyebrow}</Eyebrow>}
      middle={
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 * scale }}>
          <Display lane={lane} size={questionSize * scale} lineHeight={1.08}>{question}</Display>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 * scale }}>
            {options.map((o, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 6 * scale }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 20 * scale, color: t.heading, fontWeight: 500 }}>
                  <span>{o.label}</span>
                  {o.pct != null && <span style={{ fontFamily: 'JetBrains Mono', color: t.body }}>{o.pct}%</span>}
                </div>
                <div style={{ height: 14 * scale, borderRadius: 999, background: lane === 'lane-dark' ? 'rgba(255,255,255,0.08)' : COLORS.ink75, overflow: 'hidden' }}>
                  <div style={{ width: `${((Number(o.pct) || 0) / max) * 100}%`, height: '100%', background: o.highlight ? COLORS.attest500 : COLORS.signal500 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      }
      bottom={
        <div>
          {footnote && <Body lane={lane} size={18 * scale} style={{ marginBottom: 22 * scale }}>{footnote}</Body>}
          <BrandFooter lane={lane} tags={tags} size={scale} />
        </div>
      }
    />
  );
}

/** Date or countdown value — launches, events, webinars. */
export function Countdown({
  lane = 'lane-dark',
  w,
  h,
  pad,
  backdrop,
  dots,
  eyebrow,
  value,
  valueSize = 200,
  label,
  title,
  titleSize = 64,
  detail,
  cta,
  tags = [],
  scale = 1,
}) {
  const t = tones(lane);
  return (
    <Slab
      lane={lane}
      w={w}
      h={h}
      pad={pad ?? 72 * scale}
      backdrop={backdrop}
      dots={dots}
      top={eyebrow && <Eyebrow lane={lane} size={16 * scale}>{eyebrow}</Eyebrow>}
      middle={
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 * scale }}>
          <div
            style={{
              fontFamily: 'Inter Tight', fontSize: valueSize * scale, fontWeight: 800,
              color: t.accent, lineHeight: 0.88, letterSpacing: '-0.04em',
            }}
          >
            {value}
          </div>
          {label && <Eyebrow lane={lane} size={20 * scale}>{label}</Eyebrow>}
          {title && <Display lane={lane} size={titleSize * scale} lineHeight={1.02}>{title}</Display>}
          {detail && <Body lane={lane} size={22 * scale} maxWidth={880 * scale}>{detail}</Body>}
        </div>
      }
      bottom={
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 * scale }}>
          {cta && <Cta lane={lane} size={20 * scale}>{cta}</Cta>}
          <BrandFooter lane={lane} tags={tags} size={scale} />
        </div>
      }
    />
  );
}

/**
 * Wide hero — X/LinkedIn/Twitch/Facebook covers, email headers, web banners, OG
 * cards. Horizontal by construction: content on the left, mark on the right.
 * This is what a short, wide canvas needs; a vertical stack does not survive it.
 */
export function Banner({
  lane = 'lane-dark',
  w,
  h,
  pad,
  backdrop,
  dots,
  badge,
  badgeTone = 'sage',
  eyebrow,
  title,
  titleSize = 64,
  accentLine,
  body,
  bodySize = 18,
  markSize = 210,
  mark = true,
  align = 'center',
  scale = 1,
  footer,
}) {
  const t = tones(lane);
  return (
    <Slab
      lane={lane}
      w={w}
      h={h}
      pad={pad ?? 60 * scale}
      backdrop={backdrop}
      dots={dots}
      contentStyle={{
        flexDirection: 'row',
        alignItems: align,
        justifyContent: 'space-between',
        gap: 48 * scale,
      }}
    >
      <div style={{ maxWidth: '72%', display: 'flex', flexDirection: 'column', gap: 14 * scale }}>
        {badge && <Pill tone={badgeTone} size={12 * scale}>{badge}</Pill>}
        {eyebrow && <Eyebrow lane={lane} size={12 * scale}>{eyebrow}</Eyebrow>}
        {title && (
          <Display lane={lane} size={titleSize * scale} lineHeight={1} tracking="-0.025em">
            {title}
          </Display>
        )}
        {accentLine && (
          <Display lane={lane} size={titleSize * scale} lineHeight={1} tracking="-0.025em" color={t.accent}>
            {accentLine}
          </Display>
        )}
        {body && <Body lane={lane} size={bodySize * scale} maxWidth={560 * scale}>{body}</Body>}
        {footer}
      </div>
      {mark && <Icon color={t.mark} size={markSize * scale} style={{ opacity: 0.95, flexShrink: 0 }} />}
    </Slab>
  );
}

/** YouTube thumbnail — split hero, big type left, mark panel right. */
export function Thumb({
  lane = 'lane-dark',
  w = 1280,
  h = 720,
  pad,
  backdrop,
  dots,
  chips = [],
  title,
  titleSize = 84,
  accentLine,
  panelTone = COLORS.signal500,
  cornerNote,
  scale = 1,
}) {
  const t = tones(lane);
  return (
    <Slab
      lane={lane}
      w={w}
      h={h}
      pad={pad ?? 56 * scale}
      backdrop={backdrop}
      dots={dots}
      contentStyle={{
        display: 'grid',
        gridTemplateColumns: '1.4fr 1fr',
        gap: 48 * scale,
        alignItems: 'center',
      }}
    >
      <div>
        {!!chips.length && (
          <div style={{ display: 'flex', gap: 12 * scale, marginBottom: 22 * scale }}>
            {chips.map((c, i) => (
              <div
                key={i}
                style={{
                  padding: `${8 * scale}px ${16 * scale}px`, borderRadius: 8,
                  background: i === 0 ? COLORS.ink0 : 'transparent',
                  border: i === 0 ? 'none' : '2px solid rgba(255,255,255,0.4)',
                  color: i === 0 ? COLORS.ink950 : COLORS.ink0,
                  fontSize: 18 * scale, fontWeight: i === 0 ? 700 : 600, fontFamily: 'JetBrains Mono',
                }}
              >
                {typeof c === 'string' ? c : c.label}
              </div>
            ))}
          </div>
        )}
        <Display lane={lane} size={titleSize * scale} weight={800} lineHeight={0.96}>{title}</Display>
        {accentLine && (
          <Display lane={lane} size={titleSize * 0.6 * scale} weight={600} lineHeight={1} color={t.accent}
                   style={{ marginTop: 14 * scale }}>
            {accentLine}
          </Display>
        )}
        <MarkLockup lane={lane} size={42 * scale} style={{ marginTop: 26 * scale }} />
      </div>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div
          style={{
            width: 320 * scale, height: 320 * scale, borderRadius: 32,
            background: panelTone, display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 30px 60px -20px rgba(0,0,0,0.6)',
          }}
        >
          <Icon color="white" size={220 * scale} />
        </div>
        {cornerNote && (
          <div
            style={{
              position: 'absolute', top: 0, right: 0, background: COLORS.ink0, color: COLORS.ink950,
              padding: `${8 * scale}px ${16 * scale}px`, borderRadius: 6,
              fontSize: 16 * scale, fontWeight: 700, fontFamily: 'JetBrains Mono', transform: 'rotate(4deg)',
            }}
          >
            {cornerNote}
          </div>
        )}
      </div>
    </Slab>
  );
}

/** Centred mark on a background — profile avatars, plus the photo frame. */
export function AvatarMark({
  w = 400,
  h = 400,
  background = COLORS.signal500,
  iconColor = 'white',
  iconSize = 260,
  overlay,
  border = false,
  photoFrame = false,
  note,
}) {
  return (
    <div
      style={{
        width: w, height: h, position: 'relative', background, overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: border ? `1px solid ${COLORS.ink100}` : 'none', boxSizing: 'border-box',
      }}
    >
      {overlay}
      {photoFrame ? (
        <div
          style={{
            position: 'relative', width: w - 32, height: h - 32, borderRadius: '50%',
            border: `4px solid ${COLORS.signal500}`, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 10, textAlign: 'center',
            background: COLORS.ink25,
          }}
        >
          <Ico name="users" size={64} stroke={1.4} style={{ color: COLORS.ink300 }} />
          <div style={{ fontSize: 17, fontWeight: 600, color: COLORS.ink500 }}>Drop headshot here</div>
          {note && (
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: COLORS.ink400, lineHeight: 1.5, maxWidth: 240 }}>
              {note}
            </div>
          )}
        </div>
      ) : (
        <Icon color={iconColor} size={iconSize} style={{ position: 'relative', zIndex: 2 }} />
      )}
    </div>
  );
}
