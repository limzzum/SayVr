import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import {
  StudyDetailResponseDto,
  updateStudy,
} from "../../api/StudyPageAPI/StudyAPI";

interface UpdateNewListModalProps {
  showModal: boolean;
  handleClose: () => void;
  readStudyInfo: StudyDetailResponseDto | undefined;
  setStudyDetailInfo: React.Dispatch<
    React.SetStateAction<StudyDetailResponseDto | undefined>
  >;
  // goToDetail: (newStudy: number) => void;
}

export interface UpdateStudyRequestDto {
  name: string | undefined;
  maxPeople: number | undefined;
  description: string | undefined;
  rule: string | undefined;
}
const UpdateNewStudyModal: React.FC<UpdateNewListModalProps> = ({
  showModal,
  handleClose,
  readStudyInfo,
  setStudyDetailInfo,
  // goToDetail,
}) => {
  const [studyForm, setStudyForm] = useState<UpdateStudyRequestDto>({
    name: "",
    maxPeople: undefined,
    description: "",
    rule: "",
  });

  useEffect(() => {
    if (readStudyInfo) {
      setStudyForm({
        name: readStudyInfo.studyInfoDto.name,
        maxPeople: readStudyInfo.studyInfoDto.maxPeople,
        description: readStudyInfo.studyInfoDto.description,
        rule: readStudyInfo.studyInfoDto.rule,
      });
    }
  }, [readStudyInfo, handleClose]);

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
      alert("이름을 입력해주세요"); // 이름 글자수 제한두기
      return;
    } else {
      updateStudy(readStudyInfo?.studyInfoDto.studyId, studyForm)
        .then((res) => {
          console.log(res.data);
          setStudyDetailInfo(res.data.data);
          handleClose();
        })
        .catch((error) => {
          console.error("스터디 수정 중 오류 발생", error);
        });
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>스터디 정보 수정하기</Modal.Title>
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

export default UpdateNewStudyModal;
