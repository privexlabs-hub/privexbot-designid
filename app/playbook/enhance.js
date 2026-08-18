'use client';

/**
 * Progressive enhancement over the verbatim playbook markup.
 *
 * The document is injected with dangerouslySetInnerHTML to stay byte-identical
 * to the source, so nothing in it can be a React component. Everything here
 * therefore works by walking the rendered DOM after mount — which also means
 * the playbook still reads fine with JavaScript off.
 */

/**
 * Block-level copy targets — verified against the actual markup rather than
 * assumed: the caption formula, each hashtag set, and each reference table.
 * (Bios live in the canvas BioReference artboard, not in this document.)
 */
const COPYABLE = [
  { sel: '.formula', pick: (el) => el.querySelector('.lines') ?? el },
  { sel: '.hash-grid .v', pick: (el) => el },
  { sel: 'table.std', pick: (el) => el, asTable: true },
];

function textOf(el, asTable) {
  if (asTable) {
    // Tables copy as TSV so they paste straight into a spreadsheet.
    return [...el.querySelectorAll('tr')]
      .map((tr) =>
        [...tr.querySelectorAll('th,td')]
          .map((c) => (c.innerText ?? c.textContent ?? '').replace(/\s+/g, ' ').trim())
          .join('\t'),
      )
      .join('\n');
  }
  return (el.innerText ?? el.textContent ?? '').replace(/\u00a0/g, ' ').trim();
}

function addCopyButton(host, source, asTable) {
  if (!host || host.dataset.pbCopy) return;
  const text = textOf(source, asTable);
  if (text.length < 8) return; // not worth a button
  host.dataset.pbCopy = '1';
  host.classList.add('pb-copyable');

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'pb-copy';
  btn.textContent = 'Copy';
  btn.setAttribute('aria-label', 'Copy to clipboard');
  btn.addEventListener('click', async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(textOf(source, asTable));
      btn.textContent = 'Copied';
      btn.classList.add('is-copied');
    } catch {
      btn.textContent = 'Press ⌘C';
      const r = document.createRange();
      r.selectNodeContents(source);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(r);
    }
    setTimeout(() => {
      btn.textContent = 'Copy';
      btn.classList.remove('is-copied');
    }, 1600);
  });
  host.appendChild(btn);
}

/** Attach copy buttons. Returns how many were added. */
export function addCopyButtons(root) {
  let n = 0;
  for (const { sel, pick, asTable } of COPYABLE) {
    for (const el of root.querySelectorAll(sel)) {
      const source = pick(el);
      if (!source) continue;
      const before = el.dataset.pbCopy;
      addCopyButton(el, source, asTable);
      if (!before && el.dataset.pbCopy) n++;
    }
  }
  // Inline <code> gets click-to-copy instead of a button — 76 buttons would be
  // noise, but the values (handles, URLs, node ids) are exactly what gets pasted.
  for (const code of root.querySelectorAll('code')) {
    if (code.dataset.pbCopy) continue;
    const text = (code.textContent || '').trim();
    if (text.length < 3) continue;
    code.dataset.pbCopy = '1';
    code.classList.add('pb-code-copy');
    code.title = 'Click to copy';
    code.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(text);
        code.classList.add('is-copied');
        setTimeout(() => code.classList.remove('is-copied'), 1200);
      } catch { /* clipboard blocked */ }
    });
    n++;
  }
  return n;
}

/**
 * Client-side search. The playbook is one static document, so a substring scan
 * over section text is enough — no index, no library, no build step.
 */
export function buildSearchIndex(root) {
  return [...root.querySelectorAll('section.section')].map((sec) => ({
    id: sec.id,
    title: sec.querySelector('h2')?.textContent?.trim() ?? sec.id,
    num: sec.querySelector('.section-num')?.textContent?.trim() ?? '',
    text: (sec.innerText ?? sec.textContent ?? '').toLowerCase(),
    el: sec,
  }));
}

export function searchIndex(index, query) {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return null;
  return index
    .map((s) => {
      const hits = s.text.split(q).length - 1;
      if (!hits) return null;
      const at = s.text.indexOf(q);
      const from = Math.max(0, at - 60);
      return {
        ...s,
        hits,
        snippet:
          (from ? '…' : '') + s.text.slice(from, at + q.length + 80).trim() + '…',
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.hits - a.hits);
}
