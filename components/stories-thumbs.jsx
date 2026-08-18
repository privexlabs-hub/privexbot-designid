import React from 'react';
import { COLORS, DotGrid, Frame, Ico, Icon } from '@/components/brand';

// ===== VERTICAL FORMATS — 1080×1920 =====
// Instagram Stories / Reels covers, TikTok video covers, YouTube Shorts.

// 1. Story — Privacy/TEE headline (Dark, hero)
export function StoryPrivacy({
  badge = 'TEE-attested',
  line1 = 'Your prompts',
  line2 = 'never leave',
  line3 = 'the enclave.',
  body = 'Tap to read how PrivexBot encrypts every inference.',
  cta = 'Learn more',
} = {}) {
  return (
    <Frame lane="lane-dark" width={1080} height={1920}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 25%, rgba(88,102,194,0.45), transparent 50%), radial-gradient(ellipse at 50% 90%, rgba(62,138,94,0.18), transparent 50%)' }} />
      <DotGrid color="#fff" opacity={0.05} spacing={32} />
      <div style={{ position: 'relative', height: '100%', padding: '160px 80px 140px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 2 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30 }}>
          <Icon color="white" size={180} />
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '12px 24px', borderRadius: 999, background: 'rgba(62,138,94,0.18)', border: '1px solid rgba(62,138,94,0.4)', color: COLORS.attest300, fontSize: 20, fontWeight: 600, fontFamily: 'JetBrains Mono' }}>
            <span style={{ width: 10, height: 10, borderRadius: 999, background: COLORS.attest300 }} /> {badge}
          </div>
        </div>

        <div className="display" style={{ fontSize: 130, color: '#fff', textAlign: 'center', lineHeight: 0.94, letterSpacing: '-0.03em', fontWeight: 700 }}>
          {line1}<br/>{line2}<br/><span style={{ color: COLORS.signal300 }}>{line3}</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
          <div style={{ fontSize: 26, color: COLORS.ink200, textAlign: 'center', maxWidth: 800, lineHeight: 1.45 }}>
            {body}
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, padding: '22px 36px', borderRadius: 16, background: '#fff', color: COLORS.ink950, fontSize: 26, fontWeight: 700 }}>
            {cta} <Ico name="arrow" size={26} stroke={2.4} />
          </div>
        </div>
      </div>
    </Frame>
  );
}

// 2. Story — Stat / metric  (Light)
export function StoryStat({
  eyebrow = 'April · build-in-public',
  number = '14',
  unit = 'min',
  line1 = 'Median time-to-deploy',
  line2 = 'for a new chatbot.',
  body = 'From blank workspace to live on Discord. Across 1,247 bots created last month.',
  source = 'privexbot.com/changelog',
} = {}) {
  return (
    <Frame lane="lane-light" width={1080} height={1920} style={{ background: COLORS.signal50 }}>
      <DotGrid color={COLORS.signal500} opacity={0.07} spacing={36} />
      <div style={{ position: 'relative', height: '100%', padding: '140px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <Icon color="indigo" size={56} />
          <span style={{ fontFamily: 'Inter Tight', fontWeight: 800, fontSize: 30, letterSpacing: '0.08em', color: COLORS.signal500 }}>PRIVEXBOT</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
          <div className="eyebrow" style={{ fontSize: 22, color: COLORS.signal700 }}>{eyebrow}</div>
          <div style={{ fontFamily: 'Inter Tight', fontSize: 380, fontWeight: 800, color: COLORS.signal500, lineHeight: 0.88, letterSpacing: '-0.05em' }}>
            {number}<span style={{ fontSize: 200 }}>{unit}</span>
          </div>
          <div style={{ fontSize: 44, color: COLORS.ink900, lineHeight: 1.15, fontWeight: 600, letterSpacing: '-0.015em' }}>
            {line1}<br/>{line2}
          </div>
          <div style={{ fontSize: 24, color: COLORS.ink500, lineHeight: 1.45 }}>
            {body}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 18, color: COLORS.ink400 }}>{source}</div>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: COLORS.signal500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Ico name="arrow" size={28} stroke={2.4} style={{ color: '#fff' }} />
          </div>
        </div>
      </div>
    </Frame>
  );
}

