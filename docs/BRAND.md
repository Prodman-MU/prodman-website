# ProdMan Club — BRAND.md

| | |
|---|---|
| **Club** | ProdMan Club (Product Management Club), Masters' Union, Gurugram |
| **Prepared by** | Claude, self-interviewed per Om's "brand director" prompt |
| **Method** | Answered by reading the codebase (`lib/content.ts`, all `components/sections/*`, `app/globals.css`), live-screenshotting the running site (`localhost:3311`) via MCP, reading `docs/PRD.md` and `docs/DECISIONS.md`, and cross-checking against Masters' Union's own public description of the club |
| **Status** | Draft v1 — for Om's review. This is a synthesis of decisions already made across `docs/PRD.md` and `docs/DECISIONS.md`, not a new direction. |

> This file distills an already-scattered brand (PRD Section 5, 7; ten separate DECISIONS.md entries; `resources/*.txt` copy) into one place a designer or copywriter can open cold and get it right on the first try. Where the site's own code disagrees with itself (see Guardrails → "known drift"), that's flagged rather than silently resolved.

---

## Why ProdMan exists (context for everything below)

ProdMan doesn't sell a product — it sells **the experience of building one**, to Masters' Union students who want proof they can do product work before a company will pay them to. The club's own mission copy (`Outcome-of-ProdMan-Club.txt`, shipped verbatim in `WhoAreWe.tsx`) is the clearest version of "why," and it's a genuine answer, not boilerplate:

> "Because great products don't begin with features. They begin with 'Wait… why is this so difficult?'"

