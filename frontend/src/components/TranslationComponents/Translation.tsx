// Translation.tsx
import React, { useState, useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";
import "./style.css";
import { ScriptItem } from "../../api/ShadowingPageAPI/GetScriptAPI";

const endpoint = "https://api.cognitive.microsofttranslator.com";
const location = "eastus";

interface TranslationProps {
  videoId: string;
  script: ScriptItem[];
}

const Translation: React.FC<TranslationProps> = ({ videoId, script }) => {
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
        "Ocp-Apim-Subscription-Key": `${process.env.REACT_APP_AZURE_API_KEY}`,
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
    } catch (error) {
      console.error(error);
    }
  };

  const handleTranslateAll = async () => {
    await Promise.all(script.map((_, index) => translate(index)));
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
      <div className="button-container">
        <button onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))} disabled={currentIndex === 0}>
          이전
        </button>
        <button
          onClick={() => {
            setCurrentIndex(Math.min(script.length - 1, currentIndex + 1));
            translate(currentIndex);
          }}
          disabled={currentIndex === script.length - 1}
        >
          다음
        </button>
        <button className="btn" style={{ backgroundColor: "#1D5193", color: "white" }} onClick={handleTranslateAll}>
          전체 번역
        </button>
      </div>
    </div>
  );
};

export default Translation;
