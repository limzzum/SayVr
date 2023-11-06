import { useEffect, useRef, useState } from "react"
import { BsArrowLeft, BsArrowRight } from "react-icons/bs"
import Slider from "react-slick"
import { DeckDetailResponseDto, WordcardDto } from "../../../api/VocabListAPI/FlashcardsAPI"
import Wordcard from "../../../components/VocabListComponents/Wordcard"
import { Button } from "react-bootstrap"
interface DeckDetailProps {
  props?: DeckDetailResponseDto
  changeView: (menu: string) => void
}
interface ArrowProps {
  onClick: () => void
}
const carouselSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1, // 한 번에 보여질 카드 수
  slidesToScroll: 1, // 넘어갈 카드 수
  arrows: false,
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
}
const DeckLearn: React.FC<DeckDetailProps> = ({ props, changeView }) => {
  const slider = useRef<Slider | null>(null)
  // const navigate = useNavigate()
  // const [mode, setMode] = useState("button") //button add
  const [wordList, setWordList] = useState<WordcardDto[]>(props?.flashcardDto ? props.flashcardDto.wordcardList : [])
  useEffect(() => {
    if (props && props.flashcardDto.wordcardList.length > 0) {
      setWordList(props.flashcardDto.wordcardList)
      console.log(props)
    }
  }, [])

  // const handl

  if (!props) {
    return (
      <>
        <h1>잘못된 접근입니다.</h1>
      </>
    )
  }
  const ArrowLeft = (props: ArrowProps) => {
    return (
      <>
        <Button
          style={{
            borderColor: "transparent",
            color: "black",
            backgroundColor: "transparent",
          }}
          onClick={props.onClick}
        >
          <BsArrowLeft />
        </Button>
      </>
    )
  }
  const ArrowRight = (props: ArrowProps) => {
    return (
      <>
        <Button
          style={{
            borderColor: "transparent",
            color: "black",
            backgroundColor: "transparent",
          }}
          onClick={props.onClick}
        >
          <BsArrowRight />
        </Button>
      </>
    )
  }
  // if (isDeckCreate(props))
  return (
    <>
      <div className='container mt-5' style={{ display: "flex", borderColor: "transparent", justifyContent: "center" }}>
        {/* <div
          className='vocab-list-container row card-row justify-content-center align-items-center '
          style={{ borderColor: "transparent" }}
        > */}
        {/* <div className='row justify-content-center align-items-center'> */}
        {/* <div
          style={{
            marginTop: "100px",
            borderRadius: "10px",
            backgroundColor: "aliceblue",
            minHeight: "70vh",
          }}
        ></div> */}
        <ArrowLeft onClick={() => slider?.current?.slickPrev()} />
        <div style={{ width: "50%" }}>
          <Slider ref={slider} {...carouselSettings}>
            {wordList.filter((wordcard) => wordcard.WordcardStatus === "UNCHECKED").length === 0 ? (
              <div
                className='card'
                style={{
                  display: "flex",
                  backgroundColor: "aliceblue",
                  marginRight: "20px",
                  marginBottom: "20px",
                  height: "450px",
                  justifyContent: "center",
                }}
              >
                <h1>단어를 모두 학습하셨습니다. 초기화하시겠습니까?</h1>
              </div>
            ) : (
              wordList?.map((wordcard, index) => (
                <Wordcard props={wordcard} changeView={changeView} key={index} next={() => slider?.current?.slickNext()} />
              ))
            )}
          </Slider>
        </div>
        <ArrowRight onClick={() => slider?.current?.slickNext()} />

        {/* </div> */}
        {/* </div> */}
      </div>
    </>
  )
}
export default DeckLearn
