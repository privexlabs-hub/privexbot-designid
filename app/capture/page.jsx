'use client';

import React, { Suspense } from 'react';
import TEMPLATES from '../editor/templates';
import { LaneOverrideProvider } from '@/components/brand';

/**
 * Deterministic single-artboard render, for regression capture.
 *
 * Not linked from the product — it exists so a screenshot harness has something
 * stable to point at. The editor stage fits the artboard to the viewport with a
 * ResizeObserver, so its transform settles a frame or two after mount; capturing
 * from it races, and a baseline taken at one preview scale against a run at
 * another makes every diff meaningless. Here the artboard is rendered at 1:1
 * with no transform and nothing else on the page.
 *
 *   /capture?t=<template id>[&lane=<lane class>]
 */
function CaptureInner() {
  const [tpl, setTpl] = React.useState(null);
  const [lane, setLane] = React.useState('');

  React.useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    setTpl(TEMPLATES.find((x) => x.id === q.get('t')) ?? null);
    setLane(q.get('lane') ?? '');
  }, []);

  if (!tpl) return <div id="capture-missing" style={{ padding: 24, fontFamily: 'monospace' }}>no such template</div>;
  const C = tpl.Component;
  return (
    <div
      id="capture-root"
      data-ready="1"
      style={{ width: tpl.w, height: tpl.h, overflow: 'hidden' }}
    >
      <LaneOverrideProvider lane={lane}>
        <C {...(tpl.preset || {})} />
      </LaneOverrideProvider>
    </div>
  );
}

export default function CapturePage() {
  return (
    <Suspense fallback={null}>
      <CaptureInner />
    </Suspense>
  );
}
