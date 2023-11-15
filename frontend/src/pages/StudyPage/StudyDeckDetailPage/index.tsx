import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { BsChevronLeft } from "react-icons/bs";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {WordcardDto,StudyRole, getOneStudyDeck,StudyDeckOneDetailResponseDto,createStudyWordcard} from "../../../api/StudyPageAPI/StudyAPI"
import AddButton from "../../../components/StudyComponents/AddButton";
import { AddLine } from "../../../components/VocabListComponents/AddLine";
import StudyDeckSettingsModal from "../../../components/StudyComponents/StudyDeckSettingModal";
import IconButton from "../../../components/VocabListComponents/IconButton";
import SettingsIcon from "../../../components/VocabListComponents/Icons/SettingsIcon";
import { StudyVocabLine } from "../../../components/StudyComponents/StudyVocabLine";
import "./style.css";
import {CreateWordcardRequestDto} from "../../VocabListPage/DeckDetailPage"
// export interface CreateWordcardRequestDto {
//   kor: string;
//   eng: string;
// }

const StudyDeckDetail: React.FC = () => {
  // const [tempUser, setTempUser] = useState<number>(0);
  const [userStudyRole, setUserStudyRole] = useState<StudyRole>();
  const { studyid, id } = useParams();
  const [deckId, setDeckId] = useState(Number(id));
  const [studyId, setStudyId] = useState(Number(studyid));
  const navigate = useNavigate();
  const [mode, setMode] = useState("button")
  const [deck, setDeck] = useState<StudyDeckOneDetailResponseDto>();

  // const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [wordList, setWordList] = useState<WordcardDto[]>([]);
 

  useEffect(() => {
    if (id) {
      getOneStudyDeck(studyId,deckId)
        .then((res) => {
          setDeck(res.data.data);
          setUserStudyRole(res.data.data.studyRole);
          setWordList(res.data.data.flashcardDto.wordcardList);
        })
        .catch((e) => {
          console.log(e);
          alert("단어장 정보를 불러오는데 실패했습니다.");
        });
    }
  }, [id]);

  const handleSettingsClick = () => {
    setShowModal(true);
  };


  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleBack = () => {
    navigate(-1);
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
      createStudyWordcard(studyId, deckId, wordForm)
        .then((res) => {
          const response = res.data.data;
          // console.log(response);
          if (!response.errorMessage) {
            setWordList((prev) => [...prev, response.wordcard]);
            setMode("button");
          } else {
            alert(response.errorMessage);
          }
        })
        .catch((e) => {
          console.log(e);
          alert("단어를 추가하는데 실패했습니다.");
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
              </div>

              <div style={{ display: "flex" }}>
                {deck && userStudyRole === StudyRole.LEADER ? (
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
                    </div>
                  </>
                )}
              </div>
            </div>
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
                        <StudyVocabLine
                          key={index + "wordcard" + id}
                          props={wordcard}
                          studyId={studyId}
                          deckId={deckId}
                        ></StudyVocabLine>
                      </>
                    );
                  })}
                  <div className="vocab-line">
                    {mode === "button" && (
                      <AddButton
                        handleButtonClick={() => setMode("add")}
                        size="45"
                      />
                    )}
                    {mode === "add" && (
                      <>
                        <AddLine addWord={addWord} />
                      </>
                    )}
                  </div>
                </div>
              </>
          </div>
          <div className="create-new-list-modal">
            {deck && (
              <StudyDeckSettingsModal
                showModal={showModal}
                handleClose={handleCloseModal}
                id={deckId}
                info={deck}
                handleRefresh={setDeck}
                studyId={studyId}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default StudyDeckDetail;