Masters' Union's own official one-liner for the club (fetched live from `mastersunion.org/clubs-and-fests`, not just this repo's self-description) independently confirms the same positioning: *"The PM Club builds future product leaders who bridge business, design, and tech through strategy sessions and hands-on projects."* Two independently-written descriptions — the club's internal voice and MU's institutional copy — converge on the same idea: **this is a practice space for product thinking, not a lecture series about it.**

---

## World

**Mood:** Confident and a little cheeky — a serious craft studio that refuses to take itself too seriously. The tone is "we obsess over users and also debate button placements longer than we'd like to admit" (verbatim mission copy). Visually this lands as **neo-brutalist with editorial restraint**, a 70/30 split Om approved explicitly (`DECISIONS.md`, 2026-08-08): loud sticky-note cards and hard offset shadows, disciplined by generous whitespace and a numbered, penguin-capital-derived section grammar (`(Who It's For)`, `01 —`).

**Colours:**
- **Ink** `#050505` near-black / **Paper** `#f4f5f0` off-white — the base duality; which one is background vs. foreground flips between dark and light mode, not two different palettes.
- **Acid** `#c9ff3d` (lime) — the loudest, most load-bearing accent. Sticky-note highlights, CTA buttons, active states.
- **Cyan** `#70efff` — secondary accent, cooler counterweight to acid.
- **Purple** `#b9a7ff` and **Coral** `#ff8d63` — tertiary accents, used sparingly for badge variety (e.g. event-type tags) so the palette doesn't collapse into "green website."
- Never the saffron/gold institutional colourway (`prodman-club-logo-saffron-*`) as a web accent — see Guardrails.

**Light:** No gradients-as-decoration, no soft glow-everything. Light is either flat colour fields (the hero's four pastel quadrants) or a fine dot-grid/grain texture — a printed-paper feel, not a screen-glow feel. Shadows are hard-edged and offset (comic/sticker style), never soft drop shadows.

**Surfaces:** Two literal surface metaphors recur across the site and should be treated as the house motif, not one-off decoration: **sticky notes** (hero event previews, the pull-quote block, audience cards — cream cards, thick black border, offset shadow, slightly rotated) and **a portrait deck fanned like a hand of cards** (the Members section). Both read as "someone's actual workspace," which matches the mission copy's own image of sticky-note debates.

**Type:** Fraunces (serif, editorial, occasionally italic for emphasis — "*The Next-Gen*") for display headlines; Inter for body; SFMono for labels, timestamps, and coordinate-style Easter eggs (`28.4595° N / 77.0266° E`). The serif carries warmth and confidence; the mono carries the "we're building something technical" credibility layer. Never let body copy run in the mono — it's a label/accent face only.

**Motion:** A pointer-following ring+dot custom cursor that changes label on hover (`data-cursor-text="Join"`, `"Open"`, `"Explore"`) — small, confident micro-copy rather than a generic pointer swap. A percentage preloader (0→100%) on first paint per session. Scroll-triggered reveals (fade/translate), magnetic tilt on fine-pointer cards, all of it gated behind `prefers-reduced-motion` with **zero content loss** for reduced-motion or touch users — this isn't a nice-to-have, it's in `DECISIONS.md` as a explicit non-negotiable three separate times.

---

## Customer

**Not a demographic — one person.** The site currently speaks to five personas at once (Product Thinkers, Tech Builders, AI Explorers, Design Minds, Curious Generalists) recently distilled to four punchier cards (Product Folks, Tech Gurus, Business Folks, Creative Ones). That breadth is correct for *who's welcome*, but it's not who the brand should be *written for*. Pushing on that: if forced to pick one visitor whose eyes are on the screen right now, it's —

**A Masters' Union student, second-guessing whether they're "technical enough" to belong in product, who has a half-formed opinion about a bad app they use every day.** They're not a coder by training. They might be a strategy or business-track student. What they have is the instinct in the site's own copy: *"You see a frustrating experience and immediately start redesigning it in your head."* They are curious before they are credentialed — the club's self-description ("a slightly over-curious mix") is written in their voice, not at them.

What they need from the site in the first ten seconds: proof this isn't a resume-padding club with a Notion page — real dates, real people with faces and LinkedIns, a real "here's exactly what Product Management even is" breakdown (the eight-spoke wheel), and permission to show up without a technical title. What they're afraid of: that "Product Management Club" means sitting through case-study lectures. The whole site's job is to prove, visually, in the first three seconds, that it's the opposite — hands-on, funny, fast-moving, unmistakably built by people who make things rather than talk about making things.

**Secondary audience, explicitly not primary:** recruiters, sponsors, and Awwwards judges. They matter (Projects and the craft bar exist partly for them), but the copy voice should never shift to address them directly — their trust is earned by overhearing a site that's confidently talking to the student, not by a site that switches into pitch-deck mode.

---

## Voice

**How captions/copy should sound:** Question-first, self-aware, confident without being try-hard. The house rhetorical move is **posing the real question before answering it** — "Wait… why is this so difficult?", "What should we build? Why should we build it? Who needs it? And please… will anyone actually use it?" This isn't accidental; it's the same move repeated across three independently-written source files, which is what makes it a voice rather than a one-off line.

**Concrete calibration, pulled from copy already shipped and judged good by the club:**
- *"Part detective. Part strategist. Part builder. Full-time 'Why?' person."* — the house rhythm: short declarative fragments building to one punchline.
- *"We don't predict the future. We build what deserves to exist in it."* — confident, slightly defiant, never boastful about credentials (no "award-winning," no "industry-leading").
- *"One roadmap. Fifty feature requests. Zero extra developers. Good luck."* — self-deprecating about the actual chaos of the job, which reads as more credible than pretending PM is glamorous.
- *"Less noise. More product."* / *"Send Me the Good Stuff →"* — CTAs are never generic ("Submit," "Learn More"). Every button is a tiny piece of voice.

**Registers to hit:** funny without being a meme account; technical without gatekeeping (jargon like "RICE," "JTBD" appears but always paired with a plain-English hook line first); warm about the people (member bios keep their own first-person quirks — "occasionally make 13 AI agents work together without starting a rebellion" — rather than being flattened into LinkedIn-speak).

---

## Guardrails

**Never fabricate content to fill a gap.** This is already codified as a code comment at the top of `lib/content.ts` — *"Content sourced verbatim from resources/*.txt... Do not invent copy here; add a 'Coming Soon' state instead when content doesn't exist yet"* — and it's visibly followed: Resources and Projects both ship honest dashed-border "Coming Soon" panels rather than placeholder lorem-ipsum content or fake case studies. Extend this rule beyond code: no fake testimonials, no invented alumni outcomes, no stock photography standing in for real members.

**Never let the neon/acid palette slide into generic "startup tech" territory.** The saffron/gold colourway in the official brand pack reads as institutional/certificate use (LinkedIn avatar, printed collateral) — it should never appear as a web accent color; mixing it in dilutes the acid/cyan identity into "we didn't decide."

**Never drop Masters' Union affiliation, but never let it dominate.** MU affiliation is confirmed prominent by explicit decision (`MASTERS' UNION · GURUGRAM` in the persistent header) — it should never be hidden or minimized. Equally, it should never grow past a supporting credential line into the actual brand voice; ProdMan's copy voice is distinctly its own (funnier, weirder) and shouldn't flatten toward institutional-brochure tone to match MU's.

**Never ship a motion-heavy moment without its reduced-motion / keyboard-only twin.** Three separate `DECISIONS.md` entries exist because this got re-litigated three times — treat it as permanently non-negotiable, not a per-feature judgment call. A visual that only works for a mouse-and-full-motion visitor is not done.

**Never address the reader as if they need to be sold on being technical.** No "no coding required, don't worry!" apologetic framing — the copy invites the Curious Generalist in *as an equal*, not as a guest who needs reassurance. Compare the shipped line: *"No technical title? No problem. Curiosity is the only prerequisite"* — confident, not apologetic.

**Known drift to resolve, not to copy as "brand":** the fourth event-journey stage is inconsistently named "Showcase" (event section framing, Event 4's title) vs. "Ship" (hero signal strip, footer) vs. "Launch" (event subheading) across different files still live in the repo. `Event 4: "Showcase"` is the strongest canonical candidate since it's already load-bearing in a real event title — but until Om picks one, don't treat any of the three as the "correct" brand word to imitate elsewhere.

---

## Scorecard — how to judge a visual

A new section, card, or animation is **on-brand** when it can honestly check most of these:

1. **Does it survive being read as a sticky note or a card, not a hero image?** The house unit of content is a bordered, offset-shadow card with one punchline and one supporting line — not a full-bleed photo with overlay text.
2. **Is there a question in the first line?** If the copy opens with a statement instead of an implicit or explicit question, it's probably generic-web-agency voice, not ProdMan voice.
3. **Would it still make sense with the color stripped to grayscale?** Neo-brutalist craft should come from typography, border weight, and shadow offset first — acid/cyan should read as accent, not as the thing doing all the work.
4. **Does the mono type only appear on labels/meta, never on a full sentence of body copy?** Mono is a technical-credibility accent, not a reading face.
5. **Is it still fully legible and navigable with motion off and a keyboard only?** Not "does it degrade gracefully" — does it lose *zero* information.
6. **Does it earn a laugh or a nod before it earns a click?** — the Awwwards "Creativity" bar the club has already hit with the Members deck and the living-logo hero; a new section should clear the same bar, not just be competent.
7. **If content is missing, does it say so honestly** (a "Coming Soon" panel, a "Details TBD" badge) **rather than fake it?** A confident-but-honest gap beats a filled-in lie every time — this is the single most load-bearing guardrail in the whole system.
8. **Does Masters' Union stay visible but stay quiet?** — present in the meta line, absent from the punchlines.

If a visual fails (1), (2), or (7), it's not a polish problem — it's off-brand, not just unfinished.
