import { useEffect, useState } from "react";
import { Alert, Button, Toast } from "react-bootstrap";
import { BsChevronLeft } from "react-icons/bs";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  DeckDetailResponseDto,
  ProgressStatus,
  WordcardDto,
  createForkedDeck,
  createWordcard,
  getOneDeck,
} from "../../../api/VocabListAPI/FlashcardsAPI";
import AddButton from "../../../components/VocabListComponents/AddButton";
import { AddLine } from "../../../components/VocabListComponents/AddLine";
import DeckSettingsModal from "../../../components/VocabListComponents/DeckSettingModal";
import IconButton from "../../../components/VocabListComponents/IconButton";
import ForkIcon from "../../../components/VocabListComponents/Icons/ForkIcon";
import LearnIcon from "../../../components/VocabListComponents/Icons/LearnIcon";
import SettingsIcon from "../../../components/VocabListComponents/Icons/SettingsIcon";
import { VocabLine } from "../../../components/VocabListComponents/VocabLine";
import DeckLearn from "../DeckLearnPage";
import "./style.css";
import Swal from "sweetalert2";

export interface CreateWordcardRequestDto {
  kor: string;
  eng: string;
}
// const DeckDetail: React.FC<DeckDetailProps> = ({ props, changeView }) => {
const DeckDetail: React.FC = () => {
  // const [loginUser, setLoginUser] = useState<number>(Number(useRecoilValue(loggedIdState)))
  const [loggedUserId, setLoggedUserId] = useState(
    localStorage.getItem("userId") ? Number(localStorage.getItem("userId")) : 0
  );
  const { id } = useParams();
  const [deckId, setDeckId] = useState(Number(id));
  const navigate = useNavigate();
  const location = useLocation();
  const [menu, setMenu] = useState("detail");
  const [deck, setDeck] = useState<DeckDetailResponseDto>();
  const [show, setShow] = useState(false);
  // const [show,setShow]=useState(false);

  // const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState("button"); //button add
  const [wordList, setWordList] = useState<WordcardDto[]>([]);
  // useEffect(() => {
  //   if (props && props.flashcardDto) {
  //     setWordList(props.flashcardDto.wordcardList)
  //   }
  // }, [props])
  // useEffect(() => {

  // }, [])

  // const
  useEffect(() => {
    setLoggedUserId(
      localStorage.getItem("userId")
        ? Number(localStorage.getItem("userId"))
        : 0
    );
    if (id) {
      getOneDeck(deckId)
        .then((res) => {
          setDeck(res.data.data);
          console.log("메뉴 변경시 다시 가져온 정보");
          console.log(deck);
          setWordList(res.data.data.flashcardDto.wordcardList);
        })
        .catch((e) => {
          Swal.fire({
            icon: "error",
            title: "단어장을 조회하는데 오류가 방생하였습니다.",
            customClass: {
              confirmButton: "swal-btn-sign",
              icon: "swal-icon-sign",
            },
          });
        });
    }
  }, [id, setMenu]);
  useEffect(() => {
    console.log(loggedUserId);
    setLoggedUserId(
      localStorage.getItem("userId")
        ? Number(localStorage.getItem("userId"))
        : 0
    );
    // console.log("set user id"+ loggedUserId)
    // return () => {}
    if (id) {
      console.log("단어장 정보가져오기");
      getOneDeck(deckId)
        .then((res) => {
          setDeck(res.data.data);
          // console.log(deck);
          setWordList(res.data.data.flashcardDto.wordcardList);
        })
        .catch((e) => {
          Swal.fire({
            icon: "error",
            title: "단어장을 조회하는데 오류가 방생하였습니다.",
            customClass: {
              confirmButton: "swal-btn-sign",
              icon: "swal-icon-sign",
            },
          });
        });
    }
  }, []);

  const handleSettingsClick = () => {
    setShowModal(true);
  };
  const handleForkClick = () => {
    if (deck && deck !== null) {
      let message = `단어장 '${deck.name}'을/를 복사하겠습니까?`;
      Swal.fire({
        title: message,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#4461F2",
        cancelButtonColor: "#d33",
        confirmButtonText: "확인",
        cancelButtonText: "취소",
        reverseButtons: true, // 버튼 순서 거꾸로
        customClass: {
          confirmButton: "swal-btn-login",
          icon: "swal-icon-login",
          cancelButton: "swal-btn-login",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          createForkedDeck(deck.id)
            .then((res) => {
              navigate(`/flashcard/${res.data.data.id}`);
              navigate(0);
            })
            .catch((e) => {
              Swal.fire({
                icon: "error",
                title: "단어장을 포크하는데 오류가 방생하였습니다.",
                customClass: {
                  confirmButton: "swal-btn-sign",
                  icon: "swal-icon-sign",
                },
              });
            });
        }
      });
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const refreshDeckInfo = () => {
    navigate(`/flashcard/${deckId}`);
  };
  const refreshDeck = () => {
    navigate(`/flashcard/${deckId}`);
  };
  const handleBack = () => {
    navigate(-1);
  };
  const goToLearn = () => {
    if (wordList.length > 0) {
      setMenu("learn");
    } else {
      Swal.fire({
        icon: "warning",
        title: "학습모드를 위해 단어가 하나 이상 존재해야 합니다",
        customClass: {
          confirmButton: "swal-btn-sign",
          icon: "swal-icon-sign",
        },
      });
    }
  };
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
    );
  };

  if (!id) {
    return (
      <>
        <h1>잘못된 접근입니다.</h1>
      </>
    );
  }
  const addWord = (wordForm: CreateWordcardRequestDto) => {
    if (id) {
      createWordcard(deckId, wordForm)
        .then((res) => {
          const response = res.data.data;
          // console.log(response);
          if (!response.errorMessage) {
            setWordList((prev) => [...prev, response.wordcard]);
            setMode("button");
          } else {
            Swal.fire({
              icon: "warning",
              title: response.errorMessage,
              customClass: {
                confirmButton: "swal-btn-sign",
                icon: "swal-icon-sign",
              },
            });
          }

          // wordList.push(res.data.data.wordcard)
          // navigate(location.pathname);
        })
        .catch((e) => {
          Swal.fire({
            icon: "error",
            title: "단어를 생성하는데 오류가 방생하였습니다.",
            customClass: {
              confirmButton: "swal-btn-sign",
              icon: "swal-icon-sign",
            },
          });
        });
    }
  };

  return (
    <>
      <div className="container mt-5 box-width">
        <div className="vocab-list-container row card-row page-box">
          <div className="row center-middle">
            <div className="title-space">
              <div className="title-left">
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
                {menu === "learn" &&
                  deck?.savingProgressStatus === ProgressStatus.DISABLED && (
                    <div style={{ marginRight: "1rem" }}>
                      <Alert variant="warning" dismissible>
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
                      goToLearn();
                    }}
                    onHover
                  ></IconButton>
                </div>
                {deck && loggedUserId === deck.userId ? (
                  <>
                    <div>
                      <IconButton
                        onHover
                        icon={<SettingsIcon />}
                        size={55}
                        handleButtonClick={handleSettingsClick}
                      ></IconButton>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <IconButton
                        onHover
                        icon={<ForkIcon />}
                        size={55}
                        handleButtonClick={handleForkClick}
                      ></IconButton>
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
                          saveMode={
                            deck
                              ? deck.savingProgressStatus ===
                                ProgressStatus.ENABLED
                              : false
                          }
                          key={index + "wordcard" + id}
                          props={wordcard}
                          userId={deck ? deck.userId : 1}
                        ></VocabLine>
                      </>
                    );
                  })}
                  <div className="vocab-line">
                    {mode === "button" && (
                      <div style={{ display: "flex" }}>
                        <AddButton
                          handleButtonClick={() => {
                            if (loggedUserId === deck?.userId) {
                              setMode("add");
                            } else {
                              setShow(true);
                            }
                          }}
                          size="45"
                        />{" "}
                        <Toast
                          onClose={() => setShow(false)}
                          show={show}
                          delay={3000}
                          as="div"
                          style={{ width: "100%" }}
                          autohide
                        >
                          <Toast.Body>
                            단어장의 주인이 아니면 단어를 추가할 수 없습니다.
                            단어장을 퍼가면 단어를 추가할 수 있습니다.
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
          <div className="create-new-list-modal">
            {deck && (
              <DeckSettingsModal
                showModal={showModal}
                handleClose={handleCloseModal}
                id={deckId}
                info={deck}
                handleRefresh={setDeck}
              />
            )}
          </div>
        </div>
      </div>
      {menu === "learn" && (
        <>
          <DeckLearn
            handleRefresh={setDeck}
            changeView={setMenu}
            props={deck}
          />
        </>
      )}
      {/* {menu === "quiz" && (
        <>
          <Speak word='yes' />
        </>
      )} */}
    </>
  );
};
export default DeckDetail;
