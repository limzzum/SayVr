import axios from "axios";
import API_URL from "../../config";
// const GetMyAverageScore = async (token) => {
const GetMyAverageScore = async () => {
  console.log("점수 불러오기 API 여기")
  try {
    const response = await axios.get(`${API_URL}/conversation/score`, {
      //   headers: {
      //     Authorization: null,
      //   },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching average score:", error);
    throw error;
  }
};

export default GetMyAverageScore;
