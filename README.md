# PrivexBot — Brand ID

The complete PrivexBot social brand kit as a Next.js app: a pan/zoom brand-kit
canvas, a post editor with PNG/ZIP export, and the social playbook.

```sh
npm install
npm run dev              # http://localhost:3000
npm run build && npm run start

npm run tokens           # regenerate everything from tokens/brand.tokens.json
npm run locales          # re-extract content/locales/en.json from the templates
npm run check:contrast   # WCAG 2.2 gate over the pairings the design relies on
npm run llms             # regenerate public/llms.txt
```

`prebuild` runs `tokens` and `llms`, so a plain `npm run build` is always
self-consistent.

Deploy to Vercel with `vercel` (zero config — it detects Next.js).

## Routes

| Route | What it is |
|---|---|
| `/` | **Brand kit canvas.** 10 sections, ~50 artboards: foundations (logo / colour / type / voice), profile avatars, cover banners, 10 square feed posts, 5 vertical formats, 8 in-platform profile mockups, 9 engagement posts, a 3-slide carousel, 3 YouTube thumbnails. Drag artboards to reorder, click a label to focus, ⋯ → Download PNG/HTML. |
| `/editor` | **Post editor.** 36 templates. Edit every field live, switch visual lane, accent colour and language, toggle the safe-area overlay, export one PNG at 1×/2×/3× or the whole set as a ZIP with an alt-text sidecar. Shareable: the URL carries the exact view. |
| `/playbook` | **Social playbook.** 13 sections, §01 Thesis → §13 Governance. Searchable, with copy-to-clipboard on every table, hashtag set, caption formula and inline value. |

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


## Design tokens

`tokens/brand.tokens.json` (W3C Design Tokens Community Group format) is the
single source of truth. `scripts/build-tokens.mjs` generates every consumer:

| Generated | For |
|---|---|
| `styles/tokens.generated.css` | the `:root` custom properties |
| `components/tokens.generated.js` | the `COLORS` map every template imports |
| `public/tokens.json` | engineers, Figma Variables, Style Dictionary |
| `public/tokens.scss`, `public/tokens.android.xml` | other platforms |

Whole files are generated, never regions inside hand-edited ones. Change a value
in the source, run `npm run tokens`, and it reaches the CSS, the components, the
playbook palette and the exports — `git diff` should show nothing else.

The token file also holds the type families, radius scale and easing curve.
Those are not decoration: dropping `--font-sans` silently reverts the whole site
to a fallback face, which is exactly what happened the first time the generator
emitted only colours.

## Localisation

`content/locales/*.json` hold per-template copy. `en.json` is generated from the
template defaults by `npm run locales` and is the translation baseline; the
others are partial by design and fall back to English per field.

Every non-English pack is `needs-native-review` and the editor badges it as
unreviewed with a translated-field count. It is machine-assisted copy, not
approved brand voice — which matters for a privacy product where tone carries
legal weight.

`lib/scripts.js` sets `lang` and a per-script font stack on the artboard. `lang`
is what stops Japanese text rendering with a Chinese face for the Han characters
the two share. CJK deliberately uses system fonts — the webfont is ~1.6 MB per
weight and Hiragino/PingFang/Yu Gothic/Malgun are good. Arabic, Devanagari and
Thai are self-hosted Noto at ~27–166 KB each, each behind its own
`unicode-range`, so a Latin-only visitor downloads none of them.

RTL is **editor-chrome-only**: text direction and alignment are correct inside
each slot, but the artboard keeps its LTR coordinate space. An Arabic export is
therefore an LTR-composed design with correct Arabic text in it. Truly RTL-native
assets would need mirrored template variants, not a toggle.

## Exports

Both routes go through `lib/export-image.js`. It probes the browser's real canvas
limit by drawing and reading back a pixel — iOS Safari caps canvas area at about
16.7 megapixels, and over the cap browsers do not throw, they silently produce a
blank image. A 1080×1920 artboard at 3× is 18.7 MP, so the old hardcoded 3× was
a blank-PNG bug waiting for the first iPad. Scale is clamped and the UI says so.

Default is 1×, which is already full resolution: artboards are authored at true
pixel size.

## Platform numbers

`lib/platforms.js` carries character limits and safe areas with a first-party
source and a `VERIFIED_ON` date on each, because these drift and most published
size guides are years stale. Counting is per-platform: X weights CJK and emoji
as 2 and every URL as exactly 23; YouTube descriptions are byte-counted.

The safe-area overlay uses Meta's published 14% / 35% / 6% — the only officially
documented safe area in the space, and more conservative than every third-party
TikTok/Shorts figure, so one overlay is defensible for all vertical formats.

One open conflict, deliberately not resolved silently: Later documents Instagram
dropping to **5** hashtags per post from 18 Dec 2025, while Meta's API docs still
say 30. `HASHTAG_NOTE` shows the conservative number and explains both.
