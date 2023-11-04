import { FC, useState } from "react"
import { WordcardDto } from "../../api/VocabListAPI/FlashcardsAPI"
import AddButton from "./AddButton"

interface VocabLineProps {
  props?: WordcardDto
}

export const VocabLine: FC<VocabLineProps> = ({props}) => {
  
  return (
    <>
      <div className='vocab-line'>
        <div>{props?.kor}</div>
		<div>{props?.eng}</div>
		
      </div>
    </>
  )
}
