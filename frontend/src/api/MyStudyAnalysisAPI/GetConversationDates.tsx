import axios from "axios";
import BASE_URL from "../../config";

const GetConversationDates = async ( month: number, year: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/conversation/monthly`, {
      params: {
        year: year,
        month: month,
      },
    });
    console.log(year);
    console.log(month);
    console.log(response);
    const conversationDates = response.data.data.datedConversationList.map((conversation: any) => conversation.date);
    const conversationIds = response.data.data.datedConversationList.map((conversation: any) => conversation.id);

    console.log("API 리턴값");
    console.log(conversationDates);
    return {
      data: conversationDates,
      id: conversationIds
    };
  } catch (error) {
    console.error("Error fetching conversation dates:", error);
    throw error;
  }
};

export default GetConversationDates;
