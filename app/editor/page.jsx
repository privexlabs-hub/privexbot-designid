'use client';

import React, { useState, useEffect, useRef, useMemo, useLayoutEffect } from 'react';
import Link from 'next/link';
import JSZip from 'jszip';
import { exportNode, exportAndSave, getSharedFontCSS, saveBlob, settle, SCALES } from '@/lib/export-image';
import '@/styles/editor.css';

import { Icon, LaneOverrideProvider } from '@/components/brand';
import TEMPLATES from './templates';
import { LANES, ACCENTS, applyAccent } from './theme';
import { LOCALES, DEFAULT_LOCALE, getLocale, localeContent } from './locales';
import { SCRIPTS, scriptProps, isolateLtrRuns } from '@/lib/scripts';
import { safeAreaFor, countFor, LIMITS, HASHTAG_NOTE, VERIFIED_ON } from '@/lib/platforms';

/**
 * A first-draft alt text for a template, from the copy actually on it. Not a
 * substitute for someone writing a good one — it is a starting point that makes
 * shipping *no* alt text the harder option.
 */
function altTextFor(tpl, values) {
  const prose = Object.entries(values)
    .filter(([, v]) => typeof v === 'string' && v.trim())
    .map(([, v]) => v.replace(/\s+/g, ' ').trim())
    .join(' — ');
  const base = `PrivexBot ${tpl.name.toLowerCase()}. ${prose}`;
  return base.length > 900 ? `${base.slice(0, 897)}...` : base;
}

/** Build the default content map, keyed by template id. */
function defaultContent() {
  const map = {};
  TEMPLATES.forEach((t) => {
    map[t.id] = {};
    (t.fields || []).forEach((f) => {
      map[t.id][f.k] = Array.isArray(f.def) ? f.def.map((r) => ({ ...r })) : f.def;
    });
  });
  return map;
}

/**
 * Character counts for a field, against the limits of the platforms this copy
 * plausibly lands on. Counted the way each platform counts — X weights CJK and
 * emoji as 2 and every URL as 23; YouTube descriptions are byte-counted — so a
 * single `.length` would be wrong for most of them.
 */
function FieldCount({ value }) {
  const text = typeof value === 'string' ? value : '';
  if (!text) return null;
  const shown = ['X · Post', 'Instagram · Caption (feed & Reels)', 'LinkedIn · Post'];
  const rows = LIMITS.filter((l) => shown.includes(`${l.platform} · ${l.field}`)).map((l) => {
    const n = countFor(text, l.counting);
    return { key: l.platform, n, max: l.max, over: n > l.max };
  });
  return (
    <div className="char-count">
      {rows.map((r) => (
        <span key={r.key} className={r.over ? 'over' : undefined}
              title={`${r.n} of ${r.max} — limits verified ${VERIFIED_ON}`}>
          {r.key} {r.n}/{r.max}
        </span>
      ))}
    </div>
  );
}

/** Repeating-row control, for the array-shaped props (rows, examples). */
function RowsField({ field, value, onChange }) {
  const rows = value || [];
  const setCell = (i, k, v) =>
    onChange(rows.map((r, j) => (j === i ? { ...r, [k]: v } : r)));
  const addRow = () =>
    onChange([...rows, Object.fromEntries(field.cols.map((c) => [c.k, '']))]);
  const removeRow = (i) => onChange(rows.filter((_, j) => j !== i));

  return (
    <div className="rows-field">
      {rows.map((row, i) => (
        <div className="rows-row" key={i}>
          {field.cols.map((c) => (
            <input
              key={c.k}
              type="text"
              aria-label={c.label}
              placeholder={c.label}
              style={c.w ? { flex: `0 0 ${c.w}px` } : undefined}
              value={row[c.k] ?? ''}
              onChange={(e) => setCell(i, c.k, e.target.value)}
            />
          ))}
          <button
            type="button"
            className="rows-del"
            title="Remove row"
            onClick={() => removeRow(i)}
          >
            ×
          </button>
        </div>
      ))}
      <button type="button" className="rows-add" onClick={addRow}>
        + Add row
      </button>
    </div>
  );
}

