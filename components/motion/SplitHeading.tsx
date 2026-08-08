"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ElementType } from "react";

const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

/**
 * Word-by-word stagger reveal, in the spirit of the character-split headline
 * treatment observed on penguin-capital.co.jp (docs/PENGUIN-CAPITAL-DESIGN-AUDIT.md
 * Section 4/8.4) — split by word rather than character for a lighter DOM footprint
 * and simpler accessible-name handling, via Framer Motion rather than GSAP
 * SplitText since Framer Motion is this project's chosen animation library.
 */
export function SplitHeading({
  text,
  as: Tag = "h2",
  className,
  id,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  id?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(" ");

  if (shouldReduceMotion) {
    return (
      <Tag id={id} className={className}>
        {text}
      </Tag>
    );
  }

  return (
    <Tag id={id} className={className} aria-label={text}>
      <motion.span
        aria-hidden="true"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.05 }}
        style={{ display: "inline" }}
      >
        {words.map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            style={{ display: "inline-block" }}
            variants={{
              hidden: { opacity: 0, y: "0.3em" },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: EXPO_OUT },
              },
            }}
          >
            {word}
            {index < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}
