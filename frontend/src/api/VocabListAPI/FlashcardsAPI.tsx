// api.ts
import axios, { AxiosResponse } from "axios";

const BASE_URL = "http://localhost:8080/api/flashcards";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
export interface ResponseDto<T> {
    data: T;
    message: string;
    httpStatus: string;
  }
  
export interface PersonalDeck {
    id:number,
    name:string,
    nickname:string,
    wordCount:number,
    forkCount:number,
  }
  export interface PersonalDeckResponse {
    personalDeckList: PersonalDeck[];
}

//res. data[data,message,httpStatus]
export const getPersonalFlashcards = (): Promise<AxiosResponse<ResponseDto<PersonalDeckResponse>>> => {
  return axiosInstance.get("/personal");
};
