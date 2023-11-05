// GetScriptAPI.ts
import axios from "axios";

// ScriptItem 타입 정의
export interface ScriptItem {
  text: string;
  start: number;
  duration: number;
}

// getScript 함수 정의
const getScript = async (videoId: string): Promise<ScriptItem[]> => {
  try {
    const response = await axios.get(`https://말해vr.site/youtube/${videoId}`);
    const scriptArray: ScriptItem[] = response.data;
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
