import React from "react";
import { Button, Modal } from "react-bootstrap";
import { StudyInfoDto, joinStudy } from "../../api/StudyPageAPI/StudyAPI";

interface ReadStudyInfoModalProps {
  showModal: boolean;
  handleClose: () => void;
  goToDetail: (newStudy: number) => void;
  readStudyInfo: StudyInfoDto | undefined;
}

export interface JoinStudyRequestDto {
  studyId: number;
}

const ReadStudyInfoModal: React.FC<ReadStudyInfoModalProps> = ({
  showModal,
  handleClose,
  goToDetail,
  readStudyInfo,
}) => {
  if (!readStudyInfo) {
    return null;
  }

  const handleSubmit = () => {
    const requestData: JoinStudyRequestDto = {
      studyId: readStudyInfo.studyId,
    };

    joinStudy(requestData)
      .then((res) => {
        console.log(res.data);
        if(res.data.httpStatus === "CREATED") {
          handleClose();
          goToDetail(res.data.data.studyId);
        }
      })
      .catch((error) => {
        // TODO : 예외 처리
        console.error("스터디 가입 중 오류 발생", error);
      });
  };

  const { name, currentPeople, maxPeople, description, rule } = readStudyInfo;

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <h2>{name}</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <h3>스터디 현재인원</h3>
          <h3>
            {currentPeople} / {maxPeople}
          </h3>
          <h3>스터디 설명</h3>
          <p>{description}</p>
          <h3>스터디 규칙</h3>
          <p>{rule}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          닫기
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
        >
          스터디 가입
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReadStudyInfoModal;
