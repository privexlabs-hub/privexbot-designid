import React from 'react';
import { COLORS, DotGrid, Frame, Ico, Icon } from '@/components/brand';

// ===== ENGAGEMENT-DRIVING POST TEMPLATES =====
// Content built around real story: why PrivexBot exists, who it serves, what we believe.

const PostFoot = ({ lane = 'mono', tags = [] }) => {
  const dark = lane === 'dark';
  const accent = dark ? '#fff' : lane === 'light' ? COLORS.signal500 : COLORS.ink900;
  const fg = dark ? COLORS.ink300 : COLORS.ink500;
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Icon color={dark ? 'white' : lane === 'light' ? 'indigo' : 'black'} size={32} />
        <span style={{ fontFamily: 'Inter Tight', fontWeight: 800, fontSize: 22, letterSpacing: '0.08em', color: accent }}>PRIVEXBOT</span>
      </div>
      <div style={{ fontFamily: 'JetBrains Mono', fontSize: 14, color: fg, letterSpacing: '0.02em' }}>
        {tags.map((t) => `#${t}`).join('  ')}
      </div>
    </div>
  );
};

// ===== 1. WHY WE BUILT IT — founder story =====
export function WhyBuiltPost({
  eyebrow = 'Why we built PrivexBot',
  story = 'In 2024 we watched a hospital deploy an AI assistant — and quietly send every patient question to three vendors who could read them.',
  reframe = 'The hospital wasn\'t reckless. They had no other choice.',
  resolution = 'We built PrivexBot to give them one. Now every inference happens inside a hardware enclave. We can\'t read your prompts. Neither can your model host. Neither can anyone else.',
  signoff = '— The PrivexBot team',
} = {}) {
  return (
    <Frame lane="lane-editorial" width={1080} height={1080} style={{ background: COLORS.ink0 }}>
      <DotGrid color={COLORS.signal500} opacity={0.05} spacing={36} />
      <div style={{ position: 'relative', height: '100%', padding: 80, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div className="eyebrow" style={{ fontSize: 16 }}>{eyebrow}</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div className="display" style={{ fontSize: 42, color: COLORS.ink900, lineHeight: 1.15, letterSpacing: '-0.015em', fontWeight: 500, fontFamily: 'Inter Tight' }}>
            {story}
          </div>
          <div className="display" style={{ fontSize: 42, color: COLORS.signal500, lineHeight: 1.15, letterSpacing: '-0.015em', fontWeight: 700, fontFamily: 'Inter Tight' }}>
            {reframe}
          </div>
          <div style={{ fontSize: 22, color: COLORS.ink500, lineHeight: 1.5, maxWidth: 880 }}>
            {resolution}
          </div>
        </div>

        <div>
          <div style={{ height: 1, background: COLORS.ink100, marginBottom: 18 }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: 18, color: COLORS.ink500, fontStyle: 'italic' }}>{signoff}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Icon color="indigo" size={36} />
              <span style={{ fontFamily: 'Inter Tight', fontWeight: 800, fontSize: 22, letterSpacing: '0.08em', color: COLORS.signal500 }}>PRIVEXBOT</span>
            </div>
          </div>
        </div>
      </div>
    </Frame>
  );
}

// ===== 2. WHY THIS MATTERS — manifesto =====
export function ManifestoPost({
  eyebrow = 'What we believe',
  line1 = 'Privacy is not',
  line2 = 'a feature.',
  line3 = 'It\'s the foundation.',
  body = 'Every AI tool on the market asks you to trust three things you can\'t verify: the vendor, the model host, and the network in between. PrivexBot replaces trust with proof. Every inference is cryptographically attested. You don\'t take our word for it — you check the receipts.',
} = {}) {
  return (
    <Frame lane="lane-dark" width={1080} height={1080}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 100%, rgba(57,71,168,0.4), transparent 60%), radial-gradient(ellipse at 20% 0%, rgba(62,138,94,0.18), transparent 50%)' }} />
      <DotGrid color="#fff" opacity={0.05} spacing={28} />
      <div style={{ position: 'relative', height: '100%', padding: 72, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 16, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, color: COLORS.signal300 }}>{eyebrow}</div>
          <Icon color="white" size={44} />
        </div>

        <div>
          <div className="display" style={{ fontSize: 104, color: '#fff', lineHeight: 0.94, letterSpacing: '-0.035em', fontWeight: 700 }}>
            {line1}
          </div>
          <div className="display" style={{ fontSize: 104, color: '#fff', lineHeight: 0.94, letterSpacing: '-0.035em', fontWeight: 700 }}>
            <span style={{ textDecoration: 'line-through', textDecorationColor: COLORS.signal400, textDecorationThickness: 8 }}>{line2}</span>
          </div>
          <div className="display" style={{ fontSize: 104, color: COLORS.signal300, lineHeight: 0.94, letterSpacing: '-0.035em', fontWeight: 700, marginTop: 6 }}>
            {line3}
          </div>
        </div>

        <div>
          <div style={{ fontSize: 22, color: COLORS.ink200, lineHeight: 1.5, maxWidth: 900, marginBottom: 32 }}>
            {body}
          </div>
          <PostFoot lane="dark" tags={['privacy', 'AI']} />
        </div>
      </div>
    </Frame>
  );
}

