import React, { useCallback, useEffect, useState } from "react"
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
const ScrollTest: React.FC<DeckListProps> = ({ category, changeView, searchResult, type }) => {
  const navigate = useNavigate()
  const [deckType, setDeckType] = useState(type)
  const [showModal, setShowModal] = useState(false)
  const [orderby, setOrderby] = useState("createdAt")
  // const [hasMore,setHasMore]=useState(searchResult&&searchResult.length>0?true:false);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);


  const [keyword, setKeyword] = useState("")
  const [lastId, setLastId]= useState((searchResult && searchResult.length>0)?searchResult[searchResult?.length-1].id:1000);

  const [personalCardTitles, setPersonalCardTitles] = useState<PersonalDeckTitle[]>(searchResult ? searchResult : [])
  const searchParams: ReadDeckSearchRequestDto = {
    lastId: lastId,
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

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      // Check if we're at the bottom of the page
      loadMoreData();
    }
  }, []);
  const loadMoreData = () => {
    if (loading || !hasMore) {
      return;
    }

    setLoading(true);

    // Adjust your searchParams with the new lastId
    const searchParams: ReadDeckSearchRequestDto = {
      lastId: lastId,
      pageSize: 3,
      sortBy: orderby,
      keyword: keyword,
    };

    // Make your API call here, e.g., searchDecks(searchParams)
    searchDecks(searchParams)
      .then((res) => {
        const newDecks = res.data.data.personalDeckList;

        if (newDecks.length === 0) {
          // No more data to load
          setHasMore(false);
        } else {
          // Update the lastId for the next load
          setLastId(newDecks[newDecks.length - 1].id);
      console.log("set new last id")
          setPersonalCardTitles((prevDecks) => [...prevDecks, ...newDecks]);
        }
      })
      .catch((error) => {
        console.error("Error fetching decks", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (hasMore) {
      window.addEventListener("scroll", handleScroll);
    } else {
      window.removeEventListener("scroll", handleScroll);
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll, hasMore]);


//기존
  // useEffect(() => {
  //   function onScroll() {
  //     if (
  //       window.scrollY + document.documentElement.clientHeight >
  //       document.documentElement.scrollHeight - 10
  //     ) {
  //       handleSearch();
  //     }
  //   }
  //   window.addEventListener('scroll', onScroll);

  //   // Cleanup the event listener when the component unmounts
  //   return () => {
  //     window.removeEventListener('scroll', onScroll);
  //   };
  // }, []);

  
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
    if(!hasMore){
      return;
    }
    searchDecks(searchParams).then((res) => {
      let show: PersonalDeckTitle[] = res.data.data.personalDeckList
      if(show.length>0){
        setPersonalCardTitles((prev)=> [...prev,...show])
      }
      
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
          {
            type==="private"?(personalCardTitles?.map((deck, index) => {
              return (
                <>
                  <MyWordCard type='private' key={index + deck.id} addNew={handlePlusButtonClick} props={deck} />
                </>
              )
            })):(personalCardTitles?.map((deck, index) => {
              return (
                <>
                  <MyWordCard type='public' key={index + deck.id} addNew={handlePlusButtonClick} props={deck} />
                </>
              )
            }))
          }
        </div>
        <div className='create-new-list-modal'>
          <CreateNewListModal showModal={showModal} handleClose={handleCloseModal} goToDetail={goToDetail} />
        </div>
      </div>
    </>
  )
}
export default ScrollTest
