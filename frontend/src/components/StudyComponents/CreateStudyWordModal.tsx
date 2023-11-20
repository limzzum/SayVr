// CreateNewListModal.tsx
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { createStudyDeck } from "../../api/StudyPageAPI/StudyAPI";
import Swal from "sweetalert2";

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
      Swal.fire({
        title: "입력하지 않은 항목이 있습니다.",
        text: "단어장 이름을 입력해주세요",
        icon: "warning",
        confirmButtonColor: "#3396f4",
        confirmButtonText: "확인",
        customClass: {
          confirmButton: "swal-btn-sign",
        },
      });
      return;
    } else {
      createStudyDeck(studyId, flashcardForm)
        .then((res) => {
          console.log(res.data.data);
          handleClose();
          goToDetail(res.data.data.studyDeckId);
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "스터디 단어장을 생성하는데 오류가 방생하였습니다.",
            customClass: {
              confirmButton: "swal-btn-sign",
              icon: "swal-icon-sign",
            },
          });
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
