"use client";

import Image from "next/image";
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

      <header className={styles.siteHeader}>
        <a className={styles.wordmark} href="#hero" aria-label="ProdMan Club home">
          <span className={styles.wordmarkSignal} aria-hidden="true" />
          PROD/MAN
        </a>
        <p className={styles.siteHeaderMeta}>
          <Image
            src="/brand/masters-union-logo-white.png"
            alt=""
            width={27}
            height={14}
            className={styles.muLogo}
          />
          <span>MASTERS&rsquo; UNION &middot; GURUGRAM</span>
        </p>
        <button
          className={styles.motionControl}
          type="button"
          aria-pressed={paused}
          onClick={toggleMotion}
        >
          <span
            className={`${styles.motionControlIcon} ${paused ? styles.motionControlIconPaused : ""}`}
            aria-hidden="true"
          />
          <span className={styles.motionControlLabel}>{paused ? "Play motion" : "Pause motion"}</span>
        </button>
      </header>

      <canvas ref={canvasRef} className={styles.brandParticles} aria-hidden="true" />

      <div className={`${styles.coordinate} ${styles.coordinateLeft}`} aria-hidden="true">
        <span>28.4595&deg; N</span>
        <span>77.0266&deg; E</span>
      </div>
      <div className={`${styles.coordinate} ${styles.coordinateRight}`} aria-hidden="true">
        <span>IDENTITY / 01</span>
        <span>BUILD MODE: ON</span>
      </div>

      <div className={styles.logoSystem} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative ghost layer behind the particle canvas; next/image's wrapper would fight the absolute-position/CSS-mask setup used here */}
        <img className={styles.logoSystemGhost} src="/brand/prodman-logo.png" alt="" />
        <div className={styles.logoSystemSheen} />
        <div className={styles.logoSystemScan} />
      </div>

      <div className={styles.heroCopy}>
        <p className={styles.heroCopyEyebrow}>PRODUCT MANAGEMENT CLUB &middot; 2026</p>
        <SplitHeading as="h1" id="hero-title" text="Build what should exist." />
        <p className={styles.heroCopyBody}>
          We question boldly, prototype rapidly, and turn messy problems into products that matter.
        </p>
      </div>

      <div className={styles.signalStrip} aria-hidden="true">
        <span>DISCOVER</span>
        <i />
        <span>DESIGN</span>
        <i />
        <span>VALIDATE</span>
        <i />
        <span>SHOWCASE</span>
      </div>

      <a className={styles.eventChip} href="#events">
        <span className={styles.eventChipDot} aria-hidden="true" />
        <span>
          {NEXT_EVENT.date} &middot; {NEXT_EVENT.label}
        </span>
        <span className={styles.eventChipUrgency}>{NEXT_EVENT.urgency}</span>
      </a>

      <div className={styles.scrollCue} aria-hidden="true">
        <span>EXPLORE</span>
        <i />
      </div>
    </section>
  );
}
