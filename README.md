# PrivexBot — Brand ID

The complete PrivexBot social brand kit as a Next.js app: a pan/zoom brand-kit
canvas, a post editor with PNG/ZIP export, and the social playbook.

```sh
npm install
npm run dev      # http://localhost:3000
npm run build && npm run start
```

Deploy to Vercel with `vercel` (zero config — it detects Next.js).

## Routes

| Route | What it is |
|---|---|
| `/` | **Brand kit canvas.** 10 sections, ~50 artboards: foundations (logo / colour / type / voice), profile avatars, cover banners, 10 square feed posts, 5 vertical formats, 8 in-platform profile mockups, 9 engagement posts, a 3-slide carousel, 3 YouTube thumbnails. Drag artboards to reorder, click a label to focus, ⋯ → Download PNG/HTML. |
| `/editor` | **Post editor.** 30 templates. Edit every field live, switch visual lane and accent colour, export one PNG or all 30 as a ZIP. |
| `/playbook` | **Social playbook.** 13 sections, §01 Thesis → §13 Governance. |

## Layout

```
app/
  layout.jsx            fonts + brand.css, applies to every route
  page.jsx              canvas route — loads canvas-view via dynamic(ssr:false)
  canvas-view.jsx       the DCSection / DCArtboard tree
  editor/page.jsx       editor UI
  editor/templates.js   the 30-template catalog (component + fields per entry)
  editor/theme.js       lane list, accent list, accent recolouring
  playbook/page.jsx     playbook route + scroll-spy
  playbook/playbook-html.js   the playbook markup
components/             brand primitives + all 30 templates
lib/design-canvas.jsx   pan/zoom canvas, focus overlay, per-artboard export
lib/tweaks-panel.jsx    tweak-panel controls
styles/                 fonts.css, brand.css, playbook.css, editor.css
public/assets           logo colourways used by the templates
public/uploads          original source logo uploads (unreferenced)
public/fonts            self-hosted Inter / Inter Tight / JetBrains Mono
_source/                the original static download, untouched, for diffing
```

## Things worth knowing before you change something

**Fonts are self-hosted on purpose.** `styles/fonts.css` serves Inter, Inter
Tight and JetBrains Mono from `public/fonts`. Both PNG exporters inline
`@font-face` rules by reading `document.styleSheets`, and a cross-origin Google
Fonts sheet throws `SecurityError` on `.cssRules` — which silently dropped the
fonts from exported images. Keep them same-origin. `next/font` is deliberately
not used: ~40 components reference the literal family names inline, and
`next/font` generates its own names that would not match.

**`styles/playbook.css` and `styles/editor.css` are scoped.** Every selector is
prefixed with `.pbroot` / `.edroot`, and the originals' `html`/`body`/`*` rules
retarget that wrapper. App Router keeps a route's stylesheet attached after a
client-side navigation, so unscoped `body` and `h1` rules would bleed onto the
other routes. Rule bodies are otherwise unchanged from `_source/`.

**Asset paths must stay root-absolute** (`/assets/…`). Relative paths resolve
against the current route, so `assets/icon.png` 404s under `/editor`. This also
means the app assumes no `basePath` is set in `next.config.mjs`.

**The canvas is client-only.** It reads `location.pathname`, `localStorage` and
`window.parent` during render, so `app/page.jsx` loads it through
`dynamic(..., { ssr: false })`. The `typeof document !== 'undefined'` guard on
the module-scope style injection in `lib/design-canvas.jsx` is still required —
the module is evaluated on the server even though the component is not rendered
there. Don't remove it.

**Lane switching goes through one component.** `Frame` in `components/brand.jsx`
consumes `LaneOverrideContext`; because every template renders through `Frame`,
overriding there re-lanes all 30 without threading a prop through each one.
Accent switching instead rewrites inline colours on the rendered DOM
(`app/editor/theme.js`), since templates hardcode `COLORS.signal500` inline.
It caches each element's original style, so clearing the accent restores the
template byte-for-byte.

**The ZIP export is sequential by design.** Captures run one at a time — a
1080×1920 artboard is a large canvas and running these concurrently exhausts
memory, especially on mobile Safari. All 30 take about 10 seconds.
