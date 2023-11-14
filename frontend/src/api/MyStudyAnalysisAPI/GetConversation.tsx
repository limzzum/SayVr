import API_URL from "../../config";
import axios from "axios";

const GetConversation = async (conversationId: number) => {
  try {
    const response = await axios.get(`${API_URL}/conversation/${conversationId}`);
    console.log(conversationId);
    console.log("axios 요청되고 넘겨주는 리스폰스", response.data.data.conversation);
    return response.data.data.conversation;
  } catch (error) {
    console.error("Error fetching conversation:", error);
    throw error;
  }
};

export default GetConversation;
