// ShadowingDetailPage/index.tsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import YouTube, { YouTubeProps } from "react-youtube";
import Translation from "../../../components/TranslationComponents/Translation";
import getScript, { ScriptItem } from "../../../api/ShadowingPageAPI/GetScriptAPI";
import "./style.css";

function ShadowingDetailPage() {
  const location = useLocation();
  const videoId = location.state?.videoId;
  const [script, setScript] = useState<ScriptItem[] | null>(null);

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    event.target.pauseVideo();
  };

  const opts: YouTubeProps["opts"] = {
    height: "390",
    width: "640",
  };

  useEffect(() => {
    const fetchScript = async () => {
      try {
        if (videoId) {
          const script = await getScript(videoId);
          setScript(script);
        }
      } catch (error) {
        console.error("Error fetching script:", error);
      }
    };

    fetchScript();
  }, [videoId]);

  if (!script) {
    return <p>Loading...</p>;
  }

  return (
    <div className="ShadowingDetailPage-container">
      <div className="VOD">{videoId && <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} />}</div>
      <div>
        {videoId && script && <Translation videoId={videoId} script={script} />}
      </div>
    </div>
  );
}

export default ShadowingDetailPage;
