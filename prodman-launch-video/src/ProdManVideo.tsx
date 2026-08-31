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

const TRANSITION_FRAMES = Math.round(0.4 * FPS); // 12 frames = 0.4s overlap

export const ProdManVideo: React.FC = () => {
  return (
    <TransitionSeries>
      {/* Scene 1: Kinetic Typography Intro (0-3s) */}
      <TransitionSeries.Sequence durationInFrames={s(3)} name="Intro">
        <Scene1Intro />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
      />

      {/* Scene 2: ProdMan Identity Reveal (3-7s) */}
      <TransitionSeries.Sequence durationInFrames={s(4)} name="Identity">
        <Scene2Identity />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
      />

      {/* Scene 3: Website Browser Composition (7-15s) */}
      <TransitionSeries.Sequence durationInFrames={s(8)} name="Website">
        <Scene3Website />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: "from-right" })}
        timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
      />

      {/* Scene 4: DISCOVER/DESIGN/VALIDATE/SHOWCASE (15-24s) */}
      <TransitionSeries.Sequence durationInFrames={s(9)} name="Pillars">
        <Scene4Pillars />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
      />

      {/* Scene 5: Rapid Showcase + PRODUCT/TECHNOLOGY/AI (24-32s) */}
      <TransitionSeries.Sequence durationInFrames={s(8)} name="Showcase">
        <Scene5Showcase />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
      />

      {/* Scene 6: Closing + Launch Moment (32-40s) */}
      <TransitionSeries.Sequence durationInFrames={s(8)} name="Closing">
        <Scene6Closing />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
