"use client";

import { useEffect, useRef } from "react";
import {
  getDocumentTheme,
  THEME_CHANGE_EVENT,
  type ColorTheme,
} from "@/lib/theme";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  tx: number;
  ty: number;
  phase: number;
  size: number;
  tone: number;
  alpha: number;
  motionRadius: number;
};

const PALETTES: Record<ColorTheme, string[]> = {
  dark: ["244,245,240", "112,239,255", "201,255,61"],
  light: ["10,10,10", "58,184,199", "122,161,14"],
};

/**
 * Ports resources/prodman-living-logo/prodman-living-logo.js (a dependency-free
 * Canvas 2D particle field sampled from the logo's alpha channel) into a React
 * lifecycle. The React port retains reduced-motion handling and suspends work
 * while the hero is off-screen or the document is hidden.
 */
export function useLivingLogo(logoSrc: string) {
  const stageRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = { x: 0, y: 0, active: false };
    let theme = getDocumentTheme();
    const state = {
      width: 0,
      height: 0,
      dpr: 1,
      particles: [] as Particle[],
      frame: 0,
      ready: false,
      visible: true,
      startTime: performance.now(),
    };

    const logo = new Image();
    logo.src = logoSrc;

    function seededValue(index: number, salt = 1) {
      const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
      return value - Math.floor(value);
    }

    function resizeCanvas() {
      const bounds = stage!.getBoundingClientRect();
      state.width = Math.max(1, Math.round(bounds.width));
      state.height = Math.max(1, Math.round(bounds.height));
      state.dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas!.width = Math.round(state.width * state.dpr);
      canvas!.height = Math.round(state.height * state.dpr);
      canvas!.style.width = `${state.width}px`;
      canvas!.style.height = `${state.height}px`;
      context!.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);

      if (logo.complete && logo.naturalWidth) buildParticleField();
    }

    function buildParticleField() {
      const mobile = state.width <= 720;
      const displayWidth = Math.min(state.width * (mobile ? 0.88 : 0.72), 920);
      const displayHeight = displayWidth * (logo.naturalHeight / logo.naturalWidth);
      const sampleWidth = Math.min(620, Math.max(260, Math.round(displayWidth * 0.74)));
      const sampleHeight = Math.max(1, Math.round(sampleWidth * (logo.naturalHeight / logo.naturalWidth)));
      const sampleCanvas = document.createElement("canvas");
      const sampleContext = sampleCanvas.getContext("2d", { willReadFrequently: true });
      if (!sampleContext) return;
      const candidates: { x: number; y: number; alpha: number }[] = [];
      const maxParticles = mobile ? 620 : 1250;
      const step = mobile ? 5 : 4;

      sampleCanvas.width = sampleWidth;
      sampleCanvas.height = sampleHeight;
      sampleContext.drawImage(logo, 0, 0, sampleWidth, sampleHeight);

      const pixels = sampleContext.getImageData(0, 0, sampleWidth, sampleHeight).data;
      for (let y = 0; y < sampleHeight; y += step) {
        for (let x = 0; x < sampleWidth; x += step) {
          const alpha = pixels[(y * sampleWidth + x) * 4 + 3];
          if (alpha > 84) candidates.push({ x, y, alpha });
        }
      }

      const selectedCount = Math.min(maxParticles, candidates.length);
      const originX = (state.width - displayWidth) / 2;
      const centerY = state.height * (mobile ? 0.4 : 0.42);
      const originY = centerY - displayHeight / 2;
      const motionRadius = Math.max(
        mobile ? 6 : 10,
        Math.min(mobile ? 10 : 18, displayWidth * 0.018),
      );

      state.particles = Array.from({ length: selectedCount }, (_, index) => {
        const candidate = candidates[Math.floor((index / selectedCount) * candidates.length)];
        const targetX = originX + (candidate.x / sampleWidth) * displayWidth;
        const targetY = originY + (candidate.y / sampleHeight) * displayHeight;
        const angle = seededValue(index, 2) * Math.PI * 2;
        const introOffset = motionRadius * (0.35 + seededValue(index, 3) * 0.65);

        return {
          x: targetX + Math.cos(angle) * introOffset,
          y: targetY + Math.sin(angle) * introOffset,
          vx: 0,
          vy: 0,
          tx: targetX,
          ty: targetY,
          phase: seededValue(index, 4) * Math.PI * 2,
          size: 0.45 + seededValue(index, 5) * 1.2,
          tone: seededValue(index, 6) > 0.91 ? (seededValue(index, 7) > 0.5 ? 1 : 2) : 0,
          alpha: 0.32 + (candidate.alpha / 255) * 0.62,
          motionRadius,
        };
      });

      if (reducedMotion.matches) drawStaticFrame();
    }

    function drawStaticFrame() {
      context!.clearRect(0, 0, state.width, state.height);
      context!.globalCompositeOperation = theme === "light" ? "source-over" : "lighter";
      for (const particle of state.particles) {
        context!.fillStyle = `rgba(${PALETTES[theme][particle.tone]},${particle.alpha * 0.72})`;
        context!.beginPath();
        context!.arc(particle.tx, particle.ty, particle.size, 0, Math.PI * 2);
        context!.fill();
      }
    }

    function shouldAnimate() {
      return state.ready && state.visible && !document.hidden && !reducedMotion.matches;
    }

    function syncAnimationLoop() {
      if (shouldAnimate() && !state.frame) {
        state.startTime = performance.now();
        state.frame = window.requestAnimationFrame(render);
        return;
      }

      if (!shouldAnimate() && state.frame) {
        window.cancelAnimationFrame(state.frame);
        state.frame = 0;
      }
    }

    function render(timestamp: number) {
      state.frame = 0;
      const elapsed = (timestamp - state.startTime) / 1000;

      if (shouldAnimate()) {
        context!.clearRect(0, 0, state.width, state.height);
        context!.globalCompositeOperation = theme === "light" ? "source-over" : "lighter";

        const centerX = state.width / 2;
        const centerY = state.height * (state.width <= 720 ? 0.4 : 0.42);
        const bloom = Math.pow(Math.max(0, Math.sin(elapsed * 0.3 - 1.2)), 12);

        for (const particle of state.particles) {
          const dxFromCenter = particle.tx - centerX;
          const dyFromCenter = particle.ty - centerY;
          const breathing = 1 + Math.sin(elapsed * 0.62 + particle.phase) * 0.0035;
          const noiseX = Math.cos(elapsed * 0.82 + particle.phase * 2.1) * (0.5 + bloom * 13);
          const noiseY = Math.sin(elapsed * 0.71 + particle.phase * 1.7) * (0.5 + bloom * 9);
          let targetX = centerX + dxFromCenter * breathing + noiseX;
          let targetY = centerY + dyFromCenter * breathing + noiseY;

          if (pointer.active) {
            const pointerDx = particle.x - pointer.x;
            const pointerDy = particle.y - pointer.y;
            const pointerDistance = Math.hypot(pointerDx, pointerDy);
            const pointerRadius = Math.min(170, state.width * 0.22);

            if (pointerDistance > 0 && pointerDistance < pointerRadius) {
              const force = Math.pow(1 - pointerDistance / pointerRadius, 2) * 34;
              targetX += (pointerDx / pointerDistance) * force;
              targetY += (pointerDy / pointerDistance) * force;
            }
          }

          particle.vx += (targetX - particle.x) * 0.025;
          particle.vy += (targetY - particle.y) * 0.025;
          particle.vx *= 0.89;
          particle.vy *= 0.89;
          particle.x += particle.vx;
          particle.y += particle.vy;

          const displacementX = particle.x - particle.tx;
          const displacementY = particle.y - particle.ty;
          const displacement = Math.hypot(displacementX, displacementY);

          if (displacement > particle.motionRadius) {
            const containment = particle.motionRadius / displacement;
            particle.x = particle.tx + displacementX * containment;
            particle.y = particle.ty + displacementY * containment;
            particle.vx *= 0.35;
            particle.vy *= 0.35;
          }

          const velocity = Math.min(1, Math.hypot(particle.vx, particle.vy) * 0.12);
          const shimmer = 0.72 + Math.sin(elapsed * 1.4 + particle.phase) * 0.24;
          const alpha = particle.alpha * shimmer * (0.76 + velocity * 0.24);
          const radius = particle.size * (1 + velocity * 0.7);

          context!.fillStyle = `rgba(${PALETTES[theme][particle.tone]},${alpha})`;
          context!.beginPath();
          context!.arc(particle.x, particle.y, radius, 0, Math.PI * 2);
          context!.fill();
        }

        context!.globalCompositeOperation = "source-over";
        state.frame = window.requestAnimationFrame(render);
      }
    }

    function updatePointer(event: PointerEvent) {
      const bounds = stage!.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
      pointer.active = true;
    }

    function handlePointerLeave() {
      pointer.active = false;
    }

    function handleReducedMotionChange() {
      if (reducedMotion.matches) drawStaticFrame();
      syncAnimationLoop();
    }

    function handleThemeChange(event: Event) {
      theme = (event as CustomEvent<ColorTheme>).detail ?? getDocumentTheme();
      if (!shouldAnimate()) drawStaticFrame();
    }

    stage.addEventListener("pointermove", updatePointer, { passive: true });
    stage.addEventListener("pointerleave", handlePointerLeave);

    const stageObserver = new IntersectionObserver(
      ([entry]) => {
        state.visible = entry.isIntersecting;
        syncAnimationLoop();
      },
      { threshold: 0.03 },
    );
    stageObserver.observe(stage);

    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(stage);

    reducedMotion.addEventListener("change", handleReducedMotionChange);
    window.addEventListener(THEME_CHANGE_EVENT, handleThemeChange);
    document.addEventListener("visibilitychange", syncAnimationLoop);

    function initialize() {
      if (state.ready) return;
      state.ready = true;
      resizeCanvas();
      if (reducedMotion.matches) drawStaticFrame();
      syncAnimationLoop();
    }

    logo.addEventListener("load", initialize);
    if (logo.complete && logo.naturalWidth) {
      initialize();
    }

    return () => {
      if (state.frame) window.cancelAnimationFrame(state.frame);
      stage.removeEventListener("pointermove", updatePointer);
      stage.removeEventListener("pointerleave", handlePointerLeave);
      stageObserver.disconnect();
      resizeObserver.disconnect();
      reducedMotion.removeEventListener("change", handleReducedMotionChange);
      window.removeEventListener(THEME_CHANGE_EVENT, handleThemeChange);
      document.removeEventListener("visibilitychange", syncAnimationLoop);
      logo.removeEventListener("load", initialize);
    };
  }, [logoSrc]);

  return { stageRef, canvasRef };
}
