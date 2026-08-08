"use client";

import {
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import Image from "next/image";
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
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const reducedMotion = useHydratedReducedMotion();
  const activeMember = members[activeIndex];

  const resetMagneticCard = (card: HTMLButtonElement | null) => {
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
    setActiveIndex((current) => wrapIndex(current + delta));
  };

  const selectMember = (index: number) => {
    resetAllMagneticCards();
    setActiveIndex(index);
  };

  const handleCardPointerMove = (event: ReactPointerEvent<HTMLButtonElement>, index: number) => {
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
    requestAnimationFrame(() => cardRefs.current[nextIndex]?.focus());
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
          <Reveal amount={0.2}>
            <p className="section__label">The crew</p>
          </Reveal>
          <SplitHeading as="h2" className="section__heading" text="The people behind ProdMan." />
          <Reveal delay={0.08} amount={0.2}>
            <p className={styles.prompt}>Seven curious minds. Pick a portrait.</p>
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
                  zIndex: members.length - Math.abs(offset),
                };

                return (
                  <button
                    key={member.name}
                    ref={(node) => {
                      cardRefs.current[index] = node;
                    }}
                    type="button"
                    className={styles.portraitCard}
                    style={cardStyle}
                    data-active={index === activeIndex}
                    aria-pressed={index === activeIndex}
                    aria-label={`Show profile for ${member.name}`}
                    tabIndex={index === activeIndex ? 0 : -1}
                    onClick={() => selectMember(index)}
                    onPointerMove={(event) => handleCardPointerMove(event, index)}
                    onPointerLeave={(event) => resetMagneticCard(event.currentTarget)}
                    onPointerCancel={(event) => resetMagneticCard(event.currentTarget)}
                    data-cursor-text={index === activeIndex ? "Hello" : "Meet"}
                  >
                    <span className={styles.cardIndex} aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.cardStamp} aria-hidden="true">
                      ProdMan
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
                    <span className={styles.namePlate}>{member.name}</span>
                  </button>
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

        <div className={styles.profile} key={activeMember.name}>
          <div className={styles.profileIndex} aria-hidden="true">
            <span>{String(activeIndex + 1).padStart(2, "0")}</span>
            <span className={styles.profileRule} />
            <span>{String(members.length).padStart(2, "0")}</span>
          </div>

          <div className={styles.profileBody} aria-live="polite">
            <div className={styles.profileHeading}>
              <div>
                <p className={styles.profileKicker}>Currently meeting</p>
                <h3 className={styles.name}>{activeMember.name}</h3>
              </div>
              {activeMember.role ? <p className={styles.role}>{activeMember.role}</p> : null}
            </div>

            <p className={styles.superpower}>
              <span>Superpower</span>
              {activeMember.superpower}
            </p>

            <div className={styles.profileActions}>
              {activeMember.links.length > 0 ? (
                <div className={styles.links} aria-label={`${activeMember.name} links`}>
                  {activeMember.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                      rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
                      data-cursor-text="Connect"
                    >
                      {link.label}
                      <span aria-hidden="true">↗</span>
                    </a>
                  ))}
                </div>
              ) : null}

              <details className={styles.story}>
                <summary data-cursor-text="Story">Read the full story</summary>
                <p>{activeMember.bio}</p>
              </details>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
