# PrivexBot — Brand ID

The complete PrivexBot social brand kit, exported from the Claude Design project
*"privexbot brand identity and marketing system"* and packaged as a static site.
No build step: plain HTML + CSS + JSX compiled in the browser by Babel Standalone.

## Pages

| Page | What it is |
|---|---|
| `index.html` | **Brand kit canvas.** A pan/zoom Figma-style canvas with 11 sections and ~50 artboards: foundations (logo / color / type / voice), profile avatars, cover banners for every platform, 10 square feed posts, 5 vertical story formats, 8 in-platform profile mockups, 9 engagement posts, a 3-slide carousel, and 3 YouTube thumbnails. Drag artboards to reorder, double-click to focus, ⋯ menu to export PNG or HTML. |
| `editor.html` | **Post editor.** Pick one of ~30 templates, edit its text live in the right rail, export a full-resolution PNG. |
| `playbook.html` | **Social playbook.** 13 sections covering thesis, platform strategy, voice, visual system, palette, profile setup, content pillars, templates, vertical formats, captions, cadence, guardrails, and governance. |

## Layout

```
brand.css              design tokens (ink / signal / attest scales, type, radii) + lane classes
playbook.css           playbook document styles
design-canvas.jsx      the pan/zoom canvas (window.DesignCanvas / DCSection / DCArtboard)
tweaks-panel.jsx       reusable tweak-panel controls
components/*.jsx       all templates; each file assigns its components onto `window`
assets/*.png           logo colorways used by the templates
uploads/*.png          original source logo uploads (not referenced by any page)
vendor/*.js            React 18.3.1, ReactDOM 18.3.1, Babel Standalone 7.29.0, html-to-image 1.11.13
```

Component files are loaded as `<script type="text/babel" src="...">` **in order** —
each one depends on `window` globals assigned by the ones before it (`brand.jsx`
must come first; it defines `COLORS`, `Icon`, `Frame`, `Ico`, `DotGrid`). Do not add
`async` or `defer` to those tags, and do not reorder them.

## Run locally

Babel fetches the `.jsx` files over HTTP, so `file://` will not work:

```sh
python3 -m http.server 8080
# then open http://localhost:8080/index.html
```

## Deploy

```sh
vercel          # preview
vercel --prod   # production
```

`vercel.json` does three things: rewrites `/.design-canvas.state.json` to
`/dc-state.json` (dot-prefixed files are not reliably served, and the canvas
fetches that path on mount to restore saved artboard order and renames), serves
`.jsx` as `text/plain`, and sets long cache headers on `/vendor/*`. If you ever
change a vendored library, rename the file — the immutable cache header means
browsers will not re-fetch it otherwise.

## Fonts

`brand.css` pulls Inter, Inter Tight and JetBrains Mono from Google Fonts at
runtime. Self-host them if the deployment must work offline.
