import { useEffect, useState } from "react"
import { Alert, Button, Toast } from "react-bootstrap"
import { BsChevronLeft } from "react-icons/bs"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import {
  DeckDetailResponseDto,
  ProgressStatus,
  WordcardDto,
  createForkedDeck,
  createWordcard,
  getOneDeck,
} from "../../../api/VocabListAPI/FlashcardsAPI"
import AddButton from "../../../components/VocabListComponents/AddButton"
import { AddLine } from "../../../components/VocabListComponents/AddLine"
import DeckSettingsModal from "../../../components/VocabListComponents/DeckSettingModal"
import IconButton from "../../../components/VocabListComponents/IconButton"
import ForkIcon from "../../../components/VocabListComponents/Icons/ForkIcon"
import LearnIcon from "../../../components/VocabListComponents/Icons/LearnIcon"
import SettingsIcon from "../../../components/VocabListComponents/Icons/SettingsIcon"
import { VocabLine } from "../../../components/VocabListComponents/VocabLine"
import DeckLearn from "../DeckLearnPage"
import "./style.css"
import { useRecoilValue } from "recoil"
import { loggedIdState } from "../../../recoil/GoalbalState"

export interface CreateWordcardRequestDto {
  kor: string
  eng: string
}
// const DeckDetail: React.FC<DeckDetailProps> = ({ props, changeView }) => {
const DeckDetail: React.FC = () => {
  // const [loginUser, setLoginUser] = useState<number>(Number(useRecoilValue(loggedIdState)))
  const loggedUserId = localStorage.getItem("userId")?Number(localStorage.getItem("userId")):0;
  const { id } = useParams()
  const [deckId, setDeckId] = useState(Number(id))
  const navigate = useNavigate()
  const location = useLocation()
  const [menu, setMenu] = useState("detail")
  const [deck, setDeck] = useState<DeckDetailResponseDto>()
  const [show, setShow] = useState(false)
  // const [show,setShow]=useState(false);

  // const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false)
  const [mode, setMode] = useState("button") //button add
  const [wordList, setWordList] = useState<WordcardDto[]>([])
  // useEffect(() => {
  //   if (props && props.flashcardDto) {
  //     setWordList(props.flashcardDto.wordcardList)
  //   }
  // }, [props])
  // useEffect(() => {

  // }, [])

  // const
  useEffect(() => {
    if (id) {
      getOneDeck(deckId)
        .then((res) => {
          setDeck(res.data.data)
          console.log("메뉴 변경시 다시 가져온 정보")
          console.log(deck)
          setWordList(res.data.data.flashcardDto.wordcardList)
        })
        .catch((e) => {
          console.log(e)
          alert("단어장 정보를 불러오는데 실패했습니다.")
        })
    }
  }, [id, setMenu])
  useEffect(() => {
    console.log(loggedUserId)
    // setLoginUser(loggedUserId)
    // console.log("set user id"+ loggedUserId)
    // return () => {}
    if (id) {
      getOneDeck(deckId)
        .then((res) => {
          setDeck(res.data.data)
          // console.log(deck);
          setWordList(res.data.data.flashcardDto.wordcardList)
        })
        .catch((e) => {
          console.log(e)
          alert("단어장 정보를 불러오는데 실패했습니다.")
        })
    }
  }, [])

  const handleSettingsClick = () => {
    setShowModal(true)
  }
  const handleForkClick = () => {
    if (deck && deck !== null) {
      let message = `단어장 '${deck.name}'을/를 복사하겠습니까?`
      if (window.confirm(message)) {
        createForkedDeck(deck.id).then((res) => {
          navigate(`/flashcard/${res.data.data.id}`)
        })
      }
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }
  const refreshDeckInfo = () => {
    navigate(`/flashcard/${deckId}`)
  }
  const refreshDeck = () => {
    navigate(`/flashcard/${deckId}`)
  }
  const handleBack = () => {
    navigate(-1)
  }
  const goToLearn = () => {
    if (wordList.length > 0) {
      setMenu("learn")
    } else {
      alert("학습모드를 위해 단어가 하나 이상 존재해야 합니다")
    }
  }
  const BackArrow = () => {
    return (
      <>
        <Button
          style={{
            borderColor: "transparent",
            color: "black",
            backgroundColor: "transparent",
            width: "50px",
          }}
          onClick={handleBack}
        >
          <BsChevronLeft />
        </Button>
      </>
    )
  }

  if (!id) {
    return (
      <>
        <h1>잘못된 접근입니다.</h1>
      </>
    )
  }
  const addWord = (wordForm: CreateWordcardRequestDto) => {
    if (id) {
      createWordcard(deckId, wordForm)
        .then((res) => {
          const response = res.data.data
          // console.log(response);
          if (!response.errorMessage) {
            setWordList((prev) => [...prev, response.wordcard])
            setMode("button")
          } else {
            alert(response.errorMessage)
          }

          // wordList.push(res.data.data.wordcard)
          // navigate(location.pathname);
        })
        .catch((e) => {
          console.log(e)
          alert("단어를 추가하는데 실패했습니다.")
        })
    }
  }

  return (
    <>
      <div className='container mt-5 box-width'>
        <div className='vocab-list-container row card-row page-box'>
          <div className='row center-middle'>
            <div className='title-space'>
              <div className='title-left'>
                <BackArrow />
                <h1>{deck?.name}</h1>
                {/* <h1>test 단어장 주인: {deck?.userId} 로그인 유저 recoil:{loggedUserId}, </h1> */}
              </div>
              <div style={{ display: "flex" }}>
                {/* <div>
                  <IconButton
                    icon={<QuizIcon />}
                    size={55}
                    handleButtonClick={() => {
                      // navigate(-1);
                      // changeView("main")
                      setMenu("quiz")
                    }}
                    onHover
                  ></IconButton>
                </div> */}
                {menu === "learn" && deck?.savingProgressStatus === ProgressStatus.DISABLED && (
                  <div style={{ marginRight: "1rem" }}>
                    <Alert variant='warning' dismissible>
                      학습 기록이 저장되지 않습니다.
                    </Alert>
                  </div>
                )}
                <div style={{ marginRight: "1rem" }}>
                  <IconButton
                    icon={<LearnIcon />}
                    size={55}
                    handleButtonClick={() => {
                      // console.log("learn");
                      goToLearn()
                    }}
                    onHover
                  ></IconButton>
                </div>
                {deck && loggedUserId === deck.userId ? (
                  <>
                    <div>
                      <IconButton onHover icon={<SettingsIcon />} size={55} handleButtonClick={handleSettingsClick}></IconButton>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <IconButton onHover icon={<ForkIcon />} size={55} handleButtonClick={handleForkClick}></IconButton>
                    </div>
                  </>
                )}
              </div>
            </div>
            {menu === "detail" && (
              <>
                <div
                  style={{
                    marginTop: "100px",
                    borderRadius: "10px",
                    backgroundColor: "aliceblue",
                    minHeight: "70vh",
                  }}
                >
                  {wordList?.map((wordcard, index) => {
                    return (
                      <>
                        <VocabLine
                          saveMode={deck ? deck.savingProgressStatus === ProgressStatus.ENABLED : false}
                          key={index + "wordcard" + id}
                          props={wordcard}
                          userId={deck ? deck.userId : 1}
                        ></VocabLine>
                      </>
                    )
                  })}
                  <div className='vocab-line'>
                    {mode === "button" && (
                      <div style={{ display: "flex" }}>
                        <AddButton
                          handleButtonClick={() => {
                            if (loggedUserId === deck?.userId) {
                              setMode("add")
                            } else {
                              setShow(true)
                            }
                          }}
                          size='45'
                        />{" "}
                        <Toast onClose={() => setShow(false)} show={show} delay={3000} as="div" style={{width:"100%"}} autohide >
                          <Toast.Body>
                            단어장의 주인이 아니면 단어를 추가할 수 없습니다. 단어장을 퍼가면 단어를 추가할 수 있습니다.
                          </Toast.Body>
                        </Toast>
                      </div>
                    )}
                    {mode === "add" && (
                      <>
                        <AddLine addWord={addWord} />
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
          <div className='create-new-list-modal'>
            {deck && (
              <DeckSettingsModal showModal={showModal} handleClose={handleCloseModal} id={deckId} info={deck} handleRefresh={setDeck} />
            )}
          </div>
        </div>
      </div>
      {menu === "learn" && (
        <>
          <DeckLearn handleRefresh={setDeck} changeView={setMenu} props={deck} />
        </>
      )}
      {/* {menu === "quiz" && (
        <>
          <Speak word='yes' />
        </>
      )} */}
    </>
  )
}
export default DeckDetail
