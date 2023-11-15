import axios from "axios";

export interface ScriptItem {
  text: string;
  start: number;
  duration: number;
  index: number;
}

const getScript = async (videoId: string): Promise<ScriptItem[]> => {
  try {
    const response = await axios.get(`https://말해vr.site/youtube/${videoId}`);
    console.log("여기는 스크립트 리스펀스",response)
    const scriptArray: ScriptItem[] = response.data;
    console.log("여기가 스크립트 어래이",scriptArray)
    if (scriptArray.length > 0) {
      return scriptArray;
    } else {
      console.error("No script data found in the response.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching script:", error);
    throw error;
  }
};

export default getScript;