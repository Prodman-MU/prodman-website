"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { events, productBreakdown } from "@/lib/content";
import styles from "./Hero.module.css";
import { useLivingLogo } from "./useLivingLogo";

const nextEvent = events[0];

function shortEventDate(fullDate: string) {
  const [day, month] = fullDate.split(" ");
  return `${day} ${month.slice(0, 3)}`;
}

const STAGE_CARDS = [
  {
    stage: "Discover",
    ...productBreakdown.find((item) => item.id === "spot-the-problem")!,
    accent: "var(--acid)",
    className: styles.stageCardDiscover,
  },
  {
    stage: "Design",
    ...productBreakdown.find((item) => item.id === "design-the-experience")!,
    accent: "var(--cyan)",
    className: styles.stageCardDesign,
  },
  {
    stage: "Validate",
    ...productBreakdown.find((item) => item.id === "let-the-data-judge")!,
    accent: "var(--coral)",
    className: styles.stageCardValidate,
  },
  {
    stage: "Showcase",
    title: events[3].title,
    hook: events[3].tagline,
    accent: "var(--purple)",
    className: styles.stageCardShowcase,
  },
] as const;

export function Hero() {
  const { stageRef, canvasRef, paused, toggleMotion } = useLivingLogo("/brand/prodman-logo.png");

  return (
    <section
      ref={stageRef as React.RefObject<HTMLElement>}
      id="hero"
      className={`${styles.brandOrbit} ${paused ? styles.motionPaused : ""}`}
      aria-labelledby="hero-title"
    >
      <div className={styles.ambientGrid} aria-hidden="true" />
      <div className={`${styles.orb} ${styles.orbCyan}`} aria-hidden="true" />
      <div className={`${styles.orb} ${styles.orbAcid}`} aria-hidden="true" />

      <canvas ref={canvasRef} className={styles.brandParticles} aria-hidden="true" />

      <Reveal variant="fadeIn" delay={0.15} className={styles.motionControlFloating}>
        <motion.button
          className={styles.motionControl}
          type="button"
          aria-pressed={paused}
          onClick={toggleMotion}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          data-cursor-text="Toggle"
        >
          <span
            className={`${styles.motionControlIcon} ${paused ? styles.motionControlIconPaused : ""}`}
            aria-hidden="true"
          />
          <span className={styles.motionControlLabel}>{paused ? "Play motion" : "Pause motion"}</span>
        </motion.button>
      </Reveal>

      <Reveal variant="fadeIn" delay={0.85} className={`${styles.coordinate} ${styles.coordinateLeft}`}>
        <span>28.4595&deg; N</span>
        <span>77.0266&deg; E</span>
      </Reveal>
      <Reveal variant="fadeIn" delay={0.85} className={`${styles.coordinate} ${styles.coordinateRight}`}>
        <span>IDENTITY / 01</span>
        <span>BUILD MODE: ON</span>
      </Reveal>

      <div className={styles.logoSystem} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative ghost layer behind particle canvas */}
        <img className={styles.logoSystemGhost} src="/brand/prodman-logo.png" alt="" />
        <div className={styles.logoSystemSheen} />
        <div className={styles.logoSystemScan} />
      </div>

      <div className={styles.stageCards} aria-label="How the club builds: Discover, Design, Validate, Showcase">
        {STAGE_CARDS.map((card, index) => (
          <Reveal
            key={card.stage}
            variant="scaleUp"
            delay={0.5 + index * 0.08}
            y={10}
            className={`${styles.stageCard} ${card.className}`}
          >
            <a
              href="#breakdown"
              className={styles.stageCardLink}
              style={{ "--stage-accent": card.accent } as React.CSSProperties}
              data-cursor-text="Breakdown"
            >
              <span className={styles.stageCardLabel}>{card.stage}</span>
              <span className={styles.stageCardTitle}>{card.title}</span>
              <span className={styles.stageCardHook}>{card.hook}</span>
            </a>
          </Reveal>
        ))}
      </div>

      <div className={styles.heroCopy}>
        <Reveal variant="fadeUp" delay={0.2} y={16}>
          <p className={styles.heroCopyEyebrow}>PRODUCT MANAGEMENT CLUB &middot; 2026</p>
        </Reveal>
        <SplitHeading as="h1" id="hero-title" text="Building the next gen of product leaders." />
      </div>

      <Reveal variant="fadeUp" delay={0.6} y={16} className={styles.signalStrip}>
        <span>DISCOVER</span>
        <i />
        <span>DESIGN</span>
        <i />
        <span>VALIDATE</span>
        <i />
        <span>SHOWCASE</span>
      </Reveal>

      <Reveal variant="scaleUp" delay={0.7} y={12} className={styles.eventChipReveal}>
        <motion.a
          className={styles.eventChip}
          href="#events"
          whileHover={{ y: -3, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          data-cursor-text={shortEventDate(nextEvent.date)}
        >
          <span className={styles.eventChipPulse} aria-hidden="true">
            <span className={styles.eventChipDot} />
          </span>
          <span className={styles.eventChipDate}>{shortEventDate(nextEvent.date)}</span>
          <span className={styles.eventChipBody}>
            <span className={styles.eventChipLabel}>{nextEvent.title}</span>
            <span className={styles.eventChipUrgency}>{nextEvent.urgency}</span>
          </span>
        </motion.a>
      </Reveal>

      <Reveal variant="fadeIn" delay={0.85} className={styles.scrollCue}>
        <a
          href="#who-are-we"
          className={styles.scrollCueButton}
          aria-label="Scroll down to explore"
          data-cursor-text="Scroll"
        >
          <svg className={styles.scrollCueArrow} viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 5v13M12 18l-6-6M12 18l6-6"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </Reveal>
    </section>
  );
}
