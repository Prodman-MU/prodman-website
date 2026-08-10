# ProdMan Club Website — Product Requirements Document

| | |
|---|---|
| **Club** | ProdMan Club (Product Management Club), Masters' Union, Gurugram |
| **Leadership** | Sai Harsha Sadhu (President) · Akhil Menon (Vice President) |
| **Prepared by** | Om Umrania |
| **Status** | Draft v1 — for review |
| **Date** | 2026-08-08 |
| **Related files** | [`AGENTS.md`](../AGENTS.md) · [`PLANS.md`](../PLANS.md) · [`docs/ARCHITECTURE.md`](ARCHITECTURE.md) · [`docs/DECISIONS.md`](DECISIONS.md) · [`docs/HANDOFF.md`](HANDOFF.md) |

> **Note on how this doc was built:** This PRD synthesizes (1) the whiteboard content plan (`image/reference-info.jpeg`), (2) fully-written section copy already sitting in `resources/*.txt`, (3) an **already-built and tested hero prototype** (`index.html` plus `resources/prodman-living-logo/`) that appears to be the output of a concurrent Codex session in this same repo, and (4) decisions made in conversation with Om. Section 1 explains that overlap — read it first, it changes some of the assumptions below.

---

## 1. Important: there's already a live workstream in this repo

While this PRD was being scoped, a **second, concurrent agent session (Codex — see `.codex/`)** was actively building in this same repository. As of this doc, the repo contains a working, tested hero:

- `index.html`, `resources/prodman-living-logo/` — a framework-neutral, dependency-free hero: a Canvas 2D particle field sampled from the ProdMan logo's alpha channel, with pointer response, ambient drift, a spectral sheen/scan effect, a pause control, `prefers-reduced-motion` support, and off-screen/background-tab suspension.
- `docs/ARCHITECTURE.md`, `docs/DECISIONS.md`, `docs/HANDOFF.md` — Codex's own running log. Its `HANDOFF.md` explicitly states: *"The final production framework and page architecture have not been selected yet"* and lists next steps as *"Choose the final application stack, convert `brand-orbit` into a reusable hero component, and build the event journey from `resources/Event-Details.txt`."*
- `output/playwright/*.png` — verified screenshots at 1440×1000 (desktop) and 390×844 (mobile), confirming the hero already works and is responsive.
- `image/Prodman-Logo.{svg,png,jpeg,ico}` — the logo already converted into production formats.

**What this means practically:**

1. **The hero (Section 0) is not a blank page to design — it's built, tested, and good.** It already reads as bold/experimental/dark, matches the brand voice in `resources/`, and bakes in accessibility (motion controls) that most student club sites skip. Section 8.0 below documents it as the current baseline rather than proposing something new.
2. **The framework decision this PRD makes (Section 9) should be treated as the answer to Codex's open question**, and `docs/HANDOFF.md` / `AGENTS.md`'s blank "Stack" fields should be updated to point at this PRD once it's approved — otherwise the next Codex session re-litigates a decision that's already been made twice (once in conversation with Om, and now here).
3. **Recommend telling both agents/sessions to treat this file as the shared source of truth** for scope and sequencing going forward, so the two workstreams don't diverge.

**Update, 2026-08-08 — v1 built.** Item 2 above is done: Next.js (App Router) is now the actual implemented stack, on branch `feat/nextjs-v1` (committed, not yet merged or deployed). The hero was ported faithfully into `components/hero/`; all 9 sections exist. `AGENTS.md` and `docs/HANDOFF.md` have been updated to point back at this PRD. Two new content conflicts surfaced during the build and were deliberately left unresolved rather than auto-picked: `resources/First-Event.txt` (a different "Event 1" than the one already built) and `resources/Preview.txt` (alternate hero copy) — see the open questions at the end of this document.

---

## 2. Vision & North Star

> *"Build ProdMan Club's definitive digital identity: an immersive, memorable showcase of who we are, what we build, our people, culture, work and impact — a website members are proud to share and visitors instantly associate with world-class product thinking."*
> — Om Umrania, project owner

This is reinforced by the brand voice already established in `resources/`: witty, confident, question-first ("Wait… why is this so difficult?", "Full-time 'Why?' person"), never generic. The website's job is to *read* the way the club *talks*.

## 3. Goals (in priority order, as selected)

The site is optimized for all four of the following simultaneously — they're treated as compounding, not competing:

1. **Win Awwwards / external credibility** — craft and originality are non-negotiable, not a nice-to-have layered on top of a normal site.
2. **Recruit new members** — every persona in Section 4 needs a legible path to "join."
3. **Serve as an internal hub** — current members use it for events, resources, and directory, not just prospects.
4. **Showcase to recruiters/sponsors/partners** — proof of caliber via real projects and outcomes, not just claims.

### Success metrics (proposed — confirm before build)

| Metric | Target signal |
|---|---|
| WhatsApp community joins | Click-throughs on the Section 5 CTA |
| Newsletter signups | Form completions, Section 5 |
| Event registrations | Click-throughs on Section 2 CTAs (needs a backend — see Section 11) |
| Awwwards submission | Site of the Day / Honorable Mention / Developer Award |
| Session quality | Scroll depth to Section 8 (Projects), time on Product Breakdown (Section 6) |
| Recruiter/sponsor credibility | Qualitative — does Projects (Section 8) hold up to external scrutiny |

## 4. Target audience (from `resources/Who-we-cater-to?.txt`)

The club explicitly serves five overlapping personas — the site's tone and nav must speak to all five without defaulting to "just for coders":

| Persona | Hook |
|---|---|
| The Product Thinkers | "What problem are we actually solving?" |
| The Tech Builders | Turn "What if?" into "It works." |
| The AI Explorers | Imagine what AI should do next, not just prompt it |
| The Design Minds | If users need a manual, something's already gone wrong |
| The Curious Generalists | No technical title required — curiosity is the only prerequisite |

Closing line already drafted: *"Coders build it. Designers shape it. Product minds question it. AI transforms it. We bring them all together."*

This maps directly to the whiteboard's item 4: "Tech + AI heavy roles" (4.1, the core segment) plus "set of people from other interest domains who want to understand technology" (4.2, the Curious Generalists). No new copy needed here — it's complete.

## 5. Design & inspiration direction

**⚠️ Direction change, 2026-08-08 — read this before anything else in this section.** Om has now directed that **penguin-capital.co.jp is the PRIMARY theme reference**, superseding the earlier "Bold, experimental, threejs.org-led" choice (Section 5 originally, and the Aesthetic question in the first clarifying round). This is not a minor tweak — I opened the live site in a real browser (not just a text fetch) and screenshotted three sections to verify, and **the visual language is close to the opposite of what's currently built.** Section 5a below documents what I actually saw. Section 5b spells out exactly what this conflicts with, because there's real work already built and written under the old direction that this doesn't automatically resolve — that needs a decision from Om, not a silent rewrite from me.

