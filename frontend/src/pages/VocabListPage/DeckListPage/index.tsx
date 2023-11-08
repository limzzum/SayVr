import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  DropdownButton,
  Form,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import { BsChevronLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import {
  PersonalDeckTitle,
  ReadDeckSearchRequestDto,
  searchDecks,
} from "../../../api/VocabListAPI/FlashcardsAPI";
import MyWordCard from "../../../components/MyWordCard";
import CreateNewListModal from "../../../components/VocabListComponents/CreateNewListModal";
import "../../VocabListPage/style.css";

interface DeckListProps {
  category: string;
  changeView: (menu: string) => void;
  searchResult: PersonalDeckTitle[];
  searchParameter: ReadDeckSearchRequestDto;
  type: string;
}
const DeckListPage: React.FC<DeckListProps> = ({
  category,
  changeView,
  searchResult,
  searchParameter,
}) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [orderby, setOrderby] = useState(searchParameter.sortBy);
  const [keyword, setKeyword] = useState(searchParameter.keyword);
  const [latestId, setLatestId] = useState(
    searchResult[searchResult.length - 1].id
  );

  const [publicCardTitles, setPublicCardTitles] = useState<PersonalDeckTitle[]>(
    searchResult ? searchResult : []
  );
  // const [params, setParams] = useState<ReadDeckSearchRequestDto>(searchParameter);
  const [searchParams, setSearchParams] = useState<ReadDeckSearchRequestDto>({
    lastId: latestId,
    pageSize: 3,
    sortBy: orderby,
    keyword: keyword,
  });
  useEffect(() => {
    setSearchParams({
      lastId: latestId,
      pageSize: 3,
      sortBy: orderby,
      keyword: keyword,
    });
    console.log(searchParams)
  }, [orderby, keyword, latestId]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      // Check if we're at the bottom of the page
      handleLoad();
    }
  }, []);
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

  const handleLoad = async() => {
    if (loading || !hasMore) {
      return;
    }
    setLoading(true);
    setTimeout(()=>{
     searchDecks(searchParams)
      .then((res) => {
        const newDecks = res.data.data.personalDeckList;
        console.log(" fetch new load");
        console.log(newDecks);
        if (newDecks.length === 0) {
          
          setHasMore(false);
        } else {
          if (newDecks[newDecks.length - 1].id === latestId) {
            console.log("new == old")
            setHasMore(false);
          } else {
            console.log("new last id :"+ newDecks[newDecks.length - 1].id+" , old id: "+latestId)
            setLatestId((prevLastId) => {
              const newId = newDecks[newDecks.length - 1].id;
              // Perform any other logic you need here
              console.log("New last id: " + newId + ", old id: " + prevLastId);
              return newId;
            });
            setTimeout(()=>console.log("set new last id"+latestId +", length:" + newDecks.length),5000)
            
            setPublicCardTitles((prevDecks) => [...prevDecks, ...newDecks]);
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching decks", error);
      })
      .finally(() => {
        setTimeout( ()=>setLoading(false),5000)
        // setLoading(false);
      });
    },5000)
    
  };

  useEffect(() => {
    if (!searchResult) {
      // impossible?
      console.log("결과없이 페이지 불러와진 경우");
      alert("잘못된 접근입니다");
      // getPublicFlashcards()
      //   .then((res) => {
      //     let show: PersonalDeckTitle[] = res.data.data.personalDeckList;
      //     setPublicCardTitles(show);
      //     console.log(show);
      //   })
      //   .catch((error) => {
      //     console.error("Error fetching publicDeckList", error);
      //   });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
    );
  };
  const handlePlusButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const goToDetail = (id: number) => {
    console.log("nav to " + id);
    navigate(`/flashcard/${id}`);
  };
  const handleSearch = async () => {
    searchDecks(searchParams).then((res) => {
      let show: PersonalDeckTitle[] = res.data.data.personalDeckList;
      setPublicCardTitles(show);
      console.log(show);
      // setMenu("public")
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setKeyword(value);
  };

  return (
    <>
      <div className="container mt-5 flex justify-content-center">
        <div className="vocab-list-container row card-row  align-items-center ">
          <div className="row justify-content-center align-items-center">
            <div className="col">
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
                    <div className="title" style={{ display: "inline-flex" }}>
                      {category === "public" && (
                        <>
                          <div>공개 단어장</div>

                          <div
                            className="container-fluid"
                            style={{ width: "300px" }}
                          >
                            <InputGroup className="mb-3">
                              <DropdownButton
                                variant="outline-secondary"
                                title={
                                  orderby === "createdAt"
                                    ? "최신순"
                                    : orderby === "forkCount"
                                    ? "저장순"
                                    : orderby === "wordCount"
                                    ? "단어순"
                                    : "정렬"
                                }
                                id="input-group-dropdown-1"
                              >
                                <Dropdown.Item
                                  onClick={() => setOrderby("createdAt")}
                                  href="#"
                                >
                                  최신순
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() => setOrderby("forkCount")}
                                  href="#"
                                >
                                  저장순
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() => setOrderby("wordCount")}
                                  href="#"
                                >
                                  단어순
                                </Dropdown.Item>
                              </DropdownButton>
                              <Form.Control
                                placeholder="검색"
                                name="keyword"
                                onChange={handleInputChange}
                                value={keyword}
                                type="search"
                                aria-label="Text input with dropdown button"
                              />
                              <Button
                                type="submit"
                                onClick={(e: any) => {
                                  e.preventDefault();
                                  handleSearch();
                                }}
                                className="btn"
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
          {(publicCardTitles == null || publicCardTitles.length === 0) && (
            <>
              <MyWordCard type="none" addNew={handlePlusButtonClick} />
            </>
          )}
  
          {publicCardTitles?.map((deck, index) => {
            return (
              <>
                <MyWordCard
                  type="public"
                  key={index + deck.id}
                  addNew={handlePlusButtonClick}
                  props={deck}
                />
              </>
            );
          })}        {
            loading && <Spinner animation="border" variant="primary" />
          }
        </div>
        <div className="create-new-list-modal">
          <CreateNewListModal
            showModal={showModal}
            handleClose={handleCloseModal}
            goToDetail={goToDetail}
          />
        </div>
      </div>
    </>
  );
};
export default DeckListPage;
