import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { DeckDetailResponseDto, WordcardDto } from "../../../api/VocabListAPI/FlashcardsAPI"
import AddButton from "../../../components/VocabListComponents/AddButton"
import IconButton from "../../../components/VocabListComponents/IconButton"
import QuizIcon from "../../../components/VocabListComponents/Icons/QuizIcon"
import { VocabLine } from "../../../components/VocabListComponents/VocabLine"
interface DeckDetailProps {
  props?: DeckDetailResponseDto
  changeView: (menu: string) => void
}

const DeckLearn: React.FC<DeckDetailProps> = ({ props, changeView }) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("button") //button add
  const [wordList, setWordList] = useState<WordcardDto[]>([])
  useEffect(() => {
    if (props && props.flashcardDto) {
      setWordList(props.flashcardDto.wordcardList)
    }
  }, [props])

  if (!props) {
    return (
      <>
        <h1>잘못된 접근입니다.</h1>
      </>
    )
  }
  // if (isDeckCreate(props))
  return (
    <>
      <div className='container mt-5' style={{ borderColor: "transparent" }}>
        <div
          className='vocab-list-container row card-row justify-content-center align-items-center '
          style={{ borderColor: "transparent" }}
        >
          <div className='row justify-content-center align-items-center'>
            <div className='title-space' style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <h1>{props.name}</h1>
              </div>

              <div style={{ display: "flex" }}>
                <div>
                  <IconButton
                    icon={<QuizIcon />}
                    size={55}
                    handleButtonClick={() => {
                      // navigate(-1);
                      changeView("main")
                      console.log("go back")
                    }}
                  ></IconButton>
                </div>
                <div>
                  <IconButton icon={<QuizIcon />} size={55} handleButtonClick={() => console.log("quiz")}></IconButton>
                </div>
                <div>
                  <IconButton icon={<QuizIcon />} size={55} handleButtonClick={() => console.log("quiz")}></IconButton>
                </div>
              </div>
            </div>
            <div style={{ marginTop: "100px", borderRadius: "10px", backgroundColor: "aliceblue", minHeight: "70vh" }}>
              {wordList?.map((wordcard, index) => {
                return (
                  <>
                    <VocabLine key={index + "wordcard" + props.id} props={wordcard}></VocabLine>
                  </>
                )
              })}
              <div className='vocab-line'>{mode === "button" && <AddButton handleButtonClick={()=>setMode("add")} size='45' />}
              {mode === "add" && 
              <>
              <form>
                <input type="text"></input>
                <hr></hr>
                <input type="text"></input>
              </form>
              </>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default DeckLearn
