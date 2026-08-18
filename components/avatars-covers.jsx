import React from 'react';
import { COLORS, DotGrid, Frame, Icon } from '@/components/brand';

// ===== PROFILE AVATARS =====
// One mark, multiple background treatments. All avatars are exported at 400×400.
// Different platforms crop circle vs square — we ship circle-safe centered marks.

function AvatarBase({ bg, iconColor = 'white', overlay = null, mark = 'mark' }) {
  // mark: 'mark' (just the icon) | 'mark-wordmark-stacked' (small)
  return (
    <div style={{
      width: 400, height: 400, position: 'relative',
      background: bg, overflow: 'hidden',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {overlay}
      <Icon color={iconColor} size={260} style={{ position: 'relative', zIndex: 2 }} />
    </div>
  );
}

const AVATARS = [
  {
    id: 'avatar-indigo',
    title: 'Indigo · default',
    label: 'X · LinkedIn · Facebook',
    bg: COLORS.signal500,
    iconColor: 'white',
  },
  {
    id: 'avatar-ink',
    title: 'Ink · stealth',
    label: 'YouTube · Twitch · TikTok',
    bg: COLORS.ink950,
    iconColor: 'white',
    overlay: <DotGrid color={COLORS.signal400} opacity={0.18} spacing={28} dotSize={1} />,
  },
  {
    id: 'avatar-white',
    title: 'White · light surface',
    label: 'Use when bg is dark on the platform',
    bg: COLORS.ink0,
    iconColor: 'indigo',
    border: true,
  },
  {
    id: 'avatar-radial',
    title: 'Radial · marketing',
    label: 'Campaigns, IG, launch week',
    bg: COLORS.signal900,
    iconColor: 'white',
    overlay: (
      <>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 25%, rgba(136,146,216,0.6), transparent 65%), radial-gradient(ellipse at 80% 80%, rgba(57,71,168,0.5), transparent 55%)' }} />
        <DotGrid color="#fff" opacity={0.04} spacing={24} />
      </>
    ),
  },
];

function AvatarCard({ a }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
      <div style={{ width: 200, height: 200, borderRadius: '50%', overflow: 'hidden', position: 'relative', border: a.border ? `1px solid ${COLORS.ink100}` : 'none', boxShadow: '0 1px 2px rgba(10,12,16,0.06)' }}>
        <div style={{ transform: 'scale(0.5)', transformOrigin: 'top left', width: 400, height: 400 }}>
          <AvatarBase bg={a.bg} iconColor={a.iconColor} overlay={a.overlay} />
        </div>
      </div>
      <div style={{ width: 200, height: 200, borderRadius: 16, overflow: 'hidden', position: 'relative', border: a.border ? `1px solid ${COLORS.ink100}` : 'none', boxShadow: '0 1px 2px rgba(10,12,16,0.06)' }}>
        <div style={{ transform: 'scale(0.5)', transformOrigin: 'top left', width: 400, height: 400 }}>
          <AvatarBase bg={a.bg} iconColor={a.iconColor} overlay={a.overlay} />
        </div>
      </div>
    </div>
  );
}

