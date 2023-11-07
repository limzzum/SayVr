import React from "react";
import { Button, Modal } from "react-bootstrap";
import { StudyInfoDto } from "../../api/StudyPageAPI/StudyAPI";

interface ReadStudyInfoModalProps {
  showModal: boolean;
  handleClose: () => void;
  goToDetail: (newStudy: number) => void;
  readStudyInfo: StudyInfoDto | undefined;
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
          <h3>스터디 목표</h3>
          <p>{rule}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          닫기
        </Button>
        <Button
          variant="primary"
          onClick={() => goToDetail(readStudyInfo.studyId)}
        >
          스터디 가입
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReadStudyInfoModal;
