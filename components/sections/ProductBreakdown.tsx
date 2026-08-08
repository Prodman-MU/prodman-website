"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  productBreakdown,
  productBreakdownCategories,
  type ProductBreakdownItem,
  type PMCategory,
} from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import styles from "./ProductBreakdown.module.css";

export function ProductBreakdown() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState<"all" | PMCategory>("all");
  const shouldReduceMotion = useReducedMotion();

  // Refs for roving tabindex keyboard navigation
  const nodeRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const mobileNodeRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const categoryTabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeItem: ProductBreakdownItem = productBreakdown[activeIndex] ?? productBreakdown[0];

  // Stage switch handler: updates active index and syncs category tab state automatically
  const handleStageSelect = useCallback((index: number) => {
    setActiveIndex(index);
    setActiveCategory(productBreakdown[index].category);
  }, []);

  // Category switch handler: auto-selects first stage in category if current item is outside
  const handleCategorySelect = useCallback(
    (catId: "all" | PMCategory) => {
      setActiveCategory(catId);
      if (catId !== "all") {
        const matchingIndex = productBreakdown.findIndex((item) => item.category === catId);
        if (matchingIndex !== -1 && productBreakdown[activeIndex].category !== catId) {
          setActiveIndex(matchingIndex);
        }
      }
    },
    [activeIndex]
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

  // Keyboard navigation for desktop lifecycle stage nodes (Roving tabindex)
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
    [handleStageSelect]
  );

  // Keyboard navigation for mobile lifecycle step nodes (Roving tabindex)
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
    [handleStageSelect]
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
            {/* Mobile Step Bar (< 768px viewports) */}
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
                    <span className={styles.mobileStepNodeNum}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{item.title}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Desktop SVG Radial Orbital Dial (>= 768px viewports) */}
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
                  stroke="rgba(244, 245, 240, 0.08)"
                  strokeWidth="1"
                />
                {/* Active Beam Pointer Line */}
                <motion.line
                  x1="200"
                  y1="200"
                  x2={200 + 152 * Math.cos((activeAngle * Math.PI) / 180)}
                  y2={200 + 152 * Math.sin((activeAngle * Math.PI) / 180)}
                  stroke="var(--acid)"
                  strokeWidth="2"
                  strokeOpacity="0.8"
                  animate={{
                    x2: 200 + 152 * Math.cos((activeAngle * Math.PI) / 180),
                    y2: 200 + 152 * Math.sin((activeAngle * Math.PI) / 180),
                  }}
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
                      {String(index + 1).padStart(2, "0")}
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
                &larr; Prev
              </motion.button>
              <span className={styles.stepCounter}>
                STAGE {String(activeIndex + 1).padStart(2, "0")} OF 08
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
                Next &rarr;
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
                      <span
                        className={styles.badgeDot}
                        style={{ backgroundColor: activeItem.accentColor }}
                      />
                      {activeItem.categoryLabel}
                    </span>
                    <span className={styles.stageNumber}>
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
                        whileHover={{ y: -2, borderColor: "rgba(244, 245, 240, 0.4)" }}
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
