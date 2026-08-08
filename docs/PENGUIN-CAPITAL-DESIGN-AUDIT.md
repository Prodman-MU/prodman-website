# Penguin Capital (penguin-capital.co.jp/en) — Design System Reverse-Engineering Audit

| | |
|---|---|
| **Subject** | https://www.penguin-capital.co.jp/en (homepage) |
| **Purpose** | Document design system, structure, interactions, and scroll behavior for an original, inspired-by build — not a clone. No proprietary code/assets/branding/content is reproduced here; all values below are measurements and structural observations of the public, rendered site. |
| **Method** | Live browser inspection (Playwright/Chromium): network request log, `getComputedStyle`, CSS custom-property extraction, accessibility-tree/DOM snapshot, and a manual scroll sweep (0 → 11042px) with screenshots at 6 stops, at both 1440×900 (desktop) and 390×844 (mobile) viewports. |
| **Confidence key** | 🟢 Directly observed/measured · 🟡 Inferred from strong circumstantial evidence · 🔴 Estimated/uncertain |
| **Date** | 2026-08-08 |

> **Read this before the rest of the document.** Per the request, every claim below is labeled for confidence. Nothing here asserts a specific library unless directly verified (console output, network requests, or DOM/class-name fingerprints). Where I couldn't verify something (e.g. exact hover-transition durations, the GSAP plugin roster beyond "GSAP is present"), it's marked 🔴 or omitted rather than guessed silently.

---

## 1. Experience Summary

Penguin Capital's homepage reads as **editorial finance-luxury with a real-time 3D core**, not a flat scroll site with video backgrounds. The mood is monochrome and restrained (near-black `#1f2022` throughout, no saturated color anywhere observed), broken only by an occasional chromatic-aberration/rainbow tint on the 3D brand mark in the footer.

Three things do most of the work:

