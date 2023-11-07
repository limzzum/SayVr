import { FC } from "react"
import { WordcardDto } from "../../api/VocabListAPI/FlashcardsAPI"
import IconButton from "./IconButton"
import SoundIcon from "./Icons/SoundIcon"
import UncheckedIcon from "./Icons/UncheckedIcon"
import CheckedIcon from "./Icons/CheckedIcon"
import RemoveIcon from "./Icons/RemoveIcon"

interface VocabLineProps {
  props?: WordcardDto
}

export const VocabLine: FC<VocabLineProps> = ({ props }) => {
  const textToSpeech = () => {
    console.log(props?.eng)
  }
  const uncheckWord = () => {}
  const checkWord = () => {}
  return (
    <>
      <div className='vocab-line'>
        <div></div>
        <div>
          
   
        </div>
        <div className='flex row' style={{ display: "flex" }}>
          <div className="col">
          <IconButton icon={<SoundIcon />} size={37} handleButtonClick={textToSpeech} />
          </div>
          <div className="col">       {props?.eng}</div>
          <div className="col" style={{display:"flex",justifyContent:"end"}}>
            <IconButton icon={<RemoveIcon />} size={37} handleButtonClick={uncheckWord} />
          </div>
        </div>
        <hr />
        <div className='flex row' style={{ display: "flex" }}>
          <div className="col">
            <IconButton icon={<UncheckedIcon />} size={37} handleButtonClick={checkWord} />
          </div>
          <div className="col">{props?.kor}</div>
          <div className="col" style={{display:"flex",justifyContent:"end"}}>
            <IconButton icon={<CheckedIcon />} size={37} handleButtonClick={uncheckWord} />
          </div>
        </div>
      </div>
    </>
  )
}
