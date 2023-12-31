// CreateNewListModal.tsx
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { createPersonalDeck } from "../../api/VocabListAPI/FlashcardsAPI";
import Swal from "sweetalert2";

interface CreateNewListModalProps {
  showModal: boolean;
  handleClose: () => void;
  goToDetail: (newDeck: number) => void;
}
export enum PrivacyStatus {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
  FORKED = "FORKED",
}
export interface CreateFlashcardsRequestDto {
  name: string;
  privacyStatus: PrivacyStatus;
}
const CreateNewListModal: React.FC<CreateNewListModalProps> = ({
  showModal,
  handleClose,
  goToDetail,
}) => {
  // const navigate = useNavigate()
  const [flashcardForm, setFlashcardForm] =
    useState<CreateFlashcardsRequestDto>({
      name: "",
      privacyStatus: PrivacyStatus.PRIVATE,
    });
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    if (type === "text") {
      // Handle text input changes
      setFlashcardForm((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else if (name === "flashcardStatus") {
      // Handle checkbox input changes
      const newPrivacyStatus = checked
        ? PrivacyStatus.PUBLIC
        : PrivacyStatus.PRIVATE;
      setFlashcardForm((prevData) => ({
        ...prevData,
        privacyStatus: newPrivacyStatus,
      }));
    }
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!flashcardForm.name) {
      Swal.fire({
        title: "입력하지 않은 항목이 있습니다.",
        text: "제목을 입력해주세요",
        icon: "warning",
        confirmButtonColor: "#3396f4",
        confirmButtonText: "확인",
        customClass: {
          confirmButton: "swal-btn-sign",
        },
      });
      return;
    } else {
      console.log(flashcardForm);
      createPersonalDeck(flashcardForm)
        .then((res) => {
          // navigate()
          console.log(res.data.data.id);
          handleClose();
          goToDetail(res.data.data.id);
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "단어장을 생성하는데 오류가 발생하였습니다.",
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
        <div className="row mt-4">
          <div className="col">
            <Form.Check
              type="switch"
              name="flashcardStatus"
              id="privacy-status"
              label="단어장 공개 여부"
              onChange={handleInputChange}
              checked={flashcardForm.privacyStatus === PrivacyStatus.PUBLIC}
            />
          </div>
        </div>
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

export default CreateNewListModal;
