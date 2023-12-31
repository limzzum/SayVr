import { useState, useRef, useEffect } from "react";
import "./proceeding_style.css";
import questionImage from "../../../assets/MatchingGamePageAssets/Group 1000004195.png";
import { sendMsg } from "../../../pages/MatchingGamePage/constants/socket";
import { publishURL } from "../../../pages/MatchingGamePage/constants/constants";
import Modal from "react-modal";

import "./Chat.css";
import { Form, InputGroup } from "react-bootstrap";

import { MouseEventHandler } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
  ListeningOptions,
} from "react-speech-recognition";
import { SocketType } from "../../../api/MatchingGameAPI/MatchingGameAPI";
import speakImg from "../../../assets/MatchingGamePageAssets/speak.png";

interface props {
  gameId: number;
  chatMessage: ChatMessage;
  question: string;
  curRound: number;
  answer: string;
}

const GameProceedingBody: React.FC<props> = ({
  gameId,
  chatMessage,
  question,
  curRound,
  answer,
}) => {
  return (
    <div className="game-proceeding-body-container">
      <div>
        <div
          style={{ padding: "0", margin: "0", height: "1px", fontSize: "30px" }}
        >
          Round {curRound}
        </div>
        <Question question={question}></Question>
        <GameTimer
          curRound={curRound}
          gameId={gameId}
          answer={answer}
        ></GameTimer>
      </div>
      <div>
        <TextChatting gameId={gameId} chatMessage={chatMessage}></TextChatting>
      </div>
    </div>
  );
};

interface QuestionProps {
  question: string;
}

const Question: React.FC<QuestionProps> = ({ question }) => {
  return (
    <div className="question-container">
      <img className="question-image" src={questionImage}></img>
      <div className="question">{question}</div>
    </div>
  );
};

export default GameProceedingBody;

interface Player {
  playerId: string;
  nickname: string;
}

interface ChatMessage {
  message: string;
  userId: string;
}

interface TextChattingProps {
  gameId: number;
  chatMessage: ChatMessage;
}

const TextChatting: React.FC<TextChattingProps> = ({ gameId, chatMessage }) => {
  const [inputText, setInputText] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const chatAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [chatMessages]);

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }

    if (chatMessage) {
      setChatMessages((prevMessages) => [
        ...prevMessages,
        {
          message: chatMessage.message,
          userId: chatMessage.userId,
        },
      ]);
    } else {
      // setChatMessages((prevMessages) => [
      //   ...prevMessages,
      //   { sender: "notification", text: chatContent.content },
      // ]);
    }
  }, [chatMessage]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleSendMessage = () => {
    console.log("handle " + inputText);
    if (inputText.trim() !== "") {
      onSendMessage();
      setInputText("");
    }
  };

  const onSendMessage = () => {
    console.log("text : " + inputText);
    const body = { socketType: "QUIZ", message: inputText };
    sendMsg(publishURL + "." + gameId, body);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      handleSendMessage();
      event.preventDefault();
    }
  };

  return (
    <>
      <div>
        <div className="chatWrapper">
          <div className="chatArea">
            <div className="chatMessages" ref={chatAreaRef}>
              {chatMessages.map((message, index) => (
                <div
                  key={index}
                  className={`${
                    message.userId === localStorage.getItem("userId")
                      ? "messageContainer userMessage"
                      : "messageContainer otherMessage"
                  }`}
                >
                  {message.message != "" && (
                    <div>
                      {message.userId === localStorage.getItem("userId")
                        ? "나"
                        : "상대방"}
                    </div>
                  )}
                  <div>{message.message}</div>
                </div>
              ))}
            </div>
            <Dictaphone gameId={gameId}></Dictaphone>
          </div>
          <div className="chatInput">
            <InputGroup style={{ flexGrow: 1 }}>
              <Form.Control
                placeholder="메시지를 입력하세요"
                value={inputText}
                onChange={handleInputChange}
                className={"inputChat"}
                onKeyPress={handleKeyPress}
                style={{
                  borderColor: "var(--blue-500)",
                  borderTopLeftRadius: "0px",
                  borderTopRightRadius: "0px",
                  fontSize: "16px",
                }}
              />
            </InputGroup>

            <button className={"input"} onClick={handleSendMessage}>
              전송
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const GameTimer: React.FC<{
  curRound: number;
  gameId: number;
  answer: string;
}> = ({ curRound, gameId, answer }) => {
  const [timeLeft, setTimeLeft] = useState(30);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setTimeLeft(30);
  }, [curRound]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft((prevTime) => prevTime - 1);
      } else {
        clearInterval(timer);
        setIsModalOpen(true);

        setTimeout(() => {
          const body = { socketType: SocketType.QUIZ_TIME_OVER, message: "" };
          sendMsg(publishURL + "." + gameId, body);
          setIsModalOpen(false);
        }, 3000);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [timeLeft]);

  return (
    <div className="game-timer">
      <div
        className="time-left-bar"
        style={{ width: `${(timeLeft / 30) * 100}%` }}
      ></div>
      <div className="time-left">{timeLeft} seconds left</div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => {}}
        contentLabel="Example Modal"
        className="game_answer_modal"
      >
        <div style={{ fontSize: "xxx-large" }}>Time Over!</div>
        <div>시간이 종료되었습니다.</div>
        <div style={{ height: "20px" }}></div>
        <div> 정답 : {answer} </div>

        <div>잠시 후 다음 라운드가 시작됩니다..</div>
      </Modal>
    </div>
  );
};

const Dictaphone: React.FC<{ gameId: number }> = ({ gameId }) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript != "") {
      const body = { socketType: "QUIZ", message: transcript };
      sendMsg(publishURL + "." + gameId, body);
      resetTranscript();
    }
  }, [listening]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleStartListening: MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    event.preventDefault();
    listening
      ? SpeechRecognition.stopListening()
      : SpeechRecognition.startListening({ language: "en" });
  };

  return (
    <div className="listen-icon">
      <button
        style={{ backgroundColor: "transparent" }}
        onClick={handleStartListening}
      >
        <img width="60px" height="50px" src={speakImg}></img>
      </button>
      <p>{listening ? "음성 듣는 중.." : "클릭하여 음성 말하기"}</p>
      {/* <div>{finalTranscript}</div> */}
    </div>
  );
};
