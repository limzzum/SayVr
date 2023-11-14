import { useState, useRef, useEffect } from "react";
import "./proceeding_style.css";
import questionImage from "../../../assets/MatchingGamePageAssets/Group 1000004195.png";
import { sendMsg } from "../../../pages/MatchingGamePage/constants/socket";
import { publishURL } from "../../../pages/MatchingGamePage/constants/constants";
import Modal from "react-modal";

import "./Chat.css";
import { Form, InputGroup } from "react-bootstrap";

import { MouseEventHandler } from 'react';
import SpeechRecognition, { useSpeechRecognition, ListeningOptions } from 'react-speech-recognition';

interface props {
  // player: PlayerProfile;
  // opponent: PlayerProfile;
  gameId: number;
  chatMessage: ChatMessage;
  question: string;
}

interface PlayerProfile {
  userId?: number;
  nickname: string;
  ranking: number;
  tierImage: string;
  point?: number;
  winCnt?: number;
  profile: string;
}

const GameProceedingBody: React.FC<props> = ({
  gameId,
  chatMessage,
  question,
}) => {
  return (
    <div className="game-proceeding-body-container">
      <div>
        <Question question={question}></Question>
        <GameTimer timeLimit={30} gameId={gameId}></GameTimer>
      </div>
<div>
      <TextChatting gameId={gameId} chatMessage={chatMessage}></TextChatting>
<Dictaphone/>
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

function Chat() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const messageRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() !== "") {
      setMessages([...messages, input]);
      setInput("");
      if (messageRef.current) {
        messageRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className="message">
            {message}
          </div>
        ))}
        <div ref={messageRef}></div>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

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
                  <div>{message.userId === localStorage.getItem("userId") ? "나" : "상대방"}</div>
                  <div>{message.message}</div>
                </div>
              ))}
            </div>
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

const GameTimer: React.FC<{ timeLimit: number; gameId: number }> = ({
  timeLimit,
  gameId,
}) => {
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft((prevTime) => prevTime - 1);
      } else {
        clearInterval(timer);
        setIsModalOpen(true);

        setTimeout(() => {
                    setTimeLeft(timeLimit);
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
        style={{ width: `${(timeLeft / timeLimit) * 100}%` }}
      ></div>
      <div className="time-left">{timeLeft} seconds left</div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Example Modal"
className="Modal"
      >
        <div>시간이 종료되었습니다.</div>
        <div>잠시 후 다음 라운드가 시작됩니다..</div>
      </Modal>
    </div>
  );
};



const Dictaphone = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleStartListening: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    SpeechRecognition.startListening({language : 'en'});
  };

  const handleStopListening: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    SpeechRecognition.stopListening();
  };

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={handleStartListening}>Start</button>
      <button onClick={handleStopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
    </div>
  );
};