// Avatar gallery — shows all 4 in circle + square crop next to each other
export function AvatarGallery() {
  return (
    <Frame lane="lane-mono" width={1200} height={680}>
      <div style={{ padding: 56, display: 'flex', flexDirection: 'column', gap: 24, height: '100%' }}>
        <div>
          <div className="eyebrow" style={{ fontSize: 12 }}>05 — Profile avatars</div>
          <h2 className="display" style={{ fontSize: 36, marginTop: 12 }}>Four avatars. Same mark. Different rooms.</h2>
          <p style={{ color: COLORS.ink500, fontSize: 15, marginTop: 8, maxWidth: 760 }}>
            Profile avatars across socials use the same icon — only the background shifts. Circle-safe centering means the mark survives Instagram, TikTok, and YouTube crops cleanly.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 28, flex: 1, alignItems: 'start' }}>
          {AVATARS.map((a) => (
            <div key={a.id} style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
              <AvatarCard a={a} />
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: COLORS.ink900 }}>{a.title}</div>
                <div style={{ fontSize: 12, color: COLORS.ink400, marginTop: 4 }}>{a.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

// Individual full-size 400×400 avatar artboards (for export at native size)
export function AvatarArtboard({ variant = 'indigo' }) {
  const a = AVATARS.find((x) => x.id === `avatar-${variant}`) || AVATARS[0];
  return (
    <div style={{ width: 400, height: 400, position: 'relative', background: a.bg, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {a.overlay}
      <Icon color={a.iconColor} size={260} style={{ position: 'relative', zIndex: 2 }} />
    </div>
  );
}

// ===== COVER BANNERS =====

// X / Twitter Header — 1500×500
export function XHeader({
  badge = 'Inference runs in a Trusted Execution Environment',
  line1 = 'Build chatbots that',
  line2 = 'never see your data.',
  body = 'Visual chatflows, RAG knowledge bases, and one-click deploys to Discord, Slack, Telegram, WhatsApp, web.',
} = {}) {
  return (
    <Frame lane="lane-dark" width={1500} height={500} style={{ background: COLORS.ink950 }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 25% 50%, rgba(88,102,194,0.32), transparent 55%), radial-gradient(ellipse at 80% 90%, rgba(62,138,94,0.18), transparent 60%)' }} />
      <DotGrid color="#fff" opacity={0.04} spacing={28} />
      <div style={{ position: 'relative', height: '100%', padding: '60px 90px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 2 }}>
        <div style={{ maxWidth: 820 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderRadius: 999, background: 'rgba(62,138,94,0.18)', border: '1px solid rgba(62,138,94,0.4)', color: COLORS.attest300, fontSize: 12, fontWeight: 600, letterSpacing: '0.04em', marginBottom: 20 }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: COLORS.attest300 }} /> {badge}
          </div>
          <div className="display" style={{ fontSize: 64, color: '#fff', lineHeight: 1, letterSpacing: '-0.025em', fontWeight: 700 }}>
            {line1}<br/><span style={{ color: COLORS.signal300 }}>{line2}</span>
          </div>
          <div style={{ fontSize: 18, color: COLORS.ink200, marginTop: 18, maxWidth: 560 }}>
            {body}
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <Icon color="white" size={260} style={{ opacity: 0.95 }} />
        </div>
      </div>
    </Frame>
  );
}

// LinkedIn personal cover — 1584×396
export function LinkedInCover({
  eyebrow = 'Privacy-first AI automation',
  line1 = 'Build, deploy,',
  line2 = 'and trust your AI.',
  body = 'No-code chatflows. Encrypted inference. Cross-platform deployment in a single workspace.',
  wordmark = 'PRIVEXBOT',
} = {}) {
  return (
    <Frame lane="lane-light" width={1584} height={396} style={{ background: COLORS.ink0 }}>
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '55%', background: COLORS.signal500 }} />
      <div style={{ position: 'absolute', inset: 0 }}>
        <DotGrid color={COLORS.signal500} opacity={0.06} spacing={28} />
      </div>
      <div style={{ position: 'relative', height: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', zIndex: 2 }}>
        <div style={{ padding: '0 64px' }}>
          <div className="eyebrow" style={{ fontSize: 12, color: COLORS.signal700 }}>{eyebrow}</div>
          <div className="display" style={{ fontSize: 52, color: COLORS.ink900, marginTop: 14, lineHeight: 1.02 }}>
            {line1}<br/>{line2}
          </div>
          <div style={{ fontSize: 16, color: COLORS.ink500, marginTop: 14, maxWidth: 460 }}>
            {body}
          </div>
        </div>
        <div style={{ height: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.12), transparent 70%)' }} />
          <Icon color="white" size={240} />
          <div style={{ position: 'absolute', bottom: 28, right: 64, color: '#fff', fontFamily: 'Inter Tight', fontWeight: 800, fontSize: 22, letterSpacing: '0.08em' }}>{wordmark}</div>
        </div>
      </div>
    </Frame>
  );
}

// YouTube banner — 2560×1440.
// Safe area is 1235×338, per YouTube Help 10456525 (verified 2026-08-18).
// The old 1546×423 figure is the pre-2020 "Channel Art" spec — do not restore it.
export function YouTubeBanner() {
  return (
    <Frame lane="lane-dark" width={2560} height={1440} style={{ background: COLORS.ink950 }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, rgba(88,102,194,0.35), transparent 50%), radial-gradient(ellipse at 50% 90%, rgba(62,138,94,0.12), transparent 50%)' }} />
      <DotGrid color="#fff" opacity={0.04} spacing={40} />
      {/* Safe area — visible across all devices, centered */}
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: 1235, height: 338, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 20, zIndex: 2 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14 }}>
          <Icon color="white" size={120} />
          <span style={{ fontFamily: 'Inter Tight', fontWeight: 800, fontSize: 74, letterSpacing: '0.06em', color: '#fff' }}>PRIVEXBOT</span>
        </div>
        <div className="display" style={{ fontSize: 56, color: '#fff', textAlign: 'center', lineHeight: 1, letterSpacing: '-0.025em' }}>
          The privacy-first AI channel.
        </div>
        <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
          {['Tutorials', 'Live builds', 'Privacy deep dives', 'Changelog'].map((t) => (
            <div key={t} style={{ padding: '8px 18px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.22)', color: COLORS.ink200, fontSize: 18, fontFamily: 'JetBrains Mono', fontWeight: 500 }}>{t}</div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

// Facebook cover — 1640×856 (modern desktop spec)
export function FacebookCover() {
  return (
    <Frame lane="lane-light" width={1640} height={856} style={{ background: COLORS.ink25 }}>
      <DotGrid color={COLORS.signal500} opacity={0.05} spacing={36} />
      <div style={{ position: 'relative', height: '100%', padding: 80, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <Icon color="indigo" size={64} />
          <span style={{ fontFamily: 'Inter Tight', fontWeight: 800, fontSize: 38, letterSpacing: '0.04em', color: COLORS.signal500 }}>PRIVEXBOT</span>
        </div>
        <div>
          <div className="eyebrow" style={{ fontSize: 18, color: COLORS.signal700 }}>What we make</div>
          <div className="display" style={{ fontSize: 92, color: COLORS.ink900, marginTop: 18, lineHeight: 0.98, letterSpacing: '-0.03em', maxWidth: 1200 }}>
            AI that <span style={{ color: COLORS.signal500 }}>respects</span><br/>your customers' data.
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 22, color: COLORS.ink500, maxWidth: 760, lineHeight: 1.45 }}>
            Build chatbots in fifteen minutes. Deploy to web, Discord, Slack, Telegram, WhatsApp — all from one workspace.
          </div>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 16, color: COLORS.ink500 }}>privexbot.com</div>
        </div>
      </div>
    </Frame>
  );
}

// Twitch banner — 1200×480
export function TwitchBanner({
  badge = 'Live · Building in public',
  title = 'Tuesdays at 14:00 UTC.',
  body = 'Live coding sessions, RAG deep dives, and chaotic deploys. Pop in.',
} = {}) {
  return (
    <Frame lane="lane-dark" width={1200} height={480} style={{ background: COLORS.ink950 }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(57,71,168,0.45) 0%, transparent 60%), radial-gradient(circle at 90% 100%, rgba(62,138,94,0.25), transparent 50%)' }} />
      <DotGrid color="#fff" opacity={0.05} spacing={26} />
      <div style={{ position: 'relative', height: '100%', padding: '56px 72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 2 }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderRadius: 6, background: 'rgba(229,72,77,0.16)', border: '1px solid rgba(229,72,77,0.4)', color: COLORS.danger300, fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', marginBottom: 18, textTransform: 'uppercase', fontFamily: 'JetBrains Mono' }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: COLORS.danger300 }} /> {badge}
          </div>
          <div className="display" style={{ fontSize: 58, color: '#fff', lineHeight: 1, letterSpacing: '-0.025em' }}>
            {title}
          </div>
          <div style={{ fontSize: 18, color: COLORS.ink200, marginTop: 12, maxWidth: 540 }}>
            {body}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <Icon color="white" size={200} />
        </div>
      </div>
    </Frame>
  );
}
