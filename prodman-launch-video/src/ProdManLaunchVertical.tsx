import { Composition } from "remotion";
import { ProdManVideoVertical } from "./ProdManVideoVertical";
import { FPS, TOTAL_FRAMES } from "./theme";

export const ProdManLaunchVertical: React.FC = () => {
  return (
    <Composition
      id="ProdManLaunchVertical"
      component={ProdManVideoVertical}
      durationInFrames={TOTAL_FRAMES}
      fps={FPS}
      width={1080}
      height={1920}
    />
  );
};
