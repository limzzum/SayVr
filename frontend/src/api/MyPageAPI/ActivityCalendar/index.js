import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../../config";
import { ActivityCalendar } from "activity-calendar-react";
import "./style.css";

function ActiveCalendarComponent() {
  const [activityData, setActivityData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/active`);
        console.log(response);
        setActivityData(response.data.data.activityDtoList);
        setIsLoading(false); // 데이터 로딩 완료
      } catch (error) {
        console.error("Error fetching activity data:", error);
        setIsLoading(false); // 에러 발생 시에도 로딩 완료 처리
      }
    };

    fetchActivityData();
  }, []);

  function getColorForActivity(activityCount) {
    console.log(`Activity Count: ${activityCount}`);
    if (activityCount === 0) {
      return "#dadada";
    } else if (activityCount === 1) {
      return "#0e4429";
    } else if (activityCount === 2) {
      return "#006d32";
    } else if (activityCount === 3) {
      return "#26a641";
    } else if (activityCount >= 4) {
      return "#39d353";
    }
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  // axios로 가져온 데이터를 sampleData와 같은 형식으로 변환
  const transformedData = activityData.map((item) => ({
    day: item.whenDate,
    activity: item.count,
  }));

  const colorCustomization = {
    activity0: '#dadada',
    activity1: '#0e4429',
    activity2: '#006d32',
    activity3: '#26a641',
    activity4: '#39d353',
  };

  return (
    <div className="calendar-container">
      <ActivityCalendar sampleData={transformedData} colorCustomization={colorCustomization} showMonth={true} />
    </div>
  );
}

export default ActiveCalendarComponent;