// api.ts
import axios, { AxiosResponse } from "axios"
import { CreateFlashcardsRequestDto, PrivacyStatus } from "../../components/VocabListComponents/CreateNewListModal"
import { CreateWordcardRequestDto } from "../../pages/VocabListPage/DeckDetailPage"
import { DeckSettingsUpdateRequestDto } from "../../components/VocabListComponents/DeckSettingModal"
const BASE_URL = "http://localhost:8080/api/flashcards"

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})
export enum ProgressStatus {
  ENABLED = "ENABLED",
  DISABLED = "DISABLED",
}
export enum WordcardStatus {
  UNCHECKED = "UNCHECKED",
  CHECKED = "CHECKED",
}
export interface ResponseDto<T> {
  data: T
  message: string
  httpStatus: string
}

export interface WordcardDto {
  id: number
  kor: string
  eng: string
  WordcardStatus: WordcardStatus
}

export interface FlashcardDto {
  wordcardList: WordcardDto[]
}
// export interface PersonalDeck {
//   id: number
// }
export interface PersonalDeckTitle {
  id: number
  name: string
  nickname?: string
  wordCount: number
  forkCount?: number
}
export interface PersonalDeckResponse {
  personalDeckList: PersonalDeckTitle[]
}
// id 숫자로 받는지 ? string으로?? bigint로???
export interface DeckDetailResponseDto extends DeckCreateResponseDto {
  id: number
  name: string
  userId: number
  nickname: string
  flashcardDeckId: number
  flashcardDto: FlashcardDto
  status: PrivacyStatus
  savingProgressStatus: ProgressStatus
  wordCount?: number
  forkCount?: number
}
export interface DeckCreateResponseDto {
  id: number
  name: string
  userId: number
  nickname: string
  flashcardDeckId: number
  status: PrivacyStatus
  savingProgressStatus: ProgressStatus
}
export interface DeckUpdateRequestDto {
  savingProgressStatus: ProgressStatus
}
export interface WordUpdateResponseDto {
  wordcard: WordcardDto,
  errorMessage?:string,
}

export interface SearchRequestDto {
  // 미정인 부분이 많아서 백과 동시에, 어떤 제한 조건 걸지, 정렬 걸지
  userId: number
  type: string
  keyword: string
}
export interface MessageOnlyResponseDto {
  message: string
}

export interface WordcardUpdateRequestDto {
  wordcardStatus: WordcardStatus
}
//res. data[data,message,httpStatus]
//userId -> header에 있어야,,
export const createPersonalDeck = (data?: CreateFlashcardsRequestDto): Promise<AxiosResponse<ResponseDto<DeckCreateResponseDto>>> => {
  return axiosInstance.post("/deck", data)
}
export const createForkedDeck = (deckId: number): Promise<AxiosResponse<ResponseDto<DeckCreateResponseDto>>> => {
  return axiosInstance.post(`/deck/fork/${deckId}`)
}

export const createWordcard = (
  deckId: number,
  data?: CreateWordcardRequestDto
): Promise<AxiosResponse<ResponseDto<WordUpdateResponseDto>>> => {
  return axiosInstance.post(`/card/${deckId}`, data)
}

export const searchDecks = (data: SearchRequestDto): Promise<AxiosResponse<ResponseDto<PersonalDeckResponse>>> => {
  return axiosInstance.get("/search")
}
export const getPersonalFlashcards = (): Promise<AxiosResponse<ResponseDto<PersonalDeckResponse>>> => {
  return axiosInstance.get("/personal")
}
export const getPublicFlashcards = (): Promise<AxiosResponse<ResponseDto<PersonalDeckResponse>>> => {
  return axiosInstance.get("/list")
}
export const getOneDeck = (deckId: number): Promise<AxiosResponse<ResponseDto<DeckDetailResponseDto>>> => {
  return axiosInstance.get(`/deck/${deckId}`)
}
export const updateDeckSettings = (
  deckId: number,
  data: DeckSettingsUpdateRequestDto
): Promise<AxiosResponse<ResponseDto<DeckDetailResponseDto>>> => {
  return axiosInstance.put(`/deck/${deckId}`, data)
}
export const updateProgressSaving = (
  deckId: number,
  data: DeckUpdateRequestDto
): Promise<AxiosResponse<ResponseDto<DeckDetailResponseDto>>> => {
  return axiosInstance.patch(`/saving/${deckId}`, data)
}
export const resetDeckProgress = (deckId: number): Promise<AxiosResponse<ResponseDto<DeckDetailResponseDto>>> => {
  return axiosInstance.patch(`/reset-progress/${deckId}`)
}

export const updateWordProgress = (
  wordcardId: number,
  data: WordcardUpdateRequestDto
): Promise<AxiosResponse<ResponseDto<WordUpdateResponseDto>>> => {
  return axiosInstance.patch(`/progress/${wordcardId}`, data)
}
export const deleteDeck = (deckId: number): Promise<AxiosResponse<ResponseDto<MessageOnlyResponseDto>>> => {
  return axiosInstance.delete(`/deck/${deckId}`)
}
export const deleteCard = (wordcardId: number): Promise<AxiosResponse<ResponseDto<MessageOnlyResponseDto>>> => {
  return axiosInstance.delete(`/deck/${wordcardId}`)
}
