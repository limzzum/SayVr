import axios from "axios";

const getScript = async (videoId: string) => {
    console.log("axios 페이지")
    console.log(videoId)
  try {
    const response = await axios.get(`https://말해vr.site/youtube/${videoId}`);
    return response.data.script;
  } catch (error) {
    console.error("Error fetching script:", error);
    throw error;
  }
};

export default getScript;
