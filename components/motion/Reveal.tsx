"use client";

import { motion } from "framer-motion";
import type { ElementType, ReactNode } from "react";
import { useHydratedReducedMotion } from "./useHydratedReducedMotion";

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
  const shouldReduceMotion = useHydratedReducedMotion();

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
    typeof Component === "string"
      ? (motion as unknown as Record<string, typeof motion.div>)[Component]
      : motion.div
  );

  return (
    <MotionTag
      className={className}
      initial={shouldReduceMotion ? false : getInitial()}
      whileInView={getAnimate()}
      viewport={{ once: true, amount }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.65,
        delay: shouldReduceMotion ? 0 : delay,
        ease: EXPO_OUT,
      }}
      style={shouldReduceMotion ? undefined : { willChange: "transform, opacity" }}
    >
      {children}
    </MotionTag>
  );
}
