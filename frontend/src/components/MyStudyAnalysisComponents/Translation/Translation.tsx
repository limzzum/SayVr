import React, { useState, useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { Modal, Button } from "react-bootstrap";
import API_URL from "../../../config";
import { tokenState } from "../../../recoil/GoalbalState";
import { useRecoilValue } from "recoil";
import "./style.css";

const endpoint = "https://api.cognitive.microsofttranslator.com";
const location = "eastus";

interface TranslationProps {}

const Translation: React.FC<TranslationProps> = () => {
  const [textToTranslate, setTextToTranslate] = useState<string>("");
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [flashcards, setFlashcards] = useState<Array<{ name: string; id: number; kor: string; eng: string }>>([]);
  const authToken = useRecoilValue(tokenState);

  useEffect(() => {
    setUserId(14);
  }, []);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const fetchFlashcards = async () => {
    const flashcardRoute = "/flashcards/personal";
    const flashcardConfig: AxiosRequestConfig = {
      method: "get",
      url: `${API_URL}${flashcardRoute}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    try {
      console.log("유저 아이디", userId);
      const flashcardResponse = await axios(flashcardConfig);
      console.log("요청응답", flashcardResponse);

      const flashcardsData = flashcardResponse.data?.data?.personalDeckList || [];
      console.log(flashcardsData);

      const updatedFlashcards = flashcardsData.map((deck: { [key: string]: any }) => ({
        ...deck,
        id: deck.id || 0,
      }));

      setFlashcards(updatedFlashcards);
      console.log("저장된 플레시 카드", updatedFlashcards);

      if (translatedText && translatedText !== "없음") {
        setShowModal(true);
      } else {
        alert("추가할 단어가 없습니다");
      }
    } catch (error) {
      console.error("단어장을 가져오는 중 오류가 발생했습니다:", error);
    }
  };

  const handleCardClick = async (Id: number, kor: string, eng: string) => {
    console.log("여기는 덱 아이디", Id);

    try {
      const cardDetailRoute = `/flashcards/card/${Id}`;
      const cardDetailConfig: AxiosRequestConfig = {
        method: "post",
        url: `${API_URL}${cardDetailRoute}`,
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json",
        },
        data: {
          kor: translatedText,
          eng: textToTranslate,
        },
      };
    
      const cardDetailResponse = await axios(cardDetailConfig);
      const cardDetailData = cardDetailResponse.data?.data;
      console.log("카드 응답 데이터:", cardDetailData);
    
      if (cardDetailData) {
        setTextToTranslate(cardDetailData.eng);
        setTranslatedText(cardDetailData.kor);
      } else {
        setTextToTranslate(eng);
        setTranslatedText(kor);
      }
    
      setShowModal(true);
      
      if (cardDetailData.errorMessage === null) {
        alert("단어장에 추가되었습니다.");
      } else if (cardDetailData.errorMessage === "이미 단어장에 존재하는 단어입니다") {
        alert("이미 단어장에 존재하는 단어입니다")
      } 
    } catch (error) {
      console.error("카드 정보를 가져오는 중 오류가 발생했습니다:", error);
    }
    setShowModal(true);
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
          <button className="translate-btn btn-primary" onClick={translate}>
            번역
          </button>
          <button className="translate-btn btn-primary" onClick={fetchFlashcards}>
            단어장 추가
          </button>
        </div>
      </div>
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>단어장 목록</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>단어:</strong> {textToTranslate || "없음"}
            <br />
            <strong>번역 결과:</strong> {translatedText || "없음"}
          </p>
          <p>
            <strong>단어장 목록:</strong>
          </p>
          <ul>
            {flashcards.map((flashcard, index) => (
              <li key={index}>
                <span
                  onClick={() => handleCardClick(flashcard.id, flashcard.kor, flashcard.eng)}
                  className="clickable-item"
                >
                  {flashcard.name}
                </span>
              </li>
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
