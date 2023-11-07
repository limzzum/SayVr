import React, { useState, useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";
import "./style.css";
import { ScriptItem } from "../../api/ShadowingPageAPI/GetScriptAPI";

const endpoint = "https://api.cognitive.microsofttranslator.com";
const location = "eastus";

interface ExtendedYouTube {
  getCurrentTime(): number;
  getPlayerState(): number;
}

interface TranslationProps {
  videoId: string;
  script: ScriptItem[];
  displayScript: (currentTime: number) => void;
  playerRef: React.RefObject<ExtendedYouTube | null>;
}

const Translation: React.FC<TranslationProps> = ({ videoId, script, displayScript, playerRef }) => {
  const [translatedTexts, setTranslatedTexts] = useState<string[]>(Array(script.length).fill(""));
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    console.log("번역기 페이지");
    console.log("Video ID:", videoId);
  }, [videoId]);

  const translate = async (index: number) => {
    const route = "/translate?api-version=3.0&from=en&to=ko";

    const config: AxiosRequestConfig = {
      method: "post",
      url: `${endpoint}${route}`,
      data: JSON.stringify([{ Text: script[index].text }]),
      headers: {
        "Ocp-Apim-Subscription-Key": `${process.env.REACT_APP_AZURE_Translation_API_KEY}`,
        "Ocp-Apim-Subscription-Region": location,
        "Content-Type": "application/json",
      },
    };

    try {
      const translationResponse = await axios(config);
      const translatedText = translationResponse.data[0].translations[0].text;

      setTranslatedTexts((prevTexts) => {
        const newTexts = [...prevTexts];
        newTexts[index] = translatedText;
        return newTexts;
      });

      const player = playerRef.current;
      if (player) {
        const currentTime = player.getCurrentTime();
        displayScript(currentTime);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="badge">
        <span className="rounded-pill">Script</span>
      </div>
      <div className="translation-container">
        <div className="carousel-container">
          <div className="carousel">
            {script.map((_, index) => (
              <div key={index} className={`carousel-item ${index === currentIndex ? "active" : ""}`}>
                <p>{script[index].text}</p>
                <button onClick={() => translate(index)}>번역하기</button>
              </div>
            ))}
          </div>
        </div>
        <div className="output-container">
          <div className="output-box">
            <p>{translatedTexts[currentIndex] || "Translated text will appear here"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Translation;