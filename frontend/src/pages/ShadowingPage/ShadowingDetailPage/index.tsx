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
  playVideo(): void;
}

function ShadowingDetailPage() {
  const locationObj = useLocation();
  const videoId = locationObj.state?.videoId;
  const [script, setScript] = useState<ScriptItem[] | null>(null);
  const [displayedScript, setDisplayedScript] = useState<string>("");
  const [translatedText, setTranslatedText] = useState<string>("");
  const [pronunciationResult, setPronunciationResult] = useState<any>(null);
  const playerRef = useRef<ExtendedYouTube | null>(null);
  const [prevDisplayedScript, setPrevDisplayedScript] = useState<string>("");
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const previousStartRef = useRef<number | null>(null);
  const [isShadowing, setIsShadowing] = useState(false);
  const [initialPlaybackTime, setInitialPlaybackTime] = useState<number | null>(null);

  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  const onRecordingStart = () => {
    console.log("Recording started!");
  };

  const onRecordingStop = (blob: Blob) => {
    setAudioBlob(blob);
    console.log("Recording stopped!");
  };

  const onPronunciationResult = async (result: any) => {
    console.log("Pronunciation Result:", result);
    setPronunciationResult(result);
  };

  const onShadowingButtonClick = async () => {
    if (playerRef.current) {
      playerRef.current.pauseVideo();
      setIsShadowing(true);
    }
  };

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    event.target.pauseVideo();
    playerRef.current = event.target as ExtendedYouTube;
  };

  const onPlayerStateChange: YouTubeProps["onStateChange"] = (event) => {
    if (playerRef.current) {
      const player = playerRef.current;

      if (intervalId !== null) {
        clearInterval(intervalId);
        setIntervalId(null);
      }

      const updateScript = async () => {
        const currentTime = player.getCurrentTime();
        const playerState = player.getPlayerState();

        if (playerState !== 2 || currentTime !== undefined) {
          displayScript(currentTime);
        }
      };

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
        console.log("재생이나 일시정지 상태입니다.");
      } else if (player.getPlayerState() === window.YT.PlayerState.PLAYING) {
        setIsShadowing(false);
        console.log("재생 중입니다.");
      }
    }
  };

  const playAgain = () => {
    if (playerRef.current) {
      const player = playerRef.current;
      player.playVideo();
      setIsShadowing(false);
    }
  };

  const displayScript = async (currentTime: number) => {
    if (playerRef.current) {
      const player = playerRef.current;
      const currentScript = script?.find(
        (item) => currentTime >= item.start && currentTime <= item.start + item.duration
      );

      if (currentScript && currentScript.start !== previousStartRef.current) {
        previousStartRef.current = currentScript.start;

        setPrevDisplayedScript(currentScript.text);
        setDisplayedScript(currentScript.text);
        const translatedText = await translate(currentScript.text);
        setTranslatedText(translatedText);

        translateButtonHandler(currentScript.text);
      } else {
        return;
      }
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

  const translateButtonHandler = async (text: string) => {
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
            {pronunciationResult && (
              <div className="output-score-box">
                <div>
                  <div className="ScoreBadge">
                    <span className="rounded-pill">🙋‍♂️ 발음 평가 내용</span>
                  </div>
                  <div className="output-box pronunciation-result-box">
                    <p>인식된 문장: {pronunciationResult.text}</p>
                    <p>✔️정확도 점수: {pronunciationResult.accuracyScore}점</p>
                    <p>✔️발음 점수: {pronunciationResult.pronunciationScore}점</p>
                    <p>✔️문장 점수: {pronunciationResult.completenessScore}점</p>
                    <p>✔️유창성 점수: {pronunciationResult.fluencyScore}점</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="button-container">
            <button style={{ display: "none" }} onClick={() => translateButtonHandler(displayedScript)}>
              번역하기
            </button>
            <button className="marginLeftButton" onClick={isShadowing ? playAgain : onShadowingButtonClick}>
              {isShadowing ? "영상 다시 재생" : "쉐도잉"}
            </button>
            {isShadowing && (
              <RecorderModule
                onRecordingStart={onRecordingStart}
                onRecordingStop={onRecordingStop}
                onPronunciationResult={onPronunciationResult}
                currentScriptText={displayedScript}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ShadowingDetailPage;
