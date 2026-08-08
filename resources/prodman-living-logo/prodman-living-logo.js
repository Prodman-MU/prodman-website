(() => {
  "use strict";

  const stage = document.querySelector("#brand-orbit");
  const canvas = document.querySelector("#brand-particles");
  const motionControl = document.querySelector("#motion-control");

  if (!stage || !canvas || !motionControl) return;

  const context = canvas.getContext("2d", { alpha: true });
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const palette = ["244,245,240", "112,239,255", "201,255,61"];
  const pointer = { x: 0, y: 0, active: false };
  const state = {
    width: 0,
    height: 0,
    dpr: 1,
    particles: [],
    frame: 0,
    ready: false,
    visible: true,
    pausedByUser: false,
    startTime: performance.now(),
  };

  const logo = new Image();
  logo.src = stage.dataset.logoSrc || "resources/prodman-living-logo/Prodman-Logo.png";

  function seededValue(index, salt = 1) {
    const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
    return value - Math.floor(value);
  }

  function resizeCanvas() {
    const bounds = stage.getBoundingClientRect();
    state.width = Math.max(1, Math.round(bounds.width));
    state.height = Math.max(1, Math.round(bounds.height));
    state.dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(state.width * state.dpr);
    canvas.height = Math.round(state.height * state.dpr);
    canvas.style.width = `${state.width}px`;
    canvas.style.height = `${state.height}px`;
    context.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);

    if (logo.complete && logo.naturalWidth) buildParticleField();
  }

  function buildParticleField() {
    const mobile = state.width < 720;
    const displayWidth = Math.min(state.width * (mobile ? 0.88 : 0.72), 920);
    const displayHeight = displayWidth * (logo.naturalHeight / logo.naturalWidth);
    const sampleWidth = Math.min(620, Math.max(260, Math.round(displayWidth * 0.74)));
    const sampleHeight = Math.max(1, Math.round(sampleWidth * (logo.naturalHeight / logo.naturalWidth)));
    const sampleCanvas = document.createElement("canvas");
    const sampleContext = sampleCanvas.getContext("2d", { willReadFrequently: true });
    const candidates = [];
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

    state.particles = Array.from({ length: selectedCount }, (_, index) => {
      const candidate = candidates[Math.floor((index / selectedCount) * candidates.length)];
      const targetX = originX + (candidate.x / sampleWidth) * displayWidth;
      const targetY = originY + (candidate.y / sampleHeight) * displayHeight;
      const angle = seededValue(index, 2) * Math.PI * 2;
      const distance = Math.max(state.width, state.height) * (0.26 + seededValue(index, 3) * 0.44);

      return {
        x: state.width / 2 + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance,
        vx: 0,
        vy: 0,
        tx: targetX,
        ty: targetY,
        phase: seededValue(index, 4) * Math.PI * 2,
        size: 0.45 + seededValue(index, 5) * 1.2,
        tone: seededValue(index, 6) > 0.91 ? (seededValue(index, 7) > 0.5 ? 1 : 2) : 0,
        alpha: 0.32 + (candidate.alpha / 255) * 0.62,
      };
    });

    if (reducedMotion.matches) drawStaticFrame();
  }

  function drawStaticFrame() {
    context.clearRect(0, 0, state.width, state.height);
    for (const particle of state.particles) {
      context.fillStyle = `rgba(${palette[particle.tone]},${particle.alpha * 0.62})`;
      context.beginPath();
      context.arc(particle.tx, particle.ty, particle.size, 0, Math.PI * 2);
      context.fill();
    }
  }

  function shouldAnimate() {
    return state.ready && !state.pausedByUser && state.visible && !document.hidden && !reducedMotion.matches;
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

  function render(timestamp) {
    state.frame = 0;
    const elapsed = (timestamp - state.startTime) / 1000;

    if (shouldAnimate()) {
      context.clearRect(0, 0, state.width, state.height);
      context.globalCompositeOperation = "lighter";

      const centerX = state.width / 2;
      const centerY = state.height * (state.width < 720 ? 0.4 : 0.42);
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

        const velocity = Math.min(1, Math.hypot(particle.vx, particle.vy) * 0.12);
        const shimmer = 0.72 + Math.sin(elapsed * 1.4 + particle.phase) * 0.24;
        const alpha = particle.alpha * shimmer * (0.76 + velocity * 0.24);
        const radius = particle.size * (1 + velocity * 0.7);

        context.fillStyle = `rgba(${palette[particle.tone]},${alpha})`;
        context.beginPath();
        context.arc(particle.x, particle.y, radius, 0, Math.PI * 2);
        context.fill();
      }

      context.globalCompositeOperation = "source-over";
      state.frame = window.requestAnimationFrame(render);
    }
  }

  function updateMotionControl() {
    const paused = state.pausedByUser;
    motionControl.setAttribute("aria-pressed", String(paused));
    motionControl.querySelector(".motion-control__label").textContent = paused ? "Play motion" : "Pause motion";
    stage.classList.toggle("motion-paused", paused);
  }

  function updatePointer(event) {
    const bounds = stage.getBoundingClientRect();
    pointer.x = event.clientX - bounds.left;
    pointer.y = event.clientY - bounds.top;
    pointer.active = true;
  }

  motionControl.addEventListener("click", () => {
    state.pausedByUser = !state.pausedByUser;
    updateMotionControl();
    syncAnimationLoop();
  });

  stage.addEventListener("pointermove", updatePointer, { passive: true });
  stage.addEventListener("pointerleave", () => {
    pointer.active = false;
  });

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

  reducedMotion.addEventListener("change", () => {
    if (reducedMotion.matches) drawStaticFrame();
    syncAnimationLoop();
  });

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
})();