### 5a. penguin-capital.co.jp — verified by screenshot, not just markdown fetch

- **Palette: monochrome, not neon.** Near-black/charcoal gradient background with a subtle grain/vignette texture and faint vertical hairlines. Text is off-white/light-gray. Across the hero, "Brand Message/Approach" section, and "Business" section, **I saw zero saturated color accents** — no blue, no green, no purple, nothing like ProdMan's current cyan/acid palette.
- **Typography: elegant display serif + classical serif, not condensed sans + monospace.** The headline treatment ("Be First Penguin," "Rebuild") uses a large, high-contrast, almost hand-lettered/cursive serif — editorial, fashion-magazine energy, not tech/hacker energy. Nav and body copy use a more restrained classical serif. There is no monospace anywhere I saw (no "coordinate readout" or "terminal" styling).
- **Motifs:** a recurring thin-line circular/orbital graphic (concentric arcs, an atom/electron-orbit icon) as decorative background texture. Small parenthetical section labels — "(Approach)", "(Brand Message)", "(Business)" — mark section transitions instead of eyebrow-caps like ProdMan's current "PRODUCT MANAGEMENT CLUB · 2026".
- **Content pattern:** numbered sections ("01. Asset Management") pairing a large serif headline with a thin horizontal rule and a short paragraph; duotone/monochrome-treated photography (a desaturated mountain landscape) as full-bleed background texture behind copy.
- **Pacing:** a percentage-based preloader ("Now loading... X%"), a "Scroll ↓" cue, generous whitespace, restraint over density — closer to penguin-capital.co.jp/en's own general reputation (scroll-driven, corporate-luxury) than the "bold experimental" description originally used to rule it out.

### 5b. Resolved 2026-08-08 — Hybrid: penguin-capital structure, ProdMan's own color

Om's decision: **take penguin-capital's typography restraint, motifs, and pacing as the primary theme — keep ProdMan's neon acid/cyan as its own accent-color layer on top.** Concretely, this means:

| Element | Governed by penguin-capital (primary theme) | Governed by ProdMan (kept as-is) |
|---|---|---|
| Background | Near-black/charcoal, subtle grain/vignette texture | — |
| Color accents | — | Acid-green `#c9ff3d` / cyan `#70efff` stay as the site's accent colors, not replaced with monochrome |
| Typography | **Adopt an editorial display serif** for headlines (penguin-capital direction), paired with a clean sans or the existing monospace for labels/meta | — |
| Motifs | Thin-line circular/orbital graphics, numbered sections ("01. ..."), small parenthetical section labels ("(Approach)"-style) | The particle-hero effect itself, the "coordinate readout" Easter egg detail |
| Pacing | Generous whitespace, restraint over density, percentage-based preloader | — |
| Content | — | `Event-Details.txt` and `Join-whatsapp-community-content.txt`'s existing visual-direction notes (electric blue/purple/neon green accents) **stay valid, no rewrite needed** |

**What this means for what's already built:** the hero (`index.html` / `resources/prodman-living-logo/`, Section 8.0) is **not being thrown out**. Its neon particle system and coordinate-readout detail survive as ProdMan's accent layer. What should change, when the hero gets touched next, is the **typography** — the current condensed-sans wordmark/headline treatment should move toward an editorial serif to pick up penguin-capital's structural influence, per the updated Section 7 typography note below. This is a lighter, incremental change to the hero rather than a rebuild.

