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
import { Button, Form } from "react-bootstrap";
import { BsChevronLeft } from "react-icons/bs";
import AddIcon from "../../../components/VocabListComponents/Icons/AddIcon";
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
  const refreshDeckInfo = (updated: DeckDetailResponseDto) => {
    props = updated;
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
          onClick={() => changeView("main")}
        >
          <BsChevronLeft />
        </Button>
      </>
    );
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
                <h1>
                  <BackArrow />
                  {props.name}
                </h1>
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
                    <div className="row">
                      <div className="col-11">
                        <Form>
                          <Form.Group className="mb-3" controlId="eng">
                            <Form.Label>영문</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter"
                              onChange={handleInputChange}
                              value={wordForm.eng}
                            />
                          </Form.Group>{" "}
                          <Form.Group className="mb-3" controlId="kor">
                            <Form.Label>한글</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter"
                              onChange={handleInputChange}
                              value={wordForm.kor}
                            />
                          </Form.Group>
                        </Form>
                      </div>

                      {/* <form
                        onSubmit={() => addWord}
                        style={{ width: "1000px" }}
                      >
                        <input
                          type="text"
                          onChange={handleInputChange}
                          value={wordForm.eng}
                          placeholder="Enter"
                        ></input>
                        <hr></hr>
                        <input
                          type="text"
                          onChange={handleInputChange}
                          value={wordForm.kor}
                          placeholder="입력"
                        ></input>
                      </form> */}
                      <div
                        className="col-1"
                        style={{ display: "flex",justifyContent: "center",alignItems:"center" }}
                      >
                        <IconButton
                          icon={<AddIcon />}
                          size={45}
                          handleButtonClick={addWord}
                        />
                      </div>
                    </div>
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
