import React, { useCallback, useEffect, useState } from "react";
import BootAccela from "../components/Boot/BootAccela";
import BootAnimation from "../components/Boot/BootAnimation";
import BootMainMenuComponents from "../components/Boot/BootMainMenuComponents";
import { useStore } from "../store";
import BootAuthorizeUser from "../components/Boot/BootAuthorizeUser";
import BootLoadData from "../components/Boot/BootLoadData";

const BootScene = () => {
  const activeSubscene = useStore((state) => state.bootSubscene);

  const activeBootElement = useStore(
    useCallback(
      (state) =>
        state.bootComponentMatrix[
          activeSubscene as keyof typeof state.bootComponentMatrix
        ][
          state.bootComponentMatrixIndices[
            activeSubscene as keyof typeof state.bootComponentMatrixIndices
          ]
        ],
      [activeSubscene]
    )
  );

  const [accelaVisible, setAccelaVisible] = useState(true);
  const [mainMenuVisible, setMainMenuVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAccelaVisible(false);
      // 2000
    }, 2000);
    setTimeout(() => {
      setMainMenuVisible(true);
      //6200
    }, 6200);
  }, []);

  return (
    <perspectiveCamera position-z={3}>
      <BootAccela visible={accelaVisible} />
      <BootAnimation visible={!accelaVisible} activeSubScene={activeSubscene} />
      <BootMainMenuComponents
        visible={mainMenuVisible}
        activeSubScene={activeSubscene}
        activeBootElement={activeBootElement}
      />
      <BootAuthorizeUser visible={activeSubscene === "authorize_user"} />
      <BootLoadData
        visible={activeSubscene === "load_data"}
        activeBootElement={activeBootElement}
      />
    </perspectiveCamera>
  );
};
export default BootScene;
