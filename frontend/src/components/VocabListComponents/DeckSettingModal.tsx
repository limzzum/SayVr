// SettingsModal.tsx
import React, { useEffect, useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import {
  DeckDetailResponseDto,
  DeckUpdateRequestDto,
  ProgressStatus,
  deleteDeck,
  resetDeckProgress,
  updateDeckSettings,
  updateProgressSaving,
} from "../../api/VocabListAPI/FlashcardsAPI"

import { useLocation, useNavigate } from "react-router-dom"
import { PrivacyStatus } from "./CreateNewListModal"

interface SettingsModalProps {
  showModal: boolean
  handleClose: () => void
  id: number
  handleRefresh: (updated: DeckDetailResponseDto) => void
  info: DeckDetailResponseDto
}
export interface DeckSettingsUpdateRequestDto {
  name: string
  flashcardStatus: PrivacyStatus
}
const DeckSettingsModal: React.FC<SettingsModalProps> = ({ showModal, handleClose, handleRefresh, info, id }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [mode, setMode] = useState("settings")
  const [saving, setSaving] = useState<ProgressStatus>(info.savingProgressStatus)
  const [saveForm, setSaveForm] = useState<DeckUpdateRequestDto>({
    savingProgressStatus: saving,
  })
  const [flashcardForm, setFlashcardForm] = useState<DeckSettingsUpdateRequestDto>({
    name: info.name,
    flashcardStatus: info.status,
  })

  useEffect(() => {
    setMode("settings")
  }, [showModal])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target
    if (type === "text") {
      setFlashcardForm((prevData) => ({
        ...prevData,
        [name]: value,
      }))
    } else if (name === "flashcardStatus") {
      // console.log("handle change")
      const newPrivacyStatus = checked ? PrivacyStatus.PUBLIC : PrivacyStatus.PRIVATE
      setFlashcardForm((prevData) => ({
        ...prevData,
        [name]: newPrivacyStatus,
      }))
    } else if (name === "savingProgress") {
      const newSavingStatus = checked ? ProgressStatus.ENABLED : ProgressStatus.DISABLED
      console.log("handle toggle value")
      console.log(newSavingStatus)
      updateProgressSaving(id, { savingProgressStatus: newSavingStatus })
        .then((res) => {
          console.log(res)
          handleRefresh(res.data.data)
        })
        .catch((e) => {
          console.log(e)
          alert("모드 변경에 실패했습니다.")
        })
      setSaving(newSavingStatus)
    }
  }
  const changeMode = (mode: string) => {
    setMode(mode)
  }

  // const handleToggle = () => {
  //   console.log(saving);
  //   updateProgressSaving(id, saveForm)
  //     .then((res) => {
  //       console.log(res);
  //       handleRefresh(res.data.data);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //       alert("모드 변경에 실패했습니다.");
  //     });
  // };

  const handleReset = () => {
    resetDeckProgress(id).then((res) => {
      handleRefresh(res.data.data)
      // navigate(location.pathname)
      // navigate(`/flashcard/${id}`);
      navigate(0)
      // console.log("reset")
      // console.log(res.data.data)
    })

    handleClose()
    setMode("settings")
  }
  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (!flashcardForm.name) {
      alert("제목을 입력해주세요")
      return
    } else {
      // console.log(flashcardForm)
      updateDeckSettings(id, flashcardForm)
        .then((res) => {
          // console.log(res.data.data.id)
          handleClose()
          handleRefresh(res.data.data)
          // navigate(`/flashcard/${id}`);
        })
        .catch((error) => {
          console.error("Error updating deck", error)
          alert("단어장 정보를 수정하는데 실패했습니다.")
        })
        navigate(0)
    }
  }
  useEffect(() => {
    if (info) {
      setFlashcardForm({
        name: info.name,
        flashcardStatus: info.status,
      })
      // console.log("useeffect")
      // console.log(flashcardForm)
    }
  }, [])

  const handleDelete = () => {
    deleteDeck(id).then((res) => {
      let message = res.data.data.message
      // console.log(message)
      if (message === "단어장이 삭제되었습니다") {
        navigate("/VocabList")
      } else {
        alert(message)
      }
    })
  }
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>단어장 설정 </Modal.Title>
      </Modal.Header>{" "}
      {mode === "settings" && (
        <>
          <Modal.Body className='row popup-modal-settings' style={{ margin: "1rem" }}>
            <Form.Label htmlFor='title'>제목</Form.Label>
            <Form.Control
              type='text'
              name='name'
              id='flashcard-title'
              value={flashcardForm.name}
              placeholder='단어장 제목을 입력해주세요'
              onChange={handleInputChange}
              disabled={info.status === PrivacyStatus.FORKED}
            />
            {/* <p>제목</p>
            <input
              
              className="form-chekc-"
              type="text"
              
              
            /> */}
            <div className='row mt-4'>
              <div className='col'>
                <Form.Check
                  type='switch'
                  name='flashcardStatus'
                  id='privacy-status'
                  label='단어장 공개 여부'
                  onChange={handleInputChange}
                  disabled={info.status === PrivacyStatus.FORKED}
                  defaultChecked={flashcardForm.flashcardStatus === PrivacyStatus.PUBLIC}
                />
                {/* <div className="form-check form-switch row-2">
                  <input
                    className="form-check-input"
                    name="flashcardStatus"
                    type="checkbox"
                    // checked={flashcardForm.flashcardStatus === PrivacyStatus.PUBLIC}
                    id="flexSwitchCheckDefault"
                    onChange={handleInputChange}
                    disabled={info.status === PrivacyStatus.FORKED}
                    defaultChecked={
                      flashcardForm.flashcardStatus === PrivacyStatus.PUBLIC
                    }
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexSwitchCheckDefault"
                  >
                    공개
                  </label>
                </div> */}
                <Form.Check
                  type='switch'
                  name='savingProgress'
                  id='progress-switch'
                  label='학습 기억 모드'
                  onChange={handleInputChange}
                  defaultChecked={saveForm.savingProgressStatus === ProgressStatus.ENABLED}
                  // onClick={handleToggle}
                />
                {/* <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    // paddingRight: "1rem",
                  }}
                  className="form-check form-switch row-2"
                >
                  <div className="form-check form-switch">
                    <label
                      // className="form-check-label"
                      htmlFor="progress-switch"
                    >
                      학습 기억 모드
                    </label>
                    <input
                      className="form-check-input"
                      name="savingProgress"
                      type="checkbox"
                      id="progress-switch"
                      onChange={handleInputChange}
                      defaultChecked={
                        saveForm.savingProgressStatus === ProgressStatus.ENABLED
                      }
                      onClick={handleToggle}
                    />
                  </div>
                </div> */}
              </div>
              <div className='col-6 '>
                <Button size='sm' style={{ width: "150px" }} variant='secondary' onClick={() => changeMode("reset")}>
                  학습 기록 초기화
                </Button>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='danger' onClick={() => changeMode("delete")}>
              삭제
            </Button>
            <Button variant='light' onClick={handleSubmit}>
              적용
            </Button>
          </Modal.Footer>
        </>
      )}
      {mode === "delete" && (
        <>
          <Modal.Body className='row '>
            <h3>
              단어장 <b>'{info.name}'</b>을/를 삭제하시겠습니까?
            </h3>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='danger' onClick={() => handleDelete()}>
              삭제
            </Button>
            <Button variant='light' onClick={() => changeMode("settings")}>
              취소
            </Button>
          </Modal.Footer>
        </>
      )}
      {mode === "reset" && (
        <>
          <Modal.Body className='row '>
            <h3>학습 기록을 초기화하시겠습니까?</h3>
            <h5>단어의 학습 상태가 초기화됩니다.</h5>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='primary' onClick={() => handleReset()}>
              초기화
            </Button>
            <Button variant='light' onClick={() => changeMode("settings")}>
              취소
            </Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  )
}

export default DeckSettingsModal
