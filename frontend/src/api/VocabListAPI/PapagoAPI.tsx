
export interface AutoCompleteResponseDto{
  wordList: string[],
  result:string,
}
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