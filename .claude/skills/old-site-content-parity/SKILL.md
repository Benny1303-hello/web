---
name: old-site-content-parity
description: Brings a section of the new TTC-Infotech site (this project) up to full content parity with the old WordPress site at ttc-infotech.com.vn — finding pages the new site is missing, verifying existing content actually matches the old site word-for-fact, and building out any gap faithfully. Use this whenever the user asks to check, complete, "đối chiếu", "khớp với web cũ", build out, or fill in a section against the old site — even for something that looks already finished, since past passes on this exact project have repeatedly shipped content that looked complete but was missing whole sections or had wrong facts, caught only when re-checked against the live old site. Also trigger when the user names a specific old-site page or section (Distribution Center, System Integration, Service Center, About, etc.) and asks whether the new site has it, matches it, or is missing anything from it.
---

# Old-site content parity

This project has run this exact workflow twice already (System Integration's
"Solutions" pages, then the entire "Service Center" section) and hit the same
categories of mistake both times — not because the process is unknown, but
because each pass skipped a step under time pressure and only the user
explicitly asking "does this actually match the old site?" caught it. This
skill exists to make every pass include the steps that actually caught real
errors last time, instead of relying on catching them again by luck.

**Read `references/checklist.md` now** — it has the full step-by-step
procedure, the exact real failures each step exists to prevent, and the known
layout bugs to avoid reintroducing. Follow it in order; don't skip to writing
content from a guess at what the old site probably says.

## The shape of the work, in brief

1. Find the *true* scope by reading the old site's nav DOM programmatically,
   not by eyeballing the menu.
2. Visit every real URL that turns up, in both `/vi/` and the default path,
   and actually check whether each has real content or is a WordPress stub.
3. Port real content faithfully, in your own words — then go back and
   re-fetch the live page fresh and diff what you wrote against it. This
   second look is what has caught every real content error on this project
   so far; skipping it is how they shipped the first time.
4. For a genuinely empty stub page, write only from facts already verified
   elsewhere on the old site — never invent specifics to fill the gap.
5. Look for image assets (client logos, badges) the same way you look for
   text — they're easy to miss entirely.
6. Reuse this project's established patterns for the code side: one shared
   detail component + `[slug]` route keyed by an explicit `key` (never
   positional icon arrays), the shared `lib/icons.js` registry, and mirror
   the old site's nav nesting 1:1 in `navLinks` (Navbar.js needs no changes).
7. Verify for real before calling it done — clean build, DOM-based checks
   (not screenshots, which are unreliable in this project's preview), both
   languages, mobile width, and one more fresh re-fetch of the old site.
8. When something is a genuine judgment call — an empty page's content
   strategy, where a new item lives in the nav — ask the user rather than
   deciding it yourself.

`references/checklist.md` has the details behind every one of these,
including the specific bugs (margin doubling, lopsided card grids, missing
`Array.isArray` guards, wrong trailing-section background) that have already
happened more than once on this project because a fix in one file didn't
carry over when similar code was written elsewhere later. Check new code
against that list explicitly, not from memory of having fixed it once.
