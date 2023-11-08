// MyStudyAnalysisPage.tsx
import React, { useEffect, useState } from "react";
import Calendar, { CalendarProps } from "react-calendar";
import { useNavigate } from "react-router-dom";
import "react-calendar/dist/Calendar.css";
import GetConversationDates from "../../api/MyStudyAnalysisAPI/GetConversationDates";
import GetMyAverageScore from "../../api/MyStudyAnalysisAPI/GetMyAverageScore";
import ChartComponent, { ChartData } from "../../components/MyStudyAnalysisComponents";
import AverageScore from "../../assets/MygradeAssets/AverageScore.png";
import ContextScore from "../../assets/MygradeAssets/ContextScore.png";
import GrammarScore from "../../assets/MygradeAssets/GrammarScore.png";
import ProunciationScore from "../../assets/MygradeAssets/PronunciationScore.png";
import "./style.css";

type MyCalendarValue = Date | undefined;

const MyStudyAnalysisPage: React.FC = () => {
  const [value, onChange] = useState<MyCalendarValue>(new Date());
  const [highlightedDates, setHighlightedDates] = useState<string[]>([]);
  const [graphData, setGraphData] = useState<ChartData | null>(null);
  const [data, setData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const averageScoreResponse = await GetMyAverageScore();
        const averageScoresData = averageScoreResponse.data;
        if (averageScoresData && averageScoresData.averageScore) {
          setData(averageScoresData.averageScore);
  
          // Modify the structure to match ChartData
          const graphData = {
            averageTotal: averageScoresData.averageScore.averageTotal,
            contextTotal: averageScoresData.averageScore.contextTotal,
            grammarTotal: averageScoresData.averageScore.grammarTotal,
            pronunciationTotal: averageScoresData.averageScore.pronunciationTotal,
            createdAt: averageScoresData.averageScore.createdAt,
            scoreHistory: averageScoresData.scoreHistory,
          };
  
          setGraphData(graphData);
        }

        if (value) {
          const year = value.getFullYear();
          const month = value.getMonth() + 1;

          const conversationDatesResponse = await GetConversationDates(month, year);
          const conversationDates = conversationDatesResponse.data;
          setHighlightedDates(conversationDates);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [value]);

  const handleDateClick = (date: Date) => {
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
      date.getDate()
    ).padStart(2, "0")}`;

    const isHighlightedDate = highlightedDates.includes(formattedDate);
    if (isHighlightedDate) {
      console.log("이동 버튼 눌림");
      navigate(`/MyStudyAnalysis/Detail?date=${formattedDate}`);
    }
  };

  const handleChange = (date: MyCalendarValue) => {
    onChange(date);
  };

  const handleActiveStartDateChange = (activeStartDate: Date | null) => {
    if (activeStartDate) {
      onChange(activeStartDate);
    }
  };

  return (
    <div className="study-analysis-container">
      <div className="row">
        <div className="col-sm-5 cal-container" style={{ marginRight: "30px" }}>
          <h3>학습 달력📆</h3>
          <Calendar
            onChange={handleChange as CalendarProps["onChange"]}
            value={value}
            className="calendar"
            tileContent={({ date }) => {
              const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
                date.getDate()
              ).padStart(2, "0")}`;

              if (highlightedDates.includes(formattedDate)) {
                return <div className="highlighted-day" onClick={() => handleDateClick(date)}></div>;
              }

              return null;
            }}
            tileClassName={({ date }) => {
              const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
                date.getDate()
              ).padStart(2, "0")}`;

              return highlightedDates.includes(formattedDate) ? "highlighted-tile" : null;
            }}
            onClickDay={(value, event) => handleDateClick(value)}
            onActiveStartDateChange={({ activeStartDate }) => handleActiveStartDateChange(activeStartDate)}
          />
        </div>
        <div className="col-sm-6">
          <div className="row align-items-center">
            {data && (
              <div className="col-12 grade-container" style={{ marginBottom: "30px" }}>
                <h3>내 현재 등급</h3>
                <div className="d-flex justify-content-around">
                  <div className="text-center position-relative">
                    <span
                      className="score-text"
                      style={{
                        color: "black",
                        position: "absolute",
                        zIndex: 2,
                        top: "55%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      {data.averageTotal}
                    </span>
                    <img
                      src={AverageScore}
                      alt="badgeimg"
                      className="scorebadge"
                      style={{ maxWidth: "120px", zIndex: 1 }}
                    />
                  </div>
                  <div className="text-center position-relative">
                    <span
                      className="score-text"
                      style={{
                        color: "black",
                        position: "absolute",
                        zIndex: 2,
                        top: "55%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      {data.contextTotal}
                    </span>
                    <img
                      src={ContextScore}
                      alt="badgeimg"
                      className="scorebadge"
                      style={{ maxWidth: "120px", zIndex: 1 }}
                    />
                  </div>
                  <div className="text-center position-relative">
                    <span
                      className="score-text"
                      style={{
                        color: "black",
                        position: "absolute",
                        zIndex: 2,
                        top: "55%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      {data?.grammarTotal}
                    </span>
                    <img
                      src={GrammarScore}
                      alt="badgeimg"
                      className="scorebadge"
                      style={{ maxWidth: "120px", zIndex: 1 }}
                    />
                  </div>
                  <div className="text-center position-relative">
                    <span
                      className="score-text"
                      style={{
                        color: "black",
                        position: "absolute",
                        zIndex: 2,
                        top: "55%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      {data.pronunciationTotal}
                    </span>
                    <img
                      src={ProunciationScore}
                      alt="badgeimg"
                      className="scorebadge"
                      style={{ maxWidth: "120px", zIndex: 1 }}
                    />
                  </div>
                </div>
              </div>
            )}
            <ChartComponent data={graphData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyStudyAnalysisPage;
