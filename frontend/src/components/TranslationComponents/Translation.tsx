// Translation.tsx
import React, { useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import "./style.css";

const endpoint = "https://api.cognitive.microsofttranslator.com";
const location = "eastus";

interface TranslationProps {
  // 필요한 프롭스 추가
}

const Translation: React.FC<TranslationProps> = () => {
  const [textToTranslate, setTextToTranslate] = useState<string>("");
  const [translatedText, setTranslatedText] = useState<string | null>(null);

  const translate = async () => {
    const route = "/translate?api-version=3.0&from=en&to=ko";
    const body = [{ Text: textToTranslate }];
    const requestBody = JSON.stringify(body);

    const config: AxiosRequestConfig = {
      method: "post",
      url: `${endpoint}${route}`,
      data: requestBody,
      headers: {
        "Ocp-Apim-Subscription-Key": `${process.env.REACT_APP_AZURE_API_KEY}`,
        "Ocp-Apim-Subscription-Region": location,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios(config);
      const translatedText = response.data[0].translations[0].text;
      setTranslatedText(translatedText);
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
            <button className="btn" style={{ backgroundColor: '#1D5193', color: "white" }} onClick={translate}>
              번역
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Translation;
