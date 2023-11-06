import { FC } from "react"
import { WordcardDto } from "../../api/VocabListAPI/FlashcardsAPI"

interface VocabLineProps {
  props?: WordcardDto
}

export const VocabLine: FC<VocabLineProps> = ({ props }) => {
  return (
    <>
      <div className='vocab-line'>
        <div>{props?.kor}</div>
        <div>{props?.eng}</div>
      </div>
    </>
  )
}
