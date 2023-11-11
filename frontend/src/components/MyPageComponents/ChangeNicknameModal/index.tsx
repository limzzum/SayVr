import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import API_URL from "../../../config";

interface ChangeNicknameModalProps {
  show: boolean;
  onHide: () => void;
  onNicknameChange: (newNickname: string) => void;
}

const ChangeNicknameModal: React.FC<ChangeNicknameModalProps> = ({ show, onHide, onNicknameChange }) => {
  const [newNickname, setNewNickname] = useState("");

  useEffect(() => {
    setNewNickname("");
  }, [show]);

  const handleNicknameChange = async () => {
    try {
      const response = await axios.patch(
        `${API_URL}/user`,
        null,
        {
          params: { name: newNickname },
        }
      );
  
      if (response) {
        console.log("여기가 닉네임 변경에 대한 응답", response);
        const data = response.data.message;
        alert(data);
        onNicknameChange(newNickname);
        onHide();
      } else {
        alert("닉네임 변경에 실패했습니다.");
      }
    } catch (error) {
      console.error("닉네임 변경 중 오류 발생:", error);
      alert("닉네임 변경 중 오류가 발생했습니다.");
    }
  };
  

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>닉네임 변경</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="formNickname">
          <Form.Label>새로운 닉네임</Form.Label>
          <Form.Control
            type="text"
            placeholder="새로운 닉네임을 입력하세요."
            value={newNickname}
            onChange={(e) => setNewNickname(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          취소
        </Button>
        <Button variant="primary" onClick={handleNicknameChange}>
          변경
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangeNicknameModal;
