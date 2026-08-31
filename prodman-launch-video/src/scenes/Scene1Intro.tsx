import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../theme";

export const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "Everyone uses products" — fade in from 0.2s, hold, then aggressively replace
  const line1Opacity = interpolate(
    frame,
    [0.2 * fps, 0.5 * fps, 1.4 * fps, 1.6 * fps],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const line1Scale = interpolate(
    frame,
    [0.2 * fps, 0.5 * fps, 1.4 * fps, 1.6 * fps],
    [0.85, 1, 1, 1.15],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) }
  );

  // "Very few build the right ones" — slam in at 1.6s
  const line2Opacity = interpolate(
    frame,
    [1.6 * fps, 1.8 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const line2Y = interpolate(
    frame,
    [1.6 * fps, 1.9 * fps],
    [60, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) }
  );

  const line2Scale = interpolate(
    frame,
    [1.6 * fps, 1.9 * fps],
    [1.1, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) }
  );

  // Impact flash at transition point
  const flashOpacity = interpolate(
    frame,
    [1.55 * fps, 1.6 * fps, 1.75 * fps],
    [0, 0.3, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Subtle grain overlay
  const grainSeed = Math.floor(frame * 0.5);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.ink,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Subtle noise grain */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' seed='${grainSeed}' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
        }}
      />

      {/* Line 1: "Everyone uses products." */}
      <div
        style={{
          position: "absolute",
          opacity: line1Opacity,
          scale: `${line1Scale}`,
          fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
          fontSize: 72,
          fontWeight: 700,
          color: COLORS.paper,
          letterSpacing: "-0.02em",
          textAlign: "center",
          lineHeight: 1.1,
        }}
      >
        Everyone uses products.
      </div>

      {/* Line 2: "Very few build the right ones." */}
      <div
        style={{
          position: "absolute",
          opacity: line2Opacity,
          translate: `0 ${line2Y}px`,
          scale: `${line2Scale}`,
          fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
          fontSize: 72,
          fontWeight: 700,
          color: COLORS.acid,
          letterSpacing: "-0.02em",
          textAlign: "center",
          lineHeight: 1.1,
        }}
      >
        Very few build the right ones.
      </div>

      {/* Impact flash */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: COLORS.acid,
          opacity: flashOpacity,
        }}
      />
    </AbsoluteFill>
  );
};
