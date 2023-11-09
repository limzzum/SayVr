import axios, { AxiosResponse } from "axios"
import { ResponseDto } from "./FlashcardsAPI"
// const BASE_URL = "https://openapi.naver.com"

// const axiosInstance = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
//     "X-Naver-Client-Id": process.env.REACT_APP_PAPAGO_API_CLIENT_ID,
//     "X-Naver-Client-Secret": process.env.REACT_APP_PAPAGO_API_CLIENT_SECRET,
//   },
// })

export interface TranslationResponse {
    message: {
      "@type": string;
      "@service": string;
      "@version": string;
      result: TranslatedResponseDto
    };
  }
  export interface TranslatedResponseDto {
    srcLangType: string;
    tarLangType: string;
    translatedText: string;
  }
  export interface TranslationRequestDto{
    source:string,
    target:string,
    text:string,
  }// "ko"  "eng"

  // export const getTranslation = (data: TranslationRequestDto): Promise<AxiosResponse<TranslationResponse>> => {
  //   return axiosInstance.post("/v1/papago/n2mt", data);
  // };