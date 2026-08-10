"use client";

import {
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type PanInfo } from "framer-motion";
import { members } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { useHydratedReducedMotion } from "@/components/motion/useHydratedReducedMotion";
import styles from "./Members.module.css";

const cardTones = [
  { accent: "#c9ff3d", ink: "#050505" },
  { accent: "#70efff", ink: "#050505" },
  { accent: "#f4f5f0", ink: "#050505" },
  { accent: "#b9a7ff", ink: "#050505" },
  { accent: "#ff8d63", ink: "#050505" },
  { accent: "#f8de62", ink: "#050505" },
  { accent: "#91f0c8", ink: "#050505" },
] as const;

const HOLD_DURATION_MS = 380;
const HOLD_CANCEL_DISTANCE = 10;

type IconProps = {
  className?: string;
};

function LinkedInIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM3.56 9h3.56v11.45H3.56V9Z"
      />
    </svg>
  );
}

function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12.04 2a9.84 9.84 0 0 0-8.43 14.91L2.05 22l5.22-1.51A9.94 9.94 0 1 0 12.04 2Zm0 17.93a8 8 0 0 1-4.08-1.12l-.29-.17-3.1.9.92-3.02-.19-.31a7.91 7.91 0 1 1 6.74 3.72Zm4.35-5.92c-.24-.12-1.41-.69-1.63-.77-.22-.08-.38-.12-.54.12-.16.24-.62.77-.76.93-.14.16-.28.18-.52.06-1.4-.7-2.32-1.25-3.25-2.84-.25-.43.25-.4.71-1.33.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.39-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.17.86 2.31.98 2.47.12.16 1.68 2.56 4.07 3.59.57.24 1.01.39 1.36.5.57.18 1.09.16 1.5.1.46-.07 1.41-.58 1.61-1.14.2-.55.2-1.03.14-1.13-.06-.1-.22-.16-.46-.28Z"
      />
    </svg>
  );
}

function ArrowUpRightIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M5 19 19 5M8 5h11v11" fill="none" stroke="currentColor" strokeWidth="2.4" />
    </svg>
  );
}

type DeckCardStyle = CSSProperties & {
  "--offset": number;
  "--distance": number;
  "--accent": string;
  "--accent-ink": string;
  "--magnet-x": string;
  "--magnet-y": string;
  "--magnet-tilt-x": string;
  "--magnet-tilt-y": string;
  "--portrait-x": string;
  "--portrait-y": string;
  "--glare-x": string;
  "--glare-y": string;
  "--glare-opacity": number;
  "--icon-count": number;
};

function wrapIndex(index: number) {
  return (index + members.length) % members.length;
}

function getCircularOffset(index: number, activeIndex: number) {
  let offset = index - activeIndex;
  const halfway = members.length / 2;

  if (offset > halfway) offset -= members.length;
  if (offset < -halfway) offset += members.length;

  return offset;
}

