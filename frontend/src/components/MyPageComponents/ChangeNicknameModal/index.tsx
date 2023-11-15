import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import API_URL from "../../../config";
import { tokenState } from "../../../recoil/GoalbalState";
import { useRecoilValue } from 'recoil';

interface ChangeNicknameModalProps {
  show: boolean;
  onHide: () => void;
  onNicknameChange: (newNickname: string) => void;
}

const ChangeNicknameModal: React.FC<ChangeNicknameModalProps> = ({ show, onHide, onNicknameChange }) => {
  const [newNickname, setNewNickname] = useState("");
  const token = useRecoilValue(tokenState);
  const [nicknameError, setNicknameError] = useState("");


  useEffect(() => {
    setNewNickname("");
    setNicknameError("");
  }, [show]);

  const handleNicknameChange = async () => {
    try {
      if (newNickname.length < 2 || newNickname.length > 10) {
        setNicknameError("닉네임은 2글자 이상 10글자 이하로 입력해주세요.");
        return;
      }
      const response = await axios.patch(
        `${API_URL}/user?name=${newNickname}`,
        { name: newNickname },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
            onChange={(e) => {
              setNewNickname(e.target.value);
              setNicknameError("");
            }}
            isInvalid={nicknameError !== ""}
          />
          <Form.Control.Feedback type="invalid">
            {nicknameError}
          </Form.Control.Feedback>
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
