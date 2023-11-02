// Translation.tsx
import React, { useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

const endpoint = 'https://api.cognitive.microsofttranslator.com';
const location = 'eastus';

interface TranslationProps {
  // 필요한 프롭스 추가
}

const Translation: React.FC<TranslationProps> = () => {
  const [textToTranslate, setTextToTranslate] = useState<string>("");
  const [translatedText, setTranslatedText] = useState<string | null>(null);

  const translate = async () => {
    const route = '/translate?api-version=3.0&from=en&to=ko';
    const body = [{ Text: textToTranslate }];
    const requestBody = JSON.stringify(body);

    const config: AxiosRequestConfig = {
      method: 'post',
      url: `${endpoint}${route}`,
      data: requestBody,
      headers: {
        'Ocp-Apim-Subscription-Key': `${process.env.REACT_APP_AZURE_API_KEY}`,
        'Ocp-Apim-Subscription-Region': location,
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios(config);
      const translatedText = response.data[0].translations[0].text;
      setTranslatedText(translatedText);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <div>
        <input
          type="text"
          value={textToTranslate}
          onChange={(e) => setTextToTranslate(e.target.value)}
          placeholder="Enter text to translate"
        />
      </div>
      <button onClick={translate}>Translate</button>
      {translatedText && (
        <div>
          <h3>Translated Text:</h3>
          <p>{translatedText}</p>
        </div>
      )}
    </div>
  );
};

export default Translation;