**Still open:** exactly which serif pairs well with keeping a monospace/technical accent for labels (rather than penguin-capital's classical-serif-everywhere approach) is a real typeface-selection task, not yet done — see Section 7.

### 5c. Resolved 2026-08-08 — Add an editorial neo-brutalist light mode

Om approved a complete light counterpart rather than replacing the existing dark identity. **Update 2026-08-10:** every fresh page load must now start in light mode regardless of system preference or previously stored browser data. Dark mode remains available through the visible control for the current visit, but the selection does not persist across a full reload. The approved balance is **70% neo-brutalist / 30% editorial restraint**: warm paper, near-black ink, the existing acid/cyan accents, selective purple/coral fields, 2px structural borders, hard offset shadows, square controls, and the existing Fraunces/Inter/mono typography. Every major surface—including the preloader and living-logo canvases—must be theme-aware; dark mode remains intact.

### 5d. threejs.org and awwwards.com — now secondary, pattern-level references only

Both remain useful for specific structural patterns, demoted from "primary aesthetic" to "borrow the mechanic, not the mood":

- **threejs.org** — clean hierarchical nav, minimalist dark aesthetic, and a huge dense grid of project thumbnails as social proof at the bottom of the homepage. Still the right density model for Section 8.8 (Our Projects).
- **awwwards.com** — dark background, minimal chrome, card-based showcase grids (a "Site of the Day" hero slot with a numeric score, a "Nominees" grid, a "Recent Sites of the Day" carousel; each card = thumbnail + title + creator + link). Still the right card anatomy for Section 8.8. No explicit Design/Usability/Creativity/Content weighting shown on its homepage (Section 6).

**Patterns that still hold regardless of which primary theme wins** (structural, not color/type-dependent):

1. **Section 8.8 (Our Projects):** threejs.org's density + awwwards.com's card anatomy (thumbnail + title + meta line + link).
2. **Section 8.7 (Resources):** penguin-capital's "Knowledge Hub" pattern — dated cards with a tag and short snippet.
3. **A percentage-based preloader**, now confirmed directly from penguin-capital rather than inferred — Section 10.
4. **Numbered-card storytelling** (penguin-capital's "01. Asset Management") validates what ProdMan already does independently in Product Breakdown (8.6) and Events (8.2).
5. **Optional, still undecided:** awwwards.com's numeric-score convention for Projects — a real product decision (rating/voting + data model), not just style. See open questions.

## 6. Awwwards craft lens

Awwwards judging is commonly understood to weight roughly: **Design ~40%, Usability ~30%, Creativity ~20%, Content ~10%.** Note on sourcing: I fetched awwwards.com's homepage live (Section 5) — it shows the *output* of judging (a numeric score per site, e.g. "7.21/10") but not this category breakdown, which if published lives on a different page. The percentages above are still from general/training knowledge, not something I've confirmed on-site this session — worth a quick check of awwwards.com's own "how judging works" page before treating the split as gospel. Mapping the site to that:

- **Design** — the palette/type system in Section 7, consistent spacing, a considered custom cursor, no stock imagery.
- **Usability** — fast load despite the animation layer, obvious CTAs, full mobile parity (already proven for the hero), no dead-end sections.
- **Creativity** — the living-logo hero is already a strong, original hook. Section 8 needs at least one more moment of original interaction (candidate: an interactive version of the Product Breakdown wheel, Section 6) so the whole site isn't "cool hero, normal rest."
- **Content** — already the club's biggest asset. The copy in `resources/` is sharp and distinctive; the build must not flatten it into generic web-agency tone.

## 7. Brand identity & assets

**Already exists:**

| Asset | Location | Status |
|---|---|---|
| Logo (SVG source) | `/Downloads/Prodman-Logo.svg` (also `image/Prodman-Logo.svg`) | Wordmark/mark lockup |
| Logo (production formats) | `image/Prodman-Logo.{png,jpeg,ico}` | Converted, in use in hero + favicon |
| Color tokens (extracted from `resources/prodman-living-logo/prodman-living-logo.css`) | see below | Informal — not yet documented as a system |
| Body/display typeface | `"Arial Narrow", "Helvetica Neue", Helvetica, Arial, sans-serif` | **System font placeholder** — flagged below |
| Monospace accent typeface | `"SFMono-Regular", Consolas, monospace` | Used for label/coordinate details |

**Current color system (from `resources/prodman-living-logo/prodman-living-logo.css :root`):**

```
--ink:   #050505   near-black background
--paper: #f4f5f0   off-white foreground
--muted: rgba(244,245,240,0.58)   secondary text
--line:  rgba(244,245,240,0.14)   hairlines/dividers
--cyan:  #70efff   accent
--acid:  #c9ff3d   accent (lime/acid green)
```

This is a good, on-brief starting palette (matches the "electric blue/purple/neon green" direction from `resources/Event-Details.txt`, though purple isn't in it yet — the events section calls for purple as a third accent, so either add a purple token or confirm two accents is intentional). **Recommend formalizing this as `tokens.css` or a Tailwind theme before more sections get built**, so every new section pulls from the same source instead of re-deriving colors.

**Typography gap:** `Arial Narrow` is a system-font placeholder, not a licensed or distinctive display face. For an Awwwards-caliber site this is the single biggest visual risk right now — the hero's headline "Build what should exist." is doing a lot of work in a very plain typeface. **Recommend selecting a real display typeface** before locking the rest of the type scale.

**Resolved 2026-08-08 (Section 5b):** direction is a hybrid, not a full penguin-capital match. **Adopt an editorial display serif** for headlines (picking up penguin-capital's structural influence — large, high-contrast, distinctive at big sizes), but **keep the existing monospace** (`SFMono-Regular`/Consolas) for labels/meta/coordinate-readout details, since that's part of ProdMan's own accent layer that's staying. Unlike penguin-capital's classical-serif-everywhere approach, body copy can likely stay a clean sans for legibility at smaller sizes — a serif-everywhere system wasn't part of the decision, just the headline treatment. Next step: pick an actual display serif (variable font if possible) and confirm it pairs well against the existing monospace before locking the type scale.

**MU affiliation:** confirmed **prominent** per Om's decision — and it's already implemented this way in the hero (`MASTERS' UNION · GURUGRAM` in the header meta line). Carry this same prominence into a persistent site header/footer once more sections exist (see Section 12). Official MU logo assets now exist to back this up: `resources/brand-info/Masters Union Logo White.png` (wordmark + icon, transparent, white — ready to sit on the dark background) and `Masters Union Icon Logo.jpeg` (icon-only, on white — needs a transparent/dark-safe export before use).

**Update — a fuller brand asset pack landed after this PRD was first drafted**, in `resources/brand-info/`:

| Asset | Location | Notes |
|---|---|---|
| ProdMan logo, 6 colorways | `resources/brand-info/Brand/prodman-club-logo-{black,white,dark,light,saffron-ink,saffron-white}*` | Each as a static PNG (600×600 square + white/black also at 1024/2048 wide) **and** an animated GIF |
| ProdMan logo, vector | `prodman-club-logo-{black,white}.svg` | |
| MU logo | `resources/brand-info/Masters Union Logo White.png`, `Masters Union Icon Logo.jpeg` | Official, not club-made |
| Event Requirement and Budget Form.docx | `resources/brand-info/` | Club-ops admin doc — out of scope for the website, noted for completeness only |

I checked the actual pixels rather than trusting filenames: **`dark`** is a near-black square with a white mark+wordmark — this is the one that already matches the hero's `--ink`/`--paper` palette almost exactly, i.e. it's likely the intended canonical variant for the site. **`saffron-white`** is a solid golden/saffron square (not in the site's current cyan/acid palette at all) with a white mark — reads like an institutional/social-stamp colorway (LinkedIn avatar, certificate, printed collateral) rather than a web theme color.

This changes two things from the original draft of this PRD:

1. The hero currently sources its particle-sampled logo from `resources/prodman-living-logo/Prodman-Logo.png` — worth checking whether that's pixel-identical to the new canonical `prodman-club-logo-dark-static.png`/`.svg`, or whether the hero should be repointed at this newer, presumably-official asset.
2. **Animated GIF logo lockups already exist** (`*-dark.gif`, `*-light.gif`, `*-saffron-ink.gif`, `*-saffron-white.gif`) — i.e. someone has already produced an *official* motion treatment of the logo, separate from the custom-built Canvas 2D particle animation. Worth clarifying intent: are these GIFs earlier/alternate concepts the particle hero has now superseded, or an official motion-brand standard the custom animation should stay consistent with (timing, easing, reveal style)? Not a blocker, but worth a five-minute look together before assuming one made the other obsolete.

## 8. Information architecture — the sequence

Per the whiteboard, and per Om's explicit instruction to keep the sequence intact, the site is nine sections in this order. The member-card fields (picture, quirky-manner summary, superpower, contact) are **not** a 10th section — they're the field spec for Section 1's cards.

| # | Section | Source content | Status |
|---|---|---|---|
| 0 | Hero | *(built directly, no resource file)* | ✅ Built & tested |
| 1 | Members / Team | `Team-Summary.txt` + `team-photos/` | ⚠️ Partial |
| 2 | Event Information | `Event-Details.txt` | ✅ Complete |
| 3 | Mission / Outcome | `Outcome-of-ProdMan-Club.txt` | ✅ Complete |
| 4 | Who We Cater To + Offerings | `Who-we-cater-to?.txt` | ⚠️ Personas complete, "Offerings" sub-block undefined |
| 5 | Community CTA (WhatsApp + Newsletter) | `Join-whatsapp-community-content.txt` | ✅ Complete |
| 6 | Product Breakdown | `ProdMan-breakdown.txt` | ✅ Complete |
| 7 | Resources / Libraries | — | ❌ Missing entirely |
| 8 | Our Projects | — | ❌ Missing entirely |

### 8.0 Hero (built)

Current implementation, verified in `output/playwright/`:

- Eyebrow: `PRODUCT MANAGEMENT CLUB · 2026`
- Headline: **"Build what should exist."**
- Body: *"We question boldly, prototype rapidly, and turn messy problems into products that matter."*
- Signal strip: `DISCOVER — DESIGN — VALIDATE — SHIP`
- Scroll cue: `EXPLORE`
- Geo Easter egg: `28.4595° N / 77.0266° E` (Gurugram coordinates) + `IDENTITY / 01` · `BUILD MODE: ON`
- Persistent header: wordmark `PROD/MAN`, `MASTERS' UNION · GURUGRAM`, pause-motion control

**Two things to reconcile before calling this final:**

1. The whiteboard explicitly calls for the hero to carry a **CTA about "what's happening next"** (i.e., upcoming events), separate from the generic `EXPLORE` scroll cue. Right now there's no direct link to Section 2. Recommend adding a live "next event" chip using the urgency copy already written for the 14 Aug workshop (see Section 13 — this is time-sensitive).
2. The signal strip says **DISCOVER / DESIGN / VALIDATE / SHIP**, but `Event-Details.txt`'s four-event journey is **Discover → Design → Validate → Showcase** (heading: "From Problem to Product"). "SHIP" vs. "Showcase" is a small but real inconsistency once Section 2 is built and visitors can compare the two — recommend picking one word and using it in both places.

### 8.1 Members / Team

**Field spec per member card** (from whiteboard's "Part of it" bracket): picture, one-line-to-short-paragraph summary in a "quirky manner," superpower, contact/socials.

**Full verbatim content that exists** (`Team-Summary.txt`), four members:

**Om Umrania**
> "I build AI products, decode data, and occasionally make 13 AI agents work together without starting a rebellion. From RAG systems to automation workflows, I enjoy taking ambitious ideas from 0→1 and turning them into products that create real impact. My superpower? Switching between product strategy and technical execution without losing the plot—or the user."
>
> Superpower: "Going from 'This sounds impossible' to 'I've already built a prototype.' 💡"
>
> Connect: [LinkedIn](https://www.linkedin.com/in/omumrania) · [GitHub](https://github.com/om-umrania) · [Portfolio](https://omumrania.com/)

**Muskan Sharma**
> "I am an AI product enthusiast who loves turning messy problems into simple, user-focused solutions. With around 3.5 years of experience across AI consulting, product discovery, and strategy, I enjoy connecting business needs with technology. My superpower is bringing structure to chaos and taking ideas from 'What if?' to 'It's live!' 🚀"
>
> Superpower ⚡: "Bringing structure to chaos. Give me an ambiguous problem, five conflicting stakeholder opinions, and a tight deadline—and I'll turn them into a clear plan that everyone can rally around."
>
> Contact: 📧 muskan.sharma2027@mastersunion.org · 💼 [LinkedIn](https://linkedin.com/in/muskan-sharma-273128193) · 📍 Gurugram, India

**Akshat Dhaundiyal**
> "I'm a data scientist evolving into a product builder—because predicting outcomes is fun, but shaping them is even better. I use AI, analytics, and automation to turn complex business. From simplifying enterprise workflows to building AI-powered tools, I enjoy taking ideas beyond dashboards and putting them into action."
>
> "My superpower is spotting patterns hidden in chaos and converting them into decisions people can actually act on. 💭"
>
> Connect: [LinkedIn](https://www.linkedin.com/in/akshat-dhaundiyal-1664a9122) · akshat.dhaundiyal2027@mastersunion.org

**Supriya** *(no last name given in source)*
> "I'm a Product Manager who gets unreasonably excited about problems. From building products from 0→1 to now building communities, I'm happiest somewhere between 'what if?' and 'let's ship it.'"
>
> "⚡ Superpower: Turning ambiguity into action."

| Member | Bio | Superpower line | Contact | Photo |
|---|---|---|---|---|
| Om Umrania | ✅ | ✅ | LinkedIn, GitHub, Portfolio | — |
| Muskan Sharma | ✅ | ✅ | Email, LinkedIn, location | ✅ `Muskan-Photo.jpg` |
| Akshat Dhaundiyal | ✅ | ✅ | LinkedIn, email | — |
| Supriya | ✅ (shorter) | ✅ | — none given — | ✅ `Supriya-Photo.jpg` |

**Two source-file issues to clean up, found only by reading line-by-line rather than trusting the summary:**

- Akshat's bio contains an apparently incomplete sentence: *"I use AI, analytics, and automation to turn complex business. From simplifying enterprise workflows..."* — reads like a dropped word or phrase after "business" (e.g. "...business **problems**." or "...business **decisions**."). Needs a quick check with Akshat before this goes live as-is.
- The file has a stray leftover heading, "Akshat Summary," directly above "Akshat Dhaundiyal" (looks like a copy-paste artifact from whatever tool/template generated the doc) — harmless, but worth a one-line cleanup pass on `Team-Summary.txt` itself.

**Implementation update, 2026-08-08:** the content gap above has been closed in the application data. The section now contains seven people — Sai Harsha Sadhu, Akhil Menon, Anusha P. B., Akshat Dhaundiyal, Muskan Sharma, Supriya, and Om Umrania — with a photo and profile for each. The raw source photos remain inconsistent, so the shipped visual treatment uses normalized transparent WebP cutouts under `public/team/cutouts/` while retaining the originals.

The section is deliberately **visual-first rather than biography-first**. A fanned, selectable portrait deck is the default experience; one name, role, and sourced superpower appear for the active person. Full source bios are retained behind an explicit “Read the full story” disclosure. Arrow buttons, direct-select dots, portrait selection, horizontal swipe, and Left/Right/Home/End keyboard navigation all address the same active profile. Fine-pointer cards respond magnetically with restrained tilt, portrait counter-motion, and glare; touch and reduced-motion users receive the same content and controls without those animated responses.

**Interaction update, 2026-08-09:** the cohort label is now “The crew of 2026–27.” Owner-confirmed role stamps are President (Sai Harsha Sadhu), Vice President (Akhil Menon), and Member (the remaining five people). The active portrait card exposes compact Read More, LinkedIn, and Email actions when their source URLs exist. Selecting a portrait moves to the synchronized inline profile; Read More opens a statically generated `/team/[slug]` profile page with the full sourced story, contact links, and previous/next member navigation. A normal tap/click is used instead of long-press so the action remains discoverable, keyboard-operable, and compatible with horizontal swipe.

**Remaining member-content gaps:** Supriya still has no last name or contact/socials in `Team-Summary.txt`, and Akshat’s repaired source sentence still needs his confirmation. These are content-quality gaps, not reasons to revert to an incomplete team roster.

### 8.2 Event Information (complete)

`Event-Details.txt` is written as a design brief (it literally opens "Design a visually engaging 'Event Information' section..."), not just copy — content and layout direction are interleaved. Full extraction below.

**Heading:** "From Problem to Product"
**Subheading:** *"Four high-energy experiences designed to take you through the complete product-building journey—discover, design, validate, and launch."*

**Layout instruction (verbatim):** modern vertical timeline or four interactive cards; each card must include event number, title, date, internal/external badge, one tagline, a 2–3 line description, key learning outcomes, and a CTA button.

| # | Event | Date | Type | Tagline | Description | Outcomes | CTA |
|---|---|---|---|---|---|---|---|
| 1 | Product Design Workshop & Hackathon | 14 Aug 2026 | Internal | "Bring a problem. Leave with a prototype." | Participants identify a meaningful problem, understand their users, generate ideas, and build a rapid prototype in one intensive product-design experience. | Problem discovery, design thinking, ideation, rapid prototyping | "Register Now" + urgency badge "Less than a week to go" |
| 2 | The Product Challenge | 9 Oct 2026 | External Flagship | "Solve beyond the classroom." | Participants tackle a real-world product challenge, uncover user insights, define a product strategy, and pitch a feasible and impactful solution. | User research, product strategy, prioritisation, solution pitching | "Coming Soon" |
| 3 | Build, Test & Iterate | 4 Dec 2026 | Internal | "Great products are not born finished—they evolve." | Teams test assumptions, gather feedback, measure outcomes, and improve their early solutions through rapid iterations. | Validation, user testing, metrics, product iteration | "Save the Date" |
| 4 | Product Showcase: The Grand Finale | 5 Feb 2027 | External Grand Finale | "From your first problem statement to a product worth presenting." | Teams present their refined products to industry leaders, mentors, and fellow builders, demonstrating the complete journey from problem discovery to final execution. | Product showcase, expert feedback, networking, recognition | "Save the Date" |

**Visual direction (verbatim):** bold/youthful/product-and-technology-focused; dark background with electric blue, purple, and neon green accents; connect all four events with a progress line; colour-code internal vs. external badges; subtle hover animations and product-related icons; highlight the nearest event with a countdown/urgency treatment; clean, premium, responsive, easy to scan.

⚠️ **See Section 13 — Event 1 is 6 days from today (2026-08-08) and its copy says "Register Now."** This needs a real registration flow before Section 2 goes live, not just design.

⚠️ **The full read surfaces a three-way naming inconsistency for the fourth journey stage, not the two-way one flagged in 8.0** — the section's own **framing sentence** calls the journey *"Discover → Design → Validate → **Showcase**,"* but its **subheading copy**, one paragraph later in the same file, says *"...discover, design, validate, and **launch**."* Add the built hero's signal strip (*"DISCOVER — DESIGN — VALIDATE — **SHIP**"*) and there are now three different words for the same fourth stage across two files: **Showcase / launch / SHIP**. Recommend picking one and using it everywhere (hero signal strip, section heading framing, subheading copy, and Event 4's own title "Product Showcase: The Grand Finale" — which itself argues for "Showcase" as the canonical word, since it's already in an event title).

### 8.3 Mission / Outcome (complete)

`Outcome-of-ProdMan-Club.txt` maps to the whiteboard's item 3 ("Outcome of the ProdMan Club [Mission Statement]: why do we exist"). Full copy exists as **four sequential sub-blocks** — content is complete, but unlike Sections 2 and 5, **this file carries no visual/interaction direction at all** (no layout, animation, or CTA notes), so that's an open design decision, not a content gap. Extracted in full below so nothing gets lost in the build:

**1. Why Do We Exist?**
> "Because great products don't begin with features. They begin with 'Wait… why is this so difficult?'"
>
> "The Product Management Club is where curious minds become confident product builders. We question the obvious, obsess over users, challenge assumptions, and occasionally debate button placements longer than we'd like to admit."
>
> "Through hands-on workshops, live challenges, industry conversations, and rapid experiments, we turn messy problems into thoughtful products—and classroom concepts into real product decisions."

**2. Who Are We?**
> "A slightly over-curious mix of future product managers, designers, strategists, technologists, and builders."
>
> "We may approach problems differently, but we share one belief: the best way to understand a product is to roll up your sleeves and build one."

**3. Our Mission**
> "To create a playground where aspiring product minds can question boldly, think strategically, build rapidly, fail safely, and iterate relentlessly."

**4. What Comes Out of It?** (six-item list + closing line)
1. Ideas that escape the sticky-note stage
2. Problems understood before solutions are built
3. Decisions backed by users—not assumptions
4. Prototypes tested before becoming "revolutionary"
5. Stronger portfolios and sharper product instincts
6. A community that loves asking, "But what problem are we actually solving?"

> Closing line: "We don't just talk product. We think it, test it, break it, rebuild it—and make it matter."

**Two things worth flagging from a full read of this file, not just a summary:**

- **Recurring-motif opportunity:** the line *"But what problem are we actually solving?"* (item 4, bullet 6) is **not unique to this file** — it reappears almost verbatim in `Who-we-cater-to?.txt`'s Product Thinkers persona ("For aspiring PMs, strategists, problem-solvers, and anyone constantly asking: 'What problem are we actually solving?'"). That's two independently-written files converging on the same line, which reads like an intentional club catchphrase even if it wasn't planned that way. Worth considering as a deliberate visual/scroll motif tying Section 3 and Section 4 together (e.g. the phrase recurs as a pull-quote or scroll-triggered callback) rather than letting it appear twice by coincidence.
- **Content overlap to resolve:** "Who Are We?" here (self-description: *"future product managers, designers, strategists, technologists, and builders"*) covers very similar ground to Section 4's five audience personas (Product Thinkers, Tech Builders, AI Explorers, Design Minds, Curious Generalists) — one describes the club's existing self-image, the other describes who should join. They're conceptually distinct (internal identity vs. external invitation) but visually risk feeling redundant back-to-back. See open questions below.

### 8.4 Who We Cater To + Offerings

**Full verbatim content** (`Who-we-cater-to?.txt`):

**Heading:** "Who Is This For?"
> "For the ones who don't just use technology—they question it, reimagine it, and build what comes next."
>
> "We bring together ambitious minds working at the intersection of Product, Technology, and AI. Whether you write code, design experiences, decode user behaviour, or simply have an idea you cannot stop thinking about—there's a place for you here."

| Persona | "You..." line | "For..." line |
|---|---|---|
| The Product Thinkers | "You see a frustrating experience and immediately start redesigning it in your head." | "For aspiring PMs, strategists, problem-solvers, and anyone constantly asking: 'What problem are we actually solving?'" |
| The Tech Builders | "You turn 'What if?' into 'It works.'" | "For developers, engineers, no-code explorers, and technical minds ready to transform ambitious ideas into functional products." |
| The AI Explorers | "You don't just prompt AI—you imagine what it should do next." | "For curious minds experimenting with agents, automation, GenAI, intelligent experiences, and the products shaping tomorrow." |
| The Design Minds | "You know that if users need a manual, something has already gone wrong." | "For designers and experience enthusiasts who care about making products intuitive, useful, and impossible to ignore." |
| The Curious Generalists | "No technical title? No problem. Curiosity is the only prerequisite." | "For marketers, consultants, founders, operators, and business minds who want to understand how meaningful products move from insight to impact." |

**Closing statement:**
> "Coders build it. Designers shape it. Product minds question it. AI transforms it. We bring them all together."
>
> "If you're curious enough to ask 'Why?' and bold enough to build 'What's next?'—you belong here."

**Offerings gap confirmed on full read:** there is no "Offerings" sub-block anywhere in this file — the whiteboard's item 4 sub-note (4.1/4.2, "who we cater to" + "offerings") is fully answered by the five personas above, but nothing here describes *what the club actually offers* each of them. Recommend not inventing a large new content block for it — instead render it as a compact "what you get" summary (Events / Product Breakdown / Resources / Community / Projects) with anchor links down to those sections, since that's effectively what the club already offers and it avoids duplicating content that lives better in Sections 2, 6, 7, 8.

### 8.5 Community CTA — WhatsApp + Newsletter (complete)

`Join-whatsapp-community-content.txt` is also a design brief (opens "Create a bold, high-conversion community section..."). Full extraction:

**Headline:** "Don't Just Watch Products Evolve. Be Part of What's Next."
**Supporting copy:** "Get event drops, product insights, AI trends, opportunities, resources, and the occasional hot take—delivered directly to you."

**Card 1 — WhatsApp Community**
- Title: "Join the Product Circle"
- Tagline: "Where product conversations continue after the event ends."
- Description: "Get instant event updates, workshop announcements, opportunities, resources, and connect with people who are equally obsessed with building better products."
- Highlights: Be the first to know about upcoming events · Meet fellow builders and product enthusiasts · Discover competitions, projects, and opportunities · Exchange ideas, feedback, and useful resources
- CTA: "Join the WhatsApp Community →", with a WhatsApp icon and the line "Less noise. More product." near the button

**Card 2 — Newsletter**
- Title: "Product Drops, Minus the Fluff"
- Tagline: "Sharp product thinking, delivered to your inbox."
- Description: "A curated dose of product breakdowns, AI developments, useful frameworks, industry insights, opportunities, and everything worth knowing in the product world."
- Elements: email input field; CTA button "Send Me the Good Stuff →"; privacy note "No spam. No boring emails. Unsubscribe anytime."
- Topic tags: Product Teardowns | AI Trends | PM Frameworks | Opportunities | Club Updates

**Closing statement (spans both cards):** "Your next idea, opportunity, teammate, or breakthrough might be one update away."

**Visual direction (verbatim):** modern split-screen or two-card layout, WhatsApp left / Newsletter right; dark, premium technology-inspired background; vibrant green accents on the WhatsApp card; electric blue or purple accents on the newsletter card; subtle gradients, soft glows, hover animations; playful product-related microcopy; youthful, bold, minimal, responsive; both CTAs highly visible; stack vertically on mobile; avoid excessive text, keep strong hierarchy.

**Dependency, not a content gap:** the newsletter card needs a real email-capture backend (ESP like Mailchimp/ConvertKit, or a Supabase table) before this can ship — see Section 11.

### 8.6 Product Breakdown (complete)

**Full verbatim content** (`ProdMan-breakdown.txt`):

**Heading:** "What Is ProdMan?"
> "Part detective. Part strategist. Part builder. Full-time 'Why?' person."
>
> "Product Management—or ProdMan, as we like to call it—is the wonderfully chaotic art of figuring out: What should we build? Why should we build it? Who needs it? And please… will anyone actually use it?"
>
> "It sits at the intersection of users, business, technology, design, data, and AI—turning confusing problems, competing opinions, and an alarming number of sticky notes into products people genuinely want."

**Sub-heading:** "Everything Under the ProdMan Umbrella" — 8 sub-areas:

| # | Sub-area | Hook line | Description | Tags |
|---|---|---|---|---|
| 1 | Spot the Problem | "Because 'I have a cool app idea' is not user research." | Talk to users, uncover real frustrations, validate assumptions, and identify problems worth solving. | User Research · Personas · Jobs to Be Done · Problem Validation |
| 2 | Shape the Strategy | "Decide where the product is going—and why anyone should follow." | Define the vision, understand the market, create value, and find a reason for the product to win. | Product Vision · Market Research · Positioning · Business Models |
| 3 | Design the Experience | "If users need instructions for the 'simple' flow, we need to talk." | Map journeys, create wireframes, build prototypes, and design experiences that make sense outside the team meeting. | UX · User Journeys · Wireframes · Prototyping |
| 4 | Choose What Gets Built | "One roadmap. Fifty feature requests. Zero extra developers. Good luck." | Prioritise ruthlessly, define the MVP, manage trade-offs, and confidently say 'not yet' to approximately everyone. | Roadmaps · MVPs · RICE · Backlogs |
| 5 | Build With the Team | "The PM doesn't build everything—but somehow knows what everyone is building." | Work with designers, engineers, marketers, analysts, and stakeholders to transform ideas into working products. | PRDs · User Stories · Agile · Product Launches |
| 6 | Let the Data Judge | "Everyone has opinions. The funnel has receipts." | Track what users do—not just what they say. Measure adoption, conversion, engagement, retention, and everything between 'signed up' and 'never returned.' | Metrics · Funnels · A/B Testing · Retention |
| 7 | Make It Grow | "Launching the product was the beginning, not the victory lap." | Run experiments, improve activation, create growth loops, and give users compelling reasons to stay and return. | Growth · Experiments · Product-Led Growth · Optimisation |
| 8 | Add AI — Responsibly | "No, adding 'AI-powered' to the landing page does not count." | Design intelligent experiences, evaluate models, manage accuracy, reduce bias, and ensure AI solves a real problem instead of becoming a decorative feature. | GenAI · AI Agents · Evaluations · Responsible AI |

**Closing block — "The Short Version"** *(missed in the original draft of this PRD, only surfaced on a full re-read — worth calling out since it's the section's actual punchline, not filler):*
> "Find the problem. Understand the human. Navigate the chaos. Build the right thing. Measure whether it worked. Then improve it—again. That's ProdMan."

**CTA:** "Break Down the Product World →"

This is rich enough that it's a strong candidate for the site's one big "creativity" swing (Section 6 in the Awwwards lens above) — e.g. an interactive wheel/orbit visualization rather than a static list, with "The Short Version" as the payoff line once a visitor has explored all 8 spokes.

### 8.7 Resources / Libraries — MISSING

No content file exists. Needs, at minimum before Phase 1 launch: a decision on what counts as a "resource" (articles, tools, templates, past event decks?), and an initial set of 5–10 real items — even a short list beats an empty section. Recommend the club exec team owns this list.

**Layout spec (added 2026-08-08, from penguin-capital.co.jp's live-fetched "Knowledge Hub"):** dated cards, each with a title, a category/type tag, and a short (~2-line) snippet — not a bare link list. Matches the card-with-metadata pattern already used for Events (8.2) and Product Breakdown (8.6), so it stays visually consistent with sections that already have content.

### 8.8 Our Projects — MISSING

No content file exists. This is the section doing the most work for the "external credibility / recruiters & sponsors" goal (Section 3) and it's currently empty. Needs: project name, one-line description, contributors, and ideally a visual/link, for every project the club wants to claim.

**Layout spec (added 2026-08-08, from threejs.org + awwwards.com, both live-fetched):** combine threejs.org's *density* — a real wall of work, not three placeholder cards, is what makes external visitors believe the club is serious — with awwwards.com's *card anatomy*: thumbnail image, title, one short meta line (e.g. contributors or category), and a link, laid out as a scannable grid. This section deserves real investment, not placeholders, before submitting anywhere for awards. (Optional idea, not yet decided: awwwards.com also uses a numeric score per entry — see open question 21 before treating that as in-scope.)

## 9. Technical architecture

**Decision, reconciled with the existing prototype (see Section 1):**

- **Framework: Next.js (App Router).** Confirmed with Om, and compatible with what's already built — `docs/ARCHITECTURE.md` already anticipates this exact move: *"In React or Next.js, move the markup into a client component, keep the CSS scoped to that component, and move the animation lifecycle into an effect."* Porting the existing hero should be closer to a lift-and-shift than a rebuild.
- **Animation for page transitions/scroll reveals: Framer Motion**, as discussed.
- **Animation for the hero specifically: keep the existing Canvas 2D particle system**, not React Three Fiber. It's already built, tested, accessible, and performant — R3F/WebGL was my earlier general recommendation before I knew a working hero existed; there's no reason to redo it in WebGL. **Reserve React Three Fiber (true 3D/WebGL) as optional**, for a specific later moment that actually needs it — the Product Breakdown interactive wheel (8.6) or Projects showcase (8.8) are the more likely candidates than the hero.
- **Content in Phase 1: file-based**, mirroring the `resources/*.txt` structure directly as typed data files (JSON/TS/MDX) the exec team edits via PR — no CMS yet. This matches Om's own phasing instruction.
- **Phase 2: custom admin panel backed by Supabase**, per Om's decision, once the site has enough real usage to justify it (30+ members, weekly content changes per the scale confirmed earlier). Auth restricted to club exec / `@mastersunion.org` emails.
- **Deployment:** not yet decided — Vercel is the natural pairing for Next.js and worth confirming, but flagged as open rather than assumed.

### Phasing

| Phase | Scope |
|---|---|
| **Phase 1** | Next.js port of the existing hero + all 9 sections built from `resources/` content, file-based data, no backend beyond a newsletter ESP integration — **built 2026-08-08, branch `feat/nextjs-v1`, not yet deployed** |
| **Phase 2** | Supabase-backed custom admin panel for members/events/projects/resources CRUD, migrating Phase 1's static data into it — not started |

### Data model sketch (Phase 2, Supabase)

- `members` — id, name, role/title, bio, superpower, photo_url, linkedin_url, github_url, portfolio_url, email, program, is_core, sort_order
- `events` — id, number, title, date, type (internal/external), tagline, description, outcomes[], cta_label, cta_url, status (open/coming_soon/save_date), urgency_badge
- `projects` — id, title, description, cover_image_url, tags[], link, contributors[]
- `resources` — id, title, description, category, type (article/tool/template), link
- `newsletter_subscribers` — id, email, subscribed_at, source

(WhatsApp join is an outbound link — no table needed.)

## 10. Global UX / craft requirements

- **Persistent nav/footer:** the current prototype's header only exists inside the hero section (`brand-orbit`). Once Sections 1–8 exist, spec a persistent site header (logo, section jump-links, MU affiliation lockup) and footer (socials, MU disclaimer, WhatsApp/newsletter repeat CTA, sitemap).
- **Motion & accessibility:** already set a strong bar (pause control, `prefers-reduced-motion`, off-screen suspension) — carry this standard into every new animated section, not just the hero.
- **Performance:** the hero already caps device pixel ratio and lowers particle density on small screens. Extend that discipline site-wide — target LCP < 2.5s even with the animation layer; lazy-mount any heavy canvas/WebGL work until it's in viewport.
- **Repeat the community CTA:** the whiteboard places the WhatsApp/newsletter CTA at position 5, before Sections 6–8. Keeping that position as instructed, but recommend a lightweight repeat of the same CTA at the very end (footer) too, since most visitors won't convert on a first mid-scroll pass — this is additive, not a reordering.
- **Preloader (added 2026-08-08):** penguin-capital.co.jp gates its homepage behind a percentage-based "Now loading... X%" screen before reveal — a common Awwwards-caliber craft signal the current ProdMan build doesn't have at all. Recommend adding a short branded loading state (using the logo/particle system already built) rather than a blank flash on first paint. Keep it brief and skippable/instant on repeat visits so it doesn't become a usability tax — it should support the Design/Creativity score, not cost Usability points.

## 11. Dependencies before sections can ship (not content, but blockers)

- **Event registration flow** for Section 2's "Register Now" / "Coming Soon" CTAs — decide Google Form embed vs. custom flow.
- **Newsletter backend** for Section 5 — pick an ESP or build a Supabase-backed capture before that card can go live.
- **MU brand guideline check** — since MU affiliation is prominent, confirm whether Masters' Union has official brand/logo usage rules that constrain the dark/neon palette, before more sections get designed against it.
- **Relationship to `mu-prodman-cc.base44.app`** — the Core Members Application PDF references an existing separate app at this URL for a recruitment assignment. Unclear whether it's meant to stay fully separate from this website or whether content/functionality should eventually connect. Flagging as an open question rather than assuming either way.

## 12. Timeline flag (read this even though "no hard deadline" was the stated answer)

**Today is 2026-08-08. Event 1 (Product Design Workshop & Hackathon) is dated 2026-08-14 — six days away — and its CTA copy is "Register Now" with an urgency badge "Less than a week to go."** That copy was clearly written assuming the site would be live and collecting registrations before the 14th. Worth deciding explicitly, rather than by default: is this event's registration handled elsewhere for now (so the copy's urgency framing doesn't go stale before Section 2 ships), or does Section 2 need to be fast-tracked ahead of the rest of the site? Either is fine — just flagging that it's a real date, not a hypothetical.

## 13. Open questions & risks

1. Full core-member roster (President/VP + anyone else) — bios, superpowers, contact, photos. **Biggest content gap.**
2. "Offerings" copy under Section 4 — proposed to solve via anchor-link summary rather than new copy (8.4).
3. Resources/Libraries (Section 7) and Our Projects (Section 8) have zero content.
4. Event registration backend not yet decided (11).
5. Newsletter backend not yet decided (11).
6. Relationship to `mu-prodman-cc.base44.app` unclear (11).
7. MU brand-guideline constraints unconfirmed (11).
8. Typography is currently a system-font placeholder (`Arial Narrow`) — biggest visual risk for Awwwards Design scoring (7).
9. Three-way naming mismatch for the journey's fourth stage — "Showcase" (Event section framing + Event 4's own title), "launch" (Event section subheading), "SHIP" (built hero signal strip) — pick one (8.0, 8.2).
10. Deployment target not yet chosen (9).
11. ~~penguin-capital.co.jp / awwwards.com characterizations in Section 5 are from general knowledge~~ — **resolved 2026-08-08**: both now live-fetched (Section 5). Only the specific Awwwards Design/Usability/Creativity/Content weighting percentages (Section 6) remain unconfirmed from a live source.
12. Coordination between this PRD and the concurrent Codex session's own docs (Section 1) — recommend explicitly deciding who updates `AGENTS.md`'s blank Stack fields and `docs/HANDOFF.md`'s "Next Steps" once this PRD is approved.
13. No visual/interaction direction exists for Section 3 (Mission/Outcome) — unlike Sections 2 and 5, `Outcome-of-ProdMan-Club.txt` is pure copy with no layout notes (8.3).
14. Whether to treat "But what problem are we actually solving?" as a deliberate recurring motif linking Section 3 and Section 4, since it appears independently in both source files (8.3).
15. Whether Section 3's "Who Are We?" (self-description) and Section 4's five personas (audience invitation) should be visually differentiated to avoid feeling redundant back-to-back (8.3).
16. What "saffron" signifies in the brand pack (8.4-colorway ProdMan logo variant, not currently in the site's cyan/acid palette) — institutional/social-only color, or a third site accent to formalize? (7)
17. Whether the hero's particle-sampled logo source should be repointed from `resources/prodman-living-logo/Prodman-Logo.png` to the newer `resources/brand-info/Brand/prodman-club-logo-dark-static.png`/`.svg` if they're not identical assets. (7)
18. Relationship between the official animated GIF logo lockups in `resources/brand-info/Brand/` and the custom-built Canvas 2D particle hero — alternate concepts, or a motion standard to stay consistent with? (7)
19. Akshat's bio has an apparently-dropped word/phrase ("...to turn complex business. From simplifying...") — needs a quick check with him before publishing (8.1).
20. Supriya has no last name and no contact/socials in `Team-Summary.txt`, unlike the other three members (8.1).
21. Whether to borrow awwwards.com's numeric-score convention (e.g. "7.21/10") for Section 8.8 (Projects) — flagged as an idea, not scoped in, since it implies a real rating/voting mechanic and data model, not just a visual style (8.8).
22. Whether to add a percentage-based preloader (penguin-capital.co.jp pattern) — recommended, but not yet confirmed with Om (10).
23. ~~Highest priority — theme conflict between penguin-capital and the built hero/resource files~~ — **resolved 2026-08-08**: hybrid approach, penguin-capital governs typography/motif/pacing, ProdMan's neon accent colors and existing content stay as-is (5b). Remaining open task from this: actually select the display serif typeface (7).
24. **New, needs Om's call:** `resources/First-Event.txt` ("Design Unscripted," guided by Rohaan Goswami) describes a different "Event 1" than the one already built into Section 8.2 from `resources/Event-Details.txt` ("Product Design Workshop & Hackathon"). Both can't be Event 1 — decide which is canonical, or whether these are two different events entirely (rename/renumber if so) before the Events section is treated as final.
25. **New, needs Om's call:** `resources/Preview.txt` has alternate hero copy ("We Don't Build Features. We Build Reasons to Care." / CTAs "Start Building →" and "Explore ProdMan") not used in the current build — the shipped hero still reads "Build what should exist." Decide whether to swap, and if so, whether it changes the header eyebrow/signal-strip copy that's tuned to the current headline.
26. v1 is built and committed to branch `feat/nextjs-v1` but **not yet deployed** — Vercel connection to `Prodman-MU/prodman-website` is pending explicit go-ahead (Section 1, per Om's stated preference: commit → review → connect Vercel, nothing hits `main` without sign-off).

## 14. Appendix — file inventory referenced in this PRD

```
resources/
  Event-Details.txt                    → Section 2 (complete)
  Join-whatsapp-community-content.txt  → Section 5 (complete)
  Outcome-of-ProdMan-Club.txt          → Section 3 (complete)
  ProdMan-breakdown.txt                → Section 6 (complete)
  Team-Summary.txt                     → Section 1 (4 of ? members)
  Who-we-cater-to?.txt                 → Section 4 (complete)
  team-photos/Muskan-Photo.jpg
  team-photos/Supriya-Photo.jpg

image/
  Prodman-Logo.{svg,png,jpeg,ico}      → brand assets, already integrated
  reference-info.jpeg                  → whiteboard photo (source for IA sequence)

resources/brand-info/
  Brand/prodman-club-logo-*            → 6 colorways × {static PNG, animated GIF}, + black/white SVG
  Masters Union Logo White.png, Masters Union Icon Logo.jpeg → official MU logo assets
  Event Requirement and Budget Form.docx → club-ops doc, out of scope for the site

index.html + resources/prodman-living-logo/ → Section 0 hero, reusable and tested
output/playwright/*.png                     → verified desktop/mobile screenshots

docs/ARCHITECTURE.md, DECISIONS.md, HANDOFF.md → concurrent Codex session's own log
AGENTS.md, PLANS.md                    → concurrent Codex session's operating instructions
```
