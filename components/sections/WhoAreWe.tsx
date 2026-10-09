"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { whoWeAre } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { useHydratedReducedMotion } from "@/components/motion/useHydratedReducedMotion";
import styles from "./WhoAreWe.module.css";

const CARD_ACCENTS = ["var(--cyan)", "var(--coral)", "var(--purple)"] as const;
const CARD_ROTATIONS = ["-1.6deg", "1.1deg", "-0.7deg"] as const;
const CARD_COUNT = whoWeAre.paragraphs.length;
const AUTO_ADVANCE_MS = 8000;

type CardStyle = CSSProperties & { "--accent": string; "--rotate": string };

function cardStyleFor(index: number): CardStyle {
  return {
    "--accent": CARD_ACCENTS[index % CARD_ACCENTS.length],
    "--rotate": CARD_ROTATIONS[index % CARD_ROTATIONS.length],
  };
}

export function WhoAreWe() {
  const shouldReduceMotion = useHydratedReducedMotion();
  const carouselRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);

  // Native scrolling supplies touch momentum and scroll snapping. Copies on
  // either side let both arrows and swipes wrap without reversing direction.
  // Only the middle copy is exposed to assistive technology.
  useEffect(() => {
    const track = trackRef.current;
    const carousel = carouselRef.current;
    if (!track || !carousel) return;
    let settleTimer: ReturnType<typeof setTimeout>;
    const getStep = () => {
      const cards = track.children;
      return (cards[1] as HTMLElement).offsetLeft - (cards[0] as HTMLElement).offsetLeft;
    };
    const settle = () => {
      const step = getStep();
      if (!step) return;
      const position = Math.round(track.scrollLeft / step);
      const index = ((position % CARD_COUNT) + CARD_COUNT) % CARD_COUNT;
      activeIndexRef.current = index;
      setActiveIndex(index);
      if (position < CARD_COUNT || position >= CARD_COUNT * 2) {
        track.scrollTo({ left: (CARD_COUNT + index) * step, behavior: "instant" });
      }
      setInteracting(false);
    };
    const onScroll = () => {
      setInteracting(true);
      clearTimeout(settleTimer);
      // Fallback for browsers without scrollend; wait until momentum stops.
      settleTimer = setTimeout(settle, 180);
    };
    const onScrollEnd = () => {
      clearTimeout(settleTimer);
      settle();
    };
    const resize = () => {
      track.scrollTo({ left: (CARD_COUNT + activeIndexRef.current) * getStep(), behavior: "instant" });
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(track);
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting && entry.intersectionRatio >= 0.3),
      { threshold: 0.3 },
    );
    visibilityObserver.observe(carousel);
    const onVisibility = () => setTabVisible(!document.hidden);
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    track.addEventListener("scroll", onScroll, { passive: true });
    track.addEventListener("scrollend", onScrollEnd);
    return () => {
      clearTimeout(settleTimer);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      track.removeEventListener("scroll", onScroll);
      track.removeEventListener("scrollend", onScrollEnd);
    };
  }, []);

  const advance = useCallback((direction: number) => {
    const track = trackRef.current;
    if (!track) return;
    const cards = track.children;
    const step = (cards[1] as HTMLElement).offsetLeft - (cards[0] as HTMLElement).offsetLeft;
    const position = Math.round(track.scrollLeft / step);
    track.scrollTo({ left: (position + direction) * step, behavior: shouldReduceMotion ? "instant" : "smooth" });
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (!playing || shouldReduceMotion || hovered || focused || interacting || !visible || !tabVisible) return;
    const timer = setInterval(() => advance(1), AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [advance, playing, shouldReduceMotion, hovered, focused, interacting, visible, tabVisible, activeIndex]);

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
            <span className={styles.quoteMark} aria-hidden="true">“</span>
            {whoWeAre.lede}
          </blockquote>
        </Reveal>

        <div
          ref={carouselRef}
          className={styles.carousel}
          role="region"
          aria-roledescription="carousel"
          aria-label="About ProdMan Club"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocusCapture={() => setFocused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
          }}
        >
          <div
            ref={trackRef}
            id="who-are-we-cards"
            className={styles.cards}
            tabIndex={0}
            aria-label="Club introduction cards. Use left and right arrow keys to browse."
            onKeyDown={(event) => {
              if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
              event.preventDefault();
              advance(event.key === "ArrowRight" ? 1 : -1);
            }}
          >
            {[0, 1, 2].flatMap((copy) => whoWeAre.paragraphs.map((paragraph, index) => (
              <div
                key={`${copy}-${index}`}
                className={styles.cardItem}
                role={copy === 1 ? "group" : undefined}
                aria-roledescription={copy === 1 ? "slide" : undefined}
                aria-label={copy === 1 ? `${index + 1} of ${CARD_COUNT}` : undefined}
                aria-hidden={copy !== 1 ? true : undefined}
                inert={copy !== 1 ? true : undefined}
              >
                <div className={styles.card} style={cardStyleFor(index)}>
                  <span className={styles.cardIndex} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <p>{paragraph}</p>
                </div>
              </div>
            )))}
          </div>
          <div className={styles.controls}>
            <span className={styles.position} aria-live={playing && !shouldReduceMotion ? "off" : "polite"} aria-atomic="true">
              {String(activeIndex + 1).padStart(2, "0")} / {String(CARD_COUNT).padStart(2, "0")}
            </span>
            <div className={styles.buttons}>
              <button type="button" className={styles.control} aria-label="Previous introduction card" aria-controls="who-are-we-cards" onClick={() => advance(-1)}>
                <span aria-hidden="true">←</span>
              </button>
              {!shouldReduceMotion && (
                <button type="button" className={`${styles.control} ${styles.playControl}`} aria-label={playing ? "Pause automatic cycling" : "Start automatic cycling"} onClick={() => setPlaying((current) => !current)}>
                  {playing ? "Pause" : "Play"}
                </button>
              )}
              <button type="button" className={styles.control} aria-label="Next introduction card" aria-controls="who-are-we-cards" onClick={() => advance(1)}>
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>

        <Reveal delay={0.15} amount={0.3} className={styles.closingWrap}>
          <div className={styles.closingBanner}>
            <span className={styles.closingBadge} aria-hidden="true">★</span>
            <p className={styles.closing}>{whoWeAre.closing}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
