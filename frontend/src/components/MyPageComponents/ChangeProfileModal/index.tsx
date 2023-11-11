import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import API_URL from "../../../config";

interface ChangeProfileModalProps {
  show: boolean;
  onHide: () => void;
  onProfileChange: (newProfile: File) => void;
}

const ChangeProfileModal: React.FC<ChangeProfileModalProps> = ({ show, onHide, onProfileChange }) => {
  const [selectedProfile, setSelectedProfile] = useState<File | null>(null);

  const handleProfileChange = async () => {
    try {
      if (selectedProfile) {
        const formData = new FormData();
        formData.append("profileImg", selectedProfile);

        await axios({
          method: "put",
          url: `${API_URL}/user/profileimg`,
          headers: {
            // Authorization: `Bearer ${userToken}`, 
            "Content-Type": "multipart/form-data",
          },
          data: formData,
        });

        onProfileChange(selectedProfile);
        onHide();
      } else {
        alert("프로필 사진을 선택하세요.");
      }
    } catch (error) {
      console.error("프로필 변경 중 오류 발생:", error);
      alert("프로필 변경 중 오류가 발생했습니다.");
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
          <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
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
