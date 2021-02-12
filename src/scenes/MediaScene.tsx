import React, { useEffect } from "react";
import { useStore } from "../store";
import LeftSide from "../components/MediaScene/Selectables/LeftSide";
import RightSide from "../components/MediaScene/Selectables/RightSide";
import AudioVisualizer from "../components/MediaScene/AudioVisualizer/AudioVisualizer";
import MediaLoadingBar from "../components/MediaScene/MediaLoadingBar";
import NodeNameContainer from "../components/MediaScene/NodeNameContainer";
import Images from "../components/MediaScene/Images";
import GreenTextRenderer from "../components/TextRenderer/GreenTextRenderer";
import MediaYellowTextAnimator from "../components/TextRenderer/MediaYellowTextAnimator";

const MediaScene = () => {
  const activeNodeMedia = useStore((state) => state.activeNode.media_file);

  useEffect(() => {
    document.getElementsByTagName("canvas")[0].className =
      "media-scene-background";

    return () => {
      document.getElementsByTagName("canvas")[0].className = "";
    };
  }, []);

  const nodeMedia = useStore((state) => state.activeNode.media_file);
  const nodeName = useStore((state) => state.activeNode.node_name);

  useEffect(() => {
    const mediaElement = document.getElementById("media") as HTMLMediaElement;
    const trackElement = document.getElementById("track") as HTMLTrackElement;

    if (mediaElement) {
      mediaElement.currentTime = 0;
      import("../static/webvtt/" + nodeName + ".vtt")
        .then((vtt) => {
          if (vtt) trackElement.src = vtt.default;
        })
        // some entries have no spoken words, so the file doesnt exist. we catch that here.
        .catch((e) => console.log(e));

      if (nodeMedia.includes("XA")) {
        import("../static/audio/" + nodeMedia + ".ogg").then((media) => {
          mediaElement.src = media.default;
          mediaElement.load();
        });
      } else {
        import("../static/movie/" + nodeMedia + "[0].webm").then((media) => {
          mediaElement.src = media.default;
          mediaElement.load();
        });
      }
    }
  }, [nodeMedia, nodeName]);

  return (
    <perspectiveCamera position-z={3}>
      <group position={[0.4, -0.3, 0]}>
        <pointLight intensity={1.2} color={0xffffff} position={[-2, 0, 0]} />
        <LeftSide />
        <group position={[0, 0.5, -3]}>
          <MediaLoadingBar />
          <NodeNameContainer />
        </group>
        <group scale={[0.06, 0.12, 0]} position={[0.8, 1.37, 0]}>
          <GreenTextRenderer />
        </group>
        <MediaYellowTextAnimator />

        <group visible={activeNodeMedia.includes("XA")}>
          <RightSide />
          <AudioVisualizer />
          <Images />
        </group>
      </group>
    </perspectiveCamera>
  );
};

export default MediaScene;
