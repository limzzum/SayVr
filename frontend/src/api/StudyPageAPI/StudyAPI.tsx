// api.ts
import axios, { AxiosResponse } from "axios";
import { CreateStudyRequestDto } from "../../components/StudyComponents/CreatNewStudyModal";
import { JoinStudyRequestDto } from "../../components/StudyComponents/ReadStudyInfoModal";
// import { DeckSettingsUpdateRequestDto } from "../../components/VocabListComponents/DeckSettingModal"

const BASE_URL = "http://localhost:8080/api/study";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
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
export enum Status {
  ACTIVE = "ACTIVE",
  DELETE = "DELETE",
}
export enum StudyStatus {
  FULL = "FULL",
  NOTFULL = "NOTFULL",
  DELETE = "DELETE",
}

export enum StudyRole {
  LEADER = "LEADER",
  MEMBER = "MEMBER",
}
export interface ResponseDto<T> {
  data: T;
  message: string;
  httpStatus: string;
}

export interface StudyInfoDto {
  studyId: number;
  name: string;
  maxPeople: number;
  currentPeople: number;
  description: string;
  rule: String;
  StudyStatus: StudyStatus;
}

export interface StudyListResponseDto {
  studyInfoDtoList: StudyInfoDto[];
}

export interface StudyMineListResponseDto {
  studyInfoDtoList: StudyInfoDto[];
}

export interface StudyDetailResponseDto {
  studyInfoDto: StudyInfoDto;
  memberId: number;
  studyRole: StudyRole;
  nickName: string;
}

export interface GoalResponseDto {
  goalId: number;
  targetDate: Date;
  optionType: OptionType;
  count: number;
  description: string;
}

export interface CheckListItemDto {
  checkListId: number;
  checkListStatus: CheckListStatus;
  optionCheckItem: OptionCheckItem;
  description: string;
  goalConut : number;
  currentCount : number;
}

export interface MemberCheckListResponseDto {
  studyMemberId: number;
  nickName: string;
  checkListItemDtoList :CheckListItemDto[];
}

export interface GoalDetailResponseDto {
  weeklySprintId: number;
  targetDate: Date;
  goalDtoList: GoalResponseDto[];
  memberCheckListResponseDtoList:MemberCheckListResponseDto[]

}

export interface WeeklySprintDetailResponse {
  preWeeklySprintId: number;
  nextWeeklySprintId: number;
  goalDetailResponseDto: GoalDetailResponseDto;
}

export interface StudyDeckInfo {
 studyDeckId : number;
 name : string;
 falshcardDeckId : number;
 wordCount : number;
}

export interface StudyDeckDetailResponseDto {
 studyDeckInfoList : StudyDeckInfo[];
}

export interface StudyEnterResponseDto {
  studyId: number;
}

export interface StudyPageDetailResponseDto {
  studyDetailResponseDto: StudyDetailResponseDto;
  weeklySprintDetailResponse: WeeklySprintDetailResponse;
  studyDeckDetailResponseDto: StudyDeckDetailResponseDto;
}

export const createStudy = (
  data?: CreateStudyRequestDto
): Promise<AxiosResponse<ResponseDto<StudyEnterResponseDto>>> => {
  return axiosInstance.post("", data);
};
export const joinStudy = (
  data?: JoinStudyRequestDto
): Promise<AxiosResponse<ResponseDto<StudyEnterResponseDto>>> => {
  return axiosInstance.post("/join", data);
};
export const getStudyMineList = (): Promise<
  AxiosResponse<ResponseDto<StudyMineListResponseDto>>
> => {
  return axiosInstance.get("/mine");
};
export const getStudyList = (): Promise<
  AxiosResponse<ResponseDto<StudyListResponseDto>>
> => {
  return axiosInstance.get("/list");
};
export const getOneStudy = (studyId: number): Promise<AxiosResponse<ResponseDto<StudyPageDetailResponseDto>>> => {
  return axiosInstance.get(`/${studyId}`)
}
