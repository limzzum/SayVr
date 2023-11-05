import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { DeckDetailResponseDto, WordcardDto } from "../../../api/VocabListAPI/FlashcardsAPI"
import AddButton from "../../../components/VocabListComponents/AddButton"
import IconButton from "../../../components/VocabListComponents/IconButton"
import QuizIcon from "../../../components/VocabListComponents/Icons/QuizIcon"
import { VocabLine } from "../../../components/VocabListComponents/VocabLine"
import LearnIcon from "../../../components/VocabListComponents/Icons/LearnIcon"
import SettingsIcon from "../../../components/VocabListComponents/Icons/SettingsIcon"
import Slider from "react-slick"
import { BsArrowLeft, BsArrowRight } from "react-icons/bs"
interface DeckDetailProps {
  props?: DeckDetailResponseDto
  changeView: (menu: string) => void
}
const carouselSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1, // 한 번에 보여질 카드 수
  slidesToScroll: 1, // 넘어갈 카드 수
  arrows: false,
  nextArrow: <BsArrowRight />,
  prevArrow: <BsArrowLeft />,
  responsive: [
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};
const DeckLearn: React.FC<DeckDetailProps> = ({ props, changeView }) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("button") //button add
  const [wordList, setWordList] = useState<WordcardDto[]>([])
  useEffect(() => {
    if (props && props.flashcardDto) {
      setWordList(props.flashcardDto.wordcardList)
    }
  }, [props])

  // const handl

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
                <h1>{props.name} learn</h1>
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
                  <IconButton icon={<LearnIcon />} size={55} handleButtonClick={() => console.log("quiz")}></IconButton>
                </div>
                <div>
                  <IconButton icon={<SettingsIcon />} size={55} handleButtonClick={() => console.log("quiz")}></IconButton>
                </div>
              </div>
            </div>
            <Slider  {...carouselSettings}>
            <div style={{ marginTop: "100px",  backgroundColor: "aliceblue", minHeight: "70vh" }}>
              
              {wordList?.map((wordcard, index) => {
                return (
                  <>
                    {/* <VocabLine key={index + "wordcard" + props.id} props={wordcard}></VocabLine> */}
                  </>
                )
              })}
              
            </div>    </Slider>
          </div>
        </div>
      </div>
    </>
  )
}
export default DeckLearn
