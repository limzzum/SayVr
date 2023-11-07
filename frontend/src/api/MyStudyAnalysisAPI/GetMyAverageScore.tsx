import axios from 'axios';
import API_URL from "../../../config"
// const getMyAverageScore = async (token) => {
    const getMyAverageScore = async () => {
  try {
    const response = await axios.get(`${API_URL}/virtual/score`, {
      headers: {
        Authorization: null,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching average score:', error);
    throw error; 
  }
};

export default getMyAverageScore;
