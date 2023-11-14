import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import GetConversation from "../../../api/MyStudyAnalysisAPI/GetConversation";
import Translation from "../../../components/MyStudyAnalysisComponents/Translation/Translation";
import "./style.css";
import { Carousel } from "react-bootstrap";

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
    review?: string;
  } | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async (clickedId: number) => {
      try {
        const conversationData = await GetConversation(clickedId);
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
        const conversationData = await GetConversation(clickedId);

        console.log("디테일 페이지로 넘겨 받은 데이터", conversationData);
        setConversationData(conversationData);
        console.log(conversationData.review);
        console.log(conversationData.data.review);
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
    return messageList.map((message, index) => (
      <div key={index}>
        <p>{message.grammar}</p>
        <p>{message.context}</p>
        <p>{message.pronunciation}</p>
        <p>{message.content}</p>
      </div>
    ));
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
                <h4 id={`list-item-${index + 1}`}>{index + 1}</h4>
                {formattedId && generateMessageContent(conversationData?.messageList || [])}
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-4 script-container-div">
          <div className="script-container">{conversationData?.review}</div>
        </div>
      </div>
      <div>
        <Translation />
      </div>
    </div>
  );
}

export default MyStudyAnalysisDetailPage;
