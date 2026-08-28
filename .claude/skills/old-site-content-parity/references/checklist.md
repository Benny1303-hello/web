# Content-parity checklist

Every rule here exists because skipping it already caused a real, shipped
problem on this exact project — not a hypothetical. Read the failure before
the fix; it's what makes the fix worth actually doing under time pressure
instead of skipping "just this once."

## 1. Find the true scope from the nav DOM, not from browsing

The old site (ttc-infotech.com.vn) runs a WordPress mega-menu. Casual visual
browsing has undercounted what's actually in it every time it's been tried —
the "Solutions" gap (4 missing pages) and the Service Center's real 9-page
structure (vs. the 3 that had been built) were both found only by reading the
menu's actual DOM, not by looking at the page.

```js
// In the browser, on the old site:
const links = Array.from(document.querySelectorAll('a'));
const topLevel = links.find(a => a.textContent.trim() === 'Service Center'); // or whatever section
const li = topLevel.closest('li');
const submenu = li.querySelector('ul');
Array.from(submenu.querySelectorAll('a')).map(a => ({ text: a.textContent.trim(), href: a.href }));
```

Watch for nested flyout sub-submenus (a `<ul>` inside one of the `<li>`s you
just found) — the "Services" item inside the Service Center menu was itself a
5-item flyout, not a single page.

## 2. Visit every URL found — check for stubs, not just existence

Visit each one in **both** the `/vi/` path and the default (often English)
path — content sometimes exists in only one language. Then actually read the
page body, not just confirm it loads. This site's stub pages render the
literal placeholder text `"Content goes here."` — found on at least three
different Service Center pages (Repairing/Troubleshooting, Maintenance
Services, Extended Warranty) this project. A nav link existing is not
evidence the page behind it has real content.

## 3. Port real content faithfully, then verify it twice

Write in your own words — never copy verbatim (copyright policy). But
"in your own words" must preserve every real fact, number, and unit exactly.
A past pass wrote "5 phút" for a UPS failover time when the source said
"5 giây" — a real unit error, not a paraphrase choice, and it shipped.

The fix that has actually caught errors on this project: **after writing the
content, go back and fetch the live old-site page again, fresh, and diff it
line by line against what you wrote.** Do this as a normal part of finishing
the work, not only when the user explicitly asks "does this match?" — by the
time they ask, it means the first pass already missed something. On the
Solutions pages, this second look is what found a full section
("Cam kết từ nhà cung cấp" — Our Commitments, including an entire
deployment-timeline table) that three pages were missing entirely, not just a
wrong detail. **Missing whole sections is at least as common as wrong facts
within a section** — when you diff, check the source page's full outline
(every heading, every table, every list) against what you built, not just
whether the paragraphs you did copy read correctly.

## 4. Empty source page: write from verified facts, never invent

When the old site's own page for something is a stub, the user still wants a
real page built — but only from facts already established elsewhere on the
old site. Concretely: a company-wide stat already stated on another real page
(">30 trained engineers", "APC Elite Partner", "20+ years"), or the one-line
description already used for that exact item in a menu or list elsewhere on
the old site. Never invent SLA numbers, specific certifications, response-time
promises, or partnerships that no real page corroborates.

This was an explicit, emphatic correction from the user on this project:
*"không được biến chế quá mức, phải sát với những tiêu chí của công ty"*
(don't over-embellish, must stay close to the company's actual facts) — said
specifically because it's easy, when there's no source page to anchor to, to
default to writing something plausible-sounding instead of something true.

## 5. Look for image assets, not just text

Client/customer logo walls, certification badges, and promotional graphics
are easy to miss because they don't show up when you're reading page text —
you have to specifically check `<img>` tags. The old site's Service Center
"About" page and its Consulting detail page both carry an 18-logo "Khách hàng
tiêu biểu" (featured clients) grid that was completely absent from the new
site until someone went looking for images, not just text.

When you find real assets, download the actual files (they're normal image
URLs under `wp-content/uploads/`) into `public/<sensible-folder-name>/` on
this project. Never substitute a placeholder or invented logo — if you can't
get the real asset, leave the section out and say so, don't fake it.

## 6. Code architecture for a family of detail pages

