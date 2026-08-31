import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { Scene1Intro } from "./scenes/Scene1Intro";
import { Scene2Identity } from "./scenes/Scene2Identity";
import { Scene3Website } from "./scenes/Scene3Website";
import { Scene4Pillars } from "./scenes/Scene4Pillars";
import { Scene5Showcase } from "./scenes/Scene5Showcase";
import { Scene6Closing } from "./scenes/Scene6Closing";
import { FPS, s } from "./theme";

const TRANSITION_FRAMES = Math.round(0.4 * FPS);

/**
 * Vertical (9:16) version of the ProdMan launch video.
 * Uses the same scene components but wraps them in a scaled container
 * so the 1920x1080 content fits within 1080x1920.
 */
export const ProdManVideoVertical: React.FC = () => {
  // Scale factor: fit 1920x1080 content into 1080x1920 viewport
  const scaleX = 1080 / 1920;

  return (
    <AbsoluteFill style={{ backgroundColor: "#050505" }}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 1920,
          height: 1080,
          translate: "-50% -50%",
          scale: `${scaleX}`,
          transformOrigin: "center center",
        }}
      >
        <TransitionSeries>
          <TransitionSeries.Sequence durationInFrames={s(3)} name="Intro">
            <Scene1Intro />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={fade()}
            timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
          />

          <TransitionSeries.Sequence durationInFrames={s(4)} name="Identity">
            <Scene2Identity />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={fade()}
            timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
          />

          <TransitionSeries.Sequence durationInFrames={s(8)} name="Website">
            <Scene3Website />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={slide({ direction: "from-right" })}
            timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
          />

          <TransitionSeries.Sequence durationInFrames={s(9)} name="Pillars">
            <Scene4Pillars />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={fade()}
            timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
          />

          <TransitionSeries.Sequence durationInFrames={s(8)} name="Showcase">
            <Scene5Showcase />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={fade()}
            timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
          />

          <TransitionSeries.Sequence durationInFrames={s(8)} name="Closing">
            <Scene6Closing />
          </TransitionSeries.Sequence>
        </TransitionSeries>
      </div>
    </AbsoluteFill>
  );
};
