// CreateNewListModal.tsx
import React from "react"
import { useState } from "react"
import { Modal, Button } from "react-bootstrap"
import { DeckCreateResponseDto, createPersonalDeck } from "../../api/VocabListAPI/FlashcardsAPI"
import { useNavigate } from "react-router-dom"

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
  const navigate = useNavigate()
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
    } else if (type === "checkbox") {
      // Handle checkbox input changes
      const newPrivacyStatus = checked ? PrivacyStatus.PUBLIC : PrivacyStatus.PRIVATE
      setFlashcardForm((prevData) => ({
        ...prevData,
        [name]: newPrivacyStatus,
      }))
    }
  }
  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (!flashcardForm.name) {
      alert("제목을 입력해주세요")
      return
    } else {
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
      <Modal.Body className='row '>
        <p>제목</p>
        <input name='name' type='text' value={flashcardForm.name} placeholder='단어장 제목을 입력해주세요' onChange={handleInputChange} />
        <div className='row mt-2'>
          <p className='col-2'>공개</p>
          <div className='form-check form-switch col-2'>
            <input
              className='form-check-input'
              name='privacyStatus'
              type='checkbox'
              checked={flashcardForm.privacyStatus === PrivacyStatus.PUBLIC}
              id='flexSwitchCheckDefault'
              onChange={handleInputChange}
            />
            <label className='form-check-label' htmlFor='flexSwitchCheckDefault'></label>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          닫기
        </Button>
        <Button variant='primary' onClick={handleSubmit}>
          생성
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateNewListModal
