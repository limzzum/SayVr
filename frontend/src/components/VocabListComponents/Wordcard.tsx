import { FC, useEffect, useState } from "react"
import { CloseButton } from "react-bootstrap"
import { useLocation, useNavigate } from "react-router-dom"
import { WordcardDto, WordcardStatus, updateWordProgress } from "../../api/VocabListAPI/FlashcardsAPI"
import IconButton from "./IconButton"
import CheckedIcon from "./Icons/CheckedIcon"
import UncheckedIcon from "./Icons/UncheckedIcon"
import Speak from "./Speak"
import "./style.css"
interface WordcardProps {
  props: WordcardDto
  next: () => void
  isSaved:boolean
}
const Wordcard: FC<WordcardProps> = ({ props, next,isSaved }) => {
  const navigate = useNavigate()
  const location = useLocation()
  // if (!props) {
  //   return (
  //     <>
  //       <h1>잘못된 접근입니다.</h1>
  //     </>
  //   )
  // }
  //TODO 잘못된 접근입니다.
  const [status, setStatus] = useState<WordcardStatus>(props.wordcardStatus)
  useEffect(() => {}, [])

  const uncheck = () => {
    if(isSaved){
    updateWordProgress(props.id, { wordcardStatus: WordcardStatus.UNCHECKED })
      .then((res) => {
        setStatus(WordcardStatus.UNCHECKED)
        
      })
      .catch((e) => console.log(e))
    }else{
      props.wordcardStatus = WordcardStatus.UNCHECKED
    }
    next()
  }
  const check = () => {
    if(isSaved){
      updateWordProgress(props.id, { wordcardStatus: WordcardStatus.CHECKED })
      .then(() => {
        
        props.wordcardStatus = WordcardStatus.CHECKED
      })
      .catch((e) => console.log(e))
    }
    next()
  }
  const handleOut = () => {
    // changeView("detail");
    // navigate(location.pathname);
    navigate(0)
  }
  return (
    <>
      {status === WordcardStatus.UNCHECKED && (
        <>
          <div
            className='card wordcard'
          >
            <div
              className='words'
            >
              <div className='button-row'>
                <CloseButton className='close-button' onClick={() => handleOut()} style={{ marginRight: "1rem" }} />
              </div>
              <div className='row'>
                <Speak word={props.eng} />
              </div>
              <div className={"row english-row"}>
                <div className='word-half'>{props.eng}</div>
              </div>
              <hr style={{ border: "solid", height: "5", width: "80%" }} />
              <div className={"row english-row"}>
                <div className='word-half'>{props.kor}</div>
              </div>
              <div className='row'>
                <div style={{ display: "flex" }}>
                  <IconButton className='checked-button checked' icon={<CheckedIcon />} size={45} handleButtonClick={check} />
                  <IconButton className='unchecked-button unchecked' icon={<UncheckedIcon />} size={45} handleButtonClick={uncheck} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
export default Wordcard
