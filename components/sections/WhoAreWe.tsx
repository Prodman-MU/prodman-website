"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { whoWeAre } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import { useHydratedReducedMotion } from "@/components/motion/useHydratedReducedMotion";
import styles from "./WhoAreWe.module.css";

const CARD_ACCENTS = ["var(--cyan)", "var(--coral)", "var(--purple)"] as const;
const CARD_ROTATIONS = ["-1.6deg", "1.1deg", "-0.7deg"] as const;

const cardLiftSpring = { type: "spring", stiffness: 340, damping: 24, mass: 0.8 } as const;

// Fixed-duration spring for the pinned card-stack's step transitions — the
// outgoing card recedes (shrinks/fades back), the incoming card comes
// forward, independent of scroll speed. Each card's variant is a pure
// function of `index === activeIndex`, so reversing scroll direction just
// swaps which cards are "active"/"inactive" — no direction tracking needed.
const stackSpring = { type: "spring", stiffness: 300, damping: 32, mass: 1 } as const;

const cardVariants = {
  active: { opacity: 1, scale: 1, x: 0, y: 0, zIndex: 3 },
  // Not fully transparent: keeps a legible stack visible before JS/scroll
  // measurement has run (first paint, reduced-motion-preference detection,
  // no-JS), and reads better as a card-deck anyway.
  inactive: { opacity: 0.4, scale: 0.85, x: 10, y: 18, zIndex: 1 },
} as const;

type CardStyle = CSSProperties & { "--accent": string; "--rotate": string };

function cardStyleFor(index: number): CardStyle {
  return {
    "--accent": CARD_ACCENTS[index % CARD_ACCENTS.length],
    "--rotate": CARD_ROTATIONS[index % CARD_ROTATIONS.length],
  };
}

export function WhoAreWe() {
  const cardCount = whoWeAre.paragraphs.length;

  // The three cards become a scroll-pinned, depth-receding stack: scrolling
  // through the section holds each card on screen in turn, then snaps to
  // the next (the previous card recedes back into the stack) before
  // releasing back into normal page scroll once the last card has passed.
  // Falls back to the original static grid layout when the user prefers
  // reduced motion. (Currently enabled at all breakpoints — to restrict
  // this back to mobile only, reintroduce `useMediaQuery("(max-width:
  // 720px)")` and AND it into usePinnedStack below.)
  const shouldReduceMotion = useHydratedReducedMotion();
  const usePinnedStack = !shouldReduceMotion;

  const stageOuterRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // All 3 cards stay mounted, stacked in the same CSS grid cell, so .stage's
  // height is pinned to the tallest card by the grid's own auto-sizing —
  // stable all session, no JS measurement needed for that part (see
  // WhoAreWe.module.css). We still need .stage's real pixel height, though,
  // since CSS calc() can't reference an auto grid-track size directly, plus
  // how far each card's scroll "step" (hold, then advance) should span.
  const [pin, setPin] = useState<{ start: number; stepDistance: number; outerHeight: number }>();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!usePinnedStack) return;
    const outerEl = stageOuterRef.current;
    const stageEl = stageRef.current;
    if (!outerEl || !stageEl) return;

    const measure = () => {
      const navHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-height")) || 84;
      // Mirrors WhoAreWe.module.css's old --step-distance: clamp(200px, 30vh,
      // 340px) intent, computed directly in JS rather than round-tripped
      // through a CSS custom property: getComputedStyle().getPropertyValue()
      // on a custom prop returns its literal unresolved value ("clamp(...)"
      // as a string), not the resolved px number, so parseFloat on it is
      // always NaN — a real bug, not a hypothetical one.
      const stepDistance = Math.min(340, Math.max(200, window.innerHeight * 0.3));
      const outerTop = outerEl.getBoundingClientRect().top + window.scrollY;
      // Sticky engages once (scrollY + navHeight) reaches outerTop, i.e. at
      // scrollY = outerTop - navHeight — not at outerTop itself.
      setPin({ start: outerTop - navHeight, stepDistance, outerHeight: stageEl.offsetHeight + cardCount * stepDistance });
    };
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(stageEl);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [usePinnedStack, cardCount]);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!pin) return;
    const raw = Math.floor((latest - pin.start) / pin.stepDistance);
    const next = Math.min(Math.max(raw, 0), cardCount - 1);
    setActiveIndex((current) => (current === next ? current : next));
  });

  return (
    <section id="who-are-we" className={`section ${styles.section}`}>
      <div className={`container ${styles.container}`}>
        <div className={styles.intro}>
          <Reveal amount={0.4}>
            <span className={styles.eyebrow}>({whoWeAre.eyebrow})</span>
          </Reveal>
          <SplitHeading as="h2" className={`section__heading ${styles.heading}`} text={whoWeAre.heading} />
        </div>

        <Reveal delay={0.1} amount={0.3} className={styles.quoteWrap}>
          <blockquote className={styles.quote}>
            <span className={styles.quoteMark} aria-hidden="true">
              “
            </span>
            {whoWeAre.lede}
          </blockquote>
        </Reveal>

        <div
          ref={stageOuterRef}
          className={usePinnedStack ? styles.stageOuter : undefined}
          style={usePinnedStack ? { height: pin?.outerHeight } : undefined}
        >
          {usePinnedStack ? (
            <div ref={stageRef} className={styles.stage}>
              {whoWeAre.paragraphs.map((paragraph, index) => (
                <motion.div
                  key={paragraph}
                  className={styles.cardSlot}
                  initial={false}
                  animate={index === activeIndex ? "active" : "inactive"}
                  variants={cardVariants}
                  transition={stackSpring}
                  style={{ pointerEvents: index === activeIndex ? "auto" : "none" }}
                >
                  <div className={styles.card} style={cardStyleFor(index)} data-cursor-text="Us" data-cursor>
                    <span className={styles.cardIndex} aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p>{paragraph}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <StaggerContainer staggerDelay={0.1} viewportAmount={0.2} className={styles.cards}>
              {whoWeAre.paragraphs.map((paragraph, index) => (
                <StaggerItem key={paragraph} variant="fadeUp" className={styles.cardItem}>
                  <motion.div
                    className={styles.card}
                    style={cardStyleFor(index)}
                    whileHover={{ y: -6, rotate: 0 }}
                    whileTap={{ scale: 0.98 }}
                    transition={cardLiftSpring}
                    data-cursor-text="Us"
                  >
                    <span className={styles.cardIndex} aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p>{paragraph}</p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </div>

        <Reveal delay={0.15} amount={0.3} className={styles.closingWrap}>
          <div className={styles.closingBanner}>
            <span className={styles.closingBadge} aria-hidden="true">
              ★
            </span>
            <p className={styles.closing}>{whoWeAre.closing}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
