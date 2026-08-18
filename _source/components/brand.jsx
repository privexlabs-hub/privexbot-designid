/* global React */
const { useState, useEffect, useRef, useMemo } = React;

// ===== Brand primitives shared across all templates =====

// Color tokens (mirrors brand.css; available to JS)
const COLORS = {
  // Ink
  ink950: '#0A0C10', ink900: '#0F1218', ink800: '#161A22', ink700: '#1E2230',
  ink600: '#2A2F3D', ink500: '#3A4051', ink400: '#5A6172', ink300: '#858C9D',
  ink200: '#B4BAC6', ink100: '#D9DCE3', ink75: '#E9EBEF', ink50: '#F3F4F7',
  ink25: '#F9FAFB', ink0: '#FFFFFF',
  // Brand
  signal50: '#EEF0FB', signal100: '#D9DDF4', signal200: '#B6BEEA',
  signal300: '#8892D8', signal400: '#5866C2', signal500: '#3947A8',
  signal600: '#2B368A', signal700: '#212B6F', signal800: '#1A2256',
  signal900: '#131941',
  // Attest (sage)
  attest100: '#DCEBE1', attest500: '#3E8A5E', attest700: '#285A3D', attestLight: '#7DC79A',
  // Semantic
  danger: '#E5484D', warn: '#D97706',
};

// Logo asset urls (different colorways — same shape, only color changes per request)
const ICON = {
  black:       'assets/icon-black.png',
  white:       'assets/icon-white.png',
  indigo:      'assets/icon-indigo.png',
  indigoLight: 'assets/icon-indigo-light.png',
  sage:        'assets/icon-sage.png',
};

// Renders the P-mark icon as an <img>. Pass color="black"|"white"|"indigo"|"indigoLight"|"sage".
function Icon({ color = 'black', size = 64, style = {}, ...rest }) {
  const src = ICON[color] || ICON.black;
  return (
    <img
      src={src}
      alt="PrivexBot"
      width={size}
      height={size}
      style={{ display: 'block', objectFit: 'contain', ...style }}
      {...rest}
    />
  );
}

// Wordmark — icon + "PRIVEXBOT" type, horizontal lockup.
// We type-set the wordmark so we can recolor it cleanly per lane.
function Wordmark({ color = 'black', height = 32, style = {} }) {
  const textColor = {
    black: COLORS.ink900,
    white: COLORS.ink0,
    indigo: COLORS.signal500,
    indigoLight: COLORS.signal300,
    sage: COLORS.attest500,
  }[color] || COLORS.ink900;
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: height * 0.32, ...style }}>
      <Icon color={color} size={height} />
      <span
        className="wordmark"
        style={{
          fontSize: height * 0.62,
          fontWeight: 800,
          letterSpacing: '-0.03em',
          color: textColor,
          lineHeight: 1,
        }}
      >PRIVEXBOT</span>
    </div>
  );
}

// Stacked wordmark — icon centered above type
function WordmarkStacked({ color = 'black', size = 96, style = {} }) {
  const textColor = {
    black: COLORS.ink900,
    white: COLORS.ink0,
    indigo: COLORS.signal500,
    indigoLight: COLORS.signal300,
    sage: COLORS.attest500,
  }[color] || COLORS.ink900;
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: size * 0.18, ...style }}>
      <Icon color={color} size={size} />
      <span
        className="wordmark"
        style={{
          fontSize: size * 0.32,
          fontWeight: 800,
          letterSpacing: '0.12em',
          color: textColor,
          lineHeight: 1,
        }}
      >PRIVEXBOT</span>
    </div>
  );
}

