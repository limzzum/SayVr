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
import { useRecoilValue } from "recoil";
import { tokenState } from "../../recoil/GoalbalState";
import Swal from "sweetalert2";

interface ArrowProps {
  onClick: () => void;
}
const carouselSettings = {
  dots: false,
  // infinite: true,
  speed: 500,
  // slidesToShow: 3,
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
  const token = useRecoilValue(tokenState);
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
            width: "4rem",
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
            width: "4rem",
          }}
          onClick={props.onClick}
        >
          <BsArrowRight />
        </Button>
      </>
    );
  };
  useEffect(() => {
    if (token === "") {
      Swal.fire({
        icon: "error",
        title: "잘못된 접근입니다",
        customClass: {
          confirmButton: "swal-btn-sign",
          icon: "swal-icon-sign",
        },
      });
      navigate("/Login");
      return;
    }
    getPersonalFlashcards()
      .then((res) => {
        let show: PersonalDeckTitle[] = res.data.data.personalDeckList;
        setPersonalCardTitles(show);
        console.log(show);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "개인 단어장을 조회하는데 오류가 발생하였습니다.",
          customClass: {
            confirmButton: "swal-btn-sign",
            icon: "swal-icon-sign",
          },
        });
      });
    searchDecks({ lastId: 1000, pageSize: 9, sortBy: "createdAt", keyword: "" })
      .then((res) => {
        let show: PersonalDeckTitle[] = res.data.data.personalDeckList;
        setPublicCardTitles(show);
        console.log(show);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: error.response.data.message,
          customClass: {
            confirmButton: "swal-btn-sign",
            icon: "swal-icon-sign",
          },
        });
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
    searchDecks(searchParams)
      .then((res) => {
        let show: PersonalDeckTitle[] = res.data.data.personalDeckList;
        setSearchCardTitles(show);
        console.log(show);
        setMenu("public");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: error.response.data.message,
          customClass: {
            confirmButton: "swal-btn-sign",
            icon: "swal-icon-sign",
          },
        });
        setKeyword("");
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
            <div className="vocab-list-container row card-row">
              <div className="vocab-list-title row">
                <div className="col">
                  {/* <div className='row justify-content-center'> */}
                  <div className="list-title-buttons">
                    <div className="card-title">
                      <div
                        className="card-title-private clickable"
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
              <div className="row clickable-card">
                <Slider
                  infinite={personalCardTitles.length >= 3}
                  slidesToShow={personalCardTitles.length === 0 ? 1 : 3}
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
                  {(personalCardTitles == null ||
                    personalCardTitles.length < 3) && (
                    <MyWordCard type="none" addNew={handlePlusButtonClick} />
                  )}
                  {personalCardTitles.length === 1 && (
                    <MyWordCard type="none" addNew={handlePlusButtonClick} />
                  )}
                </Slider>
              </div>
            </div>
            <div className="vocab-list-container row card-row">
              <div className="vocab-list-title row">
                <div className="col">
                  {/* <div className='row justify-content-center'> */}

                  <div className="list-title-buttons">
                    <div className="card-title">
                      <div
                        className="card-title-public clickable"
                        onClick={() => {
                          setSearchCardTitles(publicCardTitles);
                          setMenu("public");
                        }}
                      >
                        <h1>공개 단어장 </h1>
                      </div>
                      <div className="container-fluid search-bar">
                        <InputGroup>
                          <DropdownButton
                            variant="outline-secondary"
                            title={
                              orderby === "createdAt"
                                ? "최신순"
                                : orderby === "forkCount"
                                ? "포크순"
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
                              포크순
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
                            className="search-btn"
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
              </div>
              <div className="row justify-content-center clickable-card">
                <Slider
                  infinite={publicCardTitles?.length >= 3}
                  slidesToShow={publicCardTitles.length === 0 ? 1 : 3}
                  ref={sliderPublic}
                  {...carouselSettings}
                >
                  {(publicCardTitles == null ||
                    publicCardTitles.length < 3) && (
                    <MyWordCard type="none" addNew={handlePlusButtonClick} />
                  )}
                  {publicCardTitles.length === 1 && (
                    <MyWordCard type="none" addNew={handlePlusButtonClick} />
                  )}
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
