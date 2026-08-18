'use client';

import React, { useState, useEffect, useRef, useMemo, useLayoutEffect } from 'react';
import Link from 'next/link';
import JSZip from 'jszip';
import { exportNode, exportAndSave, getSharedFontCSS, saveBlob, settle, SCALES } from '@/lib/export-image';
import '@/styles/editor.css';

import { Icon, LaneOverrideProvider } from '@/components/brand';
import TEMPLATES from './templates';
import { LANES, ACCENTS, applyAccent } from './theme';

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
    window.history.replaceState(null, '', `?${q}`);
  }, [hydrated, activeId, lane, accent]);

  // Re-apply the accent after every render so React never leaves a stale colour.
  useLayoutEffect(() => {
    applyAccent(artboardRef.current?.querySelector('.artboard-export'), accent);
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
        setZipping({ done: i + 1, total: TEMPLATES.length, label: t.name });
      }
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
            <div
              className="artboard-export"
              style={{
                width: tpl.w,
                height: tpl.h,
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
                position: 'absolute',
                top: 0,
                left: 0,
              }}
            >
              <LaneOverrideProvider lane={lane}>
                {Component && <Component {...(tpl.preset || {})} {...props} />}
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
              </div>
            ),
          )}

          <button className="reset-btn" onClick={resetTemplate}>
            Reset this template
          </button>

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
