import { FC } from "react"
import { DeckDetailResponseDto } from "../../api/VocabListAPI/FlashcardsAPI"
interface WordcardProps {
  props?: DeckDetailResponseDto
}
const Wordcard: FC<WordcardProps> = (props) => {
  if (!props) {
    return (
      <>
        <h1>잘못된 접근입니다.</h1>
      </>
    )
  }
  return <></>
}
export default Wordcard
