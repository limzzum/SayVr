import { useState, useRef } from "react";
import "./proceeding_style.css";
import questionImage from "../../../assets/MatchingGamePageAssets/Group 1000004195.png";

const GameProceedingBody = () => {
  return (
    <div className="game-proceeding-body-container">
      <Question></Question>
      <Chat></Chat>
    </div>
  );
};

function Question() {
  return (
    <div className="question-container">
      <img src={questionImage}></img>
    </div>
  );
}

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
