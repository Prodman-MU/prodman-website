"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useHydratedReducedMotion } from "@/components/motion/useHydratedReducedMotion";
import styles from "./CustomCursor.module.css";

export function CustomCursor() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [cursorState, setCursorState] = useState<"default" | "hover" | "text" | "active" | "hidden">("default");
  const [cursorLabel, setCursorLabel] = useState<string | null>(null);

  const shouldReduceMotion = useHydratedReducedMotion();

  // Mouse position motion values
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring physics configurations
  const dotSpringConfig = shouldReduceMotion
    ? { stiffness: 1000, damping: 100, mass: 0.01 }
    : { stiffness: 800, damping: 35, mass: 0.1 };

  const ringSpringConfig = shouldReduceMotion
    ? { stiffness: 1000, damping: 100, mass: 0.01 }
    : { stiffness: 220, damping: 24, mass: 0.5 };

  const dotX = useSpring(mouseX, dotSpringConfig);
  const dotY = useSpring(mouseY, dotSpringConfig);
  const ringX = useSpring(mouseX, ringSpringConfig);
  const ringY = useSpring(mouseY, ringSpringConfig);

  useEffect(() => {
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (hasFinePointer) {
      queueMicrotask(() => {
        setIsEnabled(true);
      });
    }
  }, []);

  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    document.body.classList.add("custom-cursor-active");

    // Touch event safety net - if user touches screen, disable custom cursor
    const handleTouchStart = () => {
      setIsEnabled(false);
      document.body.classList.remove("custom-cursor-active");
    };

    // 2. Mouse Move Handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setCursorState((prev) => (prev === "hidden" ? "default" : prev));
    };

    // 3. Hover Detection via Event Delegation
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest<HTMLElement>(
        "a, button, .cta, .tag, input, textarea, [data-cursor]"
      );

      if (interactiveEl) {
        const customText = interactiveEl.getAttribute("data-cursor-text");

        if (interactiveEl.tagName === "INPUT" || interactiveEl.tagName === "TEXTAREA") {
          setCursorState("text");
          setCursorLabel(null);
        } else {
          setCursorState("hover");
          setCursorLabel(customText || null);
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest<HTMLElement>(
        "a, button, .cta, .tag, input, textarea, [data-cursor]"
      );

      if (interactiveEl) {
        setCursorState("default");
        setCursorLabel(null);
      }
    };

    const handleMouseDown = () => {
      setCursorState((prev) => (prev === "hidden" ? "hidden" : "active"));
    };

    const handleMouseUp = () => {
      setCursorState((prev) => {
        if (prev === "hidden") return "hidden";
        // Return to hover if still over an interactive element, else default
        const activeElement = document.elementFromPoint(mouseX.get(), mouseY.get());
        const isHovering = activeElement?.closest("a, button, .cta, .tag, input, textarea, [data-cursor]");
        return isHovering ? "hover" : "default";
      });
    };

    const handleMouseLeave = () => setCursorState("hidden");
    const handleMouseEnter = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setCursorState("default");
    };

    // Register event listeners
    window.addEventListener("touchstart", handleTouchStart, { passive: true, once: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("mouseout", handleMouseOut, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isEnabled]);

  if (!isEnabled || cursorState === "hidden") {
    return null;
  }

  // Animation variants for outer ring
  const ringVariants = {
    default: {
      scaleX: 1,
      scaleY: 1,
      borderRadius: "50%",
      backgroundColor: "rgba(201, 255, 61, 0)",
      borderColor: "rgba(244, 245, 240, 0.4)",
    },
    hover: {
      scaleX: cursorLabel ? 2.1 : 1.8,
      scaleY: cursorLabel ? 2.1 : 1.8,
      borderRadius: "50%",
      backgroundColor: "rgba(201, 255, 61, 0.15)",
      borderColor: "rgba(201, 255, 61, 0.9)",
    },
    active: {
      scaleX: 0.85,
      scaleY: 0.85,
      borderRadius: "50%",
      backgroundColor: "rgba(201, 255, 61, 0.3)",
      borderColor: "rgba(201, 255, 61, 1)",
    },
    text: {
      scaleX: 0.12,
      scaleY: 0.7,
      borderRadius: "2px",
      backgroundColor: "rgba(201, 255, 61, 1)",
      borderColor: "rgba(201, 255, 61, 0)",
    },
  };

  // Animation variants for inner precision dot
  const dotVariants = {
    default: { scale: 1, opacity: 1 },
    hover: { scale: 0, opacity: 0 },
    active: { scale: 1.5, opacity: 1 },
    text: { scale: 0, opacity: 0 },
  };

  return (
    <div className={styles.cursorContainer} aria-hidden="true">
      {/* Outer Magnetic Ring */}
      <motion.div
        className={styles.ring}
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        variants={ringVariants}
        animate={cursorState}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      >
        {cursorLabel && <span className={styles.cursorLabel}>{cursorLabel}</span>}
      </motion.div>

      {/* Inner Precision Dot */}
      <motion.div
        className={styles.dot}
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        variants={dotVariants}
        animate={cursorState}
        transition={{ duration: 0.12 }}
      />
    </div>
  );
}
