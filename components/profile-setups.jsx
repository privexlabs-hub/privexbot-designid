import React from 'react';
import { COLORS, DotGrid, Frame, Ico, Icon } from '@/components/brand';

// ===== PLATFORM PROFILE MOCKUPS =====
// Each shows the avatar, banner, name, handle, bio composed as that platform displays them.
// Sized to the platform's actual viewport so a screenshot matches what the user will see.

const BIO = {
  short: 'Privacy-first AI chatbots. No-code chatflows + RAG. Inference runs in a TEE — your prompts stay yours.',
  medium: 'Privacy-first AI automation. Build chatbots, visual chatflows, and RAG knowledge bases. Deploy to web, Discord, Slack, Telegram, WhatsApp. Inference runs in a Trusted Execution Environment — we never see your data.',
  long: 'PrivexBot is a no-code AI automation platform built for teams that take privacy seriously. Build a chatbot in 15 minutes, design visual chatflows, ground answers in your knowledge base, and deploy to every major channel — all from one workspace. Every inference runs inside a hardware-attested Trusted Execution Environment, so neither we, the model host, nor your hosting provider can read your prompts or your user\'s messages.',
};

// ===== X / TWITTER PROFILE =====
export function XProfile() {
  const W = 1200;
  return (
    <Frame lane="lane-dark" width={W} height={780} style={{ background: '#000', color: '#fff', fontFamily: 'Inter, sans-serif' }}>
      {/* X header chrome */}
      <div style={{ height: 53, borderBottom: '1px solid #2F3336', display: 'flex', alignItems: 'center', padding: '0 16px', gap: 32, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(12px)', position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M2.04 12.94l8.06 8.06a1.5 1.5 0 0 0 2.1 0L20.26 13a3 3 0 0 0 .81-2.95l-1.13-3.94a1.5 1.5 0 0 0-1.44-1.08H13.5l-1-1H7.5a1.5 1.5 0 0 0-1.44 1.08L4.93 9a3 3 0 0 0-.07.94l-2.82-2.83a.75.75 0 0 0-1.06 1.06l1.06 1.06z"/></svg>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div style={{ fontWeight: 800, fontSize: 17 }}>PrivexBot</div>
          <div style={{ fontSize: 13, color: '#71767B' }}>2,847 posts</div>
        </div>
      </div>

      {/* Banner (X header 1500×500 — rendered at 1200 wide so 1200×400) */}
      <div style={{ position: 'absolute', top: 53, left: 0, right: 0, height: 400, overflow: 'hidden' }}>
        <div style={{ width: '100%', height: '100%', position: 'relative', background: COLORS.ink950 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 25% 50%, rgba(88,102,194,0.32), transparent 55%), radial-gradient(ellipse at 80% 90%, rgba(62,138,94,0.18), transparent 60%)' }} />
          <DotGrid color="#fff" opacity={0.04} spacing={28} />
          <div style={{ position: 'relative', height: '100%', padding: '48px 72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ maxWidth: 720 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderRadius: 999, background: 'rgba(62,138,94,0.18)', border: '1px solid rgba(62,138,94,0.4)', color: COLORS.attest300, fontSize: 11, fontWeight: 600, letterSpacing: '0.04em', marginBottom: 16, fontFamily: 'JetBrains Mono' }}>
                <span style={{ width: 6, height: 6, borderRadius: 999, background: COLORS.attest300 }} /> TEE-attested inference
              </div>
              <div style={{ fontFamily: 'Inter Tight', fontSize: 52, color: '#fff', lineHeight: 1, letterSpacing: '-0.025em', fontWeight: 700 }}>
                Build chatbots that<br/><span style={{ color: COLORS.signal300 }}>never see your data.</span>
              </div>
            </div>
            <Icon color="white" size={210} style={{ opacity: 0.95 }} />
          </div>
        </div>
      </div>

      {/* Avatar — overlapping the banner */}
      <div style={{ position: 'absolute', top: 53 + 400 - 70, left: 16, zIndex: 5 }}>
        <div style={{ width: 140, height: 140, borderRadius: '50%', background: '#000', padding: 4, boxSizing: 'border-box' }}>
          <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: COLORS.signal500, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <Icon color="white" size={90} />
          </div>
        </div>
      </div>

      {/* Profile content */}
      <div style={{ position: 'absolute', top: 53 + 400 + 86, left: 0, right: 0, padding: '0 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginBottom: 18 }}>
          <button style={{ padding: '7px 14px', borderRadius: 999, border: '1px solid #2F3336', background: 'transparent', color: '#fff', fontWeight: 700, fontSize: 14 }}>More</button>
          <button style={{ padding: '7px 16px', borderRadius: 999, border: 'none', background: '#fff', color: '#000', fontWeight: 700, fontSize: 14 }}>Follow</button>
        </div>
        <div style={{ fontWeight: 800, fontSize: 20, lineHeight: 1.2 }}>PrivexBot <svg style={{ display: 'inline', verticalAlign: '-3px' }} width="20" height="20" viewBox="0 0 22 22"><circle cx="11" cy="11" r="11" fill={COLORS.signal500}/><path d="M6 11l4 4 6-8" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
        <div style={{ fontSize: 15, color: '#71767B', marginTop: 2 }}>@privexbot</div>
        <div style={{ marginTop: 12, fontSize: 15, color: '#E7E9EA', lineHeight: 1.45, maxWidth: 780 }}>{BIO.short}</div>
        <div style={{ display: 'flex', gap: 16, marginTop: 12, fontSize: 14, color: '#71767B', flexWrap: 'wrap' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Ico name="globe" size={14} /> privexbot.com</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>📍 Encrypted, distributed</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>Joined April 2025</span>
        </div>
        <div style={{ display: 'flex', gap: 20, marginTop: 12, fontSize: 14, color: '#71767B' }}>
          <span><b style={{ color: '#fff' }}>248</b> Following</span>
          <span><b style={{ color: '#fff' }}>14.2K</b> Followers</span>
        </div>
      </div>
    </Frame>
  );
}

// ===== INSTAGRAM PROFILE =====
export function InstagramProfile() {
  return (
    <Frame lane="lane-mono" width={1200} height={780} style={{ background: '#fff', fontFamily: 'Inter, sans-serif' }}>
      {/* IG top bar */}
      <div style={{ height: 52, borderBottom: '1px solid #DBDBDB', display: 'flex', alignItems: 'center', padding: '0 28px', gap: 24 }}>
        <div style={{ fontFamily: 'Inter Tight', fontSize: 22, fontWeight: 700, fontStyle: 'italic', letterSpacing: '-0.02em' }}>Instagram</div>
        <div style={{ flex: 1, maxWidth: 280, height: 36, background: '#EFEFEF', borderRadius: 8, padding: '0 12px', display: 'flex', alignItems: 'center', color: '#8E8E8E', fontSize: 13 }}>🔍 Search</div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 22, color: COLORS.ink900 }}>
          <Ico name="message" size={22} stroke={1.8} />
          <Ico name="zap" size={22} stroke={1.8} />
          <Ico name="users" size={22} stroke={1.8} />
        </div>
      </div>

      {/* Profile body */}
      <div style={{ padding: '40px 80px', display: 'flex', gap: 80 }}>
        {/* Avatar */}
        <div>
          <div style={{ width: 180, height: 180, borderRadius: '50%', background: 'linear-gradient(135deg, #FEDA77, #F58529, #DD2A7B, #8134AF, #515BD4)', padding: 4, boxSizing: 'border-box' }}>
            <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#fff', padding: 4, boxSizing: 'border-box' }}>
              <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: COLORS.ink950, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 25%, rgba(136,146,216,0.6), transparent 65%)' }} />
                <Icon color="white" size={110} style={{ position: 'relative' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Bio + stats */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 22 }}>
            <div style={{ fontSize: 22, fontWeight: 400, color: '#000' }}>privexbot</div>
            <button style={{ padding: '8px 20px', borderRadius: 8, background: COLORS.signal500, color: '#fff', border: 'none', fontWeight: 600, fontSize: 14, fontFamily: 'inherit' }}>Follow</button>
            <button style={{ padding: '8px 20px', borderRadius: 8, background: '#EFEFEF', color: '#000', border: 'none', fontWeight: 600, fontSize: 14, fontFamily: 'inherit' }}>Message</button>
            <Ico name="users" size={20} stroke={1.8} style={{ color: '#000', marginLeft: 4 }} />
          </div>

          <div style={{ display: 'flex', gap: 40, marginBottom: 22, fontSize: 16 }}>
            <span><b>183</b> posts</span>
            <span><b>14,247</b> followers</span>
            <span><b>92</b> following</span>
          </div>

          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>PrivexBot · No-code AI automation</div>
          <div style={{ fontSize: 14, lineHeight: 1.5, maxWidth: 540, color: '#262626' }}>
            🔐 Build chatbots in 15 min<br/>
            🧠 Visual chatflows + RAG<br/>
            🛡️ TEE-encrypted inference<br/>
            👇 Start free
          </div>
          <a style={{ display: 'inline-block', marginTop: 6, color: '#00376B', fontSize: 14, fontWeight: 600 }}>privexbot.com</a>

          {/* Story highlights */}
          <div style={{ display: 'flex', gap: 24, marginTop: 28 }}>
            {[
              { label: 'Privacy', bg: COLORS.signal500 },
              { label: 'Tutorials', bg: COLORS.ink950 },
              { label: 'Customers', bg: COLORS.attest500 },
              { label: 'Changelog', bg: COLORS.signal700 },
              { label: 'Team', bg: COLORS.ink25, border: true },
            ].map((h, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 80, height: 80, borderRadius: '50%', background: h.bg, padding: 4, boxSizing: 'border-box', border: '1px solid #DBDBDB' }}>
                  <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: h.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    <Icon color={h.border ? 'indigo' : 'white'} size={36} />
                  </div>
                </div>
                <div style={{ fontSize: 13, color: '#000' }}>{h.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tab strip */}
      <div style={{ borderTop: '1px solid #DBDBDB', display: 'flex', justifyContent: 'center', gap: 60, padding: '14px 0', fontSize: 12, color: '#8E8E8E', letterSpacing: '0.1em', fontWeight: 600 }}>
        <span style={{ color: '#000', borderTop: '2px solid #000', paddingTop: 12, marginTop: -14 }}>▦ POSTS</span>
        <span>🎬 REELS</span>
        <span>🔖 TAGGED</span>
      </div>
    </Frame>
  );
}

// ===== LINKEDIN PROFILE / COMPANY PAGE =====
export function LinkedInProfile() {
  return (
    <Frame lane="lane-mono" width={1200} height={780} style={{ background: '#F3F2EF', fontFamily: 'Inter, sans-serif' }}>
      {/* LI top bar */}
      <div style={{ height: 52, background: '#fff', borderBottom: '1px solid #E0DFDC', display: 'flex', alignItems: 'center', padding: '0 28px' }}>
        <div style={{ width: 36, height: 36, background: '#0A66C2', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontFamily: 'Inter Tight', fontSize: 18 }}>in</div>
        <div style={{ flex: 1, marginLeft: 12, maxWidth: 280, height: 34, background: '#EEF3F8', borderRadius: 4, padding: '0 12px', display: 'flex', alignItems: 'center', color: '#5E5E5E', fontSize: 13 }}>🔍 Search</div>
      </div>

      <div style={{ padding: '24px 40px' }}>
        <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #E0DFDC', overflow: 'hidden' }}>
          {/* Cover banner */}
          <div style={{ height: 220, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '55%', background: COLORS.signal500 }} />
            <DotGrid color={COLORS.signal500} opacity={0.06} spacing={28} />
            <div style={{ position: 'relative', height: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', zIndex: 2 }}>
              <div style={{ padding: '0 48px' }}>
                <div className="eyebrow" style={{ fontSize: 11, color: COLORS.signal700 }}>Privacy-first AI</div>
                <div style={{ fontFamily: 'Inter Tight', fontSize: 32, color: COLORS.ink900, marginTop: 8, lineHeight: 1.02, fontWeight: 700, letterSpacing: '-0.02em' }}>
                  Build, deploy,<br/>and trust your AI.
                </div>
              </div>
              <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <Icon color="white" size={140} />
              </div>
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: '0 28px 24px', position: 'relative' }}>
            <div style={{ width: 110, height: 110, borderRadius: 14, background: '#fff', padding: 4, boxSizing: 'border-box', marginTop: -56, marginBottom: 14, boxShadow: '0 4px 10px -2px rgba(10,12,16,0.08)' }}>
              <div style={{ width: '100%', height: '100%', borderRadius: 12, background: COLORS.signal500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon color="white" size={70} />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 24, fontWeight: 700, color: '#000', display: 'flex', alignItems: 'center', gap: 8 }}>
                  PrivexBot
                  <svg width="20" height="20" viewBox="0 0 22 22"><circle cx="11" cy="11" r="11" fill={COLORS.signal500}/><path d="M6 11l4 4 6-8" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div style={{ fontSize: 16, color: '#000', marginTop: 4, lineHeight: 1.4, maxWidth: 720 }}>
                  Privacy-first AI automation · We help teams build chatbots, visual chatflows, and RAG knowledge bases — without ever seeing their data.
                </div>
                <div style={{ fontSize: 13, color: '#666', marginTop: 8, display: 'flex', gap: 8 }}>
                  <span>Software Development</span><span>·</span>
                  <span>Encrypted, distributed</span><span>·</span>
                  <span style={{ color: '#0A66C2', fontWeight: 600 }}>14,247 followers</span><span>·</span>
                  <span>11-50 employees</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
              <button style={{ padding: '6px 18px', borderRadius: 999, background: '#0A66C2', color: '#fff', border: 'none', fontWeight: 600, fontSize: 14, fontFamily: 'inherit' }}>+ Follow</button>
              <button style={{ padding: '6px 18px', borderRadius: 999, background: 'transparent', color: '#0A66C2', border: '1px solid #0A66C2', fontWeight: 600, fontSize: 14, fontFamily: 'inherit' }}>Visit website ↗</button>
              <button style={{ padding: '6px 18px', borderRadius: 999, background: 'transparent', color: '#0A66C2', border: '1px solid #0A66C2', fontWeight: 600, fontSize: 14, fontFamily: 'inherit' }}>More ▾</button>
            </div>
          </div>
        </div>

        {/* Tab strip */}
        <div style={{ background: '#fff', borderRadius: 10, marginTop: 8, display: 'flex', gap: 28, padding: '0 28px', borderBottom: '1px solid #E0DFDC' }}>
          {['Home', 'About', 'Posts', 'Jobs', 'People', 'Insights'].map((t, i) => (
            <div key={t} style={{ padding: '14px 0', fontSize: 14, color: i === 0 ? '#0A66C2' : '#000', fontWeight: i === 0 ? 700 : 500, borderBottom: i === 0 ? '2px solid #0A66C2' : 'none', marginBottom: -1 }}>{t}</div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

// ===== YOUTUBE CHANNEL =====
export function YouTubeProfile() {
  return (
    <Frame lane="lane-mono" width={1200} height={780} style={{ background: '#0F0F0F', fontFamily: 'Inter, sans-serif', color: '#fff' }}>
      {/* YT top bar */}
      <div style={{ height: 56, borderBottom: '1px solid #303030', display: 'flex', alignItems: 'center', padding: '0 16px', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <div style={{ width: 28, height: 20, background: '#FF0000', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="12" height="10" viewBox="0 0 12 10"><polygon points="3,1 9,5 3,9" fill="#fff"/></svg>
          </div>
          <span style={{ fontFamily: 'Inter Tight', fontWeight: 800, fontSize: 18, letterSpacing: '-0.04em' }}>YouTube</span>
        </div>
        <div style={{ flex: 1, maxWidth: 460, height: 36, background: '#121212', border: '1px solid #303030', borderRadius: 999, marginLeft: 60, padding: '0 16px', display: 'flex', alignItems: 'center', color: '#6F6F6F', fontSize: 13 }}>🔍 Search</div>
      </div>

      {/* Banner — safe area cropped to channel page view */}
      <div style={{ padding: '24px 96px 0' }}>
        <div style={{ borderRadius: 12, height: 200, overflow: 'hidden', position: 'relative', background: COLORS.ink950 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, rgba(88,102,194,0.35), transparent 50%)' }} />
          <DotGrid color="#fff" opacity={0.04} spacing={32} />
          <div style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
              <Icon color="white" size={60} />
              <span style={{ fontFamily: 'Inter Tight', fontWeight: 800, fontSize: 38, letterSpacing: '0.06em', color: '#fff' }}>PRIVEXBOT</span>
            </div>
            <div style={{ fontFamily: 'Inter Tight', fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em' }}>The privacy-first AI channel.</div>
            <div style={{ display: 'flex', gap: 10 }}>
              {['Tutorials', 'Live builds', 'Privacy deep dives', 'Changelog'].map((t) => (
                <div key={t} style={{ padding: '5px 12px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.22)', color: COLORS.ink200, fontSize: 12, fontFamily: 'JetBrains Mono', fontWeight: 500 }}>{t}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Channel info */}
      <div style={{ padding: '20px 96px', display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        <div style={{ width: 130, height: 130, borderRadius: '50%', overflow: 'hidden', background: COLORS.ink950, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 25%, rgba(136,146,216,0.6), transparent 65%)' }} />
          <Icon color="white" size={80} style={{ position: 'relative' }} />
        </div>
        <div style={{ flex: 1, paddingTop: 6 }}>
          <div style={{ fontFamily: 'Inter Tight', fontSize: 36, fontWeight: 700, letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: 8 }}>
            PrivexBot
            <svg width="18" height="18" viewBox="0 0 22 22"><circle cx="11" cy="11" r="11" fill="#AAA"/><path d="M6 11l4 4 6-8" stroke="#0F0F0F" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <div style={{ fontSize: 14, color: '#AAAAAA', marginTop: 6, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ color: '#fff', fontWeight: 600 }}>@privexbot</span>
            <span>·</span>
            <span>14.2K subscribers</span>
            <span>·</span>
            <span>92 videos</span>
          </div>
          <div style={{ fontSize: 14, color: '#AAAAAA', marginTop: 8, maxWidth: 760, lineHeight: 1.5 }}>
            Tutorials, live builds, and privacy deep dives. Learn how to build chatbots that respect your customer's data. New videos Tuesdays. <span style={{ color: '#3EA6FF' }}>...more</span>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
            <button style={{ padding: '8px 16px', borderRadius: 999, background: '#fff', color: '#0F0F0F', border: 'none', fontWeight: 600, fontSize: 14, fontFamily: 'inherit' }}>Subscribe</button>
            <button style={{ padding: '8px 16px', borderRadius: 999, background: '#272727', color: '#fff', border: 'none', fontWeight: 600, fontSize: 14, fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: 6 }}>🔔 Subscribed ▾</button>
            <button style={{ padding: '8px 16px', borderRadius: 999, background: '#272727', color: '#fff', border: 'none', fontWeight: 600, fontSize: 14, fontFamily: 'inherit' }}>Join</button>
          </div>
        </div>
      </div>
      <div style={{ borderTop: '1px solid #303030', padding: '0 96px', display: 'flex', gap: 28, fontSize: 14, fontWeight: 600 }}>
        {['Home', 'Videos', 'Shorts', 'Live', 'Playlists', 'Posts', 'About'].map((t, i) => (
          <div key={t} style={{ padding: '14px 0', color: i === 0 ? '#fff' : '#AAAAAA', borderBottom: i === 0 ? '2px solid #fff' : 'none', marginBottom: -1 }}>{t}</div>
        ))}
      </div>
    </Frame>
  );
}

// ===== TIKTOK PROFILE =====
export function TikTokProfile() {
  return (
    <Frame lane="lane-mono" width={1200} height={780} style={{ background: '#fff', color: '#161823', fontFamily: 'Inter, sans-serif' }}>
      {/* TikTok top bar */}
      <div style={{ height: 60, borderBottom: '1px solid #F1F1F2', display: 'flex', alignItems: 'center', padding: '0 32px', gap: 24 }}>
        <div style={{ fontFamily: 'Inter Tight', fontWeight: 800, fontSize: 24, letterSpacing: '-0.04em' }}>
          <span style={{ background: 'linear-gradient(45deg, #FE2C55, #25F4EE)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>TikTok</span>
        </div>
        <div style={{ flex: 1, maxWidth: 400, height: 40, background: '#F1F1F2', borderRadius: 999, padding: '0 16px', display: 'flex', alignItems: 'center', color: '#86878B', fontSize: 14 }}>🔍 Search</div>
        <button style={{ padding: '8px 24px', borderRadius: 4, background: '#FE2C55', color: '#fff', border: 'none', fontWeight: 700, fontSize: 14, fontFamily: 'inherit' }}>+ Upload</button>
      </div>

      <div style={{ padding: '40px 80px' }}>
        <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
          {/* Avatar */}
          <div style={{ width: 116, height: 116, borderRadius: '50%', background: COLORS.signal500, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
            <Icon color="white" size={80} />
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 32, fontWeight: 700, color: '#161823', display: 'flex', alignItems: 'center', gap: 6 }}>
              privexbot
              <svg width="20" height="20" viewBox="0 0 22 22"><circle cx="11" cy="11" r="11" fill="#20D5EC"/><path d="M6 11l4 4 6-8" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div style={{ fontSize: 18, color: '#161823', marginTop: 4 }}>PrivexBot · Privacy AI</div>

            <div style={{ display: 'flex', gap: 16, marginTop: 18 }}>
              <button style={{ padding: '8px 32px', borderRadius: 4, background: '#FE2C55', color: '#fff', border: 'none', fontWeight: 700, fontSize: 16, fontFamily: 'inherit' }}>Follow</button>
              <button style={{ padding: '8px 16px', borderRadius: 4, background: '#fff', color: '#161823', border: '1px solid #16182320', fontWeight: 700, fontSize: 16, fontFamily: 'inherit' }}>💬 Message</button>
              <button style={{ padding: '8px 12px', borderRadius: 4, background: '#fff', color: '#161823', border: '1px solid #16182320', fontWeight: 700, fontSize: 16, fontFamily: 'inherit' }}>↗</button>
            </div>

            <div style={{ display: 'flex', gap: 28, marginTop: 18, fontSize: 17 }}>
              <span><b style={{ fontWeight: 700 }}>184</b> <span style={{ color: '#86878B' }}>Following</span></span>
              <span><b style={{ fontWeight: 700 }}>14.2K</b> <span style={{ color: '#86878B' }}>Followers</span></span>
              <span><b style={{ fontWeight: 700 }}>892.4K</b> <span style={{ color: '#86878B' }}>Likes</span></span>
            </div>

            <div style={{ marginTop: 18, fontSize: 15, color: '#161823', maxWidth: 540, lineHeight: 1.4 }}>
              🔐 AI chatbots that don't read your prompts<br/>
              ⚡ Build in 15 min · Deploy anywhere<br/>
              📚 New tutorial every Thursday<br/>
              👇 Try it free
            </div>
            <a style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 6, color: '#161823', fontSize: 15, fontWeight: 700 }}>🔗 privexbot.com</a>
          </div>
        </div>

        {/* Tab strip */}
        <div style={{ borderBottom: '1px solid #F1F1F2', display: 'flex', gap: 60, marginTop: 32, padding: '0 0 0 0', justifyContent: 'center' }}>
          {[
            { l: 'Videos', active: true },
            { l: 'Reposts' },
            { l: 'Liked' },
          ].map((t) => (
            <div key={t.l} style={{ padding: '14px 0', fontSize: 16, fontWeight: 700, color: t.active ? '#161823' : '#86878B', borderBottom: t.active ? '2px solid #161823' : 'none', marginBottom: -1 }}>
              {t.l}
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

// ===== TWITCH PROFILE =====
export function TwitchProfile() {
  return (
    <Frame lane="lane-mono" width={1200} height={780} style={{ background: '#0E0E10', color: '#EFEFF1', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ height: 48, borderBottom: '1px solid #1F1F23', display: 'flex', alignItems: 'center', padding: '0 16px', gap: 16, background: '#18181B' }}>
        <svg width="28" height="32" viewBox="0 0 28 32" fill="#9147FF"><path d="M5.6 0L0 5.6v22.4h7.467V32l5.6-3.733h4.667L28 18.667V0H5.6zm19.6 17.733l-4.667 4.667H16l-4.667 4.667V22.4H5.6V2.8h19.6v14.933zM21.467 8.4v8.4h-2.8V8.4h2.8zm-7.467 0v8.4h-2.8V8.4h2.8z"/></svg>
        <div style={{ fontWeight: 700, fontSize: 14 }}>Following</div>
        <div style={{ fontWeight: 700, fontSize: 14, color: '#ADADB8' }}>Browse</div>
        <div style={{ flex: 1, maxWidth: 300, marginLeft: 24, height: 30, background: '#0E0E10', border: '1px solid #2F2F35', borderRadius: 4, padding: '0 12px', display: 'flex', alignItems: 'center', color: '#9b9b9b', fontSize: 13 }}>🔍 Search</div>
      </div>

      {/* Banner */}
      <div style={{ position: 'relative', height: 320, background: COLORS.ink950, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(57,71,168,0.45) 0%, transparent 60%), radial-gradient(circle at 90% 100%, rgba(62,138,94,0.25), transparent 50%)' }} />
        <DotGrid color="#fff" opacity={0.05} spacing={26} />
        <div style={{ position: 'relative', height: '100%', padding: '40px 64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 10px', borderRadius: 4, background: 'rgba(229,72,77,0.16)', border: '1px solid rgba(229,72,77,0.4)', color: COLORS.danger300, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', marginBottom: 14, textTransform: 'uppercase', fontFamily: 'JetBrains Mono' }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: COLORS.danger300 }} /> Live · Building in public
            </div>
            <div style={{ fontFamily: 'Inter Tight', fontSize: 44, color: '#fff', lineHeight: 1, letterSpacing: '-0.025em', fontWeight: 700 }}>
              Tuesdays at 14:00 UTC.
            </div>
            <div style={{ fontSize: 16, color: COLORS.ink200, marginTop: 10, maxWidth: 480 }}>
              Live coding sessions, RAG deep dives, and chaotic deploys.
            </div>
          </div>
          <Icon color="white" size={160} />
        </div>
      </div>

      <div style={{ padding: '0 32px' }}>
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end', marginTop: -36, position: 'relative', zIndex: 2 }}>
          <div style={{ width: 128, height: 128, borderRadius: '50%', border: '4px solid #0E0E10', background: COLORS.signal500, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <Icon color="white" size={84} />
          </div>
          <div style={{ flex: 1, paddingBottom: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ fontSize: 24, fontWeight: 700 }}>PrivexBot</div>
              <svg width="20" height="20" viewBox="0 0 22 22"><circle cx="11" cy="11" r="11" fill="#9147FF"/><path d="M6 11l4 4 6-8" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div style={{ fontSize: 14, color: '#ADADB8', marginTop: 2 }}>2.4K followers</div>
          </div>
          <div style={{ display: 'flex', gap: 8, paddingBottom: 8 }}>
            <button style={{ padding: '8px 20px', borderRadius: 4, background: '#9147FF', color: '#fff', border: 'none', fontWeight: 700, fontSize: 14, fontFamily: 'inherit' }}>♥ Follow</button>
            <button style={{ padding: '8px 20px', borderRadius: 4, background: '#26262C', color: '#fff', border: 'none', fontWeight: 700, fontSize: 14, fontFamily: 'inherit' }}>★ Subscribe</button>
          </div>
        </div>

        <div style={{ borderBottom: '1px solid #1F1F23', display: 'flex', gap: 28, marginTop: 16 }}>
          {['Home', 'About', 'Schedule', 'Videos', 'Chat'].map((t, i) => (
            <div key={t} style={{ padding: '14px 0', fontSize: 14, color: i === 0 ? '#fff' : '#ADADB8', fontWeight: 700, borderBottom: i === 0 ? '2px solid #9147FF' : 'none', marginBottom: -1 }}>{t}</div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

// ===== FACEBOOK PAGE =====
export function FacebookProfile() {
  return (
    <Frame lane="lane-mono" width={1200} height={780} style={{ background: '#F0F2F5', color: '#050505', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ height: 56, background: '#fff', borderBottom: '1px solid #DADDE1', display: 'flex', alignItems: 'center', padding: '0 16px', gap: 16 }}>
        <div style={{ width: 40, height: 40, borderRadius: 999, background: '#1877F2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontFamily: 'Inter Tight', fontSize: 24, letterSpacing: '-0.04em' }}>f</div>
        <div style={{ flex: 1, maxWidth: 240, height: 40, background: '#F0F2F5', borderRadius: 999, padding: '0 14px', display: 'flex', alignItems: 'center', color: '#65676B', fontSize: 14 }}>🔍 Search Facebook</div>
      </div>

      <div style={{ padding: '0 80px' }}>
        <div style={{ background: '#fff', borderRadius: '0 0 8px 8px', overflow: 'hidden' }}>
          {/* Cover */}
          <div style={{ height: 320, position: 'relative', overflow: 'hidden', background: COLORS.ink25 }}>
            <DotGrid color={COLORS.signal500} opacity={0.05} spacing={36} />
            <div style={{ position: 'relative', height: '100%', padding: '36px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Icon color="indigo" size={36} />
                <span style={{ fontFamily: 'Inter Tight', fontWeight: 800, fontSize: 22, letterSpacing: '0.04em', color: COLORS.signal500 }}>PRIVEXBOT</span>
              </div>
              <div>
                <div className="eyebrow" style={{ fontSize: 12, color: COLORS.signal700 }}>What we make</div>
                <div style={{ fontFamily: 'Inter Tight', fontSize: 48, color: COLORS.ink900, marginTop: 8, lineHeight: 0.98, fontWeight: 700, letterSpacing: '-0.02em', maxWidth: 720 }}>
                  AI that <span style={{ color: COLORS.signal500 }}>respects</span><br/>your customers' data.
                </div>
              </div>
            </div>
          </div>

          {/* Profile section */}
          <div style={{ padding: '0 24px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, marginTop: -36, position: 'relative' }}>
              <div style={{ width: 168, height: 168, borderRadius: '50%', background: '#fff', padding: 4, boxSizing: 'border-box' }}>
                <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: COLORS.signal500, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  <Icon color="white" size={108} />
                </div>
              </div>
              <div style={{ flex: 1, paddingBottom: 12 }}>
                <div style={{ fontSize: 28, fontWeight: 800 }}>PrivexBot</div>
                <div style={{ fontSize: 15, color: '#65676B', marginTop: 4 }}>
                  <b>14,247</b> followers · <b>12,891</b> likes · Software company
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, paddingBottom: 12 }}>
                <button style={{ padding: '8px 22px', borderRadius: 6, background: '#1877F2', color: '#fff', border: 'none', fontWeight: 700, fontSize: 15, fontFamily: 'inherit' }}>+ Follow</button>
                <button style={{ padding: '8px 22px', borderRadius: 6, background: '#E4E6EB', color: '#050505', border: 'none', fontWeight: 700, fontSize: 15, fontFamily: 'inherit' }}>💬 Message</button>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #DADDE1', marginTop: 12, paddingTop: 8, display: 'flex', gap: 4 }}>
              {['Home', 'About', 'Posts', 'Reviews', 'Photos', 'Videos', 'More'].map((t, i) => (
                <div key={t} style={{ padding: '12px 16px', fontSize: 15, fontWeight: 600, color: i === 0 ? '#1877F2' : '#65676B', borderBottom: i === 0 ? '3px solid #1877F2' : 'none', marginBottom: -1 }}>{t}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Frame>
  );
}

// ===== BIO COPY REFERENCE CARD =====
export function BioReference() {
  const bios = [
    { platform: 'X / Twitter', limit: '160 chars', bio: 'Privacy-first AI chatbots. No-code chatflows + RAG. Inference runs in a TEE — your prompts stay yours. Build → privexbot.com', chars: 130 },
    { platform: 'Instagram', limit: '150 chars', bio: '🔐 Build chatbots in 15 min\n🧠 Visual chatflows + RAG\n🛡️ TEE-encrypted inference\n👇 Start free', chars: 92 },
    { platform: 'LinkedIn (company tagline)', limit: '120 chars', bio: 'Privacy-first AI automation · Chatbots, chatflows, and RAG that never see your data.', chars: 88 },
    { platform: 'YouTube', limit: '1000 chars', bio: 'Tutorials, live builds, and privacy deep dives. Learn how to build chatbots that respect your customer\'s data. New videos Tuesdays.', chars: 132 },
    { platform: 'TikTok', limit: '80 chars', bio: '🔐 AI chatbots that don\'t read your prompts\n⚡ Build in 15 min · Deploy anywhere', chars: 78 },
    { platform: 'Twitch (channel description)', limit: '300 chars', bio: 'Live coding sessions, RAG deep dives, and chaotic deploys. Tuesdays at 14:00 UTC. Building PrivexBot — privacy-first AI automation — in public.', chars: 142 },
    { platform: 'Facebook', limit: '255 chars', bio: 'Privacy-first AI automation. Build chatbots, visual chatflows, and RAG knowledge bases — without ever seeing your data. Deploy to web, Discord, Slack, Telegram, WhatsApp.', chars: 168 },
  ];
  return (
    <Frame lane="lane-mono" width={1200} height={840}>
      <div style={{ padding: 56, display: 'flex', flexDirection: 'column', gap: 24, height: '100%' }}>
        <div>
          <div className="eyebrow" style={{ fontSize: 12 }}>Profile setup · Bios</div>
          <h2 className="display" style={{ fontSize: 36, marginTop: 12 }}>Copy-paste bios for every platform.</h2>
          <p style={{ color: COLORS.ink500, fontSize: 15, marginTop: 8, maxWidth: 760 }}>
            One voice. Tailored to each platform's character limit and rhythm. Pair with the matching avatar style from the avatar gallery.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1, overflow: 'auto' }}>
          {bios.map((b) => (
            <div key={b.platform} style={{ display: 'grid', gridTemplateColumns: '220px 1fr 100px', gap: 20, padding: '16px 20px', background: COLORS.ink0, border: `1px solid ${COLORS.ink100}`, borderRadius: 10, alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.ink900 }}>{b.platform}</div>
                <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: COLORS.ink400, marginTop: 2 }}>{b.limit}</div>
              </div>
              <div style={{ fontSize: 14, color: COLORS.ink700, whiteSpace: 'pre-line', lineHeight: 1.45 }}>{b.bio}</div>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: COLORS.ink400, textAlign: 'right' }}>{b.chars} chars</div>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}
