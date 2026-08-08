"use client";

import { motion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";
import { useHydratedReducedMotion } from "./useHydratedReducedMotion";

const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

export interface StaggerContainerProps {
  children: ReactNode;
  staggerDelay?: number;
  delayChildren?: number;
  viewportAmount?: number;
  once?: boolean;
  className?: string;
  as?: ElementType;
}

export function StaggerContainer({
  children,
  staggerDelay = 0.08,
  delayChildren = 0,
  viewportAmount = 0.2,
  once = true,
  className,
  as: Component = "div",
}: StaggerContainerProps) {
  const shouldReduceMotion = useHydratedReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : staggerDelay,
        delayChildren: shouldReduceMotion ? 0 : delayChildren,
      },
    },
  };

  const MotionTag = (
    typeof Component === "string"
      ? (motion as unknown as Record<string, typeof motion.div>)[Component]
      : motion.div
  );

  return (
    <MotionTag
      className={className}
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once, amount: viewportAmount }}
      variants={containerVariants}
    >
      {children}
    </MotionTag>
  );
}

export type StaggerVariantType = "fadeUp" | "fadeIn" | "scaleUp";

export interface StaggerItemProps {
  children: ReactNode;
  variant?: StaggerVariantType;
  distance?: number;
  className?: string;
  as?: ElementType;
}

export function StaggerItem({
  children,
  variant = "fadeUp",
  distance = 24,
  className,
  as: Component = "div",
}: StaggerItemProps) {
  const shouldReduceMotion = useHydratedReducedMotion();

  const getVariants = (): Variants => {
    if (shouldReduceMotion) {
      return {
        hidden: { opacity: 1, y: 0, scale: 1 },
        visible: { opacity: 1, y: 0, scale: 1 },
      };
    }

    switch (variant) {
      case "fadeIn":
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { duration: 0.6, ease: EXPO_OUT },
          },
        };
      case "scaleUp":
        return {
          hidden: { opacity: 0, scale: 0.95, y: distance / 2 },
          visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.6, ease: EXPO_OUT },
          },
        };
      case "fadeUp":
      default:
        return {
          hidden: { opacity: 0, y: distance },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: EXPO_OUT },
          },
        };
    }
  };

  const MotionTag = (
    typeof Component === "string"
      ? (motion as unknown as Record<string, typeof motion.div>)[Component]
      : motion.div
  );

  return (
    <MotionTag className={className} variants={getVariants()}>
      {children}
    </MotionTag>
  );
}
