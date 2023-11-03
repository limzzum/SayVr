import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import YouTube, { YouTubeProps } from "react-youtube";
import Translation from "../../../components/TranslationComponents/Translation";
import getScript from "../../../api/ShadowingPageAPI/GetScriptAPI";
import "./style.css";

function ShadowingDetailPage() {
  const location = useLocation();
  const videoId = location.state?.videoId;
  const [script, setScript] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
          setLoading(true);
          const script = await getScript(videoId);
          // setScript(script);
        }
      } catch (error) {
        console.error("Error fetching script:", error);
        setError("Failed to fetch script");
      } finally {
        setLoading(false);
      }
    };

    fetchScript();
  }, [videoId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="ShadowingDetailPage-container">
      <div className="VOD">{videoId && <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} />}</div>
      <div>
        {videoId && script && <Translation videoId={videoId} script={script} />} {/* videoId와 script 전달 */}
      </div>
    </div>
  );
}

export default ShadowingDetailPage;
