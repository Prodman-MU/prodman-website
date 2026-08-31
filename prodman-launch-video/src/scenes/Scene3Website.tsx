import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../theme";

export const Scene3Website: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Browser window fades in and scales up
  const browserOpacity = interpolate(frame, [0, 0.5 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const browserScale = interpolate(frame, [0, 1 * fps], [0.85, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Camera zooms into different areas over time
  const zoomPhase = interpolate(frame, [0, 3 * fps, 5 * fps, 7.5 * fps], [1, 1.1, 1.15, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const panX = interpolate(frame, [0, 2 * fps, 4 * fps, 6 * fps, 7.5 * fps], [0, -40, 20, -30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const panY = interpolate(frame, [0, 2 * fps, 4 * fps, 6 * fps, 7.5 * fps], [0, -20, 30, -10, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Questions appear sequentially
  const questions = [
    { text: "Why does this work?", start: 1.5 * fps, end: 3 * fps },
    { text: "Why doesn't it?", start: 3 * fps, end: 4.5 * fps },
    { text: "How could it be better?", start: 4.5 * fps, end: 6.5 * fps },
  ];

  // Website scroll position (simulated)
  const scrollY = interpolate(frame, [0, 7.5 * fps], [0, -1800], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.ink }}>
      {/* Browser window container */}
      <div
        style={{
          position: "absolute",
          top: "5%",
          left: "8%",
          width: "84%",
          height: "85%",
          opacity: browserOpacity,
          scale: `${browserScale}`,
          perspective: 1200,
        }}
      >
        {/* Browser chrome */}
        <div
          style={{
            width: "100%",
            height: 48,
            backgroundColor: "#1a1a1a",
            borderRadius: "12px 12px 0 0",
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
            gap: 8,
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#ff5f57" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#ffbd2e" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#28c840" }} />
          <div
            style={{
              flex: 1,
              marginLeft: 16,
              height: 28,
              borderRadius: 6,
              backgroundColor: "#2a2a2a",
              display: "flex",
              alignItems: "center",
              paddingLeft: 12,
            }}
          >
            <span style={{ color: COLORS.muted, fontSize: 13, fontFamily: "monospace" }}>
              prodman-mu.vercel.app
            </span>
          </div>
        </div>

        {/* Browser viewport with website content */}
        <div
          style={{
            width: "100%",
            height: "calc(100% - 48px)",
            borderRadius: "0 0 12px 12px",
            overflow: "hidden",
            backgroundColor: COLORS.warmPaper,
            position: "relative",
          }}
        >
          {/* Simulated website content */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              scale: `${zoomPhase}`,
              translate: `${panX}px ${panY}px`,
            }}
          >
            <div style={{ transform: `translateY(${scrollY}px)` }}>
              {/* Hero area */}
              <div
                style={{
                  height: 600,
                  background: `linear-gradient(135deg, ${COLORS.warmPaper} 0%, #e8f5e9 50%, #e3f2fd 100%)`,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                {/* Logo mark */}
                <svg width="160" height="130" viewBox="0 0 120 100" fill="none" style={{ marginBottom: 20 }}>
                  <path d="M60 5L115 95H5L60 5Z" stroke={COLORS.ink} strokeWidth="2" fill="none" />
                  <path d="M60 25L95 85H25L60 25Z" fill={COLORS.acid} opacity="0.6" />
                </svg>
                <div
                  style={{
                    fontFamily: "monospace",
                    fontSize: 14,
                    color: COLORS.ink,
                    letterSpacing: "0.16em",
                    padding: "6px 16px",
                    border: `2px solid ${COLORS.ink}`,
                    backgroundColor: COLORS.acid,
                    marginBottom: 24,
                  }}
                >
                  PRODUCT MANAGEMENT CLUB · 2026
                </div>
                <div
                  style={{
                    fontFamily: "'Georgia', serif",
                    fontSize: 64,
                    fontWeight: 700,
                    color: COLORS.ink,
                    textAlign: "center",
                    lineHeight: 1.05,
                    fontStyle: "italic",
                  }}
                >
                  Building
                  <br />
                  The Next-Gen
                  <br />
                  Product Leaders.
                </div>
              </div>

              {/* Members section preview */}
              <div style={{ height: 500, backgroundColor: COLORS.warmPaper, padding: "60px 80px" }}>
                <div style={{ fontFamily: "'Georgia', serif", fontSize: 48, fontWeight: 600, color: COLORS.ink, marginBottom: 16 }}>
                  The crew of 2026–27
                </div>
                <div style={{ display: "flex", gap: 20 }}>
                  {[COLORS.acid, COLORS.cyan, COLORS.coral, COLORS.purple].map((color, i) => (
                    <div
                      key={i}
                      style={{
                        width: 200,
                        height: 260,
                        backgroundColor: color,
                        borderRadius: 4,
                        border: `2px solid ${COLORS.ink}`,
                        boxShadow: "6px 6px 0 #0a0a0a",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Product Breakdown preview */}
              <div style={{ height: 500, backgroundColor: "#1a1a1a", padding: "60px 80px" }}>
                <div style={{ fontFamily: "'Georgia', serif", fontSize: 48, fontWeight: 600, color: COLORS.paper, marginBottom: 16 }}>
                  What Is ProdMan?
                </div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  {["Spot the Problem", "Shape the Strategy", "Design the Experience", "Choose What Gets Built"].map((label, i) => (
                    <div
                      key={i}
                      style={{
                        padding: "10px 20px",
                        border: `1px solid ${COLORS.line}`,
                        color: COLORS.paper,
                        fontFamily: "monospace",
                        fontSize: 13,
                      }}
                    >
                      {String(i + 1).padStart(2, "0")} {label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating questions */}
      {questions.map((q, i) => {
        const qOpacity = interpolate(
          frame,
          [q.start, q.start + 0.3 * fps, q.end - 0.3 * fps, q.end],
          [0, 1, 1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        const qY = interpolate(
          frame,
          [q.start, q.start + 0.4 * fps],
          [30, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) }
        );

        const positions = [
          { right: "5%", top: "20%" },
          { right: "5%", top: "45%" },
          { right: "5%", top: "70%" },
        ];

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              ...positions[i],
              opacity: qOpacity,
              translate: `0 ${qY}px`,
              fontFamily: "'Georgia', serif",
              fontSize: 36,
              fontWeight: 500,
              fontStyle: "italic",
              color: COLORS.paper,
              textShadow: "0 2px 20px rgba(0,0,0,0.8)",
              maxWidth: 400,
            }}
          >
            "{q.text}"
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
