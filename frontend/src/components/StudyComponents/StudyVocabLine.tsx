import { FC, useEffect, useState } from "react"
import { WordcardDto, WordcardStatus, deleteStudyCard } from "../../api/StudyPageAPI/StudyAPI"
import "../../pages/VocabListPage/style.css"
import IconButton from "../VocabListComponents/IconButton"
import CheckedIcon from "../VocabListComponents/Icons/CheckedIcon"
import RemoveIcon from "../VocabListComponents/Icons/RemoveIcon"
import UncheckedIcon from "../VocabListComponents/Icons/UncheckedIcon"
import Speak from "../VocabListComponents/Speak"

interface VocabLineProps {
  props: WordcardDto,
  studyId : Number,
  deckId : Number
}

export const StudyVocabLine: FC<VocabLineProps> = ({ props,studyId,deckId}) => {
  const [status, setStatus] = useState(props.wordcardStatus)
  const [checkIcon, setCheckIcon] = useState("checked-button")
  const [uncheckIcon, setUncheckIcon] = useState("unchecked-button")

  const uncheckWord = () => {
      props.wordcardStatus = WordcardStatus.UNCHECKED;
      setStatus(WordcardStatus.UNCHECKED);
  }

  const checkWord = () => {
        setStatus(WordcardStatus.CHECKED)
        props.wordcardStatus = WordcardStatus.CHECKED
  }

  const removeWord = () => {
    deleteStudyCard(studyId,deckId,props.id).then((res) => {
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
