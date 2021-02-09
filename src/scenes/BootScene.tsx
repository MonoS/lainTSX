import React, { useCallback, useEffect, useState } from "react";
import BootAccela from "../components/BootScene/BootAccela";
import BootAnimation from "../components/BootScene/BootAnimation";
import BootMainMenuComponents from "../components/BootScene/BootMainMenuComponents";
import { useStore } from "../store";
import BootAuthorizeUser from "../components/BootScene/BootAuthorizeUser";
import BootLoadData from "../components/BootScene/BootLoadData";

const BootScene = () => {
  const activeSubscene = useStore((state) => state.bootSubscene);

  const [accelaVisible, setAccelaVisible] = useState(true);
  const [mainMenuVisible, setMainMenuVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAccelaVisible(false);
      // 2000
    }, 0);
    setTimeout(() => {
      setMainMenuVisible(true);
      //6200
    }, 0);
  }, []);

  return (
    <perspectiveCamera position-z={3}>
      <BootAccela visible={accelaVisible} />
      <BootAnimation visible={!accelaVisible} activeSubScene={activeSubscene} />
      <BootMainMenuComponents
        visible={mainMenuVisible}
        activeSubScene={activeSubscene}
      />
      <BootAuthorizeUser visible={activeSubscene === "authorize_user"} />
      <BootLoadData visible={activeSubscene === "load_data"} />
    </perspectiveCamera>
  );
};
export default BootScene;
