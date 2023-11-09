import API_URL from "../../config";
import axios from "axios";

const GetConversation = async (conversationId: number) => {
  try {
    const response = await axios.get(`${API_URL}/conversation/${conversationId}`);
    console.log("axios 요청됨", response);
    return response.data.data.conversation;
  } catch (error) {
    console.error("Error fetching conversation:", error);
    throw error;
  }
};

export default GetConversation;
