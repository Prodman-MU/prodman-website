// ProdMan Brand Tokens
export const COLORS = {
  ink: "#050505",
  paper: "#f4f5f0",
  acid: "#c9ff3d",
  cyan: "#70efff",
  purple: "#b9a7ff",
  coral: "#ff8d63",
  muted: "rgba(244, 245, 240, 0.58)",
  line: "rgba(244, 245, 240, 0.14)",
  warmPaper: "#f2f0e8",
  surface: "#fffdf5",
} as const;

// Video specs
export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const TOTAL_DURATION_SECONDS = 40;
export const TOTAL_FRAMES = TOTAL_DURATION_SECONDS * FPS; // 1200

// Scene timing (in seconds)
export const SCENES = {
  intro: { start: 0, duration: 3 },        // 0-3s: Kinetic typography
  identity: { start: 3, duration: 4 },      // 3-7s: ProdMan reveal
  website: { start: 7, duration: 8 },       // 7-15s: Browser composition
  pillars: { start: 15, duration: 9 },      // 15-24s: DISCOVER/DESIGN/VALIDATE/SHOWCASE
  showcase: { start: 24, duration: 8 },     // 24-32s: Rapid showcase
  closing: { start: 32, duration: 8 },      // 32-40s: Launch moment
} as const;

// Convert seconds to frames
export const s = (seconds: number) => Math.round(seconds * FPS);

// Easing helpers
export const EXPO_OUT = [0.16, 1, 0.3, 1] as const;
