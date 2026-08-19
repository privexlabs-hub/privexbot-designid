import React from 'react';
import { COLORS, DotGrid, Frame, Ico, Icon } from '@/components/brand';
import { Stack, Stat, Quote, glow } from '@/components/layouts';

// ===== SQUARE FEED POSTS (1080×1080) =====
// Templates designed for Instagram / X / LinkedIn / Facebook feed.
// Each template is given in 1-2 visual lanes that fit it best.

// Shared header / footer atoms
function PostHeader({ eyebrow, lane = 'mono', icon }) {
  const colors = {
    mono: { fg: COLORS.ink500, accent: COLORS.signal500 },
    dark: { fg: COLORS.ink300, accent: COLORS.signal300 },
    light: { fg: COLORS.signal700, accent: COLORS.signal600 },
    editorial: { fg: COLORS.ink500, accent: COLORS.signal500 },
  }[lane];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      {icon && <Icon color={lane === 'dark' ? 'white' : lane === 'light' ? 'indigo' : 'black'} size={40} />}
      <div style={{ fontSize: 18, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700, color: colors.fg }}>{eyebrow}</div>
    </div>
  );
}

function PostFooter({ lane = 'mono', handle = '@privexbot', tags = ['privacy', 'AI'] }) {
  const dark = lane === 'dark';
  const fg = dark ? COLORS.ink300 : COLORS.ink500;
  const accent = dark ? '#fff' : lane === 'light' ? COLORS.signal500 : COLORS.ink900;
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 20, fontFamily: 'JetBrains Mono' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Icon color={dark ? 'white' : lane === 'light' ? 'indigo' : 'black'} size={32} />
        <span style={{ fontFamily: 'Inter Tight', fontWeight: 800, fontSize: 22, letterSpacing: '0.08em', color: accent }}>PRIVEXBOT</span>
      </div>
      <div style={{ fontSize: 16, color: fg, letterSpacing: '0.02em' }}>
        {tags.map((t) => `#${t}`).join('  ')}
      </div>
    </div>
  );
}

// ===== 1. Privacy / TEE explainer — DARK lane =====
export function PrivacyPost({
  eyebrow = 'How PrivexBot is different',
  title = 'Your prompts never\nleave the enclave.',
  body = 'Inference runs inside a Trusted Execution Environment. PrivexBot, the model host, and your hosting provider cannot read your prompts or your user\'s messages. Cryptographically verified.',
  stat = 'TEE-attested',
} = {}) {
  return (
    <Stack
      lane="lane-dark"
      w={1080}
      h={1080}
      pad={64}
      backdrop={glow([
        { at: '30% 20%', tone: 'indigoLight', alpha: 0.25 },
        { at: '80% 90%', tone: 'sage', alpha: 0.18 },
      ])}
      dots={{ color: '#fff', opacity: 0.05, spacing: 28 }}
      badge={stat}
      eyebrow={eyebrow}
      title={title}
      titleSize={92}
      gap={32}
      body={body}
      bodySize={24}
      bodyLineHeight={1.4}
      bodyMaxWidth={820}
      tags={['privacy', 'TEE', 'AI']}
    />
  );
}

