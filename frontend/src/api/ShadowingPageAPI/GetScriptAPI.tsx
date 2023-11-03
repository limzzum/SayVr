import axios from "axios";

interface ScriptItem {
  script: string;
}

const getScript = async (videoId: string): Promise<ScriptItem[]> => {
  try {
    const response = await axios.get(`https://말해vr.site/youtube/${videoId}`);
    console.log("axios 페이지");
    console.log(videoId);
    console.log(response.data);

    // 응답으로 받은 배열에서 script 속성 추출
    const scriptArray: ScriptItem[] = response.data;
    if (scriptArray.length > 0) {
      const firstScript = scriptArray[0].script;
      console.log("Script:", firstScript);
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
