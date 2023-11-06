// SettingsModal.tsx
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { DeckDetailResponseDto, resetDeckProgress, updateDeckSettings } from "../../api/VocabListAPI/FlashcardsAPI";
import { PrivacyStatus } from "./CreateNewListModal";
import { useNavigate } from "react-router-dom";

interface SettingsModalProps {
  showModal: boolean;
  handleClose: () => void;
  id:number,
  handleRefresh:(updated:DeckDetailResponseDto)=>void,
  info: DeckDetailResponseDto;
}
export interface DeckSettingsUpdateRequestDto {
  name: string;
  flashcardStatus: PrivacyStatus;
}
const DeckSettingsModal: React.FC<SettingsModalProps> = ({
  showModal,
  handleClose,
handleRefresh,
  info,
  id,
}) => {
  const navigate = useNavigate()
  const [mode, setMode] = useState("settings");
  const [flashcardForm, setFlashcardForm] =
    useState<DeckSettingsUpdateRequestDto>({
      name: info.name,
      flashcardStatus: info.status,
    });
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    if (type === "text") {

      setFlashcardForm((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else if (type === "checkbox") {

      const newPrivacyStatus = checked
        ? PrivacyStatus.PUBLIC
        : PrivacyStatus.PRIVATE;
      setFlashcardForm((prevData) => ({
        ...prevData,
        [name]: newPrivacyStatus,
      }));
    }
  };
  const changeMode = (mode: string) => {
    setMode(mode);
  };
  const handleReset = () => {
    resetDeckProgress(id)
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!flashcardForm.name) {
      alert("제목을 입력해주세요");
      return;
    } else {
      console.log(flashcardForm);
      updateDeckSettings(id,flashcardForm)
        .then((res) => {
          // navigate()
          console.log(res.data.data.id);
          handleClose();
          handleRefresh(res.data.data)
          // navigate(`/flashcard/${id}`);
        })
        .catch((error) => {
          console.error("Error updating deck", error);
        });
    }
  };
  const handleDelete = () => {};
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>단어장 설정 </Modal.Title>
      </Modal.Header>{" "}
      {mode === "settings" && (
        <>
          <Modal.Body className="row ">
            <p>제목</p>
            <input
              name="name"
              type="text"
              value={flashcardForm.name}
              placeholder="단어장 제목을 입력해주세요"
              onChange={handleInputChange}
            />
            <div className="row mt-2">
              <p className="col-2">공개</p>
              <div className="form-check form-switch col-2">
                <input
                  className="form-check-input"
                  name="privacyStatus"
                  type="checkbox"
                  checked={flashcardForm.flashcardStatus === PrivacyStatus.PUBLIC}
                  id="flexSwitchCheckDefault"
                  onChange={handleInputChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                ></label>
              </div>
              <div className="col-6">
                <Button
                  size="sm"
                  style={{ width: "150px" }}
                  variant="secondary"
                  onClick={() => changeMode("reset")}
                >
                  학습 기록 초기화
                </Button>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => changeMode("delete")}>
              삭제
            </Button>
            <Button variant="light" onClick={handleSubmit}>
              적용
            </Button>
          </Modal.Footer>
        </>
      )}
      {mode === "delete" && (
        <>
          <Modal.Body className="row ">
            <h1>
              단어장
              <br /> '{info.name}'을/를
              <br />
              삭제하시겠습니까?
            </h1>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => handleDelete()}>
              삭제
            </Button>
            <Button variant="light" onClick={() => changeMode("settings")}>
              취소
            </Button>
          </Modal.Footer>
        </>
      )}
      {mode === "reset" && (
        <>
          <Modal.Body className="row ">
            <h1>학습 기록을 초기화하시겠습니까?</h1>
            <h5>*단어의 학습 상태가 초기화 됩니다.</h5>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => handleReset()}>
              초기화
            </Button>
            <Button variant="light" onClick={() => changeMode("settings")}>
              취소
            </Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
};

export default DeckSettingsModal;
