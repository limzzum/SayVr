import { useEffect, useRef, useState } from "react"
import { BsArrowLeft, BsArrowRight } from "react-icons/bs"
import Slider from "react-slick"
import { DeckDetailResponseDto, WordcardDto, WordcardStatus, getOneDeck, resetDeckProgress } from "../../../api/VocabListAPI/FlashcardsAPI"
import Wordcard from "../../../components/VocabListComponents/Wordcard"
import { Button } from "react-bootstrap"
import { useLocation, useNavigate } from "react-router-dom"
interface DeckDetailProps {
  props?: DeckDetailResponseDto
  changeView: (menu: string) => void
  handleRefresh: (updated: DeckDetailResponseDto) => void
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
const DeckLearn: React.FC<DeckDetailProps> = ({ props, changeView, handleRefresh }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const slider = useRef<Slider | null>(null)

  const [wordList, setWordList] = useState<WordcardDto[]>(props?.flashcardDto ? props.flashcardDto.wordcardList : [])
  useEffect(() => {
    if (props && props.flashcardDto.wordcardList.length > 0) {
      setWordList(props.flashcardDto.wordcardList)
      console.log(props)
    }
  }, [props])

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
  const handleReset = () => {
    resetDeckProgress(props?.id)
      .then((res) => {
        handleRefresh(res.data.data)
        setWordList(res.data.data.flashcardDto.wordcardList)
        console.log("reset")
        console.log(res.data.data)
      })
      .then(() => {})
  }
  const backToFirst = () => {
    getOneDeck(props.id)
      .then((res) => {
        handleRefresh(res.data.data)
        setWordList(res.data.data.flashcardDto.wordcardList)
        slider?.current?.slickGoTo(0)
      })
      .then(() => {
      
      })
  }

  return (
    <>
      <div className='container mt-5' style={{ display: "flex", borderColor: "transparent", justifyContent: "center" }}>
        {/* <ArrowLeft onClick={() => slider?.current?.slickPrev()} /> */}
        <div style={{ width: "50%" }}>
          <Slider ref={slider} {...carouselSettings}>
            {wordList.every((wordcard) => wordcard.wordcardStatus === WordcardStatus.CHECKED) ? (
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
                <h1>
                  단어를 모두 학습하셨습니다. 초기화하시겠습니까?{" "}
                  <Button size='sm' style={{ width: "150px" }} variant='secondary' onClick={() => handleReset()}>
                    학습 기록 초기화
                  </Button>
                </h1>
              </div>
            ) : (
              wordList
                ?.filter((wordcard) => wordcard.wordcardStatus === WordcardStatus.UNCHECKED)
                .map((wordcard, index) => (
                  <Wordcard props={wordcard} changeView={changeView} key={index} next={() => slider?.current?.slickNext()} />
                ))
            )}
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
              <div
                className='words'
                style={{ display: "flex", height: "100%", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly" }}
              >
                <h1>단어를 모두 학습하셨습니다. 다시 처음으로 돌아갈까요?</h1>
                <Button size='sm' style={{ width: "150px" }} variant='secondary' onClick={() => backToFirst()}>
                  처음부터
                </Button>
              </div>
            </div>
          </Slider>
        </div>
        {/* <ArrowRight onClick={() => slider?.current?.slickNext()} /> */}

      </div>
    </>
  )
}
export default DeckLearn
