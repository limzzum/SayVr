// ShadowingDetailPage/index.tsx
import React from "react";
import { useLocation } from "react-router-dom";
import YouTube, { YouTubeProps } from "react-youtube";
import Translation from "../../../components/TranslationComponents/Translation";

function ShadowingDetailPage() {
  const location = useLocation();
  const videoId = location.state?.videoId;

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    event.target.pauseVideo();
  };

  const opts: YouTubeProps["opts"] = {
    height: "390",
    width: "640",
  };

  return (
    <div className="ShadowingDetailPage-container">
      <div className="VOD">{videoId && <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} />}</div>
      <div>
        <Translation />
      </div>
    </div>
  );
}

export default ShadowingDetailPage;
