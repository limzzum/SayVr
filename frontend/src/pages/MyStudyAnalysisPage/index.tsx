import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import Calendar, { CalendarProps } from "react-calendar";
import { useNavigate } from "react-router-dom";
import "react-calendar/dist/Calendar.css";
import GetConversationDates from "../../api/MyStudyAnalysisAPI/GetConversationDates";
import AverageScore from "../../assets/MygradeAssets/AverageScore.png";
import ContextScore from "../../assets/MygradeAssets/ContextScore.png";
import GrammarScore from "../../assets/MygradeAssets/GrammarScore.png";
import ProunciationScore from "../../assets/MygradeAssets/PronunciationScore.png";
import GetMyAverageScore from "../../api/MyStudyAnalysisAPI/GetMyAverageScore";
import "./style.css";

type MyCalendarValue = Date | undefined;

const MyStudyAnalysisPage: React.FC = () => {
  const [value, onChange] = useState<MyCalendarValue>(new Date());
  const [highlightedDates, setHighlightedDates] = useState<string[]>([]);
  const [data, setData] = useState<any>(null);
  const navigate = useNavigate();

  const chartOptions = {
    series: [
      {
        name: "Desktops",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
      },
    ],
    chart: {
      height: 350,
      type: "line" as const,
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const averageScoreResponse = await GetMyAverageScore();
        const averageScoresData = averageScoreResponse.data;
        console.log("나의 점수", averageScoresData);

        if (averageScoresData && averageScoresData.averageScore) {
          setData(averageScoresData.averageScore);
        }

        // value에서 연도와 월을 추출
        console.log("value가 뭐야");
        console.log(value);
        
        if (value) {
          const year = value.getFullYear();
          const month = value.getMonth() + 1;
          console.log(year)
          console.log(month)
          
          // 대화 일자를 가져오는 비동기 작업
          const conversationDatesResponse = await GetConversationDates(month, year);
          const conversationDates = conversationDatesResponse.data;
          console.log(conversationDates);
          // 가져온 대화 일자를 상태로 업데이트
          setHighlightedDates(conversationDates);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // fetchData 함수를 호출하여 데이터를 가져온다.
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
                  {/* AverageScore */}
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

                  {/* ContextScore */}
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

                  {/* GrammarScore */}
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

                  {/* PronunciationScore */}
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

            <div className="col-12 custom-chart-container" style={{ marginBottom: "20px" }}>
              <h3>학습별 평균 등급 변동치</h3>
              <ApexCharts options={chartOptions as any} series={chartOptions.series} type="line" height={250} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyStudyAnalysisPage;
