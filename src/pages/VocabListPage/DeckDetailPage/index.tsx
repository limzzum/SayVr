import { useEffect, useState } from "react";
import {
  DeckDetailResponseDto,
  WordcardDto,
} from "../../../api/VocabListAPI/FlashcardsAPI";
import AddButton from "../../../components/VocabListComponents/AddButton";
import IconButton from "../../../components/VocabListComponents/IconButton";
import QuizIcon from "../../../components/VocabListComponents/Icons/QuizIcon";
import { VocabLine } from "../../../components/VocabListComponents/VocabLine";
import LearnIcon from "../../../components/VocabListComponents/Icons/LearnIcon";
import SettingsIcon from "../../../components/VocabListComponents/Icons/SettingsIcon";
import SettingsModal from "../../../components/VocabListComponents/SettingsModal";
interface DeckDetailProps {
  props?: DeckDetailResponseDto;
  changeView: (menu: string) => void;
}

export interface CreateWordcardRequestDto {
  kor: string;
  eng: string;
}
const DeckDetail: React.FC<DeckDetailProps> = ({ props, changeView }) => {
  // const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState("button"); //button add
  const [wordForm, setWordForm] = useState<CreateWordcardRequestDto>({
    kor: "",
    eng: "",
  });
  const [wordList, setWordList] = useState<WordcardDto[]>([]);
  useEffect(() => {
    if (props && props.flashcardDto) {
      setWordList(props.flashcardDto.wordcardList);
    }
  }, [props]);
  const handleSettingsClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const refreshDeckInfo = (updated:DeckDetailResponseDto) => {
  props=updated;
  };
  const addWord = () => {};
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target;
    if (type === "text") {
      // Handle text input changes
      setWordForm((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  if (!props) {
    return (
      <>
        <h1>잘못된 접근입니다.</h1>
      </>
    );
  }
  // if (isDeckCreate(props))
  return (
    <>
      <div className="container mt-5" style={{ borderColor: "transparent" }}>
        <div
          className="vocab-list-container row card-row justify-content-center align-items-center "
          style={{ borderColor: "transparent" }}
        >
          <div className="row justify-content-center align-items-center">
            <div
              className="title-space"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
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
                      changeView("main");
                      console.log("go back");
                    }}
                  ></IconButton>
                </div>
                <div>
                  <IconButton
                    icon={<LearnIcon />}
                    size={55}
                    handleButtonClick={() => console.log("quiz")}
                  ></IconButton>
                </div>
                <div>
                  <IconButton
                    icon={<SettingsIcon />}
                    size={55}
                    handleButtonClick={handleSettingsClick}
                  ></IconButton>
                </div>
              </div>
            </div>
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
                      key={index + "wordcard" + props?.id}
                      props={wordcard}
                    ></VocabLine>
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
                    <form onSubmit={() => addWord}>
                      <input
                        type="text"
                        onChange={handleInputChange}
                        value={wordForm.eng}
                        placeholder="Enter word"
                      ></input>
                      <hr></hr>
                      <input
                        type="text"
                        onChange={handleInputChange}
                        value={wordForm.kor}
                        placeholder="단어 입력"
                      ></input>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="create-new-list-modal">
            <SettingsModal
              showModal={showModal}
              handleClose={handleCloseModal}
              id={props.id}
              info={{ name: props.name, flashcardStatus: props.status }}
              goToDetail={refreshDeckInfo}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default DeckDetail;
