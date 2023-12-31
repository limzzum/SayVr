import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../../config";
import { tokenState } from "../../../recoil/GoalbalState";
import { useRecoilValue } from "recoil";
import { ActivityCalendar } from "activity-calendar-react";
import "./style.css";

function ActiveCalendarComponent() {
  const [activityData, setActivityData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = useRecoilValue(tokenState);

  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        console.log("요청은 가나");

        const response = await axios.get(`${API_URL}/user/active`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("요청은 가나");
        console.log("엑티브 캘린더", response);
        setActivityData(response.data.data.activityDtoList);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching activity data:", error);
        setIsLoading(false);
      }
    };

    fetchActivityData();
  }, [token]);

  function getColorForActivity(activityCount) {
    console.log(`Activity Count: ${activityCount}`);
    if (activityCount === 0) {
      return "#dadada";
    } else if (activityCount === 1) {
      return "#3A0CA3";
    } else if (activityCount === 2) {
      return "#414CDC";
    } else if (activityCount === 3) {
      return "#467BEF";
    } else if (activityCount >= 4) {
      return "#76B0F2";
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
    activity0: "#dadada",
    activity4: "#3A0CA3",
    activity3: "#414CDC",
    activity2: "#467BEF",
    activity1: "#76B0F2",
  };

  return (
    <div className="calendar-container">
      <div style={{ width: "90%", marginLeft: "auto", marginRight: "auto" }}>
        <ActivityCalendar sampleData={transformedData} colorCustomization={colorCustomization} showMonth={true} />
      </div>
    </div>
  );
}

export default ActiveCalendarComponent;
