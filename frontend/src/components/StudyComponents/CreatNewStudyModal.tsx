import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { createStudy } from "../../api/StudyPageAPI/StudyAPI";
import Swal from "sweetalert2";

interface CreateNewListModalProps {
  showModal: boolean;
  handleClose: () => void;
  goToDetail: (newStudy: number) => void;
}

export interface CreateStudyRequestDto {
  name: string;
  maxPeople: number;
  description: string;
  rule: string;
}
const CreateNewStudyModal: React.FC<CreateNewListModalProps> = ({
  showModal,
  handleClose,
  goToDetail,
}) => {
  const [studyForm, setStudyForm] = useState<CreateStudyRequestDto>({
    name: "",
    maxPeople: 12,
    description: "",
    rule: "",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setStudyForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setStudyForm((prevData) => ({
      ...prevData,
      [name]: Number(value),
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!studyForm.name) {
      Swal.fire({
        title: "입력하지 않은 항목이 있습니다.",
        text: "스터디 이름을 입력해주세요",
        icon: "warning",
        confirmButtonColor: "#3396f4",
        confirmButtonText: "확인",
        customClass: {
          confirmButton: "swal-btn-sign",
        },
      });
      return;
    } else {
      createStudy(studyForm)
        .then((res) => {
          console.log(res.data);
          handleClose();
          goToDetail(res.data.data.studyId);
          // TODO ::: 위에 구현
        })
        .catch((e) => {
          Swal.fire({
            icon: "error",
            title: "스터디를 생성하는데 오류가 방생하였습니다.",
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
        <Modal.Title>스터디 만들기</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ margin: "1rem" }}>
        <Form>
          <Form.Label htmlFor="title">스터디 제목</Form.Label>
          <Form.Control
            type="text"
            name="name"
            id="title"
            value={studyForm.name}
            placeholder="스터디 제목을 입력해주세요"
            onChange={handleInputChange}
            style={{ marginBottom: "1rem" }}
          />
          <Form.Label htmlFor="people">최대 참여 인원</Form.Label>
          <Form.Select
            name="maxPeople"
            id="people"
            value={studyForm.maxPeople}
            onChange={handleSelectChange}
            style={{ marginBottom: "1rem" }}
          >
            {Array.from({ length: 11 }, (_, index) => index + 2).map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </Form.Select>
          <Form.Label htmlFor="desc">스터디 설명</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            id="desc"
            name="description"
            value={studyForm.description}
            placeholder="스터디 설명을 입력해주세요"
            onChange={handleInputChange}
            style={{ marginBottom: "1rem" }}
          />
          <Form.Label htmlFor="rules">스터디 규칙</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="rule"
            id="rules"
            value={studyForm.rule}
            placeholder="스터디 규칙을 입력해주세요"
            onChange={handleInputChange}
          />
        </Form>
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

export default CreateNewStudyModal;
