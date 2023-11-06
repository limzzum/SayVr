import { useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { BsChevronLeft } from "react-icons/bs"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { DeckDetailResponseDto, ProgressStatus, WordcardDto, createWordcard, getOneDeck } from "../../../api/VocabListAPI/FlashcardsAPI"
import AddButton from "../../../components/VocabListComponents/AddButton"
import { PrivacyStatus } from "../../../components/VocabListComponents/CreateNewListModal"
import DeckSettingsModal from "../../../components/VocabListComponents/DeckSettingModal"
import IconButton from "../../../components/VocabListComponents/IconButton"
import AddIcon from "../../../components/VocabListComponents/Icons/AddIcon"
import LearnIcon from "../../../components/VocabListComponents/Icons/LearnIcon"
import QuizIcon from "../../../components/VocabListComponents/Icons/QuizIcon"
import SettingsIcon from "../../../components/VocabListComponents/Icons/SettingsIcon"
import { VocabLine } from "../../../components/VocabListComponents/VocabLine"
import DeckLearn from "../DeckLearnPage"
// interface DeckDetailProps {
//   props?: DeckDetailResponseDto
//   changeView: (menu: string) => void
// }

export interface CreateWordcardRequestDto {
  kor: string
  eng: string
}
// const DeckDetail: React.FC<DeckDetailProps> = ({ props, changeView }) => {
const DeckDetail: React.FC = () => {
  const { id } = useParams()
  const [deckId, setDeckId] = useState(Number(id))
  const navigate = useNavigate()
  const location = useLocation()
  const [menu, setMenu] = useState("detail")
  const [deck, setDeck] = useState<DeckDetailResponseDto>({
    id: 0,
    flashcardDeckId: 0,
    flashcardDto: {
      wordcardList: [], // Initialize with an empty array
    },
    name: "",
    nickname: "",
    userId: 0,
    savingProgressStatus: ProgressStatus.DISABLED,
    status: PrivacyStatus.PRIVATE,
    forkCount: 0,
    wordCount: 0,
  })
  // const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false)
  const [mode, setMode] = useState("button") //button add
  const [wordForm, setWordForm] = useState<CreateWordcardRequestDto>({
    kor: "",
    eng: "",
  })
  const [wordList, setWordList] = useState<WordcardDto[]>([])
  // useEffect(() => {
  //   if (props && props.flashcardDto) {
  //     setWordList(props.flashcardDto.wordcardList)
  //   }
  // }, [props])
  useEffect(() => {
    if (id) {
      getOneDeck(deckId)
        .then((res) => {
          setDeck(res.data.data)
          console.log(deck)
          setWordList(res.data.data.flashcardDto.wordcardList)
        })
        .catch((e) => console.log(e))
    }
  }, [id])

  const handleSettingsClick = () => {
    setShowModal(true)
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target
    if (type === "text") {
      // Handle text input changes
      setWordForm((prevData) => ({
        ...prevData,
        [name]: value,
      }))
    }
  }
  if (!id) {
    return (
      <>
        <h1>잘못된 접근입니다.</h1>
      </>
    )
  }
  const addWord = () => {
    if (id) {
      createWordcard(deckId, wordForm)
        .then((res) => {
          const response = res.data.data
          console.log(response)
          if (!response.errorMessage) {
            setWordList((prev) => [...prev, response.wordcard])
          } else {
            alert(response.errorMessage)
          }

          // wordList.push(res.data.data.wordcard)
          // navigate(location.pathname);
        })
        .catch((e) => console.log(e))
    }
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
                  ></IconButton>
                </div>
                <div>
                  <IconButton
                    icon={<LearnIcon />}
                    size={55}
                    handleButtonClick={() => {
                      console.log("learn")
                      setMenu("learn")
                    }}
                  ></IconButton>
                </div>
                <div>
                  <IconButton icon={<SettingsIcon />} size={55} handleButtonClick={handleSettingsClick}></IconButton>
                </div>
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
                        <div className='row'>
                          <div className='col-11'>
                            <Form>
                              <Form.Group className='mb-3' controlId='eng'>
                                <Form.Label>영문</Form.Label>
                                <Form.Control
                                  type='text'
                                  placeholder='Enter'
                                  name='eng'
                                  onChange={handleInputChange}
                                  value={wordForm.eng}
                                />
                              </Form.Group>{" "}
                              <Form.Group className='mb-3' controlId='kor'>
                                <Form.Label>한글</Form.Label>
                                <Form.Control type='text' placeholder='입력' name='kor' onChange={handleInputChange} value={wordForm.kor} />
                              </Form.Group>
                            </Form>
                          </div>
                          <div className='col-1' style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <IconButton icon={<AddIcon />} size={45} handleButtonClick={addWord} />
                          </div>
                        </div>
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
          <DeckLearn changeView={setMenu} props={deck} />
        </>
      )}
    </>
  )
}
export default DeckDetail
