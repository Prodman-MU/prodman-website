"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { whoWeAre } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import { useHydratedReducedMotion } from "@/components/motion/useHydratedReducedMotion";
import { useMediaQuery } from "@/components/motion/useMediaQuery";
import styles from "./WhoAreWe.module.css";

const CARD_ACCENTS = ["var(--cyan)", "var(--coral)", "var(--purple)"] as const;
const CARD_ROTATIONS = ["-1.6deg", "1.1deg", "-0.7deg"] as const;

const cardLiftSpring = { type: "spring", stiffness: 340, damping: 24, mass: 0.8 } as const;

type CardStyle = CSSProperties & { "--accent": string; "--rotate": string };
type CountStyle = CSSProperties & { "--count": number };

function cardStyleFor(index: number): CardStyle {
  return {
    "--accent": CARD_ACCENTS[index % CARD_ACCENTS.length],
    "--rotate": CARD_ROTATIONS[index % CARD_ROTATIONS.length],
  };
}

export function WhoAreWe() {
  const cardCount = whoWeAre.paragraphs.length;

  // Below 720px (this section's existing mobile breakpoint) the three cards
  // become a scroll-pinned horizontal filmstrip instead of stacking
  // vertically: the vertical scroll gesture drives horizontal movement
  // through the cards, then releases back into normal page scroll once the
  // last card has passed. Falls back to the original stacked layout when
  // the user prefers reduced motion.
  const isMobile = useMediaQuery("(max-width: 720px)");
  const shouldReduceMotion = useHydratedReducedMotion();
  const useHorizontalScroll = isMobile && !shouldReduceMotion;

  const trackOuterRef = useRef<HTMLDivElement>(null);
  const trackStickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // The card's height is content-driven (no forced 100svh box — that left
  // dead space above/below a shorter card), so the pin's scroll-linked
  // progress can't be derived from a viewport-relative target offset either
  // (that only lines up with the sticky's real stuck duration when the
  // sticky height equals the viewport height). Instead we measure the
  // sticky's actual geometry — its height, how far it needs to sit below
  // the fixed nav, and how far the track still has to travel — and drive
  // the horizontal scroll directly off the raw page scroll position.
  const [pin, setPin] = useState<{ navOffset: number; outerHeight: number; start: number; distance: number }>();

  useEffect(() => {
    if (!useHorizontalScroll) return;
    const outerEl = trackOuterRef.current;
    const stickyEl = trackStickyRef.current;
    const trackEl = trackRef.current;
    if (!outerEl || !stickyEl || !trackEl) return;

    const navEl = document.querySelector("nav");

    const measure = () => {
      const navOffset = navEl ? navEl.getBoundingClientRect().height : 0;
      const distance = trackEl.scrollWidth - stickyEl.clientWidth;
      const outerTop = outerEl.getBoundingClientRect().top + window.scrollY;
      // Sticky engages once (scrollY + navOffset) reaches outerTop, i.e. at
      // scrollY = outerTop - navOffset — not at outerTop itself.
      setPin({ navOffset, outerHeight: stickyEl.offsetHeight + distance, start: outerTop - navOffset, distance });
    };
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(stickyEl);
    observer.observe(trackEl);
    if (navEl) observer.observe(navEl);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [useHorizontalScroll]);

  const { scrollY } = useScroll();
  const x = useTransform(
    scrollY,
    pin ? [pin.start, pin.start + pin.distance] : [0, 1],
    pin ? [0, -pin.distance] : [0, 0],
  );

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
          ref={trackOuterRef}
          className={useHorizontalScroll ? styles.trackOuter : undefined}
          style={
            useHorizontalScroll
              ? ({ "--count": cardCount, height: pin?.outerHeight } as CountStyle)
              : undefined
          }
        >
          {useHorizontalScroll ? (
            <div ref={trackStickyRef} className={styles.trackSticky} style={{ top: pin?.navOffset }}>
              <motion.div ref={trackRef} className={styles.track} style={{ x }}>
                {whoWeAre.paragraphs.map((paragraph, index) => (
                  <div key={paragraph} className={styles.trackItem}>
                    <div className={styles.card} style={cardStyleFor(index)} data-cursor-text="Us">
                      <span className={styles.cardIndex} aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p>{paragraph}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
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