// 3. Story — Feature drop / launch  (Dark, narrow column)
export function StoryLaunch({
  badge = 'Now shipping',
  eyebrow = 'Launch week · Day 03',
  line1 = 'WhatsApp',
  line2 = 'deploys.',
  sub = 'Generally available.',
  body = 'Connect your WhatsApp Business number to any agent. Encryption stays end-to-end.',
  cta = 'Deploy your first bot',
} = {}) {
  return (
    <Frame lane="lane-dark" width={1080} height={1920}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(57,71,168,0.4) 0%, transparent 40%, rgba(62,138,94,0.12) 100%)' }} />
      <DotGrid color="#fff" opacity={0.05} spacing={28} />
      <div style={{ position: 'relative', height: '100%', padding: '140px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '10px 18px', borderRadius: 999, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)', color: '#fff', fontSize: 18, fontWeight: 600, fontFamily: 'JetBrains Mono' }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: COLORS.attest300, boxShadow: `0 0 16px ${COLORS.attest300}` }} /> {badge}
          </div>
          <Icon color="white" size={56} />
        </div>

        <div>
          <div className="eyebrow" style={{ fontSize: 24, color: COLORS.signal300, marginBottom: 30 }}>{eyebrow}</div>
          <div className="display" style={{ fontSize: 142, color: '#fff', lineHeight: 0.94, letterSpacing: '-0.03em', fontWeight: 700 }}>
            {line1}<br/>{line2}
          </div>
          <div className="display" style={{ fontSize: 72, color: COLORS.signal300, lineHeight: 1, letterSpacing: '-0.025em', fontWeight: 500, marginTop: 18 }}>
            {sub}
          </div>
        </div>

        <div>
          <div style={{ fontSize: 28, color: COLORS.ink200, lineHeight: 1.45, marginBottom: 40 }}>
            {body}
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, padding: '24px 40px', borderRadius: 16, background: '#fff', color: COLORS.ink950, fontSize: 28, fontWeight: 700 }}>
            {cta} <Ico name="arrow" size={28} stroke={2.4} />
          </div>
        </div>
      </div>
    </Frame>
  );
}

