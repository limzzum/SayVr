import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import YouTube, { YouTubeProps } from "react-youtube";
import axios, { AxiosRequestConfig } from "axios";
import getScript, { ScriptItem } from "../../../api/ShadowingPageAPI/GetScriptAPI";
import "./style.css";

const endpoint = "https://api.cognitive.microsofttranslator.com";
const azureLocation = "eastus";

interface ExtendedYouTube extends YouTube {
  getCurrentTime(): number;
  getPlayerState(): number;
}

function ShadowingDetailPage() {
  const locationObj = useLocation();
  const videoId = locationObj.state?.videoId;
  const [script, setScript] = useState<ScriptItem[] | null>(null);
  const [displayedScript, setDisplayedScript] = useState<string>("");
  const [translatedText, setTranslatedText] = useState<string>("");
  const playerRef = useRef<ExtendedYouTube | null>(null);

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    event.target.pauseVideo();
    playerRef.current = event.target as ExtendedYouTube;
  };

  const onPlayerStateChange: YouTubeProps["onStateChange"] = (event) => {
    if (playerRef.current) {
      const player = playerRef.current;
  
      // 기존 인터벌 정리
      let intervalId: NodeJS.Timeout | null = null;
      if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
      }
  
      const updateScript = async () => {
        const currentTime = player.getCurrentTime();
        const playerState = player.getPlayerState();
        console.log("Player State:", playerState);
  
        if (currentTime !== undefined) {
          displayScript(currentTime);
        }
      };
  
      // 새로운 인터벌 시작
      intervalId = setInterval(updateScript, 2000);
  
      const clearUpdateInterval = () => {
        if (intervalId !== null) {
          clearInterval(intervalId);
          intervalId = null;
        }
      };
  
      if (
        player.getPlayerState() === window.YT.PlayerState.PAUSED ||
        player.getPlayerState() === window.YT.PlayerState.ENDED
      ) {
        clearUpdateInterval();
      }
    }
  };
  

  const displayScript = async (currentTime: number) => {
    const currentScript = script?.find(
      (item) => currentTime >= item.start && currentTime <= item.start + item.duration
    );

    if (currentScript && currentScript.text !== displayedScript) {
      console.log("currentScript.text 둘이 다르면 이걸로 갱신할거임", currentScript.text)
      setDisplayedScript(currentScript.text);
      console.log("displayedScript", displayedScript)

      // 번역 요청
      const translatedText = await translate(currentScript.text);

      // 번역 결과 표시
      setTranslatedText(translatedText);

      // 자동으로 번역하기 버튼 누르기
      translateButtonHandler(currentScript.text);
    } else {
      // setDisplayedScript("");
      return
    }
  };
  

  

  const translate = async (text: string) => {
    const route = "/translate?api-version=3.0&from=en&to=ko";

    const config: AxiosRequestConfig = {
      method: "post",
      url: `${endpoint}${route}`,
      data: JSON.stringify([{ Text: text }]),
      headers: {
        "Ocp-Apim-Subscription-Key": `${process.env.REACT_APP_AZURE_API_KEY}`,
        "Ocp-Apim-Subscription-Region": azureLocation,
        "Content-Type": "application/json",
      },
    };

    try {
      const translationResponse = await axios(config);
      const translatedText = translationResponse.data[0].translations[0].text;

      return translatedText;
    } catch (error) {
      console.error(error);
      return "";
    }
  };

  // 자동으로 번역하기 버튼을 누르는 함수
  const translateButtonHandler = async (text: string) => {
    // 여기에서 번역 함수 호출 또는 번역 기능 구현
    await translate(text);
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
      <div className="VOD">
        {videoId && (
          <YouTube
            videoId={videoId}
            opts={{ height: "390", width: "640", playerVars: { autoplay: 1 } }}
            onReady={onPlayerReady}
            onStateChange={onPlayerStateChange}
          />
        )}
      </div>
      {videoId && script && (
        <div>
          <div className="badge">
            <span className="rounded-pill">Script</span>
          </div>
          <div className="translation-container">
            <div className="output-box script-box">
              <p>{displayedScript}</p>
            </div>
            <div className="output-box translation-box">
              <p>{translatedText}</p>
            </div>
          </div>
          <div className="button-container">
            <button onClick={() => translateButtonHandler(displayedScript)}>번역하기</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShadowingDetailPage;
