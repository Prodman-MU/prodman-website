import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../theme";

export const Scene2Identity: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo mark scales in with spring
  const logoScale = interpolate(
    frame,
    [0, 0.6 * fps],
    [0.3, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) }
  );

  const logoOpacity = interpolate(
    frame,
    [0, 0.3 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // "PROD MAN" text slides up
  const textY = interpolate(
    frame,
    [0.4 * fps, 0.9 * fps],
    [40, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) }
  );

  const textOpacity = interpolate(
    frame,
    [0.4 * fps, 0.8 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Subtitle fades in
  const subOpacity = interpolate(
    frame,
    [1.0 * fps, 1.5 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const subY = interpolate(
    frame,
    [1.0 * fps, 1.5 * fps],
    [20, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) }
  );

  // Orbit ring rotates
  const orbitRotation = interpolate(frame, [0, 4 * fps], [0, 360], {
    extrapolateRight: "extend",
  });

  // Acid accent line slides in from left
  const lineWidth = interpolate(
    frame,
    [0.8 * fps, 1.4 * fps],
    [0, 200],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.ink,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Background orbit ring */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          border: `1px solid ${COLORS.line}`,
          borderRadius: "50%",
          opacity: 0.3,
          rotate: `${orbitRotation}deg`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          border: `1px solid ${COLORS.line}`,
          borderRadius: "50%",
          opacity: 0.2,
          rotate: `${-orbitRotation * 0.7}deg`,
        }}
      />

      {/* Logo mark — simplified ProdMan triangle */}
      <div
        style={{
          opacity: logoOpacity,
          scale: `${logoScale}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        {/* Triangle mark */}
        <svg width="120" height="100" viewBox="0 0 120 100" fill="none">
          <path
            d="M60 5L115 95H5L60 5Z"
            stroke={COLORS.paper}
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M60 25L95 85H25L60 25Z"
            fill={COLORS.acid}
            opacity="0.8"
          />
        </svg>

        {/* PROD MAN text */}
        <div
          style={{
            translate: `0 ${textY}px`,
            opacity: textOpacity,
            fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
            fontSize: 96,
            fontWeight: 800,
            color: COLORS.paper,
            letterSpacing: "0.08em",
            lineHeight: 1,
          }}
        >
          PROD<span style={{ color: COLORS.acid }}>MAN</span>
        </div>

        {/* Acid accent line */}
        <div
          style={{
            width: lineWidth,
            height: 3,
            backgroundColor: COLORS.acid,
          }}
        />

        {/* Subtitle */}
        <div
          style={{
            opacity: subOpacity,
            translate: `0 ${subY}px`,
            fontFamily: "'SFMono-Regular', Consolas, monospace",
            fontSize: 18,
            color: COLORS.muted,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          Product Management Club · Masters' Union
        </div>
      </div>
    </AbsoluteFill>
  );
};
