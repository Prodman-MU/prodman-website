"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  productBreakdown,
  productBreakdownCategories,
  type ProductBreakdownItem,
  type PMCategory,
} from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { useHydratedReducedMotion } from "@/components/motion/useHydratedReducedMotion";
import styles from "./ProductBreakdown.module.css";

type ProductIconName =
  | "grid"
  | "compass"
  | "pencil"
  | "code"
  | "chart"
  | "sparkles"
  | "search"
  | "route"
  | "wireframe"
  | "layers"
  | "users"
  | "rocket"
  | "shield"
  | "chevron-left"
  | "chevron-right";

const categoryIcons: Record<"all" | PMCategory, ProductIconName> = {
  all: "grid",
  strategy: "compass",
  design: "pencil",
  tech: "code",
  growth: "chart",
  ai_leadership: "sparkles",
};

const stageIcons: readonly ProductIconName[] = [
  "search",
  "route",
  "wireframe",
  "layers",
  "users",
  "chart",
  "rocket",
  "shield",
];

function ProductIcon({ name, className }: { name: ProductIconName; className?: string }) {
  const paths = (() => {
    switch (name) {
      case "grid":
        return (
          <>
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </>
        );
      case "compass":
        return (
          <>
            <circle cx="12" cy="12" r="9" />
            <path d="m15.5 8.5-2.1 4.9-4.9 2.1 2.1-4.9 4.9-2.1Z" />
          </>
        );
      case "pencil":
        return (
          <>
            <path d="m4 20 4.2-1 10.9-10.9a2.1 2.1 0 0 0-3-3L5.2 16 4 20Z" />
            <path d="m14.8 6.4 2.8 2.8" />
          </>
        );
      case "code":
        return (
          <>
            <path d="m8 9-4 3 4 3" />
            <path d="m16 9 4 3-4 3" />
            <path d="m14 5-4 14" />
          </>
        );
      case "chart":
        return (
          <>
            <path d="M4 19V9" />
            <path d="M10 19V5" />
            <path d="M16 19v-7" />
            <path d="M22 19H2" />
            <path d="m3 7 6-4 6 5 6-5" />
          </>
        );
      case "sparkles":
        return (
          <>
            <path d="m12 3 1.1 3.4L16.5 8l-3.4 1.6L12 13l-1.1-3.4L7.5 8l3.4-1.6L12 3Z" />
            <path d="m18.5 13 .7 2.3 2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7.7-2.3Z" />
            <path d="m5.5 14 .6 1.7 1.7.8-1.7.7-.6 1.8-.7-1.8-1.8-.7 1.8-.8.7-1.7Z" />
          </>
        );
      case "search":
        return (
          <>
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="m15.5 15.5 4.5 4.5" />
          </>
        );
      case "route":
        return (
          <>
            <circle cx="5" cy="18" r="2" />
            <circle cx="19" cy="6" r="2" />
            <path d="M7 18h3a3 3 0 0 0 3-3V9a3 3 0 0 1 3-3h1" />
          </>
        );
      case "wireframe":
        return (
          <>
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <path d="M3 9h18M9 9v11" />
          </>
        );
      case "layers":
        return (
          <>
            <path d="m12 3 9 5-9 5-9-5 9-5Z" />
            <path d="m3 12 9 5 9-5" />
            <path d="m3 16 9 5 9-5" />
          </>
        );
      case "users":
        return (
          <>
            <circle cx="9" cy="8" r="3" />
            <path d="M3.5 20v-2.2A4.8 4.8 0 0 1 8.3 13h1.4a4.8 4.8 0 0 1 4.8 4.8V20" />
            <path d="M15 5.2a3 3 0 0 1 0 5.6M17 13a4.8 4.8 0 0 1 3.5 4.6V20" />
          </>
        );
      case "rocket":
        return (
          <>
            <path d="M14 4c3-2 5-1 6-1 0 1 1 3-1 6l-5 5-5-5 4-5Z" />
            <path d="m10 9-4 1-3 3 6 1M15 14l-1 6-3 1-1-6" />
            <circle cx="15.5" cy="7.5" r="1.5" />
            <path d="m6 18-2 2" />
          </>
        );
      case "shield":
        return (
          <>
            <path d="M12 3 5 6v5c0 4.6 2.8 8.1 7 10 4.2-1.9 7-5.4 7-10V6l-7-3Z" />
            <path d="m12 7 .8 2.2 2.2.8-2.2.8L12 13l-.8-2.2L9 10l2.2-.8L12 7Z" />
          </>
        );
      case "chevron-left":
        return <path d="m15 18-6-6 6-6" />;
      case "chevron-right":
        return <path d="m9 18 6-6-6-6" />;
    }
  })();

  return (
    <svg
      className={className}
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths}
    </svg>
  );
}

