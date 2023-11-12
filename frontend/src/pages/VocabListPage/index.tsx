import { useEffect, useRef, useState } from "react";
import {
  Button,
  Dropdown,
  DropdownButton,
  Form,
  InputGroup,
} from "react-bootstrap";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import {
  PersonalDeckTitle,
  ReadDeckSearchRequestDto,
  getPersonalFlashcards,
  searchDecks,
} from "../../api/VocabListAPI/FlashcardsAPI";
import MyWordCard from "../../components/MyWordCard";
import AddButton from "../../components/VocabListComponents/AddButton";
import CreateNewListModal from "../../components/VocabListComponents/CreateNewListModal";
import DeckListPage from "./DeckListPage";
import PrivateList from "./DeckListPage/PrivateList";
import "./style.css";

interface ArrowProps {
  onClick: () => void;
}
const carouselSettings = {
  dots: false,
  // infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  arrows: false,
  responsive: [
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

function VocabListPage() {
  const [showModal, setShowModal] = useState(false);
  const [menu, setMenu] = useState("main");
  const [personalCardTitles, setPersonalCardTitles] = useState<
    PersonalDeckTitle[]
  >([]);
  const [publicCardTitles, setPublicCardTitles] = useState<PersonalDeckTitle[]>(
    []
  );

  const sliderPersonal = useRef<Slider | null>(null);
  const sliderPublic = useRef<Slider | null>(null);
  const [searchCardTitles, setSearchCardTitles] = useState<PersonalDeckTitle[]>(
    []
  );
  const [orderby, setOrderby] = useState("createdAt");
  const [keyword, setKeyword] = useState("");

  const searchParams: ReadDeckSearchRequestDto = {
    lastId: 1000,
    pageSize: 9,
    sortBy: orderby,
    keyword: keyword,
  };

  const ArrowLeft = (props: ArrowProps) => {
    return (
      <>
        <Button
          style={{
            borderColor: "transparent",
            color: "black",
            backgroundColor: "transparent",
          }}
          onClick={props.onClick}
        >
          <BsArrowLeft />
        </Button>
      </>
    );
  };
  const ArrowRight = (props: ArrowProps) => {
    return (
      <>
        <Button
          style={{
            borderColor: "transparent",
            color: "black",
            backgroundColor: "transparent",
          }}
          onClick={props.onClick}
        >
          <BsArrowRight />
        </Button>
      </>
    );
  };
  useEffect(() => {
    getPersonalFlashcards()
      .then((res) => {
        let show: PersonalDeckTitle[] = res.data.data.personalDeckList;
        setPersonalCardTitles(show);
        console.log(show);
      })
      .catch((error) => {
        console.error("Error fetching personalDeckList", error);
      });
    searchDecks({ lastId: 1000, pageSize: 9, sortBy: "createdAt", keyword: "" })
      .then((res) => {
        let show: PersonalDeckTitle[] = res.data.data.personalDeckList;
        setPublicCardTitles(show);
        console.log(show);
      })
      .catch((error) => {
        console.error("Error fetching publicDeckList", error);
      });

    console.log(personalCardTitles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menu]);

  const handlePlusButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const goToList = (where: string) => {
    setMenu(where);
  };

  const handleSearch = async () => {
    searchDecks(searchParams).then((res) => {
      let show: PersonalDeckTitle[] = res.data.data.personalDeckList;
      setSearchCardTitles(show);
      console.log(show);
      setMenu("public");
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setKeyword(value);
  };

  const navigate = useNavigate();
  const goToDetail = async (id: number) => {
    // await getOneDeck(id).then((res) => {
    //   console.log(res.data.data);
    //   setSelectedDeck(res.data.data);
    // });
    navigate(`/flashcard/${id}`);
    // setMenu("detail");
  };

  return (
    <>
      <div className="container mt-5 flex justify-content-center">
        {menu === "main" && (
          <>
            <div className="vocab-list-container row card-row align-items-center justify-content-center">
              <div className="row justify-content-center align-items-center">
                <div className="row">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ display: "flex", margin: "1rem" }}>
                      <div
                        className="card-title private"
                        onClick={() => setMenu("private")}
                      >
                        <h1>내 단어장 </h1>
                      </div>
                      <div style={{ marginLeft: "1rem" }}>
                        <AddButton
                          handleButtonClick={handlePlusButtonClick}
                          size="50"
                        />
                      </div>
                    </div>
                    <div>
                      <ArrowLeft
                        onClick={() => sliderPersonal?.current?.slickPrev()}
                      />
                      <ArrowRight
                        onClick={() => sliderPersonal?.current?.slickNext()}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                {(personalCardTitles == null ||
                  personalCardTitles.length === 0) && (
                  <>
                    <MyWordCard type="none" addNew={handlePlusButtonClick} />
                  </>
                )}
                <Slider
                  infinite={personalCardTitles.length >= 3}
                  ref={sliderPersonal}
                  {...carouselSettings}
                >
                  {personalCardTitles?.map((deck, index) => {
                    return (
                      <>
                        <MyWordCard
                          type={"private"}
                          key={index + deck.id}
                          addNew={handlePlusButtonClick}
                          props={deck}
                        />
                      </>
                    );
                  })}
                </Slider>
              </div>
            </div>
            <div className="vocab-list-container row card-row align-items-center justify-content-center ">
              <div className="row justify-content-center align-items-center">
                <div className="row">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ display: "flex", margin: "1rem" }}>
                      <div
                        className="card-title public"
                        onClick={() => {
                          setSearchCardTitles(publicCardTitles);
                          setMenu("public");
                        }}
                      >
                        <h1>공개 단어장 </h1>
                      </div>
                      <div
                        className="container-fluid"
                        style={{ width: "20rem", display:"flex", alignItems:"center" }}
                      >
                        <InputGroup className="search-bar">
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
                    </div>
                    <div>
                      <ArrowLeft
                        onClick={() => sliderPublic?.current?.slickPrev()}
                      />
                      <ArrowRight
                        onClick={() => sliderPublic?.current?.slickNext()}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <Slider
                    infinite={publicCardTitles?.length >= 3}
                    ref={sliderPublic}
                    {...carouselSettings}
                  >
                    {publicCardTitles?.map((deck, index) => {
                      return (
                        <>
                          <MyWordCard
                            type={"public"}
                            key={"public" + index + deck.id}
                            addNew={handlePlusButtonClick}
                            props={deck}
                          />
                        </>
                      );
                    })}
                  </Slider>
                </div>
              </div>
            </div>
            <div className="create-new-list-modal">
              <CreateNewListModal
                showModal={showModal}
                handleClose={handleCloseModal}
                goToDetail={goToDetail}
              />
            </div>
          </>
        )}
        {menu === "public" && (
          <>
            <DeckListPage
              type="public"
              changeView={goToList}
              category="public"
              searchResult={searchCardTitles}
              searchParameter={searchParams}
            />
            {/* <ScrollTest type='public' changeView={goToList} category='public' searchResult={searchCardTitles} /> */}
          </>
        )}
        {menu === "private" && (
          <>
            <PrivateList
              type="private"
              changeView={goToList}
              category="private"
            />
          </>
        )}
      </div>
    </>
  );
}
export default VocabListPage;
