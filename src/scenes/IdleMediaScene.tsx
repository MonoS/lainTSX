import React, { useEffect } from "react";
import { useStore } from "../store";
import Images from "../components/MediaScene/Images";

const IdleMediaScene = () => {
  const mediaPercentageElapsed = useStore(
    (state) => state.mediaPercentageElapsed
  );
  const setScene = useStore((state) => state.setScene);

  const idleMedia = useStore((state) => state.idleMedia);
  const idleNodeName = useStore((state) => state.idleNodeName);

  useEffect(() => {
    if (mediaPercentageElapsed === 100) setScene("main");
  }, [mediaPercentageElapsed, setScene]);

  useEffect(() => {
    const mediaElement = document.getElementById("media") as HTMLMediaElement;
    const trackElement = document.getElementById("track") as HTMLTrackElement;

    if (mediaElement) {
      mediaElement.currentTime = 0;
      import("../static/webvtt/" + idleNodeName + ".vtt")
        .then((vtt) => {
          if (vtt) trackElement.src = vtt.default;
        })
        // some entries have no spoken words, so the file doesnt exist. we catch that here.
        .catch((e) => console.log(e));

      if (idleMedia.includes("XA")) {
        import("../static/audio/" + idleMedia + ".ogg").then((media) => {
          mediaElement.src = media.default;
          mediaElement.load();
          mediaElement.play();
        });
      } else {
        import("../static/movie/" + idleMedia + "[0].webm").then((media) => {
          mediaElement.src = media.default;
          mediaElement.load();
          mediaElement.play();
        });
      }
    }
  }, [idleMedia, idleNodeName]);

  return (
    <group visible={idleMedia.includes("XA")}>
      <Images />
    </group>
  );
};

export default IdleMediaScene;
