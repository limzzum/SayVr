import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import YouTube, { YouTubeProps } from "react-youtube";
import axios, { AxiosRequestConfig } from "axios";
import getScript, { ScriptItem } from "../../../api/ShadowingPageAPI/GetScriptAPI";
import RecorderModule from "../../../api/ShadowingPageAPI/SpeechAPI";
import "./style.css";

const endpoint = "https://api.cognitive.microsofttranslator.com";
const azureLocation = "eastus";

interface ExtendedYouTube extends YouTube {
  getCurrentTime(): number;
  getPlayerState(): number;
  pauseVideo(): void;
}

function ShadowingDetailPage() {
  const locationObj = useLocation();
  const videoId = locationObj.state?.videoId;
  const [script, setScript] = useState<ScriptItem[] | null>(null);
  const [displayedScript, setDisplayedScript] = useState<string>("");
  const [translatedText, setTranslatedText] = useState<string>("");
  const playerRef = useRef<ExtendedYouTube | null>(null);
  const [prevDisplayedScript, setPrevDisplayedScript] = useState<string>("");
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const previousStartRef = useRef<number | null>(null);




  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  const onRecordingStart = () => {
    console.log("Recording started!");
  };

  const onRecordingStop = (blob: Blob) => {
    setAudioBlob(blob);
    console.log("Recording stopped!");
    // 여기에서 녹음 파일을 서버로 전송하거나 추가 작업 수행
  };

  // 일단은 영상을 멈추는 기능만 추가 되어 있음
  const onShadowingButtonClick = async () => {
    if (playerRef.current) {
      playerRef.current.pauseVideo();
    }
  };





  

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    event.target.pauseVideo();
    playerRef.current = event.target as ExtendedYouTube;
  };

  const onPlayerStateChange: YouTubeProps["onStateChange"] = (event) => {
    if (playerRef.current) {
      const player = playerRef.current;

      // 기존 인터벌 정리
      if (intervalId !== null) {
        clearInterval(intervalId);
        setIntervalId(null);
      }

      const updateScript = async () => {
        const currentTime = player.getCurrentTime();
        const playerState = player.getPlayerState();
        console.log("Player State:", playerState);

        if (playerState !== 2 || currentTime !== undefined) {
          // Player state가 2(재생 중)이 아닌 경우에만 실행
          displayScript(currentTime);
        }
      };

      // 새로운 인터벌 시작
      const newIntervalId = setInterval(updateScript, 1500) as unknown as number;
      setIntervalId(newIntervalId);

      const clearUpdateInterval = () => {
        if (intervalId !== null) {
          clearInterval(intervalId);
          setIntervalId(null);
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
    if (playerRef.current) {
      const player = playerRef.current;
      const currentScript = script?.find(
        (item) => currentTime >= item.start && currentTime <= item.start + item.duration
      );

      if (currentScript && currentScript.start !== previousStartRef.current) {
        console.log("현재 대본이 이전 대본과 다를 때 갱신합니다.", currentScript.text);
        previousStartRef.current = currentScript.start;

        setPrevDisplayedScript(currentScript.text);
        setDisplayedScript(currentScript.text);

        // 번역 요청
        const translatedText = await translate(currentScript.text);

        // 번역 결과 표시
        setTranslatedText(translatedText);

        // 자동으로 번역하기 버튼 누르기
        translateButtonHandler(currentScript.text);
      } else {
        // 대본이 변경되지 않았을 때 추가 작업이 필요하면 여기에 작성하세요.
        return;
      }
    }
  };

  //=================================================================================
  // 번역 요청 보내는 부분
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

  // 스크립트 가져오기
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
            <button className="marginLeftButton" onClick={onShadowingButtonClick}>
              쉐도잉
            </button>
          </div>
          <RecorderModule onRecordingStart={onRecordingStart} onRecordingStop={onRecordingStop} />
        </div>
      )}
    </div>
  );
}

export default ShadowingDetailPage;
