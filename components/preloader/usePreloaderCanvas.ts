"use client";

import { useEffect, useRef, useState } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  tx: number;
  ty: number;
  scatterX: number;
  scatterY: number;
  phase: number;
  size: number;
  tone: number;
  alpha: number;
};

const PALETTE = ["244,245,240", "112,239,255", "201,255,61"];

function seededValue(index: number, salt = 1) {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

export function usePreloaderCanvas(logoSrc: string, progress: number) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isReady, setIsReady] = useState(false);

  // Store progress in ref so animation loop gets smooth latest value without resetting state
  const progressRef = useRef(progress);
  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const state = {
      width: 0,
      height: 0,
      dpr: 1,
      particles: [] as Particle[],
      frame: 0,
      ready: false,
      startTime: performance.now(),
    };

    const logo = new Image();
    logo.src = logoSrc;

    function resizeCanvas() {
      const parent = canvas?.parentElement;
      if (!parent) return;

      const bounds = parent.getBoundingClientRect();
      state.width = Math.max(1, Math.round(bounds.width));
      state.height = Math.max(1, Math.round(bounds.height));
      state.dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas!.width = Math.round(state.width * state.dpr);
      canvas!.height = Math.round(state.height * state.dpr);
      canvas!.style.width = `${state.width}px`;
      canvas!.style.height = `${state.height}px`;
      context!.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);

      if (logo.complete && logo.naturalWidth) {
        buildParticleField();
      }
    }

    function buildParticleField() {
      const mobile = state.width < 500;
      const displayWidth = Math.min(state.width * (mobile ? 0.85 : 0.75), 400);
      const displayHeight = displayWidth * (logo.naturalHeight / logo.naturalWidth);
      const sampleWidth = Math.min(400, Math.max(200, Math.round(displayWidth)));
      const sampleHeight = Math.max(1, Math.round(sampleWidth * (logo.naturalHeight / logo.naturalWidth)));

      const sampleCanvas = document.createElement("canvas");
      const sampleContext = sampleCanvas.getContext("2d", { willReadFrequently: true });
      if (!sampleContext) return;

      sampleCanvas.width = sampleWidth;
      sampleCanvas.height = sampleHeight;
      sampleContext.drawImage(logo, 0, 0, sampleWidth, sampleHeight);

      const candidates: { x: number; y: number; alpha: number }[] = [];
      const maxParticles = mobile ? 450 : 800;
      const step = mobile ? 5 : 4;

      const pixels = sampleContext.getImageData(0, 0, sampleWidth, sampleHeight).data;
      for (let y = 0; y < sampleHeight; y += step) {
        for (let x = 0; x < sampleWidth; x += step) {
          const alpha = pixels[(y * sampleWidth + x) * 4 + 3];
          if (alpha > 84) {
            candidates.push({ x, y, alpha });
          }
        }
      }

      if (candidates.length === 0) return;

      const selectedCount = Math.min(maxParticles, candidates.length);
      const originX = (state.width - displayWidth) / 2;
      const centerY = state.height / 2;
      const originY = centerY - displayHeight / 2;

      state.particles = Array.from({ length: selectedCount }, (_, index) => {
        const candidate = candidates[Math.floor((index / selectedCount) * candidates.length)];
        const targetX = originX + (candidate.x / sampleWidth) * displayWidth;
        const targetY = originY + (candidate.y / sampleHeight) * displayHeight;

        // Wide scatter position
        const angle = seededValue(index, 2) * Math.PI * 2;
        const scatterDist = Math.max(state.width, state.height) * (0.4 + seededValue(index, 3) * 0.6);
        const scatterX = state.width / 2 + Math.cos(angle) * scatterDist;
        const scatterY = centerY + Math.sin(angle) * scatterDist;

        return {
          x: scatterX,
          y: scatterY,
          vx: 0,
          vy: 0,
          tx: targetX,
          ty: targetY,
          scatterX,
          scatterY,
          phase: seededValue(index, 4) * Math.PI * 2,
          size: 0.5 + seededValue(index, 5) * 1.3,
          tone: seededValue(index, 6) > 0.88 ? (seededValue(index, 7) > 0.5 ? 1 : 2) : 0,
          alpha: 0.35 + (candidate.alpha / 255) * 0.65,
        };
      });

      state.ready = true;
      setIsReady(true);

      if (reducedMotion.matches) {
        drawStaticFrame();
      }
    }

    function drawStaticFrame() {
      context!.clearRect(0, 0, state.width, state.height);
      for (const particle of state.particles) {
        context!.fillStyle = `rgba(${PALETTE[particle.tone]},${particle.alpha * 0.8})`;
        context!.beginPath();
        context!.arc(particle.tx, particle.ty, particle.size, 0, Math.PI * 2);
        context!.fill();
      }
    }

    function render(timestamp: number) {
      state.frame = 0;
      if (!state.ready) return;

      const elapsed = (timestamp - state.startTime) / 1000;
      const rawProg = Math.max(0, Math.min(100, progressRef.current));
      const normalizedProg = rawProg / 100;
      // Ease curve for particle convergence: 1 - (1 - p)^3
      const convergenceEase = 1 - Math.pow(1 - normalizedProg, 3);

      context!.clearRect(0, 0, state.width, state.height);
      context!.globalCompositeOperation = "lighter";

      for (const particle of state.particles) {
        // Interpolate target from scatter coordinate to final target coordinate based on progress ease
        const currentTargetX = particle.scatterX + (particle.tx - particle.scatterX) * convergenceEase;
        const currentTargetY = particle.scatterY + (particle.ty - particle.scatterY) * convergenceEase;

        // Subtle organic breathing float
        const floatX = Math.cos(elapsed * 1.2 + particle.phase) * (1 - convergenceEase * 0.7);
        const floatY = Math.sin(elapsed * 1.1 + particle.phase) * (1 - convergenceEase * 0.7);

        particle.vx += (currentTargetX + floatX - particle.x) * 0.08;
        particle.vy += (currentTargetY + floatY - particle.y) * 0.08;
        particle.vx *= 0.82;
        particle.vy *= 0.82;
        particle.x += particle.vx;
        particle.y += particle.vy;

        const shimmer = 0.8 + Math.sin(elapsed * 2 + particle.phase) * 0.2;
        const alpha = particle.alpha * shimmer * Math.min(1, 0.3 + convergenceEase * 0.7);
        const radius = particle.size * (0.8 + convergenceEase * 0.4);

        context!.fillStyle = `rgba(${PALETTE[particle.tone]},${alpha})`;
        context!.beginPath();
        context!.arc(particle.x, particle.y, radius, 0, Math.PI * 2);
        context!.fill();
      }

      context!.globalCompositeOperation = "source-over";

      if (!reducedMotion.matches) {
        state.frame = window.requestAnimationFrame(render);
      }
    }

    const resizeObserver = new ResizeObserver(resizeCanvas);
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    function initialize() {
      if (state.ready) return;
      resizeCanvas();
      if (!reducedMotion.matches) {
        state.startTime = performance.now();
        state.frame = window.requestAnimationFrame(render);
      } else {
        drawStaticFrame();
      }
    }

    logo.addEventListener("load", initialize);
    if (logo.complete && logo.naturalWidth) {
      initialize();
    }

    const handleReducedMotionChange = () => {
      if (reducedMotion.matches) {
        if (state.frame) window.cancelAnimationFrame(state.frame);
        drawStaticFrame();
      } else if (state.ready) {
        state.startTime = performance.now();
        state.frame = window.requestAnimationFrame(render);
      }
    };

    reducedMotion.addEventListener("change", handleReducedMotionChange);

    return () => {
      if (state.frame) window.cancelAnimationFrame(state.frame);
      resizeObserver.disconnect();
      reducedMotion.removeEventListener("change", handleReducedMotionChange);
      logo.removeEventListener("load", initialize);
    };
  }, [logoSrc]);

  return { canvasRef, isReady };
}