// Lucide-style geometric icon helpers (1.5px stroke, inherits currentColor)
// We hand-roll a small set used in posts because we don't want a runtime dep.
function L({ d, size = 24, stroke = 1.5, style = {}, fill = 'none', ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor"
      strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', ...style }} {...rest}>
      {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
    </svg>
  );
}
// curated icon paths
const ICONS = {
  shield:    'M12 2 4 5v7c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V5l-8-3Z',
  lock:      ['M6 11V8a6 6 0 0 1 12 0v3', 'M4 11h16v10H4z'],
  key:       ['M14 7a4 4 0 1 1-3.8 5.2L4 18.5V21h2.5L8 19.5V18h1.5V16.5H11l1.2-1.2A4 4 0 0 1 14 7z'],
  bot:       ['M9 8h6a4 4 0 0 1 4 4v4a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4v-4a4 4 0 0 1 4-4z', 'M9 13h.01', 'M15 13h.01', 'M12 2v3', 'M3 12H1', 'M23 12h-2'],
  flow:      ['M5 5h4v4H5z', 'M15 15h4v4h-4z', 'M9 7h4a2 2 0 0 1 2 2v8', 'M19 7v8a2 2 0 0 1-2 2h-4'],
  zap:       'M13 2 3 14h8l-1 8 10-12h-8l1-8z',
  message:   ['M21 11.5a8.4 8.4 0 0 1-9 8.5l-5 2 2-5a8.4 8.4 0 0 1 12-12 8.4 8.4 0 0 1 4 4 8.4 8.4 0 0 1-4 2.5z'],
  check:     'M5 12l4 4 10-10',
  arrow:     ['M5 12h14', 'M13 5l7 7-7 7'],
  sparkle:   ['M12 3v18', 'M3 12h18', 'M6 6l12 12', 'M18 6 6 18'],
  database:  ['M12 3c4.4 0 8 1.3 8 3v12c0 1.7-3.6 3-8 3s-8-1.3-8-3V6c0-1.7 3.6-3 8-3z', 'M4 6c0 1.7 3.6 3 8 3s8-1.3 8-3', 'M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3'],
  globe:     ['M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z', 'M2 12h20', 'M12 2a14 14 0 0 1 0 20', 'M12 2a14 14 0 0 0 0 20'],
  code:      ['m7 8-4 4 4 4', 'm17 8 4 4-4 4', 'm14 4-4 16'],
  clock:     ['M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z', 'M12 7v5l3 2'],
  trend:     ['m3 17 6-6 4 4 8-8', 'M14 7h7v7'],
  users:     ['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', 'M22 21v-2a4 4 0 0 0-3-3.9', 'M16 3.1a4 4 0 0 1 0 7.8'],
  alert:     ['M12 3 2 21h20L12 3z', 'M12 10v5', 'M12 18h.01'],
  layers:    ['m12 2 9 5-9 5-9-5 9-5z', 'm3 12 9 5 9-5', 'm3 17 9 5 9-5'],
  rocket:    ['M4.5 16.5 3 21l4.5-1.5', 'M9 12s2-5 8-8c0 0-2 6-8 8z', 'M15 9s-1.5 4-5 5-4.5-2-4-5 4.5-7 9-7-2.5 5-5 9z', 'M14 14s2 3 0 5'],
  github:    'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22',
  play:      'M5 3l14 9-14 9V3z',
  pause:     ['M6 4h4v16H6z', 'M14 4h4v16h-4z'],
  external:  ['M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6', 'M15 3h6v6', 'M10 14 21 3'],
  terminal:  ['M4 17l6-6-6-6', 'M12 19h8'],
  book:      ['M2 3h7a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z', 'M22 3h-7a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h8z'],
  cpu:       ['M4 4h16v16H4z', 'M9 9h6v6H9z', 'M9 1v3', 'M15 1v3', 'M9 20v3', 'M15 20v3', 'M20 9h3', 'M20 14h3', 'M1 9h3', 'M1 14h3'],
};
function Ico({ name, size = 24, stroke = 1.5, style = {}, ...rest }) {
  return <L d={ICONS[name]} size={size} stroke={stroke} style={style} {...rest} />;
}

// Frame — a styled artboard root. Adds the lane bg + clip + relative positioning.
function Frame({ lane = 'lane-mono', width, height, children, style = {}, className = '' }) {
  return (
    <div
      className={`tmpl ${lane} ${className}`}
      style={{
        width,
        height,
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// Small watermark badge (used bottom-right on most templates for consistency)
function BrandStamp({ lane = 'mono', size = 'sm', position = 'br' }) {
  const colors = {
    mono: 'black',
    dark: 'white',
    light: 'indigo',
    editorial: 'black',
  };
  const sizes = { sm: { iconSize: 22, font: 13, gap: 8 }, md: { iconSize: 32, font: 17, gap: 10 }, lg: { iconSize: 44, font: 22, gap: 12 } };
  const s = sizes[size] || sizes.sm;
  const positions = {
    br: { right: 24, bottom: 24 },
    bl: { left: 24, bottom: 24 },
    tr: { right: 24, top: 24 },
    tl: { left: 24, top: 24 },
  };
  return (
    <div style={{ position: 'absolute', display: 'inline-flex', alignItems: 'center', gap: s.gap, ...positions[position] }}>
      <Icon color={colors[lane]} size={s.iconSize} />
      <span style={{
        fontFamily: 'Inter Tight, Inter, sans-serif',
        fontWeight: 800,
        fontSize: s.font,
        letterSpacing: '0.08em',
        color: colors[lane] === 'white' ? '#fff' : colors[lane] === 'indigo' ? COLORS.signal500 : COLORS.ink900,
      }}>PRIVEXBOT</span>
    </div>
  );
}

// DotGrid texture component
function DotGrid({ opacity = 0.05, spacing = 32, dotSize = 1, color = 'currentColor', style = {} }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `radial-gradient(circle, ${color} ${dotSize}px, transparent ${dotSize}px)`,
        backgroundSize: `${spacing}px ${spacing}px`,
        opacity,
        pointerEvents: 'none',
        ...style,
      }}
    />
  );
}

// Geometric "abstract photo" placeholder — used in editorial lane.
// Layered angled shapes in brand colors, evokes "infra/cryptography".
function AbstractCompute({ style = {}, lane = 'editorial' }) {
  const dark = lane === 'dark';
  return (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" style={{ display: 'block', ...style }}>
      <defs>
        <linearGradient id="ac-g1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={dark ? COLORS.signal700 : COLORS.signal500} />
          <stop offset="1" stopColor={dark ? COLORS.signal900 : COLORS.signal700} />
        </linearGradient>
        <linearGradient id="ac-g2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={dark ? COLORS.ink900 : COLORS.ink100} />
          <stop offset="1" stopColor={dark ? COLORS.ink800 : COLORS.ink75} />
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill={dark ? COLORS.ink950 : COLORS.ink50} />
      <rect width="800" height="600" fill="url(#ac-g2)" />
      <g opacity="0.85">
        <polygon points="0,420 320,260 580,400 800,300 800,600 0,600" fill="url(#ac-g1)" />
        <polygon points="0,540 220,460 480,520 800,470 800,600 0,600" fill={dark ? COLORS.signal800 : COLORS.signal600} opacity="0.85" />
      </g>
      <g opacity="0.55">
        <line x1="0" y1="140" x2="800" y2="100" stroke={dark ? COLORS.signal400 : COLORS.signal400} strokeWidth="1" />
        <line x1="0" y1="170" x2="800" y2="135" stroke={dark ? COLORS.signal400 : COLORS.signal400} strokeWidth="1" />
        <line x1="0" y1="200" x2="800" y2="170" stroke={dark ? COLORS.signal400 : COLORS.signal400} strokeWidth="1" opacity="0.6" />
      </g>
      <g opacity="0.7">
        <circle cx="640" cy="160" r="3" fill={dark ? COLORS.attestLight : COLORS.attest500} />
        <circle cx="120" cy="240" r="2" fill={dark ? COLORS.attestLight : COLORS.attest500} />
        <circle cx="380" cy="100" r="2" fill={dark ? COLORS.signal300 : COLORS.signal500} />
      </g>
    </svg>
  );
}

// Export to window for other component files
Object.assign(window, {
  COLORS, ICON, Icon, Wordmark, WordmarkStacked, Ico, L, ICONS, Frame, BrandStamp, DotGrid, AbstractCompute,
});
