# TTC-Infotech website

Next.js 16 (App Router, Turbopack) site for TTC-Infotech, a Vietnamese IT distributor/
integrator/service company. Bilingual (VI default, EN secondary) via a custom i18n
system, not next-intl. Auto-deploys to Vercel (`web-vxfh`) from `main` on GitHub
(`Benny1303-hello/web`). This file exists so anyone — any machine, any Claude account —
opening this repo gets the same hard-won context automatically.

## i18n system — read this before touching any page

`context/LanguageContext.js` exposes `t('dot.path')`, resolving from `locales/vi.json`
(default/fallback) and `locales/en.json`. **If a key is missing from both files, `t()`
returns the literal dotted path as a STRING, not `undefined` and not a throw.**

This is used deliberately as a presence-check pattern (`Array.isArray(t(path))` to decide
whether an optional section renders) — but it means **every value from `t()` that gets
`.map()`'d must be guarded with `Array.isArray()` first**, or a missing/renamed key
crashes the page instead of degrading. This exact bug has shipped twice on two different
homepage components after a full-codebase review pass — the lesson wasn't "remember the
guard," it was that a review has to sweep every touched file for this specific pattern
explicitly, not assume a prior pass already covered it.

## Shared-component-per-dynamic-route pattern

For any family of sibling detail pages (e.g. the 4 "Solutions" pages, the 5 "Service"
pages): one shared `XDetailContent.js` client component + one `app/.../[slug]/page.js`
using `generateStaticParams`, driven by a `lib/content.js` array where each item has an
explicit `key` field. **Never** a positional array matched by index against a separate
content array — that pattern has caused two real build crashes
(`Element type is invalid: got undefined`) when a content array grew but a same-order
icon array elsewhere didn't. Icon lookups go through the shared `lib/icons.js` registry
instead of a new local per-file map.

Mirror the old site's real nav nesting **1:1** in `lib/content.js`'s `navLinks`.
`components/Navbar.js` already generically renders arbitrary `link → child → grandchild`
nesting — this is a data change only, never touch Navbar.js's rendering code for it.

## Known layout bugs — check new code against this list explicitly

- Sibling margins (`mb-3` on one child, `mt-3` on the next) don't collapse inside
  `flex`/`grid` containers — use only one margin direction between siblings, or the gap
  silently doubles.
- A CSS Grid for a variable-count row of cards leaves a leftover row stuck to the left
  instead of centered. Use `flex flex-wrap justify-center gap-6` with per-item widths
  (`w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]`) instead — it centers any
  leftover row for any count automatically.
- A trailing section's background color (in an alternating-stripe layout) must be
  derived from whichever optional block actually rendered last, not hardcoded off one
  specific flag — otherwise a page with fewer optional sections than expected gets two
  adjacent same-colored sections with no visible break.

## Porting content from the old site (ttc-infotech.com.vn)

**Use the `old-site-content-parity` skill** (`.claude/skills/old-site-content-parity/`)
for this — it has the full step-by-step procedure and every real failure mode hit so
far. The short version: find the true scope by reading the old site's nav DOM
programmatically (casual browsing has undercounted it every time), check both `/vi/`
and the default path for each page (some are WordPress stubs — literally
`"Content goes here."`), port real content in your own words and then **re-fetch the
live page and diff it again** before calling it done (this second look is what has
caught every real content error on this project, including one full missing section
across three pages), and for genuinely empty source pages, write only from facts already
verified elsewhere on the old site — never invent specifics. The user has been explicit
about this last point: content must stay factually accurate because it drives real sales
conversations, not just read well.

## Extracting supplier price-list Excel files

**Use the `product-excel-extract` skill** (`.claude/skills/product-excel-extract/`) for
any vendor price list (APC/Schneider, HPE, Microsoft, Telegartner, etc.). This data
drives real sales quotes — the skill's reference guide documents a verification
checklist (row-by-row reconciliation, column completeness, reading cells with
`raw: false` to avoid corrupting date-formatted cells into serial numbers, spot-checking
against the source) that exists because the first extraction attempt against this
project's real APC file had four real accuracy bugs despite looking like it worked.
**Extracted output goes to `data/product-imports/` (gitignored) — never let wholesale/
dealer pricing reach the public repo.**

## Verifying a change before calling it done

- `rm -rf .next && npm run build` — must be clean.
- Check built pages via DOM structure (`document.querySelectorAll('h2')`, row/list
  counts), not screenshots — screenshots are unreliable in this project's browser
  preview.
- Check both languages: `localStorage.setItem('ttc-language', 'en')` then reload (the UI
  toggle click has been unreliable here). Confirm no literal `pages.foo.bar`-style key
  strings leak into rendered text.
- Check mobile width (375px): `document.documentElement.scrollWidth` should equal
  `clientWidth`.

## When something is a real judgment call, ask — don't guess

Content strategy for an empty page, where a new nav item belongs, whether to fabricate
vs. leave a gap — these have all been explicit "ask first" corrections on this project.
A wrong guess here means rebuilding; asking costs one turn.
