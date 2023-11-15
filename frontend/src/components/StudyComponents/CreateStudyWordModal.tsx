// CreateNewListModal.tsx
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { createStudyDeck } from "../../api/StudyPageAPI/StudyAPI";

interface CreateNewListModalProps {
  showModal: boolean;
  handleClose: () => void;
  goToDetail: (newDeck: number) => void;
  studyId: Number;
}

export interface CreateFlashcardsRequestDto {
  name: string;
}
const CreateStudyWordModal: React.FC<CreateNewListModalProps> = ({
  showModal,
  handleClose,
  goToDetail,
  studyId,
}) => {
  // const navigate = useNavigate()
  const [flashcardForm, setFlashcardForm] =
    useState<CreateFlashcardsRequestDto>({
      name: "",
    });
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    if (type === "text") {
      // Handle text input changes
      setFlashcardForm((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!flashcardForm.name) {
      alert("제목을 입력해주세요");
      return;
    } else {
      createStudyDeck(studyId, flashcardForm)
        .then((res) => {
          // navigate()
          console.log(res.data.data);
          handleClose();
          goToDetail(res.data.data.studyDeckId);
        })
        .catch((error) => {
          console.error("Error creating deck", error);
        });
    }
  };
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>새 단어장</Modal.Title>
      </Modal.Header>
      <Modal.Body className="row " style={{ margin: "1rem" }}>
        <Form.Label htmlFor="title">제목</Form.Label>
        <Form.Control
          type="text"
          name="name"
          id="flashcard-title"
          value={flashcardForm.name}
          placeholder="단어장 제목을 입력해주세요"
          onChange={handleInputChange}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          취소
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          생성
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateStudyWordModal;