// ===== 2. Feature announcement — MONO lane =====
export function FeaturePost({
  eyebrow = 'Now shipping',
  title = 'Visual chatflow\nbuilder, v2.',
  body = 'Drag nodes. Branch on intent. Inspect runs. The new builder ships with 14 nodes including OpenAI, Anthropic, vector search, HTTP, and webhook.',
  bullets = ['14 production-ready nodes', 'Inline run inspector', 'JSON import / export', 'Multi-user co-editing'],
  cta = 'Read the changelog',
} = {}) {
  return (
    <Frame lane="lane-mono" width={1080} height={1080}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 8, background: COLORS.signal500 }} />
      <div style={{ position: 'relative', height: '100%', padding: 72, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div className="eyebrow" style={{ fontSize: 16, color: COLORS.signal500 }}>{eyebrow}</div>
          <div className="display" style={{ fontSize: 84, color: COLORS.ink900, marginTop: 22, lineHeight: 0.98, whiteSpace: 'pre-line' }}>
            {title}
          </div>
          <div style={{ fontSize: 22, color: COLORS.ink500, marginTop: 22, maxWidth: 840, lineHeight: 1.45 }}>
            {body}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {bullets.map((b, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <Ico name="check" size={22} stroke={2} style={{ color: COLORS.attest500 }} />
              <span style={{ fontSize: 20, color: COLORS.ink900, fontWeight: 500 }}>{b}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 22px', borderRadius: 12, background: COLORS.ink950, color: '#fff', fontSize: 20, fontWeight: 600 }}>
            {cta} <Ico name="arrow" size={20} stroke={2} />
          </div>
          <PostFooter lane="mono" tags={['changelog', 'chatflows']} />
        </div>
      </div>
    </Frame>
  );
}

// ===== 3. Pull quote — EDITORIAL lane =====
export function QuotePost({
  quote = 'Our customers asked us to add AI search. They did not ask us to share their queries with five vendors. PrivexBot was the only platform that let us say yes to one without saying yes to the other.',
  author = 'Maya Okafor',
  role = 'CTO, North Loop Health',
} = {}) {
  return (
    <Quote
      lane="lane-editorial"
      w={1080}
      h={1080}
      frameStyle={{ background: COLORS.ink0 }}
      dots={{ color: COLORS.signal500, opacity: 0.05, spacing: 32 }}
      eyebrow="Customer story"
      quote={`"${quote}"`}
      author={author}
      role={role}
    />
  );
}

// ===== 4. Big stat card — LIGHT lane =====
export function StatPost({
  number = '14 min',
  caption = 'Median time-to-deploy for a new chatbot — from blank workspace to live on Discord.',
  context = 'Across 1,247 bots created in April.',
  source = 'PrivexBot platform metrics, April 2026',
} = {}) {
  return (
    <Stat
      lane="lane-light"
      w={1080}
      h={1080}
      frameStyle={{ background: COLORS.signal50 }}
      dots={{ color: COLORS.signal500, opacity: 0.07, spacing: 28 }}
      eyebrow="Build-in-public · April metrics"
      number={number}
      caption={caption}
      context={context}
      source={source}
    />
  );
}

// ===== 5. Tutorial / tip — MONO lane =====
export function TipPost({
  step = '01',
  title = 'How to add a knowledge base in three steps',
  steps = [
    { n: '1', t: 'Drop in your docs', d: 'PDFs, web pages, or markdown. We chunk and embed automatically.' },
    { n: '2', t: 'Pick a model', d: 'OpenAI, Anthropic, or a self-hosted Llama. Same flow either way.' },
    { n: '3', t: 'Deploy', d: 'One-click to web widget, Discord, Slack, or Telegram.' },
  ],
} = {}) {
  return (
    <Frame lane="lane-mono" width={1080} height={1080}>
      <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 8, background: COLORS.signal500 }} />
      <div style={{ position: 'relative', height: '100%', padding: '72px 72px 72px 88px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, background: COLORS.ink950, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'JetBrains Mono', fontSize: 22, fontWeight: 700 }}>{step}</div>
            <div className="eyebrow" style={{ fontSize: 16 }}>Tutorial · 2 min read</div>
          </div>
          <div className="display" style={{ fontSize: 64, color: COLORS.ink900, lineHeight: 1.02 }}>
            {title}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 22 }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: COLORS.signal500, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 22, flexShrink: 0 }}>{s.n}</div>
              <div style={{ flex: 1, paddingTop: 4 }}>
                <div style={{ fontSize: 26, fontWeight: 600, color: COLORS.ink900 }}>{s.t}</div>
                <div style={{ fontSize: 18, color: COLORS.ink500, marginTop: 6, lineHeight: 1.45 }}>{s.d}</div>
              </div>
            </div>
          ))}
        </div>

        <PostFooter lane="mono" tags={['tutorial', 'RAG']} />
      </div>
    </Frame>
  );
}

