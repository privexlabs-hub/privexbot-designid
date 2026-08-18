'use client';

import React from 'react';
import '@/styles/playbook.css';
import playbookHtml from './playbook-html';

export default function PlaybookPage() {
  const ref = React.useRef(null);

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

  return (
    <div className="pbroot" ref={ref} dangerouslySetInnerHTML={{ __html: playbookHtml }} />
  );
}
