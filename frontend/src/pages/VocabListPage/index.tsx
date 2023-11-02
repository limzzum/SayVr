import { useState, useEffect } from "react"
import MyWordCard from "../../components/MyWordCard"
import PlusBtn from "../../assets/Etc/PlusBtn.png"
import { Button } from "react-bootstrap"
import CreateNewListModal from "../../components/VocabListComponents/CreateNewListModal"
import "./style.css"
import { PersonalDeck, PersonalDeckResponse, getPersonalFlashcards } from "../../api/VocabListAPI/FlashcardsAPI"
// const cardTitles:PersonalDeck[] = getPersonalFlashcards().then((res)=>{
// return res.data.data.personalDeckList;
// })
function VocabListPage() {
  const [showModal, setShowModal] = useState(false)
  const [cardTitles, setCardTitles] = useState<PersonalDeck[]>()
  useEffect(() => {
    // 개인 단어장 목록 가져오기data.personalDeckList
    getPersonalFlashcards()
      .then((res) => {
        let show: PersonalDeck[] = res.data.data.personalDeckList
        // setCardTitles(show)
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
            <Button onClick={handlePlusButtonClick} style={{ backgroundColor: "white", borderColor: "white" }}>
              <img className='btn' src={PlusBtn} />
            </Button>
          </div>
        </div>
        {cardTitles == null && (
          <>
            <div className='card' style={{ width: "18rem", backgroundColor: "#82B7F3", marginRight: "20px", marginBottom: "20px" }}>
              <div className='card-body'>
              <Button onClick={handlePlusButtonClick} style={{ backgroundColor: "white", borderColor: "white" }}>
              <img className='btn' src={PlusBtn} />
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