// ===== 6. Launch / milestone — DARK lane =====
export function LaunchPost({
  eyebrow = 'Launch week · Day 03',
  title = 'WhatsApp deploys.\nNow generally available.',
  body = 'Connect your WhatsApp Business number to any PrivexBot agent. End-to-end encrypted messages stay encrypted — we never see your customer conversations.',
  cta = 'Deploy your first bot',
} = {}) {
  return (
    <Frame lane="lane-dark" width={1080} height={1080}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 80% 20%, rgba(88,102,194,0.45), transparent 50%), radial-gradient(ellipse at 20% 90%, rgba(57,71,168,0.35), transparent 55%)' }} />
      <DotGrid color="#fff" opacity={0.05} spacing={26} />
      <div style={{ position: 'relative', height: '100%', padding: 72, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '10px 20px', borderRadius: 999, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)', color: '#fff', fontSize: 17, fontWeight: 600, fontFamily: 'JetBrains Mono' }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: COLORS.attest300, boxShadow: `0 0 16px ${COLORS.attest300}` }} /> {eyebrow}
          </div>
        </div>

        <div className="display" style={{ fontSize: 96, color: '#fff', lineHeight: 0.96, fontWeight: 700, letterSpacing: '-0.03em', whiteSpace: 'pre-line' }}>
          {title}
        </div>

        <div>
          <div style={{ fontSize: 22, color: COLORS.ink200, marginBottom: 32, maxWidth: 880, lineHeight: 1.45 }}>{body}</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '18px 28px', borderRadius: 12, background: '#fff', color: COLORS.ink950, fontSize: 22, fontWeight: 700 }}>
              {cta} <Ico name="arrow" size={22} stroke={2.4} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Icon color="white" size={40} />
              <span style={{ fontFamily: 'Inter Tight', fontWeight: 800, fontSize: 22, letterSpacing: '0.08em', color: '#fff' }}>PRIVEXBOT</span>
            </div>
          </div>
        </div>
      </div>
    </Frame>
  );
}

// ===== 7. Build-in-public — LIGHT lane =====
export function BuildPost({
  eyebrow = 'Build log · Week 14',
  title = 'Rewrote our embedding pipeline. 4× faster, half the cost.',
  body = 'Switched from on-the-fly chunking to a streamed embed-and-store pattern. Median ingestion for a 200-page doc went from 38s to 9s. Posting the postmortem tomorrow.',
  metrics = [
    { label: 'Median ingest', before: '38s', after: '9s' },
    { label: 'Cost / 1M tokens', before: '$0.13', after: '$0.06' },
    { label: 'Failure rate', before: '2.4%', after: '0.3%' },
  ],
} = {}) {
  return (
    <Frame lane="lane-light" width={1080} height={1080} style={{ background: COLORS.ink25 }}>
      <div style={{ position: 'relative', height: '100%', padding: 72, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div className="eyebrow" style={{ fontSize: 15 }}>{eyebrow}</div>
          <div className="display" style={{ fontSize: 56, color: COLORS.ink900, marginTop: 18, lineHeight: 1.05 }}>{title}</div>
          <div style={{ fontSize: 20, color: COLORS.ink500, marginTop: 16, lineHeight: 1.5, maxWidth: 880 }}>{body}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {metrics.map((m, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: 22, alignItems: 'center', background: COLORS.ink0, border: `1px solid ${COLORS.ink100}`, borderRadius: 12, padding: '22px 28px' }}>
              <div style={{ fontSize: 19, fontWeight: 500, color: COLORS.ink900 }}>{m.label}</div>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: 24, color: COLORS.ink400, textDecoration: 'line-through' }}>{m.before}</div>
              <Ico name="arrow" size={22} stroke={2} style={{ color: COLORS.ink400 }} />
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: 28, color: COLORS.attest500, fontWeight: 700 }}>{m.after}</div>
            </div>
          ))}
        </div>

        <PostFooter lane="light" tags={['buildinpublic', 'engineering']} />
      </div>
    </Frame>
  );
}

