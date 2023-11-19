import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  StudyDetailResponseDto,
  deleteStudyMember,
} from "../../api/StudyPageAPI/StudyAPI";
import Swal from "sweetalert2";
interface ReadStudyInfoModalProps {
  showModal: boolean;
  handleClose: () => void;
  // goToDetail: (newStudy: number) => void;
  readStudyInfo: StudyDetailResponseDto | undefined;
}

export interface JoinStudyRequestDto {
  studyId: number;
}

const ReadStudyInfoModalAndOut: React.FC<ReadStudyInfoModalProps> = ({
  showModal,
  handleClose,
  // goToDetail,
  readStudyInfo,
}) => {
  const navigate = useNavigate();
  if (!readStudyInfo) {
    return null;
  }

  const handleNavigation = () => {
    console.log("이동중");
    navigate("/StudyList");
  };

  const handleSubmit = () => {
    Swal.fire({
      title: "스터디를 탈퇴하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4461F2",
      cancelButtonColor: "#d33",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
      reverseButtons: true, // 버튼 순서 거꾸로
      customClass: {
        confirmButton: "swal-btn-login",
        icon: "swal-icon-login",
        cancelButton: "swal-btn-login",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        deleteStudyMember(readStudyInfo.studyInfoDto.studyId)
          .then((res) => {
            console.log(res.data);
            if (res.data.httpStatus === "ACCEPTED") {
              handleClose();
              handleNavigation();
            }
          })
          .catch((error) => {
            // TODO : 예외 처리
            console.error("스터디 탈퇴 중 오류 발생", error);
          });
      }
    });
  };

  const { name, currentPeople, maxPeople, description, rule } =
    readStudyInfo.studyInfoDto;

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <h2>스터디 {name}</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ margin: "1rem" }}>
        <div>
          <h3>현재인원</h3>
          <h4 style={{ marginBottom: "1rem" }}>
            {currentPeople} / {maxPeople}
          </h4>
          <h3>설명</h3>
          <h4 style={{ marginBottom: "1rem" }}>{description}</h4>
          <h3>규칙</h3>
          <h4 style={{ marginBottom: "1rem" }}>{rule}</h4>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          닫기
        </Button>
        <Button variant="danger" onClick={handleSubmit}>
          탈퇴
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReadStudyInfoModalAndOut;
