import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import YouTube, { YouTubeProps } from "react-youtube";
import axios, { AxiosRequestConfig } from "axios";
import getScript, { ScriptItem } from "../../../api/ShadowingPageAPI/GetScriptAPI";
import evaluatePronunciation from "../../../api/ShadowingPageAPI/EvaluatePronunciation"; // 추가된 부분
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
  const [currentIndex, setCurrentIndex] = useState(0);

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    event.target.pauseVideo();
    playerRef.current = event.target as ExtendedYouTube;
  };

  const onPlayerStateChange: YouTubeProps["onStateChange"] = (event) => {
    if (playerRef.current) {
      const player = playerRef.current;

      const updateScript = async () => {
        const currentTime = player.getCurrentTime();
        if (currentTime !== undefined) {
          displayScript(currentTime);
        }
      };

      const intervalId = setInterval(updateScript, 1000);

      const clearUpdateInterval = () => clearInterval(intervalId);
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

    if (currentScript) {
      setDisplayedScript(currentScript.text);

      // 새로운 문장이고 번역된 문장과 다를 경우에만 번역 요청
      if (currentScript.text !== displayedScript) {
        // 번역 요청
        const translatedText = await translate(currentScript.text);

        // 번역 결과 표시
        setTranslatedText(translatedText);

        // 자동으로 번역하기 버튼 누르기
        translateButtonHandler(currentScript.text);
      }
    } else {
      setDisplayedScript("");
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

  // 발음 평가 함수 추가
  const evaluatePronunciationHandler = async () => {
    // 예제 오디오 데이터 (실제 데이터로 교체 필요)
    const audioBase64 = 'BASE64_ENCODED_AUDIO_DATA';
    
    // 발음 평가 호출
    const evaluationResult = await evaluatePronunciation(audioBase64);
    
    if (evaluationResult) {
      console.log('Pronunciation evaluation result:', evaluationResult);
      // 여기에 발음 평가 결과를 활용하는 로직 추가
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
            
            {/* 발음 평가 버튼 */}
            <button onClick={evaluatePronunciationHandler}>발음 평가</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShadowingDetailPage;
