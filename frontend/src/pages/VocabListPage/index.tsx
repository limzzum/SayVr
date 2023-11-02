import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { PersonalDeckTitle, getPersonalFlashcards } from "../../api/VocabListAPI/FlashcardsAPI"
import PlusBtn from "../../assets/Etc/PlusBtn.png"
import MyWordCard from "../../components/MyWordCard"
import AddButton from "../../components/VocabListComponents/AddButton"
import CreateNewListModal from "../../components/VocabListComponents/CreateNewListModal"
import "./style.css"
// const cardTitles:PersonalDeck[] = getPersonalFlashcards().then((res)=>{
// return res.data.data.personalDeckList;
// })
function VocabListPage() {
  const [showModal, setShowModal] = useState(false)
  const [cardTitles, setCardTitles] = useState<PersonalDeckTitle[]>()
  useEffect(() => {
    // 개인 단어장 목록 가져오기data.personalDeckList
    getPersonalFlashcards()
      .then((res) => {
        let show: PersonalDeckTitle[] = res.data.data.personalDeckList
        setCardTitles(show)
        console.log(show)
      })
      .catch((error) => {
        console.error("Error fetching personalDeckList", error)
      })
    console.log(cardTitles)
  }, [])

  const handlePlusButtonClick = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }
  return (
    <div className='container mt-5'>
      <div className='vocab-list-container row card-row justify-content-center align-items-center '>
        <div className='row justify-content-center align-items-center'>
          <div className='col-2'>
            <h1>내 단어장</h1>
          </div>
          <div className='col'>
            <AddButton handleButtonClick={handlePlusButtonClick} />
          </div>
        </div>
        {(cardTitles == null || cardTitles.length === 0) && (
          <>
            <div
              className='card'
              style={{ width: "18rem", backgroundColor: "#82B7F3", marginRight: "20px", marginBottom: "20px", height: "230px" }}
            >
              <div className='card-body'>
                <Button
                  onClick={handlePlusButtonClick}
                  className='addBtn'
                  style={{ backgroundColor: "transparent", borderColor: "transparent", borderRadius: "100px" }}
                >
                  <img className='btn' alt='add new flashcard' src={PlusBtn} />
                </Button>
              </div>
            </div>
          </>
        )}
        {cardTitles?.map((deck, index) => {
          return (
            <>
              <MyWordCard key={index + deck.id} {...deck} />
            </>
          )
        })}
      </div>
      <div className='row card-row justify-content-center align-items-center custom-chart-container'>
        <div className='row justify-content-center align-items-center'>
          <div className='col-5'>
            <h1>공개 단어장</h1>
          </div>
          <div className='col'>
            <div className='container-fluid'>
              <form className='d-flex'>
                <input className='form-control me-2' type='search' placeholder='검색' aria-label='Search' />
                <button className='btn' type='submit'>
                  Search
                </button>
              </form>
            </div>
          </div>
          <div className='row'>{/* <MyWordCard /> */}</div>
        </div>
      </div>
      <div className='create-new-list-modal'>
        <CreateNewListModal showModal={showModal} handleClose={handleCloseModal} />
      </div>
    </div>
  )
}
export default VocabListPage
