// GetConversationDates.tsx

import axios from "axios";
import BASE_URL from "../../config";

const GetConversationDates = async (month: number, year: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/conversation/monthly`, {
      params: { month, year },
    });

    const conversationDates = response.data.data.datedConversationList.map(
      (conversation: any) => conversation.date
    );

    return {
      data: conversationDates,
    };
  } catch (error) {
    console.error("Error fetching conversation dates:", error);
    throw error; // Propagate the error to the caller
  }
};

export default GetConversationDates;
