// api.ts
import axios, { AxiosResponse } from "axios";
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
import API_URL from '../../config';

const axiosInstance = axios.create({
  baseURL: `${API_URL}/study`,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  error => {
    Promise.reject(error)
});

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
  falshcardDeckId: number;
  wordCount: number;
}

export interface StudyDeckDetailResponseDto {
  studyDeckInfoList: StudyDeckInfo[];
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
export const getOneStudy = (
  studyId: number
): Promise<AxiosResponse<ResponseDto<StudyPageDetailResponseDto>>> => {
  return axiosInstance.get(`/${studyId}`);
};

export const deleteStudyMember = (
  studyId: number
): Promise<AxiosResponse<ResponseDto<any>>> => {
  return axiosInstance.delete(`/quit/${studyId}`);
};

export const updateStudy = (
  studyId: number | undefined,
  data?: UpdateStudyRequestDto
): Promise<AxiosResponse<ResponseDto<StudyDetailResponseDto>>> => {
  return axiosInstance.put(`/${studyId}`, data);
};

export const createWeeklySprint = (
  studyId: Number,
  data?: CreateWeeklySprintRequestDto
): Promise<AxiosResponse<ResponseDto<WeeklySprintDetailResponse>>> => {
  return axiosInstance.post(`/goal/${studyId}`, data);
};

export const updateCheckListItemStatus = (
  studyId: Number,
  weeklySprintId: Number,
  checkListId: number,
  data?: UpdateCheckListStatusResquestDto
): Promise<AxiosResponse<ResponseDto<WeeklySprintDetailResponse>>> => {
  return axiosInstance.patch(
    `/checkList/status/${studyId}/${weeklySprintId}/${checkListId}`,
    data
  );
};

export const deleteCheckListItem = (
  studyId: Number,
  weeklySprintId: number,
  checkListId: number
): Promise<AxiosResponse<ResponseDto<WeeklySprintDetailResponse>>> => {
  return axiosInstance.delete(
    `/checkList/${studyId}/${weeklySprintId}/${checkListId}`
  );
};

export const createCheckListItem = (
  studyId: Number,
  weeklySprintId: number,
  data?: CreateCheckListRequestDto
): Promise<AxiosResponse<ResponseDto<WeeklySprintDetailResponse>>> => {
  return axiosInstance.post(`/checkList/${studyId}/${weeklySprintId}`, data);
};

export const getWeeklySprint = (
  studyId: Number,
  weeklySprintId: number
): Promise<AxiosResponse<ResponseDto<WeeklySprintDetailResponse>>> => {
  return axiosInstance.get(`/goal/${studyId}/${weeklySprintId}`);
};

export const createGoal = (
  studyId: Number,
  weeklySprintId: Number | undefined,
  data?: CreateGoalRequestDto
): Promise<AxiosResponse<ResponseDto<WeeklySprintDetailResponse>>> => {
  return axiosInstance.post(`/goal/${studyId}/${weeklySprintId}`, data);
};

export const updateGoal = (
  studyId: Number,
  weeklySprintId: Number | undefined,
  goalId: Number,
  data?: UpdateGoalResquestDto
): Promise<AxiosResponse<ResponseDto<WeeklySprintDetailResponse>>> => {
  return axiosInstance.put(
    `/goal/${studyId}/${weeklySprintId}/${goalId}`,
    data
  );
};

export const deleteGoal = (
  studyId: Number,
  weeklySprintId: Number | undefined,
  goalId: Number
): Promise<AxiosResponse<ResponseDto<WeeklySprintDetailResponse>>> => {
  return axiosInstance.delete(`/goal/${studyId}/${weeklySprintId}/${goalId}`);
};