// 4. Story — Quote (Editorial)
export function StoryQuote({
  eyebrow = 'Customer story · North Loop Health',
  quote = 'PrivexBot was the only platform that let us say yes to AI search without saying yes to leaking customer queries.',
  author = 'Maya Okafor',
  role = 'CTO, North Loop Health',
} = {}) {
  return (
    <Frame lane="lane-editorial" width={1080} height={1920} style={{ background: COLORS.ink0 }}>
      <DotGrid color={COLORS.signal500} opacity={0.06} spacing={36} />
      <div style={{ position: 'relative', height: '100%', padding: '160px 80px 140px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div className="eyebrow" style={{ fontSize: 18, color: COLORS.ink500 }}>{eyebrow}</div>

        <div>
          <svg width="120" height="86" viewBox="0 0 140 100" fill="none" style={{ marginBottom: 30 }}>
            <path d="M30 80 Q20 80 20 60 Q20 40 40 30 L48 42 Q34 48 34 60 L46 60 L46 80 L30 80z" fill={COLORS.signal500}/>
            <path d="M90 80 Q80 80 80 60 Q80 40 100 30 L48 42 Q34 48 34 60 L46 60 L46 80 L30 80z M90 80 Q80 80 80 60 Q80 40 100 30 L108 42 Q94 48 94 60 L106 60 L106 80 L90 80z" fill={COLORS.signal500}/>
          </svg>
          <div className="display" style={{ fontSize: 64, color: COLORS.ink900, lineHeight: 1.1, fontWeight: 600, letterSpacing: '-0.02em' }}>
            {quote}
          </div>
        </div>

        <div>
          <div style={{ height: 1, background: COLORS.ink100, marginBottom: 24 }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.ink900 }}>{author}</div>
              <div style={{ fontSize: 22, color: COLORS.ink500, marginTop: 4 }}>{role}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <Icon color="indigo" size={56} />
            </div>
          </div>
        </div>
      </div>
    </Frame>
  );
}

// 5. Story — Tutorial (Mono, side-stripe)
export function StoryTutorial() {
  return (
    <Frame lane="lane-mono" width={1080} height={1920}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 12, background: COLORS.signal500 }} />
      <div style={{ position: 'relative', height: '100%', padding: '160px 80px 140px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 30 }}>
            <div style={{ width: 80, height: 80, borderRadius: 18, background: COLORS.ink950, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'JetBrains Mono', fontSize: 32, fontWeight: 700 }}>01</div>
            <div className="eyebrow" style={{ fontSize: 20 }}>Tutorial · 2 min read</div>
          </div>
          <div className="display" style={{ fontSize: 100, color: COLORS.ink900, lineHeight: 0.98, letterSpacing: '-0.025em' }}>
            How to add a knowledge base.
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 42 }}>
          {[
            { n: '1', t: 'Drop in your docs', d: 'PDFs, web pages, or markdown.' },
            { n: '2', t: 'Pick a model', d: 'OpenAI, Anthropic, or self-hosted.' },
            { n: '3', t: 'Deploy anywhere', d: 'Web, Discord, Slack, Telegram.' },
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 26 }}>
              <div style={{ width: 76, height: 76, borderRadius: '50%', background: COLORS.signal500, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 32, flexShrink: 0 }}>{s.n}</div>
              <div style={{ flex: 1, paddingTop: 8 }}>
                <div style={{ fontSize: 36, fontWeight: 600, color: COLORS.ink900 }}>{s.t}</div>
                <div style={{ fontSize: 24, color: COLORS.ink500, marginTop: 8 }}>{s.d}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 22, color: COLORS.ink400 }}>swipe up · 2 of 5</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Icon color="black" size={52} />
            <span style={{ fontFamily: 'Inter Tight', fontWeight: 800, fontSize: 26, letterSpacing: '0.08em', color: COLORS.ink900 }}>PRIVEXBOT</span>
          </div>
        </div>
      </div>
    </Frame>
  );
}

// ===== YOUTUBE THUMBNAILS — 1280×720 =====
// Bold, legible at small sizes. Big type, high contrast, brand corner.

export function ThumbnailTutorial({
  topic = 'Build a Discord support bot',
  duration = '14 min',
  difficulty = 'Beginner',
} = {}) {
  return (
    <Frame lane="lane-dark" width={1280} height={720}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 75% 25%, rgba(88,102,194,0.5), transparent 50%), radial-gradient(ellipse at 20% 90%, rgba(62,138,94,0.2), transparent 50%)' }} />
      <DotGrid color="#fff" opacity={0.05} spacing={24} />
      <div style={{ position: 'relative', height: '100%', padding: 56, display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 48, alignItems: 'center', zIndex: 2 }}>
        <div>
          <div style={{ display: 'flex', gap: 12, marginBottom: 22 }}>
            <div style={{ padding: '8px 16px', borderRadius: 8, background: '#fff', color: COLORS.ink950, fontSize: 18, fontWeight: 700, fontFamily: 'JetBrains Mono' }}>{difficulty}</div>
            <div style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid rgba(255,255,255,0.4)', color: '#fff', fontSize: 18, fontWeight: 600, fontFamily: 'JetBrains Mono' }}>{duration}</div>
          </div>
          <div className="display" style={{ fontSize: 84, color: '#fff', lineHeight: 0.96, letterSpacing: '-0.025em', fontWeight: 800 }}>
            {topic}
          </div>
          <div style={{ marginTop: 26, display: 'inline-flex', alignItems: 'center', gap: 12 }}>
            <Icon color="white" size={42} />
            <span style={{ fontFamily: 'Inter Tight', fontWeight: 800, fontSize: 24, letterSpacing: '0.08em', color: '#fff' }}>PRIVEXBOT</span>
          </div>
        </div>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(88,102,194,0.45), transparent 65%)' }} />
          <div style={{ width: 320, height: 320, borderRadius: 32, background: COLORS.signal500, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', boxShadow: '0 30px 60px -20px rgba(0,0,0,0.6)' }}>
            <Icon color="white" size={220} />
          </div>
        </div>
      </div>
    </Frame>
  );
}

