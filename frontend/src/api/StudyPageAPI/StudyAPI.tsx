// api.ts
import { AxiosResponse } from "axios";
import { CreateStudyRequestDto } from "../../components/StudyComponents/CreatNewStudyModal";
import { JoinStudyRequestDto } from "../../components/StudyComponents/ReadStudyInfoModal";
import { UpdateStudyRequestDto } from "../../components/StudyComponents/UpdateNewStudyModal";
import { CreateWeeklySprintRequestDto } from "../../components/StudyComponents/CreatWeeklySprintModal";
import {
  CreateCheckListRequestDto,
  UpdateCheckListStatusResquestDto,
} from "../../components/StudyComponents/CheckListCard";
import {
  CreateGoalRequestDto,
  UpdateGoalResquestDto,
} from "../../components/StudyComponents/WeeklySprintComponent";
import { CreateFlashcardsRequestDto } from "../../components/StudyComponents/CreateStudyWordModal";
import axiosInstance from "../constAPI/axiosInstance";
import { CreateWordcardRequestDto } from "../../pages/VocabListPage/DeckDetailPage";
import { DeckSettingsUpdateRequestDto } from "../../components/StudyComponents/StudyDeckSettingModal";

export enum CheckListStatus {
  DELETE = "DELETE",
  ONGOING = "ONGOING",
  DONE = "DONE",
}
export enum OptionCheckItem {
  STUDYGOAL = "STUDYGOAL",
  PERSONAL = "PERSONAL",
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
  rule: string;
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
  optionType: OptionType;
  count: number;
  description: string;
}

export interface CheckListItemDto {
  checkListId: number;
  checkListStatus: CheckListStatus;
  optionCheckItem: OptionCheckItem;
  description: string;
  goalConut: number;
  currentCount: number;
  optionType: OptionType;
}

export interface MemberCheckListResponseDto {
  studyMemberId: number;
  nickName: string;
  checkListItemDtoList: CheckListItemDto[];
}

export interface GoalDetailResponseDto {
  weeklySprintId: number;
  targetDate: Date;
  goalDtoList: GoalResponseDto[];
  memberCheckListResponseDtoList: MemberCheckListResponseDto[];
}

export interface WeeklySprintDetailResponse {
  preWeeklySprintId: number;
  nextWeeklySprintId: number;
  goalDetailResponseDto: GoalDetailResponseDto;
}

export interface StudyDeckInfo {
  studyDeckId: number;
  name: string;
  flashcardDeckId: number;
  wordCount: number;
}

export interface StudyDeckDetailResponseDto {
  studyDeckInfoList: StudyDeckInfo[];
}

export enum WordcardStatus {
  UNCHECKED = "UNCHECKED",
  CHECKED = "CHECKED",
  DELETED = "DELETED",
}

export interface WordcardDto {
  id: number;
  kor: string;
  eng: string;
  wordcardStatus: WordcardStatus;
}

export interface FlashcardDto {
  wordcardList: WordcardDto[];
}

export interface StudyDeckOneDetailResponseDto {
  id: number;
  name: string;
  flashcardDeckId: number;
  flashcardDto: FlashcardDto;
  wordCount?: number;
  studyRole: StudyRole;
}

export interface StudyEnterResponseDto {
  studyId: number;
}

export interface StudyPageDetailResponseDto {
  studyDetailResponseDto: StudyDetailResponseDto;
  weeklySprintDetailResponse: WeeklySprintDetailResponse;
  studyDeckDetailResponseDto: StudyDeckDetailResponseDto;
}

export interface StudyDeckCreateResponseDto {
  studyDeckId: number;
  name: string;
  flashcardDeckId: number;
  wordCount: number;
}

export interface MessageOnlyResponseDto {
  message: string;
}

export interface WordUpdateResponseDto {
  wordcard: WordcardDto;
  errorMessage?: string;
}

export interface StudySliceRequestDto {
  lastId: number;
  keyword: string;
  size: number;
}

export const createStudy = (
  data?: CreateStudyRequestDto
): Promise<AxiosResponse<ResponseDto<StudyEnterResponseDto>>> => {
  return axiosInstance.post("/study", data);
};
export const joinStudy = (
  data?: JoinStudyRequestDto
): Promise<AxiosResponse<ResponseDto<StudyEnterResponseDto>>> => {
  return axiosInstance.post("/study/join", data);
};
export const getStudyMineList = (): Promise<
  AxiosResponse<ResponseDto<StudyMineListResponseDto>>
> => {
  return axiosInstance.get("/study/mine");
};
export const getStudyList = (): Promise<
  AxiosResponse<ResponseDto<StudyListResponseDto>>
> => {
  return axiosInstance.get("/study/list");
};

export const getStudyListKeyWord = (
  data: StudySliceRequestDto
): Promise<AxiosResponse<ResponseDto<StudyListResponseDto>>> => {
  return axiosInstance.get("/study/listKeyword", { params: data });
};
export const getOneStudy = (
  studyId: number
): Promise<AxiosResponse<ResponseDto<StudyPageDetailResponseDto>>> => {
  return axiosInstance.get(`/study/${studyId}`);
};

