import React from 'react';
import { COLORS, Frame, Wordmark } from '@/components/brand';

// ===== FOUNDATION SECTION =====
// Logo lockups, color palette, type, voice — the reference page of the kit.

// Logo lockup showcase — multiple variants on different surfaces
export function LogoShowcase() {
  return (
    <Frame lane="lane-mono" width={1200} height={680}>
      <div style={{ padding: 56, display: 'flex', flexDirection: 'column', gap: 28, height: '100%' }}>
        <div>
          <div className="eyebrow" style={{ fontSize: 12 }}>01 — Logo system</div>
          <h2 className="display" style={{ fontSize: 36, marginTop: 12 }}>One mark. Five colorways. Never reshaped.</h2>
          <p style={{ color: COLORS.ink500, fontSize: 15, marginTop: 8, maxWidth: 720 }}>
            The P-mark is the brand's anchor across every platform. Recolor it for context, never redraw it. Pair it with the wordmark in horizontal lockups and stack it on profile avatars.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, flex: 1 }}>
          {/* Indigo on light */}
          <div style={{ background: COLORS.ink0, border: `1px solid ${COLORS.ink100}`, borderRadius: 12, padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Wordmark color="indigo" height={36} />
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: COLORS.ink400, letterSpacing: '0.04em' }}>indigo on white · default</div>
          </div>
          {/* Black on light */}
          <div style={{ background: COLORS.ink0, border: `1px solid ${COLORS.ink100}`, borderRadius: 12, padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Wordmark color="black" height={36} />
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: COLORS.ink400, letterSpacing: '0.04em' }}>black · maximum clarity</div>
          </div>
          {/* White on dark */}
          <div style={{ background: COLORS.ink950, borderRadius: 12, padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Wordmark color="white" height={36} />
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: COLORS.ink400, letterSpacing: '0.04em' }}>white on ink-950 · dark mode</div>
          </div>
          {/* Indigo on light tint */}
          <div style={{ background: COLORS.signal50, borderRadius: 12, padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Wordmark color="indigo" height={36} />
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: COLORS.ink400, letterSpacing: '0.04em' }}>indigo on signal-50</div>
          </div>
          {/* White on indigo */}
          <div style={{ background: COLORS.signal500, borderRadius: 12, padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Wordmark color="white" height={36} />
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: COLORS.signal200, letterSpacing: '0.04em' }}>white on signal-500</div>
          </div>
          {/* Sage variant (used sparingly for "verified" themes) */}
          <div style={{ background: COLORS.ink0, border: `1px solid ${COLORS.ink100}`, borderRadius: 12, padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Wordmark color="sage" height={36} />
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: COLORS.ink400, letterSpacing: '0.04em' }}>sage · "verified" theme only</div>
          </div>
        </div>
      </div>
    </Frame>
  );
}

