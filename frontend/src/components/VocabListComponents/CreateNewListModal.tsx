// CreateNewListModal.tsx
import React from "react";
import { Modal, Button } from "react-bootstrap";

interface CreateNewListModalProps {
  showModal: boolean;
  handleClose: () => void;
}

const CreateNewListModal: React.FC<CreateNewListModalProps> = ({ showModal, handleClose }) => {
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>새 단어장</Modal.Title>
      </Modal.Header>
      <Modal.Body className="row ">
        <p>제목</p>
        <input type="text" placeholder="단어장 제목을 입력해주세요" />
        <div className="row mt-2">
          <p className="col-2">공개</p>
          <div className="form-check form-switch col-2">
            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">    
            </label>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          닫기
        </Button>
        <Button variant="primary">생성</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateNewListModal;
