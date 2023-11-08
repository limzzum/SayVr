import React, { useEffect, useState } from "react"
import { Button, Dropdown, DropdownButton, Form, InputGroup } from "react-bootstrap"
import { BsChevronLeft } from "react-icons/bs"
import { useNavigate } from "react-router-dom"
import {
  PersonalDeckTitle,
  ReadDeckSearchRequestDto,
  getPersonalFlashcards,
  getPublicFlashcards,
  searchDecks,
} from "../../../api/VocabListAPI/FlashcardsAPI"
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
const DeckListPage: React.FC<DeckListProps> = ({ category, changeView, searchResult, type }) => {
  const navigate = useNavigate()
  const [deckType, setDeckType] = useState(type)
  const [showModal, setShowModal] = useState(false)
  const [orderby, setOrderby] = useState("createdAt")
  const [keyword, setKeyword] = useState("")
  const [personalCardTitles, setPersonalCardTitles] = useState<PersonalDeckTitle[]>(searchResult ? searchResult : [])
  const searchParams: ReadDeckSearchRequestDto = {
    lastId: 1000,
    pageSize: 9,
    sortBy: orderby,
    keyword: keyword,
  }

  useEffect(() => {
    if (category === "private") {
      getPersonalFlashcards()
        .then((res) => {
          let show: PersonalDeckTitle[] = res.data.data.personalDeckList
          setPersonalCardTitles(show)
          console.log(show)
        })
        .catch((error) => {
          console.error("Error fetching personalDeckList", error)
        })
    } else if (category === "public") {
      if (!searchResult) {
        getPublicFlashcards()
          .then((res) => {
            let show: PersonalDeckTitle[] = res.data.data.personalDeckList
            setPersonalCardTitles(show)
            console.log(show)
          })
          .catch((error) => {
            console.error("Error fetching publicDeckList", error)
          })
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category])
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
  const handleSearch = async () => {
    searchDecks(searchParams).then((res) => {
      let show: PersonalDeckTitle[] = res.data.data.personalDeckList
      setPersonalCardTitles(show)
      console.log(show)
      // setMenu("public")
    })
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setKeyword(value)
  }
  return (
    <>
      <div className='container mt-5 flex justify-content-center'>
        <div className='vocab-list-container row card-row  align-items-center '>
          <div className='row justify-content-center align-items-center'>
            <div className='col'>
              <h1>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", margin: "1rem" }}>
                    <div>
                      <BackArrow />
                    </div>
                    <div className='title' style={{ display: "inline-flex" }}>
                      {category === "private" && (
                        <>
                          <div>내 단어장</div>
                          <div>
                            <AddButton handleButtonClick={handlePlusButtonClick} size='50' />
                          </div>
                        </>
                      )}
                      {category === "public" && (
                        <>
                            <div>공개 단어장</div>
                         
                          <div className='container-fluid' style={{ width: "300px" }}>
                            <InputGroup className='mb-3'>
                              <DropdownButton
                                variant='outline-secondary'
                                title={
                                  orderby === "createdAt"
                                    ? "최신순"
                                    : orderby === "forkCount"
                                    ? "저장순"
                                    : orderby === "wordCount"
                                    ? "단어순"
                                    : "정렬"
                                }
                                id='input-group-dropdown-1'
                              >
                                <Dropdown.Item onClick={() => setOrderby("createdAt")} href='#'>
                                  최신순
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => setOrderby("forkCount")} href='#'>
                                  저장순
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => setOrderby("wordCount")} href='#'>
                                  단어순
                                </Dropdown.Item>
                              </DropdownButton>
                              <Form.Control
                                placeholder='검색'
                                name='keyword'
                                onChange={handleInputChange}
                                value={keyword}
                                type='search'
                                aria-label='Text input with dropdown button'
                              />
                              <Button
                                type='submit'
                                onClick={(e: any) => {
                                  e.preventDefault()
                                  handleSearch()
                                }}
                                className='btn'
                              >
                                Search
                              </Button>
                            </InputGroup>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </h1>
            </div>
          </div>
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
        <div className='create-new-list-modal'>
          <CreateNewListModal showModal={showModal} handleClose={handleCloseModal} goToDetail={goToDetail} />
        </div>
      </div>
    </>
  )
}
export default DeckListPage