/** Parse the shareable view state out of a query string, ignoring anything
 *  that no longer exists so a stale link degrades instead of breaking. */
function readUrl(search) {
  const q = new URLSearchParams(search);
  const t = q.get('t');
  const lane = q.get('lane');
  const accent = q.get('accent');
  return {
    activeId: TEMPLATES.some((x) => x.id === t) ? t : null,
    lane: LANES.some((l) => l.id === lane) ? lane : null,
    accent: ACCENTS.some((a) => a.id === accent) ? accent : null,
    locale: LOCALES.some((l) => l.code === q.get('locale')) ? q.get('locale') : null,
  };
}

export default function EditorPage() {
  const [activeId, setActiveId] = useState(TEMPLATES[0].id);
  const [content, setContent] = useState(defaultContent);
  const [lane, setLane] = useState('');
  const [accent, setAccent] = useState('');
  // The page is prerendered, so the URL cannot be read during render — the
  // server has no query string and the markup would not match on hydration
  // (React #418). Read it once after mount instead.
  const [hydrated, setHydrated] = useState(false);
  const [locale, setLocale] = useState(DEFAULT_LOCALE);
  const [overflow, setOverflow] = useState([]);
  const [showSafe, setShowSafe] = useState(false);
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [zipping, setZipping] = useState(null); // { done, total, label } | null
  const [exportScale, setExportScale] = useState(1); // 1x is already full resolution
  const [scaleNote, setScaleNote] = useState(null); // set when the browser forced a smaller canvas

  const artboardRef = useRef(null);
  const stageRef = useRef(null);
  const batchRef = useRef(null);
  const exportPngRef = useRef(null);
  const downloadAllRef = useRef(null);
  const [scale, setScale] = useState(0.5);

  const tpl = TEMPLATES.find((t) => t.id === activeId);
  const Component = tpl?.Component;
  const props = content[activeId] || {};

  const loc = getLocale(locale);
  const script = scriptProps(loc.script, loc.code);
  // Bidi: @handles, URLs and number ranges take direction from their neighbours,
  // so inside an RTL run they scramble. Isolate them before they reach a template.
  const localisedProps = useMemo(() => {
    if (script.dir !== 'rtl') return props;
    const out = {};
    for (const [k, v] of Object.entries(props)) {
      out[k] = typeof v === 'string' ? isolateLtrRuns(v, 'rtl') : v;
    }
    return out;
  }, [props, script.dir]);

  const safeArea = tpl ? safeAreaFor(tpl.w, tpl.h) : null;
  const coverage = tpl ? localeContent(locale, tpl.id, tpl.fields) : { translated: 0, total: 0 };

  // Fit-to-screen
  useEffect(() => {
    if (!stageRef.current || !tpl) return undefined;
    const calc = () => {
      const stage = stageRef.current;
      if (!stage) return;
      const pad = 80;
      setScale(
        Math.min(
          (stage.clientWidth - pad * 2) / tpl.w,
          (stage.clientHeight - pad * 2) / tpl.h,
          1,
        ),
      );
    };
    calc();
    const ro = new ResizeObserver(calc);
    ro.observe(stageRef.current);
    return () => ro.disconnect();
  }, [activeId, tpl]);

  useEffect(() => {
    const u = readUrl(window.location.search);
    if (u.activeId) setActiveId(u.activeId);
    if (u.lane) setLane(u.lane);
    if (u.accent) setAccent(u.accent);
    if (u.locale) setLocale(u.locale);
    setHydrated(true);
  }, []);

  // Mirror the view back into the query string. replaceState, not push — moving
  // through templates should not fill the back button with 40 entries. Gated on
  // `hydrated` so the initial default state cannot overwrite an incoming link
  // before it has been read.
  useEffect(() => {
    if (!hydrated) return;
    const q = new URLSearchParams();
    q.set('t', activeId);
    if (lane) q.set('lane', lane);
    if (accent) q.set('accent', accent);
    if (locale !== DEFAULT_LOCALE) q.set('locale', locale);
    window.history.replaceState(null, '', `?${q}`);
  }, [hydrated, activeId, lane, accent, locale]);

  // Re-apply the accent after every render so React never leaves a stale colour.
  useLayoutEffect(() => {
    applyAccent(artboardRef.current?.querySelector('.artboard-export'), accent);
  });

  // Overflow detection. Artboards are fixed-size and translated copy is not:
  // per the IBM/W3C expansion table a string of 10 characters or fewer can grow
  // 200-300% once translated, so badges and headlines are what break, not
  // paragraphs. Measure after layout and warn — never silently ship a clipped PNG.
  useLayoutEffect(() => {
    const root = artboardRef.current?.querySelector('.artboard-export');
    if (!root) return;
    const id = requestAnimationFrame(() => {
      const hits = [];
      for (const el of root.querySelectorAll('*')) {
        if (!el.childNodes.length) continue;
        const overX = el.scrollWidth - el.clientWidth;
        const overY = el.scrollHeight - el.clientHeight;
        // 1px of rounding is not an overflow; clipped containers report their own.
        if ((overX > 1 || overY > 1) && getComputedStyle(el).overflow !== 'visible') {
          const text = (el.textContent || '').trim().slice(0, 40);
          if (text) hits.push({ text, overX, overY });
        }
      }
      setOverflow(hits.slice(0, 4));
    });
    return () => cancelAnimationFrame(id);
  });

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return TEMPLATES;
    return TEMPLATES.filter((t) =>
      `${t.name} ${t.group} ${t.id}`.toLowerCase().includes(q),
    );
  }, [query]);

  const grouped = useMemo(() => {
    const g = {};
    matches.forEach((t) => {
      (g[t.group] = g[t.group] || []).push(t);
    });
    return g;
  }, [matches]);

  // Shortcuts. Deliberately few: export, batch export, and stepping through
  // templates. Ignored while typing so they never eat a character.
  useEffect(() => {
    const onKey = (e) => {
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) || e.target.isContentEditable;
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key.toLowerCase() === 'e') {
        e.preventDefault();
        (e.shiftKey ? downloadAllRef : exportPngRef).current?.();
        return;
      }
      if (typing || mod || e.altKey) return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const list = matches.length ? matches : TEMPLATES;
        const i = list.findIndex((t) => t.id === activeId);
        const next = list[(i + (e.key === 'ArrowDown' ? 1 : -1) + list.length) % list.length];
        if (next) setActiveId(next.id);
      }
      if (e.key === '/') {
        e.preventDefault();
        document.getElementById('tmpl-search')?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeId, matches]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked — the URL bar already shows the same link */
    }
  };

  // Changing locale reloads every template's copy from the pack, English-backfilled.
  useEffect(() => {
    setContent(() => {
      const map = {};
      TEMPLATES.forEach((t) => {
        map[t.id] = localeContent(locale, t.id, t.fields).values;
      });
      return map;
    });
  }, [locale]);

  const updateField = (k, v) =>
    setContent((c) => ({ ...c, [activeId]: { ...c[activeId], [k]: v } }));

  const resetTemplate = () =>
    setContent((c) => ({ ...c, [activeId]: defaultContent()[activeId] }));

  const exportPng = async () => {
    const node = artboardRef.current?.querySelector('.artboard-export');
    if (!node) return;
    setExporting(true);
    setScaleNote(null);
    try {
      await exportAndSave(node, {
        filename: `privexbot-${tpl.id}${exportScale > 1 ? `@${exportScale}x` : ''}.png`,
        width: tpl.w,
        height: tpl.h,
        scale: exportScale,
        onScale: ({ scale: used, clamped }) =>
          clamped &&
          setScaleNote(
            `This browser could not allocate a ${tpl.w * exportScale}x${tpl.h * exportScale} canvas, ` +
              `so the export was rendered at ${used}x instead of ${exportScale}x.`,
          ),
      });
    } catch (e) {
      console.error('Export failed', e);
      alert('Export failed: ' + e.message);
    } finally {
      setExporting(false);
    }
  };

  /**
   * Render every template off-screen one at a time and collect the PNGs into a
   * single ZIP. Strictly sequential — a 1080x1920 capture is a large canvas and
   * running these concurrently exhausts memory (mobile Safari especially).
   */
  const downloadAll = async () => {
    const host = batchRef.current;
    if (!host) return;
    const { createRoot } = await import('react-dom/client');
    const zip = new JSZip();
    let fontCSS;
    const altRows = [['file', 'template', 'size', 'suggested alt text']];
    setZipping({ done: 0, total: TEMPLATES.length, label: '' });
    const root = createRoot(host);
    try {
      for (let i = 0; i < TEMPLATES.length; i++) {
        const t = TEMPLATES[i];
        setZipping({ done: i, total: TEMPLATES.length, label: t.name });
        const C = t.Component;
        // Mount, let the browser lay it out and settle fonts, then capture.
        await new Promise((res) => {
          root.render(
            <LaneOverrideProvider lane={lane}>
              <div
                className="artboard-export"
                style={{ width: t.w, height: t.h }}
                ref={() => {}}
              >
                <C {...(t.preset || {})} {...(content[t.id] || {})} />
              </div>
            </LaneOverrideProvider>,
          );
          requestAnimationFrame(() => requestAnimationFrame(res));
        });
        const node = host.querySelector('.artboard-export');
        applyAccent(node, accent);
        await settle();
        // Font CSS is identical for every artboard and expensive to build
        // (it fetches and base64-inlines each face) — compute it once.
        if (!fontCSS) fontCSS = await getSharedFontCSS(node);
        const blob = await exportNode(node, {
          width: t.w,
          height: t.h,
          scale: exportScale,
          fontEmbedCSS: fontCSS,
        });
        zip.file(`privexbot-${t.id}.png`, blob);
        // Alt text travels with the image. Canva drops alt text on PNG export
        // entirely and no brand portal surveyed ships it at all, yet every
        // platform wants it and it is the accessibility step most often skipped.
        // A sidecar means whoever posts the image already has the text.
        altRows.push([t.id, t.name, `${t.w}x${t.h}`, altTextFor(t, content[t.id] || {})]);
        setZipping({ done: i + 1, total: TEMPLATES.length, label: t.name });
      }
      zip.file(
        'alt-text.csv',
        altRows
          .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(','))
          .join('\n'),
      );
      saveBlob(await zip.generateAsync({ type: 'blob' }), 'privexbot-brand-kit.zip');
    } catch (e) {
      console.error('ZIP export failed', e);
      alert('ZIP export failed: ' + e.message);
    } finally {
      root.unmount();
      setZipping(null);
    }
  };

  exportPngRef.current = exportPng;
  downloadAllRef.current = downloadAll;

  const pct = zipping ? Math.round((zipping.done / zipping.total) * 100) : 0;

  return (
    <div className="edroot">
      <div className="editor">
        {/* ── Template picker ─────────────────────────────────────── */}
        <aside className="picker">
          <h1>
            <Icon color="white" size={22} />
            <span>Post editor</span>
          </h1>
          <p className="tagline">Pick a template. Edit text. Export PNG.</p>

          <input
            id="tmpl-search"
            className="tmpl-search"
            type="search"
            placeholder="Search templates…  (/)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <div className="search-count">
              {matches.length} of {TEMPLATES.length}
            </div>
          )}

          {Object.entries(grouped).map(([group, items]) => (
            <div key={group}>
              <div className="group-label">{group}</div>
              {items.map((t) => (
                <button
                  key={t.id}
                  className={`tmpl-btn ${activeId === t.id ? 'active' : ''}`}
                  onClick={() => setActiveId(t.id)}
                >
                  <span className="dot" style={{ background: t.dot }} />
                  <span>{t.name}</span>
                </button>
              ))}
            </div>
          ))}

          {!matches.length && (
            <div className="search-empty">No template matches “{query}”.</div>
          )}

          <Link className="kit-link" href="/">
            ← Back to full brand kit
          </Link>
        </aside>

        {/* ── Stage ───────────────────────────────────────────────── */}
        <div className="stage" ref={stageRef}>
          <div className="stage-meta">
            <span className="live-dot" />
            <span>{tpl.name}</span>
            <span style={{ color: '#5A6172' }}>·</span>
            <span style={{ color: '#5A6172' }}>
              {tpl.w} × {tpl.h}
            </span>
            <span style={{ color: '#5A6172' }}>·</span>
            <span style={{ color: '#5A6172' }}>{Math.round(scale * 100)}%</span>
          </div>

          <div
            ref={artboardRef}
            style={{ width: tpl.w * scale, height: tpl.h * scale, position: 'relative' }}
          >
            {showSafe && safeArea && (
              /* Deliberately a sibling of .artboard-export, not a child — the
                 exporters capture that node, and a guide must never be baked
                 into the PNG. */
              <div
                className="safe-overlay"
                style={{
                  left: safeArea.x * scale,
                  top: safeArea.y * scale,
                  width: safeArea.width * scale,
                  height: safeArea.height * scale,
                }}
              >
                <span>
                  {safeArea.width}×{safeArea.height} safe
                </span>
              </div>
            )}
            <div
              /* Remount on every template change. applyAccent caches each
                 element's original style; once many templates render as the
                 same archetype React reconciles instead of remounting, the DOM
                 nodes survive the switch, and the cache would restore the
                 previous template's colours. */
              key={tpl.id}
              className="artboard-export"
              lang={script.lang}
              dir={script.dir}
              style={{
                width: tpl.w,
                height: tpl.h,
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
                position: 'absolute',
                top: 0,
                left: 0,
                ...script.style,
              }}
            >
              <LaneOverrideProvider lane={lane}>
                {Component && <Component {...(tpl.preset || {})} {...localisedProps} />}
              </LaneOverrideProvider>
            </div>
          </div>
        </div>

        {/* ── Controls ────────────────────────────────────────────── */}
        <aside className="controls">
          <div className="controls-head">
            <h2>Edit</h2>
            <button className="copy-link" onClick={copyLink} title="Copy a link to exactly this view">
              {copied ? '✓ Copied' : 'Copy link'}
            </button>
          </div>
          <p className="sub">
            Changes preview live. Export at full {tpl.w}×{tpl.h}.
          </p>

          <div className="ctrl-group">
            <div className="ctrl-label">Language</div>
            <select
              className="locale-select"
              value={locale}
              onChange={(e) => setLocale(e.target.value)}
            >
              {LOCALES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.label} ({l.code})
                </option>
              ))}
            </select>
            {locale !== DEFAULT_LOCALE && (
              <div className="locale-status">
                <span className="locale-badge">unreviewed</span>
                {coverage.translated}/{coverage.total} fields translated
                {coverage.translated < coverage.total && ' · rest shown in English'}
              </div>
            )}
            {loc.status === 'needs-native-review' && (
              <div className="locale-note">
                Machine-assisted copy. Not signed off by a native brand-voice reviewer.
              </div>
            )}
          </div>

          {!!overflow.length && (
            <div className="overflow-warn">
              <strong>Text overflows its box</strong>
              <ul>
                {overflow.map((o, i) => (
                  <li key={i}>
                    “{o.text}{o.text.length >= 40 ? '…' : ''}”
                    {o.overY > 1 ? ` +${o.overY}px tall` : ''}
                    {o.overX > 1 ? ` +${o.overX}px wide` : ''}
                  </li>
                ))}
              </ul>
              Shorten the copy, or export anyway and accept the clipping.
            </div>
          )}

          <div className="ctrl-group">
            <div className="ctrl-label">Lane</div>
            <div className="seg">
              {LANES.map((l) => (
                <button
                  key={l.id}
                  className={lane === l.id ? 'on' : ''}
                  onClick={() => setLane(l.id)}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          <div className="ctrl-group">
            <div className="ctrl-label">Accent</div>
            <div className="swatches">
              {ACCENTS.map((a) => (
                <button
                  key={a.id}
                  className={`swatch ${accent === a.id ? 'active' : ''}`}
                  style={{ background: a.swatch }}
                  title={a.label}
                  aria-label={a.label}
                  onClick={() => setAccent(a.id)}
                />
              ))}
            </div>
          </div>

          <div className="ctrl-divider" />

          {(tpl.fields || []).map((f) =>
            f.type === 'rows' ? (
              <div key={f.k} className="ctrl ctrl-group">
                <div className="ctrl-label">{f.label}</div>
                <RowsField
                  field={f}
                  value={props[f.k]}
                  onChange={(v) => updateField(f.k, v)}
                />
              </div>
            ) : (
              <div key={f.k} className="ctrl ctrl-group">
                <div className="ctrl-label">{f.label}</div>
                {f.type === 'textarea' ? (
                  <textarea
                    rows={3}
                    value={props[f.k] ?? ''}
                    onChange={(e) => updateField(f.k, e.target.value)}
                  />
                ) : (
                  <input
                    type="text"
                    value={props[f.k] ?? ''}
                    onChange={(e) => updateField(f.k, e.target.value)}
                  />
                )}
                <FieldCount value={props[f.k]} />
              </div>
            ),
          )}

          <button className="reset-btn" onClick={resetTemplate}>
            Reset this template
          </button>

          {safeArea && (
            <label className="safe-toggle">
              <input
                type="checkbox"
                checked={showSafe}
                onChange={(e) => setShowSafe(e.target.checked)}
              />
              <span>
                Show safe area
                <em>{safeArea.source}</em>
              </span>
            </label>
          )}

          <div className="ctrl-group">
            <div className="ctrl-label">Export scale</div>
            <div className="seg">
              {SCALES.map((s) => (
                <button
                  key={s}
                  className={exportScale === s ? 'on' : ''}
                  onClick={() => {
                    setExportScale(s);
                    setScaleNote(null);
                  }}
                  title={`${tpl.w * s} × ${tpl.h * s} px`}
                >
                  {s}×
                </button>
              ))}
            </div>
            <div className="scale-hint">
              {tpl.w * exportScale} × {tpl.h * exportScale} px
              {exportScale === 1 ? ' · native' : ''}
            </div>
            {scaleNote && <div className="scale-warn">{scaleNote}</div>}
          </div>

          <button className="export-btn" onClick={exportPng} disabled={exporting || !!zipping}>
            {exporting ? 'Exporting…' : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Export PNG
              </>
            )}
          </button>

          <button className="zip-btn" onClick={downloadAll} disabled={!!zipping || exporting}>
            {zipping ? `Rendering ${zipping.done}/${zipping.total}…` : `Download all ${TEMPLATES.length} as ZIP`}
          </button>
          {zipping && (
            <div className="zip-progress">
              <div className="zip-bar">
                <span style={{ width: `${pct}%` }} />
              </div>
              <div className="zip-label">{zipping.label}</div>
            </div>
          )}
        </aside>
      </div>

      {/* Off-screen host used only by the ZIP export. Kept in the layout (not
          display:none) because html-to-image cannot measure a hidden subtree. */}
      <div ref={batchRef} className="batch-host" aria-hidden="true" />
    </div>
  );
}
