import React, { useEffect } from "react";
import axios from "axios";

interface DatedConversation {
  date: string;
  id: number;
}

interface MonthlyConversationResponse {
  message: string;
  data: {
    datedConversationList: DatedConversation[];
  };
  httpStatus: string;
}

const GetConversation: React.FC = () => {
  useEffect(() => {
    const fetchMonthlyConversation = async () => {
      try {
        const url = "https://말해vr.site/conversation/monthly";

        const requestBody = {
          year: 2023,
          month: "01",
        };

        const response = await axios.post<MonthlyConversationResponse>(url, requestBody);

        console.log("무슨 데이터냐");
        console.log("Response:", response.data);

        // 여기서 response.data를 활용하여 원하는 기능을 추가하면 됩니다.
      } catch (error) {
        console.error("Error fetching monthly conversation:", error);
      }
    };

    fetchMonthlyConversation();
  }, []);

  return <div>Fetching Monthly Conversation...</div>;
};

export default GetConversation;