// ===== 8. Hot take / industry pov — EDITORIAL =====
export function HotTakePost({
  eyebrow = 'Industry pov',
  hook = 'If your AI vendor can read your prompts,',
  payoff = 'they can sell them, leak them, or lose them.',
  body = 'There are three companies between your customer and an answer. The fewer of them that ever see the data, the safer your business. That\'s why every PrivexBot inference runs inside a hardware enclave.',
} = {}) {
  return (
    <Frame lane="lane-editorial" width={1080} height={1080} style={{ background: COLORS.ink0 }}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <DotGrid color={COLORS.signal500} opacity={0.06} spacing={36} />
      </div>
      <div style={{ position: 'relative', height: '100%', padding: 80, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div className="eyebrow" style={{ fontSize: 16 }}>{eyebrow}</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="display" style={{ fontSize: 64, color: COLORS.ink500, lineHeight: 1.04, fontWeight: 500 }}>
            {hook}
          </div>
          <div className="display" style={{ fontSize: 64, color: COLORS.ink900, lineHeight: 1.04, fontWeight: 700 }}>
            {payoff}
          </div>
        </div>

        <div>
          <div style={{ fontSize: 22, color: COLORS.ink500, lineHeight: 1.5, maxWidth: 880, marginBottom: 36 }}>{body}</div>
          <div style={{ height: 1, background: COLORS.ink100, marginBottom: 22 }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Icon color="indigo" size={36} />
              <span style={{ fontFamily: 'Inter Tight', fontWeight: 800, fontSize: 22, letterSpacing: '0.08em', color: COLORS.signal500 }}>PRIVEXBOT</span>
            </div>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 14, color: COLORS.ink400 }}>privexbot.com/blog</div>
          </div>
        </div>
      </div>
    </Frame>
  );
}

// ===== 9. Lighthearted / meme — MONO lane (still on-brand) =====
export function MemePost({
  setup = 'Your AI vendor:',
  punchline = '"We take privacy seriously."',
  reveal = 'Also your AI vendor:',
  closer = '*reads your prompts to train their next model*',
} = {}) {
  return (
    <Frame lane="lane-mono" width={1080} height={1080}>
      <div style={{ position: 'relative', height: '100%', padding: 80, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div className="eyebrow" style={{ fontSize: 14 }}>Friday energy</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
          <div>
            <div style={{ fontSize: 22, color: COLORS.ink500, marginBottom: 8, fontFamily: 'JetBrains Mono' }}>{setup}</div>
            <div className="display" style={{ fontSize: 52, color: COLORS.ink900, lineHeight: 1.05 }}>{punchline}</div>
          </div>
          <div style={{ height: 1, background: COLORS.ink100 }} />
          <div>
            <div style={{ fontSize: 22, color: COLORS.ink500, marginBottom: 8, fontFamily: 'JetBrains Mono' }}>{reveal}</div>
            <div className="display" style={{ fontSize: 44, color: COLORS.signal500, lineHeight: 1.1, fontWeight: 700, fontStyle: 'italic' }}>
              {closer}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 18, color: COLORS.ink400, fontFamily: 'JetBrains Mono' }}>(we don't.)</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Icon color="black" size={36} />
            <span style={{ fontFamily: 'Inter Tight', fontWeight: 800, fontSize: 22, letterSpacing: '0.08em', color: COLORS.ink900 }}>PRIVEXBOT</span>
          </div>
        </div>
      </div>
    </Frame>
  );
}

// ===== 10. Blog promo — DARK lane =====
export function BlogPromoPost({
  category = 'Engineering',
  readTime = '8 min',
  title = 'Why we built our chatflow engine on a CRDT.',
  excerpt = 'Real-time collaboration sounds great until two engineers drag the same node. Here\'s how we built collaborative editing for visual workflows — and the three mistakes we made first.',
  author = 'Sasha Chen · Staff Engineer',
} = {}) {
  return (
    <Frame lane="lane-dark" width={1080} height={1080}>
      <DotGrid color="#fff" opacity={0.04} spacing={32} />
      <div style={{ position: 'relative', height: '100%', padding: 72, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ padding: '6px 14px', borderRadius: 6, background: 'rgba(88,102,194,0.18)', border: '1px solid rgba(88,102,194,0.4)', color: COLORS.signal300, fontSize: 14, fontWeight: 600, fontFamily: 'JetBrains Mono', letterSpacing: '0.04em' }}>
            {category}
          </div>
          <div style={{ fontSize: 14, color: COLORS.ink300, fontFamily: 'JetBrains Mono' }}>· {readTime} read</div>
        </div>

        <div>
          <div className="display" style={{ fontSize: 76, color: '#fff', lineHeight: 1, marginBottom: 28, letterSpacing: '-0.025em' }}>
            {title}
          </div>
          <div style={{ fontSize: 22, color: COLORS.ink200, lineHeight: 1.5, maxWidth: 900 }}>
            {excerpt}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 17, color: COLORS.ink200, fontWeight: 500 }}>{author}</div>
            <div style={{ fontSize: 14, color: COLORS.ink300, marginTop: 4, fontFamily: 'JetBrains Mono' }}>privexbot.com/blog</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Icon color="white" size={40} />
            <Ico name="arrow" size={28} stroke={2} style={{ color: '#fff' }} />
          </div>
        </div>
      </div>
    </Frame>
  );
}
