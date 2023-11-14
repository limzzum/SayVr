// api.ts
import { AxiosResponse } from "axios";
import axiosInstance from "../constAPI/axiosInstance";

export enum CheckListStatus {
  DELETE = "DELETE",
  ONGOING = "ONGOING",
  DONE = "DONE",
}
export enum OptionCheckItem {
  STUDYGOAL = "STUDYGOAL",
  PERSONAL = "CHECKED",
}

export enum OptionType {
  VR = "VR",
  GAME = "GAME",
  QUIZ = "QUIZ",
  ETC = "ETC",
}

export enum StudyRole {
  LEADER = "LEADER",
  MEMBER = "MEMBER",
}

export enum StudyStatus {
  FULL = "FULL",
  NOTFULL = "NOTFULL",
  DELETE = "DELETE",
}

export interface ResponseDto<T> {
  data: T;
  message: string;
  httpStatus: string;
}

export interface studyInfoDto {
  id: number;
  name: string;
  maxPeople: number;
  currentPeople: number;
  description?: string;
  rule?: string;
  studyStatus: StudyStatus;
}
export interface myStudyResponseDto {
  studyInfoDtoList: studyInfoDto[];
}

export interface AllStudyResponseDto {
  studyInfoDtoList: studyInfoDto[];
}

// export const createStudy = (data?:CreateFlashcardsRequestDto): Promise<AxiosResponse<ResponseDto<DeckCreateResponseDto>>> => {
//     return axiosInstance.post("/deck",data)
// }
// export const joinStudy = (deckId:number,data?:CreateWordcardRequestDto): Promise<AxiosResponse<ResponseDto<WordUpdateResponseDto>>> => {
//     return axiosInstance.post(`/card/${deckId}`,data)
// }
export const readStudyMineList = (): Promise<
  AxiosResponse<ResponseDto<myStudyResponseDto>>
> => {
  return axiosInstance.get("/mine");
};
export const readStudyAll = (): Promise<
  AxiosResponse<ResponseDto<AllStudyResponseDto>>
> => {
  return axiosInstance.get("/list");
};

// export const getOneDeck = (deckId:number): Promise<AxiosResponse<ResponseDto<DeckDetailResponseDto>>> => {
//     return axiosInstance.get(`/deck/${deckId}`)
// }
