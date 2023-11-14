import axios from "axios";
import API_URL from "../../config";
// const GetMyAverageScore = async (token) => {
const GetMyAverageScore = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/conversation/score`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching average score:", error);
    throw error;
  }
};

export default GetMyAverageScore;