// ===== 3. PROBLEM / SOLUTION split =====
export function ProblemSolutionPost({
  eyebrow = 'The problem we solve',
  problem = 'Most "private" AI tools still upload your prompts to a third party.',
  problemDetail = 'You agreed to a privacy policy. The privacy policy says they "may use your data to improve our service."',
  solution = 'PrivexBot runs every inference inside a hardware enclave.',
  solutionDetail = 'Even our engineers can\'t see what you send. We have receipts to prove it.',
} = {}) {
  return (
    <Frame lane="lane-mono" width={1080} height={1080}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 8, background: COLORS.signal500 }} />
      <div style={{ position: 'relative', height: '100%', padding: 72, display: 'flex', flexDirection: 'column', gap: 28 }}>
        <div className="eyebrow" style={{ fontSize: 16 }}>{eyebrow}</div>

        <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 28, flex: 1 }}>
          {/* Problem */}
          <div style={{ background: COLORS.ink25, borderRadius: 16, padding: 36, border: `1px solid ${COLORS.ink100}`, position: 'relative' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '6px 14px', borderRadius: 999, background: COLORS.danger + '20', color: COLORS.danger700, fontSize: 13, fontWeight: 700, letterSpacing: '0.04em', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', marginBottom: 14 }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: COLORS.danger }} /> Today
            </div>
            <div className="display" style={{ fontSize: 40, color: COLORS.ink900, lineHeight: 1.1, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 14 }}>
              {problem}
            </div>
            <div style={{ fontSize: 18, color: COLORS.ink500, lineHeight: 1.5, fontStyle: 'italic' }}>
              {problemDetail}
            </div>
          </div>
          {/* Solution */}
          <div style={{ background: COLORS.signal500, borderRadius: 16, padding: 36, position: 'relative', color: '#fff' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '6px 14px', borderRadius: 999, background: 'rgba(255,255,255,0.18)', color: '#fff', fontSize: 13, fontWeight: 700, letterSpacing: '0.04em', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', marginBottom: 14 }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: COLORS.attest300 }} /> With PrivexBot
            </div>
            <div className="display" style={{ fontSize: 40, lineHeight: 1.1, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 14 }}>
              {solution}
            </div>
            <div style={{ fontSize: 18, color: COLORS.signal100, lineHeight: 1.5 }}>
              {solutionDetail}
            </div>
          </div>
        </div>

        <PostFoot lane="mono" tags={['privacy', 'AI']} />
      </div>
    </Frame>
  );
}

// ===== 4. FAQ / Did you know =====
export function FAQPost({
  eyebrow = 'Did you know?',
  question = 'When you send a message to your favourite AI chatbot, how many companies get to read it?',
  answer = '3',
  answerLabel = 'companies, on average',
  breakdown = [
    'The AI vendor (your prompts → their training data)',
    'The model host (your prompts → their server logs)',
    'The network provider (your prompts → their analytics)',
  ],
  footer = 'With PrivexBot: zero.',
} = {}) {
  return (
    <Frame lane="lane-light" width={1080} height={1080} style={{ background: COLORS.signal50 }}>
      <DotGrid color={COLORS.signal500} opacity={0.07} spacing={32} />
      <div style={{ position: 'relative', height: '100%', padding: 72, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div className="eyebrow" style={{ fontSize: 16, color: COLORS.signal700 }}>{eyebrow}</div>

        <div>
          <div style={{ fontSize: 28, color: COLORS.ink700, lineHeight: 1.35, fontWeight: 500, maxWidth: 880, marginBottom: 36 }}>
            {question}
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 24 }}>
            <div style={{ fontFamily: 'Inter Tight', fontSize: 240, fontWeight: 800, color: COLORS.signal500, lineHeight: 0.9, letterSpacing: '-0.05em' }}>
              {answer}
            </div>
            <div style={{ fontSize: 26, color: COLORS.ink500, fontWeight: 500 }}>{answerLabel}</div>
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
            {breakdown.map((b, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 19, color: COLORS.ink700 }}>
                <div style={{ width: 28, height: 28, borderRadius: 6, background: COLORS.signal100, color: COLORS.signal700, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, fontFamily: 'JetBrains Mono', flexShrink: 0 }}>{i + 1}</div>
                {b}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 22px', borderRadius: 12, background: COLORS.ink950, color: '#fff', fontSize: 20, fontWeight: 600 }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: COLORS.attest300 }} />
              {footer}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Icon color="indigo" size={36} />
              <span style={{ fontFamily: 'Inter Tight', fontWeight: 800, fontSize: 22, letterSpacing: '0.08em', color: COLORS.signal500 }}>PRIVEXBOT</span>
            </div>
          </div>
        </div>
      </div>
    </Frame>
  );
}

// ===== 5. COMPARISON =====
export function ComparisonPost({
  eyebrow = 'PrivexBot vs the alternatives',
  competitor = 'Typical AI platform',
  rows = [
    { label: 'Prompts visible to vendor', a: false, b: 'Yes', good: 'No' },
    { label: 'Cryptographic attestation', a: 'No', b: 'Hardware TEE' },
    { label: 'Deploy to multiple channels', a: 'API only', b: 'One-click' },
    { label: 'Visual chatflow builder', a: 'No', b: 'Yes' },
    { label: 'Self-hostable models', a: 'Limited', b: 'Yes' },
    { label: 'Time to first deploy', a: '3–7 days', b: '15 minutes' },
  ],
} = {}) {
  return (
    <Frame lane="lane-mono" width={1080} height={1080}>
      <div style={{ position: 'relative', height: '100%', padding: 72, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div className="eyebrow" style={{ fontSize: 16 }}>{eyebrow}</div>
          <div className="display" style={{ fontSize: 48, color: COLORS.ink900, marginTop: 14, lineHeight: 1.0 }}>
            How we stack up.
          </div>
        </div>

        {/* Comparison table */}
        <div style={{ borderRadius: 16, overflow: 'hidden', border: `1px solid ${COLORS.ink100}` }}>
          {/* Header row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', background: COLORS.ink25, borderBottom: `1px solid ${COLORS.ink100}` }}>
            <div style={{ padding: '20px 24px', fontSize: 14, color: COLORS.ink400, fontFamily: 'JetBrains Mono', letterSpacing: '0.04em', textTransform: 'uppercase', fontWeight: 600 }}> </div>
            <div style={{ padding: '20px 24px', fontSize: 16, color: COLORS.ink500, fontWeight: 600 }}>{competitor}</div>
            <div style={{ padding: '20px 24px', fontSize: 16, color: COLORS.signal500, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 10, background: COLORS.signal50 }}>
              <Icon color="indigo" size={22} /> PrivexBot
            </div>
          </div>
          {rows.map((r, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', borderBottom: i < rows.length - 1 ? `1px solid ${COLORS.ink75}` : 'none' }}>
              <div style={{ padding: '18px 24px', fontSize: 16, color: COLORS.ink700, fontWeight: 500 }}>{r.label}</div>
              <div style={{ padding: '18px 24px', fontSize: 15, color: COLORS.ink500 }}>
                {r.a === false ? <span style={{ color: COLORS.danger, fontWeight: 600 }}>—</span> : r.a}
              </div>
              <div style={{ padding: '18px 24px', fontSize: 15, color: COLORS.signal700, fontWeight: 600, background: COLORS.signal50 + '88' }}>
                {r.good || r.b}
              </div>
            </div>
          ))}
        </div>

        <PostFoot lane="mono" tags={['privacy', 'AI', 'comparison']} />
      </div>
    </Frame>
  );
}

// ===== 6. USE CASE / industry =====
export function UseCasePost({
  industry = 'Healthcare',
  headline = 'How a 200-bed hospital deployed AI patient triage without breaking HIPAA.',
  outcomes = [
    { v: '38%', l: 'faster intake' },
    { v: '0', l: 'data leaks' },
    { v: '11 days', l: 'from blank workspace to live' },
  ],
  quote = '"PrivexBot was the only platform where our compliance team didn\'t require a six-month audit."',
  quoteBy = '— Director of Clinical IT, North Loop Health',
} = {}) {
  return (
    <Frame lane="lane-dark" width={1080} height={1080}>
      <DotGrid color="#fff" opacity={0.04} spacing={32} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 80% 20%, rgba(88,102,194,0.3), transparent 55%)' }} />
      <div style={{ position: 'relative', height: '100%', padding: 72, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 16px', borderRadius: 999, background: 'rgba(88,102,194,0.18)', border: '1px solid rgba(88,102,194,0.4)', color: COLORS.signal300, fontSize: 14, fontWeight: 600, fontFamily: 'JetBrains Mono', letterSpacing: '0.04em' }}>
            Use case · {industry}
          </div>
          <Icon color="white" size={44} />
        </div>

        <div className="display" style={{ fontSize: 60, color: '#fff', lineHeight: 1.04, letterSpacing: '-0.025em', fontWeight: 700, maxWidth: 880 }}>
          {headline}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {outcomes.map((o, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: '24px 20px' }}>
              <div style={{ fontFamily: 'Inter Tight', fontSize: 56, fontWeight: 700, color: COLORS.signal300, letterSpacing: '-0.025em', lineHeight: 1 }}>{o.v}</div>
              <div style={{ fontSize: 14, color: COLORS.ink300, marginTop: 8, lineHeight: 1.3 }}>{o.l}</div>
            </div>
          ))}
        </div>

        <div>
          <div style={{ fontSize: 22, color: COLORS.ink100, lineHeight: 1.45, fontStyle: 'italic', marginBottom: 8 }}>{quote}</div>
          <div style={{ fontSize: 16, color: COLORS.ink300 }}>{quoteBy}</div>
          <div style={{ height: 1, background: 'rgba(255,255,255,0.12)', margin: '24px 0 18px' }} />
          <PostFoot lane="dark" tags={['healthcare', 'AI', 'privacy']} />
        </div>
      </div>
    </Frame>
  );
}

// ===== 7. CTA — call to action / sign up =====
export function CTAPost({
  hook = 'Stop trusting AI vendors with your customer data.',
  body = 'Build your first private chatbot in 15 minutes. No credit card. No data leaving the enclave.',
  cta = 'Start free at privexbot.com',
  proof = 'Trusted by teams in healthcare, fintech, and legal.',
} = {}) {
  return (
    <Frame lane="lane-light" width={1080} height={1080} style={{ background: COLORS.ink0 }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 8, background: COLORS.signal500 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 80% 90%, rgba(57,71,168,0.08), transparent 60%)' }} />
      <div style={{ position: 'relative', height: '100%', padding: 72, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="eyebrow" style={{ fontSize: 16 }}>Start today</div>
          <Icon color="indigo" size={50} />
        </div>

        <div>
          <div className="display" style={{ fontSize: 72, color: COLORS.ink900, lineHeight: 0.98, letterSpacing: '-0.025em' }}>
            {hook}
          </div>
          <div style={{ fontSize: 26, color: COLORS.ink500, marginTop: 28, lineHeight: 1.4, maxWidth: 880 }}>
            {body}
          </div>
        </div>

        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 16, padding: '24px 32px', borderRadius: 14, background: COLORS.signal500, color: '#fff', fontSize: 28, fontWeight: 700, marginBottom: 20 }}>
            {cta} <Ico name="arrow" size={28} stroke={2.4} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: 16, color: COLORS.ink500, fontFamily: 'JetBrains Mono' }}>{proof}</div>
            <span style={{ fontFamily: 'Inter Tight', fontWeight: 800, fontSize: 22, letterSpacing: '0.08em', color: COLORS.signal500 }}>PRIVEXBOT</span>
          </div>
        </div>
      </div>
    </Frame>
  );
}

// ===== 8. COMMUNITY / shoutout =====
export function CommunityPost({
  eyebrow = 'Community spotlight',
  shoutout = 'Built with PrivexBot:',
  examples = [
    { name: 'ClinicHub', tagline: 'Patient triage for community clinics', icon: 'C' },
    { name: 'Lexley', tagline: 'AI paralegal for solo lawyers', icon: 'L' },
    { name: 'Sift', tagline: 'Resume review without saving resumes', icon: 'S' },
    { name: 'Helmet', tagline: 'Security review bot for GitHub PRs', icon: 'H' },
    { name: 'Carto', tagline: 'Internal docs search for engineering teams', icon: 'C' },
    { name: 'Petra', tagline: 'Therapist intake automation', icon: 'P' },
  ],
  callout = 'Add your bot to the registry → privexbot.com/community',
} = {}) {
  return (
    <Frame lane="lane-mono" width={1080} height={1080}>
      <div style={{ position: 'relative', height: '100%', padding: 72, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div className="eyebrow" style={{ fontSize: 16 }}>{eyebrow}</div>
          <div className="display" style={{ fontSize: 56, color: COLORS.ink900, marginTop: 16, lineHeight: 1.0 }}>
            {shoutout}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
          {examples.map((e, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 18, background: COLORS.ink0, border: `1px solid ${COLORS.ink100}`, borderRadius: 12 }}>
              <div style={{ width: 56, height: 56, borderRadius: 12, background: COLORS.signal100, color: COLORS.signal700, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter Tight', fontSize: 26, fontWeight: 800, flexShrink: 0 }}>{e.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.ink900 }}>{e.name}</div>
                <div style={{ fontSize: 14, color: COLORS.ink500, marginTop: 2, lineHeight: 1.35 }}>{e.tagline}</div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 22px', borderRadius: 12, background: COLORS.signal500, color: '#fff', fontSize: 18, fontWeight: 600, marginBottom: 24 }}>
            <Ico name="arrow" size={18} stroke={2.4} /> {callout}
          </div>
          <PostFoot lane="mono" tags={['community', 'buildwithprivex']} />
        </div>
      </div>
    </Frame>
  );
}

// ===== 9. RECEIPT / proof — show your work =====
export function ReceiptPost({
  eyebrow = 'Proof, not promises',
  title = 'Here\'s the cryptographic receipt for your last inference.',
  body = 'Every PrivexBot inference signs an attestation that proves:\n· which model ran\n· that it ran inside a verified enclave\n· that no one logged the prompt\n\nYou can verify it yourself. Or we can.',
} = {}) {
  return (
    <Frame lane="lane-dark" width={1080} height={1080}>
      <DotGrid color="#fff" opacity={0.04} spacing={28} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 20% 80%, rgba(62,138,94,0.18), transparent 50%)' }} />
      <div style={{ position: 'relative', height: '100%', padding: 64, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 15, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, color: COLORS.signal300 }}>{eyebrow}</div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 16px', borderRadius: 999, background: 'rgba(62,138,94,0.18)', border: '1px solid rgba(62,138,94,0.4)', color: COLORS.attest300, fontSize: 13, fontWeight: 600, fontFamily: 'JetBrains Mono' }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: COLORS.attest300 }} /> Verified
          </div>
        </div>

        <div className="display" style={{ fontSize: 52, color: '#fff', lineHeight: 1.05, letterSpacing: '-0.02em', fontWeight: 700 }}>
          {title}
        </div>

        {/* Receipt mock */}
        <div style={{ background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(136,146,216,0.3)', borderRadius: 14, padding: 30, fontFamily: 'JetBrains Mono', fontSize: 13, color: COLORS.signal200, lineHeight: 1.7 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(136,146,216,0.2)', paddingBottom: 12, marginBottom: 12 }}>
            <span style={{ color: COLORS.signal300, fontWeight: 600 }}>attestation_v1.json</span>
            <span style={{ color: COLORS.ink400 }}>2026-05-16 14:32 UTC</span>
          </div>
          <div><span style={{ color: COLORS.ink400 }}>model:</span> <span style={{ color: '#fff' }}>llama-3-70b-instruct</span></div>
          <div><span style={{ color: COLORS.ink400 }}>enclave_id:</span> <span style={{ color: '#fff' }}>nvidia-h100-tee-a7f3..</span></div>
          <div><span style={{ color: COLORS.ink400 }}>attestation:</span> <span style={{ color: COLORS.attest300 }}>NVIDIA_VERIFIED</span></div>
          <div><span style={{ color: COLORS.ink400 }}>prompt_logged:</span> <span style={{ color: COLORS.danger300 }}>false</span></div>
          <div><span style={{ color: COLORS.ink400 }}>response_logged:</span> <span style={{ color: COLORS.danger300 }}>false</span></div>
          <div><span style={{ color: COLORS.ink400 }}>signed_by:</span> <span style={{ color: '#fff' }}>privex_signing_key_2026</span></div>
          <div style={{ marginTop: 8, color: COLORS.ink400 }}>signature: <span style={{ color: COLORS.signal300 }}>0x9f3a1c..b8e7</span></div>
        </div>

        <div>
          <div style={{ fontSize: 19, color: COLORS.ink200, lineHeight: 1.5, whiteSpace: 'pre-line', marginBottom: 28, maxWidth: 880 }}>
            {body}
          </div>
          <PostFoot lane="dark" tags={['attestation', 'TEE', 'verifiable']} />
        </div>
      </div>
    </Frame>
  );
}

// ===== 10. TIP CAROUSEL (1 of 3) — for IG / LinkedIn carousels =====
export function CarouselSlide1({
  count = '1/5',
  hook = 'Five reasons your AI chatbot is leaking data.',
  sub = 'Swipe →',
} = {}) {
  return (
    <Frame lane="lane-dark" width={1080} height={1080}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 30%, rgba(88,102,194,0.4), transparent 60%)' }} />
      <DotGrid color="#fff" opacity={0.05} spacing={28} />
      <div style={{ position: 'relative', height: '100%', padding: 80, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Icon color="white" size={48} />
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 15, color: COLORS.ink300, padding: '6px 14px', borderRadius: 6, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)' }}>{count}</div>
        </div>

        <div>
          <div className="display" style={{ fontSize: 96, color: '#fff', lineHeight: 0.96, letterSpacing: '-0.03em', fontWeight: 700 }}>
            {hook}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 24, color: COLORS.signal300, fontWeight: 600 }}>
            {sub} <Ico name="arrow" size={26} stroke={2.4} />
          </div>
          <span style={{ fontFamily: 'Inter Tight', fontWeight: 800, fontSize: 22, letterSpacing: '0.08em', color: '#fff' }}>PRIVEXBOT</span>
        </div>
      </div>
    </Frame>
  );
}

export function CarouselSlide2({
  count = '2/5',
  num = '01',
  reason = 'Your model vendor logs every prompt for "model improvement".',
  body = 'OpenAI, Anthropic, and Google all retain prompts for 30–90 days by default. Even on enterprise plans, opt-out is a request — not a guarantee.',
} = {}) {
  return (
    <Frame lane="lane-mono" width={1080} height={1080}>
      <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 8, background: COLORS.signal500 }} />
      <div style={{ position: 'relative', height: '100%', padding: '80px 80px 80px 96px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="eyebrow" style={{ fontSize: 16 }}>Reason {num}</div>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 15, color: COLORS.ink400, padding: '6px 14px', borderRadius: 6, background: COLORS.ink25, border: `1px solid ${COLORS.ink100}` }}>{count}</div>
        </div>

        <div>
          <div className="display" style={{ fontSize: 64, color: COLORS.ink900, lineHeight: 1.04, marginBottom: 24 }}>
            {reason}
          </div>
          <div style={{ fontSize: 22, color: COLORS.ink500, lineHeight: 1.5, maxWidth: 860 }}>
            {body}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 16, color: COLORS.ink400, fontFamily: 'JetBrains Mono' }}>→ Swipe for reason 02</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Icon color="black" size={32} />
            <span style={{ fontFamily: 'Inter Tight', fontWeight: 800, fontSize: 22, letterSpacing: '0.08em', color: COLORS.ink900 }}>PRIVEXBOT</span>
          </div>
        </div>
      </div>
    </Frame>
  );
}

export function CarouselSlide5({
  count = '5/5',
  title = 'The fix is simpler than you think.',
  benefits = [
    'Run inference inside a hardware enclave',
    'Encrypt prompts end-to-end',
    'Sign every response with verifiable attestation',
  ],
  cta = 'Try PrivexBot free',
} = {}) {
  return (
    <Frame lane="lane-light" width={1080} height={1080} style={{ background: COLORS.signal500, color: '#fff' }}>
      <DotGrid color="#fff" opacity={0.07} spacing={28} />
      <div style={{ position: 'relative', height: '100%', padding: 80, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Icon color="white" size={48} />
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 15, color: COLORS.signal200, padding: '6px 14px', borderRadius: 6, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)' }}>{count}</div>
        </div>

        <div>
          <div className="display" style={{ fontSize: 72, color: '#fff', lineHeight: 1.0, letterSpacing: '-0.025em', marginBottom: 36 }}>
            {title}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {benefits.map((b, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <Ico name="check" size={26} stroke={2.4} style={{ color: COLORS.attest300 }} />
                <span style={{ fontSize: 24, color: '#fff', fontWeight: 500 }}>{b}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, padding: '22px 32px', borderRadius: 14, background: '#fff', color: COLORS.signal500, fontSize: 26, fontWeight: 700, marginBottom: 22 }}>
            {cta} <Ico name="arrow" size={26} stroke={2.4} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 15, color: COLORS.signal200 }}>privexbot.com</div>
            <span style={{ fontFamily: 'Inter Tight', fontWeight: 800, fontSize: 22, letterSpacing: '0.08em', color: '#fff' }}>PRIVEXBOT</span>
          </div>
        </div>
      </div>
    </Frame>
  );
}
