import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import GetConversation from "../../../api/MyStudyAnalysisAPI/GetConversation";
import Translation from "../../../components/MyStudyAnalysisComponents/Translation/Translation";
import "./style.css";
import { tokenState } from "../../../recoil/GoalbalState";
import { useRecoilValue } from "recoil";
import GrammarScore from "../../../assets/MygradeAssets/GrammarScore.png";
import ContextScore from "../../../assets/MygradeAssets/ContextScore.png";

declare global {
  interface Window {
    handleItemClick?: (itemNumber: number) => void;
  }
}

function MyStudyAnalysisDetailPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const formattedDate = queryParams.get("date");
  const formattedId = queryParams.get("ids");
  const numberOfIds = formattedId ? formattedId.split(",").length : 0;
  const [selectedItem, setSelectedItem] = useState("Item 1");
  const [conversationId, setConversationId] = useState<string | null>(null);
  const token = useRecoilValue(tokenState);
  const [conversationData, setConversationData] = useState<{
    messageList: Array<{
      id: number;
      conversationId: number;
      role: string;
      content: string;
      grammar: number;
      context: number;
      pronunciation: number;
    }>;
    conversationContext: number;
    conversationGrammar: number;
    review?: string;
  } | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async (clickedId: number) => {
      try {
        const conversationData = await GetConversation(clickedId, token);
        console.log("넘겨 받아온 데이터", conversationData);
        setConversationData(conversationData);
        setLoading(false);
      } catch (error) {
        console.error("Error handling conversation:", error);
        setLoading(false);
      }
    };

    if (formattedId) {
      const idIndex = 0;
      const idsArray = formattedId.split(",");
      const clickedId = Number(idsArray[idIndex]);
      setConversationId(clickedId.toString());
      fetchData(clickedId);
    }
  }, [formattedId]);

  const handleItemClick = async (itemNumber: number) => {
    if (formattedId) {
      const idIndex = itemNumber - 1;
      const idsArray = formattedId.split(",");
      const clickedId = Number(idsArray[idIndex]);
      setConversationId(clickedId.toString());
      setLoading(true);

      try {
        const conversationData = await GetConversation(clickedId, token);

        console.log("디테일 페이지로 넘겨 받은 데이터", conversationData);
        setConversationData(conversationData);
        console.log(".review", conversationData.review);
        console.log(".data.review", conversationData.data.review);
      } catch (error) {
        console.error("Error handling conversation:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    window.handleItemClick = handleItemClick;
    return () => {
      delete window.handleItemClick;
    };
  }, [formattedId]);

  const generateATags = () => {
    const aTags = [];
    for (let i = 1; i <= numberOfIds; i++) {
      aTags.push(
        <a
          key={i}
          className={`list-group-item list-group-item-action ${selectedItem === `Item ${i}` && "active"}`}
          onClick={() => {
            setSelectedItem(`Item ${i}`);
            if (window.handleItemClick) {
              window.handleItemClick(i);
            }
          }}
        >
          {i}
        </a>
      );
    }
    return aTags;
  };

  const generateMessageContent = (
    messageList: Array<{
      id: number;
      conversationId: number;
      role: string;
      content: string;
      grammar: number;
      context: number;
      pronunciation: number;
    }>
  ) => {
    console.log("Message List:", messageList);
    if (loading) {
      return <div>Loading...</div>;
    }
    if (messageList.length === 0) {
      return <div>No messages found.</div>;
    }

    return (
      <div className="message-container">
        <h2>Script</h2>
        {messageList
          .filter((message) => message.role !== "system")
          .map((message, index) => (
            <div
              key={index}
              className={`message-bubble ${message.role === "user" ? "user-message" : "other-message"}`}
              style={{ alignSelf: message.role === "user" ? "flex-end" : "flex-start" }}
            >
              <div className="message-content">
                <p>{message.content}</p>
              </div>
            </div>
          ))}
      </div>
    );
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8">
          <div id="list-example" className="list-group">
            <div className="d-flex">{generateATags()}</div>
          </div>
          <div
            data-bs-spy="scroll"
            data-bs-target="#list-example"
            data-bs-offset="0"
            className="scrollspy-example"
            tabIndex={0}
          >
            {Array.from({ length: numberOfIds }, (_, index) => (
              <div key={index} style={{ display: selectedItem === `Item ${index + 1}` ? "block" : "none" }}>
                {formattedId && generateMessageContent(conversationData?.messageList || [])}
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-4 script-container-div">
          <div className="script-container">
            <div className="row position-relative">
              <div className="row  position-relative">
              <div className="col-6">
                <h1>Review</h1>
              </div>
                <div className="col-auto end" style={{ backgroundColor: "transparent", position: "relative" }}>
                  <span
                    style={{
                      color: "black",
                      position: "absolute",
                      top: "58%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      fontSize: "15px",
                    }}
                  >
                    {conversationData?.conversationGrammar}
                  </span>
                  <img src={GrammarScore} alt="GrammarScoreBadge" style={{ maxWidth: "100px", zIndex: 1 }} />
                </div>
                <div className="col-auto end" style={{ backgroundColor: "transparent", position: "relative" }}>
                  <span
                    style={{
                      color: "black",
                      position: "absolute",
                      top: "58%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      fontSize: "15px",
                    }}
                  >
                    {conversationData?.conversationContext}
                  </span>
                  <img src={ContextScore} alt="ContextScoreBadge" style={{ maxWidth: "100px", zIndex: 1 }} />
                </div>
              </div>
            </div>
            <br />
            <div className="review-container">{conversationData?.review}</div>
          </div>
        </div>
      </div>
      <div>
        <Translation />
      </div>
    </div>
  );
}

export default MyStudyAnalysisDetailPage;
