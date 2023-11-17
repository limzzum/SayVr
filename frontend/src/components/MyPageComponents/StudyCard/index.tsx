import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { StudyInfoDto, getStudyMineList } from "../../../api/StudyPageAPI/StudyAPI";
import MyStudyCard from "../../../components/StudyComponents/MyStudyCard";
import AddButton from "../../../components/StudyComponents/AddButton";
import CreateNewStudyModal from "../../../components/StudyComponents/CreatNewStudyModal";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import "./style.css";

interface ArrowProps {
  onClick: () => void;
}

const carouselSettings = {
  dots: false,
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

const StudyListSection: React.FC = () => {
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [menu, setMenu] = useState("main");
  const [studyMineList, setStudyMineList] = useState<StudyInfoDto[]>([]);
  const sliderMine = useRef<Slider | null>(null);

  useEffect(() => {
    getStudyMineList()
      .then((res) => {
        let show: StudyInfoDto[] = res.data.data.studyInfoDtoList;
        setStudyMineList(show);
        console.log("내 스터디 리스트 : " + show);
      })
      .catch((error) => {
        console.error("Error fetching getStudyMineList", error);
      });
  }, []);

  const handleCreatePlusButtonClick = () => {
    setShowCreateModal(true);
  };

  const handleCreateCloseModal = () => {
    setShowCreateModal(false);
  };

  const goToDetail = async (id: number) => {
    navigate(`/study/${id}`);
  };

  const ArrowLeft: React.FC<ArrowProps> = (props) => {
    return (
      <Button
        style={{
          borderColor: "transparent",
          color: "black",
          backgroundColor: "transparent",
          width:"2rem"
        }}
        onClick={props.onClick}
      >
        <BsArrowLeft />
      </Button>
    );
  };

  const ArrowRight: React.FC<ArrowProps> = (props) => {
    return (
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
    );
  };

  return (
    <div className="container mt-5 flex justify-content-center">
      {menu === "main" && (
        <>
          <div className="vocab-list-container row card-row align-items-center">
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
            <Slider
              infinite={studyMineList.length >= 3}
              ref={sliderMine}
              {...carouselSettings}
            >
              {studyMineList?.map((study, index) => (
                <MyStudyCard
                  key={index + study.studyId}
                  addNew={handleCreatePlusButtonClick}
                  props={study}
                />
              ))}
            </Slider>
          </div>
          <div className="create-new-list-modal">
            <CreateNewStudyModal
              showModal={showCreateModal}
              handleClose={handleCreateCloseModal}
              goToDetail={goToDetail}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default StudyListSection;
