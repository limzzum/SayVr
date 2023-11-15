// CreateNewListModal.tsx
import React, { useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { createPersonalDeck } from "../../api/VocabListAPI/FlashcardsAPI"

interface CreateNewListModalProps {
  showModal: boolean
  handleClose: () => void
  goToDetail: (newDeck: number) => void
}
export enum PrivacyStatus {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
  FORKED = "FORKED",
}
export interface CreateFlashcardsRequestDto {
  name: string
  privacyStatus: PrivacyStatus
}
const CreateNewListModal: React.FC<CreateNewListModalProps> = ({ showModal, handleClose, goToDetail }) => {
  // const navigate = useNavigate()
  const [flashcardForm, setFlashcardForm] = useState<CreateFlashcardsRequestDto>({
    name: "",
    privacyStatus: PrivacyStatus.PRIVATE,
  })
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target
    if (type === "text") {
      // Handle text input changes
      setFlashcardForm((prevData) => ({
        ...prevData,
        [name]: value,
      }))
    } else if (name === "flashcardStatus") {
      // Handle checkbox input changes
      const newPrivacyStatus = checked ? PrivacyStatus.PUBLIC : PrivacyStatus.PRIVATE
      setFlashcardForm((prevData) => ({
        ...prevData,
       privacyStatus: newPrivacyStatus,
      }))
    }
  }
  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (!flashcardForm.name) {
      alert("제목을 입력해주세요")
      return
    } else {
      console.log(flashcardForm);
      createPersonalDeck(flashcardForm)
        .then((res) => {
          // navigate()
          console.log(res.data.data.id)
          handleClose()
          goToDetail(res.data.data.id)
        })
        .catch((error) => {
          console.error("Error creating deck", error)
        })
    }
  }
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>새 단어장</Modal.Title>
      </Modal.Header>
      <Modal.Body className='row ' style={{ margin: "1rem" }}>
        <Form.Label htmlFor='title'>제목</Form.Label>
        <Form.Control
          type='text'
          name='name'
          id='flashcard-title'
          value={flashcardForm.name}
          placeholder='단어장 제목을 입력해주세요'
          onChange={handleInputChange}
        />
        <div className='row mt-4'>
          <div className='col'>
            <Form.Check
              type='switch'
              name='flashcardStatus'
              id='privacy-status'
              label='단어장 공개 여부'
              onChange={handleInputChange}
              checked={flashcardForm.privacyStatus === PrivacyStatus.PUBLIC}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          취소
        </Button>
        <Button variant='primary' onClick={handleSubmit}>
          생성
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateNewListModal
