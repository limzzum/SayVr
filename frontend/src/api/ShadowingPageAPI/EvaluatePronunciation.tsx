import axios, { AxiosRequestConfig } from "axios";

const azureEndpoint = 'https://eastus.api.cognitive.microsoft.com';
const apiKey = process.env.REACT_APP_AZURE_PRONUNCIATION_API_KEY;

const sendAzureRequest = async (
  path: string,
  method: string,
  data?: any,
  headers?: Record<string, string>
) => {
  const config: AxiosRequestConfig = {
    method,
    url: `${azureEndpoint}${path}`,
    data,
    headers: {
      'Ocp-Apim-Subscription-Key': apiKey,
      ...headers,
    },
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(`Error sending request to ${path}:`, error);
    return null;
  }
};

// 발음 평가 API를 호출하는 함수
const evaluatePronunciation = async (
  audioBase64: string,
  locale: string = 'en-US'
): Promise<any> => {
  const tokenPath = '/sts/v1.0/issuetoken';
  const token = await sendAzureRequest(tokenPath, 'post', null, {
    'Content-Type': 'application/x-www-form-urlencoded',
  });

  if (!token) {
    return null;
  }

  const pronunciationPath = '/spid/v1.0/evaluatePronunciation';
  const audioConfig = {
    referenceText: 'good morning',  // 발음 평가 대상 문장
    gradingSystem: 'HundredMark',
    granularity: 'Phoneme',
    enableMiscue: true,
  };

  return sendAzureRequest(pronunciationPath, 'post', audioConfig, {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  });
};

export default evaluatePronunciation;
