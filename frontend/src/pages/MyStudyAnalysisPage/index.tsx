import { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import GetConversationDates from "../../api/MyStudyAnalysisAPI/GetConversationDates";
import AverageScore from "../../assets/MygradeAssets/AverageScore.png";
import ContextScore from "../../assets/MygradeAssets/ContextScore.png";
import GrammarScore from "../../assets/MygradeAssets/GrammarScore.png";
import ProunciationScore from "../../assets/MygradeAssets/PronunciationScore.png";
import "./style.css";

type MyCalendarValue = Date | undefined;

function MyStudyAnalysisPage() {
  const [value, onChange] = useState<MyCalendarValue>(new Date());
  const [highlightedDates, setHighlightedDates] = useState<string[]>([]);

  const handleChange = (date: MyCalendarValue) => {
    onChange(date);
  };

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
        const response = await GetConversationDates();
        const conversationDates = response.data;
        console.log(conversationDates);
        setHighlightedDates(conversationDates);
      } catch (error) {
        console.error("Error fetching conversation dates:", error);
      }
    };

    fetchData();
  }, []);

  const addContent = ({ date }: any) => {
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    
    if (highlightedDates.includes(formattedDate)) {
      return (
        <div className="highlighted-day"></div>
      );
    }
  
    return null;
  };

  const tileClassName = ({ date }: any) => {
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    
    if (highlightedDates.includes(formattedDate)) {
      return 'highlighted-tile';
    }

    return null;
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
            tileContent={addContent}
            tileClassName={tileClassName}
          />
        </div>
        <div className="col-sm-6">
          <div className="row">
            <div className="col-8 col-sm-12 grade-container" style={{ marginBottom: "30px" }}>
              <h3>내 현재 등급</h3>
              <div className="row justify-content-center align-items-center">
                <img src={AverageScore} alt="badgeimg" className="scorebadge col" style={{ maxWidth: "120px" }} />
                <img src={ContextScore} alt="badgeimg" className="scorebadge col" style={{ maxWidth: "120px" }} />
                <img src={GrammarScore} alt="badgeimg" className="scorebadge col" style={{ maxWidth: "120px" }} />
                <img src={ProunciationScore} alt="badgeimg" className="scorebadge col" style={{ maxWidth: "120px" }} />
              </div>
            </div>
            <div className="col-4 col-sm-12 custom-chart-container" style={{ marginBottom: "20px" }}>
              <h3>학습별 평균 등급 변동치</h3>
              <ApexCharts options={chartOptions as any} series={chartOptions.series} type="line" height={250} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyStudyAnalysisPage;
