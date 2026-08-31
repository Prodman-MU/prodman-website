import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../theme";

export const Scene6Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "This is where curious minds become product builders."
  const quoteOpacity = interpolate(
    frame,
    [0, 0.5 * fps, 3 * fps, 3.5 * fps],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const quoteScale = interpolate(
    frame,
    [0, 0.8 * fps, 3 * fps, 3.5 * fps],
    [0.9, 1, 1, 1.05],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) }
  );

  // Everything fades out, identity comes in
  const identityOpacity = interpolate(
    frame,
    [3.8 * fps, 4.5 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // "PRODMAN IS LIVE." — impact entrance
  const liveScale = interpolate(
    frame,
    [4.2 * fps, 4.8 * fps],
    [0.5, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) }
  );

  const liveOpacity = interpolate(
    frame,
    [4.2 * fps, 4.5 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // "Build what should exist." tagline
  const taglineOpacity = interpolate(
    frame,
    [5.2 * fps, 5.7 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const taglineY = interpolate(
    frame,
    [5.2 * fps, 5.7 * fps],
    [20, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) }
  );

  // URL
  const urlOpacity = interpolate(
    frame,
    [6 * fps, 6.5 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Impact flash at "IS LIVE" moment
  const flashOpacity = interpolate(
    frame,
    [4.15 * fps, 4.25 * fps, 4.5 * fps],
    [0, 0.4, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Orbit rings in background
  const orbitRotation = interpolate(frame, [0, 8 * fps], [0, 180], {
    extrapolateRight: "extend",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.ink }}>
      {/* Background orbit */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 800,
          height: 800,
          marginLeft: -400,
          marginTop: -400,
          border: `1px solid ${COLORS.line}`,
          borderRadius: "50%",
          opacity: 0.15,
          rotate: `${orbitRotation}deg`,
        }}
      />

      {/* Quote: "This is where curious minds become product builders." */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          opacity: quoteOpacity,
          scale: `${quoteScale}`,
        }}
      >
        <div
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: 52,
            fontWeight: 500,
            fontStyle: "italic",
            color: COLORS.paper,
            textAlign: "center",
            maxWidth: 900,
            lineHeight: 1.3,
          }}
        >
          This is where curious minds
          <br />
          become product builders.
        </div>
      </div>

      {/* Final identity block */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          opacity: identityOpacity,
          gap: 24,
        }}
      >
        {/* Logo mark */}
        <svg width="80" height="65" viewBox="0 0 120 100" fill="none" style={{ opacity: 0.7 }}>
          <path d="M60 5L115 95H5L60 5Z" stroke={COLORS.paper} strokeWidth="2" fill="none" />
          <path d="M60 25L95 85H25L60 25Z" fill={COLORS.acid} opacity="0.6" />
        </svg>

        {/* PRODMAN IS LIVE. */}
        <div
          style={{
            scale: `${liveScale}`,
            opacity: liveOpacity,
            fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
            fontSize: 110,
            fontWeight: 900,
            color: COLORS.paper,
            letterSpacing: "-0.02em",
            lineHeight: 1,
            textAlign: "center",
          }}
        >
          PROD
          <span style={{ color: COLORS.acid }}>MAN</span>
          <br />
          <span style={{ fontSize: 80 }}>IS LIVE.</span>
        </div>

        {/* Acid accent line */}
        <div
          style={{
            width: interpolate(frame, [4.5 * fps, 5 * fps], [0, 300], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            height: 3,
            backgroundColor: COLORS.acid,
          }}
        />

        {/* "Build what should exist." */}
        <div
          style={{
            opacity: taglineOpacity,
            translate: `0 ${taglineY}px`,
            fontFamily: "'Georgia', serif",
            fontSize: 36,
            fontStyle: "italic",
            color: COLORS.muted,
          }}
        >
          Build what should exist.
        </div>

        {/* URL */}
        <div
          style={{
            opacity: urlOpacity,
            fontFamily: "'SFMono-Regular', Consolas, monospace",
            fontSize: 18,
            color: COLORS.acid,
            letterSpacing: "0.08em",
            padding: "8px 20px",
            border: `1px solid ${COLORS.acid}`,
          }}
        >
          prodman-mu.vercel.app
        </div>
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
