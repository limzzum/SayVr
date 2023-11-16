import axios, { AxiosResponse } from "axios"
import { CreateFlashcardsRequestDto, PrivacyStatus } from "../../components/VocabListComponents/CreateNewListModal"
import { DeckSettingsUpdateRequestDto } from "../../components/VocabListComponents/DeckSettingModal"
import { CreateWordcardRequestDto } from "../../pages/VocabListPage/DeckDetailPage"
import { AutoCompleteResponseDto, TranslationRequestDto } from "./PapagoAPI"
import axiosInstance from "../constAPI/axiosInstance"

export enum ProgressStatus {
  ENABLED = "ENABLED",
  DISABLED = "DISABLED",
}
export enum WordcardStatus {
  UNCHECKED = "UNCHECKED",
  CHECKED = "CHECKED",
  DELETED ="DELETED"
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
  wordcardStatus: WordcardStatus
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
export interface DeckListResponseDto {
  personalDeckList: PersonalDeckTitle[]
}
export interface PersonalDeckResponse {
  personalDeckList: PersonalDeckTitle[]
}
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

export interface ReadDeckSearchRequestDto{
  keyword:string,
  sortBy:string,
  lastId:number,
  pageSize:number,
}
export interface MessageOnlyResponseDto {
  message: string
}

export interface WordcardUpdateRequestDto {
  wordcardStatus: WordcardStatus
}

export const createPersonalDeck = (data?: CreateFlashcardsRequestDto): Promise<AxiosResponse<ResponseDto<DeckCreateResponseDto>>> => {
  return axiosInstance.post("/flashcards/deck", data)
}
export const createForkedDeck = (deckId: number): Promise<AxiosResponse<ResponseDto<DeckCreateResponseDto>>> => {
  return axiosInstance.post(`/flashcards/deck/fork/${deckId}`)
}
export const getTranslation = (data: TranslationRequestDto): Promise<AxiosResponse<ResponseDto<AutoCompleteResponseDto>>> => {
  return axiosInstance.post("/flashcards/translate", data);
};

export const createWordcard = (
  deckId: number,
  data?: CreateWordcardRequestDto
): Promise<AxiosResponse<ResponseDto<WordUpdateResponseDto>>> => {
  return axiosInstance.post(`/flashcards/card/${deckId}`, data)
}

export const searchDecks = (data: ReadDeckSearchRequestDto): Promise<AxiosResponse<ResponseDto<DeckListResponseDto>>> => {
  return axiosInstance.get("/flashcards/search",{params:data})
}
export const getPersonalFlashcards = (): Promise<AxiosResponse<ResponseDto<PersonalDeckResponse>>> => {
  return axiosInstance.get("/flashcards/personal")
}
export const getPublicFlashcards = (): Promise<AxiosResponse<ResponseDto<PersonalDeckResponse>>> => {
  return axiosInstance.get("/flashcards/list")
}

export const getOneDeck = (deckId: number): Promise<AxiosResponse<ResponseDto<DeckDetailResponseDto>>> => {
  return axiosInstance.get(`/flashcards/deck/${deckId}`)
}

export const getTodaySentence = (): Promise<AxiosResponse<ResponseDto<WordUpdateResponseDto>>> => {
  return axiosInstance.get("/flashcards/today")
}

export const updateDeckSettings = (
  deckId: number,
  data: DeckSettingsUpdateRequestDto
): Promise<AxiosResponse<ResponseDto<DeckDetailResponseDto>>> => {
  return axiosInstance.put(`/flashcards/deck/${deckId}`, data)
}
export const updateProgressSaving = (
  deckId: number,
  data: DeckUpdateRequestDto
): Promise<AxiosResponse<ResponseDto<DeckDetailResponseDto>>> => {
  return axiosInstance.patch(`/flashcards/saving/${deckId}`, data)
}
export const resetDeckProgress = (deckId: number): Promise<AxiosResponse<ResponseDto<DeckDetailResponseDto>>> => {
  return axiosInstance.patch(`/flashcards/reset-progress/${deckId}`)
}

export const updateWordProgress = (
  wordcardId: number,
  data: WordcardUpdateRequestDto
): Promise<AxiosResponse<ResponseDto<WordUpdateResponseDto>>> => {
  return axiosInstance.patch(`/flashcards/progress/${wordcardId}`, data)
}

export const deleteDeck = (deckId: number): Promise<AxiosResponse<ResponseDto<MessageOnlyResponseDto>>> => {
  return axiosInstance.delete(`/flashcards/deck/${deckId}`)
}
export const deleteCard = (wordcardId: number): Promise<AxiosResponse<ResponseDto<MessageOnlyResponseDto>>> => {
  return axiosInstance.delete(`/flashcards/card/${wordcardId}`)
}
