'use client';

import React, { useState, useEffect, useRef, useMemo, useLayoutEffect } from 'react';
import Link from 'next/link';
import * as htmlToImage from 'html-to-image';
import JSZip from 'jszip';
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

export default function EditorPage() {
  const [activeId, setActiveId] = useState(TEMPLATES[0].id);
  const [content, setContent] = useState(defaultContent);
  const [lane, setLane] = useState('');
  const [accent, setAccent] = useState('');
  const [exporting, setExporting] = useState(false);
  const [zipping, setZipping] = useState(null); // { done, total, label } | null

  const artboardRef = useRef(null);
  const stageRef = useRef(null);
  const batchRef = useRef(null);
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

  // Re-apply the accent after every render so React never leaves a stale colour.
  useLayoutEffect(() => {
    applyAccent(artboardRef.current?.querySelector('.artboard-export'), accent);
  });

  const grouped = useMemo(() => {
    const g = {};
    TEMPLATES.forEach((t) => {
      (g[t.group] = g[t.group] || []).push(t);
    });
    return g;
  }, []);

  const updateField = (k, v) =>
    setContent((c) => ({ ...c, [activeId]: { ...c[activeId], [k]: v } }));

  const resetTemplate = () =>
    setContent((c) => ({ ...c, [activeId]: defaultContent()[activeId] }));

  /** Capture one already-mounted node at its native size. */
  const capture = (node, t) =>
    htmlToImage.toPng(node, { pixelRatio: 1, cacheBust: true, width: t.w, height: t.h });

  const exportPng = async () => {
    const node = artboardRef.current?.querySelector('.artboard-export');
    if (!node) return;
    setExporting(true);
    try {
      const dataUrl = await capture(node, tpl);
      const a = document.createElement('a');
      a.download = `privexbot-${tpl.id}.png`;
      a.href = dataUrl;
      a.click();
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
                <C {...(content[t.id] || {})} />
              </div>
            </LaneOverrideProvider>,
          );
          requestAnimationFrame(() => requestAnimationFrame(res));
        });
        const node = host.querySelector('.artboard-export');
        applyAccent(node, accent);
        try { await document.fonts.ready; } catch { /* not fatal */ }
        const dataUrl = await capture(node, t);
        zip.file(`privexbot-${t.id}.png`, dataUrl.split(',')[1], { base64: true });
        setZipping({ done: i + 1, total: TEMPLATES.length, label: t.name });
      }
      const blob = await zip.generateAsync({ type: 'blob' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'privexbot-brand-kit.zip';
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    } catch (e) {
      console.error('ZIP export failed', e);
      alert('ZIP export failed: ' + e.message);
    } finally {
      root.unmount();
      setZipping(null);
    }
  };

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
                {Component && <Component {...props} />}
              </LaneOverrideProvider>
            </div>
          </div>
        </div>

        {/* ── Controls ────────────────────────────────────────────── */}
        <aside className="controls">
          <h2>Edit</h2>
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
