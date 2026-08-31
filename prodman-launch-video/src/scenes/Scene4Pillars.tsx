import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../theme";

const PILLARS = [
  { word: "DISCOVER", color: COLORS.acid, bg: "#0a0a0a" },
  { word: "DESIGN", color: COLORS.cyan, bg: "#0a0a0a" },
  { word: "VALIDATE", color: COLORS.coral, bg: "#0a0a0a" },
  { word: "SHOWCASE", color: COLORS.purple, bg: "#0a0a0a" },
];

export const Scene4Pillars: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Each pillar gets ~2.25 seconds
  const pillarDuration = 2.25 * fps; // ~67 frames

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.ink }}>
      {PILLARS.map((pillar, i) => {
        const start = i * pillarDuration;
        const end = start + pillarDuration;

        // Word dominates the screen
        const wordOpacity = interpolate(
          frame,
          [start, start + 0.15 * fps, end - 0.2 * fps, end],
          [0, 1, 1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        const wordScale = interpolate(
          frame,
          [start, start + 0.25 * fps, end - 0.15 * fps, end],
          [0.6, 1, 1, 1.2],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }
        );

        // Accent line slides in
        const lineWidth = interpolate(
          frame,
          [start + 0.1 * fps, start + 0.5 * fps],
          [0, 400],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) }
        );

        // Stage number
        const numOpacity = interpolate(
          frame,
          [start + 0.2 * fps, start + 0.5 * fps, end - 0.3 * fps, end],
          [0, 0.6, 0.6, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        // Background flash on entry
        const flashOpacity = interpolate(
          frame,
          [start, start + 0.08 * fps, start + 0.25 * fps],
          [0, 0.15, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        return (
          <AbsoluteFill key={i} style={{ opacity: wordOpacity }}>
            {/* Color flash */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: pillar.color,
                opacity: flashOpacity,
              }}
            />

            {/* Main word */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* Stage number */}
              <div
                style={{
                  opacity: numOpacity,
                  fontFamily: "'SFMono-Regular', Consolas, monospace",
                  fontSize: 16,
                  color: COLORS.muted,
                  letterSpacing: "0.2em",
                  marginBottom: 24,
                }}
              >
                STAGE {String(i + 1).padStart(2, "0")} / 04
              </div>

              {/* The word */}
              <div
                style={{
                  scale: `${wordScale}`,
                  fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
                  fontSize: 180,
                  fontWeight: 900,
                  color: pillar.color,
                  letterSpacing: "-0.03em",
                  lineHeight: 0.9,
                  textAlign: "center",
                }}
              >
                {pillar.word}
              </div>

              {/* Accent line */}
              <div
                style={{
                  width: lineWidth,
                  height: 4,
                  backgroundColor: pillar.color,
                  marginTop: 32,
                  opacity: 0.8,
                }}
              />
            </div>
          </AbsoluteFill>
        );
      })}
    </AbsoluteFill>
  );
};
