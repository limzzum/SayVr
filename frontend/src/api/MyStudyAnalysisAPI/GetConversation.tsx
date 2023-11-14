import API_URL from "../../config";
import axios from "axios";
import { tokenState } from "../../recoil/GoalbalState";
import { useRecoilValue } from 'recoil';

const GetConversation = async (conversationId: number, token: string) => {
  try {
    const response = await axios.get(`${API_URL}/conversation/${conversationId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });    
    console.log("다시", conversationId);
    console.log("axios 요청되고 넘겨주는 리스폰스", response.data.data.conversation);
    return response.data.data.conversation;
  } catch (error) {
    console.error("Error fetching conversation:", error);
    throw error;
  }
};

export default GetConversation;
