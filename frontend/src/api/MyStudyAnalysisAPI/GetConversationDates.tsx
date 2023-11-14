import axios from "axios";
import API_URL from "../../config";

interface ConversationData {
  date: string;
  id: number;
}

const GetConversationDates = async (month: number, year: number) => {
  try {
    const response = await axios.get(`${API_URL}/conversation/monthly`, {
      params: {
        year: year,
        month: month,
      },
    });

    const datedConversationList: ConversationData[] = response.data.data.datedConversationList;
    const dateIdMap: Record<string, number[]> = {};

    datedConversationList.forEach((conversation: ConversationData) => {
      const { date, id } = conversation;

      if (!dateIdMap[date]) {
        dateIdMap[date] = [];
      }

      dateIdMap[date].push(id);
    });

    const conversationDates = datedConversationList.map((conversation: ConversationData) => conversation.date);
    const conversationIds = datedConversationList.map((conversation: ConversationData) => conversation.id);

    console.log("여기는 날짜를 담은 값", conversationDates);
    console.log("여기는 대화 아이디를 담은 값", conversationIds);
    console.log("API 리턴값", dateIdMap);
    console.log("새로 만든 배열");

    console.log("새로 만든 배열", dateIdMap);
    console.log("새로 만든 배열", dateIdMap);
    console.log("새로 만든 배열", dateIdMap);
    console.log("새로 만든 배열", dateIdMap);

    return {
      data: conversationDates,
      id: conversationIds,
      dateIdMap: dateIdMap, // 새로 추가한 부분
    };
  } catch (error) {
    console.error("Error fetching conversation dates:", error);
    throw error;
  }
};

export default GetConversationDates;
