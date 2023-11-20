import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import Slider from "react-slick";
import {
  DeckDetailResponseDto,
  ProgressStatus,
  WordcardDto,
  WordcardStatus,
  getOneDeck,
  resetDeckProgress,
} from "../../../api/VocabListAPI/FlashcardsAPI";
import Wordcard from "../../../components/VocabListComponents/Wordcard";
import "../../../components/VocabListComponents/style.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
interface DeckDetailProps {
  props?: DeckDetailResponseDto;
  changeView: (menu: string) => void;
  handleRefresh: (updated: DeckDetailResponseDto) => void;
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
};
const DeckLearn: React.FC<DeckDetailProps> = ({
  props,
  changeView,
  handleRefresh,
}) => {
  const navigate = useNavigate();
  // const location = useLocation()

  const slider = useRef<Slider | null>(null);

  const [wordList, setWordList] = useState<WordcardDto[]>(
    props?.flashcardDto ? props.flashcardDto.wordcardList : []
  );
  useEffect(() => {
    if (props && props.flashcardDto.wordcardList.length > 0) {
      setWordList(props.flashcardDto.wordcardList);
      console.log(props);
    }
  }, [props]);
  useEffect(() => {
    if (props) {
      console.log("단어장 정보가져오기");
      getOneDeck(props.id)
        .then((res) => {
          // console.log(deck);
          setWordList(res.data.data.flashcardDto.wordcardList);
        })
        .catch((e) => {
          Swal.fire({
            icon: "error",
            title: e.response.data.message,
            customClass: {
              confirmButton: "swal-btn-sign",
              icon: "swal-icon-sign",
            },
          });
        });
    }
  }, []);

  if (!props) {
    return (
      <>
        <h1>잘못된 접근입니다.</h1>
      </>
    );
  }
  const handleReset = () => {
    resetDeckProgress(props?.id)
      .then((res) => {
        handleRefresh(res.data.data);
        setWordList(res.data.data.flashcardDto.wordcardList);
        console.log("reset");
        console.log(res.data.data);
      })
      .then(() => {})
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "단어장을 리셋하는데 오류가 방생하였습니다.",
          customClass: {
            confirmButton: "swal-btn-sign",
            icon: "swal-icon-sign",
          },
        });
      });
  };

  const backToFirst = () => {
    getOneDeck(props.id)
      .then((res) => {
        handleRefresh(res.data.data);
        setWordList(res.data.data.flashcardDto.wordcardList);
      })
      .then(() => {})
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "단어장을 조회하는데 오류가 방생하였습니다.",
          customClass: {
            confirmButton: "swal-btn-sign",
            icon: "swal-icon-sign",
          },
        });
      });
  };

  return (
    <>
      <div
        className="container mt-5"
        style={{
          display: "flex",
          borderColor: "transparent",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "50%" }}>
          <Slider ref={slider} {...carouselSettings}>
            {wordList.every(
              (wordcard) => wordcard.wordcardStatus === WordcardStatus.CHECKED
            ) && (
              <div className="card wordcard">
                <div className="words english-row">
                  <h1>
                    단어를 모두 학습하셨습니다.
                    <br />
                    초기화하시겠습니까?
                  </h1>
                  <div style={{ display: "flex" }}>
                    <Button
                      size="sm"
                      style={{ width: "150px", marginRight: "1rem" }}
                      variant="secondary"
                      onClick={() => handleReset()}
                    >
                      학습 기록 초기화
                    </Button>
                    <Button
                      size="sm"
                      style={{ width: "150px" }}
                      variant="secondary"
                      onClick={() => {
                        // changeView("detail")
                        navigate(0);
                      }}
                    >
                      나가기
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {!wordList.every(
              (wordcard) => wordcard.wordcardStatus === WordcardStatus.CHECKED
            ) &&
              wordList
                ?.filter(
                  (wordcard) =>
                    wordcard.wordcardStatus === WordcardStatus.UNCHECKED
                )
                .map((wordcard, index) => (
                  <Wordcard
                    isSaved={
                      props.savingProgressStatus === ProgressStatus.ENABLED
                    }
                    props={wordcard}
                    key={index}
                    next={() => slider?.current?.slickNext()}
                  />
                ))}
            {!wordList.every(
              (wordcard) => wordcard.wordcardStatus === WordcardStatus.CHECKED
            ) && (
              <div className="card wordcard">
                <div className="words english-row">
                  <h1>
                    단어를 모두 학습하셨습니다.
                    <br />
                    다시 처음으로 돌아갈까요?
                  </h1>
                  <div style={{ display: "flex" }}>
                    <Button
                      size="sm"
                      style={{ width: "150px", marginRight: "1rem" }}
                      variant="secondary"
                      onClick={() => {
                        backToFirst();
                        slider?.current?.slickGoTo(0);
                      }}
                    >
                      처음부터
                    </Button>
                    <Button
                      size="sm"
                      style={{ width: "150px" }}
                      variant="secondary"
                      onClick={() => {
                        // changeView("detail")
                        navigate(0);
                      }}
                    >
                      나가기
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </Slider>
        </div>
      </div>
    </>
  );
};
export default DeckLearn;