// Color palette card
export function ColorPalette() {
  const groups = [
    {
      label: 'Brand · signal',
      note: 'Compliance indigo. The trust anchor.',
      colors: [
        { name: 'signal-900', hex: '#131941' },
        { name: 'signal-700', hex: '#212B6F' },
        { name: 'signal-500', hex: '#3947A8', primary: true },
        { name: 'signal-300', hex: '#8892D8' },
        { name: 'signal-100', hex: '#D9DDF4' },
      ],
    },
    {
      label: 'Attest · sage',
      note: 'Reserved for verified / encrypted state. Never decorative.',
      colors: [
        { name: 'attest-700', hex: '#285A3D' },
        { name: 'attest-500', hex: '#3E8A5E' },
        { name: 'attest-100', hex: '#DCEBE1' },
      ],
    },
    {
      label: 'Ink · neutrals',
      note: 'Cool, slightly blue-shifted grays.',
      colors: [
        { name: 'ink-950', hex: '#0A0C10' },
        { name: 'ink-700', hex: '#1E2230' },
        { name: 'ink-500', hex: '#3A4051' },
        { name: 'ink-300', hex: '#858C9D' },
        { name: 'ink-100', hex: '#D9DCE3' },
        { name: 'ink-25',  hex: '#F9FAFB' },
        { name: 'ink-0',   hex: '#FFFFFF' },
      ],
    },
  ];
  return (
    <Frame lane="lane-mono" width={1200} height={680}>
      <div style={{ padding: 56, display: 'flex', flexDirection: 'column', gap: 24, height: '100%' }}>
        <div>
          <div className="eyebrow" style={{ fontSize: 12 }}>02 — Color</div>
          <h2 className="display" style={{ fontSize: 36, marginTop: 12 }}>Indigo for trust. Sage for verified. Ink for the rest.</h2>
          <p style={{ color: COLORS.ink500, fontSize: 15, marginTop: 8, maxWidth: 720 }}>
            Most of any post is white or ink-950. Indigo is the only color you use to draw the eye. Sage shows up only when we're talking about security state.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, flex: 1 }}>
          {groups.map((g) => (
            <div key={g.label}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
                <div style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: COLORS.ink900, fontWeight: 600 }}>{g.label}</div>
                <div style={{ fontSize: 12, color: COLORS.ink400 }}>{g.note}</div>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                {g.colors.map((c) => (
                  <div key={c.name} style={{ flex: 1, border: `1px solid ${COLORS.ink100}`, borderRadius: 10, overflow: 'hidden', background: COLORS.ink0 }}>
                    <div style={{ height: 64, background: c.hex, position: 'relative' }}>
                      {c.primary && (
                        <div style={{ position: 'absolute', top: 6, right: 8, fontSize: 9, color: COLORS.ink0, letterSpacing: '0.1em', fontWeight: 700, textTransform: 'uppercase' }}>Primary</div>
                      )}
                    </div>
                    <div style={{ padding: '8px 10px' }}>
                      <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: COLORS.ink900 }}>{c.name}</div>
                      <div style={{ fontFamily: 'JetBrains Mono', fontSize: 9.5, color: COLORS.ink400, marginTop: 1 }}>{c.hex}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

// Type system card
export function TypeSpecimen() {
  return (
    <Frame lane="lane-mono" width={1200} height={680}>
      <div style={{ padding: 56, display: 'flex', flexDirection: 'column', gap: 24, height: '100%' }}>
        <div>
          <div className="eyebrow" style={{ fontSize: 12 }}>03 — Type</div>
          <h2 className="display" style={{ fontSize: 36, marginTop: 12 }}>Three families. One mood: grown-up developer tool.</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, flex: 1 }}>
          <div style={{ border: `1px solid ${COLORS.ink100}`, borderRadius: 12, padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: COLORS.ink400, letterSpacing: '0.04em' }}>Display · Inter Tight</div>
              <div className="display" style={{ fontSize: 64, marginTop: 18, lineHeight: 0.95 }}>Privacy as<br/>clarity.</div>
              <div style={{ marginTop: 18, fontSize: 13, color: COLORS.ink500 }}>Hero type on covers, big stats, launch announcements.</div>
            </div>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: COLORS.ink300, marginTop: 16 }}>700 weight · -0.025em tracking</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ border: `1px solid ${COLORS.ink100}`, borderRadius: 12, padding: 24 }}>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: COLORS.ink400, letterSpacing: '0.04em' }}>UI sans · Inter</div>
              <div style={{ fontSize: 22, fontWeight: 600, marginTop: 10, color: COLORS.ink900 }}>Build a chatbot in fifteen minutes.</div>
              <div style={{ fontSize: 15, color: COLORS.ink500, marginTop: 8, lineHeight: 1.55 }}>
                The workhorse. 14–16px for body. 600 semibold for emphasis — 700 only on display sizes.
              </div>
            </div>
            <div style={{ border: `1px solid ${COLORS.ink100}`, borderRadius: 12, padding: 24 }}>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: COLORS.ink400, letterSpacing: '0.04em' }}>Mono · JetBrains Mono</div>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: 14, marginTop: 10, color: COLORS.ink900 }}>POST /api/v1/bots/&lt;id&gt;/messages</div>
              <div style={{ fontSize: 13, color: COLORS.ink500, marginTop: 8 }}>
                Code, API endpoints, node IDs, tabular technical data. Never body copy.
              </div>
            </div>
            <div style={{ background: COLORS.ink25, borderRadius: 12, padding: 24 }}>
              <div className="eyebrow" style={{ fontSize: 10 }}>Eyebrow · Inter, +0.18em, uppercase</div>
              <div style={{ fontSize: 12, color: COLORS.ink500, marginTop: 8 }}>The only place letter-spacing widens. Use above section titles and on small labels.</div>
            </div>
          </div>
        </div>
      </div>
    </Frame>
  );
}

// Voice guide — the do/don't card
export function VoiceGuide() {
  const dos = [
    'Plainspoken. "We encrypt every credential at rest" — not "Your data is SAFE!"',
    'Specific. "Build a chatbot in 15 minutes" — not "Powerful AI for everyone."',
    'Confident but calm. Linear release notes, Supabase docs, Vercel pages.',
    'Sentence case in UI. Verb-led buttons. "Save changes", "Deploy bot".',
  ];
  const donts = [
    'No "🤖 Looks like it\'s a bit lonely here! ✨"',
    'No "100% Secure! Military-grade encryption!"',
    'No "Oops! Something went wrong. Please try again."',
    'No "Click here to connect your workspace now →"',
  ];
  return (
    <Frame lane="lane-mono" width={1200} height={680}>
      <div style={{ padding: 56, display: 'flex', flexDirection: 'column', gap: 24, height: '100%' }}>
        <div>
          <div className="eyebrow" style={{ fontSize: 12 }}>04 — Voice</div>
          <h2 className="display" style={{ fontSize: 36, marginTop: 12 }}>Speak like infrastructure. Not like marketing.</h2>
          <p style={{ color: COLORS.ink500, fontSize: 15, marginTop: 8, maxWidth: 720 }}>
            We're a privacy-first AI platform. The tone is grown-up developer tool — close neighbours: Linear's release notes, Supabase's docs, Vercel's product pages.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, flex: 1 }}>
          <div style={{ border: `1px solid ${COLORS.attest500}`, borderRadius: 12, padding: 28, background: COLORS.ink0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: COLORS.attest500 }} />
              <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.attest700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Do</div>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
              {dos.map((d, i) => (
                <li key={i} style={{ fontSize: 14, color: COLORS.ink900, lineHeight: 1.55, paddingLeft: 18, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, top: 8, width: 8, height: 1.5, background: COLORS.attest500 }} />
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ border: `1px solid ${COLORS.danger}`, borderRadius: 12, padding: 28, background: COLORS.ink0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: COLORS.danger }} />
              <div style={{ fontSize: 13, fontWeight: 600, color: '#AA2328', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Don't</div>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
              {donts.map((d, i) => (
                <li key={i} style={{ fontSize: 14, color: COLORS.ink900, lineHeight: 1.55, paddingLeft: 18, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, top: 8, width: 8, height: 1.5, background: COLORS.danger }} />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Frame>
  );
}
