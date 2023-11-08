import { FC, useState } from "react"
import { WordcardDto, WordcardStatus, deleteCard, updateWordProgress } from "../../api/VocabListAPI/FlashcardsAPI"
import IconButton from "./IconButton"
import SoundIcon from "./Icons/SoundIcon"
import UncheckedIcon from "./Icons/UncheckedIcon"
import CheckedIcon from "./Icons/CheckedIcon"
import RemoveIcon from "./Icons/RemoveIcon"

interface VocabLineProps {
  props: WordcardDto
}

export const VocabLine: FC<VocabLineProps> = ({ props }) => {
  const [eng, setEng] = useState(props.eng);
  const [kor, setKor] = useState(props.kor);
  const [status, setStatus] = useState(props.wordcardStatus);
  const textToSpeech = () => {
    console.log(props?.eng)
  }
 const uncheckWord = () => {
    updateWordProgress(props.id, { wordcardStatus: WordcardStatus.UNCHECKED })
      .then()
      .catch((e) => console.log(e))
  }
  const checkWord = () => {
    updateWordProgress(props.id, { wordcardStatus: WordcardStatus.CHECKED })
      .then()
      .catch((e) => console.log(e))
  }
  // const checkWord = () => {}
  const removeWord=()=>{
    deleteCard(props.id).then((res)=>{
      let message = res.data.data.message;
      console.log(res.data.data.message)
      if(message==="단어가 단어장에서 삭제되었습니다."){
            setStatus( WordcardStatus.DELETED)
      }else{
        alert("단어를 삭제할수 없습니다")
      }
  
    })
  }
  return (
    <>
    {
      status !== WordcardStatus.DELETED && <>
      
  
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
            <IconButton icon={<RemoveIcon />} size={37} handleButtonClick={removeWord} />
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
    }
    </>
  )
}