1. **A live, camera-driven WebGL scene** (🟢 confirmed React Three Fiber + drei, not a video or Lottie) — a chrome/glass 3D rendering of the "P" brand mark sits fixed in the viewport behind the hero copy, lit by an HDRI studio environment for realistic reflections.
2. **One variable typeface doing everything** (🟢 confirmed, `ktflux2` a.k.a. "KT Flux 2", self-hosted) — from a 205px italic display headline down to 16px body labels, no second Latin typeface is actually rendered anywhere sampled. The apparent "two fonts" impression (dramatic headline vs. restrained body) comes from the same variable family at different weight/size/style instances, not from mixing typefaces.
3. **Scroll doesn't just reveal content, it drives it** (🟢 confirmed GSAP present via console output; 🟡 inferred ScrollTrigger specifically, and 🟡 Lenis for the smooth-scroll feel — `lenis` class confirmed on `<html>`, GSAP's ScrollTrigger is the standard pairing but not named directly in what I could observe). Two distinct sticky-scroll techniques are used: a **swap** pattern (Business section — one detail panel's copy changes while a card-stack visual shows progress) and a **stack/accumulate** pattern (About section — three full cards literally pile on top of each other as you scroll).

Content-wise, it's a real six-page site (Home, About×3 sub-pages, Business×3 sub-pages, Knowledge, Career, News, Contact) rendered with Next.js App Router — the homepage is a long-scroll teaser into all of them, closing with a "Next Page →" continuation link rather than a dead end.

**One honest caveat:** a couple of image/texture elements (a hero card labeled "Planning," and the footer's background wordmark behind "Contact us") rendered as a static dithered/halftone noise pattern in **three independent fresh page loads** (two desktop, one mobile) rather than resolving to a clean image. Given this coincided with a real `Minified React error #418` and a `GSAP target null not found` console warning on every load, I believe this is **more likely a live bug/stuck animation state than an intentional design choice** — flagged 🔴, not presented as confirmed design language. Don't treat the dithered texture as something to deliberately replicate without your own judgment call.

---

## 2. Section Map (homepage, top to bottom)

| # | Section | DOM anchor (🟢 observed) | Approx. scroll range @1440×900 |
|---|---|---|---|
| 0 | Header (persistent) | `#header`, `position: fixed`, z-index 9999 | Always visible |
| 1 | Hero | inside `#layout_ctt` | 0 – ~1200px |
| 2 | Brand Message | `h2` "(Brand Message)" | ~1200 – 1385px |
| 3 | Approach | `<section class="…wrapper">`, label "(Approach)" | 1385 – 2129px (height 1044px) |
| 4 | Business (3 sticky cards: Asset Management / Brokerage / Advisory) | `<section class="…tBhZGq__wrapper">`, `.sectionWrap` sticky, 3× `.card` sticky | 2129 – 4939px (height 2810px) |
| 5 | Knowledge (4-article grid) | `<section>`, label "(Knowledge)" | ~4939 – 5570px (height 631px) |
| 6 | About (3 stacked cards: Vision & Way / Team / Company) | `#home_about_bg .wrapper` sticky, 3× `.item` sticky | ~5570 – ~9000px (estimated 🔴, boundary not precisely isolated) |
| 7 | News (flat list, 4 items) | `h2` "(News)" | before footer |
| 8 | Footer / Contact CTA | `<footer>` / `[contentinfo]`, `#layout_footer` sticky | ~10142 – 11042px (page end) |

Total scroll height at 1440×900: **11,042px** (🟢 measured via `document.documentElement.scrollHeight`).

---

## 3. Section Specifications

### 3.1 Header (persistent, fixed)

- **Position:** `fixed`, top:0, full width. z-index **9999** (🟢, CSS var `--z-index-header`).
- **Layout:** logo/wordmark left ("Penguin Capital," set in `ktflux2`, 26px/700/26px line-height, color `rgb(235,235,235)` 🟢 measured), center nav, right-aligned Contact button + language switcher.
- **Nav items:** "About" and "Business" are **buttons** with an up-arrow (▲) glyph — i.e. dropdown/flyout triggers, not direct links (🟢, confirmed via accessibility tree: `button "About"` vs `link "Knowledge"`). "Knowledge," "Career," "News" are direct links. "Contact" renders as a bordered pill/button-style link.
- **Language switcher:** "EN" button opens "JA"/"TC" links (🟢 confirmed in DOM, collapsed by default).
- **Mobile (390px):** nav collapses to wordmark + a 2–3 line hamburger-style icon in the top-right; full nav items are hidden until presumably tapped open (🟡 not tested — the flyout menu itself wasn't opened during this audit).

### 3.2 Hero

- **Background:** near-black gradient with a **very faint repeating vertical hairline pattern** (visible as thin vertical striping across the whole hero in screenshots) plus a soft radial vignette — 🟡 likely a subtle noise/grain overlay, consistent with the general dark palette; exact CSS not isolated.
- **3D layer:** `<div class="…webgl">`, `position: fixed`, full-viewport, z-index **500** (`--z-index-webglLayer`), containing **2 WebGL2 canvases** (🟢 confirmed via `canvas.getContext('webgl2')`), both reporting a full-viewport bounding rect (0,0 → viewport width/height) regardless of scroll position. One canvas backing-buffer was 1752×877 (main render), the other 292×146 (🟡 likely a lower-res auxiliary buffer — bloom/post-processing pass or a secondary render target; purpose not confirmable without source access).
- **3D content:** a chrome/glass 3D model of the brand mark (`/webgl/models/logo.glb`, 🟢 confirmed network request), lit via an HDRI studio environment map loaded from `@pmndrs/drei-assets` (🟢 confirmed — this is a well-known `@react-three/drei` `<Environment>` helper asset, strong direct evidence for React Three Fiber + drei specifically, not "some WebGL library").
- **Floating content chips:** 4–6 small bordered rectangular panels ("Planning," "Initiative," "Negotiation," "Creativity," + 1–2 unlabeled) scattered around the 3D model at varying positions/sizes, each with a label bottom-left and (intended) image/texture fill. Two were still empty/dark on a fresh load 15s apart; one ("Planning") showed the dithered-noise anomaly noted in Section 1.
- **Headline (in-flow, not part of hero's absolute layer):** "Be First Penguin" as a separate block immediately below/overlapping the hero visual. Each character is its own `<span>` (🟢 confirmed) — see Section 4 for the animation implication. Style: `ktflux2`, **205px / weight 400 / line-height 205px (1:1) / letter-spacing −4.1px / italic / color rgb(255,255,255)** (🟢 all measured directly at 1440px viewport).
- **Tagline:** "Beyond Expectations. / Redefine What's Possible." — small, two lines, positioned top-left, muted color.
- **Scroll cue:** "Scroll" label + circular button with a down-arrow, bottom-right.
- **Mobile (390px):** the chip cluster reduces to **a single card** ("Planning" only observed) instead of 4–6 — a deliberate content-count reduction for mobile, not just a CSS resize (🟢 observed, different DOM content rendered, not just scaled).

### 3.3 Brand Message

- Label: `h2` reading `"( Brand Message )"` — **but the literal accessible/DOM text is letter-spaced with real spaces between every character** (`"( B r a n d M e s s a g e )"`, 🟢 confirmed in accessibility tree) — see Section 4, this is site-wide, not unique to this section.
- Body: a single paragraph of body copy (~5 lines at desktop width), muted-white color, regular weight, `ktflux2`.
- No image/video observed in this section — text-only, generous vertical padding.

### 3.4 Approach

- Label `"(Approach)"`, eyebrow word "Rebuild" above an H2 "Spotting Potential, Creating Value.", then a body paragraph — same label/eyebrow/heading/body rhythm as Brand Message but now paired with a diagram.
- **Diagram:** a horizontal process/value-chain graphic: `Raw Material (Diverse Real Estate Assets)` → `Insight & Hypothesis` → 6 stacked labels (`Financial Structuring`, `ESG Integration`, `Architectural Design`, `Brand Storytelling`, `Legal & Tax Strategy`, `Operational Excellence`) → `Value Up`, connected by a horizontal line with square waypoint markers. A secondary sub-row underneath reads `Planning · Expertise · Funding · Execution`. The whole diagram sits inside/overlapping a large **concentric-circle "orbit" graphic** (thin white/gray rings, ~40–50vw diameter, 🔴 exact size not measured) that recurs as a background motif elsewhere.
- Full-bleed **duotone mountain-range photograph** as the section background, continuing into the next section (🟢 confirmed as a *repeating SVG tile*, not one continuous photo — `business_bg.svg` requested twice, each instance ~487px tall at 1440px viewport width, vertically stacked to cover scroll length).

### 3.5 Business (sticky "swap" cards)

- Wrapper: `<section>` (height 2810px) containing a `.sectionWrap` (`position: sticky`) and **3× `.card`** (`position: sticky`) — 🟢 all three confirmed sticky via computed style.
- **Mechanic (🟢 confirmed via scroll-sweep screenshots + accessibility tree):** ONE detail panel is "active" at a time — number (`01.`/`02.`/`03.`), eyebrow subtitle, large H-tag title (`Asset Management` / `Brokerage` / `Advisory`), a **horizontal progress rule** that fills left-to-right as you scroll through that card's pinned range (observed ~50% filled mid-card), body paragraph, "More Details" button linking to a dedicated sub-page (`/en/business/asset_management` etc.).
- **Card-stack visual** (right side): a **rotated deck of 3 preview cards** stacked with offset/rotation (front card fully visible with its own image/render + number badge; the other 2 peek out from behind, each rotated a few degrees and partially cropped) — this is the "which card is next/previous" indicator. Each preview card is independently a link to its own sub-page (`Asset Management 01`, `Brokerage 02`, `Advisory 03` — 🟢 confirmed as 3 separate `<a>` elements in the accessibility tree, not just decorative).
- Background: same repeating mountain-tile texture as Approach, continues unbroken.

### 3.6 Knowledge

- Label `"(Knowledge)"`, **4-column grid** (desktop), one `<article>` per entry.
- **Card anatomy (🟢 confirmed via accessibility tree, all 4 cards):** `<time>` showing year + `MM.DD.` (e.g. "2026" / "07.07."), H3 headline, optional category tag pill (`# ESG`, only on 3 of 4 sampled cards), body snippet (~2–3 lines), optional thumbnail image (`<figure><img></figure>`, present on 3 of 4), "Read More" link with an arrow glyph.
- Below the grid: a centered **"All Index"** button linking to `/en/knowledge`.

### 3.7 About (sticky "stack/accumulate" cards)

- Wrapper `#home_about_bg .wrapper` (`position: sticky`) containing **3× `<li class="…item">`** (`position: sticky`, 🟢 confirmed) — a `<ul>` of 3 `<article>`s: Vision & Way (01) / Team (02) / Company (03).
- **Mechanic (🟢 confirmed via scroll-sweep):** unlike Business's *swap*, About cards **stack and overlap** — card 01 stays visible while card 02 scrolls up and physically covers its lower portion, then card 03 does the same to card 02. Each card is a full opaque panel (not translucent), so it reads as a deck being dealt downward rather than pages flipping.
- **Card anatomy:** `（About Us）` label (🟢 note: uses full-width Japanese parentheses `（` `）`, not ASCII `(` `)` — a deliberate CJK-conscious typographic detail even on the English page), heading with a **bold lead word** + lighter continuation (`**Vision & Way,** which are our Core dNA` — 🟢 confirmed via `<strong>` + trailing text nodes), large serif-style title repeat, body paragraph, "More Details" button, and a number (`01`/`02`/`03`) with an em-dash prefix.
- **Background:** giant faint watermark text spelling out section keywords behind the cards — accessibility tree literally reads `"GlobalAsset ManagementCompany"` as one background text block (🟢 confirmed, likely 3 separate oversized text layers: "Global", "Asset Management", "Company", one per card, un-spaced in the flattened accessibility output).
- Supporting imagery observed per card: an abstract chrome/glass 3D render (card 1, behind/through the "Vision & Way" panel), a satellite/orbit Earth photograph + a small labeled "Global" image tile (card 2, Team), and another abstract chrome form (card 3, Company, partially visible at the edge of the sampled viewport).

### 3.8 News

- Label `"(News)"` + "All Index" link (top-right of the section, not below like Knowledge).
- **Flat list** of 4 items, each just `<time>2026.04.07</time>` + headline text as a single link — no tags, no images, no snippets. Deliberately simpler/denser than Knowledge, for a "ticker" feel.

### 3.9 Footer / Contact CTA

- **Background:** pure black (not the dark-charcoal `#1f2022` used elsewhere — 🟡 visually distinct, exact hex not isolated for this specific section).
- **Decorative layer:** ~9 `<figure>` elements (🟢 confirmed count via accessibility tree) — repeated renders of the glassy 3D "P" loop mark at varying scale, rotation, and opacity; several tinted with a subtle chromatic/rainbow edge (teal/gold fringing), most in plain grayscale. Scattered across the full footer viewport, not aligned to a grid.
- **Content:** tagline repeated ("Beyond Expectations. / Redefine What's Possible."), then a huge underlined `"Contact us"` link (large italic-leaning display type, similar scale register to the hero headline though not measured at the same precision), with a large dithered/halftone version of the brand mark rendered directly behind/through the text (see the Section 1 caveat on this treatment).
- **Utility row:** "Back To Top" **button** (🟢 confirmed `<button>`, not a link — it's a JS scroll action, not an anchor jump) with a circular icon showing **both** an up-arrow and a down-arrow stacked (🟡 unclear why both; possibly a stylistic icon choice rather than a literal bidirectional control), a duplicate EN/JA/TC switcher, and rotated (90°) copyright text `"©2026 Penguin Capital"` running along the right edge.
- **Continuation link:** `"Next Page [ Vision & Way ]"` at the very bottom — links to `/en/about/vision-way`, confirming the homepage is treated as page 1 of a sequence rather than a self-contained single-page site.

---

## 4. Interaction Inventory

Format: **Element → Trigger → Initial State → Final State → Duration/Scroll Range → Easing → Reverse Behavior**

| # | Element | Trigger | Initial | Final | Duration/Range | Easing | Reverse |
|---|---|---|---|---|---|---|---|
| 1 | Every heading/label (character-split spans) — 🟢 structure confirmed, 🟡 animation behavior inferred | Scroll into view | Individual `<span>` per character exists in DOM at all times (confirmed via accessibility tree reading literal spaced-out text) | 🟡 Presumed: characters reveal/fade/stagger in on scroll — this is the standard purpose of character-splitting; exact per-character opacity/transform timeline **not captured** (would require reading GSAP timeline calls in source, out of scope for black-box audit) | 🔴 Unknown | 🔴 Unknown, but `--ease-expo-out: cubic-bezier(.16,1,.3,1)` is defined site-wide as a named token and is the most likely candidate | 🔴 Unknown |
| 2 | Business section cards | Scroll through the pinned `.sectionWrap` range (🟢 confirmed sticky, height 2810px total for 3 cards ⇒ 🔴 estimated ~935px of scroll per card) | Card 01 (Asset Management) content + progress rule at 0% | Card 03 (Advisory) content + progress rule at 100%, then unpins | ~2810px total scroll range (🟢 measured section height) | 🔴 Unknown, likely linear scroll-scrub (typical for `ScrollTrigger.scrub`) rather than eased, since it's tied 1:1 to scroll position | Scrolling back up visibly reverses the active card and re-fills the progress rule backward (🟢 observed — content correctly showed "02. Brokerage" mid-scroll matching scroll position, consistent with scroll-scrubbed rather than one-shot animation) |
| 3 | About section cards | Scroll through the pinned About wrapper | Card 01 alone, full-height | Cards 01+02+03 stacked/overlapping, card 03 fully covering the stack | 🔴 Range not isolated (About section boundaries estimated in Section 2) | 🔴 Unknown | 🟡 Presumed reversible (consistent with scroll-scrub pattern used elsewhere) |
| 4 | 3D brand mark (hero) | Scroll position (page-level) | Model in initial camera framing at scroll 0 | 🟡 Presumed some camera/rotation change as user scrolls past the hero, consistent with the "scroll drives the scene" pattern seen elsewhere — **not isolated with before/after canvas pixel comparison** in this audit | 🔴 Unknown | 🔴 Unknown | 🔴 Unknown |
| 5 | "Back To Top" | Click | Page at current scroll position | Page at scroll 0 | 🔴 Unknown duration | 🔴 Unknown, plausibly Lenis's own smooth-scroll easing given Lenis is confirmed present | 🔴 N/A |
| 6 | Nav "About"/"Business" buttons | Click (untested — hover/click interaction not exercised in this audit) | Collapsed | 🔴 Presumed dropdown/flyout opens (up-arrow icon strongly implies expand-upward or expand-indicator convention) | 🔴 Unknown | 🔴 Unknown | 🔴 Unknown |
| 7 | Preloader | Page load | Blank black viewport (🟢 directly observed on a fresh mobile load — page was solid black for at least one screenshot interval before content painted) | Content visible | 🔴 Duration not measured this session; a prior general-purpose fetch of this same site (not this audit's browser session) reported a percentage-counter "Now loading… X%" — treat that specific detail as 🟡 secondhand, not verified by this audit's own browser session | 🔴 Unknown | 🔴 N/A |

**Honest gap:** hover states (button hover, card hover, link underline behavior) were not exercised in this pass — the audit tool's hover action targeted refs that didn't resolve cleanly, and given the extensive ground already covered, this was deprioritized rather than forced. If hover micro-interactions matter for your handoff, that's the highest-value follow-up session.

---

## 5. Parallax Map

Format: **Element → Scroll range → transforms → relative speed → pinning**

| Element | Scroll range | Transform behavior | Relative speed | Pinning |
|---|---|---|---|---|
| WebGL canvas layer (`.webgl`, `#layout_bg`, `#layout_logobg`) | Entire page | 🟢 **Confirmed: zero CSS transform.** Bounding rect stays exactly `(0,0,viewportWidth,viewportHeight)` at scroll 0 and at scroll 2200px — identical. Any visual movement of the 3D content is happening **inside** the WebGL scene (camera/object animation via JS), not via CSS on the canvas element. | N/A at the DOM level — canvas itself doesn't move | `position: fixed` (🟢 confirmed) |
| Background mountain texture (`business_bg.svg`) | Approach + Business sections | 🟢 Tiled repeat, ~487px tall per tile at 1440px viewport width, tiles positioned back-to-back (one instance ending where the next begins, e.g. observed at y≈-435→52 and y≈52→539 at scrollY=2200) — reads as a continuously-tiling background, not a single parallaxing image | 🔴 Could not isolate a differential scroll speed from a single sample; visually it appeared to scroll at roughly the same rate as content (no obvious "float" effect distinct from normal document flow) | Not sticky/fixed — scrolls with document (🟢 rect changed proportionally with scrollY) |
| Large watermark logo SVG (background, hero) | Hero → Approach | 🟢 At scrollY=2200, element top = -1961.5px relative to viewport ⇒ absolute page position ≈238px from page top. Confirms it's a large (508×607px at this sample) background mark positioned early in the page, scrolling normally with the document | 1:1 with scroll (normal document flow, no evidence of a differential parallax multiplier) | Not sticky (scrolls with page) |
| Business section sticky cards | 2129 – 4939px (2810px range) | Card panel content swaps (opacity/text change, not a translate); the card-stack preview visual shows rotation/offset per card but exact degree values weren't extracted (would require reading `transform: rotate()` per stacked card, 🔴 not captured) | Scroll-scrubbed 1:1 with the pinned range (🟢 confirmed by content matching scroll position exactly) | `position: sticky` (🟢 confirmed on `.sectionWrap` and all 3 `.card` elements) |
| About section sticky cards | ~5570 – ~9000px (🔴 estimated) | Cards accumulate via normal document stacking (later card's box literally overlaps earlier card's box as it becomes sticky in turn) — no scale/opacity change observed, just z-order/position stacking | Scroll-scrubbed | `position: sticky` (🟢 confirmed on `#home_about_bg .wrapper` and all 3 `.item` elements) |
| Footer decorative logo marks (9 figures) | Footer only | 🔴 Static positions sampled at one scroll stop only — could not confirm whether they drift/parallax independently on scroll or are simply placed once. Visually they appeared plausibly static (decorative wallpaper) rather than actively animating in the screenshot pair taken. | 🔴 Unknown | Not sticky (inside normal footer flow) |
| Header | Entire page | No transform — stays pinned to viewport top throughout | N/A | `position: fixed`, z-index 9999 (🟢 confirmed) |

**Honest gap:** true parallax speed ratios (e.g. "background moves at 0.5× scroll speed") would require sampling the *same* element's position at two scroll offsets and computing `Δposition / Δscroll`. I captured this precisely for the canvas layer (ratio = 0, i.e. no CSS parallax — it's fixed) but did not have budget in this session to repeat the same two-sample technique across every candidate element. Treat any relative-speed claim above without a 🟢 tag as directional, not a hard number.

---

## 6. Design Tokens

All values in this section are 🟢 **directly read from the site's own CSS custom properties** (`getComputedStyle` on `:root`) or **directly measured** via `getComputedStyle` on live elements — not estimated.

### Color

```
--color-black:      #1f2022   /* primary background, not pure #000 */
--colo-white:        #ebebeb   /* "white" text — off-white, verbatim var name incl. site's own typo */
--color-gray:        #e7e8ea
--color-gray-dark:   #bebebe
```
Footer background observed as pure black (visually distinct from `#1f2022`, exact hex not isolated). The largest hero headline's computed color was pure `rgb(255,255,255)` — i.e. some text uses true white directly rather than the `--colo-white` token. No saturated/hue color token exists anywhere in `:root` — any color accents seen (the teal/gold tint on footer logo marks) are applied locally, not via a global token.

### Typography

```
--font-en:      var(--font-flux2)   /* "KT Flux 2" (ktflux2) — self-hosted variable font, next/font/local */
--font-default: "Hiragino Kaku Gothic ProN","Hiragino Sans","Helvetica Neue",Arial,
                "Noto Sans JP","Noto Sans TC","Noto Sans SC",sans-serif   /* CJK stack */
```
Also loaded but not observed rendering anywhere sampled: **Inter** (self-hosted variable, via `next/font`) — present in `<html>` class list but possibly reserved for a sub-page not covered by this audit, or an unused import. Adobe Typekit (`use.typekit.net`, kit `smq8teo`) separately serves a **Hiragino Kaku Gothic ProN** web font instance (`wf-hiragino-kaku-gothic-pron-n6-active` class confirmed) — i.e. CJK typography is licensed/delivered via Adobe Fonts, Latin typography is self-hosted.

Measured instances:

| Use | Font | Size | Weight | Line-height | Letter-spacing | Style |
|---|---|---|---|---|---|---|
| Hero display headline ("Be First Penguin") | ktflux2 | 205px | 400 | 205px (1.0) | −4.1px | *italic* |
| Nav wordmark / small heading | ktflux2 | 26px | 700 | 26px (1.0) | normal | normal |
| Section `h2` label (e.g. "(Brand Message)") | ktflux2 | 24px | 700 | 24px (1.0) | −0.48px | normal |
| Body/UI label (e.g. diagram label "Planning") | ktflux2 | 16px | 400 | 16px (1.0) | normal | normal |

Pattern: **every sampled text element uses `line-height: 1.0`** (equal to font-size) regardless of role — a deliberately tight, editorial-typesetting choice rather than typical web line-height (1.4–1.6). If replicating this, expect to add manual paragraph spacing since line-height itself provides none.

### Grid / Layout

```
--grid-layout-column: 6.72%
--grid-layout-gap:    1.76%
```
🟡 Solving `N × 6.72 + (N−1) × 1.76 = 100` gives **N ≈ 12** — read as a 12-column fluid grid, gap ≈1.76vw, column ≈6.72vw (not a fixed-px grid).

### Fluid scaling ("liquid rem") system

```
--liquid-lgDesignRatio: 1440   /* desktop design reference width, px */
--liquid-mdDesignRatio: 750
--liquid-smDesignRatio: 375
--liquid-htmlroot:      calc(100vw / 1440)
--liquid-bodyroot:      16rem   /* their own scaled rem unit, not browser rem */
--solid-root:           16px
--mobile-DesignWidth:    750
--mobile-ContentsWidth:  750
--mobile-ContentsRatio:  var(--mobile-ContentsWidth) / var(--mobile-DesignWidth)
--mobile-root: min(16px * var(--mobile-ContentsRatio), 16 * 100 / 750 * 1vw)
```
🟢 This is a verified, precise implementation of the "vw-based fluid rem" technique: a custom `rem`-equivalent unit that scales linearly with viewport width against a 1440px desktop comp / 750px mobile comp, clamped via `min()` on mobile so it doesn't scale unboundedly past the design's natural size. This explains why every measured font-size above looks "designed at an exact pixel value" — it *is* an exact value, just multiplied by a viewport-relative ratio at render time. See Section 8 for how to implement this.

### Motion

```
--ease-expo-out: cubic-bezier(.16, 1, .3, 1)
--stable-svh:    1svh
--stable-lvh:    1lvh
```
Only one named easing curve exists in the token set — a strong signal it's the site's default/house curve for scroll-driven and UI transitions (🟡 inferred as default; not confirmed applied to every specific transition in Section 4).

### Z-index layers

```
--z-index-webglLayer:     500
--z-index-domLayer-back:  495   /* below the WebGL canvas */
--z-index-domLayer-front: 505   /* above the WebGL canvas */
--z-index-header:         9999
--z-index-menu:           10000
--z-index-menuButton:     10001
```
🟢 Confirms a deliberate 3-layer compositing model: some DOM content sits **behind** the WebGL scene (495), some **in front** (505), with the canvas itself at 500 — i.e. the 3D scene is sandwiched, not simply layered on top of or behind everything uniformly.

### Component-level

```
--header-height: 80rem   /* ≈80px at the 1440px reference width, via the liquid-rem system above */
```

---

## 7. Component Inventory

Reusable UI components identified, with states observed (🟢) vs. presumed (🟡):

| Component | States observed | States presumed but not tested |
|---|---|---|
| **Nav link (text)** | default | 🟡 hover (underline/color change likely, not verified) |
| **Nav dropdown trigger** (About/Business) | closed, up-arrow icon | 🟡 open/flyout state |
| **Pill button** ("Contact", "More Details", "All Index") | default — bordered rectangle, label centered | 🟡 hover/active |
| **Character-split text** | static DOM structure confirmed (each letter its own span) | 🟡 the actual reveal animation on scroll-into-view (not captured frame-by-frame) |
| **Section label** (`"( Label )"` eyebrow) | consistent pattern across all 6+ sections sampled: parenthesis-wrapped, small, uppercase-adjacent styling, `ktflux2` 24px/700 | — |
| **Numbered heading block** ("01. Asset Management" / "01 Vision & Way,") | two variants: Business uses `NN.` prefix beside a plain title; About uses bold-lead-word title + lighter continuation + trailing `NN` number — **these are visually similar but structurally different components**, not one reused pattern | — |
| **Sticky "swap" card group** (Business) | 3-state active-panel swap + rotated card-stack preview, confirmed via scroll sweep | 🔴 exact per-card pinned scroll distance (estimated only) |
| **Sticky "stack" card group** (About) | 3-card overlapping accumulation, confirmed via scroll sweep | 🔴 exact per-card pinned scroll distance |
| **Article card** (Knowledge) | date/time, headline, optional tag pill, optional thumbnail, snippet, "Read More →" link | — |
| **List item link** (News) | date + headline, no imagery | — |
| **Progress rule** (Business active card) | thin horizontal bar, partially filled (white) vs. remainder (gray), observed ~50% filled mid-card | 🔴 exact fill-to-scroll mapping |
| **Decorative background figure** (repeated 3D logo mark) | 9 instances in footer, varying scale/rotation/tint | 🔴 whether they animate on scroll (not confirmed) |
| **Language switcher** | EN button + JA/TC flyout links, present in header and duplicated in footer | 🟡 open-state visual |
| **"Back To Top" control** | `<button>` (not a link — JS-driven), circular icon with up+down arrow glyph | 🔴 exact scroll-to-top duration/easing |
| **Preloader** | brief blank/black viewport before hydration paints content (🟢 observed once, mobile) | 🟡 percentage-counter UI (reported secondhand, not this session) |

---

## 8. Implementation Blueprint

This section is the actionable "if we wanted to build something in this spirit" handoff. Recommendations are marked with the same confidence system — 🟢 items are safe to treat as "this is literally how it's built," 🟡/🔴 items are "this is a reasonable way to achieve the same *effect*," not a claim about their actual source.

### 8.1 Stack (🟢 verified for the reference site)

- **Framework:** Next.js, App Router (confirmed via `_rsc=` RSC payload requests and `/_next/static/` asset paths), deployed on Vercel (`dpl_...` query params on every static asset).
- **3D:** React Three Fiber + `@react-three/drei` (confirmed via a direct request to `raw.githack.com/pmndrs/drei-assets/.../hdri/studio_small_03_1k.hdr` — this exact asset path is drei's own `<Environment>` helper's default/example HDRI, about as strong a fingerprint as you can get without reading source).
- **Scroll animation:** GSAP (confirmed via a literal console warning: `GSAP target null not found. https://gsap.com`). ScrollTrigger specifically is 🟡 inferred (it's the standard GSAP plugin for exactly this pin/scrub pattern) but not named directly in anything observable.
- **Smooth scroll:** Lenis (🟢 confirmed — `lenis` class present on `<html>`, a distinctive fingerprint of that specific library).
- **Fonts:** `next/font/local` for the variable Latin display font, `next/font/google` (or local) for Inter, Adobe Typekit (`use.typekit.net`) for the licensed Hiragino Kaku Gothic ProN CJK face.
- **Analytics:** Google tag (gtag.js) + GA4.

**For your build:** this combination (Next.js + R3F/drei + GSAP + Lenis) is a well-trodden, well-documented stack for exactly this genre of site — there's no reason to guess at alternatives.

### 8.2 Fluid type/spacing scale (🟢 formula verified, straightforward to port)

Port the liquid-rem technique directly — it's just CSS custom properties, framework-agnostic:

```css
:root {
  --design-width-desktop: 1440;
  --design-width-mobile: 750;
  --liquid-root: calc(100vw / var(--design-width-desktop));
}
@media (max-width: 768px) {
  :root {
    --liquid-root: min(1px, 100vw / var(--design-width-mobile));
  }
}
/* usage: font-size: calc(205 * var(--liquid-root)); */
```

This gets you "every measurement scales proportionally with the browser at any width between mobile and desktop comps" without a large media-query ladder — the one thing to watch is clamping so type doesn't shrink below a legible floor or blow up unboundedly past ultra-wide viewports (their `min()` clamp on mobile does exactly this; add an equivalent `clamp()` upper bound for very large desktop screens if targeting them).

### 8.3 12-column fluid grid (🟢 formula verified)

```css
:root {
  --grid-gap: 1.76vw;
  --grid-col: 6.72vw;
}
.grid {
  display: grid;
  grid-template-columns: repeat(12, var(--grid-col));
  gap: var(--grid-gap);
}
```

### 8.4 Character-split headline reveal (🟡 recommended approach, not the confirmed exact implementation)

The confirmed *structure* (each character in its own span) is most efficiently produced with **GSAP's SplitText plugin** (a paid Club GreenSock plugin) or an open-source equivalent (e.g. `SplitType`). Pattern:

```js
const split = new SplitText(headlineEl, { type: "chars" });
gsap.from(split.chars, {
  opacity: 0,
  yPercent: 100,
  stagger: 0.02,
  ease: "expo.out", // matches the site's --ease-expo-out token
  scrollTrigger: { trigger: headlineEl, start: "top 80%" },
});
```

### 8.5 Sticky-scroll card sections (🟡 recommended approach)

Both the "swap" (Business) and "stack" (About) patterns are standard `ScrollTrigger.pin` + `scrub` recipes:

**Swap pattern** — one pinned container, `scrub: true` timeline swaps text content and animates a progress-bar `scaleX` from 0→1 per card:

```js
ScrollTrigger.create({
  trigger: sectionWrapEl,
  start: "top top",
  end: () => `+=${cardCount * window.innerHeight * 1.2}`, // tune multiplier to taste
  pin: true,
  scrub: true,
  onUpdate: (self) => {
    const activeIndex = Math.floor(self.progress * cardCount);
    // swap active panel's text/content to cardData[activeIndex]
  },
});
```

**Stack pattern** — each card individually `position: sticky` with an increasing `top` offset per card (simplest — no JS needed beyond CSS) or pinned individually via ScrollTrigger if you need scroll-scrubbed entrance transforms per card:

```css
.item:nth-child(1) { top: 0; }
.item:nth-child(2) { top: 0; } /* sticky naturally overlaps as each becomes active */
.item:nth-child(3) { top: 0; }
```

### 8.6 3D hero (🟡 recommended approach)

```jsx
<Canvas>
  <Environment files="/hdri/studio.hdr" />
  <PerspectiveCamera makeDefault position={[0, 0, 5]} />
  <LogoModel /> {/* useGLTF('/models/logo.glb') */}
</Canvas>
```
Drive camera/rotation changes from a scroll progress value (e.g. via a shared React ref updated in a `ScrollTrigger.onUpdate`, read inside `useFrame`) rather than animating the `<canvas>` DOM element itself — confirmed 🟢 that the reference site's canvas has zero CSS transform, all motion is scene-internal.

### 8.7 What NOT to copy without your own judgment

- The dithered/halftone stuck-texture state (Section 1) — investigate before treating as a style to replicate; it may be a bug on the reference site, not a feature.
- Character-split animations and pinned sections are **expensive** (many DOM nodes, layout thrash risk, main-thread cost) — the reference site is a well-resourced corporate site optimized by (presumably) a specialist studio. Budget real performance testing if porting this pattern to a lighter-weight project, especially on mobile.
- `line-height: 1.0` everywhere is a deliberate, skilled typesetting choice that requires careful manual spacing elsewhere to avoid cramped text — don't apply it reflexively to body copy at smaller sizes without testing readability.

---

## Appendix — Raw evidence log (for traceability)

- Network requests: `/webgl/models/logo.glb`, `/webgl/movie/earth.mp4`, `raw.githack.com/pmndrs/drei-assets/…/studio_small_03_1k.hdr`, `use.typekit.net/smq8teo.js`, `_next/static/media/KT_Flux_2_Variable-s.p.62a774fa.woff2`, `?_rsc=` params on every route, `dpl_F7dFHxM3dkThz3kiDkv8nTaufst3` Vercel deployment ID on every static asset.
- Console: `GSAP target null not found. https://gsap.com`; `Minified React error #418` (repeated across sessions).
- DOM fingerprints: `<html class="… lenis fonts-loaded wf-hiragino-kaku-gothic-pron-n6-active wf-active">`; 15 elements with computed `position: sticky|fixed` spanning header, menu, business cards (×3), about items (×3), webgl layer, background layers, footer.
- CSS custom properties: full `:root` dump captured via stylesheet rule inspection (not just computed values), see Section 6 for verbatim values including the site's own `--colo-white` typo.
