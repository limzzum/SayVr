import axios from "axios";
import BASE_URL from "../../config";

const GetConversationDates = async (year: number, month: number) => {
  console.log("API 페이지에 전달된 값");
  console.log(month);
  console.log(year);
  try {
    const response = await axios.get(`${BASE_URL}/conversation/monthly`, {
      params: {
        year: year,
        month: month,
      },
    });

    console.log(response);
    const conversationDates = response.data.data.datedConversationList.map((conversation: any) => conversation.date);
    console.log("API 리턴값");
    console.log(conversationDates);
    return {
      data: conversationDates,
    };
  } catch (error) {
    console.error("Error fetching conversation dates:", error);
    throw error; // Propagate the error to the caller
  }
};

export default GetConversationDates;
