import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
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
import { PrivacyStatus } from "../../../components/VocabListComponents/CreateNewListModal"
import DeckSettingsModal from "../../../components/VocabListComponents/DeckSettingModal"
import IconButton from "../../../components/VocabListComponents/IconButton"
import ForkIcon from "../../../components/VocabListComponents/Icons/ForkIcon"
import LearnIcon from "../../../components/VocabListComponents/Icons/LearnIcon"
import QuizIcon from "../../../components/VocabListComponents/Icons/QuizIcon"
import SettingsIcon from "../../../components/VocabListComponents/Icons/SettingsIcon"
import Speak from "../../../components/VocabListComponents/Speak"
import { VocabLine } from "../../../components/VocabListComponents/VocabLine"
import DeckLearn from "../DeckLearnPage"

export interface CreateWordcardRequestDto {
  kor: string
  eng: string
}
// const DeckDetail: React.FC<DeckDetailProps> = ({ props, changeView }) => {
const DeckDetail: React.FC = () => {
  const [tempUser, setTempUser] = useState({
    name: "유저이름",
    nickname: "닉네임",
    id: 1,
  });
  const { id } = useParams();
  const [deckId, setDeckId] = useState(Number(id));
  const navigate = useNavigate();
  const location = useLocation();
  const [menu, setMenu] = useState("detail");
  const [deck, setDeck] = useState<DeckDetailResponseDto>();

  // const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false)
  const [mode, setMode] = useState("button") //button add
  const [wordList, setWordList] = useState<WordcardDto[]>([])
  // useEffect(() => {
  //   if (props && props.flashcardDto) {
  //     setWordList(props.flashcardDto.wordcardList)
  //   }
  // }, [props])
  // const
  useEffect(() => {
    if (id) {
      getOneDeck(deckId)
        .then((res) => {
          setDeck(res.data.data);
          // console.log(deck);
          setWordList(res.data.data.flashcardDto.wordcardList);
        })
        .catch((e) => {
          console.log(e);
          alert("단어장 정보를 불러오는데 실패했습니다.");
        });
    }
  }, [id, menu])
  useEffect(() => {
    if (id) {
      getOneDeck(deckId)
        .then((res) => {
          setDeck(res.data.data);
          // console.log(deck);
          setWordList(res.data.data.flashcardDto.wordcardList);
        })
        .catch((e) => {
          console.log(e);
          alert("단어장 정보를 불러오는데 실패했습니다.");
        });
    }
  }, [])

  const handleSettingsClick = () => {
    setShowModal(true)
  }
  const handleForkClick = () => {
    if (deck && deck !== null) {
      let message = `단어장 '${deck.name}'을/를 복사하겠습니까?`;
      if (window.confirm(message)) {
        createForkedDeck(deck.id).then((res) => {
          navigate(`/flashcard/${res.data.data.id}`);
        });
      }
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }
  const refreshDeckInfo = () => {
    navigate(`/flashcard/${deckId}`)
  }
  const handleBack = () => {
    navigate(-1)
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
          const response = res.data.data;
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
          console.log(e);
          alert("단어를 추가하는데 실패했습니다.");
        });
    }
  }

  return (
    <>
      <div className='container mt-5' style={{ borderColor: "transparent", width: "70vw" }}>
        <div
          className='vocab-list-container row card-row justify-content-center align-items-center '
          style={{ borderColor: "transparent" }}
        >
          <div className='row justify-content-center align-items-center'>
            <div className='title-space' style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <h1>
                  <BackArrow />
                  {deck?.name}
                </h1>
              </div>

              <div style={{ display: "flex" }}>

                <div>
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
                </div>
                <div>
                  <IconButton
                    icon={<LearnIcon />}
                    size={55}
                    handleButtonClick={() => {
                      // console.log("learn");
                      setMenu("learn");
                    }}
                    onHover
                  ></IconButton>
                </div>
                {deck && tempUser.id === deck.userId ? (
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
                        <VocabLine key={index + "wordcard" + id} props={wordcard}></VocabLine>
                      </>
                    )
                  })}
                  <div className='vocab-line'>
                    {mode === "button" && <AddButton handleButtonClick={() => setMode("add")} size='45' />}
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
            <DeckSettingsModal showModal={showModal} handleClose={handleCloseModal} id={deckId} info={deck} handleRefresh={setDeck} />
          </div>
        </div>
      </div>
      {menu === "learn" && (
        <>
          <DeckLearn handleRefresh={setDeck} changeView={setMenu} props={deck} />
        </>
      )}
      {menu === "quiz" && (
        <>
          <Speak word='yes' />
        </>
      )}
    </>
  )
}
export default DeckDetail
