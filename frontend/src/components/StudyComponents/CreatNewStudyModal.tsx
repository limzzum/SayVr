import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { createStudy } from "../../api/StudyPageAPI/StudyAPI";

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
      alert("제목을 입력해주세요");
      return;
    } else {
      createStudy(studyForm)
        .then((res) => {
          console.log(res.data);
          // handleClose();
          // goToDetail(res.data.data.id);
          // TODO ::: 위에 구현
        })
        .catch((error) => {
          console.error("스터디 생성 중 오류 발생", error);
        });
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>스터디 만들기</Modal.Title>
      </Modal.Header>
      <Modal.Body className="row">
        <p>스터디 제목</p>
        <input
          name="name"
          type="text"
          value={studyForm.name}
          placeholder="스터디 제목을 입력해주세요"
          onChange={handleInputChange}
        />
        <div className="row mt-2">
          <p className="col-4">최대 참여 인원</p>
          <select
            name="maxPeople"
            value={studyForm.maxPeople}
            onChange={handleSelectChange}
          >
            {Array.from({ length: 11 }, (_, index) => index + 2).map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
        <p>스터디 설명</p>
        <textarea
          name="description"
          value={studyForm.description}
          placeholder="스터디 설명을 입력해주세요"
          onChange={handleInputChange}
        ></textarea>
        <p>스터디 규칙</p>
        <textarea
          name="rule"
          value={studyForm.rule}
          placeholder="스터디 규칙을 입력해주세요"
          onChange={handleInputChange}
        ></textarea>
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
