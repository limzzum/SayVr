import { useEffect, useRef, useState } from "react";
import {
  StudyInfoDto,
  getStudyList,
  getStudyMineList,
} from "../../api/StudyPageAPI/StudyAPI";
import MyStudyCard from "../../components/StudyComponents/MyStudyCard";
import AllStudyCard from "../../components/StudyComponents/AllStudyCard";
import AddButton from "../../components/StudyComponents/AddButton";
import CreateNewStudyModal from "../../components/StudyComponents/CreatNewStudyModal";
import ReadStudyInfoModal from "../../components/StudyComponents/ReadStudyInfoModal";
// import StudyDetail from "./StudyDetailPage";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Slider from "react-slick";
import "./style.css";

interface ArrowProps {
  onClick: () => void;
}
const carouselSettings = {
  dots: false,
  infinite: true,
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
  const [studyMineList, setStudyMineList] = useState<StudyInfoDto[]>();
  const [allStudyList, setAllStudyList] = useState<StudyInfoDto[]>();
  const sliderMine = useRef<Slider | null>(null);
  const sliderAll = useRef<Slider | null>(null);
  const [readStudyInfo, setReadStudyInfo] = useState<StudyInfoDto>();
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
            borderColor: "blue",
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

  const handleCreatePlusButtonClick = () => {
    setShowCreateModal(true);
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

  const goToDetail = async (studyId: number) => {
    navigate(`/study/${studyId}`);
  };

  return (
    <>
      <div className="container mt-5 flex justify-content-center">
        {menu === "main" && (
          <>
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
                        <div
                          className="title private"
                          onClick={() => setMenu("private")}
                        >
                          내 스터디{" "}
                        </div>{" "}
                        <div>
                          <AddButton
                            handleButtonClick={handleCreatePlusButtonClick}
                            size="50"
                          />{" "}
                        </div>
                      </div>
                      <div>
                        <ArrowLeft
                          onClick={() => sliderMine?.current?.slickPrev()}
                        />
                        <ArrowRight
                          onClick={() => sliderMine?.current?.slickNext()}
                        />
                      </div>{" "}
                    </div>
                  </h1>
                </div>
              </div>
              {(studyMineList == null || studyMineList.length === 0) && (
                <>
                  <MyStudyCard addNew={handleCreatePlusButtonClick} />
                </>
              )}
              <Slider ref={sliderMine} {...carouselSettings}>
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
                      {/* <div
                        style={{ display: "flex", justifyContent: "center" }}
                      > */}
                      <div style={{ display: "flex", margin: "1rem" }}>
                        <div
                          className="title private"
                          onClick={() => setMenu("public")}
                        >
                          모든 단어장
                        </div>{" "}
                        <div
                          className="container-fluid"
                          style={{ width: "300px" }}
                        >
                          <form className="d-flex">
                            <input
                              className="form-control"
                              type="search"
                              placeholder="검색"
                              aria-label="Search"
                            />
                            <button className="btn" type="submit">
                              Search
                            </button>
                          </form>
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
                  </h1>
                </div>
                <div className="row">
                  <Slider ref={sliderAll} {...carouselSettings}>
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
        {/* {menu === "detail" && (
          <>
            <DeckDetail props={selectedDeck} changeView={setMenu} />
          </>
        )}
        {menu === "learn" && (
          <>
            <DeckLearn changeView={setMenu} props={selectedDeck} />
          </>
        )}
        {menu === "quiz" && <></>}
        {menu === "public" && (
          <>
            <DeckListPage changeView={goToList} category="public" />
          </>
        )}
        {menu === "private" && (
          <>
            <DeckListPage changeView={goToList} category="private" />
          </>
        )} */}
      </div>
    </>
  );
}
export default StudyPage;