export function ThumbnailHotTake({
  hook = 'AI vendors are LYING',
  payoff = 'about your data.',
  episode = 'EP 04',
} = {}) {
  return (
    <Frame lane="lane-mono" width={1280} height={720} style={{ background: COLORS.ink25 }}>
      <DotGrid color={COLORS.signal500} opacity={0.07} spacing={28} />
      <div style={{ position: 'relative', height: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', zIndex: 2 }}>
        <div style={{ padding: '56px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="eyebrow" style={{ fontSize: 18, color: COLORS.signal700 }}>{episode} · The Privex Podcast</div>
            <div className="display" style={{ fontSize: 88, color: COLORS.ink900, marginTop: 20, lineHeight: 0.92, letterSpacing: '-0.03em' }}>
              {hook}
            </div>
            <div className="display" style={{ fontSize: 50, color: COLORS.signal500, marginTop: 14, lineHeight: 1, letterSpacing: '-0.02em', fontWeight: 600 }}>
              {payoff}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Icon color="indigo" size={48} />
            <span style={{ fontFamily: 'Inter Tight', fontWeight: 800, fontSize: 26, letterSpacing: '0.08em', color: COLORS.signal500 }}>PRIVEXBOT</span>
          </div>
        </div>
        <div style={{ background: COLORS.signal500, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <DotGrid color="#fff" opacity={0.12} spacing={24} />
          <Icon color="white" size={300} />
          <div style={{ position: 'absolute', top: 32, right: 32, background: '#fff', color: COLORS.ink950, padding: '8px 16px', borderRadius: 6, fontSize: 16, fontWeight: 700, fontFamily: 'JetBrains Mono', transform: 'rotate(4deg)' }}>
            REAL TALK
          </div>
        </div>
      </div>
    </Frame>
  );
}

export function ThumbnailLaunch({
  feature = 'WhatsApp\ndeploys',
  status = 'NOW LIVE',
} = {}) {
  return (
    <Frame lane="lane-dark" width={1280} height={720}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(57,71,168,0.6) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(62,138,94,0.3), transparent 50%)' }} />
      <DotGrid color="#fff" opacity={0.05} spacing={24} />
      <div style={{ position: 'relative', height: '100%', padding: 56, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '10px 22px', borderRadius: 999, background: COLORS.attest300, color: COLORS.ink950, fontSize: 22, fontWeight: 800, fontFamily: 'JetBrains Mono', letterSpacing: '0.06em' }}>
            <span style={{ width: 10, height: 10, borderRadius: 999, background: COLORS.ink950 }} /> {status}
          </div>
          <Icon color="white" size={60} />
        </div>
        <div className="display" style={{ fontSize: 180, color: '#fff', lineHeight: 0.88, letterSpacing: '-0.04em', whiteSpace: 'pre-line', fontWeight: 800 }}>
          {feature}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 22, color: COLORS.ink200, fontFamily: 'JetBrains Mono' }}>Launch week · Day 03</div>
          <span style={{ fontFamily: 'Inter Tight', fontWeight: 800, fontSize: 28, letterSpacing: '0.08em', color: '#fff' }}>PRIVEXBOT</span>
        </div>
      </div>
    </Frame>
  );
}
