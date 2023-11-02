// api.ts
import axios, { AxiosResponse } from "axios"
import { CreateFlashcardsRequestDto, PrivacyStatus } from "../../components/VocabListComponents/CreateNewListModal"

const BASE_URL = "http://localhost:8080/api/flashcards"

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})
export enum ProgressStatus{
    ENABLED = "ENABLED",
    DISABLED = "DISABLED",
}
export enum wordcardStatus{
    UNCHECKED = "UNCHECKED",
    CHECKED = "CHECKED",
}
export interface ResponseDto<T> {
  data: T,
  message: string,
  httpStatus: string,
}

export interface WordcardDto {
  id: number,
  kor: string,
  eng: string,
  wordcardStatus:wordcardStatus,
}

export interface FlashcardDto {
  wordcardList: WordcardDto[],
}
// export interface PersonalDeck {
//   id: number
// }
export interface PersonalDeckTitle {
  id: number,
  name: string,
  nickname?: string,
  wordCount?: number,
  forkCount?: number,
}
export interface PersonalDeckResponse {
  personalDeckList: PersonalDeckTitle[],
}
// id 숫자로 받는지 ? string으로?? bigint로???
export interface DeckDetailResponseDto {
  id: number,
  name: string,
  userId: number,
  nickname: string,
  flashcardDeckId: number,
  flashcardDto: FlashcardDto,
  status: PrivacyStatus,
  savingProgressStatus:ProgressStatus,
  wordCount?: number,
  forkCount?: number,
}

//res. data[data,message,httpStatus]
export const getPersonalFlashcards = (): Promise<AxiosResponse<ResponseDto<PersonalDeckResponse>>> => {
  return axiosInstance.get("/personal")
}
export const createPersonalDeck = (data?:CreateFlashcardsRequestDto): Promise<AxiosResponse<ResponseDto<DeckDetailResponseDto>>> => {
  return axiosInstance.post("/deck",data)
}
export const getOneDeck = (): Promise<AxiosResponse<ResponseDto<DeckDetailResponseDto>>> => {
    return axiosInstance.get("/personal")
  }

