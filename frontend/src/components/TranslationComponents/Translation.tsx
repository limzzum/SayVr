// Translation.tsx
import React, { useState, useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";
import getScript from "../../api/ShadowingPageAPI/GetScriptAPI";
import "./style.css";

const endpoint = "https://api.cognitive.microsofttranslator.com";
const location = "eastus";

interface TranslationProps {
  videoId: string;
  script: string;
}

const Translation: React.FC<TranslationProps> = ({ videoId }) => {
  const [textToTranslate, setTextToTranslate] = useState<string>("");
  const [translatedText, setTranslatedText] = useState<string | null>(null);

  useEffect(() => {
    console.log("번역기 페이지");
    console.log("Video ID:", videoId);
  }, [videoId]);

  const translate = async () => {
    const route = "/translate?api-version=3.0&from=en&to=ko";
    const body = [{ Text: textToTranslate }];
    const requestBody = JSON.stringify(body);

    try {
      // getScript 함수를 사용하여 스크립트 배열을 가져오기
      const script = await getScript(videoId);

      // script 배열을 사용하여 각 스크립트를 번역
      const translatedScripts = await Promise.all(
        script.map(async (scriptItem) => {
          const config: AxiosRequestConfig = {
            method: "post",
            url: `${endpoint}${route}`,
            data: JSON.stringify([{ Text: scriptItem.script }]),
            headers: {
              "Ocp-Apim-Subscription-Key": `${process.env.REACT_APP_AZURE_API_KEY}`,
              "Ocp-Apim-Subscription-Region": location,
              "Content-Type": "application/json",
            },
          };
          const translationResponse = await axios(config);
          return translationResponse.data[0].translations[0].text;
        })
      );

      // 번역된 스크립트를 화면에 표시
      setTranslatedText(translatedScripts.join("\n"));
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
        <div className="half-width-container">
          <div className="input-container">
            <textarea
              value={textToTranslate}
              onChange={(e) => setTextToTranslate(e.target.value)}
              placeholder="Enter text to translate"
              className="text-box form-control"
            />
          </div>
        </div>
        <div className="half-width-container">
          <div className="output-container">
            <div className="output-box">
              <p>{translatedText || "Translated text will appear here"}</p>
            </div>
          </div>
          <div className="button-container">
            <button className="btn" style={{ backgroundColor: "#1D5193", color: "white" }} onClick={translate}>
              번역
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Translation;
