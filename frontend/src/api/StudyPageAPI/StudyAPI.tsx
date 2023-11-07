// api.ts
import axios, { AxiosResponse } from "axios"
// import { CreateFlashcardsRequestDto, PrivacyStatus } from "../../components/VocabListComponents/CreateNewListModal"
// import { CreateWordcardRequestDto } from "../../pages/VocabListPage/DeckDetailPage"
// import { DeckSettingsUpdateRequestDto } from "../../components/VocabListComponents/DeckSettingModal"

const BASE_URL = "http://localhost:8080/api/study"

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})
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
  data: T
  message: string
  httpStatus: string
}

export interface StudyInfoDto {
  studyId: number
  name: string
  maxPeople: number
  currentPeople : number
  description : string
  rule : String
  StudyStatus: StudyStatus
}

export interface StudyListResponseDto {
  studyInfoDtoList: StudyInfoDto[]
}

export interface StudyMineListResponseDto {
  studyInfoDtoList: StudyInfoDto[]
}

export interface StudyDetailResponseDto {
  StudyInfoDto : StudyInfoDto
  memberId : number
  StudyRole : StudyRole
  nickName : string
}

export interface StudyEnterResponseDto {
  studyId: number
}

// export const createPersonalDeck = (data?: CreateFlashcardsRequestDto): Promise<AxiosResponse<ResponseDto<DeckCreateResponseDto>>> => {
//   return axiosInstance.post("/deck", data)
// }
// export const searchDecks = (data: SearchRequestDto): Promise<AxiosResponse<ResponseDto<PersonalDeckResponse>>> => {
//   return axiosInstance.get("/search")
// }
export const getStudyMineList = (): Promise<AxiosResponse<ResponseDto<StudyMineListResponseDto>>> => {
  return axiosInstance.get("/mine")
}
export const getStudyList = (): Promise<AxiosResponse<ResponseDto<StudyListResponseDto>>> => {
  return axiosInstance.get("/list")
}
// export const getOneDeck = (deckId: number): Promise<AxiosResponse<ResponseDto<DeckDetailResponseDto>>> => {
//   return axiosInstance.get(`/deck/${deckId}`)
// }
