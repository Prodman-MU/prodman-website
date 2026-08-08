"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ElementType, ReactNode } from "react";

const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 20,
  amount = 0.2,
  variant = "fadeUp",
  className,
  as: Component = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  amount?: number;
  variant?: "fadeUp" | "fadeIn" | "scaleUp";
  className?: string;
  as?: ElementType;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    const Tag = Component;
    return <Tag className={className}>{children}</Tag>;
  }

  const getInitial = () => {
    if (variant === "fadeIn") return { opacity: 0 };
    if (variant === "scaleUp") return { opacity: 0, scale: 0.96, y };
    return { opacity: 0, y };
  };

  const getAnimate = () => {
    if (variant === "fadeIn") return { opacity: 1 };
    if (variant === "scaleUp") return { opacity: 1, scale: 1, y: 0 };
    return { opacity: 1, y: 0 };
  };

  const MotionTag = (
    typeof Component === "string" && Component in motion
      ? (motion as unknown as Record<string, typeof motion.div>)[Component]
      : motion.div
  );

  return (
    <MotionTag
      className={className}
      initial={getInitial()}
      whileInView={getAnimate()}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.65, delay, ease: EXPO_OUT }}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </MotionTag>
  );
}