export const deleteStudyMember = (
  studyId: number
): Promise<AxiosResponse<ResponseDto<any>>> => {
  return axiosInstance.delete(`/study/member/${studyId}`);
};

export const updateStudy = (
  studyId: number | undefined,
  data?: UpdateStudyRequestDto
): Promise<AxiosResponse<ResponseDto<StudyDetailResponseDto>>> => {
  return axiosInstance.put(`/study/${studyId}`, data);
};

export const createWeeklySprint = (
  studyId: Number,
  data?: CreateWeeklySprintRequestDto
): Promise<AxiosResponse<ResponseDto<WeeklySprintDetailResponse>>> => {
  return axiosInstance.post(`/study/goal/${studyId}`, data);
};

export const updateCheckListItemStatus = (
  studyId: Number,
  weeklySprintId: Number,
  checkListId: number,
  data?: UpdateCheckListStatusResquestDto
): Promise<AxiosResponse<ResponseDto<WeeklySprintDetailResponse>>> => {
  return axiosInstance.patch(
    `/study/checkList/status/${studyId}/${weeklySprintId}/${checkListId}`,
    data
  );
};

export const deleteCheckListItem = (
  studyId: Number,
  weeklySprintId: number,
  checkListId: number
): Promise<AxiosResponse<ResponseDto<WeeklySprintDetailResponse>>> => {
  return axiosInstance.delete(
    `/study/checkList/${studyId}/${weeklySprintId}/${checkListId}`
  );
};

export const createCheckListItem = (
  studyId: Number,
  weeklySprintId: number,
  data?: CreateCheckListRequestDto
): Promise<AxiosResponse<ResponseDto<WeeklySprintDetailResponse>>> => {
  return axiosInstance.post(
    `/study/checkList/${studyId}/${weeklySprintId}`,
    data
  );
};

export const getWeeklySprint = (
  studyId: Number,
  weeklySprintId: number
): Promise<AxiosResponse<ResponseDto<WeeklySprintDetailResponse>>> => {
  return axiosInstance.get(`/study/goal/${studyId}/${weeklySprintId}`);
};

export const createGoal = (
  studyId: Number,
  weeklySprintId: Number | undefined,
  data?: CreateGoalRequestDto
): Promise<AxiosResponse<ResponseDto<WeeklySprintDetailResponse>>> => {
  return axiosInstance.post(`/study/goal/${studyId}/${weeklySprintId}`, data);
};

export const updateGoal = (
  studyId: Number,
  weeklySprintId: Number | undefined,
  goalId: Number,
  data?: UpdateGoalResquestDto
): Promise<AxiosResponse<ResponseDto<WeeklySprintDetailResponse>>> => {
  return axiosInstance.put(
    `/study/goal/${studyId}/${weeklySprintId}/${goalId}`,
    data
  );
};

export const deleteGoal = (
  studyId: Number,
  weeklySprintId: Number | undefined,
  goalId: Number
): Promise<AxiosResponse<ResponseDto<WeeklySprintDetailResponse>>> => {
  return axiosInstance.delete(
    `/study/goal/${studyId}/${weeklySprintId}/${goalId}`
  );
};

export const createStudyDeck = (
  studyId: Number,
  data?: CreateFlashcardsRequestDto
): Promise<AxiosResponse<ResponseDto<StudyDeckCreateResponseDto>>> => {
  return axiosInstance.post(`/study/wordlist/${studyId}`, data);
};

export const getStudyDeckList = (
  studyId: Number
): Promise<AxiosResponse<ResponseDto<StudyDeckDetailResponseDto>>> => {
  return axiosInstance.get(`/study/wordlist/${studyId}`);
};

export const getOneStudyDeck = (
  studyId: Number,
  studyDeckId: Number
): Promise<AxiosResponse<ResponseDto<StudyDeckOneDetailResponseDto>>> => {
  return axiosInstance.get(`/study/wordlist/${studyId}/${studyDeckId}`);
};

export const deleteStudyCard = (
  studyId: Number,
  studyDeckId: Number,
  wordcardId: number
): Promise<AxiosResponse<ResponseDto<MessageOnlyResponseDto>>> => {
  return axiosInstance.delete(
    `/study/wordlist/${studyId}/${studyDeckId}/${wordcardId}`
  );
};

export const createStudyWordcard = (
  studyId: Number,
  studyDeckId: Number,
  data?: CreateWordcardRequestDto
): Promise<AxiosResponse<ResponseDto<WordUpdateResponseDto>>> => {
  return axiosInstance.post(`/study/wordlist/${studyId}/${studyDeckId}`, data);
};

export const deleteStudyDeck = (
  studyId: Number,
  studyDeckId: Number
): Promise<AxiosResponse<ResponseDto<MessageOnlyResponseDto>>> => {
  return axiosInstance.delete(`/study/wordlist/${studyId}/${studyDeckId}`);
};

export const updateStudyDeckSettings = (
  studyId: Number,
  data: DeckSettingsUpdateRequestDto
): Promise<AxiosResponse<ResponseDto<StudyDeckOneDetailResponseDto>>> => {
  return axiosInstance.patch(`/study/wordlist/${studyId}`, data);
};
