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

// React 컴포넌트나 커스텀 훅이 아닌 함수에서는 React 훅을 사용할 수 없습니다.
export const getUserData = async (token: string): Promise<UserData> => {
  try {
    console.log("유저 데이터 불러오는 요청까지는 옴")
    console.log("유저 데이터 불러오는 요청까지는 옴", token)
    const response: AxiosResponse<UserData> = await axios.get(`${API_URL}/user/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('API 요청 중 오류 발생:', error);
    throw error;
  }
};