import React from "react";
import { useLocation } from "react-router-dom";
import YouTube, { YouTubeProps } from "react-youtube";

function ShadowingDetailPage() {
  const location = useLocation();
  const videoId = location.state?.videoId;
  // const videoId = "KwDJnXt3ZVQ"

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    event.target.pauseVideo();
  };
  console.log("여기");
  console.log(videoId);
  const opts: YouTubeProps["opts"] = {
    height: "390",
    width: "640",
    // playerVars: {
    //   autoplay: 1,
    // },
  };

  return <div>{videoId && <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} />}</div>;
}

export default ShadowingDetailPage;
