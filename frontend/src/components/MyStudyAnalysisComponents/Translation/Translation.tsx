import React, { useState, useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { Modal, Button } from "react-bootstrap";
import API_URL from "../../../config";
import { tokenState } from "../../../recoil/GoalbalState";
import { useRecoilValue } from "recoil";
import "./style.css";

const endpoint = "https://api.cognitive.microsofttranslator.com";
const location = "eastus";

interface TranslationProps {
  // 필요한 프로퍼티 추가
}

const Translation: React.FC<TranslationProps> = () => {
  const [textToTranslate, setTextToTranslate] = useState<string>("");
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [flashcards, setFlashcards] = useState<Array<{ name: string }>>([]);
  const authToken = useRecoilValue(tokenState);

  useEffect(() => {
    setUserId(18);
  }, []);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const fetchFlashcards = async () => {
    if (!userId) {
      console.error("사용자 ID를 찾을 수 없습니다.");
      return;
    }

    const flashcardRoute = `/flashcards/list`;
    const flashcardConfig: AxiosRequestConfig = {
      method: "get",
      url: `${API_URL}${flashcardRoute}`,
      headers: {
        Authorization: authToken,
      },
      params: {
        userId: userId,
      },
    };

    try {
      const flashcardResponse = await axios(flashcardConfig);
      console.log("flashcardResponse", flashcardResponse);

      const flashcardsData = flashcardResponse.data?.data?.personalDeckList || [];

      setFlashcards(flashcardsData);

      setShowModal(true);
    } catch (error) {
      console.error("단어장을 가져오는 중 오류가 발생했습니다:", error);
    }
  };

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

      setShowModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="translation-container">
      <div className="half-width-container">
        <div className="input-container">
          <textarea
            value={textToTranslate}
            onChange={(e) => setTextToTranslate(e.target.value)}
            placeholder="번역할 텍스트를 입력하세요"
            className="text-box form-control"
          />
        </div>
      </div>
      <div className="half-width-container">
        <div className="output-container">
          <div className="output-box">
            <p>{translatedText || "번역된 텍스트가 여기에 나타납니다"}</p>
          </div>
        </div>
        <div className="button-container">
          <button className="btn btn-primary" onClick={translate}>
            번역
          </button>
          <button className="btn btn-primary" onClick={fetchFlashcards}>
            단어장 추가
          </button>
        </div>
      </div>

      {/* 모달 */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>단어장 목록</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>번역 결과:</strong> {translatedText || "없음"}
          </p>
          <p>
            <strong>단어장 목록:</strong>
          </p>
          <ul>
            {flashcards.map((flashcard, index) => (
              <li key={index}>{flashcard.name}</li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Translation;