export function Members() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const cardButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const holdTimeoutRef = useRef<number | null>(null);
  const longPressActiveRef = useRef(false);
  const pressOriginRef = useRef<{ x: number; y: number } | null>(null);
  const reducedMotion = useHydratedReducedMotion();

  const resetMagneticCard = (card: HTMLElement | null) => {
    if (!card) return;

    card.style.setProperty("--magnet-x", "0px");
    card.style.setProperty("--magnet-y", "0px");
    card.style.setProperty("--magnet-tilt-x", "0deg");
    card.style.setProperty("--magnet-tilt-y", "0deg");
    card.style.setProperty("--portrait-x", "0px");
    card.style.setProperty("--portrait-y", "0px");
    card.style.setProperty("--glare-x", "50%");
    card.style.setProperty("--glare-y", "45%");
    card.style.setProperty("--glare-opacity", "0");
  };

  const resetAllMagneticCards = () => {
    cardRefs.current.forEach(resetMagneticCard);
  };

  const moveBy = (delta: number) => {
    resetAllMagneticCards();
    setFlippedIndex(null);
    setActiveIndex((current) => wrapIndex(current + delta));
  };

  const selectMember = (index: number) => {
    resetAllMagneticCards();
    setFlippedIndex(null);
    setActiveIndex(index);
  };

  const clearHoldTimer = () => {
    if (holdTimeoutRef.current !== null) {
      window.clearTimeout(holdTimeoutRef.current);
      holdTimeoutRef.current = null;
    }
  };

  const endHold = (index: number) => {
    clearHoldTimer();
    pressOriginRef.current = null;
    if (longPressActiveRef.current) {
      longPressActiveRef.current = false;
      setFlippedIndex((current) => (current === index ? null : current));
    }
  };

  const handleFrontPointerDown = (event: ReactPointerEvent<HTMLButtonElement>, index: number) => {
    if (event.pointerType === "mouse" || index !== activeIndex) return;

    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // Capture is a best-effort robustness net so a held finger sliding off
      // the button still reports its release; the hold timer works without it.
    }
    pressOriginRef.current = { x: event.clientX, y: event.clientY };
    clearHoldTimer();
    holdTimeoutRef.current = window.setTimeout(() => {
      longPressActiveRef.current = true;
      setFlippedIndex(index);
    }, HOLD_DURATION_MS);
  };

  const handleFrontPointerMoveForHold = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === "mouse" || holdTimeoutRef.current === null) return;

    const origin = pressOriginRef.current;
    if (!origin) return;

    const dx = event.clientX - origin.x;
    const dy = event.clientY - origin.y;
    if (Math.hypot(dx, dy) > HOLD_CANCEL_DISTANCE) {
      clearHoldTimer();
    }
  };

  const handleFrontPointerUp = (event: ReactPointerEvent<HTMLButtonElement>, index: number) => {
    if (event.pointerType === "mouse") {
      if (index !== activeIndex) {
        selectMember(index);
      } else {
        setFlippedIndex((current) => (current === index ? null : index));
      }
      return;
    }

    const wasHolding = longPressActiveRef.current;
    endHold(index);
    if (!wasHolding && index !== activeIndex) {
      selectMember(index);
    }
  };

  const handleFrontPointerCancel = (_event: ReactPointerEvent<HTMLButtonElement>, index: number) => {
    endHold(index);
  };

  const handleFrontKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();

    if (index !== activeIndex) {
      selectMember(index);
    } else {
      setFlippedIndex((current) => (current === index ? null : index));
    }
  };

  const handleCardPointerMove = (event: ReactPointerEvent<HTMLDivElement>, index: number) => {
    if (reducedMotion || event.pointerType === "touch") return;

    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const normalizedX = (event.clientX - rect.left) / rect.width - 0.5;
    const normalizedY = (event.clientY - rect.top) / rect.height - 0.5;
    const strength = index === activeIndex ? 16 : 9;

    card.style.setProperty("--magnet-x", `${(normalizedX * strength).toFixed(2)}px`);
    card.style.setProperty("--magnet-y", `${(normalizedY * strength * 0.72).toFixed(2)}px`);
    card.style.setProperty("--magnet-tilt-x", `${(-normalizedY * 5).toFixed(2)}deg`);
    card.style.setProperty("--magnet-tilt-y", `${(normalizedX * 6).toFixed(2)}deg`);
    card.style.setProperty("--portrait-x", `${(-normalizedX * strength * 0.52).toFixed(2)}px`);
    card.style.setProperty("--portrait-y", `${(-normalizedY * strength * 0.34).toFixed(2)}px`);
    card.style.setProperty("--glare-x", `${((normalizedX + 0.5) * 100).toFixed(1)}%`);
    card.style.setProperty("--glare-y", `${((normalizedY + 0.5) * 100).toFixed(1)}%`);
    card.style.setProperty("--glare-opacity", index === activeIndex ? "0.72" : "0.36");
  };

  const handleDeckKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    let nextIndex: number | null = null;

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      nextIndex = wrapIndex(activeIndex - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      nextIndex = wrapIndex(activeIndex + 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      nextIndex = 0;
    } else if (event.key === "End") {
      event.preventDefault();
      nextIndex = members.length - 1;
    }

    if (nextIndex === null) return;

    selectMember(nextIndex);
    requestAnimationFrame(() => cardButtonRefs.current[nextIndex]?.focus());
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeIntent = Math.abs(info.offset.x) > 45 || Math.abs(info.velocity.x) > 420;
    if (!swipeIntent) return;

    moveBy(info.offset.x < 0 ? 1 : -1);
  };

  return (
    <section id="members" className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.intro}>
          <SplitHeading as="h2" className="section__heading" text="The crew of 2026–27" />
          <Reveal delay={0.08} amount={0.2}>
            <p className={styles.prompt}>Seven curious minds. Pick a portrait, hold to flip it.</p>
          </Reveal>
        </div>

        <Reveal delay={0.08} amount={0.12}>
          <div
            className={styles.deckShell}
            role="region"
            aria-roledescription="carousel"
            aria-label="ProdMan core team"
          >
            <motion.div
              className={styles.deck}
              drag={reducedMotion ? false : "x"}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.08}
              onDragEnd={handleDragEnd}
              onKeyDown={handleDeckKeyDown}
            >
              {members.map((member, index) => {
                const offset = getCircularOffset(index, activeIndex);
                const tone = cardTones[index % cardTones.length];
                const linkedin = member.links.find((link) => link.label === "LinkedIn");
                const whatsapp = member.links.find((link) => link.label === "WhatsApp");
                const isActive = index === activeIndex;
                const isFlipped = isActive && flippedIndex === index;
                const iconCount = [linkedin, whatsapp].filter(Boolean).length + 1;
                const cardStyle: DeckCardStyle = {
                  "--offset": offset,
                  "--distance": Math.abs(offset),
                  "--accent": tone.accent,
                  "--accent-ink": tone.ink,
                  "--magnet-x": "0px",
                  "--magnet-y": "0px",
                  "--magnet-tilt-x": "0deg",
                  "--magnet-tilt-y": "0deg",
                  "--portrait-x": "0px",
                  "--portrait-y": "0px",
                  "--glare-x": "50%",
                  "--glare-y": "45%",
                  "--glare-opacity": 0,
                  "--icon-count": iconCount,
                  zIndex: members.length - Math.abs(offset),
                };

                return (
                  <div
                    key={member.name}
                    ref={(node) => {
                      cardRefs.current[index] = node;
                    }}
                    className={styles.portraitCard}
                    style={cardStyle}
                    data-active={isActive}
                    data-flipped={isFlipped}
                    onPointerMove={(event) => handleCardPointerMove(event, index)}
                    onPointerLeave={(event) => resetMagneticCard(event.currentTarget)}
                    onPointerCancel={(event) => resetMagneticCard(event.currentTarget)}
                  >
                    <div className={styles.cardFlipper}>
                      <button
                        ref={(node) => {
                          cardButtonRefs.current[index] = node;
                        }}
                        type="button"
                        className={styles.cardSelect}
                        aria-pressed={isActive}
                        aria-label={
                          !isActive
                            ? `Show ${member.name}, ${member.role} profile`
                            : `${member.name}, ${member.role}. Press, or press and hold, to flip and see contact details.`
                        }
                        tabIndex={isActive ? 0 : -1}
                        onPointerDown={(event) => handleFrontPointerDown(event, index)}
                        onPointerMove={handleFrontPointerMoveForHold}
                        onPointerUp={(event) => handleFrontPointerUp(event, index)}
                        onPointerCancel={(event) => handleFrontPointerCancel(event, index)}
                        onKeyDown={(event) => handleFrontKeyDown(event, index)}
                        data-cursor-text={!isActive ? "Meet" : isFlipped ? "Photo" : "Hold"}
                      >
                        <span className={styles.cardIndex} aria-hidden="true">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className={styles.cardStamp} aria-hidden="true">
                          {member.role}
                        </span>
                        <span className={styles.portraitWrap}>
                          {member.cutout ?? member.photo ? (
                            <Image
                              src={member.cutout ?? member.photo ?? ""}
                              alt=""
                              fill
                              className={styles.portrait}
                              sizes="(max-width: 700px) 68vw, 320px"
                            />
                          ) : (
                            <span className={styles.photoPlaceholder} aria-hidden="true">
                              {member.name
                                .split(" ")
                                .map((part) => part[0])
                                .join("")}
                            </span>
                          )}
                        </span>
                        <span className={styles.namePlate}>
                          <span className={styles.namePlateText}>{member.name}</span>
                        </span>
                      </button>

                      <div
                        className={styles.nameIcons}
                        aria-label={`${member.name} contact links`}
                        aria-hidden={!isActive || isFlipped}
                      >
                        {linkedin ? (
                          <a
                            href={linkedin.href}
                            target="_blank"
                            rel="noreferrer"
                            tabIndex={isActive && !isFlipped ? undefined : -1}
                            aria-label="LinkedIn"
                            data-cursor-text="Connect"
                          >
                            <LinkedInIcon className={styles.nameIcon} />
                          </a>
                        ) : null}
                        {whatsapp ? (
                          <a
                            href={whatsapp.href}
                            target="_blank"
                            rel="noreferrer"
                            tabIndex={isActive && !isFlipped ? undefined : -1}
                            aria-label="WhatsApp"
                            data-cursor-text="WhatsApp"
                          >
                            <WhatsAppIcon className={styles.nameIcon} />
                          </a>
                        ) : null}
                        <Link
                          href={`/team/${member.slug}`}
                          className={styles.nameIconArrow}
                          tabIndex={isActive && !isFlipped ? undefined : -1}
                          aria-label="Read more"
                          data-cursor-text="Story"
                        >
                          <ArrowUpRightIcon className={styles.nameIcon} />
                        </Link>
                      </div>

                      <div
                        className={styles.cardBack}
                        aria-hidden={!isFlipped}
                        aria-label={`${member.name} contact details`}
                        onClick={() => setFlippedIndex(null)}
                      >
                        <span className={styles.flipHintBack} aria-hidden="true">
                          ⟲
                        </span>

                        <div className={styles.cardBackTop}>
                          <p className={styles.cardBackKicker}>Superpower</p>
                          <p className={styles.cardBackSuperpower}>{member.superpower}</p>
                        </div>

                        <div className={styles.cardBackActions}>
                          <Link
                            href={`/team/${member.slug}`}
                            tabIndex={isFlipped ? undefined : -1}
                            className={styles.cardBackReadMore}
                            data-cursor-text="Story"
                          >
                            Read more <span aria-hidden="true">→</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>

            <div className={styles.controls} aria-label="Choose a team member">
              <button
                type="button"
                className={styles.arrowButton}
                aria-label="Previous team member"
                onClick={() => moveBy(-1)}
                data-cursor-text="Prev"
              >
                <span aria-hidden="true">←</span>
              </button>

              <div className={styles.dots}>
                {members.map((member, index) => (
                  <button
                    key={member.name}
                    type="button"
                    className={styles.dot}
                    data-active={index === activeIndex}
                    aria-label={`Show ${member.name}`}
                    aria-current={index === activeIndex ? "true" : undefined}
                    onClick={() => selectMember(index)}
                  />
                ))}
              </div>

              <button
                type="button"
                className={styles.arrowButton}
                aria-label="Next team member"
                onClick={() => moveBy(1)}
                data-cursor-text="Next"
              >
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
