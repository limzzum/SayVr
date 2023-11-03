// CreateNewListModal.tsx
import React from "react"
import { useState } from "react"
import { Modal, Button } from "react-bootstrap"
import { createPersonalDeck } from "../../api/VocabListAPI/FlashcardsAPI"
import { useNavigate } from "react-router-dom"

interface DeckSettingModalProps {
  showModal: boolean
  handleClose: () => void
}
export enum PrivacyStatus {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
  FORKED ="FORKED"
}
export interface DeckSettingsUpdateRequestDto {
  name: string
  privacyStatus: PrivacyStatus
}
const DeckSettingModal: React.FC<DeckSettingModalProps> = ({ showModal, handleClose }) => {
  const navigate =useNavigate();
  const [infoForm, setInfoForm] = useState<DeckSettingsUpdateRequestDto>({
    name: "",
    privacyStatus: PrivacyStatus.PRIVATE,
  })
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target
    if (type === "text") {
      // Handle text input changes
      setInfoForm((prevData) => ({
        ...prevData,
        [name]: value,
      }))
    } else if (type === "checkbox") {
      // Handle checkbox input changes
      const newPrivacyStatus = checked ? PrivacyStatus.PUBLIC : PrivacyStatus.PRIVATE
      setInfoForm((prevData) => ({
        ...prevData,
        [name]: newPrivacyStatus,
      }))
    }
  }
  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (!infoForm.name) {
      alert("제목을 입력해주세요")
      return
    }else{
      createPersonalDeck(infoForm).then((res)=>{
        // navigate()
        console.log(res.data.data)
        handleClose();
      }).catch((error) => {
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
        <input name='name' type='text' value={infoForm.name} placeholder='단어장 제목을 입력해주세요' onChange={handleInputChange} />
        <div className='row mt-2'>
          <p className='col-2'>공개</p>
          <div className='form-check form-switch col-2'>
            <input
              className='form-check-input'
              name='privacyStatus'
              type='checkbox'
              checked={infoForm.privacyStatus === PrivacyStatus.PUBLIC}
              id='flexSwitchCheckDefault'
              onChange={handleInputChange}
            />
            <label className='form-check-label' htmlFor='flexSwitchCheckDefault'></label>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='danger' onClick={handleClose}>
          삭제
        </Button>
        <Button variant='primary' onClick={handleSubmit}>
          생성
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeckSettingModal
