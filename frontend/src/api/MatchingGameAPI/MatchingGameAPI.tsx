// api.ts
import axios, { AxiosResponse } from "axios";
import { serverURL } from "../../pages/MatchingGamePage/constants/constants";

const BASE_URL = serverURL+"/api/game";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    const newConfig = config;
    if (token) {
      newConfig.headers.Authorization = `Bearer ${token}`;
    }
    return newConfig;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export enum SocketType {
  GAME_START = "GAME_START",
  GAME_INFO = "GAME_INFO",
  GAME_END = "GAME_END",
  CHAT = "CHAT",
  QUIZ = "QUIZ",
  QUIZ_TIME_OVER = "QUIZ_TIME_OVER",
  PLAYER_OUT = "PLAYER_OUT",
}

export interface ResponseDto<T> {
  data: T;
  message: string;
  httpStatus: string;
}

export interface WaitingGameResponseDto {
  gameId: number;
  profile: string;
  gameStart: boolean;
}

export const waitingGame = (): Promise<
  AxiosResponse<ResponseDto<WaitingGameResponseDto>>
> => {
  return axiosInstance.get("/wait");
};

export const startGame = () => {
  return axiosInstance.get("/start");
};
