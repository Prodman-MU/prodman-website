"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
} from "framer-motion";
import { siteNav, whatsappUrl } from "@/lib/content";
import { useHydratedReducedMotion } from "@/components/motion/useHydratedReducedMotion";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import styles from "./SiteNav.module.css";

const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState(siteNav[0]?.href ?? "#members");
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const firstMenuLinkRef = useRef<HTMLAnchorElement>(null);
  const shouldReduceMotion = useHydratedReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 32, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = siteNav
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((section): section is HTMLElement => section !== null);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) setActiveHref(`#${visible.target.id}`);
      },
      { rootMargin: "-24% 0px -58%", threshold: [0, 0.1, 0.35, 0.6] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 901px)");
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false);
    };

    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;

    const focusTimer = window.setTimeout(() => firstMenuLinkRef.current?.focus(), 80);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        window.requestAnimationFrame(() => menuButtonRef.current?.focus());
        return;
      }

      if (event.key !== "Tab") return;

      const panelLinks = Array.from(
        menuPanelRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [],
      );
      const focusable = [menuButtonRef.current, ...panelLinks].filter(
        (element): element is HTMLElement => element !== null,
      );
      const first = focusable[0];
      const last = focusable.at(-1);

      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
    };
  }, [menuOpen]);

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--pointer-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${event.clientY - rect.top}px`);
  }

  return (
    <>
      <motion.nav
        className={styles.nav}
        data-scrolled={scrolled || undefined}
        data-menu-open={menuOpen || undefined}
        aria-label="Section navigation"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EXPO_OUT }}
        onPointerMove={handlePointerMove}
      >
        <div className={styles.brand}>
          <motion.a
            className={styles.wordmark}
            href="#hero"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            data-cursor-text="Home"
          >
            PROD/MAN
          </motion.a>
          <a
            className={styles.affiliation}
            href="https://www.mastersunion.org"
            target="_blank"
            rel="noreferrer"
            data-cursor-text="Visit"
          >
            <span className={styles.affiliationDivider} aria-hidden="true" />
            {/* eslint-disable-next-line @next/next/no-img-element -- animated GIF must be served as-is, not re-encoded by next/image */}
            <img
              src="/brand/masters-union-animation.gif"
              alt="Masters' Union"
              width={769}
              height={303}
              className={styles.affiliationMark}
            />
          </a>
        </div>
        <ul className={styles.links}>
          {siteNav.map((item) => {
            const isActive = activeHref === item.href;

            return (
              <li key={item.href}>
                <motion.a
                  href={item.href}
                  aria-current={isActive ? "location" : undefined}
                  data-active={isActive || undefined}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.96 }}
                  data-cursor-text="View"
                >
                  {item.label}
                </motion.a>
              </li>
            );
          })}
        </ul>
        <ThemeToggle />
        <motion.a
          className={`cta cta--acid ${styles.join}`}
          href={whatsappUrl}
          whileHover={{ y: -3, scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          data-cursor-text="Join"
        >
          Join
        </motion.a>
        <button
          ref={menuButtonRef}
          type="button"
          className={styles.menuButton}
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          onClick={() => setMenuOpen((open) => !open)}
          data-cursor-text={menuOpen ? "Close" : "Menu"}
        >
          <span>{menuOpen ? "Close" : "Menu"}</span>
          <span className={styles.menuIcon} aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
        <motion.span className={styles.progress} style={{ scaleX: progress }} aria-hidden="true" />
      </motion.nav>

      <AnimatePresence initial={false}>
        {menuOpen ? (
          <motion.div
            ref={menuPanelRef}
            id="site-menu"
            className={styles.menuPanel}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.65, ease: EXPO_OUT }}
          >
            <span className={styles.menuOrbit} aria-hidden="true" />
            <div className={styles.menuPanelInner}>
              <p className={styles.menuEyebrow}>Explore the club</p>
              <ol className={styles.menuList}>
                {siteNav.map((item, index) => {
                  const isActive = activeHref === item.href;

                  return (
                    <motion.li
                      key={item.href}
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: shouldReduceMotion ? 0.01 : 0.55,
                        delay: shouldReduceMotion ? 0 : 0.12 + index * 0.045,
                        ease: EXPO_OUT,
                      }}
                    >
                      <a
                        ref={index === 0 ? firstMenuLinkRef : undefined}
                        href={item.href}
                        aria-current={isActive ? "location" : undefined}
                        data-active={isActive || undefined}
                        onClick={() => setMenuOpen(false)}
                        data-cursor-text="Go"
                      >
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        {item.label}
                      </a>
                    </motion.li>
                  );
                })}
              </ol>

              <div className={styles.menuFooter}>
                <div>
                  <p>Masters’ Union · Gurugram</p>
                  <p>Product Management Club · 2026</p>
                </div>
                <motion.a
                  className={`cta cta--acid ${styles.menuJoin}`}
                  href={whatsappUrl}
                  onClick={() => setMenuOpen(false)}
                  whileTap={{ scale: 0.97 }}
                  data-cursor-text="Join"
                >
                  Join the community <span aria-hidden="true">↗</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
