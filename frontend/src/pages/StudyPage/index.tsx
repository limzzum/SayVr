import { useEffect, useRef, useState } from "react";
import {
  StudyInfoDto,
  getStudyList,
  getStudyMineList,
  StudySliceRequestDto,
  getStudyListKeyWord,
} from "../../api/StudyPageAPI/StudyAPI";
import MyStudyCard from "../../components/StudyComponents/MyStudyCard";
import AllStudyCard from "../../components/StudyComponents/AllStudyCard";
import AddButton from "../../components/StudyComponents/AddButton";
import CreateNewStudyModal from "../../components/StudyComponents/CreatNewStudyModal";
import ReadStudyInfoModal from "../../components/StudyComponents/ReadStudyInfoModal";
// import StudyDetail from "./StudyDetailPage";
import { useNavigate } from "react-router-dom";
import { Button, Form, InputGroup } from "react-bootstrap";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Slider from "react-slick";
import "./style.css";
import StudyListPage from "./StudyListPage";

interface ArrowProps {
  onClick: () => void;
}
const carouselSettings = {
  dots: false,
  // infinite: true,
  speed: 500,
  slidesToShow: 3, // 한 번에 보여질 카드 수
  slidesToScroll: 3, // 넘어갈 카드 수
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

function StudyPage() {
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showReadModal, setShowReadModal] = useState(false);
  const [menu, setMenu] = useState("main");
  // const [selectedDeck, setSelectedDeck] = useState<DeckDetailResponseDto>();
  const [studyMineList, setStudyMineList] = useState<StudyInfoDto[]>([]);
  const [allStudyList, setAllStudyList] = useState<StudyInfoDto[]>([]);
  const sliderMine = useRef<Slider | null>(null);
  const sliderAll = useRef<Slider | null>(null);
  const [readStudyInfo, setReadStudyInfo] = useState<StudyInfoDto>();
  const [searchStudyInfos, setSearchStudyInfos] = useState<StudyInfoDto[]>([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  const searchParams: StudySliceRequestDto = {
    lastId: 1000,
    size: 9,
    keyword: searchKeyword,
  };

  const ArrowLeft = (props: ArrowProps) => {
    return (
      <>
        <Button
          style={{
            borderColor: "transparent",
            color: "black",
            backgroundColor: "transparent",
            width:"4rem"
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
            width:"4rem"
          }}
          onClick={props.onClick}
        >
          <BsArrowRight />
        </Button>
      </>
    );
  };
  useEffect(() => {
    getStudyMineList()
      .then((res) => {
        let show: StudyInfoDto[] = res.data.data.studyInfoDtoList;
        setStudyMineList(show);
        console.log("내 스터디 리스트 : " + show);
      })
      .catch((error) => {
        // TODO : 에러 메시지
        console.error("Error fetching getStudyMineList", error);
      });
    getStudyList()
      .then((res) => {
        let show: StudyInfoDto[] = res.data.data.studyInfoDtoList;
        setAllStudyList(show);
        console.log("전체 스터디 리스트 : " + show);
      })
      .catch((error) => {
        console.error("Error fetching getStudyList", error);
      });
  }, []);

  const handleSearch = async () => {
    getStudyListKeyWord(searchParams).then((res) => {
      let show: StudyInfoDto[] = res.data.data.studyInfoDtoList;
      setSearchStudyInfos(show);
      console.log(show);
      setMenu("public");
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchKeyword(value);
  };
  const handleCreatePlusButtonClick = () => {
    setShowCreateModal(true);
  };

  const goToList = (where: string) => {
    setMenu(where);
  };

  const handleCreateCloseModal = () => {
    setShowCreateModal(false);
  };

  const handleReadPlusButtonClick = () => {
    setShowReadModal(true);
  };

  const handleReadCloseModal = () => {
    setShowReadModal(false);
  };

  // const goToDetail = (createdDeck: DeckResponse) => {
  //   setSelectedDeck(createdDeck)
  //   setMenu("detail")
  // }

  const goToDetail = async (id: number) => {
    navigate(`/study/${id}`);
  };

  return (
    <>
      <div className="container mt-5 flex justify-content-center">
        {menu === "main" && (
          <>
            <div className="vocab-list-container row card-row  align-items-center ">
              <div className="mb-3 row justify-content-center align-items-center">
                <div className="col">
                  <div className="list-title-buttons">
                    <div className="card-title">
                      <div
                        className="card-title-private clickable"
                        onClick={() => setMenu("private")}
                      >
                        <h1>내 스터디 </h1>
                      </div>
                      <div style={{ marginLeft: "1rem" }}>
                        <AddButton
                          handleButtonClick={handleCreatePlusButtonClick}
                          size="50"
                        />
                      </div>
                    </div>
                    <div>
                      <ArrowLeft
                        onClick={() => sliderMine?.current?.slickPrev()}
                      />
                      <ArrowRight
                        onClick={() => sliderMine?.current?.slickNext()}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row clickable-cards">
                {(studyMineList == null || studyMineList.length === 0) && (
                  <>
                    <MyStudyCard addNew={handleCreatePlusButtonClick} />
                  </>
                )}
                <Slider
                  infinite={studyMineList.length >= 3}
                  ref={sliderMine}
                  {...carouselSettings}
                >
                  {studyMineList?.map((study, index) => {
                    return (
                      <>
                        <MyStudyCard
                          key={index + study.studyId}
                          addNew={handleCreatePlusButtonClick}
                          props={study}
                        />
                      </>
                    );
                  })}
                </Slider>
              </div>
            </div>
            <div className="vocab-list-container row card-row  align-items-center ">
              <div className="mb-3 row justify-content-center align-items-center">
                <div className="col">
                  <div className="list-title-buttons">
                    <div className="card-title">
                      <div
                        className="card-title-public clickable"
                        onClick={() => {
                          setMenu("public");
                        }}
                      >
                        <h1>모든 스터디 </h1>
                      </div>
                      <div className="container-fluid search-bar">
                        <InputGroup>
                          <Form.Control
                            placeholder="검색"
                            name="keyword"
                            onChange={handleInputChange}
                            value={searchKeyword}
                            type="search"
                            aria-label="study-search"
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
                        onClick={() => sliderAll?.current?.slickPrev()}
                      />
                      <ArrowRight
                        onClick={() => sliderAll?.current?.slickNext()}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row clickable-cards">
                {(allStudyList == null || allStudyList.length === 0) && (
                  <>
                    <div
                      className="emtpy-title-card"
                      onClick={handleCreatePlusButtonClick}
                    >
                      <div
                        className="empty-add-button"
                        style={{ justifyContent: "center" }}
                      >
                        <AddButton
                          handleButtonClick={handleCreatePlusButtonClick}
                          size="50"
                        />
                      </div>
                    </div>
                  </>
                )}
                <Slider
                  infinite={allStudyList?.length >= 3}
                  ref={sliderAll}
                  {...carouselSettings}
                >
                  {allStudyList?.map((study, index) => {
                    return (
                      <>
                        <AllStudyCard
                          key={"public" + index + study.studyId}
                          addNew={handleCreatePlusButtonClick}
                          readStudy={handleReadPlusButtonClick}
                          setReadStudyInfo={setReadStudyInfo}
                          props={study}
                        />
                      </>
                    );
                  })}
                </Slider>
              </div>
            </div>
            <div className="create-new-list-modal">
              <CreateNewStudyModal
                showModal={showCreateModal}
                handleClose={handleCreateCloseModal}
                goToDetail={goToDetail}
              />
            </div>
            <div className="create-new-list-modal">
              <ReadStudyInfoModal
                showModal={showReadModal}
                handleClose={handleReadCloseModal}
                goToDetail={goToDetail}
                readStudyInfo={readStudyInfo}
              />
            </div>
          </>
        )}
        {menu === "public" && (
          <>
            <StudyListPage
              type="public"
              changeView={goToList}
              searchResult={searchStudyInfos}
              searchParameter={searchParams}
            />
          </>
        )}
      </div>
    </>
  );
}
export default StudyPage;
