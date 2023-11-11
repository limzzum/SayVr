import { FC, useEffect, useState } from "react"
import { ProgressStatus, WordcardDto, WordcardStatus, updateWordProgress } from "../../api/VocabListAPI/FlashcardsAPI"
import IconButton from "./IconButton"
import SoundIcon from "./Icons/SoundIcon"
import { GrClose } from "react-icons/gr"
import UncheckedIcon from "./Icons/UncheckedIcon"
import CheckedIcon from "./Icons/CheckedIcon"
import { useLocation, useNavigate } from "react-router-dom"
import Speak from "./Speak"
interface WordcardProps {
  props: WordcardDto
  changeView: (where: string) => void
  next: () => void
}
const Wordcard: FC<WordcardProps> = ({ props, changeView, next }) => {
  const navigate= useNavigate();
  const location = useLocation();
  // if (!props) {
  //   return (
  //     <>
  //       <h1>잘못된 접근입니다.</h1>
  //     </>
  //   )
  // }
  const [status, setStatus] = useState<WordcardStatus>(props.wordcardStatus)
  useEffect(() => {}, [])

  const sound = () => {}
  const uncheck = () => {
    updateWordProgress(props.id, { wordcardStatus: WordcardStatus.UNCHECKED })
      .then((res) => {
        setStatus(WordcardStatus.UNCHECKED)
        props.wordcardStatus = WordcardStatus.UNCHECKED

        next()
      })
      .catch((e) => console.log(e))
  }
  const check = () => {
    updateWordProgress(props.id, { wordcardStatus: WordcardStatus.CHECKED })
      .then(() => {
        next()
        props.wordcardStatus = WordcardStatus.CHECKED
      })
      .catch((e) => console.log(e))
  }
  const handleOut=()=>{
    // changeView("detail");
    // navigate(location.pathname);
    navigate(0)
    
  }
  return (
    <>
      {status === WordcardStatus.UNCHECKED && (
        <>
          <div
            className='card'
            style={{
              display: "flex",
              // width: "24rem",
              backgroundColor: "aliceblue",
              marginRight: "20px",
              marginBottom: "20px",
              height: "450px",
              justifyContent: "center",
            }}
          >
            {/* //이등분 상부 하부 나눈 것 처럼 또 가로로 삼등분 해서 아이콘, 소리 체크 양옆 닫기 달기  */}
            {/* <div style={{ marginTop: "100px", backgroundColor: "aliceblue", minHeight: "70vh" }}> */}
            <div
              className='words'
              style={{ display: "flex", height: "100%", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly" }}
            >
              <div className='row' style={{ width: "100%", display: "flex", flexDirection: "row", justifySelf: "flex-end" }}>
                <IconButton handleButtonClick={() =>handleOut() } icon={<GrClose />} size={45} />
              </div>
              <div className={"top-half row"} style={{ alignItems: "flex-end", display: "flex", width: "100%", flexDirection: "row" }}>
                <div className='col'>
                <Speak word={props.eng} />
                  {/* <IconButton handleButtonClick={sound} icon={<SoundIcon />} size={45} /> */}
                </div>
                <div className='col' style={{ justifySelf: "center" }}>
                  <h1>{props.eng}</h1>
                </div>{" "}
                <div className='col'></div>
              </div>
              <hr style={{ border: "solid", height: "5", width: "80%" }} />
              <div className={""} style={{}}>
                <h1>{props.kor}</h1>
              </div>
              <div className='row'>
                <div style={{ display: "flex" }}>
                  <IconButton icon={<CheckedIcon />} size={45} handleButtonClick={check} />
                  <IconButton icon={<UncheckedIcon />} size={45} handleButtonClick={uncheck} />
                </div>
              </div>
            </div>

            {/* </div>{" "} */}
          </div>
        </>
      )}
    </>
  )
}
export default Wordcard
