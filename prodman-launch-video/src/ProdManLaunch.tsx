import { Composition } from "remotion";
import { ProdManVideo } from "./ProdManVideo";
import { FPS, WIDTH, HEIGHT, TOTAL_FRAMES } from "./theme";

export const ProdManLaunch: React.FC = () => {
  return (
    <Composition
      id="ProdManLaunch"
      component={ProdManVideo}
      durationInFrames={TOTAL_FRAMES}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};
