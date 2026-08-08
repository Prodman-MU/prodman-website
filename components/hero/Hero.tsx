"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import styles from "./Hero.module.css";
import { useLivingLogo } from "./useLivingLogo";

const NEXT_EVENT = {
  label: "Product Design Workshop & Hackathon",
  date: "14 Aug",
  urgency: "Less than a week to go",
};

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

      <Reveal variant="fadeIn" delay={0.1} as="header" className={styles.siteHeader}>
        <motion.a
          className={styles.wordmark}
          href="#hero"
          aria-label="ProdMan Club home"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          data-cursor-text="Home"
        >
          <span className={styles.wordmarkSignal} aria-hidden="true" />
          PROD/MAN
        </motion.a>
        <p className={styles.siteHeaderMeta}>
          <Image
            src="/brand/masters-union-logo-white.png"
            alt=""
            width={27}
            height={14}
            className={styles.muLogo}
          />
          <span>MASTERS&rsquo; UNION</span>
        </p>
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

      <canvas ref={canvasRef} className={styles.brandParticles} aria-hidden="true" />

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

      <div className={styles.heroCopy}>
        <Reveal variant="fadeUp" delay={0.2} y={16}>
          <p className={styles.heroCopyEyebrow}>PRODUCT MANAGEMENT CLUB &middot; 2026</p>
        </Reveal>
        <SplitHeading as="h1" id="hero-title" text="Build what should exist." />
        <Reveal variant="fadeUp" delay={0.45} y={20}>
          <p className={styles.heroCopyBody}>
            We question boldly, prototype rapidly, and turn messy problems into products that matter.
          </p>
        </Reveal>
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

      <Reveal variant="scaleUp" delay={0.7} y={12}>
        <motion.a
          className={styles.eventChip}
          href="#events"
          whileHover={{ y: -3, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          data-cursor-text="14 Aug"
        >
          <span className={styles.eventChipDot} aria-hidden="true" />
          <span>
            {NEXT_EVENT.date} &middot; {NEXT_EVENT.label}
          </span>
          <span className={styles.eventChipUrgency}>{NEXT_EVENT.urgency}</span>
        </motion.a>
      </Reveal>

      <Reveal variant="fadeIn" delay={0.85} className={styles.scrollCue}>
        <span>EXPLORE</span>
        <i />
      </Reveal>
    </section>
  );
}
