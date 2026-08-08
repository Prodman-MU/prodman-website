"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Preloader.module.css";
import { usePreloaderCanvas } from "./usePreloaderCanvas";

interface PreloaderProps {
  /** Optional callback fired when exit transition finishes */
  onComplete?: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [shouldRender, setShouldRender] = useState(true);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("[ 01 / 04 ] INITIALIZING BRAND CORE");
  const [isExiting, setIsExiting] = useState(false);

  const holdBeatTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reducedMotionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { canvasRef } = usePreloaderCanvas("/brand/prodman-logo.png", progress);

  useEffect(() => {
    if (!shouldRender) {
      return;
    }

    try {
      const isForced = window.location.search.includes("preloader=force");
      const hasSeen = sessionStorage.getItem("prodman_preloader_seen") === "true";
      const htmlSeenClass = document.documentElement.classList.contains("preloader-seen");
      if ((hasSeen || htmlSeenClass) && !isForced) {
        queueMicrotask(() => {
          setShouldRender(false);
          onComplete?.();
        });
        return;
      }
    } catch {
      // Storage access blocked or restricted environment
    }

    // Scrollbar width compensation for CLS prevention during body scroll lock
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // Check reduced motion preference
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      queueMicrotask(() => {
        setProgress(100);
        setStatusText("[ 04 / 04 ] BUILD MODE: ON");
      });
      try {
        sessionStorage.setItem("prodman_preloader_seen", "true");
      } catch {
        // Storage access blocked
      }

      reducedMotionTimerRef.current = setTimeout(() => {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
        setShouldRender(false);
        onComplete?.();
      }, 150);

      return () => {
        if (reducedMotionTimerRef.current) clearTimeout(reducedMotionTimerRef.current);
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
      };
    }

    // Smooth counter tick over ~1600ms non-linear cubic ease-out
    const startTime = performance.now();
    const duration = 1600;
    let animationFrameId: number;

    const updateCounter = (now: number) => {
      const elapsed = now - startTime;
      const linearProgress = Math.min(1, elapsed / duration);
      // Cubic ease-out curve: 1 - (1 - t)^3
      const easedProgress = Math.round((1 - Math.pow(1 - linearProgress, 3)) * 100);

      setProgress(easedProgress);

      if (easedProgress < 25) {
        setStatusText("[ 01 / 04 ] INITIALIZING BRAND CORE");
      } else if (easedProgress < 60) {
        setStatusText("[ 02 / 04 ] SAMPLING ALPHA MESH");
      } else if (easedProgress < 90) {
        setStatusText("[ 03 / 04 ] SYNCHRONIZING PARTICLES");
      } else {
        setStatusText("[ 04 / 04 ] BUILD MODE: ON");
      }

      if (linearProgress < 1) {
        animationFrameId = requestAnimationFrame(updateCounter);
      } else {
        try {
          sessionStorage.setItem("prodman_preloader_seen", "true");
        } catch {
          // Storage access blocked
        }

        // Hold beat at 100% for 250ms, then trigger exit transition
        holdBeatTimerRef.current = setTimeout(() => {
          setIsExiting(true);
          exitTimerRef.current = setTimeout(() => {
            document.body.style.overflow = "";
            document.body.style.paddingRight = "";
            setShouldRender(false);
            onComplete?.();
          }, 600); // matches CSS exit transition duration
        }, 250);
      }
    };

    animationFrameId = requestAnimationFrame(updateCounter);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (reducedMotionTimerRef.current) clearTimeout(reducedMotionTimerRef.current);
      if (holdBeatTimerRef.current) clearTimeout(holdBeatTimerRef.current);
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [onComplete, shouldRender]);

  if (!shouldRender) return null;

  const formattedPercentage = String(progress).padStart(3, "0");

  return (
    <div
      id="brand-preloader"
      className={`${styles.preloaderWrapper} ${isExiting ? styles.exiting : ""}`}
      role="progressbar"
      aria-label="Loading site content"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-busy={progress < 100}
    >
      <div className={styles.ambientGrid} aria-hidden="true" />
      <div className={`${styles.orb} ${styles.orbCyan}`} aria-hidden="true" />
      <div className={`${styles.orb} ${styles.orbAcid}`} aria-hidden="true" />

      {/* Living Logo Particle Canvas */}
      <div className={styles.logoContainer} aria-hidden="true">
        <canvas ref={canvasRef} className={styles.particleCanvas} />
        <div className={`${styles.logoSheen} ${progress === 100 ? styles.sheenActive : ""}`} />
      </div>

      {/* Technical Status Readout & Counter */}
      <div className={styles.counterSection}>
        <div className={styles.statusMeta}>
          <span className={styles.signalDot} aria-hidden="true" />
          <span className={styles.statusText}>{statusText}</span>
        </div>

        <div className={styles.percentageDisplay}>
          <span className={styles.percentNumber}>{formattedPercentage}</span>
          <span className={styles.percentSymbol}>%</span>
        </div>

        {/* Hairline Progress Track */}
        <div className={styles.progressTrack} aria-hidden="true">
          <div
            className={styles.progressBar}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
