import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import API_URL from "../../../config";
import { tokenState } from "../../../recoil/GoalbalState";
import { useRecoilValue } from "recoil";
import Swal from "sweetalert2";

interface ChangeProfileModalProps {
  show: boolean;
  onHide: () => void;
  onProfileChange: (newProfile: File) => void;
}

const ChangeProfileModal: React.FC<ChangeProfileModalProps> = ({
  show,
  onHide,
  onProfileChange,
}) => {
  const [selectedProfile, setSelectedProfile] = useState<File | null>(null);
  const token = useRecoilValue(tokenState);

  useEffect(() => {
    setSelectedProfile(null);
  }, [show]);

  const handleProfileChange = async () => {
    try {
      if (selectedProfile) {
        const formData = new FormData();
        formData.append("profile", selectedProfile);

        // Axios 요청 결과를 변수에 저장
        const response = await axios({
          method: "put",
          url: `${API_URL}/user/profileimg`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: formData,
        });

        // 서버 응답을 콘솔에 출력
        console.log("서버 응답:", response);

        onProfileChange(selectedProfile);
        Swal.fire({
          icon: "success",
          title: "프로필 사진 변경이 완료되었습니다.",
          customClass: {
            confirmButton: "swal-btn-sign",
            icon: "swal-icon-sign",
          },
        });
        onHide();
      } else {
        Swal.fire({
          icon: "warning",
          title: "프로필 사진을 선택하세요.",
          customClass: {
            confirmButton: "swal-btn-sign",
            icon: "swal-icon-sign",
          },
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "프로필 변경 중 오류가 발생했습니다.",
        customClass: {
          confirmButton: "swal-btn-sign",
          icon: "swal-icon-sign",
        },
      });
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedProfile(files[0]);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>프로필 사진 변경</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="formProfile">
          <Form.Label>새로운 프로필 사진 선택</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          취소
        </Button>
        <Button variant="primary" onClick={handleProfileChange}>
          변경
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangeProfileModal;
