import { FC, useEffect, useState } from "react"
import { WordcardDto, WordcardStatus, deleteCard, updateWordProgress } from "../../api/VocabListAPI/FlashcardsAPI"
import "../../pages/VocabListPage/style.css"
import IconButton from "./IconButton"
import CheckedIcon from "./Icons/CheckedIcon"
import RemoveIcon from "./Icons/RemoveIcon"
import UncheckedIcon from "./Icons/UncheckedIcon"
import Speak from "./Speak"
interface VocabLineProps {
  props: WordcardDto
  saveMode:boolean,
}

export const VocabLine: FC<VocabLineProps> = ({ props, saveMode }) => {
  const [status, setStatus] = useState(props.wordcardStatus)
  const [checkIcon, setCheckIcon] = useState("checked-button")
  const [uncheckIcon, setUncheckIcon] = useState("unchecked-button")

  const uncheckWord = () => {
    if(saveMode){
          updateWordProgress(props.id, { wordcardStatus: WordcardStatus.UNCHECKED })
      .then((res) => {
        console.log(res.data.data.wordcard)
        props.wordcardStatus = WordcardStatus.UNCHECKED
        setStatus(WordcardStatus.UNCHECKED)
      })
      .catch((e) => console.log(e))
    }else{
      props.wordcardStatus = WordcardStatus.UNCHECKED;
      setStatus(WordcardStatus.UNCHECKED);
    }

  }
  const checkWord = () => {
    updateWordProgress(props.id, { wordcardStatus: WordcardStatus.CHECKED })
      .then((res) => {
        setStatus(WordcardStatus.CHECKED)
        props.wordcardStatus = WordcardStatus.CHECKED
      })
      .catch((e) => console.log(e))
  }
  // const checkWord = () => {}
  const removeWord = () => {
    deleteCard(props.id).then((res) => {
      let message = res.data.data.message
      console.log(res.data.data.message)
      if (message === "단어가 단어장에서 삭제되었습니다.") {
        setStatus(WordcardStatus.DELETED)
      } else {
        alert("단어를 삭제할수 없습니다")
      }
    })
  }
  useEffect(() => {
    setUncheckIcon(`unchecked-button ${status === WordcardStatus.UNCHECKED ? "unchecked" : ""}`)
    setCheckIcon(`checked-button ${status === WordcardStatus.CHECKED ? "checked" : ""}`)

    return () => {}
  }, [status])

  return (
    <>
      {status !== WordcardStatus.DELETED && (
        <>
          <div className='vocab-line'>
            <div></div>
            <div></div>
            <div className='flex row' style={{ display: "flex" }}>
              <div className='col'>
                <Speak word={props.eng} />
                {/* <IconButton icon={<SoundIcon />} size={37} handleButtonClick={textToSpeech} /> */}
              </div>
              <div className='col'> {props?.eng}</div>
              <div className='col' style={{ display: "flex", justifyContent: "end" }}>
                <IconButton icon={<RemoveIcon />} size={37} handleButtonClick={removeWord} />
              </div>
            </div>
            <hr />
            <div className='flex row' style={{ display: "flex", flexDirection: "row" }}>
              <div className='col'>
                <IconButton icon={<UncheckedIcon />} size={37} handleButtonClick={uncheckWord} className={uncheckIcon} />
              </div>
              <div className='col'>{props?.kor}</div>

              <div className='col' style={{ display: "flex", justifyContent: "end" }}>
                <IconButton
                  icon={<CheckedIcon />}
                  size={37}
                  handleButtonClick={checkWord}
                  className={`checked-button ${status === WordcardStatus.CHECKED ? "checked" : ""}`}
                  onHover={false}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
