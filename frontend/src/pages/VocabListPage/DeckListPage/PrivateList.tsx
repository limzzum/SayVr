import React, { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { BsChevronLeft } from "react-icons/bs"
import { useNavigate } from "react-router-dom"
import { PersonalDeckTitle, getPersonalFlashcards } from "../../../api/VocabListAPI/FlashcardsAPI"
import MyWordCard from "../../../components/MyWordCard"
import AddButton from "../../../components/VocabListComponents/AddButton"
import CreateNewListModal from "../../../components/VocabListComponents/CreateNewListModal"
import "../../VocabListPage/style.css"

interface DeckListProps {
  category: string
  changeView: (menu: string) => void
  searchResult?: PersonalDeckTitle[]
  type: string
}
const PrivateList: React.FC<DeckListProps> = ({ category, changeView, searchResult, type }) => {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [personalCardTitles, setPersonalCardTitles] = useState<PersonalDeckTitle[]>(searchResult ? searchResult : [])

  useEffect(() => {
    getPersonalFlashcards()
      .then((res) => {
        let show: PersonalDeckTitle[] = res.data.data.personalDeckList
        setPersonalCardTitles(show)
        console.log(show)
      })
      .catch((error) => {
        console.error("Error fetching personalDeckList", error)
      })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const BackArrow = () => {
    return (
      <>
        <Button
          style={{
            borderColor: "transparent",
            color: "black",
            backgroundColor: "transparent",
            width: "50px",
          }}
          onClick={() => changeView("main")}
        >
          <BsChevronLeft />
        </Button>
      </>
    )
  }
  const handlePlusButtonClick = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const goToDetail = (id: number) => {
    console.log("nav to " + id)
    navigate(`/flashcard/${id}`)
  }

  return (
    <>
      <div className='container mt-5 flex justify-content-center'>
        <div className='vocab-list-container row card-row align-items-center '>
          <div className='row vocab-list-title row'>
            <div className='list-title-buttons'>
              <div className='card-title'>
                <div>
                  <BackArrow />
                </div>
                <div className='card-title-private'>
                  <h1>내 단어장 </h1>
                </div>
                <div style={{ marginLeft: "1rem" }}>
                  <AddButton handleButtonClick={handlePlusButtonClick} size='50' />
                </div>
              </div>
            </div>
          </div>
          <div className="row card-row" style={{width:"100%"}}>
          {(personalCardTitles == null || personalCardTitles.length === 0) && (
            <>
              <MyWordCard type='none' addNew={handlePlusButtonClick} />
            </>
          )}
          {personalCardTitles?.map((deck, index) => {
            return (
              <>
                <MyWordCard type='personal' key={index + deck.id} addNew={handlePlusButtonClick} props={deck} />
              </>
            )
          })}
          </div>
        </div>
        <div className='create-new-list-modal'>
          <CreateNewListModal showModal={showModal} handleClose={handleCloseModal} goToDetail={goToDetail} />
        </div>
      </div>
    </>
  )
}
export default PrivateList