export function ProductBreakdown() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState<"all" | PMCategory>("all");
  const shouldReduceMotion = useHydratedReducedMotion();

  // Refs for roving tabindex keyboard navigation
  const nodeRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const mobileNodeRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const categoryTabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeItem: ProductBreakdownItem = productBreakdown[activeIndex] ?? productBreakdown[0];

  const scrollMobileStageIntoView = useCallback(
    (index: number) => {
      window.requestAnimationFrame(() => {
        const target = mobileNodeRefs.current[index];
        if (!target || target.offsetParent === null) return;

        target.scrollIntoView({
          behavior: shouldReduceMotion ? "auto" : "smooth",
          block: "nearest",
          inline: "center",
        });
      });
    },
    [shouldReduceMotion],
  );

  // Stage switch handler: updates active index and syncs category tab state automatically
  const handleStageSelect = useCallback((index: number) => {
    setActiveIndex(index);
    setActiveCategory(productBreakdown[index].category);
    scrollMobileStageIntoView(index);
  }, [scrollMobileStageIntoView]);

  // Category switch handler: auto-selects first stage in category if current item is outside
  const handleCategorySelect = useCallback(
    (catId: "all" | PMCategory) => {
      setActiveCategory(catId);
      if (catId !== "all") {
        const matchingIndex = productBreakdown.findIndex((item) => item.category === catId);
        if (matchingIndex !== -1 && productBreakdown[activeIndex].category !== catId) {
          setActiveIndex(matchingIndex);
          scrollMobileStageIntoView(matchingIndex);
        }
      }
    },
    [activeIndex, scrollMobileStageIntoView]
  );

  // Keyboard navigation for category filter tabs (Roving tabindex)
  const handleCategoryKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
      const total = productBreakdownCategories.length;
      let nextIndex: number | null = null;

      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
          e.preventDefault();
          nextIndex = (currentIndex + 1) % total;
          break;
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault();
          nextIndex = (currentIndex - 1 + total) % total;
          break;
        case "Home":
          e.preventDefault();
          nextIndex = 0;
          break;
        case "End":
          e.preventDefault();
          nextIndex = total - 1;
          break;
        case " ":
        case "Enter":
          e.preventDefault();
          handleCategorySelect(productBreakdownCategories[currentIndex].id);
          break;
        default:
          break;
      }

      if (nextIndex !== null) {
        const targetCategory = productBreakdownCategories[nextIndex];
        handleCategorySelect(targetCategory.id);
        categoryTabRefs.current[nextIndex]?.focus();
      }
    },
    [handleCategorySelect]
  );

  // Roving-tabindex keyboard handler shared by desktop orbital nodes and
  // mobile step nodes. Resolves the target ref at event-handler time (not
  // during render) so the react-hooks/refs lint rule is satisfied.
  const handleNodeKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
      const total = productBreakdown.length;
      let nextIndex: number | null = null;

      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
          e.preventDefault();
          nextIndex = (currentIndex + 1) % total;
          break;
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault();
          nextIndex = (currentIndex - 1 + total) % total;
          break;
        case "Home":
          e.preventDefault();
          nextIndex = 0;
          break;
        case "End":
          e.preventDefault();
          nextIndex = total - 1;
          break;
        default:
          break;
      }

      if (nextIndex !== null) {
        handleStageSelect(nextIndex);
        nodeRefs.current[nextIndex]?.focus();
      }
    },
    [handleStageSelect],
  );

  const handleMobileNodeKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
      const total = productBreakdown.length;
      let nextIndex: number | null = null;

      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
          e.preventDefault();
          nextIndex = (currentIndex + 1) % total;
          break;
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault();
          nextIndex = (currentIndex - 1 + total) % total;
          break;
        case "Home":
          e.preventDefault();
          nextIndex = 0;
          break;
        case "End":
          e.preventDefault();
          nextIndex = total - 1;
          break;
        case " ":
        case "Enter":
          e.preventDefault();
          handleStageSelect(currentIndex);
          break;
        default:
          break;
      }

      if (nextIndex !== null) {
        handleStageSelect(nextIndex);
        mobileNodeRefs.current[nextIndex]?.focus();
      }
    },
    [handleStageSelect],
  );

  // Stepper handlers (Prev / Next buttons)
  const handlePrev = () => {
    const newIndex = (activeIndex - 1 + productBreakdown.length) % productBreakdown.length;
    handleStageSelect(newIndex);
  };

  const handleNext = () => {
    const newIndex = (activeIndex + 1) % productBreakdown.length;
    handleStageSelect(newIndex);
  };

  // SVG Radial Dial orbital coordinates for 8 items (Radius = 38% relative to center 50%, 50%)
  const orbitalNodes = productBreakdown.map((item, index) => {
    const angleInDegrees = (index / 8) * 360 - 90; // Start at 12 o'clock (-90 deg)
    const angleInRadians = (angleInDegrees * Math.PI) / 180;
    const radiusPercent = 38;
    const leftPercent = 50 + radiusPercent * Math.cos(angleInRadians);
    const topPercent = 50 + radiusPercent * Math.sin(angleInRadians);

    return {
      item,
      index,
      angleInDegrees,
      leftPercent,
      topPercent,
    };
  });

  // Calculate pointer angle for radial beam indicator
  const activeAngle = (activeIndex / 8) * 360 - 90;

  return (
    <section id="breakdown" className={`section ${styles.section}`}>
      <div className="container">
        <Reveal amount={0.2}>
          <p className="section__label">Product Breakdown</p>
        </Reveal>
        <SplitHeading as="h2" className="section__heading" text="What Is ProdMan?" />
        <Reveal amount={0.2} delay={0.1}>
          <p className={styles.intro}>
            Part detective. Part strategist. Part builder. Full-time &ldquo;Why?&rdquo; person. Product
            Management—or ProdMan, as we like to call it—is the wonderfully chaotic art of figuring out
            what to build, why, for whom, and whether anyone will actually use it. Everything under the
            ProdMan umbrella:
          </p>
        </Reveal>

        {/* Category Filter Tabs Bar (Macro Pillars Navigation) */}
        <Reveal amount={0.2} delay={0.1}>
          <div
            role="tablist"
            aria-label="Product Management Pillars"
            className={styles.categoryTabs}
          >
            {productBreakdownCategories.map((category, index) => {
              const isCatActive = activeCategory === category.id;
              return (
                <motion.button
                  key={category.id}
                  ref={(el) => {
                    categoryTabRefs.current[index] = el;
                  }}
                  role="tab"
                  aria-selected={isCatActive}
                  tabIndex={isCatActive ? 0 : -1}
                  onClick={() => handleCategorySelect(category.id)}
                  onKeyDown={(e) => handleCategoryKeyDown(e, index)}
                  className={`${styles.categoryTab} ${isCatActive ? styles.activeCategoryTab : ""}`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  data-cursor-text="Filter"
                >
                  {isCatActive && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      className={styles.categoryActivePill}
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 380, damping: 30 }
                      }
                    />
                  )}
                  <span className={styles.categoryTabIcon}>
                    <ProductIcon name={categoryIcons[category.id]} />
                  </span>
                  <span className={styles.categoryTabText}>{category.label}</span>
                </motion.button>
              );
            })}
          </div>
        </Reveal>

        {/* Main Interactive Layout: Left Dial / Stepper, Right Detail Card */}
        <div className={styles.mainLayout}>
          {/* Left Column: Radial Orbital Dial & Mobile Controls */}
          <Reveal amount={0.2} className={styles.dialColumn}>
            {/* Mobile Step Bar (< 900px viewports) */}
            <div
              role="tablist"
              aria-label="Product Management Lifecycle Stages Mobile"
              className={styles.mobileStepBar}
            >
              {productBreakdown.map((item, index) => {
                const isSelected = activeIndex === index;
                const isCategoryMatch =
                  activeCategory !== "all" && item.category === activeCategory;
                return (
                  <motion.button
                    key={item.id}
                    id={`mobile-tab-${index}`}
                    ref={(el) => {
                      mobileNodeRefs.current[index] = el;
                    }}
                    role="tab"
                    aria-selected={isSelected}
                    aria-controls={`pm-panel-${index}`}
                    tabIndex={isSelected ? 0 : -1}
                    onClick={() => handleStageSelect(index)}
                    onKeyDown={(e) => handleMobileNodeKeyDown(e, index)}
                    className={`${styles.mobileStepNode} ${
                      isSelected ? styles.mobileStepNodeActive : ""
                    } ${isCategoryMatch ? styles.orbitalNodeCategoryMatch : ""}`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                    data-cursor-text="Select"
                  >
                    <span className={styles.mobileStepIcon}>
                      <ProductIcon name={stageIcons[index]} />
                    </span>
                    <span className={styles.mobileStepCopy}>
                      <span className={styles.mobileStepNodeNum}>
                        Stage {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className={styles.mobileStepTitle}>{item.title}</span>
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Desktop SVG Radial Orbital Dial (>= 900px viewports) */}
            <div className={styles.dialWrapper}>
              {/* Decorative Background SVG Ring & Pointer Beam */}
              <svg className={styles.dialSvgRing} viewBox="0 0 400 400" fill="none">
                {/* Outer Dashed Orbit Circle */}
                <circle
                  cx="200"
                  cy="200"
                  r="152"
                  stroke="var(--line)"
                  strokeWidth="1.5"
                  strokeDasharray="4 6"
                />
                {/* Inner Decorative Circle */}
                <circle
                  cx="200"
                  cy="200"
                  r="80"
                  stroke="var(--grid-line)"
                  strokeWidth="1"
                />
                {/* Active Beam Pointer Line */}
                <motion.line
                  x1="200"
                  y1="200"
                  x2="352"
                  y2="200"
                  stroke="var(--acid)"
                  strokeWidth="2"
                  strokeOpacity="0.8"
                  style={{ transformBox: "view-box", transformOrigin: "200px 200px" }}
                  animate={{ rotate: activeAngle }}
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 300, damping: 28 }
                  }
                />
              </svg>

              {/* Central Hub Display */}
              <div className={styles.centralHub}>
                <span className={styles.hubStepNumber}>
                  {String(activeIndex + 1).padStart(2, "0")} / 08
                </span>
                <span className={styles.hubCategoryLabel}>{activeItem.categoryLabel}</span>
                <span className={styles.hubStageTitle}>{activeItem.title}</span>
              </div>

              {/* 8 Orbital Node Buttons (Tablist Desktop) */}
              <div
                role="tablist"
                aria-label="Product Management Lifecycle Stages"
                style={{ width: "100%", height: "100%", position: "relative" }}
              >
                {orbitalNodes.map(({ item, index, leftPercent, topPercent }) => {
                  const isSelected = activeIndex === index;
                  const isCategoryMatch =
                    activeCategory !== "all" && item.category === activeCategory;

                  return (
                    <motion.button
                      key={item.id}
                      id={`pm-tab-${index}`}
                      ref={(el) => {
                        nodeRefs.current[index] = el;
                      }}
                      role="tab"
                      aria-selected={isSelected}
                      aria-controls={`pm-panel-${index}`}
                      aria-label={`Stage ${String(index + 1).padStart(2, "0")}: ${item.title}`}
                      tabIndex={isSelected ? 0 : -1}
                      onClick={() => handleStageSelect(index)}
                      onKeyDown={(e) => handleNodeKeyDown(e, index)}
                      style={{
                        left: `${leftPercent}%`,
                        top: `${topPercent}%`,
                      }}
                      className={`${styles.orbitalNode} ${
                        isSelected ? styles.orbitalNodeActive : ""
                      } ${isCategoryMatch ? styles.orbitalNodeCategoryMatch : ""}`}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.92 }}
                      transition={{ type: "spring", stiffness: 450, damping: 22 }}
                      data-cursor-text="Select"
                    >
                      <ProductIcon name={stageIcons[index]} className={styles.orbitalNodeIcon} />
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Stepper Navigation Controls (Prev / Next Buttons & Indicator) */}
            <div className={styles.dialControls}>
              <motion.button
                type="button"
                onClick={handlePrev}
                className={styles.stepperBtn}
                aria-label="Previous Stage"
                whileHover={{ x: -3, scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                data-cursor-text="Prev"
              >
                <ProductIcon name="chevron-left" className={styles.stepperBtnIcon} />
                <span>Prev</span>
              </motion.button>
              <span
                className={styles.stepCounter}
                aria-label={`Stage ${activeIndex + 1} of ${productBreakdown.length}`}
              >
                {String(activeIndex + 1).padStart(2, "0")} / 08
              </span>
              <motion.button
                type="button"
                onClick={handleNext}
                className={styles.stepperBtn}
                aria-label="Next Stage"
                whileHover={{ x: 3, scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                data-cursor-text="Next"
              >
                <span>Next</span>
                <ProductIcon name="chevron-right" className={styles.stepperBtnIcon} />
              </motion.button>
            </div>
          </Reveal>

          {/* Right Column: Dynamic Detail Card Panel */}
          <div className={styles.detailColumn}>
            <div
              id={`pm-panel-${activeIndex}`}
              role="tabpanel"
              aria-labelledby={`pm-tab-${activeIndex} mobile-tab-${activeIndex}`}
              tabIndex={0}
              className={styles.tabPanel}
            >
              <AnimatePresence mode="wait">
                <motion.article
                  key={activeItem.id}
                  initial={
                    shouldReduceMotion
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 16 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  exit={
                    shouldReduceMotion
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: -16 }
                  }
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : { duration: 0.28, ease: [0.16, 1, 0.3, 1] }
                  }
                  className={`card ${styles.card}`}
                >
                  {/* Top Header Badge & Stage Counter */}
                  <div className={styles.cardTopHeader}>
                    <span className={styles.badge}>
                      <ProductIcon
                        name={categoryIcons[activeItem.category]}
                        className={styles.badgeIcon}
                      />
                      {activeItem.categoryLabel}
                    </span>
                    <span className={styles.stageNumber}>
                      <ProductIcon
                        name={stageIcons[activeIndex]}
                        className={styles.stageNumberIcon}
                      />
                      STAGE {String(activeIndex + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Verbatim Title, Hook, and Description */}
                  <h3 className={styles.title}>{activeItem.title}</h3>
                  <p className={styles.hook}>{activeItem.hook}</p>
                  <p className={styles.description}>{activeItem.description}</p>

                  {/* Verbatim Tags */}
                  <div className={styles.tags}>
                    {activeItem.tags.map((tag) => (
                      <motion.span
                        key={tag}
                        className={`tag ${styles.tag}`}
                        whileHover={{ y: -2, borderColor: "var(--line-strong)" }}
                        whileTap={{ scale: 0.96 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Preserved Verbatim Payoff Section: "The Short Version" */}
        <Reveal amount={0.2}>
          <div className={styles.shortVersion}>
            <p className={`section__label ${styles.shortVersionLabel}`}>The Short Version</p>
            <p>
              Find the problem. Understand the human. Navigate the chaos. Build the right thing. Measure
              whether it worked. Then improve it—again. That&rsquo;s ProdMan.
            </p>
            <motion.a
              className="cta cta--ghost"
              href="#projects"
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              data-cursor-text="Projects"
            >
              Break Down the Product World &rarr;
            </motion.a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
