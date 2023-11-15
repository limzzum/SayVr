// SettingsModal.tsx
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import {updateStudyDeckSettings,StudyDeckOneDetailResponseDto,deleteStudyDeck} from "../../api/StudyPageAPI/StudyAPI"

import { useLocation, useNavigate } from "react-router-dom";

interface SettingsModalProps {
  showModal: boolean;
  handleClose: () => void;
  id: number;
  handleRefresh: (updated: StudyDeckOneDetailResponseDto) => void;
  info: StudyDeckOneDetailResponseDto;
  studyId : Number;
}
export interface DeckSettingsUpdateRequestDto {
  studyDeckId : Number,
  name: string
}
const StudyDeckSettingsModal: React.FC<SettingsModalProps> = ({
  showModal,
  handleClose,
  handleRefresh,
  info,
  id,
  studyId
}) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("settings");
 
  const [flashcardForm, setFlashcardForm] =
    useState<DeckSettingsUpdateRequestDto>({
      name: info.name,
      studyDeckId: id,
    });
    
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type} = event.target;
    if (type === "text") {
      setFlashcardForm((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const changeMode = (mode: string) => {
    setMode(mode);
  };
  

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!flashcardForm.name) {
      alert("제목을 입력해주세요");
      return;
    } else {
      // console.log(flashcardForm)
      updateStudyDeckSettings(studyId, flashcardForm)
        .then((res) => {
          // console.log(res.data.data.id)
          handleClose();
          handleRefresh(res.data.data);
          // navigate(`/flashcard/${id}`);
        })
        .catch((error) => {
          console.error("Error updating deck", error);
          alert("단어장 정보를 수정하는데 실패했습니다.");
        });
    }
  };
  useEffect(() => {
    if (info) {
      setFlashcardForm({
        name: info.name,
        studyDeckId: id,
      });
      // console.log("useeffect")
      // console.log(flashcardForm)
    }
  }, []);

  const handleDelete = () => {
    deleteStudyDeck(studyId,id).then((res) => {
      let message = res.data.data.message;
      // console.log(message)
      if (message === "단어장이 삭제되었습니다") {
        navigate(`/study/${studyId}`);
      } else {
        alert(message);
      }
    });
  };
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>단어장 설정 </Modal.Title>
      </Modal.Header>{" "}
      {mode === "settings" && (
        <>
          <Modal.Body
            className="row popup-modal-settings"
            style={{ margin: "1rem" }}
          >
            <Form.Label htmlFor="title">제목</Form.Label>
            <Form.Control
              type="text"
              name="name"
              id="flashcard-title"
              value={flashcardForm.name}
              placeholder="단어장 제목을 입력해주세요"
              onChange={handleInputChange}
            />
            <div className="row mt-4">
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
            <h3>
              단어장 <b>'{info.name}'</b>을/를 삭제하시겠습니까?
            </h3>
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
    </Modal>
  );
};

export default StudyDeckSettingsModal;
