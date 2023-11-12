import axios, { AxiosResponse } from 'axios';
import API_URL from '../../config';

export interface UserData {
  message: string;
  data: {
    nickname: string;
    profile: string;
    username: string;
  };
}

export const getUserData = async (): Promise<UserData> => {
  try {
    const response: AxiosResponse<UserData> = await axios.get(`${API_URL}/user/`);
    return response.data;
  } catch (error) {
    console.error('API 요청 중 오류 발생:', error);
    throw error;
  }
};
