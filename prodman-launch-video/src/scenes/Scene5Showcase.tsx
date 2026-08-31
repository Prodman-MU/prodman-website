import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../theme";

const SHOWCASE_ITEMS = [
  { label: "Members", accent: COLORS.acid },
  { label: "Events", accent: COLORS.coral },
  { label: "Product Breakdown", accent: COLORS.cyan },
  { label: "Community", accent: COLORS.purple },
];

const PILLARS_TEXT = ["PRODUCT", "TECHNOLOGY", "AI"];

export const Scene5Showcase: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // First half: rapid showcase beats (0-4s of this scene)
  const beatDuration = 1 * fps; // 1 second per beat

  // Second half: PRODUCT / TECHNOLOGY / AI (4-8s)
  const pillarsStart = 4 * fps;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.ink }}>
      {/* Rapid showcase beats */}
      {SHOWCASE_ITEMS.map((item, i) => {
        const start = i * beatDuration;
        const end = start + beatDuration;

        const opacity = interpolate(
          frame,
          [start, start + 0.08 * fps, end - 0.1 * fps, end],
          [0, 1, 1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        const scale = interpolate(
          frame,
          [start, start + 0.2 * fps],
          [0.8, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) }
        );

        // Card visual
        const cardRotation = interpolate(
          frame,
          [start, start + 0.3 * fps],
          [i % 2 === 0 ? -5 : 5, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) }
        );

        return (
          <AbsoluteFill
            key={i}
            style={{
              opacity,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                scale: `${scale}`,
                rotate: `${cardRotation}deg`,
                width: 500,
                height: 320,
                border: `3px solid ${item.accent}`,
                borderRadius: 8,
                backgroundColor: COLORS.ink,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 16,
                boxShadow: `8px 8px 0 ${item.accent}40`,
              }}
            >
              <div
                style={{
                  fontFamily: "'SFMono-Regular', Consolas, monospace",
                  fontSize: 14,
                  color: item.accent,
                  letterSpacing: "0.16em",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <div
                style={{
                  fontFamily: "'Georgia', serif",
                  fontSize: 56,
                  fontWeight: 600,
                  color: COLORS.paper,
                  textAlign: "center",
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  width: 60,
                  height: 3,
                  backgroundColor: item.accent,
                }}
              />
            </div>
          </AbsoluteFill>
        );
      })}

      {/* PRODUCT / TECHNOLOGY / AI */}
      {PILLARS_TEXT.map((word, i) => {
        const start = pillarsStart + i * 1.2 * fps;
        const end = start + 1.2 * fps;

        const opacity = interpolate(
          frame,
          [start, start + 0.1 * fps, end - 0.15 * fps, end],
          [0, 1, 1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        const yOffset = interpolate(
          frame,
          [start, start + 0.3 * fps],
          [50, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) }
        );

        const colors = [COLORS.acid, COLORS.cyan, COLORS.purple];

        return (
          <div
            key={word}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              opacity,
              translate: `0 ${yOffset}px`,
            }}
          >
            <div
              style={{
                fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
                fontSize: 140,
                fontWeight: 900,
                color: colors[i],
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              {word}
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
