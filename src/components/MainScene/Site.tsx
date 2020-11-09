import React, { memo, Suspense } from "react";
import site_a from "../../resources/site_a.json";
import Level from "./Level";
import level_y_values from "../../resources/level_y_values.json";
import blue_orb_positions from "../../resources/blue_orb_positions.json";
import BlueOrb from "./BlueOrb";
import { a, useSpring } from "@react-spring/three";
import { useBlueOrbStore, useLevelStore, useSiteStore } from "../../store";

const Site = memo(() => {
  const activeBlueOrbId = useBlueOrbStore((state) => state.activeBlueOrbId);

  const activeLevels = useLevelStore((state) => state.activeLevels);

  const siteRotY = useSiteStore((state) => state.siteRotY);
  const sitePosY = useSiteStore((state) => state.sitePosY);

  const siteState = useSpring({
    siteRotY: siteRotY,
    sitePosY: sitePosY,
    config: { duration: 1200 },
  });

  return (
    <Suspense fallback={null}>
      {/*distance between LEVELS is 1.5*/}
      <a.group rotation-y={siteState.siteRotY} position-y={siteState.sitePosY}>
        {Object.entries(level_y_values).map((level: [string, number]) => {
          if (activeLevels.includes(level[0].toString()))
            return (
              <Level
                levelPosY={level[1]}
                key={level[1]}
                level={level[0].toString()}
              />
            );
        })}

        {Object.entries(site_a).map((blueOrb) => {
          if (
            // (blueOrb as any)[1]["unlocked_by"] === "-1" &&
            activeLevels.includes(blueOrb[0].substr(0, 2))
          )
            return (
              <BlueOrb
                sprite={blueOrb[1].node_name}
                position={
                  blue_orb_positions[
                    blueOrb[0].substr(2) as keyof typeof blue_orb_positions
                  ].position
                }
                rotation={
                  blue_orb_positions[
                    blueOrb[0].substr(2) as keyof typeof blue_orb_positions
                  ].rotation
                }
                key={blueOrb[1].node_name}
                active={blueOrb[0] === activeBlueOrbId}
                level={blueOrb[0].substr(0, 2)}
              />
            );
        })}
      </a.group>
    </Suspense>
  );
});

export default Site;