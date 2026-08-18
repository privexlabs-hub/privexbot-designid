'use client';

import React from 'react';
import '@/styles/playbook.css';
import playbookHtml from './playbook-html';
import { addCopyButtons, buildSearchIndex, searchIndex } from './enhance';

export default function PlaybookPage() {
  const ref = React.useRef(null);
  const indexRef = React.useRef([]);
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState(null);

  // Ported verbatim from the inline <script> at the bottom of the original
  // playbook.html — innerHTML never executes embedded scripts, so the
  // active-link scroll-spy has to run here instead.
  React.useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const navLinks = root.querySelectorAll('.nav a[href^="#"]');
    const sections = [...root.querySelectorAll('section.section')].filter((s) => s.id);
    const linkById = {};
    navLinks.forEach((a) => {
      linkById[a.getAttribute('href').slice(1)] = a;
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const link = linkById[e.target.id];
          if (!link) return;
          if (e.isIntersecting) {
            navLinks.forEach((a) => a.classList.remove('active'));
            link.classList.add('active');
          }
        });
      },
      { rootMargin: '-30% 0% -60% 0%', threshold: 0 },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Progressive enhancement: copy affordances and a search index over the
  // rendered document. Both operate on the DOM because the markup is injected
  // verbatim and cannot be composed of React components.
  React.useEffect(() => {
    const root = ref.current;
    if (!root) return;
    addCopyButtons(root);
    indexRef.current = buildSearchIndex(root);
  }, []);

  React.useEffect(() => {
    setResults(searchIndex(indexRef.current, query));
  }, [query]);

  const goto = (id) => {
    setQuery('');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="pbroot" ref={ref}>
      <div className="pb-search">
        <input
          type="search"
          value={query}
          placeholder="Search the playbook…"
          aria-label="Search the playbook"
          onChange={(e) => setQuery(e.target.value)}
        />
        {results && (
          <div className="pb-results">
            {results.length === 0 ? (
              <div className="pb-noresult">No section mentions “{query}”.</div>
            ) : (
              results.map((r) => (
                <button key={r.id} type="button" onClick={() => goto(r.id)}>
                  <span className="pb-r-num">{r.num}</span>
                  <span className="pb-r-title">{r.title}</span>
                  <span className="pb-r-hits">
                    {r.hits} match{r.hits === 1 ? '' : 'es'}
                  </span>
                  <span className="pb-r-snip">{r.snippet}</span>
                </button>
              ))
            )}
          </div>
        )}
      </div>
      {/* Safe by construction: playbookHtml is a build-time constant imported
          from this repo (extracted from our own design source), never user
          input and never fetched at runtime. There is no untrusted path into
          it, so sanitising would only risk mangling the verbatim markup. */}
      <div dangerouslySetInnerHTML={{ __html: playbookHtml }} />
    </div>
  );
}