When a section has several sibling detail pages (4 Solutions, 5 Services,
etc.), this project's established pattern is: one shared `XDetailContent.js`
client component, one `app/.../[slug]/page.js` dynamic route using
`generateStaticParams`, driven by a `lib/content.js` array where each item
has an explicit `key` field — never a positional array matched by index
position against a separate content array.

This isn't a style preference — a positional icon array has caused two
separate real build crashes on this project (`Element type is invalid: got
undefined`), both times because a 4th or 8th item was added to a content
array without someone remembering to extend a same-order icon array
elsewhere in a different file. Icon lookups go through the shared
`lib/icons.js` registry instead of a new local per-file map, for the same
reason — one place to keep in sync instead of several.

Mirror the old site's real nav nesting **1:1** in `lib/content.js`'s
`navLinks` array. `components/Navbar.js` already generically renders
arbitrary `link → child → grandchild` nesting (built once for the Solutions
dropdown, reused as-is for the Service Center dropdown with zero changes to
Navbar.js itself) — this step is pure data, not a reason to touch rendering
code.

## 7. Known layout bugs — check for these explicitly, don't rely on memory

Each of these was found and fixed once, then reintroduced later when similar
code was written in a different file without anyone checking against this
list. Treat this as a checklist to run against new code, not a thing you
already know not to do.

- **Sibling margins in a flex or grid container don't collapse.** A parent
  with `mb-3` on one child and `mt-3` on the next sibling gets a 24px gap
  instead of the intended 12px, because margin-collapsing (a block-layout
  behavior) doesn't apply inside `flex`/`grid`. Use only one margin
  direction between siblings. (Fixed once in `CentersGrid.js`; reintroduced
  in `ListContent.js` when that file was rewritten later — check every new
  card/list component against this specifically.)
- **A CSS Grid for a variable-count row of cards leaves a leftover row
  stuck to the left edge** instead of centered when the count doesn't divide
  evenly by the column count (e.g. 5 cards in a 3-column grid → a lonely pair
  on the left). Use `flex flex-wrap justify-center gap-6` with per-item
  widths like `w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]`
  instead — it centers any leftover row automatically for any count, so it
  doesn't need re-fixing every time the number of cards changes.
- **Every `t()`-sourced value that gets `.map()`'d needs an `Array.isArray()`
  guard first.** This project's i18n fallback returns the literal dotted key
  path as a string when a key is missing or renamed — calling `.map` on that
  string throws and crashes the whole page. This was missed on two homepage
  components in an earlier full-codebase review pass and only caught in a
  *second* pass — the lesson isn't "remember to add the guard," it's that a
  review pass has to actually sweep every touched file for this pattern
  explicitly, because assuming a prior pass already covered it is exactly
  how it gets missed twice.
- **A trailing section's background color must be derived from whichever
  section actually rendered last, not hardcoded off one specific flag.**
  When a page has several optional sections with alternating stripe colors,
  hardcoding the last section's color based on only one of those flags means
  a page with fewer optional sections than expected ends up with two
  adjacent same-colored sections and no visible break between them.

## 8. Verify before calling it done

- `rm -rf .next && npm run build` — must be clean.
- Check built pages via DOM structure, not screenshots — screenshots
  frequently fail in this project's preview environment ("the Browser pane
  is not displayed, so the page is not compositing frames"). Use
  `document.querySelectorAll('h2')` for heading order, row/list-item counts
  for tables and lists, etc.
- Check both languages. Set the language directly —
  `localStorage.setItem('ttc-language', 'en')` then reload — rather than
  clicking the UI toggle, which has been unreliable in this environment.
  Confirm no literal `pages.foo.bar`-style key strings leak into rendered
  text in either language.
- Check mobile width (375px): `document.documentElement.scrollWidth` should
  equal `clientWidth` — no horizontal overflow.
- **Re-fetch the actual old-site pages fresh at verification time** and
  spot-check content again, rather than trusting an earlier fetch or your
  memory of having checked it already. Content and your memory of it can
  both drift over the course of a long session.

## 9. Ask, don't guess, on real judgment calls

Examples of calls this project's user has asked to be consulted on rather
than have decided automatically: what to do about a page with no real
old-site content (write from general facts vs. leave as a plain, unlinked
item), and where a new sub-section should live in the nav. When you hit a
fork like this, ask — a wrong guess here means rebuilding something, while
asking costs one turn.
